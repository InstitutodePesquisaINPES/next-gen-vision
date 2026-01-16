import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Users, 
  Shield, 
  Trash2, 
  Loader2, 
  UserPlus, 
  Mail,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AdminConfirmDialog } from '@/components/admin/AdminConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserWithRoles {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  roles: { role: AppRole; created_at: string }[];
}

type AppRole = 'admin' | 'editor' | 'visualizador';

const roleLabels: Record<AppRole, { label: string; color: string; description: string }> = {
  admin: { 
    label: 'Administrador', 
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    description: 'Acesso total ao sistema'
  },
  editor: { 
    label: 'Editor', 
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    description: 'Pode editar conteúdo do site'
  },
  visualizador: { 
    label: 'Visualizador', 
    color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    description: 'Apenas visualização do painel'
  },
};

type FilterType = 'all' | 'with_roles' | 'without_roles' | AppRole;

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<AppRole>('editor');
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role, created_at');
      
      if (rolesError) throw rolesError;

      const usersWithRoles: UserWithRoles[] = profiles.map(profile => ({
        ...profile,
        roles: roles
          .filter(r => r.user_id === profile.id)
          .map(r => ({ role: r.role as AppRole, created_at: r.created_at })),
      }));

      return usersWithRoles;
    },
  });

  // Filter and search users
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    
    return users.filter(user => {
      // Search filter
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        const nameMatch = user.full_name?.toLowerCase().includes(search);
        const idMatch = user.id.toLowerCase().includes(search);
        if (!nameMatch && !idMatch) return false;
      }

      // Role filter
      if (filter === 'all') return true;
      if (filter === 'with_roles') return user.roles.length > 0;
      if (filter === 'without_roles') return user.roles.length === 0;
      return user.roles.some(r => r.role === filter);
    });
  }, [users, searchQuery, filter]);

  const stats = useMemo(() => {
    if (!users) return { total: 0, withRoles: 0, admins: 0, editors: 0 };
    return {
      total: users.length,
      withRoles: users.filter(u => u.roles.length > 0).length,
      admins: users.filter(u => u.roles.some(r => r.role === 'admin')).length,
      editors: users.filter(u => u.roles.some(r => r.role === 'editor')).length,
    };
  }, [users]);

  const addRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role }]);
      
      if (error) {
        if (error.code === '23505') {
          throw new Error('Este usuário já possui esta função');
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Função adicionada com sucesso!');
      setIsDialogOpen(false);
      setSelectedUserId(null);
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  const removeRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role as AppRole);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Função removida com sucesso!');
    },
  });

  const handleAddRole = () => {
    if (!selectedUserId) return;
    addRoleMutation.mutate({ userId: selectedUserId, role: newRole });
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const selectedUser = users?.find(u => u.id === selectedUserId);

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gerenciar Usuários"
        description="Controle de acesso, permissões e funções"
        icon={Users}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total de usuários</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-green-500">{stats.withRoles}</p>
          <p className="text-sm text-muted-foreground">Com permissões</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-red-500">{stats.admins}</p>
          <p className="text-sm text-muted-foreground">Administradores</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-blue-500">{stats.editors}</p>
          <p className="text-sm text-muted-foreground">Editores</p>
        </div>
      </div>

      <AdminCard>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <AdminSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar por nome ou ID..."
            className="flex-1"
          />
          <Select value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="with_roles">Com permissões</SelectItem>
              <SelectItem value="without_roles">Sem permissões</SelectItem>
              <SelectItem value="admin">Administradores</SelectItem>
              <SelectItem value="editor">Editores</SelectItem>
              <SelectItem value="visualizador">Visualizadores</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="mb-6" />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <AdminEmptyState
            icon={Users}
            title={searchQuery || filter !== 'all' ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
            description={
              searchQuery || filter !== 'all'
                ? 'Tente ajustar os filtros ou a busca'
                : 'Usuários aparecerão aqui após se cadastrarem no sistema'
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all duration-200"
              >
                <Avatar className="h-12 w-12 border-2 border-border">
                  <AvatarImage src={user.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">
                      {user.full_name || 'Usuário sem nome'}
                    </p>
                    {user.roles.length === 0 && (
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 bg-yellow-500/10 text-xs">
                        Pendente
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate">{user.id.slice(0, 8)}...</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatDistanceToNow(new Date(user.created_at), { addSuffix: true, locale: ptBR })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {user.roles.length === 0 ? (
                    <span className="text-xs text-muted-foreground">Sem função</span>
                  ) : (
                    user.roles.map((r) => {
                      const roleInfo = roleLabels[r.role];
                      return (
                        <div key={r.role} className="flex items-center gap-1">
                          <Badge className={roleInfo.color}>
                            {roleInfo.label}
                          </Badge>
                          <AdminConfirmDialog
                            trigger={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              >
                                <XCircle className="h-3 w-3" />
                              </Button>
                            }
                            title="Remover função?"
                            description={`Tem certeza que deseja remover a função "${roleInfo.label}" deste usuário? Ele perderá o acesso correspondente.`}
                            confirmLabel="Remover"
                            variant="danger"
                            onConfirm={() => removeRoleMutation.mutate({ userId: user.id, role: r.role })}
                            isLoading={removeRoleMutation.isPending}
                          />
                        </div>
                      );
                    })
                  )}
                </div>

                <Dialog 
                  open={isDialogOpen && selectedUserId === user.id} 
                  onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setSelectedUserId(null);
                  }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Adicionar função
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(user.id);
                          toast.success('ID copiado!');
                        }}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Copiar ID
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Função</DialogTitle>
                      <DialogDescription>
                        Selecione a função para {selectedUser?.full_name || 'este usuário'}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                      <div>
                        <Label>Função</Label>
                        <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(roleLabels).map(([role, info]) => (
                              <SelectItem key={role} value={role}>
                                <div className="flex items-center gap-2">
                                  <Shield className={`h-4 w-4 ${
                                    role === 'admin' ? 'text-red-500' :
                                    role === 'editor' ? 'text-blue-500' :
                                    'text-gray-400'
                                  }`} />
                                  {info.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                        {Object.entries(roleLabels).map(([role, info]) => (
                          <div key={role} className="flex items-start gap-2 text-sm">
                            <CheckCircle className={`h-4 w-4 mt-0.5 ${
                              role === 'admin' ? 'text-red-500' :
                              role === 'editor' ? 'text-blue-500' :
                              'text-gray-400'
                            }`} />
                            <div>
                              <span className="font-medium">{info.label}:</span>
                              <span className="text-muted-foreground ml-1">{info.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddRole} disabled={addRoleMutation.isPending}>
                        {addRoleMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Adicionar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Instructions */}
      <AdminCard className="mt-6" title="Como funciona o sistema de permissões?">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded bg-primary/10">
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium text-sm">1. Cadastro</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Usuários se cadastram na página de login do admin
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded bg-yellow-500/10">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <span className="font-medium text-sm">2. Aprovação</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Aparecem aqui como "Pendente" até receberem uma função
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <span className="font-medium text-sm">3. Acesso</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Com a função atribuída, podem acessar o painel conforme permissões
            </p>
          </div>
        </div>
      </AdminCard>
    </AdminLayout>
  );
}
