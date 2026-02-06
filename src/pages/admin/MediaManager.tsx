import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ImageIcon, Upload, Trash2, Copy, Loader2, Search, 
  Grid3X3, List, FileImage, CheckCircle
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MediaFile {
  id: string;
  name: string;
  created_at: string;
  metadata: { size?: number; mimetype?: string } | null;
  url: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

export default function MediaManager() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: files, isLoading } = useQuery({
    queryKey: ['media-files'],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from('media').list('', {
        limit: 200,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      if (error) throw error;

      // Filter out .emptyFolderPlaceholder
      const filtered = (data || []).filter(f => f.name !== '.emptyFolderPlaceholder');

      return filtered.map(f => ({
        id: f.id,
        name: f.name,
        created_at: f.created_at,
        metadata: f.metadata as MediaFile['metadata'],
        url: supabase.storage.from('media').getPublicUrl(f.name).data.publicUrl,
      })) as MediaFile[];
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    setUploading(true);
    let successCount = 0;

    for (const file of Array.from(selectedFiles)) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

      const { error } = await supabase.storage.from('media').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        toast.error(`Erro ao enviar ${file.name}: ${error.message}`);
      } else {
        successCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} arquivo(s) enviado(s)!`);
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const deleteMutation = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.storage.from('media').remove([name]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
      toast.success('Arquivo removido!');
    },
    onError: (err) => toast.error('Erro: ' + (err as Error).message),
  });

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copiada!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = files?.filter(f =>
    !search || f.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const isImage = (name: string) => /\.(jpe?g|png|webp|gif|svg)$/i.test(name);

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gerenciador de Mídia"
        description="Upload e gerenciamento de imagens e arquivos"
        icon={ImageIcon}
        actions={
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
              {uploading ? 'Enviando...' : 'Upload'}
            </Button>
          </div>
        }
      />

      {/* Search and View Toggle */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar arquivos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
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
          title="Nenhum arquivo"
          description="Faça upload de imagens e arquivos para usar no site"
          icon={ImageIcon}
          action={{ label: 'Upload', onClick: () => fileInputRef.current?.click() }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(file => (
            <div key={file.id} className="group relative rounded-xl border border-border/50 overflow-hidden bg-card hover:border-primary/30 transition-all">
              <div className="aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
                {isImage(file.name) ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <FileImage className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate text-foreground">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {file.metadata?.size ? formatBytes(file.metadata.size) : '—'}
                </p>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => copyUrl(file.url, file.id)}>
                  {copiedId === file.id ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => { if (confirm('Excluir este arquivo?')) deleteMutation.mutate(file.name); }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AdminCard>
          <div className="divide-y divide-border">
            {filtered.map(file => (
              <div key={file.id} className="flex items-center gap-4 py-3 px-2 hover:bg-muted/20 rounded-lg transition-colors">
                <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center overflow-hidden shrink-0">
                  {isImage(file.name) ? (
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <FileImage className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.metadata?.size ? formatBytes(file.metadata.size) : '—'}
                    {file.created_at && ` • ${formatDistanceToNow(new Date(file.created_at), { addSuffix: true, locale: ptBR })}`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copyUrl(file.url, file.id)}>
                    {copiedId === file.id ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                    onClick={() => { if (confirm('Excluir?')) deleteMutation.mutate(file.name); }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      )}
    </AdminLayout>
  );
}
