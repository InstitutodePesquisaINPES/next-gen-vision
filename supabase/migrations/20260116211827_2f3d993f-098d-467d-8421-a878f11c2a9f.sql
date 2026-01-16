-- =====================================================
-- CRM COMPLETO - SISTEMA DE LEADS, PIPELINE E TAREFAS
-- =====================================================

-- Enum para status do lead
CREATE TYPE public.lead_status AS ENUM (
  'novo',
  'qualificado', 
  'proposta_enviada',
  'negociacao',
  'fechado_ganho',
  'fechado_perdido',
  'arquivado'
);

-- Enum para prioridade
CREATE TYPE public.priority_level AS ENUM ('baixa', 'media', 'alta', 'urgente');

-- Enum para tipo de interação
CREATE TYPE public.interaction_type AS ENUM (
  'email',
  'telefone',
  'whatsapp',
  'reuniao',
  'proposta',
  'nota',
  'sistema'
);

-- Enum para tipo de tarefa
CREATE TYPE public.task_status AS ENUM ('pendente', 'em_progresso', 'concluida', 'cancelada');

-- =====================================================
-- TABELA DE LEADS/CONTATOS
-- =====================================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Informações básicas
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  whatsapp TEXT,
  empresa TEXT,
  cargo TEXT,
  
  -- Origem e status
  origem TEXT DEFAULT 'formulario', -- formulario, indicacao, linkedin, google, etc
  status lead_status NOT NULL DEFAULT 'novo',
  prioridade priority_level DEFAULT 'media',
  
  -- Qualificação
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  valor_estimado NUMERIC(12, 2),
  probabilidade INTEGER DEFAULT 50 CHECK (probabilidade >= 0 AND probabilidade <= 100),
  
  -- Datas importantes
  data_primeiro_contato TIMESTAMP WITH TIME ZONE,
  data_ultimo_contato TIMESTAMP WITH TIME ZONE,
  data_fechamento_previsto DATE,
  
  -- Responsável
  responsavel_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Observações
  observacoes TEXT,
  tags TEXT[],
  
  -- Metadados
  ip_origem TEXT,
  user_agent_origem TEXT,
  pagina_origem TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Auditoria
  criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  atualizado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TABELA DE ESTÁGIOS DO PIPELINE (customizável)
-- =====================================================
CREATE TABLE public.pipeline_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  cor TEXT DEFAULT '#6366f1',
  ordem INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_won_stage BOOLEAN DEFAULT false,
  is_lost_stage BOOLEAN DEFAULT false,
  probabilidade_padrao INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TABELA DE HISTÓRICO DE INTERAÇÕES
-- =====================================================
CREATE TABLE public.lead_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  
  tipo interaction_type NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  
  -- Para emails
  assunto_email TEXT,
  corpo_email TEXT,
  
  -- Para reuniões
  data_agendada TIMESTAMP WITH TIME ZONE,
  duracao_minutos INTEGER,
  local_reuniao TEXT,
  link_reuniao TEXT,
  
  -- Para propostas
  valor_proposta NUMERIC(12, 2),
  arquivo_url TEXT,
  
  -- Metadados
  criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TABELA DE TAREFAS/FOLLOW-UPS
-- =====================================================
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  
  titulo TEXT NOT NULL,
  descricao TEXT,
  
  tipo TEXT DEFAULT 'follow_up', -- follow_up, reuniao, ligacao, email, proposta, outro
  status task_status NOT NULL DEFAULT 'pendente',
  prioridade priority_level DEFAULT 'media',
  
  -- Datas
  data_vencimento TIMESTAMP WITH TIME ZONE,
  data_lembrete TIMESTAMP WITH TIME ZONE,
  data_conclusao TIMESTAMP WITH TIME ZONE,
  
  -- Responsável
  responsavel_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Recorrência
  is_recorrente BOOLEAN DEFAULT false,
  recorrencia_tipo TEXT, -- diaria, semanal, mensal
  recorrencia_intervalo INTEGER,
  
  -- Auditoria
  criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  concluido_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TABELA DE WEBHOOKS GENÉRICOS
-- =====================================================
CREATE TABLE public.webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  url TEXT NOT NULL,
  metodo TEXT DEFAULT 'POST',
  
  -- Eventos que disparam
  eventos TEXT[] NOT NULL DEFAULT '{}', -- lead_criado, lead_atualizado, tarefa_criada, etc
  
  -- Headers customizados (JSON)
  headers JSONB DEFAULT '{}',
  
  -- Autenticação
  auth_type TEXT, -- none, basic, bearer, api_key
  auth_value TEXT,
  
  -- Configurações
  is_active BOOLEAN NOT NULL DEFAULT true,
  retry_count INTEGER DEFAULT 3,
  timeout_seconds INTEGER DEFAULT 30,
  
  -- Estatísticas
  total_disparos INTEGER DEFAULT 0,
  ultimo_disparo TIMESTAMP WITH TIME ZONE,
  ultimo_status INTEGER,
  
  -- Auditoria
  criado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TABELA DE LOG DE WEBHOOKS
-- =====================================================
CREATE TABLE public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID NOT NULL REFERENCES public.webhooks(id) ON DELETE CASCADE,
  
  evento TEXT NOT NULL,
  payload JSONB,
  
  -- Resposta
  status_code INTEGER,
  response_body TEXT,
  response_time_ms INTEGER,
  
  -- Erro
  error_message TEXT,
  retry_attempt INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TABELA DE LOG DE AUDITORIA
-- =====================================================
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Ação
  acao TEXT NOT NULL, -- criar, atualizar, deletar, login, logout, etc
  entidade TEXT NOT NULL, -- lead, tarefa, usuario, etc
  entidade_id UUID,
  
  -- Dados
  dados_antigos JSONB,
  dados_novos JSONB,
  
  -- Usuário
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  usuario_email TEXT,
  
  -- Contexto
  ip_address TEXT,
  user_agent TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- TABELA DE CONFIGURAÇÕES DO CRM
-- =====================================================
CREATE TABLE public.crm_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chave TEXT UNIQUE NOT NULL,
  valor JSONB NOT NULL DEFAULT '{}',
  categoria TEXT DEFAULT 'geral',
  descricao TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_responsavel ON public.leads(responsavel_id);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_origem ON public.leads(origem);

CREATE INDEX idx_lead_interactions_lead ON public.lead_interactions(lead_id);
CREATE INDEX idx_lead_interactions_created ON public.lead_interactions(created_at DESC);

CREATE INDEX idx_tasks_lead ON public.tasks(lead_id);
CREATE INDEX idx_tasks_responsavel ON public.tasks(responsavel_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_tasks_vencimento ON public.tasks(data_vencimento);

CREATE INDEX idx_webhook_logs_webhook ON public.webhook_logs(webhook_id);
CREATE INDEX idx_webhook_logs_created ON public.webhook_logs(created_at DESC);

CREATE INDEX idx_audit_logs_entidade ON public.audit_logs(entidade, entidade_id);
CREATE INDEX idx_audit_logs_usuario ON public.audit_logs(usuario_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- =====================================================
-- TRIGGERS PARA UPDATED_AT
-- =====================================================
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pipeline_stages_updated_at
  BEFORE UPDATE ON public.pipeline_stages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_webhooks_updated_at
  BEFORE UPDATE ON public.webhooks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crm_settings_updated_at
  BEFORE UPDATE ON public.crm_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- RLS - ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_settings ENABLE ROW LEVEL SECURITY;

-- Leads: admins e editors podem ver e gerenciar
CREATE POLICY "Team members can view leads"
  ON public.leads FOR SELECT
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update leads"
  ON public.leads FOR UPDATE
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Pipeline stages: todos podem ver, admins podem gerenciar
CREATE POLICY "Everyone can view pipeline stages"
  ON public.pipeline_stages FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage pipeline stages"
  ON public.pipeline_stages FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Lead interactions: team pode ver e criar
CREATE POLICY "Team members can view interactions"
  ON public.lead_interactions FOR SELECT
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert interactions"
  ON public.lead_interactions FOR INSERT
  WITH CHECK (is_admin_or_editor(auth.uid()));

-- Tasks: team pode gerenciar
CREATE POLICY "Team members can view tasks"
  ON public.tasks FOR SELECT
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update tasks"
  ON public.tasks FOR UPDATE
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can delete tasks"
  ON public.tasks FOR DELETE
  USING (is_admin_or_editor(auth.uid()));

-- Webhooks: apenas admins
CREATE POLICY "Admins can manage webhooks"
  ON public.webhooks FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Webhook logs: apenas admins
CREATE POLICY "Admins can view webhook logs"
  ON public.webhook_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Audit logs: apenas admins podem ver
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Sistema pode inserir logs
CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- CRM settings: admins podem gerenciar
CREATE POLICY "Everyone can view crm settings"
  ON public.crm_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage crm settings"
  ON public.crm_settings FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- =====================================================
-- INSERIR ESTÁGIOS PADRÃO DO PIPELINE
-- =====================================================
INSERT INTO public.pipeline_stages (nome, descricao, cor, ordem, probabilidade_padrao) VALUES
  ('Novo Lead', 'Lead acabou de entrar no sistema', '#6366f1', 0, 10),
  ('Qualificado', 'Lead foi qualificado e tem potencial', '#8b5cf6', 1, 25),
  ('Proposta Enviada', 'Proposta comercial enviada ao lead', '#f59e0b', 2, 50),
  ('Negociação', 'Em negociação de valores e condições', '#f97316', 3, 70),
  ('Fechado - Ganho', 'Negócio fechado com sucesso', '#22c55e', 4, 100),
  ('Fechado - Perdido', 'Negócio não foi fechado', '#ef4444', 5, 0);

UPDATE public.pipeline_stages SET is_won_stage = true WHERE nome = 'Fechado - Ganho';
UPDATE public.pipeline_stages SET is_lost_stage = true WHERE nome = 'Fechado - Perdido';

-- =====================================================
-- INSERIR CONFIGURAÇÕES PADRÃO DO CRM
-- =====================================================
INSERT INTO public.crm_settings (chave, valor, categoria, descricao) VALUES
  ('notificacoes_email', '{"novo_lead": true, "tarefa_vencida": true, "lead_inativo": true}', 'notificacoes', 'Configurações de notificações por email'),
  ('whatsapp', '{"habilitado": false, "numero_padrao": "", "mensagem_boas_vindas": "Olá! Obrigado pelo seu interesse."}', 'integracoes', 'Configurações do WhatsApp'),
  ('scoring', '{"peso_email": 10, "peso_telefone": 15, "peso_empresa": 20, "peso_interacao": 5}', 'qualificacao', 'Regras de scoring de leads'),
  ('automacoes', '{"criar_tarefa_novo_lead": true, "dias_tarefa_followup": 3, "alerta_inatividade_dias": 7}', 'automacoes', 'Configurações de automações');

-- =====================================================
-- FUNÇÃO PARA CALCULAR SCORE DO LEAD
-- =====================================================
CREATE OR REPLACE FUNCTION public.calculate_lead_score(lead_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  lead_record RECORD;
  interaction_count INTEGER;
  base_score INTEGER := 0;
BEGIN
  SELECT * INTO lead_record FROM leads WHERE id = lead_id;
  
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  -- Pontos por campos preenchidos
  IF lead_record.email IS NOT NULL AND lead_record.email != '' THEN
    base_score := base_score + 10;
  END IF;
  
  IF lead_record.telefone IS NOT NULL AND lead_record.telefone != '' THEN
    base_score := base_score + 15;
  END IF;
  
  IF lead_record.empresa IS NOT NULL AND lead_record.empresa != '' THEN
    base_score := base_score + 20;
  END IF;
  
  IF lead_record.whatsapp IS NOT NULL AND lead_record.whatsapp != '' THEN
    base_score := base_score + 10;
  END IF;
  
  -- Pontos por interações
  SELECT COUNT(*) INTO interaction_count
  FROM lead_interactions
  WHERE lead_interactions.lead_id = calculate_lead_score.lead_id;
  
  base_score := base_score + LEAST(interaction_count * 5, 30);
  
  -- Cap at 100
  RETURN LEAST(base_score, 100);
END;
$$;

-- =====================================================
-- FUNÇÃO PARA DISPARAR WEBHOOKS
-- =====================================================
CREATE OR REPLACE FUNCTION public.trigger_webhooks(
  p_evento TEXT,
  p_payload JSONB
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  webhook_record RECORD;
BEGIN
  FOR webhook_record IN 
    SELECT * FROM webhooks 
    WHERE is_active = true 
    AND p_evento = ANY(eventos)
  LOOP
    -- Log the webhook trigger (actual HTTP call should be done via edge function)
    INSERT INTO webhook_logs (webhook_id, evento, payload, created_at)
    VALUES (webhook_record.id, p_evento, p_payload, now());
    
    -- Update webhook stats
    UPDATE webhooks 
    SET total_disparos = total_disparos + 1,
        ultimo_disparo = now()
    WHERE id = webhook_record.id;
  END LOOP;
END;
$$;

-- =====================================================
-- FUNÇÃO PARA REGISTRAR LOG DE AUDITORIA
-- =====================================================
CREATE OR REPLACE FUNCTION public.log_audit(
  p_acao TEXT,
  p_entidade TEXT,
  p_entidade_id UUID,
  p_dados_antigos JSONB DEFAULT NULL,
  p_dados_novos JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_user_email TEXT;
BEGIN
  v_user_id := auth.uid();
  
  SELECT email INTO v_user_email
  FROM auth.users
  WHERE id = v_user_id;
  
  INSERT INTO audit_logs (
    acao, entidade, entidade_id,
    dados_antigos, dados_novos,
    usuario_id, usuario_email
  ) VALUES (
    p_acao, p_entidade, p_entidade_id,
    p_dados_antigos, p_dados_novos,
    v_user_id, v_user_email
  );
END;
$$;

-- =====================================================
-- TRIGGER PARA AUTO-CRIAR TAREFA EM NOVO LEAD
-- =====================================================
CREATE OR REPLACE FUNCTION public.on_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Criar tarefa de follow-up automática
  INSERT INTO tasks (
    lead_id,
    titulo,
    descricao,
    tipo,
    prioridade,
    data_vencimento,
    responsavel_id,
    criado_por
  ) VALUES (
    NEW.id,
    'Follow-up inicial - ' || NEW.nome,
    'Entrar em contato com o novo lead para qualificação',
    'follow_up',
    COALESCE(NEW.prioridade, 'media'),
    now() + interval '3 days',
    NEW.responsavel_id,
    NEW.criado_por
  );
  
  -- Calcular e atualizar score
  UPDATE leads SET score = calculate_lead_score(NEW.id) WHERE id = NEW.id;
  
  -- Log de auditoria
  PERFORM log_audit('criar', 'lead', NEW.id, NULL, to_jsonb(NEW));
  
  -- Disparar webhooks
  PERFORM trigger_webhooks('lead_criado', to_jsonb(NEW));
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_lead_created
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.on_new_lead();

-- =====================================================
-- TRIGGER PARA LOG DE ATUALIZAÇÃO DE LEAD
-- =====================================================
CREATE OR REPLACE FUNCTION public.on_lead_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Atualizar score se campos relevantes mudaram
  IF OLD.email IS DISTINCT FROM NEW.email 
     OR OLD.telefone IS DISTINCT FROM NEW.telefone 
     OR OLD.empresa IS DISTINCT FROM NEW.empresa THEN
    NEW.score := calculate_lead_score(NEW.id);
  END IF;
  
  -- Log de auditoria
  PERFORM log_audit('atualizar', 'lead', NEW.id, to_jsonb(OLD), to_jsonb(NEW));
  
  -- Disparar webhooks
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM trigger_webhooks('lead_status_alterado', jsonb_build_object(
      'lead_id', NEW.id,
      'status_anterior', OLD.status,
      'status_novo', NEW.status
    ));
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_lead_updated
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.on_lead_updated();

-- =====================================================
-- FUNÇÃO PARA ESTATÍSTICAS DO CRM
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_crm_stats()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_leads', (SELECT COUNT(*) FROM leads),
    'leads_novos', (SELECT COUNT(*) FROM leads WHERE status = 'novo'),
    'leads_qualificados', (SELECT COUNT(*) FROM leads WHERE status = 'qualificado'),
    'leads_proposta', (SELECT COUNT(*) FROM leads WHERE status = 'proposta_enviada'),
    'leads_negociacao', (SELECT COUNT(*) FROM leads WHERE status = 'negociacao'),
    'leads_ganhos', (SELECT COUNT(*) FROM leads WHERE status = 'fechado_ganho'),
    'leads_perdidos', (SELECT COUNT(*) FROM leads WHERE status = 'fechado_perdido'),
    'valor_pipeline', (SELECT COALESCE(SUM(valor_estimado), 0) FROM leads WHERE status NOT IN ('fechado_ganho', 'fechado_perdido', 'arquivado')),
    'valor_fechado', (SELECT COALESCE(SUM(valor_estimado), 0) FROM leads WHERE status = 'fechado_ganho'),
    'tarefas_pendentes', (SELECT COUNT(*) FROM tasks WHERE status = 'pendente'),
    'tarefas_vencidas', (SELECT COUNT(*) FROM tasks WHERE status = 'pendente' AND data_vencimento < now()),
    'leads_mes_atual', (SELECT COUNT(*) FROM leads WHERE created_at >= date_trunc('month', now())),
    'conversao_rate', CASE 
      WHEN (SELECT COUNT(*) FROM leads WHERE status IN ('fechado_ganho', 'fechado_perdido')) > 0 
      THEN ROUND(
        (SELECT COUNT(*)::numeric FROM leads WHERE status = 'fechado_ganho') / 
        (SELECT COUNT(*)::numeric FROM leads WHERE status IN ('fechado_ganho', 'fechado_perdido')) * 100, 2
      )
      ELSE 0 
    END
  ) INTO result;
  
  RETURN result;
END;
$$;