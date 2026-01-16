import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";
import {
  ArrowLeft,
  Download,
  Send,
  Printer,
  Loader2,
  Clock,
  CheckCircle,
  FileText,
  User,
  Calendar,
  Mail,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Document {
  id: string;
  titulo: string;
  conteudo_html: string;
  dados_preenchidos: Record<string, any>;
  status: string | null;
  arquivo_url: string | null;
  enviado_para: string | null;
  enviado_em: string | null;
  created_at: string;
  updated_at: string;
  template_id: string | null;
  lead_id: string | null;
  document_templates: { nome: string } | null;
  leads: { nome: string; email: string | null; empresa: string | null } | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  rascunho: { label: "Rascunho", color: "bg-gray-500", icon: Clock },
  finalizado: { label: "Finalizado", color: "bg-blue-500", icon: CheckCircle },
  enviado: { label: "Enviado", color: "bg-green-500", icon: Send },
  assinado: { label: "Assinado", color: "bg-purple-500", icon: CheckCircle },
};

const DocumentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [sendEmail, setSendEmail] = useState("");

  const { data: document, isLoading } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_documents")
        .select("*, document_templates(nome), leads(nome, email, empresa)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Document;
    },
    enabled: !!id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const { error } = await supabase
        .from("generated_documents")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document", id] });
      toast.success("Status atualizado!");
    },
    onError: () => {
      toast.error("Erro ao atualizar status");
    },
  });

  const sendMutation = useMutation({
    mutationFn: async () => {
      // TODO: Implement email sending via edge function
      const { error } = await supabase
        .from("generated_documents")
        .update({
          status: "enviado",
          enviado_para: sendEmail,
          enviado_em: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document", id] });
      setSendDialogOpen(false);
      toast.success("Documento marcado como enviado!");
    },
    onError: () => {
      toast.error("Erro ao enviar documento");
    },
  });

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && document) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${document.titulo}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${document.conteudo_html}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (isLoading || !document) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  const status = statusConfig[document.status || "rascunho"];
  const StatusIcon = status.icon;

  return (
    <AdminLayout>
      <AdminPageHeader
        title={document.titulo}
        description={`Documento ${status.label.toLowerCase()}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/documentos")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button onClick={() => {
              setSendEmail(document.leads?.email || "");
              setSendDialogOpen(true);
            }}>
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Documento</CardTitle>
              <Badge className={`${status.color} text-white`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-lg p-6 bg-white text-black min-h-[600px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: document.conteudo_html }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Template:</span>
                <span>{document.document_templates?.nome || "—"}</span>
              </div>
              {document.leads && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Lead:</span>
                  <span>{document.leads.nome}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Criado:</span>
                <span>
                  {format(new Date(document.created_at), "dd/MM/yyyy HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              {document.enviado_para && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Enviado para:</span>
                  <span className="truncate">{document.enviado_para}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Alterar Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={document.status || "rascunho"}
                onValueChange={(v) => updateStatusMutation.mutate(v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="assinado">Assinado</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {document.dados_preenchidos && Object.keys(document.dados_preenchidos).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dados Utilizados</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  {Object.entries(document.dados_preenchidos).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-muted-foreground">{key}:</dt>
                      <dd className="font-medium truncate max-w-[150px]">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Send Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Documento</DialogTitle>
            <DialogDescription>
              Informe o email para onde deseja enviar o documento
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>Email de destino</Label>
            <Input
              type="email"
              value={sendEmail}
              onChange={(e) => setSendEmail(e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => sendMutation.mutate()}
              disabled={!sendEmail || sendMutation.isPending}
            >
              {sendMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default DocumentView;
