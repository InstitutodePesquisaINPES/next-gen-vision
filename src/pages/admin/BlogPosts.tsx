import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FileText, Plus, Edit, Trash2, Eye, Search, Loader2, 
  Calendar, MoreHorizontal, Globe, FileEdit, Archive
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { LivePreview } from '@/components/admin/LivePreview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BlogPost {
  id: string;
  titulo: string;
  slug: string;
  resumo: string | null;
  conteudo_html: string;
  imagem_capa_url: string | null;
  categoria: string | null;
  tags: string[] | null;
  autor_nome: string | null;
  status: string;
  publicado_em: string | null;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  rascunho: { label: 'Rascunho', variant: 'secondary' },
  publicado: { label: 'Publicado', variant: 'default' },
  arquivado: { label: 'Arquivado', variant: 'outline' },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function BlogPosts() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (post: Partial<BlogPost>) => {
      const slug = post.slug || slugify(post.titulo || '');
      const payload = {
        titulo: post.titulo,
        slug,
        resumo: post.resumo || null,
        conteudo_html: post.conteudo_html || '',
        imagem_capa_url: post.imagem_capa_url || null,
        categoria: post.categoria || null,
        tags: post.tags || [],
        autor_nome: post.autor_nome || null,
        status: post.status || 'rascunho',
        publicado_em: post.status === 'publicado' && !post.publicado_em ? new Date().toISOString() : post.publicado_em,
      };

      if (post.id) {
        const { error } = await supabase.from('blog_posts').update(payload).eq('id', post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert({ ...payload, criado_por: user?.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      setIsDialogOpen(false);
      setEditingPost(null);
      toast.success('Post salvo com sucesso!');
    },
    onError: (err) => toast.error('Erro: ' + (err as Error).message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('Post excluído!');
    },
    onError: (err) => toast.error('Erro: ' + (err as Error).message),
  });

  const filtered = posts?.filter(p => {
    const matchSearch = !search || p.titulo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || p.status === filterStatus;
    return matchSearch && matchStatus;
  }) || [];

  const openNew = () => {
    setEditingPost({ status: 'rascunho', conteudo_html: '', tags: [] });
    setIsDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Blog"
        description="Crie e gerencie artigos do blog"
        icon={FileText}
        actions={
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Post
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {[null, 'rascunho', 'publicado', 'arquivado'].map(s => (
            <Button
              key={s || 'all'}
              variant={filterStatus === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(s)}
            >
              {s ? statusConfig[s].label : 'Todos'}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <AdminCard>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </AdminCard>
      ) : filtered.length === 0 ? (
        <AdminEmptyState
          title="Nenhum post encontrado"
          description="Crie seu primeiro artigo no blog"
          icon={FileText}
          action={{ label: 'Criar Post', onClick: openNew }}
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map(post => {
            const sc = statusConfig[post.status] || statusConfig.rascunho;
            return (
              <AdminCard key={post.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{post.titulo}</h3>
                      <Badge variant={sc.variant}>{sc.label}</Badge>
                    </div>
                    {post.resumo && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.resumo}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                      {post.categoria && <span>📁 {post.categoria}</span>}
                      {post.autor_nome && <span>✍️ {post.autor_nome}</span>}
                      <span className="font-mono text-muted-foreground/60">/{post.slug}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(post)}>
                        <Edit className="h-4 w-4 mr-2" />Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          saveMutation.mutate({ ...post, status: post.status === 'publicado' ? 'rascunho' : 'publicado' });
                        }}
                      >
                        {post.status === 'publicado' ? (
                          <><FileEdit className="h-4 w-4 mr-2" />Despublicar</>
                        ) : (
                          <><Globe className="h-4 w-4 mr-2" />Publicar</>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => {
                          if (confirm('Excluir este post?')) deleteMutation.mutate(post.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost?.id ? 'Editar Post' : 'Novo Post'}</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div>
                <Label>Título *</Label>
                <Input
                  value={editingPost.titulo || ''}
                  onChange={e => setEditingPost(p => ({ ...p, titulo: e.target.value, slug: p?.slug || slugify(e.target.value) }))}
                  placeholder="Título do artigo"
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={editingPost.slug || ''}
                  onChange={e => setEditingPost(p => ({ ...p, slug: e.target.value }))}
                  placeholder="url-do-artigo"
                />
                <p className="text-xs text-muted-foreground mt-1">URL amigável: /blog/{editingPost.slug || 'slug'}</p>
              </div>
              <div>
                <Label>Resumo</Label>
                <Textarea
                  value={editingPost.resumo || ''}
                  onChange={e => setEditingPost(p => ({ ...p, resumo: e.target.value }))}
                  placeholder="Breve descrição do artigo..."
                  rows={2}
                />
              </div>
              <div>
                <Label>Conteúdo</Label>
                <RichTextEditor
                  value={editingPost.conteudo_html || ''}
                  onChange={html => setEditingPost(p => ({ ...p, conteudo_html: html }))}
                  placeholder="Comece a escrever seu artigo..."
                  minHeight="350px"
                />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
                  <Input
                    value={editingPost.categoria || ''}
                    onChange={e => setEditingPost(p => ({ ...p, categoria: e.target.value }))}
                    placeholder="Ex: Data Science"
                  />
                </div>
                <div>
                  <Label>Autor</Label>
                  <Input
                    value={editingPost.autor_nome || ''}
                    onChange={e => setEditingPost(p => ({ ...p, autor_nome: e.target.value }))}
                    placeholder="Nome do autor"
                  />
                </div>
              </div>
              <div>
                <Label>URL da Imagem de Capa</Label>
                <Input
                  value={editingPost.imagem_capa_url || ''}
                  onChange={e => setEditingPost(p => ({ ...p, imagem_capa_url: e.target.value }))}
                  placeholder="https://... ou selecione do gerenciador de mídia"
                />
              </div>
              <div>
                <Label>Tags (separadas por vírgula)</Label>
                <Input
                  value={(editingPost.tags || []).join(', ')}
                  onChange={e => setEditingPost(p => ({ ...p, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button
              variant="secondary"
              onClick={() => {
                if (!editingPost?.titulo) return toast.error('Título é obrigatório');
                saveMutation.mutate({ ...editingPost, status: 'rascunho' });
              }}
              disabled={saveMutation.isPending}
            >
              Salvar Rascunho
            </Button>
            <Button
              onClick={() => {
                if (!editingPost?.titulo) return toast.error('Título é obrigatório');
                saveMutation.mutate({ ...editingPost, status: 'publicado' });
              }}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Globe className="h-4 w-4 mr-2" />}
              Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
