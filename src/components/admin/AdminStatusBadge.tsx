import { cn } from '@/lib/utils';

type Status = 'active' | 'inactive' | 'pending' | 'error' | 'success';

interface AdminStatusBadgeProps {
  status: Status;
  label?: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: {
    label: 'Ativo',
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  inactive: {
    label: 'Inativo',
    className: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  },
  pending: {
    label: 'Pendente',
    className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  },
  error: {
    label: 'Erro',
    className: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  success: {
    label: 'Sucesso',
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
};

export function AdminStatusBadge({ status, label, size = 'md' }: AdminStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75',
            status === 'active' && 'animate-ping bg-green-500',
            status === 'pending' && 'animate-ping bg-yellow-500'
          )}
        />
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            status === 'active' && 'bg-green-500',
            status === 'inactive' && 'bg-gray-400',
            status === 'pending' && 'bg-yellow-500',
            status === 'error' && 'bg-red-500',
            status === 'success' && 'bg-green-500'
          )}
        />
      </span>
      {label || config.label}
    </span>
  );
}
