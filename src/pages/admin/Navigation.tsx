import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Navigation, 
  Plus, 
  Trash2, 
  GripVertical, 
  Loader2, 
  Eye, 
  EyeOff,
  Edit2,
  ExternalLink,
  FolderTree,
  Check,
  X
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AdminConfirmDialog } from '@/components/admin/AdminConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

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

interface SortableItemProps {
  item: NavigationItem;
  onToggleVisibility: (id: string, visible: boolean) => void;
  onEdit: (item: NavigationItem) => void;
  onDelete: (id: string) => void;
}

function SortableItem({ item, onToggleVisibility, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50',
        'hover:border-primary/30 transition-all duration-200',
        isDragging && 'opacity-50 shadow-lg border-primary/50'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground">{item.name}</p>
          {!item.is_visible && (
            <Badge variant="outline" className="text-xs bg-muted">Oculto</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{item.path}</p>
        {item.description && (
          <p className="text-xs text-muted-foreground/70 truncate mt-1">{item.description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {item.is_visible ? (
            <Eye className="h-4 w-4 text-green-500" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}
          <Switch
            checked={item.is_visible}
            onCheckedChange={(checked) => onToggleVisibility(item.id, checked)}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(item)}
          className="h-8 w-8"
        >
          <Edit2 className="h-4 w-4" />
        </Button>

        <AdminConfirmDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          title="Excluir item de navegação?"
          description={`Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`}
          confirmLabel="Excluir"
          variant="danger"
          onConfirm={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
}

export default function AdminNavigation() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [formData, setFormData] = useState({ name: '', path: '', description: '', icon: '' });
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    mutationFn: async (item: { name: string; path: string; description: string; icon: string }) => {
      const maxOrder = items?.length ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
      
      const { error } = await supabase
        .from('navigation_items')
        .insert({
          name: item.name,
          path: item.path.startsWith('/') ? item.path : `/${item.path}`,
          description: item.description || null,
          icon: item.icon || null,
          order_index: maxOrder,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast.success('Item criado com sucesso!');
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error('Erro: ' + (error as Error).message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (item: NavigationItem) => {
      const { error } = await supabase
        .from('navigation_items')
        .update({
          name: item.name,
          path: item.path.startsWith('/') ? item.path : `/${item.path}`,
          description: item.description || null,
          icon: item.icon || null,
        })
        .eq('id', item.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast.success('Item atualizado!');
      setEditingItem(null);
      resetForm();
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
      toast.success('Visibilidade alterada!');
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (newItems: NavigationItem[]) => {
      const updates = newItems.map((item, index) => 
        supabase
          .from('navigation_items')
          .update({ order_index: index })
          .eq('id', item.id)
      );
      
      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast.success('Ordem atualizada!');
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
      toast.success('Item excluído!');
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id && items) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      
      // Optimistically update UI
      queryClient.setQueryData(['navigation-items'], newItems);
      
      // Persist to database
      reorderMutation.mutate(newItems);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', path: '', description: '', icon: '' });
  };

  const handleCreate = () => {
    if (!formData.name || !formData.path) {
      toast.error('Nome e caminho são obrigatórios');
      return;
    }
    createMutation.mutate(formData);
  };

  const handleUpdate = () => {
    if (!editingItem) return;
    updateMutation.mutate({
      ...editingItem,
      ...formData,
    });
  };

  const openEditDialog = (item: NavigationItem) => {
    setFormData({
      name: item.name,
      path: item.path,
      description: item.description || '',
      icon: item.icon || '',
    });
    setEditingItem(item);
  };

  const visibleCount = items?.filter(i => i.is_visible).length || 0;
  const hiddenCount = (items?.length || 0) - visibleCount;

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gerenciar Navegação"
        description="Configure os itens do menu principal do site"
        icon={Navigation}
        actions={
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Sobre Nós"
                  />
                </div>
                <div>
                  <Label htmlFor="path">Caminho (URL) *</Label>
                  <Input
                    id="path"
                    value={formData.path}
                    onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                    placeholder="Ex: /sobre"
                  />
                  <p className="text-xs text-muted-foreground mt-1">A barra inicial será adicionada automaticamente</p>
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Breve descrição (aparece em hover)"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Ícone (nome do Lucide)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Ex: home, users, settings"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => { setIsCreateDialogOpen(false); resetForm(); }}>
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Criar Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-foreground">{items?.length || 0}</p>
          <p className="text-sm text-muted-foreground">Total de itens</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-green-500">{visibleCount}</p>
          <p className="text-sm text-muted-foreground">Visíveis</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-muted-foreground">{hiddenCount}</p>
          <p className="text-sm text-muted-foreground">Ocultos</p>
        </div>
      </div>

      <AdminCard 
        title="Itens do Menu" 
        description="Arraste para reordenar • Use os switches para mostrar/ocultar"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !items || items.length === 0 ? (
          <AdminEmptyState
            icon={FolderTree}
            title="Nenhum item de navegação"
            description="Crie o primeiro item do menu para começar"
            action={{
              label: 'Criar primeiro item',
              onClick: () => setIsCreateDialogOpen(true),
            }}
          />
        ) : (
          <div className="space-y-2 mt-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map(i => i.id)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onToggleVisibility={(id, visible) => toggleVisibilityMutation.mutate({ id, is_visible: visible })}
                    onEdit={openEditDialog}
                    onDelete={(id) => deleteMutation.mutate(id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </AdminCard>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={(open) => { if (!open) { setEditingItem(null); resetForm(); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Item</DialogTitle>
            <DialogDescription>
              Altere as informações do item de navegação
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-name">Nome *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-path">Caminho (URL) *</Label>
              <Input
                id="edit-path"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descrição</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-icon">Ícone</Label>
              <Input
                id="edit-icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditingItem(null); resetForm(); }}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
              {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Instructions */}
      <AdminCard className="mt-6" title="Dicas de uso">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <GripVertical className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Arrastar e soltar</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Segure o ícone de grip e arraste para reordenar os itens
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-green-500" />
              <span className="font-medium text-sm">Visibilidade</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Use o switch para ocultar itens sem excluí-los
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Links externos</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Use URLs completas (https://...) para links externos
            </p>
          </div>
        </div>
      </AdminCard>
    </AdminLayout>
  );
}
