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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Plus,
  Search,
  FileText,
  Eye,
  Download,
  Trash2,
  MoreHorizontal,
  Loader2,
  Send,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Document {
  id: string;
  titulo: string;
  status: string | null;
  arquivo_url: string | null;
  enviado_para: string | null;
  enviado_em: string | null;
  created_at: string;
  template_id: string | null;
  lead_id: string | null;
  document_templates: { nome: string } | null;
  leads: { nome: string; empresa: string | null } | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  rascunho: { label: "Rascunho", color: "bg-gray-500", icon: Clock },
  finalizado: { label: "Finalizado", color: "bg-blue-500", icon: CheckCircle },
  enviado: { label: "Enviado", color: "bg-green-500", icon: Send },
  assinado: { label: "Assinado", color: "bg-purple-500", icon: CheckCircle },
};

const Documents = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: documents, isLoading } = useQuery({
    queryKey: ["generated-documents", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("generated_documents")
        .select("*, document_templates(nome), leads(nome, empresa)")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Document[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("generated_documents")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generated-documents"] });
      toast.success("Documento excluído!");
    },
    onError: () => {
      toast.error("Erro ao excluir documento");
    },
  });

  const filteredDocuments = documents?.filter((doc) =>
    doc.titulo.toLowerCase().includes(search.toLowerCase()) ||
    doc.leads?.nome.toLowerCase().includes(search.toLowerCase()) ||
    doc.leads?.empresa?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Documentos Gerados"
        description="Visualize e gerencie documentos criados a partir dos templates"
        action={
          <Button asChild>
            <Link to="/admin/documentos/novo">
              <Plus className="w-4 h-4 mr-2" />
              Novo Documento
            </Link>
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, cliente ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="finalizado">Finalizado</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="assinado">Assinado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents Table */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredDocuments?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg border-dashed">
          <FileText className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhum documento encontrado</h3>
          <p className="text-muted-foreground text-center mb-4">
            Crie seu primeiro documento a partir de um template
          </p>
          <Button asChild>
            <Link to="/admin/documentos/novo">
              <Plus className="w-4 h-4 mr-2" />
              Novo Documento
            </Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments?.map((doc) => {
                const status = statusConfig[doc.status || "rascunho"];
                const StatusIcon = status.icon;
                return (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.titulo}</p>
                          {doc.enviado_para && (
                            <p className="text-xs text-muted-foreground">
                              Enviado para: {doc.enviado_para}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {doc.leads ? (
                        <div>
                          <p>{doc.leads.nome}</p>
                          {doc.leads.empresa && (
                            <p className="text-xs text-muted-foreground">
                              {doc.leads.empresa}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {doc.document_templates?.nome || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${status.color} text-white`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(doc.created_at), "dd/MM/yyyy HH:mm", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/documentos/${doc.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </Link>
                          </DropdownMenuItem>
                          {doc.arquivo_url && (
                            <DropdownMenuItem asChild>
                              <a
                                href={doc.arquivo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              if (confirm("Excluir este documento?")) {
                                deleteMutation.mutate(doc.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Documents;
