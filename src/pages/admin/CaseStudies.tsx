import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Plus, 
  BookOpen, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Star,
  Building,
  Calendar,
  ExternalLink,
  Globe,
  Lock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ServiceType = 'data_science' | 'analytics' | 'people_analytics' | 'behavioral_analytics' | 'customer_intelligence' | 'bioestatistica' | 'sistemas' | 'plataformas' | 'educacao' | 'outro';

interface CaseStudy {
  id: string;
  titulo: string;
  cliente: string | null;
  industria: string | null;
  tipo_servico: ServiceType;
  desafio: string | null;
  solucao: string | null;
  resultados: string | null;
  metricas: { label: string; value: string }[] | null;
  tecnologias: string[] | null;
  duracao_meses: number | null;
  ano: number | null;
  depoimento: string | null;
  autor_depoimento: string | null;
  cargo_autor: string | null;
  is_public: boolean;
  is_featured: boolean;
  tags: string[] | null;
  created_at: string;
}

const serviceTypeLabels: Record<ServiceType, string> = {
  data_science: 'Data Science',
  analytics: 'Analytics',
  people_analytics: 'People Analytics',
  behavioral_analytics: 'Behavioral Analytics',
  customer_intelligence: 'Customer Intelligence',
  bioestatistica: 'Bioestatística',
  sistemas: 'Sistemas',
  plataformas: 'Plataformas',
  educacao: 'Educação',
  outro: 'Outro'
};

const serviceTypeColors: Record<ServiceType, string> = {
  data_science: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  analytics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  people_analytics: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  behavioral_analytics: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  customer_intelligence: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  bioestatistica: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  sistemas: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  plataformas: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  educacao: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  outro: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

export default function AdminCaseStudies() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    cliente: '',
    industria: '',
    tipo_servico: 'data_science' as ServiceType,
    desafio: '',
    solucao: '',
    resultados: '',
    duracao_meses: '',
    ano: new Date().getFullYear().toString(),
    is_public: false,
    is_featured: false
  });

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['case-studies', search, serviceFilter],
    queryFn: async () => {
      let query = supabase
        .from('case_studies')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`titulo.ilike.%${search}%,cliente.ilike.%${search}%,industria.ilike.%${search}%`);
      }

      if (serviceFilter !== 'all') {
        query = query.eq('tipo_servico', serviceFilter as ServiceType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as CaseStudy[];
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['case-study-stats'],
    queryFn: async () => {
      const { data } = await supabase.from('case_studies').select('tipo_servico, is_public, is_featured');

      const total = data?.length || 0;
      const publicos = data?.filter(c => c.is_public).length || 0;
      const destaques = data?.filter(c => c.is_featured).length || 0;

      // Count by service type
      const byService: Record<string, number> = {};
      data?.forEach(c => {
        byService[c.tipo_servico] = (byService[c.tipo_servico] || 0) + 1;
      });

      return { total, publicos, destaques, byService };
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('case_studies').insert({
        titulo: data.titulo,
        cliente: data.cliente || null,
        industria: data.industria || null,
        tipo_servico: data.tipo_servico,
        desafio: data.desafio || null,
        solucao: data.solucao || null,
        resultados: data.resultados || null,
        duracao_meses: data.duracao_meses ? parseInt(data.duracao_meses) : null,
        ano: data.ano ? parseInt(data.ano) : null,
        is_public: data.is_public,
        is_featured: data.is_featured
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      queryClient.invalidateQueries({ queryKey: ['case-study-stats'] });
      toast.success('Case de sucesso criado!');
      setIsDialogOpen(false);
      setFormData({
        titulo: '',
        cliente: '',
        industria: '',
        tipo_servico: 'data_science',
        desafio: '',
        solucao: '',
        resultados: '',
        duracao_meses: '',
        ano: new Date().getFullYear().toString(),
        is_public: false,
        is_featured: false
      });
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, field, value }: { id: string; field: 'is_public' | 'is_featured'; value: boolean }) => {
      const { error } = await supabase.from('case_studies').update({ [field]: value }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      queryClient.invalidateQueries({ queryKey: ['case-study-stats'] });
      toast.success('Atualizado!');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('case_studies').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      queryClient.invalidateQueries({ queryKey: ['case-study-stats'] });
      toast.success('Case excluído!');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Cases de Sucesso"
        description="Catalogue e gerencie seus cases de sucesso para vendas"
        icon={BookOpen}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <BookOpen className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Cases</p>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Globe className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Públicos</p>
                <p className="text-2xl font-bold">{stats?.publicos || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Destaque</p>
                <p className="text-2xl font-bold">{stats?.destaques || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Building className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categorias</p>
                <p className="text-2xl font-bold">{Object.keys(stats?.byService || {}).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, cliente ou indústria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full md:w-56">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os serviços</SelectItem>
            {Object.entries(serviceTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Case
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Case de Sucesso</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título do Case *</Label>
                  <Input
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Ex: Implementação de Analytics"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Input
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    placeholder="Nome do cliente"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Indústria</Label>
                  <Input
                    value={formData.industria}
                    onChange={(e) => setFormData({ ...formData, industria: e.target.value })}
                    placeholder="Ex: Varejo, Saúde, Finanças"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Serviço</Label>
                  <Select
                    value={formData.tipo_servico}
                    onValueChange={(v) => setFormData({ ...formData, tipo_servico: v as ServiceType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(serviceTypeLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Desafio</Label>
                <Textarea
                  value={formData.desafio}
                  onChange={(e) => setFormData({ ...formData, desafio: e.target.value })}
                  placeholder="Qual era o problema ou desafio do cliente?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Solução</Label>
                <Textarea
                  value={formData.solucao}
                  onChange={(e) => setFormData({ ...formData, solucao: e.target.value })}
                  placeholder="Como foi resolvido? Qual metodologia/tecnologia?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Resultados</Label>
                <Textarea
                  value={formData.resultados}
                  onChange={(e) => setFormData({ ...formData, resultados: e.target.value })}
                  placeholder="Quais foram os resultados obtidos?"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duração (meses)</Label>
                  <Input
                    type="number"
                    value={formData.duracao_meses}
                    onChange={(e) => setFormData({ ...formData, duracao_meses: e.target.value })}
                    placeholder="6"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ano</Label>
                  <Input
                    type="number"
                    value={formData.ano}
                    onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_public}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                  />
                  <Label>Público no site</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label>Destaque</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Criando...' : 'Criar Case'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cases Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-64" />
            </Card>
          ))}
        </div>
      ) : caseStudies?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum case encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Documente seus cases de sucesso para usar em vendas
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Case
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseStudies?.map((cs) => (
            <Card key={cs.id} className="hover:border-primary/50 transition-colors group flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      {cs.is_featured && (
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      )}
                      <CardTitle className="text-base line-clamp-1">{cs.titulo}</CardTitle>
                    </div>
                    {cs.cliente && (
                      <CardDescription className="line-clamp-1">
                        <Building className="h-3 w-3 inline mr-1" />
                        {cs.cliente}
                      </CardDescription>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toggleMutation.mutate({ 
                          id: cs.id, 
                          field: 'is_featured', 
                          value: !cs.is_featured 
                        })}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        {cs.is_featured ? 'Remover destaque' : 'Destacar'}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => toggleMutation.mutate({ 
                          id: cs.id, 
                          field: 'is_public', 
                          value: !cs.is_public 
                        })}
                      >
                        {cs.is_public ? (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Tornar privado
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4 mr-2" />
                            Tornar público
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteMutation.mutate(cs.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={serviceTypeColors[cs.tipo_servico]}>
                    {serviceTypeLabels[cs.tipo_servico]}
                  </Badge>
                  {cs.industria && (
                    <Badge variant="secondary" className="text-xs">
                      {cs.industria}
                    </Badge>
                  )}
                </div>

                {cs.desafio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {cs.desafio}
                  </p>
                )}

                {cs.tecnologias && cs.tecnologias.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {cs.tecnologias.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {cs.tecnologias.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{cs.tecnologias.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {cs.duracao_meses && (
                      <span>{cs.duracao_meses} meses</span>
                    )}
                    {cs.ano && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {cs.ano}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {cs.is_public ? (
                      <Globe className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Lock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
