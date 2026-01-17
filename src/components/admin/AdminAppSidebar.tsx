import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Navigation, 
  Settings, 
  Users, 
  Home,
  Database,
  BarChart3,
  UserCircle,
  Kanban,
  CheckSquare,
  Webhook,
  ScrollText,
  TrendingUp,
  MessageSquare,
  FileStack,
  FilePlus2,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
  FolderKanban,
  FileSignature,
  Award,
  PieChart,
  Calculator,
  UsersRound
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { VixioLogo } from '@/components/brand/VixioLogo';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  requiredRole?: 'admin' | 'editor';
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Visão Geral',
    items: [
      { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { path: '/admin/crm', label: 'CRM Dashboard', icon: TrendingUp, requiredRole: 'editor' },
      { path: '/admin/consultoria', label: 'Consultoria', icon: PieChart, requiredRole: 'editor' },
    ]
  },
  {
    label: 'Consultoria',
    items: [
      { path: '/admin/projetos', label: 'Projetos', icon: FolderKanban, requiredRole: 'editor' },
      { path: '/admin/propostas', label: 'Propostas', icon: FileSignature, requiredRole: 'editor' },
      { path: '/admin/templates-propostas', label: 'Templates', icon: FileStack, requiredRole: 'editor' },
      { path: '/admin/cases', label: 'Cases', icon: Award, requiredRole: 'editor' },
      { path: '/admin/roi-calculator', label: 'Calculadora ROI', icon: Calculator, requiredRole: 'editor' },
      { path: '/admin/metricas-equipe', label: 'Métricas da Equipe', icon: UsersRound, requiredRole: 'editor' },
    ]
  },
  {
    label: 'Vendas',
    items: [
      { path: '/admin/leads', label: 'Leads', icon: UserCircle, requiredRole: 'editor' },
      { path: '/admin/pipeline', label: 'Pipeline', icon: Kanban, requiredRole: 'editor' },
      { path: '/admin/tarefas', label: 'Tarefas', icon: CheckSquare, requiredRole: 'editor' },
    ]
  },
  {
    label: 'Documentos',
    items: [
      { path: '/admin/modelos', label: 'Modelos', icon: FileStack, requiredRole: 'editor' },
      { path: '/admin/documentos', label: 'Documentos', icon: FilePlus2, requiredRole: 'editor' },
      { path: '/admin/documentos/dashboard', label: 'Relatórios', icon: BarChart3, requiredRole: 'editor' },
    ]
  },
  {
    label: 'Conteúdo',
    items: [
      { path: '/admin/conteudo', label: 'Conteúdo', icon: FileText, requiredRole: 'editor' },
      { path: '/admin/navegacao', label: 'Navegação', icon: Navigation, requiredRole: 'admin' },
    ]
  },
  {
    label: 'Sistema',
    items: [
      { path: '/admin/analytics', label: 'Analytics', icon: BarChart3, requiredRole: 'admin' },
      { path: '/admin/webhooks', label: 'Webhooks', icon: Webhook, requiredRole: 'admin' },
      { path: '/admin/auditoria', label: 'Auditoria', icon: ScrollText, requiredRole: 'admin' },
      { path: '/admin/crm-config', label: 'Config. CRM', icon: MessageSquare, requiredRole: 'admin' },
      { path: '/admin/backup', label: 'Backup', icon: Database, requiredRole: 'admin' },
      { path: '/admin/configuracoes', label: 'Configurações', icon: Settings, requiredRole: 'admin' },
      { path: '/admin/usuarios', label: 'Usuários', icon: Users, requiredRole: 'admin' },
    ]
  }
];

export function AdminAppSidebar() {
  const location = useLocation();
  const { roles, isAdmin, isEditor } = useAdminAuthContext();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const canAccessItem = (requiredRole?: 'admin' | 'editor') => {
    if (!requiredRole) return true;
    if (requiredRole === 'admin') return isAdmin();
    if (requiredRole === 'editor') return isEditor();
    return false;
  };

  const getRoleBadge = () => {
    if (roles.includes('admin')) return { label: 'Admin', variant: 'default' as const };
    if (roles.includes('editor')) return { label: 'Editor', variant: 'secondary' as const };
    return { label: 'Viewer', variant: 'outline' as const };
  };

  const roleBadge = getRoleBadge();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="p-4">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <VixioLogo variant="icon" size="sm" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-lg">Vixio</span>
              <Badge variant={roleBadge.variant} className="text-[10px] w-fit px-1.5 h-4">
                {roleBadge.label}
              </Badge>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <Separator className="mx-4 w-auto" />

      <SidebarContent className="px-2 py-4">
        {navGroups.map((group, groupIndex) => {
          const visibleItems = group.items.filter(item => canAccessItem(item.requiredRole));
          if (visibleItems.length === 0) return null;

          return (
            <SidebarGroup key={groupIndex} className="mb-2">
              {!collapsed && (
                <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2 mb-1">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleItems.map((item) => {
                    const active = isActive(item.path, item.exact);
                    const Icon = item.icon;

                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={collapsed ? item.label : undefined}
                        >
                          <Link
                            to={item.path}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                              active 
                                ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                            {active && !collapsed && <ChevronRight className="h-4 w-4 ml-auto" />}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Separator className="mb-4" />
        
        {!collapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary">Pro Features</span>
            </div>
            <p className="text-[10px] text-muted-foreground mb-3">
              Desbloqueie recursos avançados de IA e automação
            </p>
            <Link
              to="/admin/upgrade"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <Zap className="h-3 w-3" />
              Upgrade
            </Link>
          </div>
        )}

        <Link
          to="/"
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors mt-3',
            collapsed && 'justify-center'
          )}
        >
          <Home className="h-4 w-4" />
          {!collapsed && <span className="text-sm">Ver Site</span>}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
