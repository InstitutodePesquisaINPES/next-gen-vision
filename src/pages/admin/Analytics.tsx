import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye,
  Globe,
  Calendar,
  RefreshCw,
  Loader2,
  Download,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AnalyticsAlerts } from '@/components/admin/AnalyticsAlerts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, startOfDay, startOfWeek, endOfWeek, eachDayOfInterval, eachWeekOfInterval, getWeek, getYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  Legend,
} from 'recharts';
import { toast } from 'sonner';

type DateRange = '7d' | '14d' | '30d' | '90d';
type ChartView = 'daily' | 'weekly' | 'comparison';

interface PageViewRow {
  path: string;
  created_at: string;
  session_id: string | null;
  referrer: string | null;
}

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [chartView, setChartView] = useState<ChartView>('daily');

  const getDaysFromRange = (range: DateRange): number => {
    switch (range) {
      case '7d': return 7;
      case '14d': return 14;
      case '30d': return 30;
      case '90d': return 90;
      default: return 30;
    }
  };

  // Fetch current period data
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

  // Fetch previous period data for comparison
  const { data: previousPeriodViews } = useQuery({
    queryKey: ['page-views-previous', dateRange],
    queryFn: async () => {
      const days = getDaysFromRange(dateRange);
      const endDate = startOfDay(subDays(new Date(), days));
      const startDate = startOfDay(subDays(new Date(), days * 2));
      
      const { data, error } = await supabase
        .from('page_views')
        .select('path, created_at, session_id, referrer')
        .gte('created_at', startDate.toISOString())
        .lt('created_at', endDate.toISOString());
      
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
        dailyViews: [] as { date: string; views: number; sessions: number }[],
        weeklyViews: [] as { week: string; views: number; sessions: number; avgDaily: number }[],
        referrers: [] as { source: string; count: number }[],
        avgViewsPerDay: 0,
        previousTotalViews: 0,
        previousUniqueSessions: 0,
        viewsTrend: 0,
        sessionsTrend: 0,
      };
    }

    const days = getDaysFromRange(dateRange);
    
    // Total views
    const totalViews = pageViews.length;
    const previousTotalViews = previousPeriodViews?.length || 0;
    const viewsTrend = previousTotalViews > 0 
      ? Math.round(((totalViews - previousTotalViews) / previousTotalViews) * 100)
      : 0;

    // Unique sessions
    const uniqueSessions = new Set(pageViews.map(v => v.session_id).filter(Boolean)).size;
    const previousUniqueSessions = new Set(previousPeriodViews?.map(v => v.session_id).filter(Boolean) || []).size;
    const sessionsTrend = previousUniqueSessions > 0
      ? Math.round(((uniqueSessions - previousUniqueSessions) / previousUniqueSessions) * 100)
      : 0;

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
    const startDate = subDays(new Date(), days);
    const dateInterval = eachDayOfInterval({ start: startDate, end: new Date() });
    
    const dailyMap = new Map<string, { views: number; sessions: Set<string> }>();
    dateInterval.forEach(date => {
      const key = format(date, 'yyyy-MM-dd');
      dailyMap.set(key, { views: 0, sessions: new Set() });
    });
    
    pageViews.forEach(v => {
      const key = format(new Date(v.created_at), 'yyyy-MM-dd');
      const entry = dailyMap.get(key);
      if (entry) {
        entry.views++;
        if (v.session_id) entry.sessions.add(v.session_id);
      }
    });
    
    const dailyViews = Array.from(dailyMap.entries()).map(([date, data]) => ({
      date: format(new Date(date), 'dd/MM', { locale: ptBR }),
      fullDate: date,
      views: data.views,
      sessions: data.sessions.size,
    }));

    // Weekly views for chart
    const weekInterval = eachWeekOfInterval(
      { start: startDate, end: new Date() },
      { weekStartsOn: 1 }
    );
    
    const weeklyMap = new Map<string, { views: number; sessions: Set<string>; days: number }>();
    weekInterval.forEach(weekStart => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const key = `Sem ${getWeek(weekStart)}`;
      weeklyMap.set(key, { views: 0, sessions: new Set(), days: 0 });
    });
    
    pageViews.forEach(v => {
      const date = new Date(v.created_at);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const key = `Sem ${getWeek(weekStart)}`;
      const entry = weeklyMap.get(key);
      if (entry) {
        entry.views++;
        if (v.session_id) entry.sessions.add(v.session_id);
      }
    });
    
    const weeklyViews = Array.from(weeklyMap.entries()).map(([week, data]) => ({
      week,
      views: data.views,
      sessions: data.sessions.size,
      avgDaily: Math.round(data.views / 7),
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
      weeklyViews,
      referrers,
      avgViewsPerDay,
      previousTotalViews,
      previousUniqueSessions,
      viewsTrend,
      sessionsTrend,
    };
  }, [pageViews, previousPeriodViews, dateRange]);

  // Comparison data (current vs previous period)
  const comparisonData = useMemo(() => {
    if (!pageViews || !previousPeriodViews) return [];
    
    const days = getDaysFromRange(dateRange);
    const data: { day: number; current: number; previous: number }[] = [];
    
    for (let i = 0; i < days; i++) {
      const currentDate = format(subDays(new Date(), days - i - 1), 'yyyy-MM-dd');
      const previousDate = format(subDays(new Date(), (days * 2) - i - 1), 'yyyy-MM-dd');
      
      const currentViews = pageViews.filter(v => 
        format(new Date(v.created_at), 'yyyy-MM-dd') === currentDate
      ).length;
      
      const previousViews = previousPeriodViews.filter(v => 
        format(new Date(v.created_at), 'yyyy-MM-dd') === previousDate
      ).length;
      
      data.push({
        day: i + 1,
        current: currentViews,
        previous: previousViews,
      });
    }
    
    return data;
  }, [pageViews, previousPeriodViews, dateRange]);

  // Export functions
  const exportToCSV = useCallback(() => {
    if (!pageViews || pageViews.length === 0) {
      toast.error('Não há dados para exportar');
      return;
    }

    const headers = ['Data', 'Página', 'Sessão', 'Referência'];
    const rows = pageViews.map(v => [
      format(new Date(v.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      v.path,
      v.session_id || 'N/A',
      v.referrer || 'Direto'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Relatório CSV exportado com sucesso!');
  }, [pageViews]);

  const exportToPDF = useCallback(() => {
    if (!pageViews || pageViews.length === 0) {
      toast.error('Não há dados para exportar');
      return;
    }

    const days = getDaysFromRange(dateRange);
    
    // Create printable HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Analytics - Vixio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1a1a1a; }
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
    .header h1 { font-size: 28px; color: #111827; margin-bottom: 8px; }
    .header p { color: #6b7280; font-size: 14px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
    .stat-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; }
    .stat-value { font-size: 32px; font-weight: 700; color: #111827; }
    .stat-label { font-size: 12px; color: #6b7280; margin-top: 4px; }
    .stat-trend { font-size: 12px; margin-top: 8px; }
    .stat-trend.positive { color: #059669; }
    .stat-trend.negative { color: #dc2626; }
    .section { margin-bottom: 32px; }
    .section h2 { font-size: 18px; color: #111827; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; font-size: 12px; text-transform: uppercase; color: #6b7280; }
    td { font-size: 14px; }
    .rank { display: inline-block; width: 24px; height: 24px; border-radius: 50%; background: #f3f4f6; text-align: center; line-height: 24px; font-weight: 600; font-size: 12px; }
    .rank.gold { background: #fef3c7; color: #d97706; }
    .rank.silver { background: #f3f4f6; color: #6b7280; }
    .rank.bronze { background: #fed7aa; color: #ea580c; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px; }
    @media print { body { padding: 20px; } .stats-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 Relatório de Analytics</h1>
    <p>Período: ${format(subDays(new Date(), days), 'dd/MM/yyyy')} - ${format(new Date(), 'dd/MM/yyyy')} (${days} dias)</p>
  </div>
  
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">${stats.totalViews.toLocaleString()}</div>
      <div class="stat-label">Total de Visualizações</div>
      ${stats.viewsTrend !== 0 ? `<div class="stat-trend ${stats.viewsTrend > 0 ? 'positive' : 'negative'}">${stats.viewsTrend > 0 ? '↑' : '↓'} ${Math.abs(stats.viewsTrend)}% vs período anterior</div>` : ''}
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.uniqueSessions.toLocaleString()}</div>
      <div class="stat-label">Sessões Únicas</div>
      ${stats.sessionsTrend !== 0 ? `<div class="stat-trend ${stats.sessionsTrend > 0 ? 'positive' : 'negative'}">${stats.sessionsTrend > 0 ? '↑' : '↓'} ${Math.abs(stats.sessionsTrend)}% vs período anterior</div>` : ''}
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.avgViewsPerDay}</div>
      <div class="stat-label">Média por Dia</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.topPages.length}</div>
      <div class="stat-label">Páginas Rastreadas</div>
    </div>
  </div>
  
  <div class="section">
    <h2>🏆 Páginas Mais Visitadas</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 60px">#</th>
          <th>Página</th>
          <th style="width: 120px">Visualizações</th>
          <th style="width: 80px">%</th>
        </tr>
      </thead>
      <tbody>
        ${stats.topPages.map((page, i) => `
        <tr>
          <td><span class="rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</span></td>
          <td>${page.path === '/' ? 'Página Inicial' : page.path}</td>
          <td>${page.views.toLocaleString()}</td>
          <td>${page.percentage}%</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  
  <div class="section">
    <h2>🌐 Fontes de Tráfego</h2>
    <table>
      <thead>
        <tr>
          <th>Fonte</th>
          <th style="width: 120px">Visitas</th>
          <th style="width: 80px">%</th>
        </tr>
      </thead>
      <tbody>
        ${stats.referrers.map(ref => `
        <tr>
          <td>${ref.source}</td>
          <td>${ref.count.toLocaleString()}</td>
          <td>${Math.round((ref.count / stats.totalViews) * 100)}%</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  
  <div class="footer">
    <p>Relatório gerado em ${format(new Date(), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</p>
    <p>Vixio Analytics - Dados coletados anonimamente</p>
  </div>
</body>
</html>`;

    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
      toast.success('Relatório PDF preparado para impressão!');
    } else {
      toast.error('Não foi possível abrir a janela de impressão');
    }
  }, [pageViews, stats, dateRange]);

  const TrendIndicator = ({ value }: { value: number }) => {
    if (value === 0) return null;
    return (
      <span className={`inline-flex items-center text-xs font-medium ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {value > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
        {Math.abs(value)}%
      </span>
    );
  };

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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Exportar CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  Exportar PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
          {/* Stats Cards with Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <AdminStatsCard
              title="Total de Visualizações"
              value={stats.totalViews.toLocaleString()}
              description={`Nos últimos ${getDaysFromRange(dateRange)} dias`}
              icon={Eye}
              variant="primary"
              trend={stats.viewsTrend !== 0 ? { value: stats.viewsTrend, isPositive: stats.viewsTrend > 0 } : undefined}
            />
            <AdminStatsCard
              title="Sessões Únicas"
              value={stats.uniqueSessions.toLocaleString()}
              description="Visitantes distintos"
              icon={Users}
              variant="success"
              trend={stats.sessionsTrend !== 0 ? { value: stats.sessionsTrend, isPositive: stats.sessionsTrend > 0 } : undefined}
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
            {/* Views Chart with Tabs */}
            <div className="lg:col-span-2">
              <AdminCard title="Tendências de Tráfego" description="Evolução de acessos ao longo do tempo">
                <Tabs value={chartView} onValueChange={(v) => setChartView(v as ChartView)} className="mt-4">
                  <TabsList className="mb-4">
                    <TabsTrigger value="daily">Diário</TabsTrigger>
                    <TabsTrigger value="weekly">Semanal</TabsTrigger>
                    <TabsTrigger value="comparison">Comparativo</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="daily" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={stats.dailyViews}>
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
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          name="Visualizações"
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorViews)" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="sessions" 
                          name="Sessões"
                          stroke="hsl(var(--chart-2))" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="weekly" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.weeklyViews}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="week" 
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
                          formatter={(value: number, name: string) => {
                            const labels: Record<string, string> = {
                              views: 'Visualizações',
                              sessions: 'Sessões',
                              avgDaily: 'Média Diária'
                            };
                            return [value, labels[name] || name];
                          }}
                        />
                        <Legend 
                          formatter={(value) => {
                            const labels: Record<string, string> = {
                              views: 'Visualizações',
                              sessions: 'Sessões'
                            };
                            return labels[value] || value;
                          }}
                        />
                        <Bar dataKey="views" name="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="sessions" name="sessions" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  
                  <TabsContent value="comparison" className="h-[300px]">
                    <div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span>Período atual</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                        <span>Período anterior</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height="90%">
                      <AreaChart data={comparisonData}>
                        <defs>
                          <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="day" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={12}
                          tickLine={false}
                          tickFormatter={(v) => `Dia ${v}`}
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
                          formatter={(value: number, name: string) => [
                            value, 
                            name === 'current' ? 'Período atual' : 'Período anterior'
                          ]}
                          labelFormatter={(label) => `Dia ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="previous" 
                          stroke="hsl(var(--muted-foreground))" 
                          fillOpacity={1} 
                          fill="url(#colorPrevious)" 
                          strokeWidth={1}
                          strokeDasharray="4 4"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="current" 
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorCurrent)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
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
                    stats.referrers.map((ref) => (
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

          {/* Alerts Section */}
          <AdminCard className="mt-6" title="Monitoramento de Anomalias">
            <div className="mt-4">
              <AnalyticsAlerts />
            </div>
          </AdminCard>

          {/* Info */}
          <AdminCard className="mt-6" title="Sobre os dados">
            <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-sm text-muted-foreground">
                Os dados de analytics são coletados de forma anônima quando visitantes acessam páginas do site. 
                Nenhuma informação pessoal identificável é armazenada. O hash de IP é usado apenas para 
                distinguir sessões únicas. Os relatórios podem ser exportados em CSV ou PDF.
              </p>
            </div>
          </AdminCard>
        </>
      )}
    </AdminLayout>
  );
}
