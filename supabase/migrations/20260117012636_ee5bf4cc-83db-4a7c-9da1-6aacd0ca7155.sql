-- =============================================
-- MÓDULO 1: GESTÃO DE PROJETOS DE CONSULTORIA
-- =============================================

-- Tipos de serviço oferecidos pela Vixio
CREATE TYPE public.service_type AS ENUM (
  'data_science',
  'analytics',
  'people_analytics',
  'behavioral_analytics',
  'customer_intelligence',
  'bioestatistica',
  'sistemas',
  'plataformas',
  'educacao',
  'outro'
);

-- Fases do projeto baseadas na metodologia Vixio
CREATE TYPE public.project_phase AS ENUM (
  'discovery',
  'exploration',
  'development',
  'production',
  'operations',
  'concluido'
);

-- Status do projeto
CREATE TYPE public.project_status AS ENUM (
  'proposta',
  'aprovado',
  'em_andamento',
  'pausado',
  'concluido',
  'cancelado'
);

-- Tabela principal de projetos
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  tipo_servico service_type NOT NULL DEFAULT 'outro',
  fase_atual project_phase NOT NULL DEFAULT 'discovery',
  status project_status NOT NULL DEFAULT 'proposta',
  data_inicio DATE,
  data_estimada_fim DATE,
  data_real_fim DATE,
  valor_contrato NUMERIC(12,2),
  valor_recebido NUMERIC(12,2) DEFAULT 0,
  percentual_conclusao INTEGER DEFAULT 0 CHECK (percentual_conclusao >= 0 AND percentual_conclusao <= 100),
  responsavel_id UUID,
  tecnologias TEXT[],
  observacoes TEXT,
  criado_por UUID,
  atualizado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Entregáveis do projeto
CREATE TABLE public.project_deliverables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  fase project_phase NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  data_prevista DATE,
  data_entrega DATE,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_progresso', 'entregue', 'aprovado')),
  arquivo_url TEXT,
  observacoes TEXT,
  ordem INTEGER DEFAULT 0,
  criado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Histórico de fases do projeto
CREATE TABLE public.project_phase_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  fase_anterior project_phase,
  fase_nova project_phase NOT NULL,
  data_transicao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  observacoes TEXT,
  usuario_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- MÓDULO 2: PROPOSTAS COMERCIAIS
-- =============================================

CREATE TYPE public.proposal_status AS ENUM (
  'rascunho',
  'enviada',
  'em_analise',
  'aprovada',
  'rejeitada',
  'revisao',
  'expirada'
);

CREATE TABLE public.proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero TEXT UNIQUE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  tipo_servico service_type NOT NULL,
  status proposal_status NOT NULL DEFAULT 'rascunho',
  valor_total NUMERIC(12,2),
  desconto_percentual NUMERIC(5,2) DEFAULT 0,
  valor_final NUMERIC(12,2),
  prazo_execucao_dias INTEGER,
  validade_proposta DATE,
  data_envio TIMESTAMP WITH TIME ZONE,
  data_resposta TIMESTAMP WITH TIME ZONE,
  motivo_rejeicao TEXT,
  conteudo_html TEXT,
  arquivo_url TEXT,
  termos_condicoes TEXT,
  escopo_detalhado JSONB DEFAULT '[]',
  entregaveis JSONB DEFAULT '[]',
  cronograma JSONB DEFAULT '[]',
  criado_por UUID,
  atualizado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Itens da proposta (serviços incluídos)
CREATE TABLE public.proposal_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  quantidade INTEGER DEFAULT 1,
  valor_unitario NUMERIC(12,2),
  valor_total NUMERIC(12,2),
  observacoes TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- MÓDULO 3: CASES DE SUCESSO
-- =============================================

CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  cliente TEXT,
  industria TEXT,
  tipo_servico service_type NOT NULL,
  desafio TEXT,
  solucao TEXT,
  resultados TEXT,
  metricas JSONB DEFAULT '[]',
  tecnologias TEXT[],
  duracao_meses INTEGER,
  ano INTEGER,
  depoimento TEXT,
  autor_depoimento TEXT,
  cargo_autor TEXT,
  imagem_url TEXT,
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  criado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- MÓDULO 4: TECNOLOGIAS E COMPETÊNCIAS
-- =============================================

CREATE TABLE public.technologies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  categoria TEXT, -- 'linguagem', 'framework', 'banco_dados', 'cloud', 'bi', 'ml', 'outros'
  descricao TEXT,
  icone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- MÓDULO 5: MÉTRICAS DE CONSULTORIA
-- =============================================

-- View para métricas do dashboard
CREATE OR REPLACE VIEW public.consulting_metrics AS
SELECT
  (SELECT COUNT(*) FROM projects WHERE status = 'em_andamento') as projetos_ativos,
  (SELECT COUNT(*) FROM projects WHERE status = 'concluido') as projetos_concluidos,
  (SELECT COALESCE(SUM(valor_contrato), 0) FROM projects WHERE status IN ('em_andamento', 'concluido')) as receita_total,
  (SELECT COALESCE(SUM(valor_contrato), 0) FROM projects WHERE status = 'em_andamento') as receita_em_andamento,
  (SELECT COUNT(*) FROM proposals WHERE status = 'enviada') as propostas_pendentes,
  (SELECT COUNT(*) FROM proposals WHERE status = 'aprovada') as propostas_aprovadas,
  (SELECT 
    CASE WHEN COUNT(*) > 0 
    THEN ROUND((COUNT(*) FILTER (WHERE status = 'aprovada')::NUMERIC / COUNT(*)::NUMERIC) * 100, 1)
    ELSE 0 END
   FROM proposals WHERE status IN ('aprovada', 'rejeitada')) as taxa_conversao_propostas;

-- =============================================
-- RLS POLICIES
-- =============================================

-- Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view projects" 
ON public.projects FOR SELECT 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert projects" 
ON public.projects FOR INSERT 
WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update projects" 
ON public.projects FOR UPDATE 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete projects" 
ON public.projects FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Project Deliverables
ALTER TABLE public.project_deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can manage deliverables" 
ON public.project_deliverables FOR ALL 
USING (is_admin_or_editor(auth.uid()));

-- Project Phase History
ALTER TABLE public.project_phase_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view phase history" 
ON public.project_phase_history FOR SELECT 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert phase history" 
ON public.project_phase_history FOR INSERT 
WITH CHECK (is_admin_or_editor(auth.uid()));

-- Proposals
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view proposals" 
ON public.proposals FOR SELECT 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert proposals" 
ON public.proposals FOR INSERT 
WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update proposals" 
ON public.proposals FOR UPDATE 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete proposals" 
ON public.proposals FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Proposal Items
ALTER TABLE public.proposal_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can manage proposal items" 
ON public.proposal_items FOR ALL 
USING (is_admin_or_editor(auth.uid()));

-- Case Studies
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view case studies" 
ON public.case_studies FOR SELECT 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Anyone can view public case studies" 
ON public.case_studies FOR SELECT 
USING (is_public = true);

CREATE POLICY "Team members can insert case studies" 
ON public.case_studies FOR INSERT 
WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update case studies" 
ON public.case_studies FOR UPDATE 
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete case studies" 
ON public.case_studies FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Technologies
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view technologies" 
ON public.technologies FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage technologies" 
ON public.technologies FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-generate proposal number
CREATE OR REPLACE FUNCTION public.generate_proposal_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.numero := 'PROP-' || TO_CHAR(NOW(), 'YYYYMM') || '-' || LPAD((
    SELECT COALESCE(MAX(CAST(SPLIT_PART(numero, '-', 3) AS INTEGER)), 0) + 1
    FROM proposals
    WHERE numero LIKE 'PROP-' || TO_CHAR(NOW(), 'YYYYMM') || '-%'
  )::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_proposal_number
  BEFORE INSERT ON public.proposals
  FOR EACH ROW
  WHEN (NEW.numero IS NULL)
  EXECUTE FUNCTION public.generate_proposal_number();

-- Track project phase changes
CREATE OR REPLACE FUNCTION public.track_project_phase_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.fase_atual IS DISTINCT FROM NEW.fase_atual THEN
    INSERT INTO project_phase_history (project_id, fase_anterior, fase_nova, usuario_id)
    VALUES (NEW.id, OLD.fase_atual, NEW.fase_atual, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER track_phase_changes
  AFTER UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.track_project_phase_change();

-- Update timestamps
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_deliverables_updated_at
  BEFORE UPDATE ON public.project_deliverables
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON public.proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- SEED DATA: TECNOLOGIAS
-- =============================================

INSERT INTO public.technologies (nome, categoria, descricao) VALUES
('Python', 'linguagem', 'Linguagem principal para Data Science e ML'),
('R', 'linguagem', 'Linguagem para análise estatística'),
('SQL', 'linguagem', 'Consultas e manipulação de dados'),
('Power BI', 'bi', 'Visualização e dashboards'),
('Tableau', 'bi', 'Visualização de dados'),
('TensorFlow', 'ml', 'Framework de Machine Learning'),
('PyTorch', 'ml', 'Framework de Deep Learning'),
('Scikit-learn', 'ml', 'Biblioteca de ML'),
('PostgreSQL', 'banco_dados', 'Banco de dados relacional'),
('MongoDB', 'banco_dados', 'Banco de dados NoSQL'),
('AWS', 'cloud', 'Amazon Web Services'),
('Azure', 'cloud', 'Microsoft Azure'),
('GCP', 'cloud', 'Google Cloud Platform'),
('Docker', 'devops', 'Containerização'),
('Kubernetes', 'devops', 'Orquestração de containers'),
('Apache Spark', 'big_data', 'Processamento de big data'),
('Airflow', 'data_engineering', 'Orquestração de pipelines'),
('dbt', 'data_engineering', 'Transformação de dados'),
('React', 'frontend', 'Framework frontend'),
('Node.js', 'backend', 'Runtime JavaScript');