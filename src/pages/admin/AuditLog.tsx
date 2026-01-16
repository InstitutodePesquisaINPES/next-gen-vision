import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  History,
  Search,
  Filter,
  Loader2,
  User,
  FileText,
  Edit2,
  Trash2,
  Plus,
  LogIn,
  LogOut,
  RefreshCw,
  Clock,
  ChevronDown,
  Eye,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { format, formatDistanceToNow, subDays } from 'date-fns';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type AuditLog = Database['public']['Tables']['audit_logs']['Row'];

type DateRange = '1d' | '7d' | '30d' | '90d';

const actionConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  criar: { label: 'Criação', icon: Plus, color: 'text-green-500 bg-green-500/10' },
  atualizar: { label: 'Atualização', icon: Edit2, color: 'text-blue-500 bg-blue-500/10' },
  deletar: { label: 'Exclusão', icon: Trash2, color: 'text-red-500 bg-red-500/10' },
  login: { label: 'Login', icon: LogIn, color: 'text-purple-500 bg-purple-500/10' },
  logout: { label: 'Logout', icon: LogOut, color: 'text-gray-500 bg-gray-500/10' },
};

const entityLabels: Record<string, string> = {
  lead: 'Lead',
  tarefa: 'Tarefa',
  usuario: 'Usuário',
  webhook: 'Webhook',
  configuracao: 'Configuração',
  navegacao: 'Navegação',
  conteudo: 'Conteúdo',
  backup: 'Backup',
};

export default function AdminAuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const getDaysFromRange = (range: DateRange): number => {
    switch (range) {
      case '1d': return 1;
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 7;
    }
  };

  // Fetch audit logs
  const { data: logs, isLoading, refetch } = useQuery({
    queryKey: ['audit-logs', dateRange],
    queryFn: async () => {
      const days = getDaysFromRange(dateRange);
      const startDate = subDays(new Date(), days);

      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;
      return data as AuditLog[];
    },
  });

  // Filtered logs
  const filteredLogs = useMemo(() => {
    if (!logs) return [];
    return logs.filter((log) => {
      const matchesSearch =
        log.usuario_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entidade?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.acao?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEntity = entityFilter === 'all' || log.entidade === entityFilter;
      const matchesAction = actionFilter === 'all' || log.acao === actionFilter;
      return matchesSearch && matchesEntity && matchesAction;
    });
  }, [logs, searchQuery, entityFilter, actionFilter]);

  // Get unique entities for filter
  const entities = useMemo(() => {
    if (!logs) return [];
    return [...new Set(logs.map((l) => l.entidade))].filter(Boolean);
  }, [logs]);

  // Get unique actions for filter
  const actions = useMemo(() => {
    if (!logs) return [];
    return [...new Set(logs.map((l) => l.acao))].filter(Boolean);
  }, [logs]);

  const formatJsonDiff = (oldData: unknown, newData: unknown) => {
    const changes: { field: string; old: unknown; new: unknown }[] = [];
    
    if (!oldData && newData && typeof newData === 'object') {
      Object.entries(newData as object).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          changes.push({ field: key, old: null, new: value });
        }
      });
    } else if (oldData && newData && typeof oldData === 'object' && typeof newData === 'object') {
      Object.keys({ ...oldData, ...newData }).forEach((key) => {
        const oldVal = (oldData as Record<string, unknown>)[key];
        const newVal = (newData as Record<string, unknown>)[key];
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
          changes.push({ field: key, old: oldVal, new: newVal });
        }
      });
    }

    return changes;
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Log de Auditoria"
        description="Histórico de todas as ações realizadas no sistema"
        icon={History}
        actions={
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <AdminSearchInput
          placeholder="Buscar por usuário, entidade..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        
        <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
          <SelectTrigger className="w-full sm:w-40">
            <Clock className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Últimas 24h</SelectItem>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
            <SelectItem value="90d">Últimos 90 dias</SelectItem>
          </SelectContent>
        </Select>

        <Select value={entityFilter} onValueChange={setEntityFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Entidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas entidades</SelectItem>
            {entities.map((entity) => (
              <SelectItem key={entity} value={entity}>
                {entityLabels[entity] || entity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas ações</SelectItem>
            {actions.map((action) => (
              <SelectItem key={action} value={action}>
                {actionConfig[action]?.label || action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold">{filteredLogs.length}</p>
          <p className="text-sm text-muted-foreground">Registros</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-green-500">
            {logs?.filter((l) => l.acao === 'criar').length || 0}
          </p>
          <p className="text-sm text-muted-foreground">Criações</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-blue-500">
            {logs?.filter((l) => l.acao === 'atualizar').length || 0}
          </p>
          <p className="text-sm text-muted-foreground">Atualizações</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <p className="text-2xl font-bold text-red-500">
            {logs?.filter((l) => l.acao === 'deletar').length || 0}
          </p>
          <p className="text-sm text-muted-foreground">Exclusões</p>
        </div>
      </div>

      {/* Logs List */}
      <AdminCard>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredLogs.length === 0 ? (
          <AdminEmptyState
            icon={History}
            title="Nenhum registro encontrado"
            description="Ajuste os filtros ou período de busca"
          />
        ) : (
          <div className="space-y-2">
            {filteredLogs.map((log) => {
              const config = actionConfig[log.acao] || {
                label: log.acao,
                icon: FileText,
                color: 'text-gray-500 bg-gray-500/10',
              };
              const ActionIcon = config.icon;

              return (
                <div
                  key={log.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border/30 hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <div className={cn('p-2 rounded-lg', config.color)}>
                    <ActionIcon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant="outline" className="text-xs">
                        {entityLabels[log.entidade] || log.entidade}
                      </Badge>
                      <span className="text-sm font-medium">{config.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {log.usuario_email || 'Sistema'}
                    </p>
                  </div>

                  <div className="text-right text-xs text-muted-foreground">
                    <p>{format(new Date(log.created_at), 'dd/MM/yyyy', { locale: ptBR })}</p>
                    <p>{format(new Date(log.created_at), 'HH:mm:ss', { locale: ptBR })}</p>
                  </div>

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </AdminCard>

      {/* Detail Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Detalhes do Registro</DialogTitle>
            <DialogDescription>
              {selectedLog && format(new Date(selectedLog.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss", { locale: ptBR })}
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4 p-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Ação</Label>
                    <p className="font-medium">{actionConfig[selectedLog.acao]?.label || selectedLog.acao}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Entidade</Label>
                    <p className="font-medium">{entityLabels[selectedLog.entidade] || selectedLog.entidade}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Usuário</Label>
                    <p className="font-medium">{selectedLog.usuario_email || 'Sistema'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">ID da Entidade</Label>
                    <p className="font-mono text-xs">{selectedLog.entidade_id || '-'}</p>
                  </div>
                </div>

                {(selectedLog.dados_antigos || selectedLog.dados_novos) && (
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Alterações</Label>
                    <div className="rounded-lg border border-border/50 overflow-hidden">
                      {formatJsonDiff(selectedLog.dados_antigos, selectedLog.dados_novos).slice(0, 20).map((change, i) => (
                        <div
                          key={i}
                          className={cn(
                            'p-2 text-sm border-b border-border/30 last:border-b-0',
                            i % 2 === 0 ? 'bg-muted/30' : ''
                          )}
                        >
                          <span className="font-mono text-xs text-primary">{change.field}</span>
                          <div className="flex items-center gap-2 mt-1">
                            {change.old !== null && (
                              <span className="text-xs text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                                {typeof change.old === 'object' ? JSON.stringify(change.old) : String(change.old)}
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">→</span>
                            <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                              {typeof change.new === 'object' ? JSON.stringify(change.new) : String(change.new)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLog.ip_address && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Endereço IP</Label>
                    <p className="font-mono text-xs">{selectedLog.ip_address}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-sm font-medium', className)}>{children}</p>;
}
