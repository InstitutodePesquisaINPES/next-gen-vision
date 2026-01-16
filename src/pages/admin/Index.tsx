import { useQuery } from '@tanstack/react-query';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Navigation,
  Eye,
  TrendingUp,
  Activity,
  Clock,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { AdminActivityLog, ActivityItem } from '@/components/admin/AdminActivityLog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
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
    title: 'Editar Conteúdo',
    description: 'Alterar textos e imagens do site',
    icon: FileText,
    path: '/admin/conteudo',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  {
    title: 'Gerenciar Navegação',
    description: 'Configurar menus e links',
    icon: Navigation,
    path: '/admin/navegacao',
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    adminOnly: true,
  },
  {
    title: 'Gerenciar Usuários',
    description: 'Adicionar ou remover permissões',
    icon: Users,
    path: '/admin/usuarios',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    adminOnly: true,
  },
  {
    title: 'Configurações',
    description: 'Dados da empresa e SEO',
    icon: Settings,
    path: '/admin/configuracoes',
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
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
          <AdminCard title="Ações Rápidas" description="Acesse as principais funcionalidades">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {quickActions.map((action) => {
                if (action.adminOnly && !isAdmin()) return null;
                
                const Icon = action.icon;
                return (
                  <Link key={action.path} to={action.path}>
                    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group h-full">
                      <div className={`p-3 rounded-lg border w-fit mb-3 ${action.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </AdminCard>

          {/* System Status */}
          <AdminCard title="Status do Sistema" description="Visão geral dos componentes" className="mt-6">
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Banco de Dados</span>
                </div>
                <span className="text-xs text-green-500">Operacional</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Autenticação</span>
                </div>
                <span className="text-xs text-green-500">Ativo</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">API</span>
                </div>
                <span className="text-xs text-green-500">Conectada</span>
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
                  maxHeight="350px"
                  emptyMessage="Nenhuma atividade registrada ainda"
                />
              )}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Quick Tips */}
      <AdminCard 
        title="Dicas Rápidas" 
        description="Maximize sua produtividade"
        className="mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">SEO</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Configure título e descrição meta nas Configurações para melhorar o posicionamento no Google.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-purple-500" />
              <span className="font-medium text-sm">Visualização</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Use o botão "Ver Site" para conferir suas alterações em tempo real.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="font-medium text-sm">Monitoramento</span>
            </div>
            <p className="text-xs text-muted-foreground">
              O dashboard atualiza automaticamente a cada minuto para mostrar dados recentes.
            </p>
          </div>
        </div>
      </AdminCard>
    </AdminLayout>
  );
}
