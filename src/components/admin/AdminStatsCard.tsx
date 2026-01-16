import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
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
  size?: 'sm' | 'default';
}

const variantStyles = {
  default: {
    icon: 'bg-muted text-muted-foreground',
    gradient: 'from-muted/30 to-transparent',
  },
  primary: {
    icon: 'bg-primary/10 text-primary',
    gradient: 'from-primary/5 to-transparent',
  },
  success: {
    icon: 'bg-emerald-500/10 text-emerald-500',
    gradient: 'from-emerald-500/5 to-transparent',
  },
  warning: {
    icon: 'bg-amber-500/10 text-amber-500',
    gradient: 'from-amber-500/5 to-transparent',
  },
  danger: {
    icon: 'bg-red-500/10 text-red-500',
    gradient: 'from-red-500/5 to-transparent',
  },
};

export function AdminStatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  variant = 'primary',
  size = 'default',
}: AdminStatsCardProps) {
  const styles = variantStyles[variant];
  
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/50 bg-card',
        'hover:border-border hover:shadow-lg hover:shadow-black/5 transition-all duration-300',
        size === 'sm' ? 'p-4' : 'p-6',
        className
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-50',
        styles.gradient
      )} />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-3">
            <p className={cn(
              'font-bold text-foreground tracking-tight',
              size === 'sm' ? 'text-2xl' : 'text-3xl'
            )}>
              {value}
            </p>
            {trend && (
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full',
                  trend.isPositive
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-red-500/10 text-red-500'
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.isPositive ? '+' : ''}{trend.value}%
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn(
          'rounded-xl flex items-center justify-center shrink-0',
          styles.icon,
          size === 'sm' ? 'p-2.5' : 'p-3'
        )}>
          <Icon className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
        </div>
      </div>
    </div>
  );
}
