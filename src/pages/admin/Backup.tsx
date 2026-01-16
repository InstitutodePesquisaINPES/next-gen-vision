import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Archive, 
  Download, 
  Upload, 
  Trash2, 
  Loader2,
  Clock,
  CheckCircle,
  AlertCircle,
  FileJson,
  RotateCcw
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AdminConfirmDialog } from '@/components/admin/AdminConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Json } from '@/integrations/supabase/types';

interface ContentBackup {
  id: string;
  name: string;
  description: string | null;
  backup_data: Json;
  created_by: string | null;
  created_at: string;
}

interface BackupData {
  site_content: unknown[];
  site_settings: unknown[];
  navigation_items: unknown[];
  created_at: string;
  version: string;
}

export default function AdminBackup() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [backupName, setBackupName] = useState('');
  const [backupDescription, setBackupDescription] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  const { data: backups, isLoading } = useQuery({
    queryKey: ['content-backups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_backups')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContentBackup[];
    },
  });

  const createBackupMutation = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      // Fetch all content
      const [contentResult, settingsResult, navResult] = await Promise.all([
        supabase.from('site_content').select('*'),
        supabase.from('site_settings').select('*'),
        supabase.from('navigation_items').select('*'),
      ]);

      if (contentResult.error) throw contentResult.error;
      if (settingsResult.error) throw settingsResult.error;
      if (navResult.error) throw navResult.error;

      const backupData: BackupData = {
        site_content: contentResult.data,
        site_settings: settingsResult.data,
        navigation_items: navResult.data,
        created_at: new Date().toISOString(),
        version: '1.0',
      };

      const { error } = await supabase
        .from('content_backups')
        .insert({
          name,
          description: description || null,
          backup_data: backupData as unknown as Json,
          created_by: user?.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-backups'] });
      toast.success('Backup criado com sucesso!');
      setIsCreateDialogOpen(false);
      setBackupName('');
      setBackupDescription('');
    },
    onError: (error) => {
      toast.error('Erro ao criar backup: ' + (error as Error).message);
    },
  });

  const restoreBackupMutation = useMutation({
    mutationFn: async (backup: ContentBackup) => {
      const data = backup.backup_data as unknown as BackupData;

      // Clear existing data and restore
      // First, delete all current content
      await supabase.from('site_content').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('site_settings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('navigation_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      // Insert backup data
      if (data.site_content && data.site_content.length > 0) {
        const { error: contentError } = await supabase
          .from('site_content')
          .insert(data.site_content as any[]);
        if (contentError) throw contentError;
      }

      if (data.site_settings && data.site_settings.length > 0) {
        const { error: settingsError } = await supabase
          .from('site_settings')
          .insert(data.site_settings as any[]);
        if (settingsError) throw settingsError;
      }

      if (data.navigation_items && data.navigation_items.length > 0) {
        const { error: navError } = await supabase
          .from('navigation_items')
          .insert(data.navigation_items as any[]);
        if (navError) throw navError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast.success('Backup restaurado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao restaurar: ' + (error as Error).message);
    },
  });

  const deleteBackupMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('content_backups')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-backups'] });
      toast.success('Backup excluído!');
    },
  });

  const downloadBackup = (backup: ContentBackup) => {
    const data = JSON.stringify(backup.backup_data, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${backup.name.toLowerCase().replace(/\s+/g, '-')}-${format(new Date(backup.created_at), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Backup baixado!');
  };

  const handleCreateBackup = () => {
    if (!backupName.trim()) {
      toast.error('Nome do backup é obrigatório');
      return;
    }
    createBackupMutation.mutate({ name: backupName, description: backupDescription });
  };

  const getBackupSize = (backup: ContentBackup) => {
    const data = backup.backup_data as unknown as BackupData;
    const totalItems = 
      (data.site_content?.length || 0) + 
      (data.site_settings?.length || 0) + 
      (data.navigation_items?.length || 0);
    return totalItems;
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Backup & Restauração"
        description="Gerencie backups do conteúdo do site"
        icon={Archive}
        actions={
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Archive className="h-4 w-4 mr-2" />
                Criar Backup
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Backup</DialogTitle>
                <DialogDescription>
                  Salve uma cópia do conteúdo atual do site
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="backup-name">Nome do Backup *</Label>
                  <Input
                    id="backup-name"
                    value={backupName}
                    onChange={(e) => setBackupName(e.target.value)}
                    placeholder="Ex: Backup antes de grandes mudanças"
                  />
                </div>
                <div>
                  <Label htmlFor="backup-desc">Descrição (opcional)</Label>
                  <Textarea
                    id="backup-desc"
                    value={backupDescription}
                    onChange={(e) => setBackupDescription(e.target.value)}
                    placeholder="Descreva o que este backup contém..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  O backup incluirá: conteúdo do site, configurações e navegação
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateBackup} disabled={createBackupMutation.isPending}>
                  {createBackupMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Criar Backup
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-foreground">{backups?.length || 0}</p>
          <p className="text-sm text-muted-foreground">Backups salvos</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-green-500">
            {backups?.[0] ? formatDistanceToNow(new Date(backups[0].created_at), { addSuffix: false, locale: ptBR }) : '-'}
          </p>
          <p className="text-sm text-muted-foreground">Último backup</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-blue-500">
            {backups?.[0] ? getBackupSize(backups[0]) : 0}
          </p>
          <p className="text-sm text-muted-foreground">Itens no último backup</p>
        </div>
      </div>

      <AdminCard title="Backups Disponíveis" description="Clique para baixar ou restaurar">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !backups || backups.length === 0 ? (
          <AdminEmptyState
            icon={Archive}
            title="Nenhum backup encontrado"
            description="Crie seu primeiro backup para proteger o conteúdo do site"
            action={{
              label: 'Criar primeiro backup',
              onClick: () => setIsCreateDialogOpen(true),
            }}
          />
        ) : (
          <div className="space-y-3 mt-4">
            {backups.map((backup, index) => (
              <div
                key={backup.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-200"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileJson className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{backup.name}</p>
                    {index === 0 && (
                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                        Mais recente
                      </Badge>
                    )}
                  </div>
                  {backup.description && (
                    <p className="text-sm text-muted-foreground truncate">{backup.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(backup.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </span>
                    <span>•</span>
                    <span>{getBackupSize(backup)} itens</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadBackup(backup)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Baixar
                  </Button>
                  
                  <AdminConfirmDialog
                    trigger={
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Restaurar
                      </Button>
                    }
                    title="Restaurar este backup?"
                    description="Esta ação substituirá todo o conteúdo atual pelo conteúdo do backup. Esta ação não pode ser desfeita. Recomendamos criar um backup do estado atual antes de restaurar."
                    confirmLabel="Restaurar Backup"
                    variant="warning"
                    onConfirm={() => restoreBackupMutation.mutate(backup)}
                    isLoading={restoreBackupMutation.isPending}
                  />

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
                    title="Excluir backup?"
                    description={`Tem certeza que deseja excluir o backup "${backup.name}"? Esta ação não pode ser desfeita.`}
                    confirmLabel="Excluir"
                    variant="danger"
                    onConfirm={() => deleteBackupMutation.mutate(backup.id)}
                    isLoading={deleteBackupMutation.isPending}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Tips */}
      <AdminCard className="mt-6" title="Boas práticas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="font-medium text-sm">Antes de grandes mudanças</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Sempre crie um backup antes de fazer alterações significativas no conteúdo
            </p>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Download className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Guarde localmente</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Baixe backups importantes para seu computador como segurança extra
            </p>
          </div>
          <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="font-medium text-sm">Antes de restaurar</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Crie um backup do estado atual antes de restaurar versões anteriores
            </p>
          </div>
        </div>
      </AdminCard>
    </AdminLayout>
  );
}
