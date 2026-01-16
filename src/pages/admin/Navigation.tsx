import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Navigation, Plus, Trash2, GripVertical, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface NavigationItem {
  id: string;
  parent_id: string | null;
  name: string;
  path: string;
  icon: string | null;
  description: string | null;
  order_index: number;
  is_visible: boolean;
}

export default function AdminNavigation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', path: '', description: '' });
  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: ['navigation-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data as NavigationItem[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: { name: string; path: string; description: string }) => {
      const maxOrder = items?.length ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
      
      const { error } = await supabase
        .from('navigation_items')
        .insert({
          name: item.name,
          path: item.path,
          description: item.description || null,
          order_index: maxOrder,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast.success('Item adicionado!');
      setIsDialogOpen(false);
      setNewItem({ name: '', path: '', description: '' });
    },
    onError: (error) => {
      toast.error('Erro: ' + (error as Error).message);
    },
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, is_visible }: { id: string; is_visible: boolean }) => {
      const { error } = await supabase
        .from('navigation_items')
        .update({ is_visible })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('navigation_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast.success('Item removido!');
    },
  });

  const handleCreate = () => {
    if (!newItem.name || !newItem.path) {
      toast.error('Nome e caminho são obrigatórios');
      return;
    }
    createMutation.mutate(newItem);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gerenciar Navegação"
        description="Configure os itens do menu principal"
        icon={Navigation}
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Item de Navegação</DialogTitle>
                <DialogDescription>
                  Adicione um novo item ao menu principal
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Ex: Sobre Nós"
                  />
                </div>
                <div>
                  <Label htmlFor="path">Caminho (URL)</Label>
                  <Input
                    id="path"
                    value={newItem.path}
                    onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
                    placeholder="Ex: /sobre"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Input
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Breve descrição"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Adicionar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <AdminCard>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : items?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Navigation className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum item de navegação cadastrado.</p>
            <Button variant="link" onClick={() => setIsDialogOpen(true)}>
              Adicionar primeiro item
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.path}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {item.is_visible ? (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={item.is_visible}
                      onCheckedChange={(checked) => 
                        toggleVisibilityMutation.mutate({ id: item.id, is_visible: checked })
                      }
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => deleteMutation.mutate(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </AdminLayout>
  );
}
