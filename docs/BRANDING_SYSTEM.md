# Sistema de Controle de Aparência e Branding

## Visão Geral

Sistema que permite ao administrador do site gerenciar toda a identidade visual (logos, cores, fontes) diretamente pelo painel administrativo, sem necessidade de alterar código ou solicitar assistência técnica.

---

## Arquitetura

```
┌─────────────────────────────────────────────────┐
│              Painel Admin (/admin/aparencia)     │
│  ┌───────────┐ ┌──────────┐ ┌────────────────┐  │
│  │   Cores   │ │Tipografia│ │ Logos & Marca   │  │
│  └─────┬─────┘ └────┬─────┘ └───────┬────────┘  │
│        │             │               │           │
│        └─────────────┼───────────────┘           │
│                      ▼                           │
│            site_settings (Supabase DB)           │
│            category = 'theme'                    │
│                      │                           │
│        ┌─────────────┼───────────────┐           │
│        ▼             ▼               ▼           │
│   useBranding()  useTheme()   Componentes        │
│        │             │               │           │
│        ▼             ▼               ▼           │
│   VixioLogo      CSS Vars      Layout/Pages      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│            Supabase Storage (bucket: media)      │
│  /branding/theme_logo_url_1234567890.png        │
│  /branding/theme_favicon_url_1234567890.ico     │
└─────────────────────────────────────────────────┘
```

---

## 1. Banco de Dados

### Tabela: `site_settings`

```sql
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  value TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Leitura pública (site precisa ler as configs)
CREATE POLICY "Leitura pública das configurações"
  ON public.site_settings FOR SELECT USING (true);

-- Escrita apenas para admin/editor
CREATE POLICY "Admin/editor pode modificar configurações"
  ON public.site_settings FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));
```

### Chaves utilizadas (category = 'theme')

| Chave | Tipo | Descrição |
|-------|------|-----------|
| `theme_primary_color` | HEX color | Cor primária do site |
| `theme_accent_color` | HEX color | Cor de destaque/accent |
| `theme_bg_dark` | HEX color | Cor de fundo escuro |
| `theme_bg_light` | HEX color | Cor de fundo claro |
| `theme_text_color` | HEX color | Cor principal do texto |
| `theme_border_color` | HEX color | Cor das bordas |
| `theme_font_heading` | String | Nome da fonte dos títulos |
| `theme_font_body` | String | Nome da fonte do corpo |
| `theme_font_size_base` | Number | Tamanho base da fonte (px) |
| `theme_border_radius` | Number | Arredondamento dos cantos (px) |
| `theme_logo_url` | URL | Logo principal (fallback universal) |
| `theme_logo_dark_url` | URL | Logo para fundo escuro |
| `theme_logo_light_url` | URL | Logo para fundo claro |
| `theme_favicon_url` | URL | Favicon do site |

---

## 2. Storage (Supabase)

### Bucket: `media` (público)

```sql
-- Criar bucket público
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);

-- Política de leitura pública
CREATE POLICY "Leitura pública de media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Upload apenas para admin/editor autenticado
CREATE POLICY "Admin/editor pode fazer upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'media'
    AND auth.role() = 'authenticated'
    AND public.is_admin_or_editor(auth.uid())
  );

-- Update apenas para admin/editor
CREATE POLICY "Admin/editor pode atualizar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'media'
    AND public.is_admin_or_editor(auth.uid())
  );
```

### Estrutura de pastas

```
media/
  branding/
    theme_logo_url_1700000000000.png
    theme_logo_dark_url_1700000000000.png
    theme_logo_light_url_1700000000000.svg
    theme_favicon_url_1700000000000.ico
```

### Lógica de upload

```typescript
const handleFileUpload = async (key: string, file: File) => {
  // 1. Validação
  if (!file.type.startsWith('image/')) return toast.error('Apenas imagens');
  if (file.size > 5 * 1024 * 1024) return toast.error('Máximo 5MB');

  // 2. Upload para Storage
  const ext = file.name.split('.').pop();
  const fileName = `branding/${key}_${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('media')
    .upload(fileName, file, { upsert: true });

  // 3. Obter URL pública
  const { data: urlData } = supabase.storage
    .from('media')
    .getPublicUrl(fileName);
  const url = urlData.publicUrl;

  // 4. Salvar URL no banco (auto-save)
  const existing = settings?.find(s => s.key === key);
  if (existing) {
    await supabase.from('site_settings').update({ value: url }).eq('id', existing.id);
  } else {
    await supabase.from('site_settings').insert({ key, value: url, category: 'theme' });
  }

  // 5. Invalidar cache
  queryClient.invalidateQueries({ queryKey: ['branding-settings'] });
};
```

---

## 3. Hook: `useBranding`

Hook React Query que busca as URLs de branding do banco e disponibiliza para todos os componentes.

```typescript
// src/hooks/useBranding.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BrandingSettings {
  logoUrl: string | null;
  logoDarkUrl: string | null;
  logoLightUrl: string | null;
  faviconUrl: string | null;
}

export function useBranding() {
  return useQuery({
    queryKey: ["branding-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .eq("category", "theme")
        .in("key", [
          "theme_logo_url",
          "theme_logo_dark_url",
          "theme_logo_light_url",
          "theme_favicon_url",
        ]);

      if (error) throw error;

      const map = new Map(data?.map((d) => [d.key, d.value]) ?? []);

      return {
        logoUrl: map.get("theme_logo_url") || null,
        logoDarkUrl: map.get("theme_logo_dark_url") || null,
        logoLightUrl: map.get("theme_logo_light_url") || null,
        faviconUrl: map.get("theme_favicon_url") || null,
      } as BrandingSettings;
    },
    staleTime: 5 * 60 * 1000,  // Cache por 5 minutos
    gcTime: 10 * 60 * 1000,    // Garbage collect após 10 min
  });
}
```

### Uso em componentes

```tsx
import { useBranding } from '@/hooks/useBranding';
import logoFallback from '@/assets/logo-static.png';

function Header() {
  const { data: branding } = useBranding();

  // Logo dinâmica com fallback para asset estático
  const logoSrc = branding?.logoDarkUrl || branding?.logoUrl || logoFallback;

  return (
    <header>
      <img
        src={logoSrc}
        alt="Logo"
        className="h-8 object-contain mix-blend-lighten"
      />
    </header>
  );
}
```

---

## 4. Componente de Logo Dinâmico

Componente que suporta múltiplas variantes (icon, dark, light, full) e tamanhos, com fallback automático.

```tsx
// src/components/brand/DynamicLogo.tsx
import { useBranding } from '@/hooks/useBranding';

// Assets estáticos (fallback)
import logoIcon from '@/assets/logo-icon.png';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/assets/logo-light.png';
import logoFull from '@/assets/logo-full.png';

interface LogoProps {
  variant?: 'icon' | 'dark' | 'light' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: { icon: 'h-6 w-6', full: 'h-6' },
  md: { icon: 'h-8 w-8', full: 'h-8' },
  lg: { icon: 'h-10 w-10', full: 'h-10' },
  xl: { icon: 'h-14 w-14', full: 'h-14' },
};

export function DynamicLogo({ variant = 'dark', size = 'md', className }: LogoProps) {
  const { data: branding } = useBranding();

  // Prioridade: variante específica → logo principal → fallback estático
  const getSrc = () => {
    switch (variant) {
      case 'icon':
        return branding?.logoUrl || logoIcon;
      case 'dark':
        return branding?.logoDarkUrl || branding?.logoUrl || logoDark;
      case 'light':
        return branding?.logoLightUrl || branding?.logoUrl || logoLight;
      case 'full':
        return branding?.logoUrl || logoFull;
    }
  };

  const sizeClass = variant === 'icon'
    ? sizes[size].icon
    : sizes[size].full;

  return (
    <img
      src={getSrc()}
      alt="Logo"
      className={`object-contain ${sizeClass} ${className || ''}`}
    />
  );
}
```

### Hierarquia de fallback

```
Variante Dark:  logoDarkUrl → logoUrl → asset estático dark
Variante Light: logoLightUrl → logoUrl → asset estático light
Variante Icon:  logoUrl → asset estático icon
Variante Full:  logoUrl → asset estático full
```

---

## 5. Editor de Aparência (Admin)

### Estrutura do componente

```
ThemeEditor (página principal)
├── Tab: Cores
│   ├── Paletas Rápidas (presets de cores)
│   ├── Cores Personalizadas (color pickers)
│   └── Amostra de Cores (preview)
├── Tab: Tipografia
│   ├── Seleção de Fontes (heading + body)
│   ├── Tamanho Base
│   └── Amostra Tipográfica
├── Tab: Marca
│   ├── Logo Principal (URL + upload)
│   ├── Logo Escura (URL + upload)
│   ├── Logo Clara (URL + upload)
│   └── Favicon (URL + upload)
└── Tab: Preview (iframe do site)
```

### Campos de branding com upload

Cada campo de branding suporta:
1. **Entrada de URL manual** — colar URL direta
2. **Upload de arquivo** — botão de upload com validação
3. **Preview da imagem** — miniatura do arquivo carregado
4. **Botão de remover** — limpar a imagem

```tsx
// Renderização de campo de branding
<div className="space-y-2">
  <Label>{field.label}</Label>
  <div className="flex gap-2">
    {/* Input de URL */}
    <Input
      value={value}
      onChange={e => update(field.key, e.target.value)}
      placeholder="https://... ou faça upload"
    />

    {/* Input de arquivo (hidden) */}
    <input
      type="file"
      accept="image/*"
      className="hidden"
      ref={el => { fileInputRefs.current[field.key] = el; }}
      onChange={e => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(field.key, file);
      }}
    />

    {/* Botão Upload */}
    <Button variant="outline" size="icon"
      onClick={() => fileInputRefs.current[field.key]?.click()}>
      <Upload className="h-4 w-4" />
    </Button>

    {/* Botão Remover */}
    {value && (
      <Button variant="outline" size="icon"
        onClick={() => update(field.key, '')}>
        <X className="h-4 w-4" />
      </Button>
    )}
  </div>

  {/* Preview da imagem */}
  {value && (
    <div className="mt-2 p-3 border rounded-lg bg-muted/20">
      <img src={value} alt={field.label} className="max-h-20 object-contain" />
    </div>
  )}
</div>
```

---

## 6. Invalidação de Cache

Quando uma imagem é carregada ou configuração é salva, o cache React Query precisa ser invalidado para refletir as mudanças em tempo real:

```typescript
// Após salvar qualquer configuração de tema
queryClient.invalidateQueries({ queryKey: ['theme-settings'] });

// Após alterar logos/branding especificamente
queryClient.invalidateQueries({ queryKey: ['branding-settings'] });
```

Isso faz com que todos os componentes que usam `useBranding()` busquem os dados atualizados automaticamente.

---

## 7. CSS: mix-blend-mode para Logos

Para logos em fundo escuro, use `mix-blend-lighten` para remover fundos brancos automaticamente:

```css
.logo-on-dark {
  mix-blend-mode: lighten;
}
```

```tsx
<img src={logoSrc} className="mix-blend-lighten" />
```

> **Nota:** Funciona melhor com logos que têm fundo branco sólido. Para logos com transparência (PNG), não é necessário.

---

## 8. Rota do Admin

```tsx
// No arquivo de rotas (App.tsx)
import ThemeEditor from '@/pages/admin/ThemeEditor';

<Route
  path="/admin/aparencia"
  element={
    <RoleGuard requiredRole="admin">
      <ThemeEditor />
    </RoleGuard>
  }
/>
```

---

## 9. Checklist para Replicação em Outro Projeto

### Banco de Dados
- [ ] Criar tabela `site_settings` com RLS
- [ ] Criar função `is_admin_or_editor()` (ou equivalente)
- [ ] Configurar políticas de leitura pública e escrita restrita

### Storage
- [ ] Criar bucket `media` (público)
- [ ] Configurar políticas de upload (apenas admin/editor)

### Frontend
- [ ] Criar hook `useBranding()` com React Query
- [ ] Criar componente `DynamicLogo` com fallbacks
- [ ] Criar página `ThemeEditor` no admin
- [ ] Integrar `DynamicLogo` no Header, Footer e demais locais
- [ ] Invalidar cache após uploads/saves

### Configuração
- [ ] Adicionar rota `/admin/aparencia` protegida por RoleGuard
- [ ] Preparar assets estáticos como fallback
- [ ] Configurar `staleTime` e `gcTime` adequados no hook

---

## 10. Dependências

```json
{
  "@supabase/supabase-js": "^2.x",
  "@tanstack/react-query": "^5.x",
  "lucide-react": "^0.4x",
  "sonner": "^1.x",
  "tailwind-merge": "^2.x"
}
```

---

## 11. Fluxo Completo (Diagrama)

```
Usuário Admin
    │
    ▼
[Painel Admin → /admin/aparencia → Tab "Marca"]
    │
    ├─ Cola URL ──────────────────────┐
    │                                  │
    └─ Faz Upload de Arquivo ─────────┤
                                       │
                                       ▼
                              [Validação: tipo + tamanho]
                                       │
                                       ▼
                         [Upload → Supabase Storage]
                              bucket: media
                              path: branding/{key}_{ts}.ext
                                       │
                                       ▼
                         [Obter URL pública]
                                       │
                                       ▼
                    [Salvar URL → site_settings]
                         key: theme_logo_url
                         value: https://...publicUrl
                         category: theme
                                       │
                                       ▼
                    [Invalidar cache React Query]
                         queryKey: branding-settings
                                       │
                                       ▼
                    [Componentes re-renderizam]
                    Header, Footer, etc. mostram
                    a nova logo automaticamente
```
