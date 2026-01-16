import { Bell, Search, Settings, Moon, Sun, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function AdminHeader() {
  const { user, roles, signOut } = useAdminAuthContext();

  const getInitials = (email: string) => {
    return email?.split('@')[0]?.slice(0, 2).toUpperCase() || 'AD';
  };

  const getRoleLabel = () => {
    if (roles.includes('admin')) return 'Administrador';
    if (roles.includes('editor')) return 'Editor';
    return 'Visualizador';
  };

  const today = format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR });

  return (
    <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2" />
        
        <div className="hidden md:block">
          <p className="text-sm text-muted-foreground capitalize">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden lg:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="w-64 pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-destructive">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-2 gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {getInitials(user?.email || '')}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium leading-none">{user?.email?.split('@')[0]}</p>
                <p className="text-xs text-muted-foreground">{getRoleLabel()}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.email}</span>
                <span className="text-xs font-normal text-muted-foreground">{getRoleLabel()}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
