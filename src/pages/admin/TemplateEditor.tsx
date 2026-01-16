import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  Code,
  Settings,
  Loader2,
  Copy,
} from "lucide-react";

interface TemplateField {
  id: string;
  template_id: string;
  nome: string;
  label: string;
  tipo: string;
  placeholder: string | null;
  valor_padrao: string | null;
  opcoes: any;
  obrigatorio: boolean | null;
  ordem: number | null;
  grupo: string | null;
  dica: string | null;
  mascara: string | null;
  fonte_dados: string | null;
  campo_fonte: string | null;
}

interface Template {
  id: string;
  nome: string;
  descricao: string | null;
  conteudo: string;
  versao: number | null;
  is_active: boolean | null;
  category_id: string | null;
}

const fieldTypes = [
  { value: "text", label: "Texto" },
  { value: "textarea", label: "Texto Longo" },
  { value: "number", label: "Número" },
  { value: "currency", label: "Moeda (R$)" },
  { value: "date", label: "Data" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Telefone" },
  { value: "select", label: "Seleção" },
];

const leadFieldsMap = [
  { value: "nome", label: "Nome" },
  { value: "email", label: "Email" },
  { value: "telefone", label: "Telefone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "empresa", label: "Empresa" },
  { value: "cargo", label: "Cargo" },
  { value: "valor_estimado", label: "Valor Estimado" },
];

const TemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("editor");
  const [template, setTemplate] = useState<Template | null>(null);
  const [fields, setFields] = useState<TemplateField[]>([]);
  const [newFieldDialog, setNewFieldDialog] = useState(false);
  const [newField, setNewField] = useState({
    nome: "",
    label: "",
    tipo: "text",
    obrigatorio: false,
    fonte_dados: "manual",
    campo_fonte: "",
    dica: "",
    placeholder: "",
  });

  const { data: templateData, isLoading } = useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("document_templates")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Template;
    },
    enabled: !!id,
  });

  const { data: fieldsData } = useQuery({
    queryKey: ["template-fields", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("template_fields")
        .select("*")
        .eq("template_id", id)
        .order("ordem");
      if (error) throw error;
      return data as TemplateField[];
    },
    enabled: !!id,
  });

  const { data: categories } = useQuery({
    queryKey: ["document-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("document_categories")
        .select("*")
        .eq("is_active", true)
        .order("ordem");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (templateData) setTemplate(templateData);
  }, [templateData]);

  useEffect(() => {
    if (fieldsData) setFields(fieldsData);
  }, [fieldsData]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!template) return;

      // Save template
      const { error: templateError } = await supabase
        .from("document_templates")
        .update({
          nome: template.nome,
          descricao: template.descricao,
          conteudo: template.conteudo,
          category_id: template.category_id,
          is_active: template.is_active,
          versao: (template.versao || 1) + 1,
        })
        .eq("id", template.id);

      if (templateError) throw templateError;

      // Save version
      await supabase.from("template_versions").insert({
        template_id: template.id,
        versao: (template.versao || 1) + 1,
        conteudo: template.conteudo,
        campos: fields,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["template", id] });
      toast.success("Template salvo com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao salvar template");
      console.error(error);
    },
  });

  const addFieldMutation = useMutation({
    mutationFn: async () => {
      const fieldName = newField.nome
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");

      const { data, error } = await supabase
        .from("template_fields")
        .insert({
          template_id: id,
          nome: fieldName,
          label: newField.label,
          tipo: newField.tipo,
          obrigatorio: newField.obrigatorio,
          fonte_dados: newField.fonte_dados,
          campo_fonte: newField.fonte_dados === "lead" ? newField.campo_fonte : null,
          dica: newField.dica || null,
          placeholder: newField.placeholder || null,
          ordem: fields.length,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setFields([...fields, data as TemplateField]);
      setNewFieldDialog(false);
      setNewField({
        nome: "",
        label: "",
        tipo: "text",
        obrigatorio: false,
        fonte_dados: "manual",
        campo_fonte: "",
        dica: "",
        placeholder: "",
      });
      toast.success("Campo adicionado!");
    },
    onError: () => {
      toast.error("Erro ao adicionar campo");
    },
  });

  const deleteFieldMutation = useMutation({
    mutationFn: async (fieldId: string) => {
      const { error } = await supabase
        .from("template_fields")
        .delete()
        .eq("id", fieldId);
      if (error) throw error;
    },
    onSuccess: (_, fieldId) => {
      setFields(fields.filter((f) => f.id !== fieldId));
      toast.success("Campo removido!");
    },
  });

  const insertPlaceholder = (fieldName: string) => {
    if (!template) return;
    const placeholder = `{{${fieldName}}}`;
    setTemplate({
      ...template,
      conteudo: template.conteudo + placeholder,
    });
    navigator.clipboard.writeText(placeholder);
    toast.success(`Placeholder ${placeholder} copiado!`);
  };

  const renderPreview = () => {
    if (!template) return "";
    let html = template.conteudo;
    fields.forEach((field) => {
      const placeholder = `{{${field.nome}}}`;
      const exampleValue =
        field.tipo === "date"
          ? new Date().toLocaleDateString("pt-BR")
          : field.tipo === "currency"
          ? "1.500,00"
          : field.valor_padrao || `[${field.label}]`;
      html = html.replace(new RegExp(placeholder, "g"), exampleValue);
    });
    return html;
  };

  if (isLoading || !template) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader
        title={template.nome}
        description="Editor de template de documento"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/modelos")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar
            </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="editor" className="gap-2">
            <Code className="w-4 h-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="fields" className="gap-2">
            <Settings className="w-4 h-4" />
            Campos ({fields.length})
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        {/* Editor Tab */}
        <TabsContent value="editor" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Conteúdo HTML</CardTitle>
                  <CardDescription>
                    Use {"{{nome_campo}}"} para inserir variáveis dinâmicas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={template.conteudo}
                    onChange={(e) =>
                      setTemplate({ ...template, conteudo: e.target.value })
                    }
                    className="font-mono text-sm min-h-[500px]"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input
                      value={template.nome}
                      onChange={(e) =>
                        setTemplate({ ...template, nome: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select
                      value={template.category_id || ""}
                      onValueChange={(v) =>
                        setTemplate({ ...template, category_id: v || null })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea
                      value={template.descricao || ""}
                      onChange={(e) =>
                        setTemplate({ ...template, descricao: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Ativo</Label>
                    <Switch
                      checked={template.is_active ?? true}
                      onCheckedChange={(v) =>
                        setTemplate({ ...template, is_active: v })
                      }
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Versão: {template.versao || 1}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Campos Disponíveis</CardTitle>
                  <CardDescription>
                    Clique para copiar o placeholder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {fields.map((field) => (
                      <Badge
                        key={field.id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => insertPlaceholder(field.nome)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {`{{${field.nome}}}`}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Fields Tab */}
        <TabsContent value="fields" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Configure os campos que serão preenchidos no formulário
            </p>
            <Button onClick={() => setNewFieldDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Campo
            </Button>
          </div>

          <div className="space-y-2">
            {fields.map((field) => (
              <Card key={field.id}>
                <CardContent className="flex items-center gap-4 py-4">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="font-medium">{field.label}</p>
                      <code className="text-xs text-muted-foreground">
                        {`{{${field.nome}}}`}
                      </code>
                    </div>
                    <Badge variant="outline">
                      {fieldTypes.find((t) => t.value === field.tipo)?.label ||
                        field.tipo}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {field.fonte_dados === "lead" && (
                        <span className="text-primary">
                          Auto: Lead.{field.campo_fonte}
                        </span>
                      )}
                      {field.obrigatorio && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Obrigatório
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteFieldMutation.mutate(field.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {fields.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Nenhum campo configurado
                  </p>
                  <Button variant="outline" onClick={() => setNewFieldDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar primeiro campo
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pré-visualização</CardTitle>
              <CardDescription>
                Como o documento ficará com dados de exemplo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-lg p-6 bg-white min-h-[600px]"
                dangerouslySetInnerHTML={{ __html: renderPreview() }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Field Dialog */}
      <Dialog open={newFieldDialog} onOpenChange={setNewFieldDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Campo</DialogTitle>
            <DialogDescription>
              Configure um novo campo para o formulário
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Label *</Label>
                <Input
                  value={newField.label}
                  onChange={(e) => {
                    setNewField({
                      ...newField,
                      label: e.target.value,
                      nome: e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "_")
                        .replace(/[^a-z0-9_]/g, ""),
                    });
                  }}
                  placeholder="Ex: Nome do Cliente"
                />
              </div>
              <div className="space-y-2">
                <Label>Nome do campo</Label>
                <Input
                  value={newField.nome}
                  onChange={(e) =>
                    setNewField({ ...newField, nome: e.target.value })
                  }
                  placeholder="nome_do_cliente"
                  className="font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={newField.tipo}
                  onValueChange={(v) => setNewField({ ...newField, tipo: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fonte de dados</Label>
                <Select
                  value={newField.fonte_dados}
                  onValueChange={(v) =>
                    setNewField({ ...newField, fonte_dados: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="lead">Lead (automático)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {newField.fonte_dados === "lead" && (
              <div className="space-y-2">
                <Label>Campo do Lead</Label>
                <Select
                  value={newField.campo_fonte}
                  onValueChange={(v) =>
                    setNewField({ ...newField, campo_fonte: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o campo" />
                  </SelectTrigger>
                  <SelectContent>
                    {leadFieldsMap.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={newField.placeholder}
                onChange={(e) =>
                  setNewField({ ...newField, placeholder: e.target.value })
                }
                placeholder="Texto de exemplo no campo"
              />
            </div>
            <div className="space-y-2">
              <Label>Dica de preenchimento</Label>
              <Input
                value={newField.dica}
                onChange={(e) =>
                  setNewField({ ...newField, dica: e.target.value })
                }
                placeholder="Ajuda para o usuário"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={newField.obrigatorio}
                onCheckedChange={(v) =>
                  setNewField({ ...newField, obrigatorio: v })
                }
              />
              <Label>Campo obrigatório</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFieldDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => addFieldMutation.mutate()}
              disabled={!newField.label || addFieldMutation.isPending}
            >
              {addFieldMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TemplateEditor;
