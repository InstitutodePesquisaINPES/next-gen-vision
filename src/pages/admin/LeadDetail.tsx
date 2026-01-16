import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  User,
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  TrendingUp,
  Edit2,
  Trash2,
  Plus,
  Loader2,
  Star,
  Send,
  FileText,
  Video,
  ExternalLink,
  CheckCircle,
  Activity,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminConfirmDialog } from '@/components/admin/AdminConfirmDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadInteraction = Database['public']['Tables']['lead_interactions']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];
type InteractionType = Database['public']['Enums']['interaction_type'];
type LeadStatus = Database['public']['Enums']['lead_status'];

const statusConfig: Record<LeadStatus, { label: string; color: string; bgColor: string }> = {
  novo: { label: 'Novo', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  qualificado: { label: 'Qualificado', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  proposta_enviada: { label: 'Proposta Enviada', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  negociacao: { label: 'Negociação', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  fechado_ganho: { label: 'Fechado - Ganho', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  fechado_perdido: { label: 'Fechado - Perdido', color: 'text-red-500', bgColor: 'bg-red-500/10' },
  arquivado: { label: 'Arquivado', color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
};

const interactionTypeConfig: Record<InteractionType, { label: string; icon: React.ElementType; color: string }> = {
  email: { label: 'Email', icon: Mail, color: 'text-blue-500 bg-blue-500/10' },
  telefone: { label: 'Telefone', icon: Phone, color: 'text-green-500 bg-green-500/10' },
  whatsapp: { label: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-500 bg-emerald-500/10' },
  reuniao: { label: 'Reunião', icon: Video, color: 'text-purple-500 bg-purple-500/10' },
  proposta: { label: 'Proposta', icon: FileText, color: 'text-amber-500 bg-amber-500/10' },
  nota: { label: 'Nota', icon: FileText, color: 'text-gray-500 bg-gray-500/10' },
  sistema: { label: 'Sistema', icon: Activity, color: 'text-primary bg-primary/10' },
};

export default function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();
  const [isAddInteractionOpen, setIsAddInteractionOpen] = useState(false);
  const [interactionForm, setInteractionForm] = useState<{
    tipo: InteractionType;
    titulo: string;
    descricao: string;
  }>({ tipo: 'nota', titulo: '', descricao: '' });

  // Fetch lead
  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Lead não encontrado');
      return data as Lead;
    },
    enabled: !!id,
  });

  // Fetch interactions
  const { data: interactions } = useQuery({
    queryKey: ['lead-interactions', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lead_interactions')
        .select('*')
        .eq('lead_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LeadInteraction[];
    },
    enabled: !!id,
  });

  // Fetch tasks
  const { data: tasks } = useQuery({
    queryKey: ['lead-tasks', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('lead_id', id)
        .order('data_vencimento', { ascending: true });

      if (error) throw error;
      return data as Task[];
    },
    enabled: !!id,
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async (status: LeadStatus) => {
      const { error } = await supabase
        .from('leads')
        .update({ status, atualizado_por: user?.id })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Status atualizado!');
    },
  });

  // Add interaction mutation
  const addInteractionMutation = useMutation({
    mutationFn: async (data: { tipo: InteractionType; titulo: string; descricao: string }) => {
      const { error } = await supabase.from('lead_interactions').insert({
        lead_id: id,
        tipo: data.tipo,
        titulo: data.titulo,
        descricao: data.descricao,
        criado_por: user?.id,
      });
      if (error) throw error;

      // Update last contact date
      await supabase
        .from('leads')
        .update({ data_ultimo_contato: new Date().toISOString() })
        .eq('id', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead-interactions', id] });
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
      toast.success('Interação registrada!');
      setIsAddInteractionOpen(false);
      setInteractionForm({ tipo: 'nota', titulo: '', descricao: '' });
    },
  });

  // Delete lead mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Lead excluído!');
      navigate('/admin/leads');
    },
  });

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  const formatCurrency = (value: number | null) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  if (!lead) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Lead não encontrado</p>
          <Button asChild className="mt-4">
            <Link to="/admin/leads">Voltar para Leads</Link>
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/leads')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
            {getInitials(lead.nome)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{lead.nome}</h1>
            <Badge
              variant="outline"
              className={cn(statusConfig[lead.status].color, statusConfig[lead.status].bgColor)}
            >
              {statusConfig[lead.status].label}
            </Badge>
          </div>
          {lead.empresa && (
            <p className="text-muted-foreground flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {lead.empresa}
              {lead.cargo && ` • ${lead.cargo}`}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={lead.status}
            onValueChange={(value) => updateStatusMutation.mutate(value as LeadStatus)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AdminConfirmDialog
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Excluir lead?"
            description="Esta ação não pode ser desfeita. Todas as interações e tarefas serão removidas."
            confirmLabel="Excluir"
            variant="danger"
            onConfirm={() => deleteMutation.mutate()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {lead.email && (
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${lead.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </a>
              </Button>
            )}
            {lead.whatsapp && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            )}
            {lead.telefone && (
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${lead.telefone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </a>
              </Button>
            )}
            <Button size="sm" onClick={() => setIsAddInteractionOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Interação
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="timeline">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tasks">Tarefas ({tasks?.length || 0})</TabsTrigger>
              <TabsTrigger value="info">Informações</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-4">
              <AdminCard title="Histórico de Interações">
                {!interactions || interactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma interação registrada</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => setIsAddInteractionOpen(true)}
                    >
                      Registrar primeira interação
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 mt-4">
                    {interactions.map((interaction) => {
                      const config = interactionTypeConfig[interaction.tipo];
                      const Icon = config.icon;

                      return (
                        <div key={interaction.id} className="flex gap-4">
                          <div className={cn('p-2 rounded-lg h-fit', config.color)}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 pb-4 border-b border-border/30 last:border-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium">{interaction.titulo}</p>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(interaction.created_at), {
                                  addSuffix: true,
                                  locale: ptBR,
                                })}
                              </span>
                            </div>
                            {interaction.descricao && (
                              <p className="text-sm text-muted-foreground">{interaction.descricao}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </AdminCard>
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <AdminCard
                title="Tarefas"
                description="Tarefas e follow-ups relacionados a este lead"
              >
                {!tasks || tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma tarefa encontrada</p>
                    <Button size="sm" variant="outline" className="mt-2" asChild>
                      <Link to="/admin/tarefas">Criar Tarefa</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 mt-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-lg border border-border/30',
                          task.status === 'concluida' && 'opacity-60'
                        )}
                      >
                        <CheckCircle
                          className={cn(
                            'h-5 w-5',
                            task.status === 'concluida' ? 'text-green-500' : 'text-muted-foreground'
                          )}
                        />
                        <div className="flex-1">
                          <p
                            className={cn(
                              'font-medium',
                              task.status === 'concluida' && 'line-through'
                            )}
                          >
                            {task.titulo}
                          </p>
                          {task.data_vencimento && (
                            <p className="text-xs text-muted-foreground">
                              Vencimento:{' '}
                              {format(new Date(task.data_vencimento), 'dd/MM/yyyy', { locale: ptBR })}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AdminCard>
            </TabsContent>

            <TabsContent value="info" className="mt-4">
              <AdminCard title="Informações Completas">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Nome</Label>
                    <p className="font-medium">{lead.nome}</p>
                  </div>
                  <div>
                    <Label>Empresa</Label>
                    <p className="font-medium">{lead.empresa || '-'}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="font-medium">{lead.email || '-'}</p>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <p className="font-medium">{lead.telefone || '-'}</p>
                  </div>
                  <div>
                    <Label>WhatsApp</Label>
                    <p className="font-medium">{lead.whatsapp || '-'}</p>
                  </div>
                  <div>
                    <Label>Cargo</Label>
                    <p className="font-medium">{lead.cargo || '-'}</p>
                  </div>
                  <div>
                    <Label>Origem</Label>
                    <p className="font-medium capitalize">{lead.origem || '-'}</p>
                  </div>
                  <div>
                    <Label>Criado em</Label>
                    <p className="font-medium">
                      {format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </p>
                  </div>
                </div>

                {lead.observacoes && (
                  <div className="mt-4">
                    <Label>Observações</Label>
                    <p className="mt-1 text-muted-foreground whitespace-pre-wrap">{lead.observacoes}</p>
                  </div>
                )}

                {lead.tags && lead.tags.length > 0 && (
                  <div className="mt-4">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lead.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </AdminCard>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score Card */}
          <AdminCard>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-amber-500" />
                <span className="text-3xl font-bold">{lead.score || 0}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Score de Qualificação</p>
              <Progress value={lead.score || 0} className="h-2" />
            </div>
          </AdminCard>

          {/* Value Card */}
          <AdminCard>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Valor Estimado</p>
                <p className="text-2xl font-bold text-green-500">
                  {formatCurrency(lead.valor_estimado)}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs text-muted-foreground mb-1">Probabilidade</p>
                <div className="flex items-center gap-2">
                  <Progress value={lead.probabilidade || 50} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{lead.probabilidade || 50}%</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Valor Ponderado</p>
                <p className="font-semibold">
                  {formatCurrency(
                    (lead.valor_estimado || 0) * ((lead.probabilidade || 50) / 100)
                  )}
                </p>
              </div>
            </div>
          </AdminCard>

          {/* Timeline */}
          <AdminCard title="Datas">
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Criado:</span>
                <span>{format(new Date(lead.created_at), 'dd/MM/yyyy', { locale: ptBR })}</span>
              </div>

              {lead.data_ultimo_contato && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Último contato:</span>
                  <span>
                    {formatDistanceToNow(new Date(lead.data_ultimo_contato), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>
              )}

              {lead.data_fechamento_previsto && (
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Previsão:</span>
                  <span>
                    {format(new Date(lead.data_fechamento_previsto), 'dd/MM/yyyy', { locale: ptBR })}
                  </span>
                </div>
              )}
            </div>
          </AdminCard>

          {/* UTM Info */}
          {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
            <AdminCard title="Origem (UTM)">
              <div className="space-y-2 mt-4 text-sm">
                {lead.utm_source && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="font-mono">{lead.utm_source}</span>
                  </div>
                )}
                {lead.utm_medium && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Medium:</span>
                    <span className="font-mono">{lead.utm_medium}</span>
                  </div>
                )}
                {lead.utm_campaign && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campaign:</span>
                    <span className="font-mono">{lead.utm_campaign}</span>
                  </div>
                )}
              </div>
            </AdminCard>
          )}
        </div>
      </div>

      {/* Add Interaction Dialog */}
      <Dialog open={isAddInteractionOpen} onOpenChange={setIsAddInteractionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Interação</DialogTitle>
            <DialogDescription>Adicione uma nota ou registro de contato</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Tipo</Label>
              <Select
                value={interactionForm.tipo}
                onValueChange={(value) =>
                  setInteractionForm({ ...interactionForm, tipo: value as InteractionType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(interactionTypeConfig).map(([value, config]) => (
                    <SelectItem key={value} value={value}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Título</Label>
              <Input
                value={interactionForm.titulo}
                onChange={(e) =>
                  setInteractionForm({ ...interactionForm, titulo: e.target.value })
                }
                placeholder="Resumo da interação"
              />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                value={interactionForm.descricao}
                onChange={(e) =>
                  setInteractionForm({ ...interactionForm, descricao: e.target.value })
                }
                placeholder="Detalhes da interação..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddInteractionOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => addInteractionMutation.mutate(interactionForm)}
              disabled={addInteractionMutation.isPending || !interactionForm.titulo}
            >
              {addInteractionMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-xs text-muted-foreground mb-1 block">{children}</span>;
}
