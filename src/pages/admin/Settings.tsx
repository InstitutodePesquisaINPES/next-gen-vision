import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Settings, Save, Loader2 } from 'lucide-react';
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

interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  category: string;
}

const settingsConfig = {
  general: [
    { key: 'company_name', label: 'Nome da Empresa', type: 'text' },
    { key: 'company_email', label: 'Email', type: 'email' },
    { key: 'company_phone', label: 'Telefone', type: 'tel' },
    { key: 'whatsapp_number', label: 'WhatsApp (com DDD)', type: 'tel' },
    { key: 'company_address', label: 'Endereço', type: 'textarea' },
  ],
  social: [
    { key: 'linkedin_url', label: 'LinkedIn', type: 'url' },
    { key: 'instagram_url', label: 'Instagram', type: 'url' },
    { key: 'twitter_url', label: 'Twitter/X', type: 'url' },
    { key: 'youtube_url', label: 'YouTube', type: 'url' },
  ],
  seo: [
    { key: 'meta_title', label: 'Título do Site (SEO)', type: 'text' },
    { key: 'meta_description', label: 'Descrição (SEO)', type: 'textarea' },
    { key: 'meta_keywords', label: 'Palavras-chave', type: 'text' },
    { key: 'og_image', label: 'Imagem de Compartilhamento (URL)', type: 'url' },
  ],
};

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [editedSettings, setEditedSettings] = useState<Record<string, string>>({});
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
      const promises = Object.entries(updates).map(async ([key, value]) => {
        const existing = settings?.find(s => s.key === key);
        const category = Object.entries(settingsConfig).find(([, fields]) => 
          fields.some(f => f.key === key)
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
      toast.success('Configurações salvas!');
    },
    onError: (error) => {
      toast.error('Erro: ' + (error as Error).message);
    },
  });

  const getSetting = (key: string): string => {
    if (key in editedSettings) return editedSettings[key];
    return settings?.find(s => s.key === key)?.value || '';
  };

  const updateSetting = (key: string, value: string) => {
    setEditedSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveMutation.mutate(editedSettings);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Configurações"
        description="Configure informações gerais do site"
        icon={Settings}
        actions={
          <Button 
            onClick={handleSave} 
            disabled={saveMutation.isPending || Object.keys(editedSettings).length === 0}
          >
            {saveMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Salvar
          </Button>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {Object.entries(settingsConfig).map(([category, fields]) => (
            <TabsContent key={category} value={category}>
              <AdminCard
                title={category === 'general' ? 'Informações Gerais' : category === 'social' ? 'Redes Sociais' : 'SEO'}
                description={
                  category === 'general' ? 'Dados de contato da empresa' :
                  category === 'social' ? 'Links das redes sociais' :
                  'Otimização para mecanismos de busca'
                }
              >
                <div className="space-y-4 mt-4">
                  {fields.map(field => (
                    <div key={field.key}>
                      <Label htmlFor={field.key}>{field.label}</Label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.key}
                          value={getSetting(field.key)}
                          onChange={(e) => updateSetting(field.key, e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={field.key}
                          type={field.type}
                          value={getSetting(field.key)}
                          onChange={(e) => updateSetting(field.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </AdminCard>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </AdminLayout>
  );
}
