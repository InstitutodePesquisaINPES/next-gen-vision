import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Plus, 
  FileText, 
  Calendar, 
  DollarSign, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

type ServiceType = 'data_science' | 'analytics' | 'people_analytics' | 'behavioral_analytics' | 'customer_intelligence' | 'bioestatistica' | 'sistemas' | 'plataformas' | 'educacao' | 'outro';
type ProposalStatus = 'rascunho' | 'enviada' | 'em_analise' | 'aprovada' | 'rejeitada' | 'revisao' | 'expirada';

interface Proposal {
  id: string;
  numero: string | null;
  lead_id: string | null;
  titulo: string;
  descricao: string | null;
  tipo_servico: ServiceType;
  status: ProposalStatus;
  valor_total: number | null;
  desconto_percentual: number | null;
  valor_final: number | null;
  prazo_execucao_dias: number | null;
  validade_proposta: string | null;
  data_envio: string | null;
  created_at: string;
  leads?: { nome: string; empresa: string | null } | null;
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

const statusLabels: Record<ProposalStatus, string> = {
  rascunho: 'Rascunho',
  enviada: 'Enviada',
  em_analise: 'Em Análise',
  aprovada: 'Aprovada',
  rejeitada: 'Rejeitada',
  revisao: 'Em Revisão',
  expirada: 'Expirada'
};

const statusColors: Record<ProposalStatus, string> = {
  rascunho: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  enviada: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  em_analise: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  aprovada: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rejeitada: 'bg-red-500/20 text-red-400 border-red-500/30',
  revisao: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  expirada: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

const statusIcons: Record<ProposalStatus, React.ReactNode> = {
  rascunho: <FileText className="h-3 w-3" />,
  enviada: <Send className="h-3 w-3" />,
  em_analise: <Clock className="h-3 w-3" />,
  aprovada: <CheckCircle2 className="h-3 w-3" />,
  rejeitada: <XCircle className="h-3 w-3" />,
  revisao: <Edit className="h-3 w-3" />,
  expirada: <Clock className="h-3 w-3" />
};

export default function AdminProposals() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo_servico: 'data_science' as ServiceType,
    valor_total: '',
    prazo_execucao_dias: '',
    validade_proposta: ''
  });

  const { data: proposals, isLoading } = useQuery({
    queryKey: ['proposals', search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('proposals')
        .select('*, leads(nome, empresa)')
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`titulo.ilike.%${search}%,numero.ilike.%${search}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as ProposalStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as Proposal[];
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['proposal-stats'],
    queryFn: async () => {
      const { data } = await supabase.from('proposals').select('status, valor_final');

      const total = data?.length || 0;
      const aprovadas = data?.filter(p => p.status === 'aprovada').length || 0;
      const pendentes = data?.filter(p => ['enviada', 'em_analise'].includes(p.status)).length || 0;
      const valorAprovado = data?.filter(p => p.status === 'aprovada')
        .reduce((sum, p) => sum + (p.valor_final || 0), 0) || 0;
      const taxaConversao = total > 0 ? Math.round((aprovadas / total) * 100) : 0;

      return { total, aprovadas, pendentes, valorAprovado, taxaConversao };
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const valorTotal = data.valor_total ? parseFloat(data.valor_total) : null;
      const { error } = await supabase.from('proposals').insert({
        titulo: data.titulo,
        descricao: data.descricao || null,
        tipo_servico: data.tipo_servico,
        valor_total: valorTotal,
        valor_final: valorTotal, // Initially same as total
        prazo_execucao_dias: data.prazo_execucao_dias ? parseInt(data.prazo_execucao_dias) : null,
        validade_proposta: data.validade_proposta || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal-stats'] });
      toast.success('Proposta criada com sucesso!');
      setIsDialogOpen(false);
      setFormData({
        titulo: '',
        descricao: '',
        tipo_servico: 'data_science',
        valor_total: '',
        prazo_execucao_dias: '',
        validade_proposta: ''
      });
    },
    onError: (error) => {
      toast.error('Erro ao criar proposta: ' + error.message);
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ProposalStatus }) => {
      const updates: Record<string, unknown> = { status };
      if (status === 'enviada') {
        updates.data_envio = new Date().toISOString();
      }
      const { error } = await supabase.from('proposals').update(updates).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal-stats'] });
      toast.success('Status atualizado!');
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('proposals').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal-stats'] });
      toast.success('Proposta excluída!');
    },
    onError: (error) => {
      toast.error('Erro: ' + error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Propostas Comerciais"
        description="Gerencie e acompanhe suas propostas comerciais"
        icon={FileText}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">{stats?.pendentes || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aprovadas</p>
                <p className="text-2xl font-bold">{stats?.aprovadas || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <DollarSign className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Aprovado</p>
                <p className="text-lg font-bold">{formatCurrency(stats?.valorAprovado || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversão</p>
                <p className="text-2xl font-bold">{stats?.taxaConversao || 0}%</p>
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
            placeholder="Buscar por título ou número..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(statusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Proposta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Nova Proposta</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Título da Proposta *</Label>
                <Input
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ex: Proposta de Implementação de Analytics"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Resumo da proposta..."
                  rows={3}
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

              <div className="grid grid-cols-2 gap-4">
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
                  <Label>Prazo (dias)</Label>
                  <Input
                    type="number"
                    value={formData.prazo_execucao_dias}
                    onChange={(e) => setFormData({ ...formData, prazo_execucao_dias: e.target.value })}
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Validade da Proposta</Label>
                <Input
                  type="date"
                  value={formData.validade_proposta}
                  onChange={(e) => setFormData({ ...formData, validade_proposta: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Criando...' : 'Criar Proposta'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proposals List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 h-24" />
            </Card>
          ))}
        </div>
      ) : proposals?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma proposta encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Comece criando sua primeira proposta comercial
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Proposta
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {proposals?.map((proposal) => (
            <Card key={proposal.id} className="hover:border-primary/50 transition-colors group">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Status Badge */}
                  <Badge variant="outline" className={`${statusColors[proposal.status]} gap-1 shrink-0`}>
                    {statusIcons[proposal.status]}
                    {statusLabels[proposal.status]}
                  </Badge>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{proposal.titulo}</h3>
                      {proposal.numero && (
                        <span className="text-xs text-muted-foreground shrink-0">
                          #{proposal.numero}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {proposal.leads?.empresa || proposal.leads?.nome || 'Cliente não vinculado'} • {serviceTypeLabels[proposal.tipo_servico]}
                    </p>
                  </div>

                  {/* Value */}
                  <div className="text-right shrink-0 hidden md:block">
                    <p className="font-semibold">{formatCurrency(proposal.valor_final)}</p>
                    {proposal.prazo_execucao_dias && (
                      <p className="text-xs text-muted-foreground">{proposal.prazo_execucao_dias} dias</p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-right shrink-0 hidden lg:block">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(proposal.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                    {proposal.validade_proposta && (
                      <p className="text-xs text-muted-foreground">
                        Válida até {format(new Date(proposal.validade_proposta), 'dd/MM', { locale: ptBR })}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/propostas/${proposal.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/propostas/${proposal.id}/editar`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {proposal.status === 'rascunho' && (
                        <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: proposal.id, status: 'enviada' })}>
                          <Send className="h-4 w-4 mr-2" />
                          Marcar como Enviada
                        </DropdownMenuItem>
                      )}
                      {proposal.status === 'enviada' && (
                        <>
                          <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: proposal.id, status: 'aprovada' })}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Marcar como Aprovada
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatusMutation.mutate({ id: proposal.id, status: 'rejeitada' })}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Marcar como Rejeitada
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteMutation.mutate(proposal.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
