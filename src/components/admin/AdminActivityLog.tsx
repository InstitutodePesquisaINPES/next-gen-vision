import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  FileText, 
  Users, 
  Settings, 
  Navigation, 
  Shield,
  Clock,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface ActivityItem {
  id: string;
  type: 'content' | 'user' | 'settings' | 'navigation' | 'auth';
  action: string;
  description: string;
  user?: string;
  timestamp: string;
}

interface AdminActivityLogProps {
  activities: ActivityItem[];
  maxHeight?: string;
  emptyMessage?: string;
}

const typeIcons: Record<ActivityItem['type'], LucideIcon> = {
  content: FileText,
  user: Users,
  settings: Settings,
  navigation: Navigation,
  auth: Shield,
};

const typeColors: Record<ActivityItem['type'], string> = {
  content: 'bg-blue-500/10 text-blue-500',
  user: 'bg-purple-500/10 text-purple-500',
  settings: 'bg-green-500/10 text-green-500',
  navigation: 'bg-orange-500/10 text-orange-500',
  auth: 'bg-red-500/10 text-red-500',
};

export function AdminActivityLog({ 
  activities, 
  maxHeight = '400px',
  emptyMessage = 'Nenhuma atividade recente'
}: AdminActivityLogProps) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ScrollArea className={cn('pr-4')} style={{ maxHeight }}>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = typeIcons[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className={cn('p-2 rounded-lg flex-shrink-0', typeColors[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  {activity.user && (
                    <>
                      <span>{activity.user}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>
                    {formatDistanceToNow(new Date(activity.timestamp), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
