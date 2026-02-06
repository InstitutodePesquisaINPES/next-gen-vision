import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from 'lucide-react';

interface LivePreviewProps {
  path: string;
  className?: string;
}

const viewports = [
  { icon: Monitor, label: 'Desktop', width: '100%' },
  { icon: Tablet, label: 'Tablet', width: '768px' },
  { icon: Smartphone, label: 'Mobile', width: '375px' },
] as const;

export function LivePreview({ path, className }: LivePreviewProps) {
  const [visible, setVisible] = useState(false);
  const [viewport, setViewport] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const previewUrl = `${window.location.origin}${path}`;

  if (!visible) {
    return (
      <Button variant="outline" size="sm" onClick={() => setVisible(true)} className={className}>
        <Eye className="h-4 w-4 mr-2" />
        Preview ao Vivo
      </Button>
    );
  }

  return (
    <div className={cn('border border-border rounded-xl overflow-hidden bg-card', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Preview</span>
        </div>
        <div className="flex items-center gap-1">
          {viewports.map((vp, i) => {
            const Icon = vp.icon;
            return (
              <Button
                key={i}
                variant={viewport === i ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7"
                title={vp.label}
                onClick={() => setViewport(i)}
              >
                <Icon className="h-3.5 w-3.5" />
              </Button>
            );
          })}
          <div className="w-px h-5 bg-border mx-1" />
          <Button variant="ghost" size="icon" className="h-7 w-7" title="Recarregar" onClick={() => setRefreshKey(k => k + 1)}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" title="Abrir em nova aba" onClick={() => window.open(previewUrl, '_blank')}>
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" title="Fechar" onClick={() => setVisible(false)}>
            <EyeOff className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* iframe */}
      <div className="flex justify-center bg-muted/10 p-4" style={{ minHeight: '500px' }}>
        <iframe
          key={refreshKey}
          src={previewUrl}
          className="border border-border/50 rounded-lg bg-white dark:bg-background shadow-lg transition-all duration-300"
          style={{ width: viewports[viewport].width, height: '500px', maxWidth: '100%' }}
          title="Preview ao vivo"
        />
      </div>
    </div>
  );
}
