
-- Force views to use SECURITY INVOKER (PostgreSQL 15+)
ALTER VIEW public.consulting_metrics SET (security_invoker = on);
ALTER VIEW public.document_stats SET (security_invoker = on);
