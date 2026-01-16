import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Navigation, 
  Settings, 
  Users, 
  LogOut,
  ChevronRight,
  Home,
  Database,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { VixioLogo } from '@/components/brand/VixioLogo';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { 
    path: '/admin', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    path: '/admin/conteudo', 
    label: 'Conteúdo', 
    icon: FileText,
    requiredRole: 'editor' as const
  },
  { 
    path: '/admin/navegacao', 
    label: 'Navegação', 
    icon: Navigation,
    requiredRole: 'admin' as const
  },
  { 
    path: '/admin/analytics', 
    label: 'Analytics', 
    icon: BarChart3,
    requiredRole: 'admin' as const
  },
  { 
    path: '/admin/backup', 
    label: 'Backup', 
    icon: Database,
    requiredRole: 'admin' as const
  },
  { 
    path: '/admin/configuracoes', 
    label: 'Configurações', 
    icon: Settings,
    requiredRole: 'admin' as const
  },
  { 
    path: '/admin/usuarios', 
    label: 'Usuários', 
    icon: Users,
    requiredRole: 'admin' as const
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const { user, roles, signOut, isAdmin, isEditor } = useAdminAuthContext();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
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
    return { label: 'Visualizador', variant: 'outline' as const };
  };

  const roleBadge = getRoleBadge();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-3">
          <VixioLogo variant="icon" size="sm" />
          <div>
            <span className="font-semibold text-sidebar-foreground">Vixio Admin</span>
            <Badge variant={roleBadge.variant} className="ml-2 text-xs">
              {roleBadge.label}
            </Badge>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          if (!canAccessItem(item.requiredRole)) return null;
          
          const active = isActive(item.path, item.exact);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                active 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      {/* User info & actions */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm">Ver site</span>
        </Link>
        
        <Separator />
        
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-sidebar-foreground truncate">
            {user?.email}
          </p>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
