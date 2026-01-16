import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FileText, 
  Save, 
  Loader2, 
  Eye, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  ImageIcon,
  Type,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminStatusBadge } from '@/components/admin/AdminStatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SiteContent {
  id: string;
  section_key: string;
  content_type: string;
  content_value: Record<string, unknown>;
  is_active: boolean;
  updated_at: string;
}

const contentSections = [
  { 
    key: 'hero', 
    label: 'Hero Section', 
    description: 'Mensagens principais e CTAs da página inicial',
    icon: Sparkles
  },
  { 
    key: 'about', 
    label: 'Sobre', 
    description: 'Metodologia, diferenciais e "Por que escolher"',
    icon: Type
  },
  { 
    key: 'services', 
    label: 'Serviços', 
    description: 'Cards e descrições dos serviços oferecidos',
    icon: FileText
  },
  { 
    key: 'results', 
    label: 'Resultados', 
    description: 'Números, métricas e conquistas',
    icon: CheckCircle
  },
  { 
    key: 'portfolio', 
    label: 'Portfólio', 
    description: 'Cases e projetos realizados',
    icon: ImageIcon
  },
  { 
    key: 'cta', 
    label: 'CTA', 
    description: 'Chamadas para ação e botões de conversão',
    icon: LinkIcon
  },
  { 
    key: 'footer', 
    label: 'Rodapé', 
    description: 'Links, contato e informações legais',
    icon: Type
  },
];

export default function AdminContent() {
  const [activeSection, setActiveSection] = useState('hero');
  const [editingContent, setEditingContent] = useState<Record<string, unknown>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  const { data: contents, isLoading, error } = useQuery({
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
      setHasChanges(false);
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

  const getSectionMeta = (sectionKey: string) => {
    const content = contents?.find(c => c.section_key === sectionKey);
    return {
      isActive: content?.is_active ?? true,
      lastUpdated: content?.updated_at,
    };
  };

  const handleSave = () => {
    saveMutation.mutate({
      sectionKey: activeSection,
      content: editingContent,
    });
  };

  const handleReset = () => {
    setEditingContent(getSectionContent(activeSection));
    setHasChanges(false);
    toast.info('Alterações descartadas');
  };

  const updateField = (field: string, value: unknown) => {
    setEditingContent(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  // Initialize editing content when section changes
  const handleSectionChange = (section: string) => {
    if (hasChanges) {
      const confirm = window.confirm('Você tem alterações não salvas. Deseja descartá-las?');
      if (!confirm) return;
    }
    setActiveSection(section);
    setEditingContent(getSectionContent(section));
    setHasChanges(false);
  };

  // Load initial content
  useEffect(() => {
    if (contents && !Object.keys(editingContent).length) {
      setEditingContent(getSectionContent(activeSection));
    }
  }, [contents, activeSection]);

  const currentSectionMeta = getSectionMeta(activeSection);
  const currentSection = contentSections.find(s => s.key === activeSection);

  if (error) {
    return (
      <AdminLayout>
        <AdminPageHeader title="Editor de Conteúdo" icon={FileText} />
        <AdminCard>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-destructive">Erro ao carregar conteúdo</p>
            <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ['site-content'] })} className="mt-4">
              Tentar novamente
            </Button>
          </div>
        </AdminCard>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Editor de Conteúdo"
        description="Edite textos, imagens e configurações das seções do site"
        icon={FileText}
        actions={
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                Alterações não salvas
              </Badge>
            )}
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={!hasChanges}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Descartar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saveMutation.isPending || !hasChanges}
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <AdminCard>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section Selector */}
          <div className="lg:col-span-1">
            <AdminCard title="Seções" description="Selecione para editar">
              <div className="space-y-2 mt-4">
                {contentSections.map(section => {
                  const Icon = section.icon;
                  const isActive = section.key === activeSection;
                  const meta = getSectionMeta(section.key);
                  
                  return (
                    <button
                      key={section.key}
                      onClick={() => handleSectionChange(section.key)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        isActive 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border/50 hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${isActive ? 'text-primary' : 'text-foreground'}`}>
                            {section.label}
                          </p>
                          {meta.lastUpdated && (
                            <p className="text-xs text-muted-foreground truncate">
                              {formatDistanceToNow(new Date(meta.lastUpdated), { addSuffix: true, locale: ptBR })}
                            </p>
                          )}
                        </div>
                        {!meta.isActive && (
                          <AdminStatusBadge status="inactive" size="sm" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </AdminCard>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <AdminCard
              title={currentSection?.label || 'Editor'}
              description={currentSection?.description}
            >
              <Separator className="my-4" />
              
              <div className="space-y-6">
                {activeSection === 'hero' && (
                  <HeroEditor content={editingContent} onUpdate={updateField} />
                )}
                {activeSection === 'about' && (
                  <AboutEditor content={editingContent} onUpdate={updateField} />
                )}
                {activeSection === 'services' && (
                  <ServicesEditor content={editingContent} onUpdate={updateField} />
                )}
                {activeSection === 'results' && (
                  <ResultsEditor content={editingContent} onUpdate={updateField} />
                )}
                {activeSection === 'portfolio' && (
                  <PortfolioEditor content={editingContent} onUpdate={updateField} />
                )}
                {activeSection === 'cta' && (
                  <CTAEditor content={editingContent} onUpdate={updateField} />
                )}
                {activeSection === 'footer' && (
                  <FooterEditor content={editingContent} onUpdate={updateField} />
                )}
              </div>
            </AdminCard>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// Section Editors
interface EditorProps {
  content: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

function HeroEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="badge">Badge (Tag superior)</Label>
          <Input
            id="badge"
            value={(content.badge as string) || ''}
            onChange={(e) => onUpdate('badge', e.target.value)}
            placeholder="Ex: Consultoria de Elite"
          />
          <p className="text-xs text-muted-foreground mt-1">Texto curto que aparece acima do título</p>
        </div>
        <div>
          <Label htmlFor="highlight">Palavra em Destaque</Label>
          <Input
            id="highlight"
            value={(content.highlight as string) || ''}
            onChange={(e) => onUpdate('highlight', e.target.value)}
            placeholder="Ex: estratégicas"
          />
          <p className="text-xs text-muted-foreground mt-1">Palavra que terá destaque visual</p>
        </div>
      </div>

      <div>
        <Label htmlFor="headline">Título Principal</Label>
        <Input
          id="headline"
          value={(content.headline as string) || ''}
          onChange={(e) => onUpdate('headline', e.target.value)}
          placeholder="Ex: Transforme dados em decisões"
          className="text-lg"
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={(content.description as string) || ''}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Descrição que complementa o título..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">Texto de apoio abaixo do título principal</p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ctaPrimary">Texto do Botão Primário</Label>
          <Input
            id="ctaPrimary"
            value={(content.ctaPrimary as string) || ''}
            onChange={(e) => onUpdate('ctaPrimary', e.target.value)}
            placeholder="Ex: Falar com Especialista"
          />
        </div>
        <div>
          <Label htmlFor="ctaPrimaryLink">Link do Botão Primário</Label>
          <Input
            id="ctaPrimaryLink"
            value={(content.ctaPrimaryLink as string) || ''}
            onChange={(e) => onUpdate('ctaPrimaryLink', e.target.value)}
            placeholder="Ex: /contato ou https://wa.me/..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ctaSecondary">Texto do Botão Secundário</Label>
          <Input
            id="ctaSecondary"
            value={(content.ctaSecondary as string) || ''}
            onChange={(e) => onUpdate('ctaSecondary', e.target.value)}
            placeholder="Ex: Conhecer Mais"
          />
        </div>
        <div>
          <Label htmlFor="ctaSecondaryLink">Link do Botão Secundário</Label>
          <Input
            id="ctaSecondaryLink"
            value={(content.ctaSecondaryLink as string) || ''}
            onChange={(e) => onUpdate('ctaSecondaryLink', e.target.value)}
            placeholder="Ex: /sobre"
          />
        </div>
      </div>
    </div>
  );
}

function AboutEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Título da Seção</Label>
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
          placeholder="Texto introdutório da seção..."
          rows={3}
        />
      </div>

      <Separator />

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
          placeholder="Descrição detalhada dos diferenciais..."
          rows={5}
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="stat1Value">Estatística 1 - Valor</Label>
          <Input
            id="stat1Value"
            value={(content.stat1Value as string) || ''}
            onChange={(e) => onUpdate('stat1Value', e.target.value)}
            placeholder="Ex: +500"
          />
        </div>
        <div>
          <Label htmlFor="stat1Label">Estatística 1 - Label</Label>
          <Input
            id="stat1Label"
            value={(content.stat1Label as string) || ''}
            onChange={(e) => onUpdate('stat1Label', e.target.value)}
            placeholder="Ex: Projetos Entregues"
          />
        </div>
        <div>
          <Label htmlFor="stat1Desc">Estatística 1 - Descrição</Label>
          <Input
            id="stat1Desc"
            value={(content.stat1Desc as string) || ''}
            onChange={(e) => onUpdate('stat1Desc', e.target.value)}
            placeholder="Ex: em 10 anos de mercado"
          />
        </div>
      </div>
    </div>
  );
}

function ServicesEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Título da Seção</Label>
        <Input
          id="title"
          value={(content.title as string) || ''}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ex: Nossos Serviços"
        />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={(content.subtitle as string) || ''}
          onChange={(e) => onUpdate('subtitle', e.target.value)}
          placeholder="Breve descrição dos serviços..."
          rows={2}
        />
      </div>

      <Separator />

      <p className="text-sm text-muted-foreground">
        Os cards de serviços são gerenciados separadamente. Configure o texto introdutório aqui.
      </p>
    </div>
  );
}

function ResultsEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Título da Seção</Label>
        <Input
          id="title"
          value={(content.title as string) || ''}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ex: Resultados que Falam"
        />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={(content.subtitle as string) || ''}
          onChange={(e) => onUpdate('subtitle', e.target.value)}
          placeholder="Ex: Números que demonstram nossa capacidade..."
          rows={2}
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(num => (
          <div key={num} className="p-4 rounded-lg border border-border/50 bg-muted/20">
            <p className="text-sm font-medium mb-3">Métrica {num}</p>
            <div className="space-y-2">
              <Input
                value={(content[`metric${num}Value`] as string) || ''}
                onChange={(e) => onUpdate(`metric${num}Value`, e.target.value)}
                placeholder="Ex: +150%"
              />
              <Input
                value={(content[`metric${num}Label`] as string) || ''}
                onChange={(e) => onUpdate(`metric${num}Label`, e.target.value)}
                placeholder="Ex: Aumento em vendas"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Título da Seção</Label>
        <Input
          id="title"
          value={(content.title as string) || ''}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ex: Cases de Sucesso"
        />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Textarea
          id="subtitle"
          value={(content.subtitle as string) || ''}
          onChange={(e) => onUpdate('subtitle', e.target.value)}
          placeholder="Ex: Projetos que transformaram negócios..."
          rows={2}
        />
      </div>

      <Separator />

      <p className="text-sm text-muted-foreground">
        Os itens do portfólio podem ser gerenciados em uma seção dedicada futuramente.
      </p>
    </div>
  );
}

function CTAEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-6">
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
          placeholder="Texto de apoio..."
          rows={3}
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <p className="text-xs text-muted-foreground mt-1">Número com DDI e DDD, sem espaços</p>
        </div>
      </div>

      <div>
        <Label htmlFor="whatsappMessage">Mensagem Pré-definida (WhatsApp)</Label>
        <Textarea
          id="whatsappMessage"
          value={(content.whatsappMessage as string) || ''}
          onChange={(e) => onUpdate('whatsappMessage', e.target.value)}
          placeholder="Ex: Olá! Gostaria de saber mais sobre os serviços da Vixio..."
          rows={2}
        />
      </div>
    </div>
  );
}

function FooterEditor({ content, onUpdate }: EditorProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div>
        <Label htmlFor="address">Endereço</Label>
        <Textarea
          id="address"
          value={(content.address as string) || ''}
          onChange={(e) => onUpdate('address', e.target.value)}
          placeholder="Endereço completo..."
          rows={2}
        />
      </div>

      <Separator />

      <div>
        <Label htmlFor="copyright">Texto de Copyright</Label>
        <Input
          id="copyright"
          value={(content.copyright as string) || ''}
          onChange={(e) => onUpdate('copyright', e.target.value)}
          placeholder="Ex: © 2024 Vixio. Todos os direitos reservados."
        />
      </div>
    </div>
  );
}
