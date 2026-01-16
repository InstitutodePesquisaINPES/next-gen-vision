import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Save, Loader2, Plus } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';

interface SiteContent {
  id: string;
  section_key: string;
  content_type: string;
  content_value: Record<string, unknown>;
  is_active: boolean;
}

const contentSections = [
  { key: 'hero', label: 'Hero Section', description: 'Mensagens principais e CTAs' },
  { key: 'about', label: 'Sobre', description: 'Metodologia e diferenciais' },
  { key: 'services', label: 'Serviços', description: 'Cards de serviços' },
  { key: 'cta', label: 'CTA', description: 'Chamadas para ação' },
  { key: 'footer', label: 'Rodapé', description: 'Links e contato' },
];

export default function AdminContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [editingContent, setEditingContent] = useState<Record<string, unknown>>({});
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  const { data: contents, isLoading } = useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section_key');
      
      if (error) throw error;
      return data as SiteContent[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: Record<string, unknown> }) => {
      const existing = contents?.find(c => c.section_key === sectionKey);
      const contentJson = JSON.parse(JSON.stringify(content));
      
      if (existing) {
        const { error } = await supabase
          .from('site_content')
          .update({
            content_value: contentJson,
            updated_by: user?.id,
          })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_content')
          .insert([{
            section_key: sectionKey,
            content_type: 'json',
            content_value: contentJson,
            updated_by: user?.id,
          }]);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      toast.success('Conteúdo salvo com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao salvar: ' + (error as Error).message);
    },
  });

  const getSectionContent = (sectionKey: string) => {
    const content = contents?.find(c => c.section_key === sectionKey);
    return content?.content_value || {};
  };

  const handleSave = () => {
    saveMutation.mutate({
      sectionKey: activeSection,
      content: editingContent,
    });
  };

  const updateField = (field: string, value: string) => {
    setEditingContent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Initialize editing content when section changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setEditingContent(getSectionContent(section));
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Editor de Conteúdo"
        description="Edite textos e configurações do site"
        icon={FileText}
        actions={
          <Button 
            onClick={handleSave} 
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Salvar Alterações
          </Button>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Tabs value={activeSection} onValueChange={handleSectionChange}>
          <TabsList className="mb-6">
            {contentSections.map(section => (
              <TabsTrigger key={section.key} value={section.key}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {contentSections.map(section => (
            <TabsContent key={section.key} value={section.key}>
              <AdminCard
                title={section.label}
                description={section.description}
              >
                <div className="space-y-6 mt-4">
                  {section.key === 'hero' && (
                    <HeroEditor 
                      content={editingContent} 
                      onUpdate={updateField} 
                    />
                  )}
                  {section.key === 'about' && (
                    <AboutEditor 
                      content={editingContent} 
                      onUpdate={updateField} 
                    />
                  )}
                  {section.key === 'services' && (
                    <GenericEditor 
                      content={editingContent} 
                      onUpdate={updateField}
                      fields={[
                        { key: 'title', label: 'Título da Seção' },
                        { key: 'subtitle', label: 'Subtítulo' },
                      ]}
                    />
                  )}
                  {section.key === 'cta' && (
                    <CTAEditor 
                      content={editingContent} 
                      onUpdate={updateField} 
                    />
                  )}
                  {section.key === 'footer' && (
                    <FooterEditor 
                      content={editingContent} 
                      onUpdate={updateField} 
                    />
                  )}
                </div>
              </AdminCard>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </AdminLayout>
  );
}

// Section Editors
interface EditorProps {
  content: Record<string, unknown>;
  onUpdate: (field: string, value: string) => void;
}

function HeroEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="badge">Badge</Label>
        <Input
          id="badge"
          value={(content.badge as string) || ''}
          onChange={(e) => onUpdate('badge', e.target.value)}
          placeholder="Ex: Consultoria de Elite"
        />
      </div>
      <div>
        <Label htmlFor="headline">Título Principal</Label>
        <Input
          id="headline"
          value={(content.headline as string) || ''}
          onChange={(e) => onUpdate('headline', e.target.value)}
          placeholder="Ex: Transforme dados em decisões"
        />
      </div>
      <div>
        <Label htmlFor="highlight">Destaque</Label>
        <Input
          id="highlight"
          value={(content.highlight as string) || ''}
          onChange={(e) => onUpdate('highlight', e.target.value)}
          placeholder="Ex: estratégicas"
        />
      </div>
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={(content.description as string) || ''}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Descrição do hero"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ctaPrimary">Botão Primário</Label>
          <Input
            id="ctaPrimary"
            value={(content.ctaPrimary as string) || ''}
            onChange={(e) => onUpdate('ctaPrimary', e.target.value)}
            placeholder="Ex: Falar com Especialista"
          />
        </div>
        <div>
          <Label htmlFor="ctaSecondary">Botão Secundário</Label>
          <Input
            id="ctaSecondary"
            value={(content.ctaSecondary as string) || ''}
            onChange={(e) => onUpdate('ctaSecondary', e.target.value)}
            placeholder="Ex: Conhecer Mais"
          />
        </div>
      </div>
    </div>
  );
}

function AboutEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={(content.title as string) || ''}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ex: Nossa Metodologia"
        />
      </div>
      <div>
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={(content.subtitle as string) || ''}
          onChange={(e) => onUpdate('subtitle', e.target.value)}
          placeholder="Subtítulo da seção"
          rows={2}
        />
      </div>
      <div>
        <Label htmlFor="whyChooseTitle">Título "Por que escolher"</Label>
        <Input
          id="whyChooseTitle"
          value={(content.whyChooseTitle as string) || ''}
          onChange={(e) => onUpdate('whyChooseTitle', e.target.value)}
          placeholder="Ex: Por que escolher a Vixio?"
        />
      </div>
      <div>
        <Label htmlFor="whyChooseText">Texto "Por que escolher"</Label>
        <Textarea
          id="whyChooseText"
          value={(content.whyChooseText as string) || ''}
          onChange={(e) => onUpdate('whyChooseText', e.target.value)}
          placeholder="Descrição dos diferenciais"
          rows={4}
        />
      </div>
    </div>
  );
}

function CTAEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={(content.title as string) || ''}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ex: Pronto para transformar seu negócio?"
        />
      </div>
      <div>
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={(content.subtitle as string) || ''}
          onChange={(e) => onUpdate('subtitle', e.target.value)}
          placeholder="Subtítulo do CTA"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="buttonText">Texto do Botão</Label>
          <Input
            id="buttonText"
            value={(content.buttonText as string) || ''}
            onChange={(e) => onUpdate('buttonText', e.target.value)}
            placeholder="Ex: Agendar Conversa"
          />
        </div>
        <div>
          <Label htmlFor="whatsappNumber">Número WhatsApp</Label>
          <Input
            id="whatsappNumber"
            value={(content.whatsappNumber as string) || ''}
            onChange={(e) => onUpdate('whatsappNumber', e.target.value)}
            placeholder="Ex: 5511999999999"
          />
        </div>
      </div>
    </div>
  );
}

function FooterEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Nome da Empresa</Label>
        <Input
          id="companyName"
          value={(content.companyName as string) || ''}
          onChange={(e) => onUpdate('companyName', e.target.value)}
          placeholder="Ex: Vixio"
        />
      </div>
      <div>
        <Label htmlFor="tagline">Tagline</Label>
        <Input
          id="tagline"
          value={(content.tagline as string) || ''}
          onChange={(e) => onUpdate('tagline', e.target.value)}
          placeholder="Ex: Data Science & AI"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={(content.email as string) || ''}
          onChange={(e) => onUpdate('email', e.target.value)}
          placeholder="Ex: contato@vixio.com.br"
        />
      </div>
      <div>
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          value={(content.phone as string) || ''}
          onChange={(e) => onUpdate('phone', e.target.value)}
          placeholder="Ex: (11) 99999-9999"
        />
      </div>
      <div>
        <Label htmlFor="address">Endereço</Label>
        <Textarea
          id="address"
          value={(content.address as string) || ''}
          onChange={(e) => onUpdate('address', e.target.value)}
          placeholder="Endereço completo"
          rows={2}
        />
      </div>
    </div>
  );
}

interface GenericEditorProps extends EditorProps {
  fields: { key: string; label: string; type?: 'text' | 'textarea' }[];
}

function GenericEditor({ content, onUpdate, fields }: GenericEditorProps) {
  return (
    <div className="space-y-4">
      {fields.map(field => (
        <div key={field.key}>
          <Label htmlFor={field.key}>{field.label}</Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={field.key}
              value={(content[field.key] as string) || ''}
              onChange={(e) => onUpdate(field.key, e.target.value)}
              rows={3}
            />
          ) : (
            <Input
              id={field.key}
              value={(content[field.key] as string) || ''}
              onChange={(e) => onUpdate(field.key, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
