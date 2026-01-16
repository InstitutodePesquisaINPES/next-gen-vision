-- Add digital signature support to generated_documents
ALTER TABLE public.generated_documents 
ADD COLUMN IF NOT EXISTS assinatura_hash text,
ADD COLUMN IF NOT EXISTS assinatura_data jsonb DEFAULT NULL,
ADD COLUMN IF NOT EXISTS assinado_por text,
ADD COLUMN IF NOT EXISTS assinado_em timestamp with time zone,
ADD COLUMN IF NOT EXISTS assinatura_ip text,
ADD COLUMN IF NOT EXISTS codigo_validacao text UNIQUE;

-- Create function to generate validation code
CREATE OR REPLACE FUNCTION public.generate_document_validation_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.codigo_validacao IS NULL THEN
    NEW.codigo_validacao := UPPER(SUBSTR(MD5(NEW.id::text || NOW()::text || RANDOM()::text), 1, 8));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-generate validation code
DROP TRIGGER IF EXISTS generate_validation_code_trigger ON public.generated_documents;
CREATE TRIGGER generate_validation_code_trigger
BEFORE INSERT ON public.generated_documents
FOR EACH ROW
EXECUTE FUNCTION public.generate_document_validation_code();

-- Update existing documents with validation codes
UPDATE public.generated_documents 
SET codigo_validacao = UPPER(SUBSTR(MD5(id::text || NOW()::text || RANDOM()::text), 1, 8))
WHERE codigo_validacao IS NULL;

-- Create document_signatures table for tracking all signatures
CREATE TABLE IF NOT EXISTS public.document_signatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.generated_documents(id) ON DELETE CASCADE,
  tipo_assinante text NOT NULL DEFAULT 'cliente', -- 'cliente', 'empresa', 'testemunha'
  nome_assinante text NOT NULL,
  email_assinante text,
  documento_assinante text, -- CPF/CNPJ
  assinatura_imagem text, -- base64 da assinatura (canvas)
  assinatura_hash text NOT NULL,
  ip_address text,
  user_agent text,
  localizacao jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on document_signatures
ALTER TABLE public.document_signatures ENABLE ROW LEVEL SECURITY;

-- RLS Policies for document_signatures
CREATE POLICY "Team members can view signatures"
ON public.document_signatures FOR SELECT
USING (is_admin_or_editor(auth.uid()));

CREATE POLICY "Team members can insert signatures"
ON public.document_signatures FOR INSERT
WITH CHECK (is_admin_or_editor(auth.uid()));

-- Public can validate documents (read-only specific fields)
CREATE POLICY "Anyone can validate documents"
ON public.generated_documents FOR SELECT
USING (codigo_validacao IS NOT NULL);

-- Create view for document statistics
CREATE OR REPLACE VIEW public.document_stats AS
SELECT 
  COUNT(*) as total_documents,
  COUNT(*) FILTER (WHERE status = 'rascunho') as rascunhos,
  COUNT(*) FILTER (WHERE status = 'finalizado') as finalizados,
  COUNT(*) FILTER (WHERE status = 'enviado') as enviados,
  COUNT(*) FILTER (WHERE status = 'assinado') as assinados,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as ultimos_7_dias,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as ultimos_30_dias
FROM public.generated_documents;