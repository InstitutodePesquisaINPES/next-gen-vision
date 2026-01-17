import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Plus, 
  FileStack, 
  Edit, 
  Trash2, 
  Copy,
  Layers,
  Package,
  Calendar,
  MoreVertical,
  Check
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Json } from '@/integrations/supabase/types';

type ServiceType = 'data_science' | 'analytics' | 'people_analytics' | 'behavioral_analytics' | 'customer_intelligence' | 'bioestatistica' | 'sistemas' | 'plataformas' | 'educacao' | 'outro';

interface ScopeItem {
  titulo: string;
  descricao: string;
}

interface DeliverableItem {
  titulo: string;
  descricao: string;
}

interface ScheduleItem {
  fase: string;
  duracao: string;
  descricao: string;
}

interface ProposalTemplate {
  id: string;
  nome: string;
  descricao: string | null;
  tipo_servico: ServiceType;
  escopo_items: ScopeItem[];
  entregaveis_items: DeliverableItem[];
  cronograma_items: ScheduleItem[];
  termos_padrao: string | null;
  prazo_padrao_dias: number | null;
  is_active: boolean;
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

export default function ProposalTemplates() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ProposalTemplate | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo_servico: 'data_science' as ServiceType,
    termos_padrao: '',
    prazo_padrao_dias: ''
  });
  
  const [escopo, setEscopo] = useState<ScopeItem[]>([]);
  const [entregaveis, setEntregaveis] = useState<DeliverableItem[]>([]);
  const [cronograma, setCronograma] = useState<ScheduleItem[]>([]);

  const { data: templates, isLoading } = useQuery({
    queryKey: ['proposal-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposal_templates')
        .select('*')
        .order('nome');
      if (error) throw error;
      return data.map(t => ({
        ...t,
        escopo_items: Array.isArray(t.escopo_items) ? (t.escopo_items as unknown as ScopeItem[]) : [],
        entregaveis_items: Array.isArray(t.entregaveis_items) ? (t.entregaveis_items as unknown as DeliverableItem[]) : [],
        cronograma_items: Array.isArray(t.cronograma_items) ? (t.cronograma_items as unknown as ScheduleItem[]) : []
      })) as ProposalTemplate[];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const templateData = {
        nome: formData.nome,
        descricao: formData.descricao || null,
        tipo_servico: formData.tipo_servico,
        termos_padrao: formData.termos_padrao || null,
        prazo_padrao_dias: formData.prazo_padrao_dias ? parseInt(formData.prazo_padrao_dias) : null,
        escopo_items: escopo as unknown as Json,
        entregaveis_items: entregaveis as unknown as Json,
        cronograma_items: cronograma as unknown as Json
      };

      if (editingTemplate) {
        const { error } = await supabase
          .from('proposal_templates')
          .update(templateData)
          .eq('id', editingTemplate.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('proposal_templates')
          .insert(templateData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposal-templates'] });
      toast.success(editingTemplate ? 'Template atualizado!' : 'Template criado!');
      closeDialog();
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('proposal_templates').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposal-templates'] });
      toast.success('Template excluído!');
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const duplicateMutation = useMutation({
    mutationFn: async (template: ProposalTemplate) => {
      const { error } = await supabase.from('proposal_templates').insert({
        nome: `${template.nome} (Cópia)`,
        descricao: template.descricao,
        tipo_servico: template.tipo_servico,
        escopo_items: template.escopo_items as unknown as Json,
        entregaveis_items: template.entregaveis_items as unknown as Json,
        cronograma_items: template.cronograma_items as unknown as Json,
        termos_padrao: template.termos_padrao,
        prazo_padrao_dias: template.prazo_padrao_dias
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposal-templates'] });
      toast.success('Template duplicado!');
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const openEditDialog = (template: ProposalTemplate) => {
    setEditingTemplate(template);
    setFormData({
      nome: template.nome,
      descricao: template.descricao || '',
      tipo_servico: template.tipo_servico,
      termos_padrao: template.termos_padrao || '',
      prazo_padrao_dias: template.prazo_padrao_dias?.toString() || ''
    });
    setEscopo(template.escopo_items);
    setEntregaveis(template.entregaveis_items);
    setCronograma(template.cronograma_items);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingTemplate(null);
    setFormData({
      nome: '',
      descricao: '',
      tipo_servico: 'data_science',
      termos_padrao: '',
      prazo_padrao_dias: ''
    });
    setEscopo([]);
    setEntregaveis([]);
    setCronograma([]);
  };

  // List management helpers
  const addScopeItem = () => setEscopo([...escopo, { titulo: '', descricao: '' }]);
  const updateScopeItem = (index: number, field: 'titulo' | 'descricao', value: string) => {
    const updated = [...escopo];
    updated[index][field] = value;
    setEscopo(updated);
  };
  const removeScopeItem = (index: number) => setEscopo(escopo.filter((_, i) => i !== index));

  const addDeliverableItem = () => setEntregaveis([...entregaveis, { titulo: '', descricao: '' }]);
  const updateDeliverableItem = (index: number, field: 'titulo' | 'descricao', value: string) => {
    const updated = [...entregaveis];
    updated[index][field] = value;
    setEntregaveis(updated);
  };
  const removeDeliverableItem = (index: number) => setEntregaveis(entregaveis.filter((_, i) => i !== index));

  const addScheduleItem = () => setCronograma([...cronograma, { fase: '', duracao: '', descricao: '' }]);
  const updateScheduleItem = (index: number, field: 'fase' | 'duracao' | 'descricao', value: string) => {
    const updated = [...cronograma];
    updated[index][field] = value;
    setCronograma(updated);
  };
  const removeScheduleItem = (index: number) => setCronograma(cronograma.filter((_, i) => i !== index));

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Templates de Propostas"
        description="Modelos reutilizáveis de escopo, entregáveis e cronograma"
        icon={FileStack}
      />

      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => open ? setIsDialogOpen(true) : closeDialog()}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTemplate ? 'Editar Template' : 'Novo Template'}</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="geral" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="escopo">Escopo ({escopo.length})</TabsTrigger>
                <TabsTrigger value="entregaveis">Entregáveis ({entregaveis.length})</TabsTrigger>
                <TabsTrigger value="cronograma">Cronograma ({cronograma.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="geral" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Template *</Label>
                    <Input
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Projeto Data Science Padrão"
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
                  <Label>Descrição</Label>
                  <Textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descrição do template..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Prazo Padrão (dias)</Label>
                  <Input
                    type="number"
                    value={formData.prazo_padrao_dias}
                    onChange={(e) => setFormData({ ...formData, prazo_padrao_dias: e.target.value })}
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Termos e Condições Padrão</Label>
                  <Textarea
                    value={formData.termos_padrao}
                    onChange={(e) => setFormData({ ...formData, termos_padrao: e.target.value })}
                    placeholder="Condições padrão para este tipo de projeto..."
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="escopo" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Itens de escopo que serão importados para novas propostas</p>
                  <Button onClick={addScopeItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                {escopo.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                    <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhum item de escopo</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {escopo.map((item, index) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={item.titulo}
                            onChange={(e) => updateScopeItem(index, 'titulo', e.target.value)}
                            placeholder="Título"
                          />
                          <Textarea
                            value={item.descricao}
                            onChange={(e) => updateScopeItem(index, 'descricao', e.target.value)}
                            placeholder="Descrição"
                            rows={2}
                          />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeScopeItem(index)} className="text-destructive shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="entregaveis" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Entregáveis padrão do projeto</p>
                  <Button onClick={addDeliverableItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                {entregaveis.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhum entregável</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {entregaveis.map((item, index) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg">
                        <div className="flex-1 space-y-2">
                          <Input
                            value={item.titulo}
                            onChange={(e) => updateDeliverableItem(index, 'titulo', e.target.value)}
                            placeholder="Nome do entregável"
                          />
                          <Textarea
                            value={item.descricao}
                            onChange={(e) => updateDeliverableItem(index, 'descricao', e.target.value)}
                            placeholder="Descrição"
                            rows={2}
                          />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeDeliverableItem(index)} className="text-destructive shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="cronograma" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Fases do cronograma padrão</p>
                  <Button onClick={addScheduleItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                {cronograma.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg border-dashed">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma fase definida</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cronograma.map((item, index) => (
                      <div key={index} className="flex gap-3 p-3 border rounded-lg">
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <Input
                            value={item.fase}
                            onChange={(e) => updateScheduleItem(index, 'fase', e.target.value)}
                            placeholder="Nome da fase"
                          />
                          <Input
                            value={item.duracao}
                            onChange={(e) => updateScheduleItem(index, 'duracao', e.target.value)}
                            placeholder="Ex: 2 semanas"
                          />
                          <Input
                            value={item.descricao}
                            onChange={(e) => updateScheduleItem(index, 'descricao', e.target.value)}
                            placeholder="Descrição"
                          />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeScheduleItem(index)} className="text-destructive shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={closeDialog}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || !formData.nome}>
                {saveMutation.isPending ? 'Salvando...' : 'Salvar Template'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-48" />
            </Card>
          ))}
        </div>
      ) : templates?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <FileStack className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum template criado</h3>
            <p className="text-muted-foreground mb-4">
              Crie templates para acelerar a criação de propostas
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Template
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates?.map((template) => (
            <Card key={template.id} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.nome}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {serviceTypeLabels[template.tipo_servico]}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(template)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => duplicateMutation.mutate(template)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => deleteMutation.mutate(template.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                {template.descricao && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {template.descricao}
                  </p>
                )}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-md bg-muted/50">
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <Layers className="h-3 w-3" />
                      {template.escopo_items.length}
                    </div>
                    <p className="text-xs text-muted-foreground">Escopo</p>
                  </div>
                  <div className="p-2 rounded-md bg-muted/50">
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <Package className="h-3 w-3" />
                      {template.entregaveis_items.length}
                    </div>
                    <p className="text-xs text-muted-foreground">Entregáveis</p>
                  </div>
                  <div className="p-2 rounded-md bg-muted/50">
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <Calendar className="h-3 w-3" />
                      {template.cronograma_items.length}
                    </div>
                    <p className="text-xs text-muted-foreground">Fases</p>
                  </div>
                </div>
                {template.prazo_padrao_dias && (
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Prazo padrão: {template.prazo_padrao_dias} dias
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
