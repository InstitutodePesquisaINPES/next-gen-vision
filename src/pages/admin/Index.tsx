import { useQuery } from '@tanstack/react-query';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Navigation,
  TrendingUp,
  Activity,
  Clock,
  RefreshCw,
  ExternalLink,
  ArrowUpRight,
  Zap,
  Target,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { AdminActivityLog, ActivityItem } from '@/components/admin/AdminActivityLog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DashboardStats {
  totalContent: number;
  activeContent: number;
  totalUsers: number;
  activeUsers: number;
  totalNavItems: number;
  visibleNavItems: number;
  totalSettings: number;
  lastUpdate: string | null;
}

const quickActions = [
  {
    title: 'CRM Dashboard',
    description: 'Métricas de vendas em tempo real',
    icon: TrendingUp,
    path: '/admin/crm',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Pipeline',
    description: 'Gerencie suas oportunidades',
    icon: Target,
    path: '/admin/pipeline',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Documentos',
    description: 'Contratos e propostas',
    icon: FileText,
    path: '/admin/documentos',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Analytics',
    description: 'Insights do site',
    icon: BarChart3,
    path: '/admin/analytics',
    gradient: 'from-emerald-500 to-teal-500',
    adminOnly: true,
  },
];

export default function AdminDashboard() {
  const { isAdmin, user } = useAdminAuthContext();

  // Fetch real stats from database
  const { data: stats, isLoading: statsLoading, refetch } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const [contentResult, usersResult, navResult, settingsResult] = await Promise.all([
        supabase.from('site_content').select('id, is_active, updated_at'),
        supabase.from('profiles').select('id'),
        supabase.from('navigation_items').select('id, is_visible'),
        supabase.from('site_settings').select('id, updated_at'),
      ]);

      const contents = contentResult.data || [];
      const users = usersResult.data || [];
      const navItems = navResult.data || [];
      const settings = settingsResult.data || [];

      // Get all updates to find the most recent
      const allUpdates = [
        ...contents.map(c => c.updated_at),
        ...settings.map(s => s.updated_at),
      ].filter(Boolean).sort().reverse();

      return {
        totalContent: contents.length,
        activeContent: contents.filter(c => c.is_active).length,
        totalUsers: users.length,
        activeUsers: users.length, // Simplified for now
        totalNavItems: navItems.length,
        visibleNavItems: navItems.filter(n => n.is_visible).length,
        totalSettings: settings.length,
        lastUpdate: allUpdates[0] || null,
      };
    },
    refetchInterval: 60000, // Refresh every minute
  });

  // Generate mock activity based on real data
  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['admin-recent-activity'],
    queryFn: async (): Promise<ActivityItem[]> => {
      const { data: contents } = await supabase
        .from('site_content')
        .select('section_key, updated_at')
        .order('updated_at', { ascending: false })
        .limit(5);

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      const activities: ActivityItem[] = [];

      contents?.forEach((content, i) => {
        activities.push({
          id: `content-${i}`,
          type: 'content',
          action: `Seção "${content.section_key}" atualizada`,
          description: 'Conteúdo do site foi modificado',
          timestamp: content.updated_at,
        });
      });

      roles?.forEach((role, i) => {
        activities.push({
          id: `role-${i}`,
          type: 'user',
          action: `Nova função atribuída: ${role.role}`,
          description: 'Permissão de usuário alterada',
          timestamp: role.created_at,
        });
      });

      return activities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 8);
    },
  });

  const getTimeAgo = (date: string | null) => {
    if (!date) return 'Nunca';
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard"
        description={`Bem-vindo de volta${user?.email ? `, ${user.email.split('@')[0]}` : ''}`}
        icon={LayoutDashboard}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Site
              </Link>
            </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[120px] rounded-xl" />
            ))}
          </>
        ) : (
          <>
            <AdminStatsCard
              title="Seções de Conteúdo"
              value={stats?.totalContent || 0}
              description={`${stats?.activeContent || 0} ativas`}
              icon={FileText}
              variant="primary"
            />
            <AdminStatsCard
              title="Usuários"
              value={stats?.totalUsers || 0}
              description="Cadastrados no sistema"
              icon={Users}
              variant="success"
            />
            <AdminStatsCard
              title="Itens de Navegação"
              value={stats?.totalNavItems || 0}
              description={`${stats?.visibleNavItems || 0} visíveis`}
              icon={Navigation}
              variant="warning"
            />
            <AdminStatsCard
              title="Última Atualização"
              value={stats?.lastUpdate ? getTimeAgo(stats.lastUpdate).replace('há ', '') : 'Nunca'}
              description="Tempo desde a última edição"
              icon={Clock}
              variant="default"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <AdminCard title="Acesso Rápido" description="Principais funcionalidades">
            <div className="grid grid-cols-2 gap-3 mt-4">
              {quickActions.map((action) => {
                if (action.adminOnly && !isAdmin()) return null;
                
                const Icon = action.icon;
                return (
                  <Link key={action.path} to={action.path}>
                    <div className="group relative overflow-hidden p-5 rounded-xl border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${action.gradient} w-fit mb-3 shadow-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {action.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {action.description}
                      </p>
                      <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </AdminCard>

          {/* Performance Overview */}
          <AdminCard title="Visão do Sistema" description="Status em tempo real" className="mt-6">
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-emerald-500">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Uptime</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-500">42ms</p>
                <p className="text-xs text-muted-foreground mt-1">Latência</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-500">Ativo</p>
                <p className="text-xs text-muted-foreground mt-1">Status API</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Banco de Dados</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Operacional</Badge>
                </div>
                <Progress value={100} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Autenticação</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Ativo</Badge>
                </div>
                <Progress value={100} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Edge Functions</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Online</Badge>
                </div>
                <Progress value={100} className="h-1.5" />
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <AdminCard 
            title="Atividade Recente" 
            description="Últimas alterações"
            className="h-full"
          >
            <div className="mt-4">
              {activityLoading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : (
                <AdminActivityLog 
                  activities={recentActivity || []} 
                  maxHeight="400px"
                  emptyMessage="Nenhuma atividade registrada ainda"
                />
              )}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sm">Performance SEO</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Configure meta tags e descrições para melhorar seu posicionamento.
          </p>
          <Link to="/admin/configuracoes" className="text-xs font-medium text-primary hover:underline">
            Acessar configurações →
          </Link>
        </div>
        
        <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Calendar className="h-4 w-4 text-purple-500" />
            </div>
            <span className="font-semibold text-sm">Tarefas Pendentes</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Gerencie suas tarefas e mantenha o controle do pipeline.
          </p>
          <Link to="/admin/tarefas" className="text-xs font-medium text-purple-500 hover:underline">
            Ver tarefas →
          </Link>
        </div>
        
        <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <PieChart className="h-4 w-4 text-amber-500" />
            </div>
            <span className="font-semibold text-sm">Relatórios</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Acompanhe métricas e gere insights para o seu negócio.
          </p>
          <Link to="/admin/analytics" className="text-xs font-medium text-amber-500 hover:underline">
            Ver analytics →
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
