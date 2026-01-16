-- Create table for alert configurations
CREATE TABLE public.analytics_alert_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('traffic_drop', 'traffic_spike', 'page_anomaly', 'referrer_anomaly')),
  threshold_percentage INTEGER NOT NULL DEFAULT 30,
  comparison_period TEXT NOT NULL DEFAULT '7d' CHECK (comparison_period IN ('1d', '7d', '14d', '30d')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  notify_email BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create table for triggered alerts
CREATE TABLE public.analytics_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_id UUID REFERENCES public.analytics_alert_configs(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  metric_value NUMERIC,
  expected_value NUMERIC,
  deviation_percentage NUMERIC,
  affected_path TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_dismissed BOOLEAN NOT NULL DEFAULT false,
  triggered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE,
  dismissed_at TIMESTAMP WITH TIME ZONE,
  dismissed_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.analytics_alert_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for alert configs (admins only)
CREATE POLICY "Admins can manage alert configs"
ON public.analytics_alert_configs
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for alerts (admins only)
CREATE POLICY "Admins can view alerts"
ON public.analytics_alerts
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update alerts"
ON public.analytics_alerts
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert alerts"
ON public.analytics_alerts
FOR INSERT
WITH CHECK (true);

-- Create function to detect anomalies and generate alerts
CREATE OR REPLACE FUNCTION public.check_analytics_anomalies()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  config RECORD;
  current_views BIGINT;
  previous_views BIGINT;
  deviation_pct NUMERIC;
  alert_severity TEXT;
  comparison_days INTEGER;
BEGIN
  -- Loop through active alert configurations
  FOR config IN 
    SELECT * FROM analytics_alert_configs WHERE is_active = true
  LOOP
    -- Determine comparison period in days
    comparison_days := CASE config.comparison_period
      WHEN '1d' THEN 1
      WHEN '7d' THEN 7
      WHEN '14d' THEN 14
      WHEN '30d' THEN 30
      ELSE 7
    END;
    
    -- Get current period views
    SELECT COUNT(*) INTO current_views
    FROM page_views
    WHERE created_at >= now() - (comparison_days || ' days')::interval
      AND created_at < now();
    
    -- Get previous period views
    SELECT COUNT(*) INTO previous_views
    FROM page_views
    WHERE created_at >= now() - (comparison_days * 2 || ' days')::interval
      AND created_at < now() - (comparison_days || ' days')::interval;
    
    -- Skip if no previous data
    IF previous_views = 0 THEN
      CONTINUE;
    END IF;
    
    -- Calculate deviation percentage
    deviation_pct := ((current_views::NUMERIC - previous_views::NUMERIC) / previous_views::NUMERIC) * 100;
    
    -- Check for traffic drop
    IF config.alert_type = 'traffic_drop' AND deviation_pct < -(config.threshold_percentage) THEN
      -- Determine severity based on deviation
      alert_severity := CASE
        WHEN deviation_pct < -70 THEN 'critical'
        WHEN deviation_pct < -50 THEN 'warning'
        ELSE 'info'
      END;
      
      -- Check if similar alert was already triggered in last 24 hours
      IF NOT EXISTS (
        SELECT 1 FROM analytics_alerts
        WHERE config_id = config.id
          AND triggered_at > now() - interval '24 hours'
          AND is_dismissed = false
      ) THEN
        -- Insert new alert
        INSERT INTO analytics_alerts (
          config_id, alert_type, severity, title, message,
          metric_value, expected_value, deviation_percentage
        ) VALUES (
          config.id,
          config.alert_type,
          alert_severity,
          'Queda de Tráfego Detectada',
          format('O tráfego caiu %s%% nos últimos %s dias comparado ao período anterior.', 
            ROUND(ABS(deviation_pct)), comparison_days),
          current_views,
          previous_views,
          deviation_pct
        );
      END IF;
    END IF;
    
    -- Check for traffic spike
    IF config.alert_type = 'traffic_spike' AND deviation_pct > config.threshold_percentage THEN
      alert_severity := CASE
        WHEN deviation_pct > 200 THEN 'warning'
        WHEN deviation_pct > 100 THEN 'info'
        ELSE 'info'
      END;
      
      IF NOT EXISTS (
        SELECT 1 FROM analytics_alerts
        WHERE config_id = config.id
          AND triggered_at > now() - interval '24 hours'
          AND is_dismissed = false
      ) THEN
        INSERT INTO analytics_alerts (
          config_id, alert_type, severity, title, message,
          metric_value, expected_value, deviation_percentage
        ) VALUES (
          config.id,
          config.alert_type,
          alert_severity,
          'Pico de Tráfego Detectado',
          format('O tráfego aumentou %s%% nos últimos %s dias comparado ao período anterior.', 
            ROUND(deviation_pct), comparison_days),
          current_views,
          previous_views,
          deviation_pct
        );
      END IF;
    END IF;
  END LOOP;
END;
$$;

-- Create trigger for updated_at
CREATE TRIGGER update_analytics_alert_configs_updated_at
BEFORE UPDATE ON public.analytics_alert_configs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default alert configurations
INSERT INTO public.analytics_alert_configs (name, description, alert_type, threshold_percentage, comparison_period)
VALUES 
  ('Alerta de Queda de Tráfego', 'Detecta quedas significativas no tráfego do site', 'traffic_drop', 30, '7d'),
  ('Alerta de Pico de Tráfego', 'Detecta aumentos significativos no tráfego do site', 'traffic_spike', 50, '7d');