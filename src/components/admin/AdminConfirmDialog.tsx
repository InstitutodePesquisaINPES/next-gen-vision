import { ReactNode } from 'react';
import { AlertTriangle, Trash2, Info } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

type DialogVariant = 'danger' | 'warning' | 'info';

interface AdminConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: DialogVariant;
  onConfirm: () => void;
  isLoading?: boolean;
}

const variantConfig: Record<DialogVariant, { icon: typeof AlertTriangle; className: string }> = {
  danger: {
    icon: Trash2,
    className: 'bg-red-500 hover:bg-red-600 text-white',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  },
  info: {
    icon: Info,
    className: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
};

export function AdminConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  onConfirm,
  isLoading = false,
}: AdminConfirmDialogProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'p-2 rounded-lg',
                variant === 'danger' && 'bg-red-500/10 text-red-500',
                variant === 'warning' && 'bg-yellow-500/10 text-yellow-500',
                variant === 'info' && 'bg-blue-500/10 text-blue-500'
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="mt-3">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className={config.className}
          >
            {isLoading ? 'Processando...' : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
