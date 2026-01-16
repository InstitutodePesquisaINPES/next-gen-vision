import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, Shield, Trash2, Loader2, UserPlus, Mail } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserWithRoles {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  roles: { role: string }[];
}

type AppRole = 'admin' | 'editor' | 'visualizador';

const roleLabels: Record<AppRole, { label: string; color: string }> = {
  admin: { label: 'Administrador', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  editor: { label: 'Editor', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  visualizador: { label: 'Visualizador', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
};

export default function AdminUsers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<AppRole>('editor');
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;

      // Then get all roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      if (rolesError) throw rolesError;

      // Combine data
      const usersWithRoles: UserWithRoles[] = profiles.map(profile => ({
        ...profile,
        roles: roles.filter(r => r.user_id === profile.id).map(r => ({ role: r.role })),
      }));

      return usersWithRoles;
    },
  });

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
      toast.success('Função adicionada!');
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
      toast.success('Função removida!');
    },
  });

  const handleAddRole = () => {
    if (!selectedUserId) return;
    addRoleMutation.mutate({ userId: selectedUserId, role: newRole });
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gerenciar Usuários"
        description="Controle de acesso e permissões"
        icon={Users}
      />

      <AdminCard>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : users?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum usuário cadastrado ainda.</p>
            <p className="text-sm mt-2">
              Usuários aparecerão aqui após se cadastrarem.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {users?.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {user.full_name ? (
                    <span className="text-sm font-medium text-primary">
                      {user.full_name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <Mail className="h-5 w-5 text-primary" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {user.full_name || 'Sem nome'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ID: {user.id.slice(0, 8)}...
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {user.roles.length === 0 ? (
                    <Badge variant="outline" className="text-muted-foreground">
                      Sem função
                    </Badge>
                  ) : (
                    user.roles.map((r) => {
                      const roleInfo = roleLabels[r.role as AppRole];
                      return (
                        <div key={r.role} className="flex items-center gap-1">
                          <Badge className={roleInfo?.color || ''}>
                            {roleInfo?.label || r.role}
                          </Badge>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remover função?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover a função "{roleInfo?.label}" deste usuário?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => removeRoleMutation.mutate({ userId: user.id, role: r.role as AppRole })}
                                >
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedUserId(user.id)}
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Adicionar Função
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Função</DialogTitle>
                      <DialogDescription>
                        Selecione a função para {user.full_name || 'este usuário'}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                      <Label>Função</Label>
                      <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-red-500" />
                              Administrador
                            </div>
                          </SelectItem>
                          <SelectItem value="editor">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-blue-500" />
                              Editor
                            </div>
                          </SelectItem>
                          <SelectItem value="visualizador">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-gray-400" />
                              Visualizador
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
                        <p><strong>Admin:</strong> Acesso total ao sistema</p>
                        <p><strong>Editor:</strong> Pode editar conteúdo do site</p>
                        <p><strong>Visualizador:</strong> Apenas visualização</p>
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

      <AdminCard className="mt-6" title="Como funciona?">
        <div className="text-sm text-muted-foreground space-y-2 mt-2">
          <p>1. Usuários se cadastram pela página de login do admin</p>
          <p>2. Eles aparecem aqui automaticamente após o cadastro</p>
          <p>3. Você atribui funções para dar acesso ao painel</p>
          <p>4. Sem função atribuída, o usuário não consegue acessar</p>
        </div>
      </AdminCard>
    </AdminLayout>
  );
}
