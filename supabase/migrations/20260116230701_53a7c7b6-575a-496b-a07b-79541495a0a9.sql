-- Fix security definer view by dropping and recreating with SECURITY INVOKER
DROP VIEW IF EXISTS public.document_stats;

CREATE VIEW public.document_stats 
WITH (security_invoker = true) AS
SELECT 
  COUNT(*) as total_documents,
  COUNT(*) FILTER (WHERE status = 'rascunho') as rascunhos,
  COUNT(*) FILTER (WHERE status = 'finalizado') as finalizados,
  COUNT(*) FILTER (WHERE status = 'enviado') as enviados,
  COUNT(*) FILTER (WHERE status = 'assinado') as assinados,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as ultimos_7_dias,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as ultimos_30_dias
FROM public.generated_documents;