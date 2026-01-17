-- Create table for proposal templates (reusable scope, deliverables, schedule)
CREATE TABLE public.proposal_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo_servico service_type NOT NULL,
  escopo_items JSONB DEFAULT '[]'::jsonb,
  entregaveis_items JSONB DEFAULT '[]'::jsonb,
  cronograma_items JSONB DEFAULT '[]'::jsonb,
  termos_padrao TEXT,
  prazo_padrao_dias INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  criado_por UUID
);

-- Enable RLS
ALTER TABLE public.proposal_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Team members can view proposal templates"
  ON public.proposal_templates FOR SELECT
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert proposal templates"
  ON public.proposal_templates FOR INSERT
  WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update proposal templates"
  ON public.proposal_templates FOR UPDATE
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete proposal templates"
  ON public.proposal_templates FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Insert sample templates
INSERT INTO public.proposal_templates (nome, descricao, tipo_servico, escopo_items, entregaveis_items, cronograma_items, termos_padrao, prazo_padrao_dias) VALUES
(
  'Projeto de Data Science - Padrão',
  'Template completo para projetos de Data Science com análise exploratória, modelagem e deploy',
  'data_science',
  '[
    {"titulo": "Análise Exploratória de Dados", "descricao": "Exploração completa dos dados disponíveis, identificação de padrões, anomalias e insights iniciais."},
    {"titulo": "Feature Engineering", "descricao": "Criação e seleção de variáveis relevantes para os modelos preditivos."},
    {"titulo": "Desenvolvimento de Modelos", "descricao": "Construção, treinamento e otimização de modelos de machine learning."},
    {"titulo": "Validação e Testes", "descricao": "Validação cruzada, testes de performance e análise de métricas."},
    {"titulo": "Deploy e Integração", "descricao": "Disponibilização do modelo em ambiente de produção com APIs documentadas."}
  ]'::jsonb,
  '[
    {"titulo": "Relatório de Análise Exploratória", "descricao": "Documento técnico com insights e visualizações dos dados."},
    {"titulo": "Código Fonte Documentado", "descricao": "Notebooks e scripts Python com documentação completa."},
    {"titulo": "Modelo Treinado", "descricao": "Modelo serializado pronto para produção."},
    {"titulo": "API de Predição", "descricao": "Endpoint REST para consumo do modelo."},
    {"titulo": "Dashboard de Monitoramento", "descricao": "Painel para acompanhamento de métricas do modelo."}
  ]'::jsonb,
  '[
    {"fase": "Discovery", "duracao": "1 semana", "descricao": "Entendimento do negócio e levantamento de requisitos"},
    {"fase": "Exploração", "duracao": "2 semanas", "descricao": "Análise exploratória e preparação dos dados"},
    {"fase": "Desenvolvimento", "duracao": "3 semanas", "descricao": "Construção e otimização dos modelos"},
    {"fase": "Produção", "duracao": "1 semana", "descricao": "Deploy e integração"},
    {"fase": "Operação", "duracao": "1 semana", "descricao": "Monitoramento e ajustes finais"}
  ]'::jsonb,
  'Forma de Pagamento: 50% na aprovação, 50% na entrega final.
Garantia: 30 dias para ajustes após entrega.
Confidencialidade: NDA incluso.',
  60
),
(
  'Analytics Dashboard',
  'Template para projetos de criação de dashboards e relatórios analíticos',
  'analytics',
  '[
    {"titulo": "Levantamento de KPIs", "descricao": "Identificação e definição dos indicadores-chave de performance."},
    {"titulo": "Modelagem de Dados", "descricao": "Estruturação do data warehouse e criação de camadas analíticas."},
    {"titulo": "Desenvolvimento de Dashboards", "descricao": "Criação de visualizações interativas e relatórios."},
    {"titulo": "Treinamento", "descricao": "Capacitação da equipe no uso das ferramentas."}
  ]'::jsonb,
  '[
    {"titulo": "Documento de KPIs", "descricao": "Lista documentada de indicadores e suas fórmulas."},
    {"titulo": "Data Warehouse", "descricao": "Estrutura de dados otimizada para análises."},
    {"titulo": "Dashboards Interativos", "descricao": "Painéis visuais com filtros e drill-down."},
    {"titulo": "Manual do Usuário", "descricao": "Documentação de uso das ferramentas."}
  ]'::jsonb,
  '[
    {"fase": "Discovery", "duracao": "3 dias", "descricao": "Workshops de levantamento"},
    {"fase": "Modelagem", "duracao": "1 semana", "descricao": "Estruturação do data warehouse"},
    {"fase": "Desenvolvimento", "duracao": "2 semanas", "descricao": "Criação dos dashboards"},
    {"fase": "Validação", "duracao": "3 dias", "descricao": "Testes e ajustes"}
  ]'::jsonb,
  'Inclui licenciamento da ferramenta de BI por 12 meses.',
  30
),
(
  'People Analytics',
  'Template para projetos de análise de pessoas e RH',
  'people_analytics',
  '[
    {"titulo": "Diagnóstico de RH", "descricao": "Análise da maturidade analítica e identificação de oportunidades."},
    {"titulo": "Integração de Dados", "descricao": "Consolidação de dados de diferentes sistemas de RH."},
    {"titulo": "Análises Preditivas", "descricao": "Modelos de turnover, performance e engajamento."},
    {"titulo": "Recomendações Estratégicas", "descricao": "Insights acionáveis para tomada de decisão."}
  ]'::jsonb,
  '[
    {"titulo": "Relatório de Diagnóstico", "descricao": "Análise da situação atual e roadmap de melhorias."},
    {"titulo": "Base de Dados Unificada", "descricao": "People Data Warehouse integrado."},
    {"titulo": "Modelos Preditivos", "descricao": "Algoritmos de predição de turnover e performance."},
    {"titulo": "Dashboard de RH", "descricao": "Painel de indicadores de pessoas."}
  ]'::jsonb,
  '[
    {"fase": "Diagnóstico", "duracao": "1 semana", "descricao": "Entrevistas e análise de processos"},
    {"fase": "Integração", "duracao": "2 semanas", "descricao": "ETL e consolidação de dados"},
    {"fase": "Modelagem", "duracao": "2 semanas", "descricao": "Desenvolvimento de modelos"},
    {"fase": "Entrega", "duracao": "1 semana", "descricao": "Deploy e treinamento"}
  ]'::jsonb,
  'Inclui anonimização de dados sensíveis conforme LGPD.',
  45
);