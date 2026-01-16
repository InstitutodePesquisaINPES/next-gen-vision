-- Categorias de documentos
CREATE TABLE public.document_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  icone TEXT DEFAULT 'FileText',
  cor TEXT DEFAULT '#6366f1',
  ordem INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Templates de documentos
CREATE TABLE public.document_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.document_categories(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  conteudo TEXT NOT NULL, -- HTML/Rich text com placeholders {{campo}}
  versao INTEGER DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  criado_por UUID,
  atualizado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Campos dinâmicos dos templates
CREATE TABLE public.template_fields (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES public.document_templates(id) ON DELETE CASCADE,
  nome TEXT NOT NULL, -- nome do campo (sem espaços, usado no placeholder)
  label TEXT NOT NULL, -- label amigável para o formulário
  tipo TEXT NOT NULL DEFAULT 'text', -- text, number, currency, date, select, textarea, email, phone
  placeholder TEXT,
  valor_padrao TEXT,
  opcoes JSONB, -- para campos do tipo select: [{value, label}]
  obrigatorio BOOLEAN DEFAULT false,
  ordem INTEGER DEFAULT 0,
  grupo TEXT, -- para agrupar campos no formulário
  dica TEXT, -- texto de ajuda
  mascara TEXT, -- máscara de input (ex: CPF, CNPJ, telefone)
  fonte_dados TEXT, -- 'lead', 'empresa', 'manual' - de onde puxar dados
  campo_fonte TEXT, -- qual campo da fonte usar
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Documentos gerados
CREATE TABLE public.generated_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES public.document_templates(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  conteudo_html TEXT NOT NULL, -- conteúdo final renderizado
  dados_preenchidos JSONB NOT NULL DEFAULT '{}', -- dados usados para gerar
  arquivo_url TEXT, -- URL do PDF gerado (storage)
  status TEXT DEFAULT 'rascunho', -- rascunho, finalizado, enviado, assinado
  enviado_para TEXT, -- email para onde foi enviado
  enviado_em TIMESTAMP WITH TIME ZONE,
  criado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Histórico de versões dos templates
CREATE TABLE public.template_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES public.document_templates(id) ON DELETE CASCADE,
  versao INTEGER NOT NULL,
  conteudo TEXT NOT NULL,
  campos JSONB, -- snapshot dos campos nessa versão
  criado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for document_categories
CREATE POLICY "Anyone can view active categories" 
  ON public.document_categories FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage categories" 
  ON public.document_categories FOR ALL 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for document_templates
CREATE POLICY "Team members can view templates" 
  ON public.document_templates FOR SELECT 
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert templates" 
  ON public.document_templates FOR INSERT 
  WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update templates" 
  ON public.document_templates FOR UPDATE 
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete templates" 
  ON public.document_templates FOR DELETE 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for template_fields
CREATE POLICY "Team members can view fields" 
  ON public.template_fields FOR SELECT 
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can manage fields" 
  ON public.template_fields FOR ALL 
  USING (is_admin_or_editor(auth.uid()));

-- RLS Policies for generated_documents
CREATE POLICY "Team members can view documents" 
  ON public.generated_documents FOR SELECT 
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert documents" 
  ON public.generated_documents FOR INSERT 
  WITH CHECK (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update documents" 
  ON public.generated_documents FOR UPDATE 
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete documents" 
  ON public.generated_documents FOR DELETE 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for template_versions
CREATE POLICY "Team members can view versions" 
  ON public.template_versions FOR SELECT 
  USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert versions" 
  ON public.template_versions FOR INSERT 
  WITH CHECK (is_admin_or_editor(auth.uid()));

-- Storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false);

-- Storage policies
CREATE POLICY "Team members can view documents" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'documents' AND is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can upload documents" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'documents' AND is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can update documents" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'documents' AND is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete documents" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_document_categories_updated_at
  BEFORE UPDATE ON public.document_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_document_templates_updated_at
  BEFORE UPDATE ON public.document_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_generated_documents_updated_at
  BEFORE UPDATE ON public.generated_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.document_categories (nome, descricao, icone, cor, ordem) VALUES
  ('Orçamentos', 'Templates para orçamentos e propostas comerciais', 'Receipt', '#10b981', 1),
  ('Contratos', 'Modelos de contratos e termos', 'FileSignature', '#6366f1', 2),
  ('Relatórios', 'Templates para relatórios e análises', 'BarChart3', '#f59e0b', 3),
  ('Propostas', 'Propostas técnicas e comerciais', 'FileText', '#3b82f6', 4),
  ('Outros', 'Outros tipos de documentos', 'File', '#64748b', 5);