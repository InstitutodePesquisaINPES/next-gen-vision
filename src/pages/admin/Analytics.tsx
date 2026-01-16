import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  Clock,
  Globe,
  MousePointerClick,
  Calendar,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

type DateRange = '7d' | '14d' | '30d' | '90d';

interface PageViewRow {
  path: string;
  created_at: string;
  session_id: string | null;
  referrer: string | null;
}

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const getDaysFromRange = (range: DateRange): number => {
    switch (range) {
      case '7d': return 7;
      case '14d': return 14;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  const { data: pageViews, isLoading, refetch } = useQuery({
    queryKey: ['page-views-analytics', dateRange],
    queryFn: async () => {
      const days = getDaysFromRange(dateRange);
      const startDate = startOfDay(subDays(new Date(), days));
      
      const { data, error } = await supabase
        .from('page_views')
        .select('path, created_at, session_id, referrer')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PageViewRow[];
    },
  });

  // Calculate statistics
  const stats = useMemo(() => {
    if (!pageViews || pageViews.length === 0) {
      return {
        totalViews: 0,
        uniqueSessions: 0,
        topPages: [] as { path: string; views: number; percentage: number }[],
        dailyViews: [] as { date: string; views: number }[],
        referrers: [] as { source: string; count: number }[],
        avgViewsPerDay: 0,
      };
    }

    // Total views
    const totalViews = pageViews.length;

    // Unique sessions
    const uniqueSessions = new Set(pageViews.map(v => v.session_id).filter(Boolean)).size;

    // Top pages
    const pageCountMap = new Map<string, number>();
    pageViews.forEach(v => {
      pageCountMap.set(v.path, (pageCountMap.get(v.path) || 0) + 1);
    });
    const topPages = Array.from(pageCountMap.entries())
      .map(([path, views]) => ({
        path,
        views,
        percentage: Math.round((views / totalViews) * 100),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Daily views for chart
    const days = getDaysFromRange(dateRange);
    const dailyMap = new Map<string, number>();
    for (let i = days; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'MM/dd');
      dailyMap.set(date, 0);
    }
    pageViews.forEach(v => {
      const date = format(new Date(v.created_at), 'MM/dd');
      if (dailyMap.has(date)) {
        dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
      }
    });
    const dailyViews = Array.from(dailyMap.entries()).map(([date, views]) => ({
      date,
      views,
    }));

    // Referrers
    const referrerMap = new Map<string, number>();
    pageViews.forEach(v => {
      if (v.referrer) {
        try {
          const url = new URL(v.referrer);
          const source = url.hostname;
          referrerMap.set(source, (referrerMap.get(source) || 0) + 1);
        } catch {
          referrerMap.set('Direto', (referrerMap.get('Direto') || 0) + 1);
        }
      } else {
        referrerMap.set('Direto', (referrerMap.get('Direto') || 0) + 1);
      }
    });
    const referrers = Array.from(referrerMap.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Average views per day
    const avgViewsPerDay = Math.round(totalViews / days);

    return {
      totalViews,
      uniqueSessions,
      topPages,
      dailyViews,
      referrers,
      avgViewsPerDay,
    };
  }, [pageViews, dateRange]);

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Analytics"
        description="Métricas de acesso e comportamento do site"
        icon={BarChart3}
        actions={
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
              <SelectTrigger className="w-36">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="14d">Últimos 14 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : pageViews && pageViews.length === 0 ? (
        <AdminCard>
          <AdminEmptyState
            icon={BarChart3}
            title="Nenhum dado de analytics ainda"
            description="Os dados de visualização aparecerão aqui quando visitantes acessarem o site. Certifique-se de que o tracking está ativo."
          />
        </AdminCard>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <AdminStatsCard
              title="Total de Visualizações"
              value={stats.totalViews.toLocaleString()}
              description={`Nos últimos ${getDaysFromRange(dateRange)} dias`}
              icon={Eye}
              variant="primary"
            />
            <AdminStatsCard
              title="Sessões Únicas"
              value={stats.uniqueSessions.toLocaleString()}
              description="Visitantes distintos"
              icon={Users}
              variant="success"
            />
            <AdminStatsCard
              title="Média por Dia"
              value={stats.avgViewsPerDay}
              description="Visualizações diárias"
              icon={TrendingUp}
              variant="warning"
            />
            <AdminStatsCard
              title="Páginas Rastreadas"
              value={stats.topPages.length}
              description="Com pelo menos 1 visualização"
              icon={Globe}
              variant="default"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Views Chart */}
            <div className="lg:col-span-2">
              <AdminCard title="Visualizações ao Longo do Tempo" description="Evolução diária de acessos">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.dailyViews}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorViews)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </AdminCard>
            </div>

            {/* Referrers */}
            <div className="lg:col-span-1">
              <AdminCard title="Fontes de Tráfego" description="De onde vêm os visitantes">
                <div className="space-y-3 mt-4">
                  {stats.referrers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Sem dados de referência
                    </p>
                  ) : (
                    stats.referrers.map((ref, i) => (
                      <div key={ref.source} className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium truncate">{ref.source}</span>
                            <span className="text-sm text-muted-foreground">{ref.count}</span>
                          </div>
                          <Progress 
                            value={(ref.count / stats.referrers[0].count) * 100} 
                            className="h-1.5"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </AdminCard>
            </div>
          </div>

          {/* Top Pages */}
          <AdminCard 
            title="Páginas Mais Visitadas" 
            description="Ranking de páginas por visualizações"
            className="mt-6"
          >
            <div className="mt-4">
              <div className="grid grid-cols-12 gap-4 text-xs text-muted-foreground font-medium mb-2 px-2">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Página</div>
                <div className="col-span-3">Visualizações</div>
                <div className="col-span-2">%</div>
              </div>
              <Separator className="mb-2" />
              <div className="space-y-1">
                {stats.topPages.map((page, index) => (
                  <div 
                    key={page.path}
                    className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="col-span-1">
                      <Badge 
                        variant="outline" 
                        className={
                          index === 0 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          index === 1 ? 'bg-gray-400/10 text-gray-400 border-gray-400/20' :
                          index === 2 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                          ''
                        }
                      >
                        {index + 1}
                      </Badge>
                    </div>
                    <div className="col-span-6 font-medium truncate">
                      {page.path === '/' ? 'Página Inicial' : page.path}
                    </div>
                    <div className="col-span-3 text-muted-foreground">
                      {page.views.toLocaleString()}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Progress value={page.percentage} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{page.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>

          {/* Info */}
          <AdminCard className="mt-6" title="Sobre os dados">
            <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-sm text-muted-foreground">
                Os dados de analytics são coletados de forma anônima quando visitantes acessam páginas do site. 
                Nenhuma informação pessoal identificável é armazenada. O hash de IP é usado apenas para 
                distinguir sessões únicas.
              </p>
            </div>
          </AdminCard>
        </>
      )}
    </AdminLayout>
  );
}
