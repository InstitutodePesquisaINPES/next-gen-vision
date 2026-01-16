import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CheckSquare,
  Plus,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  MoreHorizontal,
  User,
  Link as LinkIcon,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AdminConfirmDialog } from '@/components/admin/AdminConfirmDialog';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskStatus = Database['public']['Enums']['task_status'];
type PriorityLevel = Database['public']['Enums']['priority_level'];
type Lead = Database['public']['Tables']['leads']['Row'];

const statusConfig: Record<TaskStatus, { label: string; icon: React.ElementType; color: string }> = {
  pendente: { label: 'Pendente', icon: Clock, color: 'text-amber-500' },
  em_progresso: { label: 'Em Progresso', icon: Loader2, color: 'text-blue-500' },
  concluida: { label: 'Concluída', icon: CheckCircle, color: 'text-green-500' },
  cancelada: { label: 'Cancelada', icon: XCircle, color: 'text-gray-500' },
};

const priorityConfig: Record<PriorityLevel, { label: string; color: string; bgColor: string }> = {
  baixa: { label: 'Baixa', color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
  media: { label: 'Média', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  alta: { label: 'Alta', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  urgente: { label: 'Urgente', color: 'text-red-500', bgColor: 'bg-red-500/10' },
};

const taskTypeConfig: Record<string, { label: string; icon: React.ElementType }> = {
  follow_up: { label: 'Follow-up', icon: MessageSquare },
  reuniao: { label: 'Reunião', icon: Calendar },
  ligacao: { label: 'Ligação', icon: Phone },
  email: { label: 'Email', icon: Mail },
  proposta: { label: 'Proposta', icon: FileText },
  outro: { label: 'Outro', icon: CheckSquare },
};

interface TaskWithLead extends Task {
  lead?: Lead | null;
}

export default function AdminTasks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pendente');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<TaskInsert>>({});
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  // Fetch tasks with leads
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, lead:leads(*)')
        .order('data_vencimento', { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data as TaskWithLead[];
    },
  });

  // Fetch leads for dropdown
  const { data: leads } = useQuery({
    queryKey: ['leads-simple'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('id, nome, empresa')
        .not('status', 'in', '(fechado_ganho,fechado_perdido,arquivado)')
        .order('nome');

      if (error) throw error;
      return data as Pick<Lead, 'id' | 'nome' | 'empresa'>[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: TaskInsert) => {
      const { error } = await supabase.from('tasks').insert({
        ...data,
        criado_por: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Tarefa criada com sucesso!');
      setIsCreateDialogOpen(false);
      setFormData({});
    },
    onError: (error) => {
      toast.error('Erro ao criar tarefa: ' + (error as Error).message);
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TaskStatus }) => {
      const updates: Partial<Task> = { status };
      if (status === 'concluida') {
        updates.data_conclusao = new Date().toISOString();
        updates.concluido_por = user?.id;
      }

      const { error } = await supabase.from('tasks').update(updates).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Status atualizado!');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Tarefa excluída!');
    },
  });

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks.filter((task) => {
      const matchesSearch =
        task.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.descricao?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.lead?.nome?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    if (!tasks) return { total: 0, pendentes: 0, vencidas: 0, hoje: 0 };

    const pendentes = tasks.filter((t) => t.status === 'pendente');
    const vencidas = pendentes.filter(
      (t) => t.data_vencimento && isPast(new Date(t.data_vencimento))
    );
    const hoje = pendentes.filter(
      (t) => t.data_vencimento && isToday(new Date(t.data_vencimento))
    );

    return {
      total: tasks.length,
      pendentes: pendentes.length,
      vencidas: vencidas.length,
      hoje: hoje.length,
    };
  }, [tasks]);

  const handleCreate = () => {
    if (!formData.titulo) {
      toast.error('Título é obrigatório');
      return;
    }
    createMutation.mutate(formData as TaskInsert);
  };

  const toggleComplete = (task: Task) => {
    const newStatus: TaskStatus = task.status === 'concluida' ? 'pendente' : 'concluida';
    updateStatusMutation.mutate({ id: task.id, status: newStatus });
  };

  const getDueDateInfo = (date: string | null) => {
    if (!date) return null;

    const dueDate = new Date(date);

    if (isPast(dueDate) && !isToday(dueDate)) {
      return { label: 'Vencida', color: 'text-red-500 bg-red-500/10' };
    }
    if (isToday(dueDate)) {
      return { label: 'Hoje', color: 'text-amber-500 bg-amber-500/10' };
    }
    if (isTomorrow(dueDate)) {
      return { label: 'Amanhã', color: 'text-blue-500 bg-blue-500/10' };
    }
    return {
      label: format(dueDate, 'dd/MM', { locale: ptBR }),
      color: 'text-muted-foreground bg-muted',
    };
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Tarefas"
        description="Gerencie tarefas e follow-ups dos seus leads"
        icon={CheckSquare}
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <AdminStatsCard
          title="Total"
          value={stats.total}
          icon={CheckSquare}
          variant="default"
        />
        <AdminStatsCard
          title="Pendentes"
          value={stats.pendentes}
          icon={Clock}
          variant="warning"
        />
        <AdminStatsCard
          title="Vencidas"
          value={stats.vencidas}
          icon={AlertTriangle}
          variant="default"
          description={stats.vencidas > 0 ? 'Atenção!' : undefined}
        />
        <AdminStatsCard
          title="Para Hoje"
          value={stats.hoje}
          icon={Calendar}
          variant="primary"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <AdminSearchInput
          placeholder="Buscar tarefas..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(statusConfig).map(([value, config]) => (
              <SelectItem key={value} value={value}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <AdminCard title={`Tarefas (${filteredTasks.length})`}>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <AdminEmptyState
            icon={CheckSquare}
            title="Nenhuma tarefa encontrada"
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Tente ajustar os filtros'
                : 'Crie sua primeira tarefa'
            }
            action={
              !searchQuery && statusFilter === 'all'
                ? {
                    label: 'Criar tarefa',
                    onClick: () => setIsCreateDialogOpen(true),
                  }
                : undefined
            }
          />
        ) : (
          <div className="space-y-2 mt-4">
            {filteredTasks.map((task) => {
              const StatusIcon = statusConfig[task.status].icon;
              const TypeIcon = taskTypeConfig[task.tipo || 'outro'].icon;
              const dueInfo = getDueDateInfo(task.data_vencimento);

              return (
                <div
                  key={task.id}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border border-border/50',
                    'hover:border-primary/30 transition-all duration-200',
                    task.status === 'concluida' && 'opacity-60'
                  )}
                >
                  <Checkbox
                    checked={task.status === 'concluida'}
                    onCheckedChange={() => toggleComplete(task)}
                    className="h-5 w-5"
                  />

                  <div className="p-2 rounded-lg bg-muted/50">
                    <TypeIcon className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className={cn(
                          'font-medium text-foreground',
                          task.status === 'concluida' && 'line-through'
                        )}
                      >
                        {task.titulo}
                      </p>
                      {task.prioridade && task.prioridade !== 'media' && (
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-xs',
                            priorityConfig[task.prioridade].color,
                            priorityConfig[task.prioridade].bgColor
                          )}
                        >
                          {priorityConfig[task.prioridade].label}
                        </Badge>
                      )}
                    </div>

                    {task.lead && (
                      <Link
                        to={`/admin/leads/${task.lead.id}`}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        {task.lead.nome}
                        {task.lead.empresa && ` (${task.lead.empresa})`}
                      </Link>
                    )}

                    {task.descricao && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {task.descricao}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {dueInfo && (
                      <Badge variant="outline" className={cn('text-xs', dueInfo.color)}>
                        <Calendar className="h-3 w-3 mr-1" />
                        {dueInfo.label}
                      </Badge>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {task.status !== 'concluida' && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatusMutation.mutate({ id: task.id, status: 'concluida' })
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Marcar como concluída
                          </DropdownMenuItem>
                        )}
                        {task.status !== 'em_progresso' && task.status !== 'concluida' && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatusMutation.mutate({ id: task.id, status: 'em_progresso' })
                            }
                          >
                            <Loader2 className="h-4 w-4 mr-2" />
                            Em progresso
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <AdminConfirmDialog
                          trigger={
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-destructive focus:text-destructive"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          }
                          title="Excluir tarefa?"
                          description="Esta ação não pode ser desfeita."
                          confirmLabel="Excluir"
                          variant="danger"
                          onConfirm={() => deleteMutation.mutate(task.id)}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
            <DialogDescription>Crie uma nova tarefa ou follow-up</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={formData.titulo || ''}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Título da tarefa"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select
                  value={formData.tipo || 'follow_up'}
                  onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(taskTypeConfig).map(([value, config]) => (
                      <SelectItem key={value} value={value}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select
                  value={formData.prioridade || 'media'}
                  onValueChange={(value) =>
                    setFormData({ ...formData, prioridade: value as PriorityLevel })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(priorityConfig).map(([value, config]) => (
                      <SelectItem key={value} value={value}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="lead">Lead (opcional)</Label>
              <Select
                value={formData.lead_id || ''}
                onValueChange={(value) =>
                  setFormData({ ...formData, lead_id: value || null })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um lead" />
                </SelectTrigger>
                <SelectContent>
                  {leads?.map((lead) => (
                    <SelectItem key={lead.id} value={lead.id}>
                      {lead.nome} {lead.empresa && `(${lead.empresa})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vencimento">Data de Vencimento</Label>
              <Input
                id="vencimento"
                type="datetime-local"
                value={formData.data_vencimento?.slice(0, 16) || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    data_vencimento: e.target.value ? new Date(e.target.value).toISOString() : null,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao || ''}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Detalhes da tarefa..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Criar Tarefa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
