import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdminCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  icon?: LucideIcon;
  footer?: ReactNode;
}

export function AdminCard({ title, description, children, className, headerAction, icon: Icon, footer }: AdminCardProps) {
  return (
    <Card className={cn('glass-card border-border/50', className)}>
      {(title || description) && (
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              {title && <CardTitle className="text-lg">{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
          {headerAction}
        </CardHeader>
      )}
      <CardContent className={!title && !description ? 'pt-6' : ''}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="border-t border-border/50 pt-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
