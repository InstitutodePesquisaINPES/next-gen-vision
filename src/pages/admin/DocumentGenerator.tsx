import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowLeft,
  FileText,
  Save,
  Eye,
  Loader2,
  User,
  Building,
  Receipt,
} from "lucide-react";
import { format } from "date-fns";

interface TemplateField {
  id: string;
  nome: string;
  label: string;
  tipo: string;
  placeholder: string | null;
  valor_padrao: string | null;
  obrigatorio: boolean | null;
  ordem: number | null;
  grupo: string | null;
  dica: string | null;
  fonte_dados: string | null;
  campo_fonte: string | null;
}

interface Template {
  id: string;
  nome: string;
  descricao: string | null;
  conteudo: string;
  document_categories: { nome: string; icone: string | null; cor: string | null } | null;
}

interface Lead {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  whatsapp: string | null;
  empresa: string | null;
  cargo: string | null;
  valor_estimado: number | null;
}

const DocumentGenerator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template");
  const leadId = searchParams.get("lead");

  const [selectedTemplateId, setSelectedTemplateId] = useState(templateId || "");
  const [selectedLeadId, setSelectedLeadId] = useState(leadId || "");
  const [titulo, setTitulo] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  // Fetch templates
  const { data: templates } = useQuery({
    queryKey: ["templates-active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("document_templates")
        .select("*, document_categories(nome, icone, cor)")
        .eq("is_active", true)
        .order("nome");
      if (error) throw error;
      return data as Template[];
    },
  });

  // Fetch template fields
  const { data: fields } = useQuery({
    queryKey: ["template-fields", selectedTemplateId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("template_fields")
        .select("*")
        .eq("template_id", selectedTemplateId)
        .order("ordem");
      if (error) throw error;
      return data as TemplateField[];
    },
    enabled: !!selectedTemplateId,
  });

  // Fetch leads
  const { data: leads } = useQuery({
    queryKey: ["leads-for-document"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, nome, email, telefone, whatsapp, empresa, cargo, valor_estimado")
        .order("nome");
      if (error) throw error;
      return data as Lead[];
    },
  });

  const selectedTemplate = templates?.find((t) => t.id === selectedTemplateId);
  const selectedLead = leads?.find((l) => l.id === selectedLeadId);

  // Auto-fill fields from lead
  useEffect(() => {
    if (selectedLead && fields) {
      const newFormData = { ...formData };
      fields.forEach((field) => {
        if (field.fonte_dados === "lead" && field.campo_fonte) {
          const leadValue = selectedLead[field.campo_fonte as keyof Lead];
          if (leadValue !== null && leadValue !== undefined) {
            newFormData[field.nome] = String(leadValue);
          }
        }
      });
      // Add current date
      newFormData["data_atual"] = format(new Date(), "dd/MM/yyyy");
      setFormData(newFormData);

      // Auto-generate title
      if (!titulo && selectedTemplate) {
        setTitulo(`${selectedTemplate.nome} - ${selectedLead.nome}`);
      }
    }
  }, [selectedLead, fields]);

  // Set default values
  useEffect(() => {
    if (fields) {
      const defaults: Record<string, string> = {};
      fields.forEach((field) => {
        if (field.valor_padrao && !formData[field.nome]) {
          defaults[field.nome] = field.valor_padrao;
        }
        if (field.tipo === "date" && !formData[field.nome]) {
          defaults[field.nome] = format(new Date(), "yyyy-MM-dd");
        }
      });
      if (Object.keys(defaults).length > 0) {
        setFormData((prev) => ({ ...defaults, ...prev }));
      }
    }
  }, [fields]);

  const renderHtml = () => {
    if (!selectedTemplate) return "";
    let html = selectedTemplate.conteudo;

    Object.entries(formData).forEach(([key, value]) => {
      const field = fields?.find((f) => f.nome === key);
      let displayValue = value;

      // Format currency
      if (field?.tipo === "currency" && value) {
        displayValue = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(parseFloat(value) || 0);
      }

      // Format date
      if (field?.tipo === "date" && value) {
        try {
          displayValue = format(new Date(value), "dd/MM/yyyy");
        } catch {
          displayValue = value;
        }
      }

      html = html.replace(new RegExp(`{{${key}}}`, "g"), displayValue || "");
    });

    // Remove remaining placeholders
    html = html.replace(/\{\{[^}]+\}\}/g, "");

    return html;
  };

  const saveMutation = useMutation({
    mutationFn: async (status: string) => {
      if (!selectedTemplateId || !titulo) {
        throw new Error("Preencha todos os campos obrigatórios");
      }

      const { data, error } = await supabase
        .from("generated_documents")
        .insert({
          template_id: selectedTemplateId,
          lead_id: selectedLeadId || null,
          titulo,
          conteudo_html: renderHtml(),
          dados_preenchidos: formData,
          status,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success("Documento salvo com sucesso!");
      navigate(`/admin/documentos/${data.id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao salvar documento");
    },
  });

  const renderField = (field: TemplateField) => {
    const value = formData[field.nome] || "";

    const commonProps = {
      id: field.nome,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [field.nome]: e.target.value }),
      placeholder: field.placeholder || undefined,
      required: field.obrigatorio || false,
    };

    switch (field.tipo) {
      case "textarea":
        return <Textarea {...commonProps} rows={4} />;
      case "currency":
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              R$
            </span>
            <Input
              {...commonProps}
              type="number"
              step="0.01"
              className="pl-10"
            />
          </div>
        );
      case "date":
        return <Input {...commonProps} type="date" />;
      case "email":
        return <Input {...commonProps} type="email" />;
      case "phone":
        return <Input {...commonProps} type="tel" />;
      case "number":
        return <Input {...commonProps} type="number" />;
      default:
        return <Input {...commonProps} type="text" />;
    }
  };

  // Group fields
  const groupedFields =
    fields?.reduce((acc, field) => {
      const group = field.grupo || "Informações";
      if (!acc[group]) acc[group] = [];
      acc[group].push(field);
      return acc;
    }, {} as Record<string, TemplateField[]>) || {};

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gerar Documento"
        description="Preencha o formulário para criar um novo documento"
        action={
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template & Lead Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Configuração
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Modelo *</Label>
                  <Select
                    value={selectedTemplateId}
                    onValueChange={setSelectedTemplateId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates?.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          <div className="flex items-center gap-2">
                            <Receipt className="w-4 h-4" />
                            {t.nome}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Lead (opcional)</Label>
                  <Select
                    value={selectedLeadId}
                    onValueChange={setSelectedLeadId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Vincular a um lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum</SelectItem>
                      {leads?.map((l) => (
                        <SelectItem key={l.id} value={l.id}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {l.nome}
                            {l.empresa && (
                              <span className="text-muted-foreground">
                                ({l.empresa})
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Título do Documento *</Label>
                <Input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Orçamento - Cliente ABC"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Fields */}
          {selectedTemplateId && fields && fields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preencher Dados</CardTitle>
                <CardDescription>
                  Campos marcados com * são obrigatórios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(groupedFields).map(([group, groupFields]) => (
                  <div key={group} className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      {group}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {groupFields.map((field) => (
                        <div
                          key={field.id}
                          className={
                            field.tipo === "textarea" ? "sm:col-span-2" : ""
                          }
                        >
                          <div className="space-y-2">
                            <Label htmlFor={field.nome}>
                              {field.label}
                              {field.obrigatorio && (
                                <span className="text-destructive ml-1">*</span>
                              )}
                              {field.fonte_dados === "lead" && (
                                <span className="text-primary text-xs ml-2">
                                  (auto)
                                </span>
                              )}
                            </Label>
                            {renderField(field)}
                            {field.dica && (
                              <p className="text-xs text-muted-foreground">
                                {field.dica}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              disabled={!selectedTemplateId}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Ocultar Preview" : "Ver Preview"}
            </Button>
            <Button
              variant="outline"
              onClick={() => saveMutation.mutate("rascunho")}
              disabled={!selectedTemplateId || !titulo || saveMutation.isPending}
            >
              {saveMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar Rascunho
            </Button>
            <Button
              onClick={() => saveMutation.mutate("finalizado")}
              disabled={!selectedTemplateId || !titulo || saveMutation.isPending}
            >
              {saveMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              Gerar Documento
            </Button>
          </div>
        </div>

        {/* Sidebar / Preview */}
        <div className="space-y-6">
          {selectedLead && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Lead Selecionado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Nome:</strong> {selectedLead.nome}
                </p>
                {selectedLead.empresa && (
                  <p>
                    <strong>Empresa:</strong> {selectedLead.empresa}
                  </p>
                )}
                {selectedLead.email && (
                  <p>
                    <strong>Email:</strong> {selectedLead.email}
                  </p>
                )}
                {selectedLead.telefone && (
                  <p>
                    <strong>Telefone:</strong> {selectedLead.telefone}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {showPreview && selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border rounded-lg p-4 bg-white text-black min-h-[400px] overflow-auto text-sm"
                  style={{ maxHeight: "600px" }}
                  dangerouslySetInnerHTML={{ __html: renderHtml() }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default DocumentGenerator;
