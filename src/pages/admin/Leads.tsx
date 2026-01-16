import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Building2,
  Calendar,
  TrendingUp,
  Loader2,
  MoreHorizontal,
  MessageSquare,
  Star,
  Clock,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { AdminConfirmDialog } from '@/components/admin/AdminConfirmDialog';
import { AdminSearchInput } from '@/components/admin/AdminSearchInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadInsert = Database['public']['Tables']['leads']['Insert'];
type LeadStatus = Database['public']['Enums']['lead_status'];
type PriorityLevel = Database['public']['Enums']['priority_level'];

const statusConfig: Record<LeadStatus, { label: string; color: string; bgColor: string }> = {
  novo: { label: 'Novo', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  qualificado: { label: 'Qualificado', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  proposta_enviada: { label: 'Proposta', color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  negociacao: { label: 'Negociação', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  fechado_ganho: { label: 'Ganho', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  fechado_perdido: { label: 'Perdido', color: 'text-red-500', bgColor: 'bg-red-500/10' },
  arquivado: { label: 'Arquivado', color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
};

const priorityConfig: Record<PriorityLevel, { label: string; color: string }> = {
  baixa: { label: 'Baixa', color: 'text-gray-500' },
  media: { label: 'Média', color: 'text-blue-500' },
  alta: { label: 'Alta', color: 'text-orange-500' },
  urgente: { label: 'Urgente', color: 'text-red-500' },
};

export default function AdminLeads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Partial<LeadInsert>>({});
  const queryClient = useQueryClient();
  const { user } = useAdminAuthContext();

  // Fetch leads
  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Lead[];
    },
  });

  // Fetch CRM stats
  const { data: stats } = useQuery({
    queryKey: ['crm-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_crm_stats');
      if (error) throw error;
      return data as Record<string, number>;
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: LeadInsert) => {
      const { error } = await supabase.from('leads').insert({
        ...data,
        criado_por: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Lead criado com sucesso!');
      setIsCreateDialogOpen(false);
      setFormData({});
    },
    onError: (error) => {
      toast.error('Erro ao criar lead: ' + (error as Error).message);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Lead> }) => {
      const { error } = await supabase
        .from('leads')
        .update({ ...data, atualizado_por: user?.id })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Lead atualizado!');
      setEditingLead(null);
      setFormData({});
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Lead excluído!');
    },
  });

  // Filtered leads
  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    return leads.filter((lead) => {
      const matchesSearch =
        lead.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.empresa?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const handleCreate = () => {
    if (!formData.nome) {
      toast.error('Nome é obrigatório');
      return;
    }
    createMutation.mutate(formData as LeadInsert);
  };

  const handleUpdate = () => {
    if (!editingLead) return;
    updateMutation.mutate({ id: editingLead.id, data: formData });
  };

  const openEditDialog = (lead: Lead) => {
    setFormData({
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      whatsapp: lead.whatsapp,
      empresa: lead.empresa,
      cargo: lead.cargo,
      status: lead.status,
      prioridade: lead.prioridade,
      valor_estimado: lead.valor_estimado,
      observacoes: lead.observacoes,
    });
    setEditingLead(lead);
  };

  const resetForm = () => {
    setFormData({});
    setIsCreateDialogOpen(false);
    setEditingLead(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Gestão de Leads"
        description="Gerencie seus leads e oportunidades de negócio"
        icon={Users}
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <AdminStatsCard
          title="Total"
          value={stats?.total_leads || 0}
          icon={Users}
          variant="default"
        />
        <AdminStatsCard
          title="Novos"
          value={stats?.leads_novos || 0}
          icon={Star}
          variant="primary"
        />
        <AdminStatsCard
          title="Qualificados"
          value={stats?.leads_qualificados || 0}
          icon={TrendingUp}
          variant="success"
        />
        <AdminStatsCard
          title="Em Negociação"
          value={(stats?.leads_proposta || 0) + (stats?.leads_negociacao || 0)}
          icon={MessageSquare}
          variant="warning"
        />
        <AdminStatsCard
          title="Valor Pipeline"
          value={formatCurrency(stats?.valor_pipeline || 0)}
          description="Em aberto"
          icon={Building2}
          variant="default"
        />
        <AdminStatsCard
          title="Conversão"
          value={`${stats?.conversao_rate || 0}%`}
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <AdminSearchInput
          placeholder="Buscar por nome, email ou empresa..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(statusConfig).map(([value, config]) => (
              <SelectItem key={value} value={value}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Leads List */}
      <AdminCard title={`Leads (${filteredLeads.length})`}>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <AdminEmptyState
            icon={Users}
            title="Nenhum lead encontrado"
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Crie seu primeiro lead para começar'
            }
            action={
              !searchQuery && statusFilter === 'all'
                ? {
                    label: 'Criar primeiro lead',
                    onClick: () => setIsCreateDialogOpen(true),
                  }
                : undefined
            }
          />
        ) : (
          <div className="space-y-3 mt-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-200 bg-card/50"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(lead.nome)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      to={`/admin/leads/${lead.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {lead.nome}
                    </Link>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        statusConfig[lead.status].color,
                        statusConfig[lead.status].bgColor
                      )}
                    >
                      {statusConfig[lead.status].label}
                    </Badge>
                    {lead.prioridade && lead.prioridade !== 'media' && (
                      <Badge variant="outline" className={cn('text-xs', priorityConfig[lead.prioridade].color)}>
                        {priorityConfig[lead.prioridade].label}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {lead.empresa && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {lead.empresa}
                      </span>
                    )}
                    {lead.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {lead.email}
                      </span>
                    )}
                    {lead.telefone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {lead.telefone}
                      </span>
                    )}
                  </div>

                  {lead.valor_estimado && (
                    <p className="text-sm font-medium text-green-500 mt-1">
                      {formatCurrency(lead.valor_estimado)}
                    </p>
                  )}
                </div>

                <div className="text-right hidden md:block">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">Score</span>
                    <span className="text-sm font-semibold">{lead.score || 0}</span>
                  </div>
                  <Progress value={lead.score || 0} className="h-1.5 w-20" />
                </div>

                <div className="text-right text-xs text-muted-foreground hidden lg:block">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(lead.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/leads/${lead.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditDialog(lead)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    {lead.whatsapp && (
                      <DropdownMenuItem asChild>
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          WhatsApp
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <AdminConfirmDialog
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      }
                      title="Excluir lead?"
                      description={`Tem certeza que deseja excluir "${lead.nome}"? Esta ação não pode ser desfeita.`}
                      confirmLabel="Excluir"
                      variant="danger"
                      onConfirm={() => deleteMutation.mutate(lead.id)}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || !!editingLead}
        onOpenChange={(open) => !open && resetForm()}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingLead ? 'Editar Lead' : 'Novo Lead'}</DialogTitle>
            <DialogDescription>
              {editingLead
                ? 'Atualize as informações do lead'
                : 'Preencha as informações do novo lead'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome completo"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                value={formData.empresa || ''}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone || ''}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp || ''}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="5511999999999"
              />
            </div>
            <div>
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                value={formData.cargo || ''}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                placeholder="Cargo/Função"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status || 'novo'}
                onValueChange={(value) => setFormData({ ...formData, status: value as LeadStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([value, config]) => (
                    <SelectItem key={value} value={value}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select
                value={formData.prioridade || 'media'}
                onValueChange={(value) => setFormData({ ...formData, prioridade: value as PriorityLevel })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(priorityConfig).map(([value, config]) => (
                    <SelectItem key={value} value={value}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="valor">Valor Estimado</Label>
              <Input
                id="valor"
                type="number"
                value={formData.valor_estimado || ''}
                onChange={(e) =>
                  setFormData({ ...formData, valor_estimado: parseFloat(e.target.value) || null })
                }
                placeholder="0.00"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes || ''}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Anotações sobre o lead..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
            <Button
              onClick={editingLead ? handleUpdate : handleCreate}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {editingLead ? 'Salvar' : 'Criar Lead'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
