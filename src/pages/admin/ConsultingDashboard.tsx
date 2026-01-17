import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  FolderKanban,
  FileText,
  Users,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type ServiceType = 'data_science' | 'analytics' | 'people_analytics' | 'behavioral_analytics' | 'customer_intelligence' | 'bioestatistica' | 'sistemas' | 'plataformas' | 'educacao' | 'outro';
type ProjectStatus = 'proposta' | 'aprovado' | 'em_andamento' | 'pausado' | 'concluido' | 'cancelado';
type ProposalStatus = 'rascunho' | 'enviada' | 'em_analise' | 'aprovada' | 'rejeitada' | 'revisao' | 'expirada';

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

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#64748b'];

export default function ConsultingDashboard() {
  // Fetch projects data
  const { data: projectsData } = useQuery({
    queryKey: ['dashboard-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch proposals data
  const { data: proposalsData } = useQuery({
    queryKey: ['dashboard-proposals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch leads data
  const { data: leadsData } = useQuery({
    queryKey: ['dashboard-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch case studies
  const { data: casesData } = useQuery({
    queryKey: ['dashboard-cases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  // Calculate metrics
  const projects = projectsData || [];
  const proposals = proposalsData || [];
  const leads = leadsData || [];
  const cases = casesData || [];

  const activeProjects = projects.filter(p => p.status === 'em_andamento');
  const totalRevenue = projects.reduce((sum, p) => sum + (p.valor_contrato || 0), 0);
  const activeRevenue = activeProjects.reduce((sum, p) => sum + (p.valor_contrato || 0), 0);
  const pendingProposals = proposals.filter(p => ['enviada', 'em_analise'].includes(p.status));
  const approvedProposals = proposals.filter(p => p.status === 'aprovada');
  const conversionRate = proposals.length > 0 
    ? Math.round((approvedProposals.length / proposals.length) * 100) 
    : 0;

  // Projects by service type
  const projectsByService = Object.entries(
    projects.reduce((acc, p) => {
      acc[p.tipo_servico] = (acc[p.tipo_servico] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ 
    name: serviceTypeLabels[name as ServiceType] || name, 
    value 
  }));

  // Revenue by service type
  const revenueByService = Object.entries(
    projects.reduce((acc, p) => {
      const key = p.tipo_servico as ServiceType;
      acc[key] = (acc[key] || 0) + (p.valor_contrato || 0);
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ 
    name: serviceTypeLabels[name as ServiceType] || name, 
    value: value / 1000 
  })).sort((a, b) => b.value - a.value);

  // Recent projects
  const recentProjects = projects.slice(0, 5);

  // Pending proposals
  const pendingProposalsList = pendingProposals.slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard de Consultoria"
        description="Visão geral do seu negócio de consultoria"
        icon={BarChart3}
      />

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(activeRevenue)} em andamento
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/20">
                <DollarSign className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Projetos Ativos</p>
                <p className="text-2xl font-bold">{activeProjects.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {projects.filter(p => p.status === 'concluido').length} concluídos
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <FolderKanban className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Propostas Pendentes</p>
                <p className="text-2xl font-bold">{pendingProposals.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(pendingProposals.reduce((s, p) => s + (p.valor_final || 0), 0))}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/20">
                <FileText className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taxa de Conversão</p>
                <p className="text-2xl font-bold">{conversionRate}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {approvedProposals.length} de {proposals.length} propostas
                </p>
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Target className="h-6 w-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-muted-foreground">Leads</p>
              <p className="text-xl font-semibold">{leads.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <div>
              <p className="text-sm text-muted-foreground">Cases</p>
              <p className="text-xl font-semibold">{cases.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-sm text-muted-foreground">Propostas Aprovadas</p>
              <p className="text-xl font-semibold">{approvedProposals.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-orange-400" />
            <div>
              <p className="text-sm text-muted-foreground">Total Projetos</p>
              <p className="text-xl font-semibold">{projects.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Projects by Service Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projetos por Serviço</CardTitle>
            <CardDescription>Distribuição por tipo de consultoria</CardDescription>
          </CardHeader>
          <CardContent>
            {projectsByService.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={projectsByService}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {projectsByService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                Nenhum projeto cadastrado
              </div>
            )}
          </CardContent>
        </Card>

        {/* Revenue by Service */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Receita por Serviço</CardTitle>
            <CardDescription>Valor em milhares (R$)</CardDescription>
          </CardHeader>
          <CardContent>
            {revenueByService.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByService.slice(0, 5)} layout="vertical">
                  <XAxis type="number" tickFormatter={(v) => `${v}k`} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => `R$ ${Number(v).toFixed(0)}k`} />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                Nenhuma receita registrada
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Projetos Recentes</CardTitle>
              <CardDescription>Últimos projetos cadastrados</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/projetos">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{project.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {serviceTypeLabels[project.tipo_servico as ServiceType]}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-medium">{formatCurrency(project.valor_contrato || 0)}</p>
                    <Badge variant="outline" className="text-xs">
                      {project.status === 'em_andamento' ? 'Em andamento' : 
                       project.status === 'concluido' ? 'Concluído' : 
                       project.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FolderKanban className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum projeto cadastrado</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Proposals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Propostas Pendentes</CardTitle>
              <CardDescription>Aguardando resposta do cliente</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/propostas">Ver todas</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingProposalsList.length > 0 ? (
              pendingProposalsList.map((proposal) => (
                <div key={proposal.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{proposal.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {proposal.numero} • {serviceTypeLabels[proposal.tipo_servico as ServiceType]}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-medium">{formatCurrency(proposal.valor_final || 0)}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(new Date(proposal.created_at), 'dd/MM', { locale: ptBR })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhuma proposta pendente</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
