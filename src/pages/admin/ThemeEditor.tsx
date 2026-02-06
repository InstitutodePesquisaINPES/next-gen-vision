import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Palette, Save, Loader2, RotateCcw, Type, Eye, Image as ImageIcon, Sun, Moon
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LivePreview } from '@/components/admin/LivePreview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ThemeSetting {
  id: string;
  key: string;
  value: string | null;
  category: string;
}

// Predefined color palettes
const colorPalettes = [
  { name: 'Vixio Purple', primary: '#7C3AED', accent: '#06B6D4', bg: '#1A2332' },
  { name: 'Ocean Blue', primary: '#2563EB', accent: '#10B981', bg: '#0F172A' },
  { name: 'Emerald', primary: '#059669', accent: '#F59E0B', bg: '#022C22' },
  { name: 'Rose', primary: '#E11D48', accent: '#8B5CF6', bg: '#1C1917' },
  { name: 'Amber', primary: '#D97706', accent: '#3B82F6', bg: '#1C1917' },
  { name: 'Slate', primary: '#475569', accent: '#06B6D4', bg: '#0F172A' },
];

const fontOptions = [
  { value: 'Inter', label: 'Inter (Padrão)' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Raleway', label: 'Raleway' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Space Grotesk', label: 'Space Grotesk' },
];

const themeFields = [
  { key: 'theme_primary_color', label: 'Cor Primária', type: 'color', group: 'colors' },
  { key: 'theme_accent_color', label: 'Cor de Destaque', type: 'color', group: 'colors' },
  { key: 'theme_bg_dark', label: 'Fundo Escuro', type: 'color', group: 'colors' },
  { key: 'theme_bg_light', label: 'Fundo Claro', type: 'color', group: 'colors' },
  { key: 'theme_text_color', label: 'Cor do Texto', type: 'color', group: 'colors' },
  { key: 'theme_border_color', label: 'Cor das Bordas', type: 'color', group: 'colors' },
  { key: 'theme_font_heading', label: 'Fonte dos Títulos', type: 'font', group: 'typography' },
  { key: 'theme_font_body', label: 'Fonte do Corpo', type: 'font', group: 'typography' },
  { key: 'theme_font_size_base', label: 'Tamanho Base (px)', type: 'number', group: 'typography' },
  { key: 'theme_border_radius', label: 'Arredondamento (px)', type: 'number', group: 'layout' },
  { key: 'theme_logo_url', label: 'Logo Principal (URL)', type: 'url', group: 'branding' },
  { key: 'theme_logo_dark_url', label: 'Logo Escura (URL)', type: 'url', group: 'branding' },
  { key: 'theme_logo_light_url', label: 'Logo Clara (URL)', type: 'url', group: 'branding' },
  { key: 'theme_favicon_url', label: 'Favicon (URL)', type: 'url', group: 'branding' },
];

export default function ThemeEditor() {
  const [edited, setEdited] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['theme-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', 'theme');
      if (error) throw error;
      return data as ThemeSetting[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (updates: Record<string, string>) => {
      const promises = Object.entries(updates).map(async ([key, value]) => {
        const existing = settings?.find(s => s.key === key);
        if (existing) {
          const { error } = await supabase.from('site_settings').update({ value }).eq('id', existing.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('site_settings').insert({ key, value, category: 'theme' });
          if (error) throw error;
        }
      });
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theme-settings'] });
      setEdited({});
      toast.success('Tema salvo com sucesso!');
    },
    onError: (err) => toast.error('Erro: ' + (err as Error).message),
  });

  const getSetting = (key: string): string => {
    if (key in edited) return edited[key];
    return settings?.find(s => s.key === key)?.value || '';
  };

  const update = (key: string, value: string) => {
    setEdited(prev => ({ ...prev, [key]: value }));
  };

  const applyPalette = (palette: typeof colorPalettes[0]) => {
    setEdited(prev => ({
      ...prev,
      theme_primary_color: palette.primary,
      theme_accent_color: palette.accent,
      theme_bg_dark: palette.bg,
    }));
  };

  const hasChanges = Object.keys(edited).length > 0;

  const renderField = (field: typeof themeFields[0]) => {
    const value = getSetting(field.key);
    
    if (field.type === 'color') {
      return (
        <div key={field.key} className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={value || '#7C3AED'}
              onChange={e => update(field.key, e.target.value)}
              className="w-10 h-10 rounded-lg border border-border cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <Label className="text-sm">{field.label}</Label>
            <Input
              value={value}
              onChange={e => update(field.key, e.target.value)}
              placeholder="#HEX"
              className="h-8 mt-1 font-mono text-xs"
            />
          </div>
        </div>
      );
    }

    if (field.type === 'font') {
      return (
        <div key={field.key}>
          <Label className="text-sm">{field.label}</Label>
          <Select value={value || 'Inter'} onValueChange={v => update(field.key, v)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map(f => (
                <SelectItem key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (field.type === 'number') {
      return (
        <div key={field.key}>
          <Label className="text-sm">{field.label}</Label>
          <Input
            type="number"
            value={value}
            onChange={e => update(field.key, e.target.value)}
            placeholder="16"
            className="mt-1"
          />
        </div>
      );
    }

    return (
      <div key={field.key}>
        <Label className="text-sm">{field.label}</Label>
        <Input
          value={value}
          onChange={e => update(field.key, e.target.value)}
          placeholder="https://..."
          className="mt-1"
        />
        {value && field.type === 'url' && (
          <div className="mt-2 p-2 border border-border/50 rounded-lg bg-muted/20">
            <img src={value} alt={field.label} className="max-h-16 object-contain" onError={e => (e.currentTarget.style.display = 'none')} />
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Aparência"
        description="Personalize cores, fontes, logos e o visual do site"
        icon={Palette}
        actions={
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                {Object.keys(edited).length} alteração(ões)
              </Badge>
            )}
            <Button variant="outline" onClick={() => setEdited({})} disabled={!hasChanges}>
              <RotateCcw className="h-4 w-4 mr-2" />Descartar
            </Button>
            <Button onClick={() => saveMutation.mutate(edited)} disabled={saveMutation.isPending || !hasChanges}>
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Salvar Tema
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
        <div className="space-y-6">
          <Tabs defaultValue="colors">
            <TabsList>
              <TabsTrigger value="colors"><Palette className="h-4 w-4 mr-2" />Cores</TabsTrigger>
              <TabsTrigger value="typography"><Type className="h-4 w-4 mr-2" />Tipografia</TabsTrigger>
              <TabsTrigger value="branding"><ImageIcon className="h-4 w-4 mr-2" />Marca</TabsTrigger>
              <TabsTrigger value="preview"><Eye className="h-4 w-4 mr-2" />Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              {/* Quick Palettes */}
              <AdminCard title="Paletas Rápidas" description="Clique para aplicar uma paleta de cores pré-definida">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
                  {colorPalettes.map(palette => (
                    <button
                      key={palette.name}
                      onClick={() => applyPalette(palette)}
                      className="p-3 rounded-xl border border-border/50 hover:border-primary/50 transition-all group"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full" style={{ background: palette.primary }} />
                        <div className="w-6 h-6 rounded-full" style={{ background: palette.accent }} />
                        <div className="w-6 h-6 rounded-full border border-border" style={{ background: palette.bg }} />
                      </div>
                      <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{palette.name}</p>
                    </button>
                  ))}
                </div>
              </AdminCard>

              {/* Custom Colors */}
              <AdminCard title="Cores Personalizadas" description="Ajuste cada cor individualmente">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {themeFields.filter(f => f.group === 'colors').map(renderField)}
                </div>
              </AdminCard>

              {/* Color Preview */}
              <AdminCard title="Amostra de Cores">
                <div className="flex flex-wrap gap-3 mt-4">
                  {themeFields.filter(f => f.group === 'colors').map(f => {
                    const color = getSetting(f.key);
                    return color ? (
                      <div key={f.key} className="text-center">
                        <div className="w-16 h-16 rounded-xl border border-border shadow-sm" style={{ background: color }} />
                        <p className="text-[10px] text-muted-foreground mt-1">{f.label}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </AdminCard>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              <AdminCard title="Fontes" description="Escolha as fontes para títulos e corpo do texto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {themeFields.filter(f => f.group === 'typography').map(renderField)}
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Amostra</h4>
                  <div style={{ fontFamily: getSetting('theme_font_heading') || 'Inter' }}>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Título Principal (H1)</h1>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Subtítulo (H2)</h2>
                    <h3 className="text-xl font-medium text-foreground mb-2">Seção (H3)</h3>
                  </div>
                  <div style={{ fontFamily: getSetting('theme_font_body') || 'Inter' }}>
                    <p className="text-base text-muted-foreground">
                      Este é um exemplo de texto corpo usando a fonte selecionada. 
                      A escolha certa de tipografia pode transformar completamente a experiência do usuário.
                    </p>
                  </div>
                </div>
              </AdminCard>

              <AdminCard title="Layout" description="Opções de estilo do layout">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {themeFields.filter(f => f.group === 'layout').map(renderField)}
                </div>
              </AdminCard>
            </TabsContent>

            <TabsContent value="branding" className="space-y-6">
              <AdminCard title="Logos & Marca" description="Faça upload ou cole URLs das imagens da marca">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {themeFields.filter(f => f.group === 'branding').map(renderField)}
                </div>
              </AdminCard>
            </TabsContent>

            <TabsContent value="preview">
              <LivePreview path="/" className="mt-2" />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </AdminLayout>
  );
}
