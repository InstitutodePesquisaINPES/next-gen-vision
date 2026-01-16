import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'bg-muted/50 text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-green-500/10 text-green-500',
  warning: 'bg-yellow-500/10 text-yellow-500',
  danger: 'bg-red-500/10 text-red-500',
};

export function AdminStatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  variant = 'primary',
}: AdminStatsCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm',
        'hover:border-primary/30 transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <span
                className={cn(
                  'text-xs font-medium px-1.5 py-0.5 rounded',
                  trend.isPositive
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', variantStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
