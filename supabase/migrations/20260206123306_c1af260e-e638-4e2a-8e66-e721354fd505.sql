
-- Fix SECURITY DEFINER views - recreate as SECURITY INVOKER (default)
DROP VIEW IF EXISTS public.consulting_metrics;
CREATE VIEW public.consulting_metrics AS
SELECT 
  (SELECT count(*) FROM projects WHERE status = 'em_andamento') AS projetos_ativos,
  (SELECT count(*) FROM projects WHERE status = 'concluido') AS projetos_concluidos,
  (SELECT COALESCE(sum(valor_contrato), 0) FROM projects WHERE status IN ('em_andamento', 'concluido')) AS receita_total,
  (SELECT COALESCE(sum(valor_contrato), 0) FROM projects WHERE status = 'em_andamento') AS receita_em_andamento,
  (SELECT count(*) FROM proposals WHERE status = 'enviada') AS propostas_pendentes,
  (SELECT count(*) FROM proposals WHERE status = 'aprovada') AS propostas_aprovadas,
  (SELECT CASE WHEN count(*) > 0 THEN round((count(*) FILTER (WHERE status = 'aprovada')::numeric / count(*)::numeric) * 100, 1) ELSE 0 END FROM proposals WHERE status IN ('aprovada', 'rejeitada')) AS taxa_conversao_propostas;

DROP VIEW IF EXISTS public.document_stats;
CREATE VIEW public.document_stats AS
SELECT 
  count(*) AS total_documents,
  count(*) FILTER (WHERE status = 'rascunho') AS rascunhos,
  count(*) FILTER (WHERE status = 'finalizado') AS finalizados,
  count(*) FILTER (WHERE status = 'enviado') AS enviados,
  count(*) FILTER (WHERE status = 'assinado') AS assinados,
  count(*) FILTER (WHERE created_at >= now() - interval '7 days') AS ultimos_7_dias,
  count(*) FILTER (WHERE created_at >= now() - interval '30 days') AS ultimos_30_dias
FROM generated_documents;

-- Fix overly permissive INSERT policies
-- page_views: public tracking is OK but add rate limiting field check
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (
  path IS NOT NULL AND length(path) <= 500
);

-- analytics_alerts: restrict to authenticated users with admin role
DROP POLICY IF EXISTS "System can insert alerts" ON public.analytics_alerts;
CREATE POLICY "Admins can insert alerts" ON public.analytics_alerts FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'admin')
);

-- audit_logs: restrict to authenticated users (system inserts via security definer functions)
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "Authenticated users can insert audit logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (
  auth.uid() IS NOT NULL
);
