import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format, differenceInDays, parseISO, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  FolderKanban,
  FileText,
  Users,
  TrendingUp,
  Target,
  Milestone,
  ChevronRight
} from 'lucide-react';

type ProjectPhase = 'discovery' | 'exploration' | 'development' | 'production' | 'operations' | 'concluido';
type ProjectStatus = 'proposta' | 'aprovado' | 'em_andamento' | 'pausado' | 'concluido' | 'cancelado';

interface Deliverable {
  id: string;
  project_id: string;
  titulo: string;
  descricao: string | null;
  fase: ProjectPhase;
  status: string | null;
  data_prevista: string | null;
  data_entrega: string | null;
  ordem: number | null;
}

const phases: { key: ProjectPhase; label: string; description: string; icon: typeof Target }[] = [
  { key: 'discovery', label: 'Discovery', description: 'Entendimento do problema e levantamento de requisitos', icon: Target },
  { key: 'exploration', label: 'Exploration', description: 'Análise exploratória e definição de hipóteses', icon: Milestone },
  { key: 'development', label: 'Development', description: 'Desenvolvimento de modelos e soluções', icon: TrendingUp },
  { key: 'production', label: 'Production', description: 'Implementação e deploy da solução', icon: CheckCircle2 },
  { key: 'operations', label: 'Operations', description: 'Monitoramento e manutenção contínua', icon: Clock },
  { key: 'concluido', label: 'Concluído', description: 'Projeto finalizado', icon: CheckCircle2 },
];

const phaseColors: Record<ProjectPhase, string> = {
  discovery: 'bg-purple-500',
  exploration: 'bg-blue-500',
  development: 'bg-cyan-500',
  production: 'bg-emerald-500',
  operations: 'bg-green-500',
  concluido: 'bg-gray-500'
};

const statusLabels: Record<ProjectStatus, string> = {
  proposta: 'Proposta',
  aprovado: 'Aprovado',
  em_andamento: 'Em Andamento',
  pausado: 'Pausado',
  concluido: 'Concluído',
  cancelado: 'Cancelado'
};

const statusColors: Record<ProjectStatus, string> = {
  proposta: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  aprovado: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  em_andamento: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  pausado: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  concluido: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelado: 'bg-red-500/20 text-red-400 border-red-500/30'
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isDeliverableDialogOpen, setIsDeliverableDialogOpen] = useState(false);
  const [deliverableForm, setDeliverableForm] = useState({
    titulo: '',
    descricao: '',
    fase: 'discovery' as ProjectPhase,
    data_prevista: ''
  });

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, leads(nome, empresa, email)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const { data: deliverables } = useQuery({
    queryKey: ['project-deliverables', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_deliverables')
        .select('*')
        .eq('project_id', id)
        .order('fase')
        .order('ordem');
      if (error) throw error;
      return data as Deliverable[];
    },
    enabled: !!id
  });

  const { data: phaseHistory } = useQuery({
    queryKey: ['project-phase-history', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_phase_history')
        .select('*')
        .eq('project_id', id)
        .order('data_transicao', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const updatePhaseMutation = useMutation({
    mutationFn: async (newPhase: ProjectPhase) => {
      const { error } = await supabase
        .from('projects')
        .update({ fase_atual: newPhase })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['project-phase-history', id] });
      toast.success('Fase atualizada!');
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const createDeliverableMutation = useMutation({
    mutationFn: async (data: typeof deliverableForm) => {
      const { error } = await supabase.from('project_deliverables').insert({
        project_id: id,
        titulo: data.titulo,
        descricao: data.descricao || null,
        fase: data.fase,
        data_prevista: data.data_prevista || null,
        status: 'pendente'
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-deliverables', id] });
      toast.success('Entregável criado!');
      setIsDeliverableDialogOpen(false);
      setDeliverableForm({ titulo: '', descricao: '', fase: 'discovery', data_prevista: '' });
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const updateDeliverableStatusMutation = useMutation({
    mutationFn: async ({ deliverableId, status }: { deliverableId: string; status: string }) => {
      const updates: Record<string, unknown> = { status };
      if (status === 'concluido') {
        updates.data_entrega = new Date().toISOString().split('T')[0];
      }
      const { error } = await supabase
        .from('project_deliverables')
        .update(updates)
        .eq('id', deliverableId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-deliverables', id] });
      toast.success('Status atualizado!');
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const formatCurrency = (value: number | null) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getCurrentPhaseIndex = () => {
    if (!project) return 0;
    return phases.findIndex(p => p.key === project.fase_atual);
  };

  const calculateProgress = () => {
    const currentIndex = getCurrentPhaseIndex();
    return Math.round(((currentIndex + 1) / phases.length) * 100);
  };

  const getDaysRemaining = () => {
    if (!project?.data_estimada_fim) return null;
    const endDate = parseISO(project.data_estimada_fim);
    const today = new Date();
    const days = differenceInDays(endDate, today);
    return days;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </AdminLayout>
    );
  }

  if (!project) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold mb-2">Projeto não encontrado</h2>
          <Link to="/admin/projetos">
            <Button variant="outline">Voltar para Projetos</Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const daysRemaining = getDaysRemaining();

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/projetos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{project.nome}</h1>
            <p className="text-muted-foreground">
              {project.leads?.empresa || project.leads?.nome || 'Cliente não vinculado'}
            </p>
          </div>
        </div>
        <Badge variant="outline" className={statusColors[project.status as ProjectStatus]}>
          {statusLabels[project.status as ProjectStatus]}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FolderKanban className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fase Atual</p>
                <p className="font-semibold">{phases.find(p => p.key === project.fase_atual)?.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Contrato</p>
                <p className="font-semibold">{formatCurrency(project.valor_contrato)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progresso</p>
                <p className="font-semibold">{project.percentual_conclusao || calculateProgress()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${daysRemaining && daysRemaining < 7 ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                <Clock className={`h-5 w-5 ${daysRemaining && daysRemaining < 7 ? 'text-red-500' : 'text-amber-500'}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prazo</p>
                <p className="font-semibold">
                  {daysRemaining !== null 
                    ? daysRemaining > 0 
                      ? `${daysRemaining} dias` 
                      : daysRemaining === 0 
                        ? 'Hoje' 
                        : `${Math.abs(daysRemaining)} dias atraso`
                    : 'Não definido'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Visual */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Milestone className="h-5 w-5" />
            Timeline do Projeto
          </CardTitle>
          <CardDescription>Acompanhe a evolução do projeto através das fases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full" />
            {/* Progress Bar Fill */}
            <div 
              className="absolute top-6 left-0 h-1 bg-primary rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
            
            {/* Phase Points */}
            <div className="relative flex justify-between">
              {phases.map((phase, index) => {
                const currentIndex = getCurrentPhaseIndex();
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;
                const PhaseIcon = phase.icon;

                return (
                  <div 
                    key={phase.key}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => {
                      if (index <= currentIndex + 1 && index >= currentIndex - 1) {
                        updatePhaseMutation.mutate(phase.key);
                      }
                    }}
                  >
                    <div 
                      className={`
                        relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                        transition-all duration-300 border-2
                        ${isCompleted 
                          ? `${phaseColors[phase.key]} text-white border-transparent` 
                          : isCurrent 
                            ? `bg-background ${phaseColors[phase.key]} border-current ring-4 ring-primary/20` 
                            : 'bg-muted text-muted-foreground border-muted-foreground/30'}
                        ${index <= currentIndex + 1 && index >= currentIndex - 1 ? 'hover:scale-110' : 'opacity-50'}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <PhaseIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`mt-3 text-sm font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                      {phase.label}
                    </span>
                    <span className="text-xs text-muted-foreground text-center max-w-[100px] hidden md:block">
                      {phase.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="deliverables" className="space-y-6">
        <TabsList>
          <TabsTrigger value="deliverables">Entregáveis</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
        </TabsList>

        <TabsContent value="deliverables">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Entregáveis do Projeto</CardTitle>
                <CardDescription>Gerencie os entregáveis por fase</CardDescription>
              </div>
              <Dialog open={isDeliverableDialogOpen} onOpenChange={setIsDeliverableDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Entregável
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Entregável</DialogTitle>
                  </DialogHeader>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      createDeliverableMutation.mutate(deliverableForm);
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label>Título *</Label>
                      <Input
                        value={deliverableForm.titulo}
                        onChange={(e) => setDeliverableForm({ ...deliverableForm, titulo: e.target.value })}
                        placeholder="Ex: Relatório de análise exploratória"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Textarea
                        value={deliverableForm.descricao}
                        onChange={(e) => setDeliverableForm({ ...deliverableForm, descricao: e.target.value })}
                        placeholder="Descreva o entregável..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Fase</Label>
                        <Select
                          value={deliverableForm.fase}
                          onValueChange={(v) => setDeliverableForm({ ...deliverableForm, fase: v as ProjectPhase })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {phases.map((phase) => (
                              <SelectItem key={phase.key} value={phase.key}>{phase.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Data Prevista</Label>
                        <Input
                          type="date"
                          value={deliverableForm.data_prevista}
                          onChange={(e) => setDeliverableForm({ ...deliverableForm, data_prevista: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDeliverableDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={createDeliverableMutation.isPending}>
                        {createDeliverableMutation.isPending ? 'Salvando...' : 'Salvar'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {phases.slice(0, -1).map((phase) => {
                const phaseDeliverables = deliverables?.filter(d => d.fase === phase.key) || [];
                
                return (
                  <div key={phase.key} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${phaseColors[phase.key]}`} />
                      <h4 className="font-semibold">{phase.label}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {phaseDeliverables.length} entregáveis
                      </Badge>
                    </div>
                    
                    {phaseDeliverables.length === 0 ? (
                      <p className="text-sm text-muted-foreground pl-5">
                        Nenhum entregável nesta fase
                      </p>
                    ) : (
                      <div className="space-y-2 pl-5">
                        {phaseDeliverables.map((deliverable) => (
                          <div 
                            key={deliverable.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={deliverable.status === 'concluido'}
                                onChange={(e) => {
                                  updateDeliverableStatusMutation.mutate({
                                    deliverableId: deliverable.id,
                                    status: e.target.checked ? 'concluido' : 'pendente'
                                  });
                                }}
                                className="h-4 w-4 rounded border-muted-foreground"
                              />
                              <div>
                                <p className={`font-medium ${deliverable.status === 'concluido' ? 'line-through text-muted-foreground' : ''}`}>
                                  {deliverable.titulo}
                                </p>
                                {deliverable.descricao && (
                                  <p className="text-sm text-muted-foreground">{deliverable.descricao}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {deliverable.data_prevista && (
                                <span className="text-xs text-muted-foreground">
                                  {format(parseISO(deliverable.data_prevista), 'dd/MM/yyyy', { locale: ptBR })}
                                </span>
                              )}
                              <Badge 
                                variant="outline" 
                                className={
                                  deliverable.status === 'concluido' 
                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                }
                              >
                                {deliverable.status === 'concluido' ? 'Concluído' : 'Pendente'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transições</CardTitle>
              <CardDescription>Acompanhe as mudanças de fase do projeto</CardDescription>
            </CardHeader>
            <CardContent>
              {!phaseHistory || phaseHistory.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma transição registrada ainda
                </p>
              ) : (
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
                  <div className="space-y-6">
                    {phaseHistory.map((history, index) => (
                      <div key={history.id} className="relative pl-10">
                        <div className={`absolute left-2 w-5 h-5 rounded-full ${phaseColors[history.fase_nova as ProjectPhase]} flex items-center justify-center`}>
                          <ChevronRight className="h-3 w-3 text-white" />
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {history.fase_anterior && (
                                <>
                                  <Badge variant="outline">{phases.find(p => p.key === history.fase_anterior)?.label}</Badge>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </>
                              )}
                              <Badge className={phaseColors[history.fase_nova as ProjectPhase]}>
                                {phases.find(p => p.key === history.fase_nova)?.label}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {format(parseISO(history.data_transicao), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                            </span>
                          </div>
                          {history.observacoes && (
                            <p className="text-sm text-muted-foreground">{history.observacoes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome</span>
                  <span className="font-medium">{project.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo de Serviço</span>
                  <span className="font-medium capitalize">{project.tipo_servico?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor do Contrato</span>
                  <span className="font-medium">{formatCurrency(project.valor_contrato)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Recebido</span>
                  <span className="font-medium">{formatCurrency(project.valor_recebido)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cronograma</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data de Início</span>
                  <span className="font-medium">
                    {project.data_inicio 
                      ? format(parseISO(project.data_inicio), 'dd/MM/yyyy', { locale: ptBR })
                      : 'Não definida'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Previsão de Término</span>
                  <span className="font-medium">
                    {project.data_estimada_fim 
                      ? format(parseISO(project.data_estimada_fim), 'dd/MM/yyyy', { locale: ptBR })
                      : 'Não definida'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Real de Término</span>
                  <span className="font-medium">
                    {project.data_real_fim 
                      ? format(parseISO(project.data_real_fim), 'dd/MM/yyyy', { locale: ptBR })
                      : '-'}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{project.percentual_conclusao || calculateProgress()}%</span>
                  </div>
                  <Progress value={project.percentual_conclusao || calculateProgress()} />
                </div>
              </CardContent>
            </Card>

            {project.descricao && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Descrição</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{project.descricao}</p>
                </CardContent>
              </Card>
            )}

            {project.tecnologias && project.tecnologias.length > 0 && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Tecnologias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tecnologias.map((tech: string) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
