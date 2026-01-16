import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Settings, 
  Save, 
  Loader2, 
  Building2,
  Globe,
  Search as SearchIcon,
  Share2,
  Shield,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { z } from 'zod';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  category: string;
}

// Validation schemas
const emailSchema = z.string().email('Email inválido').or(z.literal(''));
const urlSchema = z.string().url('URL inválida').or(z.literal(''));
const phoneSchema = z.string().regex(/^[\d\s()+-]*$/, 'Formato de telefone inválido').or(z.literal(''));

const settingsConfig = {
  general: {
    label: 'Informações da Empresa',
    description: 'Dados básicos de contato e identificação',
    icon: Building2,
    fields: [
      { key: 'company_name', label: 'Nome da Empresa', type: 'text', placeholder: 'Ex: Vixio', required: true },
      { key: 'company_tagline', label: 'Tagline / Slogan', type: 'text', placeholder: 'Ex: Data Science & AI' },
      { key: 'company_email', label: 'Email Principal', type: 'email', placeholder: 'contato@vixio.com.br', validation: emailSchema },
      { key: 'company_phone', label: 'Telefone', type: 'tel', placeholder: '(11) 99999-9999', validation: phoneSchema },
      { key: 'whatsapp_number', label: 'WhatsApp (com DDI e DDD)', type: 'tel', placeholder: '5511999999999', validation: phoneSchema },
      { key: 'company_address', label: 'Endereço', type: 'textarea', placeholder: 'Endereço completo da empresa' },
      { key: 'company_cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00' },
    ],
  },
  social: {
    label: 'Redes Sociais',
    description: 'Links para perfis nas redes sociais',
    icon: Share2,
    fields: [
      { key: 'linkedin_url', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/company/...', validation: urlSchema },
      { key: 'instagram_url', label: 'Instagram', type: 'url', placeholder: 'https://instagram.com/...', validation: urlSchema },
      { key: 'twitter_url', label: 'Twitter/X', type: 'url', placeholder: 'https://x.com/...', validation: urlSchema },
      { key: 'youtube_url', label: 'YouTube', type: 'url', placeholder: 'https://youtube.com/@...', validation: urlSchema },
      { key: 'facebook_url', label: 'Facebook', type: 'url', placeholder: 'https://facebook.com/...', validation: urlSchema },
      { key: 'github_url', label: 'GitHub', type: 'url', placeholder: 'https://github.com/...', validation: urlSchema },
    ],
  },
  seo: {
    label: 'SEO',
    description: 'Otimização para mecanismos de busca',
    icon: SearchIcon,
    fields: [
      { key: 'meta_title', label: 'Título do Site (SEO)', type: 'text', placeholder: 'Vixio - Data Science & AI', maxLength: 60, helpText: 'Recomendado: até 60 caracteres' },
      { key: 'meta_description', label: 'Meta Description', type: 'textarea', placeholder: 'Descrição do site para Google...', maxLength: 160, helpText: 'Recomendado: até 160 caracteres' },
      { key: 'meta_keywords', label: 'Palavras-chave', type: 'text', placeholder: 'data science, ai, consultoria, analytics' },
      { key: 'og_image', label: 'Imagem de Compartilhamento (URL)', type: 'url', placeholder: 'https://...', validation: urlSchema, helpText: 'Imagem que aparece ao compartilhar em redes sociais' },
      { key: 'canonical_url', label: 'URL Canônica', type: 'url', placeholder: 'https://vixio.com.br', validation: urlSchema },
      { key: 'google_analytics', label: 'Google Analytics ID', type: 'text', placeholder: 'G-XXXXXXXXXX' },
    ],
  },
  advanced: {
    label: 'Avançado',
    description: 'Configurações técnicas e de segurança',
    icon: Shield,
    fields: [
      { key: 'maintenance_mode', label: 'Modo Manutenção', type: 'boolean', helpText: 'Quando ativo, exibe página de manutenção' },
      { key: 'show_cookie_banner', label: 'Banner de Cookies (LGPD)', type: 'boolean', helpText: 'Exibe aviso de cookies para visitantes' },
      { key: 'contact_form_email', label: 'Email para Formulário de Contato', type: 'email', placeholder: 'contato@vixio.com.br', validation: emailSchema },
      { key: 'max_contact_submissions', label: 'Limite de Envios por IP/dia', type: 'number', placeholder: '5' },
    ],
  },
};

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [editedSettings, setEditedSettings] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      return data as SiteSetting[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (updates: Record<string, string>) => {
      // Validate all fields
      const errors: Record<string, string> = {};
      for (const [key, value] of Object.entries(updates)) {
        // Find field config for validation
        for (const category of Object.values(settingsConfig)) {
          const field = category.fields.find((f: { key: string }) => f.key === key);
          if (field && 'validation' in field && field.validation && value) {
            try {
              (field.validation as z.ZodSchema).parse(value);
            } catch (e) {
              if (e instanceof z.ZodError) {
                errors[key] = e.errors[0].message;
              }
            }
            break;
          }
        }
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        throw new Error('Corrija os erros de validação');
      }

      const promises = Object.entries(updates).map(async ([key, value]) => {
        const existing = settings?.find(s => s.key === key);
        const category = Object.entries(settingsConfig).find(([, config]) => 
          config.fields.some(f => f.key === key)
        )?.[0] || 'general';

        if (existing) {
          const { error } = await supabase
            .from('site_settings')
            .update({ value })
            .eq('id', existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('site_settings')
            .insert({ key, value, category });
          if (error) throw error;
        }
      });

      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      setEditedSettings({});
      setValidationErrors({});
      toast.success('Configurações salvas com sucesso!');
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  const getSetting = (key: string): string => {
    if (key in editedSettings) return editedSettings[key];
    return settings?.find(s => s.key === key)?.value || '';
  };

  const updateSetting = (key: string, value: string) => {
    setEditedSettings(prev => ({ ...prev, [key]: value }));
    // Clear validation error when user edits
    if (validationErrors[key]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSave = () => {
    saveMutation.mutate(editedSettings);
  };

  // Calculate completion percentage per category
  const getCompletionStats = (categoryKey: string) => {
    const config = settingsConfig[categoryKey as keyof typeof settingsConfig];
    const fields = config.fields;
    const filled = fields.filter(f => {
      const value = getSetting(f.key);
      return value && value.trim() !== '';
    }).length;
    return { filled, total: fields.length, percentage: Math.round((filled / fields.length) * 100) };
  };

  const hasChanges = Object.keys(editedSettings).length > 0;

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Configurações"
        description="Configure informações gerais, SEO e integrações do site"
        icon={Settings}
        actions={
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                {Object.keys(editedSettings).length} alteração(ões)
              </Badge>
            )}
            <Button 
              onClick={handleSave} 
              disabled={saveMutation.isPending || !hasChanges}
            >
              {saveMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Salvar Configurações
            </Button>
          </div>
        }
      />

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(settingsConfig).map(([key, config]) => {
          const stats = getCompletionStats(key);
          const Icon = config.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all duration-200',
                activeTab === key 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border/50 bg-card/50 hover:border-primary/30'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={cn('h-5 w-5', activeTab === key ? 'text-primary' : 'text-muted-foreground')} />
                <span className={cn(
                  'text-xs font-medium',
                  stats.percentage === 100 ? 'text-green-500' : 'text-muted-foreground'
                )}>
                  {stats.percentage}%
                </span>
              </div>
              <p className="font-medium text-sm text-foreground">{config.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stats.filled}/{stats.total} campos</p>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <AdminCard>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </AdminCard>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 hidden">
            {Object.entries(settingsConfig).map(([key, config]) => (
              <TabsTrigger key={key} value={key}>{config.label}</TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(settingsConfig).map(([categoryKey, config]) => (
            <TabsContent key={categoryKey} value={categoryKey}>
              <AdminCard
                title={config.label}
                description={config.description}
              >
                <Separator className="my-4" />
                <div className="space-y-6">
                  {config.fields.map(field => {
                    const value = getSetting(field.key);
                    const error = validationErrors[field.key];
                    const charCount = value?.length || 0;
                    const isOverLimit = field.maxLength && charCount > field.maxLength;

                    return (
                      <div key={field.key}>
                        <div className="flex items-center justify-between mb-1.5">
                          <Label htmlFor={field.key} className="flex items-center gap-2">
                            {field.label}
                            {field.required && <span className="text-destructive">*</span>}
                          </Label>
                          {field.maxLength && (
                            <span className={cn(
                              'text-xs',
                              isOverLimit ? 'text-destructive' : 'text-muted-foreground'
                            )}>
                              {charCount}/{field.maxLength}
                            </span>
                          )}
                        </div>
                        
                        {field.type === 'textarea' ? (
                          <Textarea
                            id={field.key}
                            value={value}
                            onChange={(e) => updateSetting(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={3}
                            className={cn(error && 'border-destructive')}
                          />
                        ) : field.type === 'boolean' ? (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                            <input
                              type="checkbox"
                              id={field.key}
                              checked={value === 'true'}
                              onChange={(e) => updateSetting(field.key, String(e.target.checked))}
                              className="h-4 w-4 rounded border-border"
                            />
                            <Label htmlFor={field.key} className="text-sm font-normal cursor-pointer">
                              {field.helpText}
                            </Label>
                          </div>
                        ) : (
                          <Input
                            id={field.key}
                            type={field.type === 'number' ? 'number' : 'text'}
                            value={value}
                            onChange={(e) => updateSetting(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className={cn(error && 'border-destructive')}
                          />
                        )}
                        
                        {error && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {error}
                          </p>
                        )}
                        
                        {field.helpText && !error && field.type !== 'boolean' && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            {field.helpText}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </AdminCard>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* SEO Preview */}
      {activeTab === 'seo' && (
        <AdminCard className="mt-6" title="Preview do Google" description="Como seu site aparecerá nos resultados de busca">
          <div className="mt-4 p-4 rounded-lg bg-white dark:bg-zinc-900 border border-border">
            <p className="text-blue-600 dark:text-blue-400 text-lg font-medium truncate">
              {getSetting('meta_title') || 'Título do seu site'}
            </p>
            <p className="text-green-700 dark:text-green-500 text-sm truncate">
              {getSetting('canonical_url') || 'https://seusite.com.br'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
              {getSetting('meta_description') || 'Descrição do seu site aparecerá aqui. Escreva algo atraente para aumentar a taxa de cliques.'}
            </p>
          </div>
        </AdminCard>
      )}
    </AdminLayout>
  );
}
