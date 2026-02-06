import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Layout, Save, Loader2, RotateCcw, Plus, Trash2, GripVertical, Eye
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { LivePreview } from '@/components/admin/LivePreview';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PageSection {
  id?: string;
  page_slug: string;
  section_key: string;
  content_value: Record<string, unknown>;
  ordem: number;
  is_active: boolean;
  updated_at?: string;
}

const pages = [
  { slug: 'sobre', label: 'Sobre', description: 'Página institucional sobre a Vixio' },
  { slug: 'fundador', label: 'Fundador', description: 'Página sobre o fundador' },
  { slug: 'servicos', label: 'Serviços', description: 'Listagem de serviços oferecidos' },
  { slug: 'portfolio', label: 'Portfólio', description: 'Cases e projetos realizados' },
  { slug: 'contato', label: 'Contato', description: 'Página de contato e formulário' },
  { slug: 'consultoria', label: 'Consultoria', description: 'Hub de consultoria' },
  { slug: 'consultoria/data-science', label: 'Data Science', description: 'Serviço de Data Science' },
  { slug: 'consultoria/analytics', label: 'Analytics', description: 'Serviço de Analytics' },
  { slug: 'consultoria/people-analytics', label: 'People Analytics', description: 'Serviço de People Analytics' },
  { slug: 'consultoria/behavioral', label: 'Behavioral Analytics', description: 'Serviço de Behavioral Analytics' },
  { slug: 'consultoria/customer-intelligence', label: 'Customer Intelligence', description: 'Serviço de Customer Intelligence' },
  { slug: 'consultoria/bioestatistica', label: 'Bioestatística', description: 'Serviço de Bioestatística' },
  { slug: 'consultoria/planejamento', label: 'Planejamento', description: 'Planejamento Estratégico' },
  { slug: 'sistemas', label: 'Sistemas', description: 'Página de sistemas' },
  { slug: 'plataformas', label: 'Plataformas', description: 'Plataformas SaaS' },
  { slug: 'educacao', label: 'Educação', description: 'Cursos e treinamentos' },
  { slug: 'marketplace', label: 'Marketplace', description: 'Marketplace de soluções' },
];

export default function PageEditor() {
  const [selectedPage, setSelectedPage] = useState(pages[0].slug);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  const { data: allContent, isLoading } = useQuery({
    queryKey: ['page-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('ordem');
      if (error) throw error;
      return data as PageSection[];
    },
  });

  useEffect(() => {
    if (allContent) {
      const pageSections = allContent.filter(s => s.page_slug === selectedPage);
      setSections(pageSections.length > 0 ? pageSections : []);
      setHasChanges(false);
    }
  }, [allContent, selectedPage]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      for (const section of sections) {
        const contentJson = JSON.parse(JSON.stringify(section.content_value));
        const payload = {
          page_slug: section.page_slug,
          section_key: section.section_key,
          content_value: contentJson,
          ordem: section.ordem,
          is_active: section.is_active,
          updated_by: user?.id,
        };

        if (section.id) {
          const { error } = await supabase.from('page_content').update(payload).eq('id', section.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('page_content').insert([payload]);
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content'] });
      setHasChanges(false);
      toast.success('Conteúdo salvo!');
    },
    onError: (err) => toast.error('Erro: ' + (err as Error).message),
  });

  const addSection = () => {
    const key = `section_${Date.now()}`;
    setSections(prev => [...prev, {
      page_slug: selectedPage,
      section_key: key,
      content_value: { titulo: '', descricao: '', conteudo: '' },
      ordem: prev.length,
      is_active: true,
    }]);
    setHasChanges(true);
  };

  const updateSection = (index: number, field: string, value: unknown) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== index) return s;
      return { ...s, content_value: { ...s.content_value, [field]: value } };
    }));
    setHasChanges(true);
  };

  const updateSectionKey = (index: number, key: string) => {
    setSections(prev => prev.map((s, i) => i === index ? { ...s, section_key: key } : s));
    setHasChanges(true);
  };

  const toggleSection = (index: number) => {
    setSections(prev => prev.map((s, i) => i === index ? { ...s, is_active: !s.is_active } : s));
    setHasChanges(true);
  };

  const removeSection = (index: number) => {
    if (!confirm('Remover esta seção?')) return;
    const section = sections[index];
    if (section.id) {
      supabase.from('page_content').delete().eq('id', section.id).then(({ error }) => {
        if (error) toast.error('Erro ao remover');
        else {
          queryClient.invalidateQueries({ queryKey: ['page-content'] });
          toast.success('Seção removida');
        }
      });
    }
    setSections(prev => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const currentPage = pages.find(p => p.slug === selectedPage)!;

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Editor de Páginas"
        description="Edite o conteúdo de todas as páginas do site"
        icon={Layout}
        actions={
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                Alterações não salvas
              </Badge>
            )}
            <Button variant="outline" onClick={() => {
              const pageSections = allContent?.filter(s => s.page_slug === selectedPage) || [];
              setSections(pageSections);
              setHasChanges(false);
            }} disabled={!hasChanges}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Descartar
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || !hasChanges}>
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Salvar
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selector */}
        <div className="lg:col-span-1">
          <AdminCard title="Páginas" description="Selecione para editar">
            <div className="space-y-1 mt-4 max-h-[60vh] overflow-y-auto">
              {pages.map(page => {
                const count = allContent?.filter(s => s.page_slug === page.slug).length || 0;
                return (
                  <button
                    key={page.slug}
                    onClick={() => setSelectedPage(page.slug)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                      selectedPage === page.slug
                        ? 'border-primary bg-primary/10'
                        : 'border-transparent hover:bg-muted/50'
                    }`}
                  >
                    <p className={`font-medium text-sm ${selectedPage === page.slug ? 'text-primary' : 'text-foreground'}`}>
                      {page.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {count > 0 ? `${count} seção(ões)` : 'Sem conteúdo'}
                    </p>
                  </button>
                );
              })}
            </div>
          </AdminCard>
        </div>

        {/* Section Editor */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{currentPage.label}</h2>
              <p className="text-sm text-muted-foreground">{currentPage.description}</p>
            </div>
            <Button variant="outline" onClick={addSection}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Seção
            </Button>
          </div>

          {isLoading ? (
            <AdminCard>
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            </AdminCard>
          ) : sections.length === 0 ? (
            <AdminCard>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Layout className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-1">Sem conteúdo editável</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione seções para personalizar esta página
                </p>
                <Button onClick={addSection}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeira Seção
                </Button>
              </div>
            </AdminCard>
          ) : (
            sections.map((section, idx) => (
              <AdminCard key={section.id || idx}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <div>
                      <Input
                        value={section.section_key}
                        onChange={e => updateSectionKey(idx, e.target.value)}
                        className="h-8 text-sm font-mono w-48"
                        placeholder="chave_da_secao"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">Ativo</Label>
                      <Switch checked={section.is_active} onCheckedChange={() => toggleSection(idx)} />
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeSection(idx)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div>
                    <Label>Título</Label>
                    <Input
                      value={(section.content_value.titulo as string) || ''}
                      onChange={e => updateSection(idx, 'titulo', e.target.value)}
                      placeholder="Título da seção"
                    />
                  </div>
                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      value={(section.content_value.descricao as string) || ''}
                      onChange={e => updateSection(idx, 'descricao', e.target.value)}
                      placeholder="Descrição ou subtítulo..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Conteúdo</Label>
                    <RichTextEditor
                      value={(section.content_value.conteudo as string) || ''}
                      onChange={html => updateSection(idx, 'conteudo', html)}
                      placeholder="Comece a escrever..."
                      minHeight="200px"
                    />
                  </div>
                  <div>
                    <Label>URL da Imagem</Label>
                    <Input
                      value={(section.content_value.imagem_url as string) || ''}
                      onChange={e => updateSection(idx, 'imagem_url', e.target.value)}
                      placeholder="https://... (cole URL do gerenciador de mídia)"
                    />
                  </div>
                  {section.updated_at && (
                    <p className="text-xs text-muted-foreground">
                      Atualizado {formatDistanceToNow(new Date(section.updated_at), { addSuffix: true, locale: ptBR })}
                    </p>
                  )}
                </div>
              </AdminCard>
            ))
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="mt-6">
        <LivePreview path={`/${selectedPage}`} />
      </div>
    </AdminLayout>
  );
}
