-- Fix security issues

-- 1. Fix function search_path for generate_proposal_number
CREATE OR REPLACE FUNCTION public.generate_proposal_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.numero := 'PROP-' || TO_CHAR(NOW(), 'YYYYMM') || '-' || LPAD((
    SELECT COALESCE(MAX(CAST(SPLIT_PART(numero, '-', 3) AS INTEGER)), 0) + 1
    FROM public.proposals
    WHERE numero LIKE 'PROP-' || TO_CHAR(NOW(), 'YYYYMM') || '-%'
  )::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 2. Fix function search_path for track_project_phase_change
CREATE OR REPLACE FUNCTION public.track_project_phase_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.fase_atual IS DISTINCT FROM NEW.fase_atual THEN
    INSERT INTO public.project_phase_history (project_id, fase_anterior, fase_nova, usuario_id)
    VALUES (NEW.id, OLD.fase_atual, NEW.fase_atual, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 3. Drop overly permissive policies and recreate with proper restrictions
DROP POLICY IF EXISTS "Team members can manage deliverables" ON public.project_deliverables;
DROP POLICY IF EXISTS "Team members can manage proposal items" ON public.proposal_items;
DROP POLICY IF EXISTS "Admins can manage technologies" ON public.technologies;

-- Recreate with specific operations
CREATE POLICY "Team members can view deliverables" 
ON public.project_deliverables FOR SELECT 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert deliverables" 
ON public.project_deliverables FOR INSERT 
WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update deliverables" 
ON public.project_deliverables FOR UPDATE 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete deliverables" 
ON public.project_deliverables FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Proposal items
CREATE POLICY "Team members can view proposal items" 
ON public.proposal_items FOR SELECT 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert proposal items" 
ON public.proposal_items FOR INSERT 
WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update proposal items" 
ON public.proposal_items FOR UPDATE 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete proposal items" 
ON public.proposal_items FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Technologies - admins only for write operations
CREATE POLICY "Admins can insert technologies" 
ON public.technologies FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update technologies" 
ON public.technologies FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete technologies" 
ON public.technologies FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Add RLS policy for consulting_metrics view
-- The view itself doesn't have RLS but queries underlying tables that do