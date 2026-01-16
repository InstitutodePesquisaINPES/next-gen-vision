import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdminCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function AdminCard({ title, description, children, className, headerAction }: AdminCardProps) {
  return (
    <Card className={cn('glass-card border-border/50', className)}>
      {(title || description) && (
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction}
        </CardHeader>
      )}
      <CardContent className={!title && !description ? 'pt-6' : ''}>
        {children}
      </CardContent>
    </Card>
  );
}
