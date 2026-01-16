import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Send, CheckCircle, Clock, TrendingUp, BarChart3, PieChart, Calendar } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, LineChart, Line, Legend } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

const DocumentDashboard = () => {
  const [period, setPeriod] = useState("30");

  // Fetch document statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["document-stats", period],
    queryFn: async () => {
      const startDate = subDays(new Date(), parseInt(period));
      
      const { data, error } = await supabase
        .from("generated_documents")
        .select("id, status, created_at, template_id, document_templates(nome, category_id, document_categories(nome))")
        .gte("created_at", startDate.toISOString());
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch all-time statistics
  const { data: allTimeStats, isLoading: allTimeLoading } = useQuery({
    queryKey: ["document-all-time-stats"],
    queryFn: async () => {
      const { count: total } = await supabase
        .from("generated_documents")
        .select("*", { count: "exact", head: true });

      const { count: assinados } = await supabase
        .from("generated_documents")
        .select("*", { count: "exact", head: true })
        .eq("status", "assinado");

      const { count: templates } = await supabase
        .from("document_templates")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      return {
        total: total || 0,
        assinados: assinados || 0,
        templates: templates || 0,
      };
    },
  });

  // Fetch recent documents
  const { data: recentDocs } = useQuery({
    queryKey: ["recent-documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_documents")
        .select("id, titulo, status, created_at, leads(nome)")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  // Calculate metrics from stats
  const metrics = stats ? {
    total: stats.length,
    rascunhos: stats.filter(d => d.status === "rascunho").length,
    finalizados: stats.filter(d => d.status === "finalizado").length,
    enviados: stats.filter(d => d.status === "enviado").length,
    assinados: stats.filter(d => d.status === "assinado").length,
  } : { total: 0, rascunhos: 0, finalizados: 0, enviados: 0, assinados: 0 };

  // Calculate documents by category
  const categoryData = stats ? Object.entries(
    stats.reduce((acc, doc) => {
      const category = (doc.document_templates as any)?.document_categories?.nome || "Sem categoria";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value })) : [];

  // Calculate documents by template
  const templateData = stats ? Object.entries(
    stats.reduce((acc, doc) => {
      const template = (doc.document_templates as any)?.nome || "Sem template";
      acc[template] = (acc[template] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value })).slice(0, 5) : [];

  // Calculate documents over time
  const timeSeriesData = stats ? (() => {
    const days = parseInt(period);
    const interval = eachDayOfInterval({
      start: subDays(new Date(), days),
      end: new Date(),
    });

    return interval.map(date => {
      const dateStr = format(date, "yyyy-MM-dd");
      const count = stats.filter(d => 
        format(new Date(d.created_at), "yyyy-MM-dd") === dateStr
      ).length;
      
      return {
        date: format(date, days > 14 ? "dd/MM" : "EEE", { locale: ptBR }),
        documentos: count,
      };
    });
  })() : [];

  // Status data for pie chart
  const statusData = [
    { name: "Rascunho", value: metrics.rascunhos, color: "#94a3b8" },
    { name: "Finalizado", value: metrics.finalizados, color: "#3b82f6" },
    { name: "Enviado", value: metrics.enviados, color: "#22c55e" },
    { name: "Assinado", value: metrics.assinados, color: "#8b5cf6" },
  ].filter(s => s.value > 0);

  const isLoading = statsLoading || allTimeLoading;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard de Documentos"
        description="Métricas e análises de documentos gerados"
        icon={BarChart3}
        actions={
          <div className="flex items-center gap-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="14">Últimos 14 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link to="/admin/documentos/novo">Novo Documento</Link>
            </Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTimeStats?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.total} no período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Documentos Assinados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTimeStats?.assinados || 0}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.assinados} no período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Modelos Ativos</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTimeStats?.templates || 0}</div>
            <p className="text-xs text-muted-foreground">
              Templates disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Assinatura</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.total > 0 ? Math.round((metrics.assinados / metrics.total) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Docs assinados no período
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Documents Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentos por Período</CardTitle>
            <CardDescription>Evolução de documentos criados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="documentos" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Status</CardTitle>
            <CardDescription>Status dos documentos no período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Nenhum documento no período
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* By Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Documentos por Categoria</CardTitle>
            <CardDescription>Distribuição por tipo de documento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} className="text-xs" />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Nenhum documento no período
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* By Template */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top 5 Templates</CardTitle>
            <CardDescription>Templates mais utilizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {templateData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={templateData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={80} />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))">
                      {templateData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Nenhum documento no período
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Documentos Recentes</CardTitle>
          <CardDescription>Últimos documentos criados</CardDescription>
        </CardHeader>
        <CardContent>
          {recentDocs && recentDocs.length > 0 ? (
            <div className="space-y-4">
              {recentDocs.map((doc) => (
                <Link
                  key={doc.id}
                  to={`/admin/documentos/${doc.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.titulo}</p>
                      <p className="text-sm text-muted-foreground">
                        {(doc.leads as any)?.nome || "Sem lead associado"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={
                      doc.status === "assinado" ? "default" :
                      doc.status === "enviado" ? "secondary" :
                      "outline"
                    }>
                      {doc.status || "Rascunho"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(doc.created_at), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum documento criado ainda
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default DocumentDashboard;
