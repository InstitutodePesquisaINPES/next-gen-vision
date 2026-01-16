import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  TrendingUp, 
  CheckSquare, 
  DollarSign, 
  Target, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { AdminCard } from '@/components/admin/AdminCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface CRMStats {
  total_leads: number;
  leads_novos: number;
  leads_qualificados: number;
  leads_proposta: number;
  leads_negociacao: number;
  leads_ganhos: number;
  leads_perdidos: number;
  valor_pipeline: number;
  valor_fechado: number;
  tarefas_pendentes: number;
  tarefas_vencidas: number;
  leads_mes_atual: number;
  conversao_rate: number;
}

const statusColors: Record<string, string> = {
  novo: '#3b82f6',
  qualificado: '#8b5cf6',
  proposta_enviada: '#f59e0b',
  negociacao: '#06b6d4',
  fechado_ganho: '#22c55e',
  fechado_perdido: '#ef4444',
};

export default function CRMDashboard() {
  const navigate = useNavigate();

  // Fetch CRM stats
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['crm-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_crm_stats');
      if (error) throw error;
      return data as unknown as CRMStats;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch recent leads
  const { data: recentLeads, isLoading: loadingRecentLeads } = useQuery({
    queryKey: ['recent-leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('id, nome, empresa, status, valor_estimado, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  // Fetch pending tasks
  const { data: pendingTasks, isLoading: loadingTasks } = useQuery({
    queryKey: ['pending-tasks-dashboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, titulo, data_vencimento, prioridade, lead_id, leads(nome)')
        .eq('status', 'pendente')
        .order('data_vencimento', { ascending: true })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  // Fetch leads for chart (last 30 days)
  const { data: leadsTimeline } = useQuery({
    queryKey: ['leads-timeline'],
    queryFn: async () => {
      const thirtyDaysAgo = subDays(new Date(), 30);
      const { data, error } = await supabase
        .from('leads')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });
      
      if (error) throw error;

      // Group by day
      const grouped = data.reduce((acc: Record<string, number>, lead) => {
        const day = format(new Date(lead.created_at), 'dd/MM');
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      // Fill in missing days
      const result = [];
      for (let i = 30; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const day = format(date, 'dd/MM');
        result.push({
          date: day,
          leads: grouped[day] || 0,
        });
      }
      return result;
    },
  });

  // Pipeline distribution for pie chart
  const pipelineDistribution = stats ? [
    { name: 'Novos', value: stats.leads_novos, color: statusColors.novo },
    { name: 'Qualificados', value: stats.leads_qualificados, color: statusColors.qualificado },
    { name: 'Proposta', value: stats.leads_proposta, color: statusColors.proposta_enviada },
    { name: 'Negociação', value: stats.leads_negociacao, color: statusColors.negociacao },
    { name: 'Ganhos', value: stats.leads_ganhos, color: statusColors.fechado_ganho },
    { name: 'Perdidos', value: stats.leads_perdidos, color: statusColors.fechado_perdido },
  ].filter(item => item.value > 0) : [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      novo: 'Novo',
      qualificado: 'Qualificado',
      proposta_enviada: 'Proposta',
      negociacao: 'Negociação',
      fechado_ganho: 'Ganho',
      fechado_perdido: 'Perdido',
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      baixa: 'bg-gray-500/10 text-gray-500',
      media: 'bg-blue-500/10 text-blue-500',
      alta: 'bg-orange-500/10 text-orange-500',
      urgente: 'bg-red-500/10 text-red-500',
    };
    return colors[priority] || colors.media;
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard CRM"
        description="Visão geral do seu pipeline de vendas e métricas em tempo real"
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loadingStats ? (
          Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))
        ) : (
          <>
            <AdminStatsCard
              title="Total de Leads"
              value={stats?.total_leads || 0}
              description={`${stats?.leads_mes_atual || 0} novos este mês`}
              icon={Users}
              variant="primary"
              trend={stats?.leads_mes_atual ? { value: stats.leads_mes_atual, isPositive: true } : undefined}
            />
            <AdminStatsCard
              title="Taxa de Conversão"
              value={`${stats?.conversao_rate || 0}%`}
              description={`${stats?.leads_ganhos || 0} fechados / ${(stats?.leads_ganhos || 0) + (stats?.leads_perdidos || 0)} finalizados`}
              icon={Target}
              variant="success"
            />
            <AdminStatsCard
              title="Valor no Pipeline"
              value={formatCurrency(stats?.valor_pipeline || 0)}
              description="Em negociação ativa"
              icon={DollarSign}
              variant="warning"
            />
            <AdminStatsCard
              title="Valor Fechado"
              value={formatCurrency(stats?.valor_fechado || 0)}
              description="Receita conquistada"
              icon={TrendingUp}
              variant="success"
            />
          </>
        )}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {loadingStats ? (
          Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))
        ) : (
          <>
            <AdminStatsCard
              title="Tarefas Pendentes"
              value={stats?.tarefas_pendentes || 0}
              icon={CheckSquare}
              variant="primary"
            />
            <AdminStatsCard
              title="Tarefas Vencidas"
              value={stats?.tarefas_vencidas || 0}
              icon={AlertTriangle}
              variant={stats?.tarefas_vencidas ? 'danger' : 'default'}
            />
            <AdminStatsCard
              title="Em Negociação"
              value={stats?.leads_negociacao || 0}
              description="Leads em fase final"
              icon={Activity}
              variant="warning"
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Leads Timeline Chart */}
        <AdminCard 
          title="Novos Leads (Últimos 30 dias)"
          icon={BarChart3}
        >
          <div className="h-[300px] w-full mt-4">
            {leadsTimeline ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leadsTimeline}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorLeads)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        </AdminCard>

        {/* Pipeline Distribution */}
        <AdminCard 
          title="Distribuição do Pipeline"
          icon={PieChart}
        >
          <div className="h-[300px] w-full mt-4">
            {pipelineDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pipelineDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pipelineDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Nenhum lead no pipeline
              </div>
            )}
          </div>
        </AdminCard>
      </div>

      {/* Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <AdminCard 
          title="Leads Recentes"
          icon={Users}
          footer={
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/leads')}>
              Ver todos
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          }
        >
          <div className="divide-y divide-border">
            {loadingRecentLeads ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <Skeleton className="h-10 w-48" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))
            ) : recentLeads?.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                Nenhum lead cadastrado
              </div>
            ) : (
              recentLeads?.map((lead) => (
                <div 
                  key={lead.id} 
                  className="py-3 flex items-center justify-between cursor-pointer hover:bg-muted/50 -mx-6 px-6 transition-colors"
                  onClick={() => navigate(`/admin/leads/${lead.id}`)}
                >
                  <div>
                    <p className="font-medium text-foreground">{lead.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.empresa || 'Sem empresa'} • {lead.valor_estimado ? formatCurrency(lead.valor_estimado) : 'Sem valor'}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className="text-xs"
                    style={{ 
                      backgroundColor: `${statusColors[lead.status]}20`,
                      color: statusColors[lead.status]
                    }}
                  >
                    {getStatusLabel(lead.status)}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </AdminCard>

        {/* Pending Tasks */}
        <AdminCard 
          title="Tarefas Pendentes"
          icon={CheckSquare}
          footer={
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/tarefas')}>
              Ver todas
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          }
        >
          <div className="divide-y divide-border">
            {loadingTasks ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <Skeleton className="h-10 w-48" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))
            ) : pendingTasks?.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                Nenhuma tarefa pendente
              </div>
            ) : (
              pendingTasks?.map((task: any) => {
                const isOverdue = task.data_vencimento && new Date(task.data_vencimento) < new Date();
                return (
                  <div 
                    key={task.id} 
                    className="py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-foreground flex items-center gap-2">
                        {task.titulo}
                        {isOverdue && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {task.leads?.nome || 'Sem lead'} • {task.data_vencimento 
                          ? format(new Date(task.data_vencimento), "dd 'de' MMM", { locale: ptBR })
                          : 'Sem prazo'}
                      </p>
                    </div>
                    <Badge className={getPriorityColor(task.prioridade || 'media')}>
                      {task.prioridade || 'Média'}
                    </Badge>
                  </div>
                );
              })
            )}
          </div>
        </AdminCard>
      </div>
    </AdminLayout>
  );
}
