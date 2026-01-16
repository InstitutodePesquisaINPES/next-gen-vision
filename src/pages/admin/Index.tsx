import { LayoutDashboard, FileText, Users, Settings, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';

const quickActions = [
  {
    title: 'Editar Conteúdo',
    description: 'Alterar textos e imagens do site',
    icon: FileText,
    path: '/admin/conteudo',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Gerenciar Usuários',
    description: 'Adicionar ou remover permissões',
    icon: Users,
    path: '/admin/usuarios',
    color: 'bg-purple-500/10 text-purple-500',
    adminOnly: true,
  },
  {
    title: 'Configurações',
    description: 'Dados da empresa e SEO',
    icon: Settings,
    path: '/admin/configuracoes',
    color: 'bg-green-500/10 text-green-500',
    adminOnly: true,
  },
];

const stats = [
  { label: 'Seções Editáveis', value: '12', icon: FileText },
  { label: 'Páginas Ativas', value: '8', icon: Eye },
  { label: 'Última Atualização', value: 'Hoje', icon: TrendingUp },
];

export default function AdminDashboard() {
  const { isAdmin } = useAdminAuthContext();

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard"
        description="Bem-vindo ao painel administrativo da Vixio"
        icon={LayoutDashboard}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <AdminCard key={stat.label}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </AdminCard>
          );
        })}
      </div>

      {/* Quick Actions */}
      <AdminCard title="Ações Rápidas" description="Acesse as principais funcionalidades">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {quickActions.map((action) => {
            if (action.adminOnly && !isAdmin()) return null;
            
            const Icon = action.icon;
            return (
              <Link key={action.path} to={action.path}>
                <div className="p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group">
                  <div className={`p-3 rounded-lg ${action.color} w-fit mb-3`}>
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

      {/* Recent Activity Placeholder */}
      <AdminCard 
        title="Atividade Recente" 
        description="Últimas alterações realizadas"
        className="mt-6"
      >
        <div className="py-8 text-center text-muted-foreground">
          <p>Nenhuma atividade registrada ainda.</p>
          <Button variant="link" asChild className="mt-2">
            <Link to="/admin/conteudo">Começar a editar conteúdo</Link>
          </Button>
        </div>
      </AdminCard>
    </AdminLayout>
  );
}
