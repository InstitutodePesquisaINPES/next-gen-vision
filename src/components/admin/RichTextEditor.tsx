import { useRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Heading3,
  Link as LinkIcon, Image, Code, Quote, Undo, Redo, Type, Minus
} from 'lucide-react';
import {
  Popover, PopoverContent, PopoverTrigger
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

interface ToolbarButton {
  icon: typeof Bold;
  command: string;
  arg?: string;
  title: string;
}

const toolbarGroups: ToolbarButton[][] = [
  [
    { icon: Undo, command: 'undo', title: 'Desfazer' },
    { icon: Redo, command: 'redo', title: 'Refazer' },
  ],
  [
    { icon: Bold, command: 'bold', title: 'Negrito' },
    { icon: Italic, command: 'italic', title: 'Itálico' },
    { icon: Underline, command: 'underline', title: 'Sublinhado' },
    { icon: Strikethrough, command: 'strikeThrough', title: 'Tachado' },
  ],
  [
    { icon: Heading1, command: 'formatBlock', arg: 'h1', title: 'Título 1' },
    { icon: Heading2, command: 'formatBlock', arg: 'h2', title: 'Título 2' },
    { icon: Heading3, command: 'formatBlock', arg: 'h3', title: 'Título 3' },
    { icon: Type, command: 'formatBlock', arg: 'p', title: 'Parágrafo' },
  ],
  [
    { icon: AlignLeft, command: 'justifyLeft', title: 'Alinhar à esquerda' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Centralizar' },
    { icon: AlignRight, command: 'justifyRight', title: 'Alinhar à direita' },
  ],
  [
    { icon: List, command: 'insertUnorderedList', title: 'Lista' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Lista numerada' },
    { icon: Quote, command: 'formatBlock', arg: 'blockquote', title: 'Citação' },
    { icon: Code, command: 'formatBlock', arg: 'pre', title: 'Código' },
    { icon: Minus, command: 'insertHorizontalRule', title: 'Linha horizontal' },
  ],
];

export function RichTextEditor({ value, onChange, placeholder = 'Comece a escrever...', minHeight = '300px', className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const exec = useCallback((command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    // Trigger onChange
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertLink = () => {
    if (linkUrl) {
      exec('createLink', linkUrl);
      setLinkUrl('');
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      exec('insertImage', imageUrl);
      setImageUrl('');
    }
  };

  return (
    <div className={cn('border border-border rounded-lg overflow-hidden bg-background', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-muted/30">
        {toolbarGroups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5">
            {gi > 0 && <div className="w-px h-6 bg-border mx-1" />}
            {group.map((btn) => {
              const Icon = btn.icon;
              return (
                <Button
                  key={btn.command + (btn.arg || '')}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title={btn.title}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (btn.arg && btn.command === 'formatBlock') {
                      exec(btn.command, `<${btn.arg}>`);
                    } else {
                      exec(btn.command, btn.arg);
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        ))}

        {/* Link */}
        <div className="w-px h-6 bg-border mx-1" />
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" title="Inserir link">
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <Label className="text-xs">URL do link</Label>
            <div className="flex gap-2 mt-1">
              <Input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..." className="h-8 text-sm" />
              <Button size="sm" className="h-8" onClick={insertLink}>OK</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Image */}
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" title="Inserir imagem">
              <Image className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <Label className="text-xs">URL da imagem</Label>
            <div className="flex gap-2 mt-1">
              <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." className="h-8 text-sm" />
              <Button size="sm" className="h-8" onClick={insertImage}>OK</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="prose prose-sm dark:prose-invert max-w-none p-4 outline-none overflow-y-auto"
        style={{ minHeight }}
        onInput={handleInput}
        onBlur={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
        [contenteditable] img {
          max-width: 100%;
          border-radius: 0.5rem;
        }
        [contenteditable] a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }
        [contenteditable] blockquote {
          border-left: 3px solid hsl(var(--primary));
          padding-left: 1rem;
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  );
}
