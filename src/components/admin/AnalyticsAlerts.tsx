import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Bell, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Check, 
  X, 
  Settings2,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AdminCard } from './AdminCard';
import { AdminEmptyState } from './AdminEmptyState';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AlertConfig {
  id: string;
  name: string;
  description: string | null;
  alert_type: string;
  threshold_percentage: number;
  comparison_period: string;
  is_active: boolean;
  notify_email: boolean;
}

interface Alert {
  id: string;
  config_id: string | null;
  alert_type: string;
  severity: string;
  title: string;
  message: string;
  metric_value: number | null;
  expected_value: number | null;
  deviation_percentage: number | null;
  affected_path: string | null;
  is_read: boolean;
  is_dismissed: boolean;
  triggered_at: string;
}

export function AnalyticsAlerts() {
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch alert configs
  const { data: configs, isLoading: configsLoading } = useQuery({
    queryKey: ['analytics-alert-configs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_alert_configs')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data as AlertConfig[];
    },
  });

  // Fetch active alerts
  const { data: alerts, isLoading: alertsLoading, refetch: refetchAlerts } = useQuery({
    queryKey: ['analytics-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_alerts')
        .select('*')
        .eq('is_dismissed', false)
        .order('triggered_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as Alert[];
    },
  });

  // Toggle config active state
  const toggleConfigMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('analytics_alert_configs')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics-alert-configs'] });
      toast.success('Configuração atualizada');
    },
    onError: () => {
      toast.error('Erro ao atualizar configuração');
    },
  });

  // Update config threshold
  const updateConfigMutation = useMutation({
    mutationFn: async ({ id, threshold_percentage, comparison_period }: { 
      id: string; 
      threshold_percentage: number;
      comparison_period: string;
    }) => {
      const { error } = await supabase
        .from('analytics_alert_configs')
        .update({ threshold_percentage, comparison_period })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics-alert-configs'] });
      toast.success('Configuração atualizada');
    },
    onError: () => {
      toast.error('Erro ao atualizar configuração');
    },
  });

  // Mark alert as read
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('analytics_alerts')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics-alerts'] });
    },
  });

  // Dismiss alert
  const dismissAlertMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('analytics_alerts')
        .update({ 
          is_dismissed: true, 
          dismissed_at: new Date().toISOString() 
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics-alerts'] });
      toast.success('Alerta dispensado');
    },
    onError: () => {
      toast.error('Erro ao dispensar alerta');
    },
  });

  // Run anomaly check manually
  const checkAnomaliesMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc('check_analytics_anomalies');
      if (error) throw error;
    },
    onSuccess: () => {
      refetchAlerts();
      toast.success('Verificação de anomalias executada');
    },
    onError: (error) => {
      console.error('Anomaly check error:', error);
      toast.error('Erro ao verificar anomalias');
    },
  });

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getAlertIcon = (alertType: string) => {
    switch (alertType) {
      case 'traffic_drop':
        return TrendingDown;
      case 'traffic_spike':
        return TrendingUp;
      default:
        return AlertTriangle;
    }
  };

  const unreadCount = alerts?.filter(a => !a.is_read).length || 0;

  return (
    <div className="space-y-6">
      {/* Alerts Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold">Alertas de Anomalias</h3>
            <p className="text-xs text-muted-foreground">
              Monitore quedas e picos de tráfego automaticamente
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => checkAnomaliesMutation.mutate()}
            disabled={checkAnomaliesMutation.isPending}
          >
            {checkAnomaliesMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2 hidden sm:inline">Verificar Agora</span>
          </Button>
          
          <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings2 className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Configurar</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Configurações de Alertas</DialogTitle>
                <DialogDescription>
                  Configure os limites e períodos de comparação para detecção de anomalias
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                {configsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : configs?.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhuma configuração encontrada
                  </p>
                ) : (
                  configs?.map((config) => (
                    <div 
                      key={config.id}
                      className="p-4 rounded-lg border border-border/50 bg-muted/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {config.alert_type === 'traffic_drop' ? (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">{config.name}</span>
                        </div>
                        <Switch
                          checked={config.is_active}
                          onCheckedChange={(checked) => 
                            toggleConfigMutation.mutate({ id: config.id, is_active: checked })
                          }
                        />
                      </div>
                      
                      {config.description && (
                        <p className="text-xs text-muted-foreground">
                          {config.description}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Limite (%)</Label>
                          <Input
                            type="number"
                            min={1}
                            max={100}
                            value={config.threshold_percentage}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (value >= 1 && value <= 100) {
                                updateConfigMutation.mutate({
                                  id: config.id,
                                  threshold_percentage: value,
                                  comparison_period: config.comparison_period,
                                });
                              }
                            }}
                            className="h-8"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Período</Label>
                          <Select
                            value={config.comparison_period}
                            onValueChange={(value) => 
                              updateConfigMutation.mutate({
                                id: config.id,
                                threshold_percentage: config.threshold_percentage,
                                comparison_period: value,
                              })
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1d">1 dia</SelectItem>
                              <SelectItem value="7d">7 dias</SelectItem>
                              <SelectItem value="14d">14 dias</SelectItem>
                              <SelectItem value="30d">30 dias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Separator />

      {/* Active Alerts */}
      {alertsLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : !alerts || alerts.length === 0 ? (
        <div className="p-6 rounded-lg border border-border/50 bg-muted/20 text-center">
          <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="font-medium">Tudo normal!</p>
          <p className="text-sm text-muted-foreground">
            Nenhuma anomalia detectada no momento
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.alert_type);
            return (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-lg border transition-all',
                  alert.is_read 
                    ? 'bg-muted/20 border-border/30' 
                    : 'bg-card border-border/50 shadow-sm',
                  getSeverityStyles(alert.severity)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'p-2 rounded-lg',
                    getSeverityStyles(alert.severity)
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{alert.title}</span>
                      <Badge variant="outline" className={getSeverityStyles(alert.severity)}>
                        {alert.severity === 'critical' ? 'Crítico' : 
                         alert.severity === 'warning' ? 'Atenção' : 'Info'}
                      </Badge>
                      {!alert.is_read && (
                        <Badge variant="secondary" className="text-[10px]">Novo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {alert.metric_value !== null && alert.expected_value !== null && (
                        <span>
                          Atual: {alert.metric_value?.toLocaleString()} / 
                          Esperado: {alert.expected_value?.toLocaleString()}
                        </span>
                      )}
                      <span>
                        {formatDistanceToNow(new Date(alert.triggered_at), { 
                          addSuffix: true, 
                          locale: ptBR 
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {!alert.is_read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => markAsReadMutation.mutate(alert.id)}
                        title="Marcar como lido"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => dismissAlertMutation.mutate(alert.id)}
                      title="Dispensar"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
