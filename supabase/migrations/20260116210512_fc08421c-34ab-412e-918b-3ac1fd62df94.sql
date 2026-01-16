-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant usage to postgres role
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Schedule the anomaly check to run every hour
SELECT cron.schedule(
  'check-analytics-anomalies-hourly',
  '0 * * * *', -- Every hour at minute 0
  $$SELECT public.check_analytics_anomalies()$$
);