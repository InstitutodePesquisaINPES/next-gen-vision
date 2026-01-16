import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Webhook,
  Plus,
  Trash2,
  Loader2,
  MoreHorizontal,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit2,
  Play,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AdminConfirmDialog } from '@/components/admin/AdminConfirmDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type WebhookType = Database['public']['Tables']['webhooks']['Row'];
type WebhookInsert = Database['public']['Tables']['webhooks']['Insert'];
type WebhookLog = Database['public']['Tables']['webhook_logs']['Row'];

const availableEvents = [
  { id: 'lead_criado', label: 'Lead Criado', description: 'Quando um novo lead é cadastrado' },
  { id: 'lead_atualizado', label: 'Lead Atualizado', description: 'Quando um lead é modificado' },
  { id: 'lead_status_alterado', label: 'Status Alterado', description: 'Quando o status do lead muda' },
  { id: 'tarefa_criada', label: 'Tarefa Criada', description: 'Quando uma nova tarefa é criada' },
  { id: 'tarefa_concluida', label: 'Tarefa Concluída', description: 'Quando uma tarefa é finalizada' },
];

const authTypes = [
  { value: 'none', label: 'Nenhuma' },
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'api_key', label: 'API Key (Header)' },
  { value: 'basic', label: 'Basic Auth' },
];

export default function AdminWebhooks() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<WebhookType | null>(null);
  const [viewingLogs, setViewingLogs] = useState<WebhookType | null>(null);
  const [formData, setFormData] = useState<Partial<WebhookInsert>>({ eventos: [] });
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  // Fetch webhooks
  const { data: webhooks, isLoading } = useQuery({
    queryKey: ['webhooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WebhookType[];
    },
  });

  // Fetch logs for selected webhook
  const { data: logs, isLoading: logsLoading } = useQuery({
    queryKey: ['webhook-logs', viewingLogs?.id],
    queryFn: async () => {
      if (!viewingLogs) return [];
      const { data, error } = await supabase
        .from('webhook_logs')
        .select('*')
        .eq('webhook_id', viewingLogs.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data as WebhookLog[];
    },
    enabled: !!viewingLogs,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: WebhookInsert) => {
      const { error } = await supabase.from('webhooks').insert({
        ...data,
        criado_por: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success('Webhook criado com sucesso!');
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error('Erro ao criar webhook: ' + (error as Error).message);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<WebhookType> }) => {
      const { error } = await supabase.from('webhooks').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success('Webhook atualizado!');
      setEditingWebhook(null);
      resetForm();
    },
  });

  // Toggle active mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('webhooks').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success('Status atualizado!');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('webhooks').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success('Webhook excluído!');
    },
  });

  const resetForm = () => {
    setFormData({ eventos: [] });
  };

  const handleCreate = () => {
    if (!formData.nome || !formData.url) {
      toast.error('Nome e URL são obrigatórios');
      return;
    }
    if (!formData.eventos || formData.eventos.length === 0) {
      toast.error('Selecione pelo menos um evento');
      return;
    }
    createMutation.mutate(formData as WebhookInsert);
  };

  const handleUpdate = () => {
    if (!editingWebhook) return;
    updateMutation.mutate({ id: editingWebhook.id, data: formData });
  };

  const openEditDialog = (webhook: WebhookType) => {
    setFormData({
      nome: webhook.nome,
      descricao: webhook.descricao,
      url: webhook.url,
      metodo: webhook.metodo,
      eventos: webhook.eventos || [],
      auth_type: webhook.auth_type,
      auth_value: webhook.auth_value,
      retry_count: webhook.retry_count,
      timeout_seconds: webhook.timeout_seconds,
    });
    setEditingWebhook(webhook);
  };

  const toggleEvent = (eventId: string) => {
    const currentEvents = formData.eventos || [];
    if (currentEvents.includes(eventId)) {
      setFormData({ ...formData, eventos: currentEvents.filter((e) => e !== eventId) });
    } else {
      setFormData({ ...formData, eventos: [...currentEvents, eventId] });
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copiada!');
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Webhooks"
        description="Configure integrações externas via HTTP"
        icon={Webhook}
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Webhook
          </Button>
        }
      />

      {/* Info Card */}
      <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Como funcionam os Webhooks?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Webhooks enviam requisições HTTP automaticamente quando eventos específicos acontecem
              no CRM. Use para integrar com n8n, Zapier, Make, ou qualquer sistema que aceite HTTP.
            </p>
          </div>
        </div>
      </div>

      {/* Webhooks List */}
      <AdminCard title={`Webhooks (${webhooks?.length || 0})`}>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !webhooks || webhooks.length === 0 ? (
          <AdminEmptyState
            icon={Webhook}
            title="Nenhum webhook configurado"
            description="Crie seu primeiro webhook para integrar com sistemas externos"
            action={{
              label: 'Criar webhook',
              onClick: () => setIsCreateDialogOpen(true),
            }}
          />
        ) : (
          <div className="space-y-3 mt-4">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-200"
              >
                <div className={cn('p-3 rounded-lg', webhook.is_active ? 'bg-green-500/10' : 'bg-muted')}>
                  <Webhook
                    className={cn('h-5 w-5', webhook.is_active ? 'text-green-500' : 'text-muted-foreground')}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{webhook.nome}</p>
                    <Badge variant="outline" className="text-xs">
                      {webhook.metodo}
                    </Badge>
                    {!webhook.is_active && (
                      <Badge variant="outline" className="text-xs bg-muted">
                        Inativo
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded truncate max-w-md">
                      {webhook.url}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyUrl(webhook.url)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {webhook.total_disparos} disparos
                    </span>
                    {webhook.ultimo_disparo && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Último: {formatDistanceToNow(new Date(webhook.ultimo_disparo), { locale: ptBR })}
                      </span>
                    )}
                    <span>
                      {webhook.eventos?.length || 0} evento(s)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    checked={webhook.is_active}
                    onCheckedChange={(checked) =>
                      toggleActiveMutation.mutate({ id: webhook.id, is_active: checked })
                    }
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setViewingLogs(webhook)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver logs
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(webhook)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AdminConfirmDialog
                        trigger={
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        }
                        title="Excluir webhook?"
                        description="Esta ação não pode ser desfeita. Todos os logs serão removidos."
                        confirmLabel="Excluir"
                        variant="danger"
                        onConfirm={() => deleteMutation.mutate(webhook.id)}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || !!editingWebhook}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setEditingWebhook(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingWebhook ? 'Editar Webhook' : 'Novo Webhook'}</DialogTitle>
            <DialogDescription>Configure uma integração HTTP externa</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome || ''}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Integração n8n"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="metodo">Método HTTP</Label>
                <Select
                  value={formData.metodo || 'POST'}
                  onValueChange={(value) => setFormData({ ...formData, metodo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="url">URL do Webhook *</Label>
              <Input
                id="url"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao || ''}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Para que serve este webhook..."
                rows={2}
              />
            </div>

            <div>
              <Label className="mb-3 block">Eventos que disparam o webhook *</Label>
              <div className="space-y-2">
                {availableEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                      formData.eventos?.includes(event.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border/50 hover:border-primary/30'
                    )}
                    onClick={() => toggleEvent(event.id)}
                  >
                    <Checkbox
                      checked={formData.eventos?.includes(event.id)}
                      onCheckedChange={() => toggleEvent(event.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.label}</p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="auth_type">Autenticação</Label>
                <Select
                  value={formData.auth_type || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, auth_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {authTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.auth_type && formData.auth_type !== 'none' && (
                <div>
                  <Label htmlFor="auth_value">Token/Credencial</Label>
                  <Input
                    id="auth_value"
                    type="password"
                    value={formData.auth_value || ''}
                    onChange={(e) => setFormData({ ...formData, auth_value: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="retry_count">Tentativas de retry</Label>
                <Input
                  id="retry_count"
                  type="number"
                  min={0}
                  max={5}
                  value={formData.retry_count ?? 3}
                  onChange={(e) =>
                    setFormData({ ...formData, retry_count: parseInt(e.target.value) || 3 })
                  }
                />
              </div>
              <div>
                <Label htmlFor="timeout">Timeout (segundos)</Label>
                <Input
                  id="timeout"
                  type="number"
                  min={5}
                  max={60}
                  value={formData.timeout_seconds ?? 30}
                  onChange={(e) =>
                    setFormData({ ...formData, timeout_seconds: parseInt(e.target.value) || 30 })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setEditingWebhook(null);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={editingWebhook ? handleUpdate : handleCreate}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {editingWebhook ? 'Salvar' : 'Criar Webhook'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logs Sheet */}
      <Sheet open={!!viewingLogs} onOpenChange={(open) => !open && setViewingLogs(null)}>
        <SheetContent className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Logs - {viewingLogs?.nome}</SheetTitle>
            <SheetDescription>Últimas 50 execuções do webhook</SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-150px)] mt-4">
            {logsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : !logs || logs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum log encontrado
              </div>
            ) : (
              <div className="space-y-3 pr-4">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={cn(
                      'p-3 rounded-lg border',
                      log.status_code && log.status_code >= 200 && log.status_code < 300
                        ? 'border-green-500/30 bg-green-500/5'
                        : log.error_message
                        ? 'border-red-500/30 bg-red-500/5'
                        : 'border-border/50'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {log.status_code && log.status_code >= 200 && log.status_code < 300 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <Badge variant="outline">{log.evento}</Badge>
                        {log.status_code && (
                          <span className="text-xs text-muted-foreground">
                            HTTP {log.status_code}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(log.created_at), 'dd/MM HH:mm:ss', { locale: ptBR })}
                      </span>
                    </div>

                    {log.response_time_ms && (
                      <p className="text-xs text-muted-foreground mb-1">
                        Tempo de resposta: {log.response_time_ms}ms
                      </p>
                    )}

                    {log.error_message && (
                      <p className="text-xs text-red-500 mt-2">{log.error_message}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
}
