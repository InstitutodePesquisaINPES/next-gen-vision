import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Kanban,
  Plus,
  GripVertical,
  MoreHorizontal,
  Phone,
  Mail,
  Building2,
  Clock,
  TrendingUp,
  Loader2,
  Eye,
  Edit2,
  ChevronRight,
  DollarSign,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadStatus = Database['public']['Enums']['lead_status'];
type PipelineStage = Database['public']['Tables']['pipeline_stages']['Row'];

interface StageColumn {
  id: LeadStatus;
  name: string;
  color: string;
  leads: Lead[];
  value: number;
}

const statusToStage: Record<string, LeadStatus> = {
  'Novo Lead': 'novo',
  'Qualificado': 'qualificado',
  'Proposta Enviada': 'proposta_enviada',
  'Negociação': 'negociacao',
  'Fechado - Ganho': 'fechado_ganho',
  'Fechado - Perdido': 'fechado_perdido',
};

interface LeadCardProps {
  lead: Lead;
  isDragging?: boolean;
}

function LeadCard({ lead, isDragging }: LeadCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  const formatCurrency = (value: number | null) => {
    if (!value) return null;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'p-3 rounded-lg border border-border/50 bg-card',
        'hover:border-primary/30 hover:shadow-md transition-all duration-200',
        'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50 shadow-lg border-primary/50'
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {getInitials(lead.nome)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <Link
            to={`/admin/leads/${lead.id}`}
            className="font-medium text-sm text-foreground hover:text-primary transition-colors line-clamp-1"
            onClick={(e) => e.stopPropagation()}
          >
            {lead.nome}
          </Link>

          {lead.empresa && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Building2 className="h-3 w-3" />
              <span className="truncate">{lead.empresa}</span>
            </p>
          )}

          <div className="flex items-center justify-between mt-2">
            {lead.valor_estimado ? (
              <span className="text-xs font-semibold text-green-500">
                {formatCurrency(lead.valor_estimado)}
              </span>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-1">
              {lead.score !== null && lead.score > 0 && (
                <Badge variant="outline" className="text-[10px] h-5 px-1.5">
                  {lead.score}
                </Badge>
              )}
              <span className="text-[10px] text-muted-foreground">
                {formatDistanceToNow(new Date(lead.created_at), { locale: ptBR })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StageColumnProps {
  stage: StageColumn;
  isOver?: boolean;
}

function StageColumnComponent({ stage, isOver }: StageColumnProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className={cn(
        'flex flex-col w-72 shrink-0 rounded-xl border border-border/50 bg-muted/30',
        isOver && 'border-primary/50 bg-primary/5'
      )}
    >
      {/* Header */}
      <div className="p-3 border-b border-border/30">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <h3 className="font-semibold text-sm">{stage.name}</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {stage.leads.length}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          {formatCurrency(stage.value)}
        </p>
      </div>

      {/* Cards */}
      <ScrollArea className="flex-1 p-2" style={{ maxHeight: 'calc(100vh - 320px)' }}>
        <SortableContext
          items={stage.leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {stage.leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </SortableContext>

        {stage.leads.length === 0 && (
          <div className="py-8 text-center text-xs text-muted-foreground">
            Arraste leads aqui
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default function AdminPipeline() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Fetch leads
  const { data: leads, isLoading: leadsLoading } = useQuery({
    queryKey: ['leads-pipeline'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .not('status', 'eq', 'arquivado')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Lead[];
    },
  });

  // Fetch pipeline stages
  const { data: stages } = useQuery({
    queryKey: ['pipeline-stages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pipeline_stages')
        .select('*')
        .eq('is_active', true)
        .order('ordem');

      if (error) throw error;
      return data as PipelineStage[];
    },
  });

  // Update mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ leadId, status }: { leadId: string; status: LeadStatus }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads-pipeline'] });
      queryClient.invalidateQueries({ queryKey: ['crm-stats'] });
      toast.success('Status atualizado!');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar: ' + (error as Error).message);
    },
  });

  // Build columns
  const columns = useMemo((): StageColumn[] => {
    if (!stages || !leads) return [];

    return stages.map((stage) => {
      const status = statusToStage[stage.nome] || 'novo';
      const stageLeads = leads.filter((l) => l.status === status);
      const totalValue = stageLeads.reduce((sum, l) => sum + (l.valor_estimado || 0), 0);

      return {
        id: status,
        name: stage.nome,
        color: stage.cor,
        leads: stageLeads,
        value: totalValue,
      };
    });
  }, [stages, leads]);

  // Stats
  const stats = useMemo(() => {
    if (!leads) return { total: 0, value: 0, avgScore: 0 };

    const openLeads = leads.filter(
      (l) => !['fechado_ganho', 'fechado_perdido'].includes(l.status)
    );

    return {
      total: openLeads.length,
      value: openLeads.reduce((sum, l) => sum + (l.valor_estimado || 0), 0),
      avgScore: openLeads.length > 0
        ? Math.round(openLeads.reduce((sum, l) => sum + (l.score || 0), 0) / openLeads.length)
        : 0,
    };
  }, [leads]);

  const activeLead = activeId ? leads?.find((l) => l.id === activeId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const leadId = active.id as string;
    const overId = over.id as string;

    // Find which column the lead was dropped into
    const targetColumn = columns.find(
      (col) => col.leads.some((l) => l.id === overId) || col.id === overId
    );

    if (targetColumn) {
      const lead = leads?.find((l) => l.id === leadId);
      if (lead && lead.status !== targetColumn.id) {
        updateStatusMutation.mutate({ leadId, status: targetColumn.id });
      }
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Pipeline de Vendas"
        description="Acompanhe o progresso dos seus leads através do funil"
        icon={Kanban}
        actions={
          <Button asChild>
            <Link to="/admin/leads">
              <Plus className="h-4 w-4 mr-2" />
              Novo Lead
            </Link>
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Leads em aberto</span>
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Valor total</span>
          </div>
          <p className="text-2xl font-bold text-green-500">{formatCurrency(stats.value)}</p>
        </div>
        <div className="p-4 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Score médio</span>
          </div>
          <p className="text-2xl font-bold">{stats.avgScore}</p>
        </div>
      </div>

      {/* Kanban Board */}
      {leadsLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <StageColumnComponent key={column.id} stage={column} />
            ))}
          </div>

          <DragOverlay>
            {activeLead ? <LeadCard lead={activeLead} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* Legend */}
      <div className="mt-6 p-4 rounded-xl border border-border/50 bg-muted/30">
        <p className="text-sm text-muted-foreground">
          <strong>Dica:</strong> Arraste os cards entre as colunas para atualizar o status dos leads.
          Clique no nome do lead para ver mais detalhes.
        </p>
      </div>
    </AdminLayout>
  );
}
