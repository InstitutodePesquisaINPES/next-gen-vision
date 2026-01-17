import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  FileText, 
  Save, 
  Download, 
  Plus, 
  Trash2,
  ArrowLeft,
  Layers,
  Package,
  Calendar,
  DollarSign,
  Settings,
  FileStack,
  Import
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateProposalPDF, type ProposalData } from '@/lib/proposal-pdf-generator';
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

export default function ProposalEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = id === 'novo';

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo_servico: 'data_science' as ServiceType,
    valor_total: '',
    desconto_percentual: '',
    prazo_execucao_dias: '',
    validade_proposta: '',
    termos_condicoes: ''
  });

  const [escopo, setEscopo] = useState<ScopeItem[]>([]);
  const [entregaveis, setEntregaveis] = useState<DeliverableItem[]>([]);
  const [cronograma, setCronograma] = useState<ScheduleItem[]>([]);

  // Fetch existing proposal
  const { data: proposal, isLoading } = useQuery({
    queryKey: ['proposal', id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase
        .from('proposals')
        .select('*, leads(nome, empresa)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !isNew
  });

  // Fetch leads for dropdown
  const { data: leads } = useQuery({
    queryKey: ['leads-simple'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('id, nome, empresa')
        .order('nome');
      if (error) throw error;
      return data;
    }
  });

  // Fetch proposal templates
  const { data: templates } = useQuery({
    queryKey: ['proposal-templates-for-editor'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposal_templates')
        .select('*')
        .eq('is_active', true)
        .order('nome');
      if (error) throw error;
      return data;
    }
  });

  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  // Populate form when proposal loads
  useEffect(() => {
    if (proposal) {
      setFormData({
        titulo: proposal.titulo || '',
        descricao: proposal.descricao || '',
        tipo_servico: proposal.tipo_servico as ServiceType,
        valor_total: proposal.valor_total?.toString() || '',
        desconto_percentual: proposal.desconto_percentual?.toString() || '',
        prazo_execucao_dias: proposal.prazo_execucao_dias?.toString() || '',
        validade_proposta: proposal.validade_proposta || '',
        termos_condicoes: proposal.termos_condicoes || ''
      });
      setSelectedLeadId(proposal.lead_id || '');
      
      // Parse JSON fields
      const escopoData = proposal.escopo_detalhado as { titulo: string; descricao: string }[] | null;
      if (escopoData && Array.isArray(escopoData)) {
        setEscopo(escopoData);
      }
      
      const entregaveisData = proposal.entregaveis as { titulo: string; descricao: string }[] | null;
      if (entregaveisData && Array.isArray(entregaveisData)) {
        setEntregaveis(entregaveisData);
      }
      
      const cronogramaData = proposal.cronograma as { fase: string; duracao: string; descricao: string }[] | null;
      if (cronogramaData && Array.isArray(cronogramaData)) {
        setCronograma(cronogramaData);
      }
    }
  }, [proposal]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const valorTotal = formData.valor_total ? parseFloat(formData.valor_total) : null;
      const descontoPercentual = formData.desconto_percentual ? parseFloat(formData.desconto_percentual) : null;
      const valorFinal = valorTotal && descontoPercentual 
        ? valorTotal * (1 - descontoPercentual / 100) 
        : valorTotal;

      const proposalData = {
        titulo: formData.titulo,
        descricao: formData.descricao || null,
        tipo_servico: formData.tipo_servico,
        lead_id: selectedLeadId || null,
        valor_total: valorTotal,
        desconto_percentual: descontoPercentual,
        valor_final: valorFinal,
        prazo_execucao_dias: formData.prazo_execucao_dias ? parseInt(formData.prazo_execucao_dias) : null,
        validade_proposta: formData.validade_proposta || null,
        termos_condicoes: formData.termos_condicoes || null,
        escopo_detalhado: escopo as unknown as Json,
        entregaveis: entregaveis as unknown as Json,
        cronograma: cronograma as unknown as Json
      };

      if (isNew) {
        const { error } = await supabase.from('proposals').insert(proposalData);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('proposals').update(proposalData).eq('id', id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success(isNew ? 'Proposta criada!' : 'Proposta atualizada!');
      if (isNew) {
        navigate('/admin/propostas');
      }
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const handleGeneratePDF = () => {
    const selectedLead = leads?.find(l => l.id === selectedLeadId);
    const valorTotal = formData.valor_total ? parseFloat(formData.valor_total) : null;
    const descontoPercentual = formData.desconto_percentual ? parseFloat(formData.desconto_percentual) : null;

    const pdfData: ProposalData = {
      numero: proposal?.numero || null,
      titulo: formData.titulo,
      descricao: formData.descricao,
      tipoServico: formData.tipo_servico,
      clienteNome: selectedLead?.nome || null,
      clienteEmpresa: selectedLead?.empresa || null,
      valorTotal,
      descontoPercentual,
      valorFinal: valorTotal && descontoPercentual 
        ? valorTotal * (1 - descontoPercentual / 100) 
        : valorTotal,
      prazoExecucaoDias: formData.prazo_execucao_dias ? parseInt(formData.prazo_execucao_dias) : null,
      validadeProposta: formData.validade_proposta,
      escopo,
      entregaveis,
      cronograma,
      termosCondicoes: formData.termos_condicoes
    };

    generateProposalPDF(pdfData);
    toast.success('PDF gerado! Use Ctrl+P para salvar como PDF.');
  };

  // Helpers for managing lists
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

  // Import from template
  const importFromTemplate = (templateId: string) => {
    const template = templates?.find(t => t.id === templateId);
    if (!template) return;

    const escopoItems = Array.isArray(template.escopo_items) 
      ? (template.escopo_items as unknown as ScopeItem[]) 
      : [];
    const entregaveisItems = Array.isArray(template.entregaveis_items) 
      ? (template.entregaveis_items as unknown as DeliverableItem[]) 
      : [];
    const cronogramaItems = Array.isArray(template.cronograma_items) 
      ? (template.cronograma_items as unknown as ScheduleItem[]) 
      : [];

    setEscopo(escopoItems);
    setEntregaveis(entregaveisItems);
    setCronograma(cronogramaItems);
    
    if (template.termos_padrao) {
      setFormData(prev => ({ ...prev, termos_condicoes: template.termos_padrao || '' }));
    }
    if (template.prazo_padrao_dias) {
      setFormData(prev => ({ ...prev, prazo_execucao_dias: template.prazo_padrao_dias?.toString() || '' }));
    }
    if (template.tipo_servico) {
      setFormData(prev => ({ ...prev, tipo_servico: template.tipo_servico as ServiceType }));
    }

    setIsTemplateDialogOpen(false);
    toast.success(`Template "${template.nome}" importado!`);
  };
  if (!isNew && isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/propostas')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <AdminPageHeader
          title={isNew ? 'Nova Proposta' : 'Editar Proposta'}
          description="Editor visual de propostas comerciais"
          icon={FileText}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          <Save className="h-4 w-4 mr-2" />
          {saveMutation.isPending ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button variant="outline" onClick={handleGeneratePDF}>
          <Download className="h-4 w-4 mr-2" />
          Gerar PDF
        </Button>
        
        {isNew && templates && templates.length > 0 && (
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileStack className="h-4 w-4 mr-2" />
                Importar Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Importar de Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-4 max-h-[400px] overflow-y-auto">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => importFromTemplate(template.id)}
                    className="w-full text-left p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <div className="font-medium">{template.nome}</div>
                    {template.descricao && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.descricao}</p>
                    )}
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{Array.isArray(template.escopo_items) ? (template.escopo_items as unknown[]).length : 0} itens de escopo</span>
                      <span>{Array.isArray(template.entregaveis_items) ? (template.entregaveis_items as unknown[]).length : 0} entregáveis</span>
                      <span>{Array.isArray(template.cronograma_items) ? (template.cronograma_items as unknown[]).length : 0} fases</span>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="geral" className="gap-2">
            <Settings className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="escopo" className="gap-2">
            <Layers className="h-4 w-4" />
            Escopo
          </TabsTrigger>
          <TabsTrigger value="entregaveis" className="gap-2">
            <Package className="h-4 w-4" />
            Entregáveis
          </TabsTrigger>
          <TabsTrigger value="cronograma" className="gap-2">
            <Calendar className="h-4 w-4" />
            Cronograma
          </TabsTrigger>
          <TabsTrigger value="investimento" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Investimento
          </TabsTrigger>
        </TabsList>

        {/* General Info Tab */}
        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Dados básicos da proposta comercial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título da Proposta *</Label>
                  <Input
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    placeholder="Ex: Implementação de Analytics"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Select value={selectedLeadId} onValueChange={setSelectedLeadId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum</SelectItem>
                      {leads?.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.nome} {lead.empresa ? `(${lead.empresa})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="space-y-2">
                <Label>Descrição / Resumo Executivo</Label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Apresentação geral da proposta..."
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scope Tab */}
        <TabsContent value="escopo">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Escopo do Projeto</CardTitle>
                <CardDescription>Defina os itens inclusos no escopo</CardDescription>
              </div>
              <Button onClick={addScopeItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {escopo.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum item de escopo adicionado</p>
                  <Button onClick={addScopeItem} variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Item
                  </Button>
                </div>
              ) : (
                escopo.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.titulo}
                        onChange={(e) => updateScopeItem(index, 'titulo', e.target.value)}
                        placeholder="Título do item"
                      />
                      <Textarea
                        value={item.descricao}
                        onChange={(e) => updateScopeItem(index, 'descricao', e.target.value)}
                        placeholder="Descrição detalhada..."
                        rows={2}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeScopeItem(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deliverables Tab */}
        <TabsContent value="entregaveis">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Entregáveis</CardTitle>
                <CardDescription>Liste os entregáveis do projeto</CardDescription>
              </div>
              <Button onClick={addDeliverableItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Entregável
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {entregaveis.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum entregável adicionado</p>
                  <Button onClick={addDeliverableItem} variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Entregável
                  </Button>
                </div>
              ) : (
                entregaveis.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={item.titulo}
                        onChange={(e) => updateDeliverableItem(index, 'titulo', e.target.value)}
                        placeholder="Nome do entregável"
                      />
                      <Textarea
                        value={item.descricao}
                        onChange={(e) => updateDeliverableItem(index, 'descricao', e.target.value)}
                        placeholder="Descrição do entregável..."
                        rows={2}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDeliverableItem(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="cronograma">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Cronograma</CardTitle>
                <CardDescription>Defina as fases e prazos do projeto</CardDescription>
              </div>
              <Button onClick={addScheduleItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Fase
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {cronograma.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma fase adicionada</p>
                  <Button onClick={addScheduleItem} variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeira Fase
                  </Button>
                </div>
              ) : (
                cronograma.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-3 gap-4">
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeScheduleItem(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Tab */}
        <TabsContent value="investimento">
          <Card>
            <CardHeader>
              <CardTitle>Investimento e Condições</CardTitle>
              <CardDescription>Valores, prazos e termos da proposta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Valor Total (R$)</Label>
                  <Input
                    type="number"
                    value={formData.valor_total}
                    onChange={(e) => setFormData({ ...formData, valor_total: e.target.value })}
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Desconto (%)</Label>
                  <Input
                    type="number"
                    value={formData.desconto_percentual}
                    onChange={(e) => setFormData({ ...formData, desconto_percentual: e.target.value })}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor Final</Label>
                  <div className="h-10 px-3 py-2 border rounded-md bg-muted flex items-center font-semibold">
                    {formData.valor_total ? 
                      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                        parseFloat(formData.valor_total) * (1 - (parseFloat(formData.desconto_percentual || '0') / 100))
                      ) : 'R$ 0,00'
                    }
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prazo de Execução (dias)</Label>
                  <Input
                    type="number"
                    value={formData.prazo_execucao_dias}
                    onChange={(e) => setFormData({ ...formData, prazo_execucao_dias: e.target.value })}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Validade da Proposta</Label>
                  <Input
                    type="date"
                    value={formData.validade_proposta}
                    onChange={(e) => setFormData({ ...formData, validade_proposta: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Termos e Condições</Label>
                <Textarea
                  value={formData.termos_condicoes}
                  onChange={(e) => setFormData({ ...formData, termos_condicoes: e.target.value })}
                  placeholder="Condições de pagamento, garantias, responsabilidades..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
