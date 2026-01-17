import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Plus, 
  FolderKanban, 
  Calendar, 
  DollarSign, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

type ServiceType = 'data_science' | 'analytics' | 'people_analytics' | 'behavioral_analytics' | 'customer_intelligence' | 'bioestatistica' | 'sistemas' | 'plataformas' | 'educacao' | 'outro';
type ProjectPhase = 'discovery' | 'exploration' | 'development' | 'production' | 'operations' | 'concluido';
type ProjectStatus = 'proposta' | 'aprovado' | 'em_andamento' | 'pausado' | 'concluido' | 'cancelado';

interface Project {
  id: string;
  nome: string;
  descricao: string | null;
  lead_id: string | null;
  tipo_servico: ServiceType;
  fase_atual: ProjectPhase;
  status: ProjectStatus;
  data_inicio: string | null;
  data_estimada_fim: string | null;
  valor_contrato: number | null;
  valor_recebido: number | null;
  percentual_conclusao: number | null;
  tecnologias: string[] | null;
  created_at: string;
  leads?: { nome: string; empresa: string | null } | null;
}

const serviceTypeLabels: Record<ServiceType, string> = {
  data_science: 'Data Science',
  analytics: 'Analytics',
  people_analytics: 'People Analytics',
  behavioral_analytics: 'Behavioral Analytics',
  customer_intelligence: 'Customer Intelligence',
  bioestatistica: 'Bioestatística',
  sistemas: 'Sistemas',
  plataformas: 'Plataformas',
  educacao: 'Educação',
  outro: 'Outro'
};

const phaseLabels: Record<ProjectPhase, string> = {
  discovery: 'Discovery',
  exploration: 'Exploration',
  development: 'Development',
  production: 'Production',
  operations: 'Operations',
  concluido: 'Concluído'
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
  proposta: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  aprovado: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  em_andamento: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
  pausado: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
  concluido: 'bg-green-500/20 text-green-500 border-green-500/30',
  cancelado: 'bg-red-500/20 text-red-500 border-red-500/30'
};

const phaseColors: Record<ProjectPhase, string> = {
  discovery: 'bg-purple-500/20 text-purple-400',
  exploration: 'bg-blue-500/20 text-blue-400',
  development: 'bg-cyan-500/20 text-cyan-400',
  production: 'bg-emerald-500/20 text-emerald-400',
  operations: 'bg-green-500/20 text-green-400',
  concluido: 'bg-gray-500/20 text-gray-400'
};

export default function AdminProjects() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo_servico: 'data_science' as ServiceType,
    valor_contrato: '',
    data_inicio: '',
    data_estimada_fim: ''
  });

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*, leads(nome, empresa)')
        .order('created_at', { ascending: false });

      if (search) {
        query = query.ilike('nome', `%${search}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as ProjectStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as Project[];
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['project-stats'],
    queryFn: async () => {
      const { data: projectsData } = await supabase
        .from('projects')
        .select('status, valor_contrato');

      const ativos = projectsData?.filter(p => p.status === 'em_andamento').length || 0;
      const concluidos = projectsData?.filter(p => p.status === 'concluido').length || 0;
      const valorTotal = projectsData?.reduce((sum, p) => sum + (p.valor_contrato || 0), 0) || 0;
      const valorAtivo = projectsData?.filter(p => p.status === 'em_andamento')
        .reduce((sum, p) => sum + (p.valor_contrato || 0), 0) || 0;

      return { ativos, concluidos, valorTotal, valorAtivo };
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('projects').insert({
        nome: data.nome,
        descricao: data.descricao || null,
        tipo_servico: data.tipo_servico,
        valor_contrato: data.valor_contrato ? parseFloat(data.valor_contrato) : null,
        data_inicio: data.data_inicio || null,
        data_estimada_fim: data.data_estimada_fim || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project-stats'] });
      toast.success('Projeto criado com sucesso!');
      setIsDialogOpen(false);
      setFormData({
        nome: '',
        descricao: '',
        tipo_servico: 'data_science',
        valor_contrato: '',
        data_inicio: '',
        data_estimada_fim: ''
      });
    },
    onError: (error) => {
      toast.error('Erro ao criar projeto: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project-stats'] });
      toast.success('Projeto excluído!');
    },
    onError: (error) => {
      toast.error('Erro ao excluir: ' + error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gestão de Projetos"
        description="Acompanhe todos os projetos de consultoria"
        icon={FolderKanban}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projetos Ativos</p>
                <p className="text-2xl font-bold">{stats?.ativos || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold">{stats?.concluidos || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <DollarSign className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
                <p className="text-xl font-bold">{formatCurrency(stats?.valorTotal || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-xl font-bold">{formatCurrency(stats?.valorAtivo || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar projetos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(statusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Novo Projeto</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome do Projeto *</Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Implementação de Analytics"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descrição do projeto..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Serviço</Label>
                <Select
                  value={formData.tipo_servico}
                  onValueChange={(v) => setFormData({ ...formData, tipo_servico: v as ServiceType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Valor do Contrato</Label>
                <Input
                  type="number"
                  value={formData.valor_contrato}
                  onChange={(e) => setFormData({ ...formData, valor_contrato: e.target.value })}
                  placeholder="0,00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Input
                    type="date"
                    value={formData.data_inicio}
                    onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Previsão de Término</Label>
                  <Input
                    type="date"
                    value={formData.data_estimada_fim}
                    onChange={(e) => setFormData({ ...formData, data_estimada_fim: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Criando...' : 'Criar Projeto'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-48" />
            </Card>
          ))}
        </div>
      ) : projects?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum projeto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Comece criando seu primeiro projeto de consultoria
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Projeto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project) => (
            <Card key={project.id} className="hover:border-primary/50 transition-colors group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base line-clamp-1">{project.nome}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {project.leads?.empresa || project.leads?.nome || 'Cliente não vinculado'}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/projetos/${project.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/projetos/${project.id}/editar`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteMutation.mutate(project.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={statusColors[project.status]}>
                    {statusLabels[project.status]}
                  </Badge>
                  <Badge variant="secondary" className={phaseColors[project.fase_atual]}>
                    {phaseLabels[project.fase_atual]}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{project.percentual_conclusao || 0}%</span>
                  </div>
                  <Progress value={project.percentual_conclusao || 0} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{formatCurrency(project.valor_contrato)}</span>
                  </div>
                  {project.data_estimada_fim && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(project.data_estimada_fim), 'dd/MM/yyyy', { locale: ptBR })}</span>
                    </div>
                  )}
                </div>

                <Badge variant="outline" className="text-xs">
                  {serviceTypeLabels[project.tipo_servico]}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
