import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Plus,
  Search,
  FileText,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreHorizontal,
  Loader2,
  Receipt,
  FileSignature,
  BarChart3,
  File,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const iconMap: Record<string, any> = {
  FileText,
  Receipt,
  FileSignature,
  BarChart3,
  File,
};

interface Category {
  id: string;
  nome: string;
  descricao: string | null;
  icone: string | null;
  cor: string | null;
}

interface Template {
  id: string;
  nome: string;
  descricao: string | null;
  conteudo: string;
  versao: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
  category_id: string | null;
  document_categories: Category | null;
}

const DocumentTemplates = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    nome: "",
    descricao: "",
    category_id: "",
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
      return data as Category[];
    },
  });

  const { data: templates, isLoading } = useQuery({
    queryKey: ["document-templates", categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from("document_templates")
        .select("*, document_categories(*)")
        .order("updated_at", { ascending: false });

      if (categoryFilter !== "all") {
        query = query.eq("category_id", categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Template[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const defaultContent = `<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
  <h1 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
    ${newTemplate.nome}
  </h1>
  
  <p>Data: {{data_atual}}</p>
  
  <h2>Dados do Cliente</h2>
  <p><strong>Nome:</strong> {{cliente_nome}}</p>
  <p><strong>Email:</strong> {{cliente_email}}</p>
  <p><strong>Empresa:</strong> {{cliente_empresa}}</p>
  
  <h2>Descrição</h2>
  <p>{{descricao}}</p>
  
  <h2>Valor</h2>
  <p style="font-size: 24px; color: #10b981; font-weight: bold;">R$ {{valor_total}}</p>
  
  <hr style="margin: 40px 0;" />
  
  <p style="color: #666; font-size: 12px;">
    Documento gerado automaticamente pelo sistema Vixio.
  </p>
</div>`;

      const { data, error } = await supabase
        .from("document_templates")
        .insert({
          nome: newTemplate.nome,
          descricao: newTemplate.descricao || null,
          category_id: newTemplate.category_id || null,
          conteudo: defaultContent,
        })
        .select()
        .single();

      if (error) throw error;

      // Create default fields
      const defaultFields = [
        { nome: "data_atual", label: "Data", tipo: "date", ordem: 1, obrigatorio: true },
        { nome: "cliente_nome", label: "Nome do Cliente", tipo: "text", ordem: 2, obrigatorio: true, fonte_dados: "lead", campo_fonte: "nome" },
        { nome: "cliente_email", label: "Email do Cliente", tipo: "email", ordem: 3, fonte_dados: "lead", campo_fonte: "email" },
        { nome: "cliente_empresa", label: "Empresa", tipo: "text", ordem: 4, fonte_dados: "lead", campo_fonte: "empresa" },
        { nome: "descricao", label: "Descrição", tipo: "textarea", ordem: 5 },
        { nome: "valor_total", label: "Valor Total", tipo: "currency", ordem: 6, obrigatorio: true },
      ];

      await supabase.from("template_fields").insert(
        defaultFields.map((f) => ({ ...f, template_id: data.id }))
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document-templates"] });
      setCreateDialogOpen(false);
      setNewTemplate({ nome: "", descricao: "", category_id: "" });
      toast.success("Template criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar template");
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("document_templates")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document-templates"] });
      toast.success("Template excluído!");
    },
    onError: () => {
      toast.error("Erro ao excluir template");
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: async (template: Template) => {
      const { data: newTemplate, error } = await supabase
        .from("document_templates")
        .insert({
          nome: `${template.nome} (Cópia)`,
          descricao: template.descricao,
          category_id: template.category_id,
          conteudo: template.conteudo,
        })
        .select()
        .single();

      if (error) throw error;

      // Copy fields
      const { data: fields } = await supabase
        .from("template_fields")
        .select("*")
        .eq("template_id", template.id);

      if (fields && fields.length > 0) {
        await supabase.from("template_fields").insert(
          fields.map((f) => ({
            template_id: newTemplate.id,
            nome: f.nome,
            label: f.label,
            tipo: f.tipo,
            placeholder: f.placeholder,
            valor_padrao: f.valor_padrao,
            opcoes: f.opcoes,
            obrigatorio: f.obrigatorio,
            ordem: f.ordem,
            grupo: f.grupo,
            dica: f.dica,
            mascara: f.mascara,
            fonte_dados: f.fonte_dados,
            campo_fonte: f.campo_fonte,
          }))
        );
      }

      return newTemplate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document-templates"] });
      toast.success("Template duplicado!");
    },
    onError: () => {
      toast.error("Erro ao duplicar template");
    },
  });

  const filteredTemplates = templates?.filter((t) =>
    t.nome.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryIcon = (iconName: string | null) => {
    const Icon = iconMap[iconName || "FileText"] || FileText;
    return Icon;
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Modelos de Documentos"
        description="Crie e gerencie templates para orçamentos, contratos e relatórios"
        action={
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Modelo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Modelo</DialogTitle>
                <DialogDescription>
                  Defina o nome e categoria do novo template
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nome do Modelo *</Label>
                  <Input
                    value={newTemplate.nome}
                    onChange={(e) =>
                      setNewTemplate({ ...newTemplate, nome: e.target.value })
                    }
                    placeholder="Ex: Orçamento Padrão"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={newTemplate.category_id}
                    onValueChange={(v) =>
                      setNewTemplate({ ...newTemplate, category_id: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
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
                    value={newTemplate.descricao}
                    onChange={(e) =>
                      setNewTemplate({ ...newTemplate, descricao: e.target.value })
                    }
                    placeholder="Breve descrição do modelo..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={!newTemplate.nome || createMutation.isPending}
                >
                  {createMutation.isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Criar Modelo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar modelos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Todas categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredTemplates?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum modelo encontrado</h3>
            <p className="text-muted-foreground text-center mb-4">
              Crie seu primeiro modelo de documento para começar
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Modelo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates?.map((template) => {
            const Icon = getCategoryIcon(template.document_categories?.icone);
            return (
              <Card key={template.id} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `${template.document_categories?.cor || "#6366f1"}20`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: template.document_categories?.cor || "#6366f1" }}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/modelos/${template.id}/editar`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/documentos/novo?template=${template.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Usar modelo
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => duplicateMutation.mutate(template)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            if (confirm("Excluir este modelo?")) {
                              deleteMutation.mutate(template.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base mt-3">{template.nome}</CardTitle>
                  {template.descricao && (
                    <CardDescription className="line-clamp-2">
                      {template.descricao}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {template.document_categories && (
                        <Badge variant="secondary" className="text-xs">
                          {template.document_categories.nome}
                        </Badge>
                      )}
                      <span>v{template.versao}</span>
                    </div>
                    <span>
                      {format(new Date(template.updated_at), "dd/MM/yy", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default DocumentTemplates;
