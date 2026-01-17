import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  BarChart3,
  Target,
  Activity,
  Zap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const phaseLabels: Record<string, string> = {
  discovery: 'Discovery',
  exploration: 'Exploration',
  development: 'Development',
  production: 'Production',
  operations: 'Operations',
  concluido: 'Concluído'
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function TeamMetrics() {
  // Fetch projects with phase history
  const { data: projects } = useQuery({
    queryKey: ['projects-for-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_phase_history(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch deliverables
  const { data: deliverables } = useQuery({
    queryKey: ['deliverables-for-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_deliverables')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  // Calculate phase duration metrics
  const calculatePhaseMetrics = () => {
    if (!projects) return [];

    const phaseData: Record<string, { totalDays: number; count: number }> = {};

    projects.forEach(project => {
      const history = project.project_phase_history as { 
        fase_nova: string; 
        data_transicao: string;
        fase_anterior: string | null;
      }[] | null;
      
      if (history && history.length > 1) {
        // Sort by transition date
        const sorted = [...history].sort((a, b) => 
          new Date(a.data_transicao).getTime() - new Date(b.data_transicao).getTime()
        );

        for (let i = 1; i < sorted.length; i++) {
          const prev = sorted[i - 1];
          const curr = sorted[i];
          const phase = prev.fase_nova;
          const days = Math.ceil(
            (new Date(curr.data_transicao).getTime() - new Date(prev.data_transicao).getTime()) 
            / (1000 * 60 * 60 * 24)
          );

          if (!phaseData[phase]) {
            phaseData[phase] = { totalDays: 0, count: 0 };
          }
          phaseData[phase].totalDays += days;
          phaseData[phase].count += 1;
        }
      }
    });

    return Object.entries(phaseData).map(([phase, data]) => ({
      phase,
      label: phaseLabels[phase] || phase,
      avgDays: Math.round(data.totalDays / data.count),
      count: data.count
    }));
  };

  // Calculate deliverable metrics
  const calculateDeliverableMetrics = () => {
    if (!deliverables) return { total: 0, completed: 0, onTime: 0, late: 0, pending: 0 };

    const total = deliverables.length;
    const completed = deliverables.filter(d => d.status === 'concluido').length;
    const pending = deliverables.filter(d => d.status === 'pendente').length;
    
    const onTime = deliverables.filter(d => {
      if (d.status !== 'concluido' || !d.data_entrega || !d.data_prevista) return false;
      return new Date(d.data_entrega) <= new Date(d.data_prevista);
    }).length;

    const late = completed - onTime;

    return { total, completed, onTime, late, pending };
  };

  // Project status distribution
  const getProjectStatusDistribution = () => {
    if (!projects) return [];

    const statusCount: Record<string, number> = {};
    projects.forEach(p => {
      const status = p.status;
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    const statusLabels: Record<string, string> = {
      proposta: 'Proposta',
      aprovado: 'Aprovado',
      em_andamento: 'Em Andamento',
      pausado: 'Pausado',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };

    return Object.entries(statusCount).map(([status, count]) => ({
      name: statusLabels[status] || status,
      value: count
    }));
  };

  // Monthly completion trend
  const getMonthlyTrend = () => {
    if (!deliverables) return [];

    const monthlyData: Record<string, { completed: number; created: number }> = {};
    const now = new Date();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[key] = { completed: 0, created: 0 };
    }

    deliverables.forEach(d => {
      const createdMonth = d.created_at.substring(0, 7);
      if (monthlyData[createdMonth]) {
        monthlyData[createdMonth].created += 1;
      }

      if (d.data_entrega) {
        const completedMonth = d.data_entrega.substring(0, 7);
        if (monthlyData[completedMonth]) {
          monthlyData[completedMonth].completed += 1;
        }
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('pt-BR', { month: 'short' }),
      criados: data.created,
      concluidos: data.completed
    }));
  };

  const phaseMetrics = calculatePhaseMetrics();
  const deliverableMetrics = calculateDeliverableMetrics();
  const statusDistribution = getProjectStatusDistribution();
  const monthlyTrend = getMonthlyTrend();
  const completionRate = deliverableMetrics.total > 0 
    ? Math.round((deliverableMetrics.completed / deliverableMetrics.total) * 100) 
    : 0;
  const onTimeRate = deliverableMetrics.completed > 0 
    ? Math.round((deliverableMetrics.onTime / deliverableMetrics.completed) * 100) 
    : 0;

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Métricas da Equipe"
        description="Performance e produtividade em projetos de consultoria"
        icon={Users}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projetos Ativos</p>
                <p className="text-2xl font-bold">
                  {projects?.filter(p => p.status === 'em_andamento').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                <p className="text-2xl font-bold">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entregas no Prazo</p>
                <p className="text-2xl font-bold">{onTimeRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Activity className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entregáveis Pendentes</p>
                <p className="text-2xl font-bold">{deliverableMetrics.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Average Time per Phase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tempo Médio por Fase
            </CardTitle>
            <CardDescription>Duração média em dias para cada fase do projeto</CardDescription>
          </CardHeader>
          <CardContent>
            {phaseMetrics.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={phaseMetrics} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis type="number" />
                  <YAxis dataKey="label" type="category" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value} dias`, 'Média']}
                  />
                  <Bar dataKey="avgDays" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Sem dados de histórico de fases</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Distribuição de Projetos
            </CardTitle>
            <CardDescription>Status atual dos projetos</CardDescription>
          </CardHeader>
          <CardContent>
            {statusDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Sem projetos cadastrados</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Deliverables Performance */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Performance de Entregáveis
          </CardTitle>
          <CardDescription>Visão geral da conclusão de entregáveis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total de Entregáveis</span>
                <span className="font-semibold">{deliverableMetrics.total}</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Concluídos
                </span>
                <span className="font-semibold">{deliverableMetrics.completed}</span>
              </div>
              <Progress value={completionRate} className="h-2 [&>div]:bg-emerald-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  No Prazo
                </span>
                <span className="font-semibold">{deliverableMetrics.onTime}</span>
              </div>
              <Progress 
                value={deliverableMetrics.total > 0 ? (deliverableMetrics.onTime / deliverableMetrics.total) * 100 : 0} 
                className="h-2 [&>div]:bg-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Atrasados
                </span>
                <span className="font-semibold">{deliverableMetrics.late}</span>
              </div>
              <Progress 
                value={deliverableMetrics.total > 0 ? (deliverableMetrics.late / deliverableMetrics.total) * 100 : 0} 
                className="h-2 [&>div]:bg-red-500" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Tendência Mensal
          </CardTitle>
          <CardDescription>Entregáveis criados vs concluídos nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="criados" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
                name="Criados"
              />
              <Line 
                type="monotone" 
                dataKey="concluidos" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
                name="Concluídos"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
