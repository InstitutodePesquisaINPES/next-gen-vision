import { useState } from 'react';
import { MessageCircle, Send, Loader2, AlertCircle, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WhatsAppDialogProps {
  leadId: string;
  leadName: string;
  phoneNumber?: string | null;
  whatsapp?: string | null;
}

const messageTemplates = [
  {
    id: 'greeting',
    name: 'Saudação Inicial',
    message: 'Olá {nome}! Sou da Vixio e gostaria de conversar sobre como podemos ajudar sua empresa.',
  },
  {
    id: 'followup',
    name: 'Follow-up',
    message: 'Olá {nome}! Passando para dar continuidade à nossa conversa. Tem alguma dúvida que eu possa esclarecer?',
  },
  {
    id: 'proposal',
    name: 'Envio de Proposta',
    message: 'Olá {nome}! Conforme combinado, estou enviando nossa proposta comercial. Fico à disposição para qualquer esclarecimento.',
  },
  {
    id: 'meeting',
    name: 'Agendamento de Reunião',
    message: 'Olá {nome}! Gostaria de agendar uma reunião para apresentar nossas soluções. Qual o melhor horário para você?',
  },
  {
    id: 'custom',
    name: 'Mensagem Personalizada',
    message: '',
  },
];

export function WhatsAppDialog({ leadId, leadName, phoneNumber, whatsapp }: WhatsAppDialogProps) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('greeting');
  const [message, setMessage] = useState(messageTemplates[0].message.replace('{nome}', leadName));
  const [phone, setPhone] = useState(whatsapp || phoneNumber || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.message.replace('{nome}', leadName));
    }
    setError(null);
    setSuccess(false);
  };

  const handleSend = async () => {
    if (!phone) {
      setError('Número de telefone é obrigatório');
      return;
    }
    if (!message.trim()) {
      setError('A mensagem não pode estar vazia');
      return;
    }

    setError(null);
    setSending(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('send-whatsapp', {
        body: {
          leadId,
          phoneNumber: phone,
          message: message.trim(),
        },
      });

      if (fnError) throw fnError;
      
      if (data?.setup_required) {
        setError('As credenciais do WhatsApp Business API não estão configuradas. Configure WHATSAPP_ACCESS_TOKEN e WHATSAPP_PHONE_NUMBER_ID nas secrets do projeto.');
        return;
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      setSuccess(true);
      toast.success('Mensagem enviada com sucesso!');
      
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setMessage(messageTemplates[0].message.replace('{nome}', leadName));
        setSelectedTemplate('greeting');
      }, 1500);

    } catch (err: any) {
      console.error('WhatsApp send error:', err);
      setError(err.message || 'Erro ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  const contactNumber = whatsapp || phoneNumber;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20"
          disabled={!contactNumber}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-500" />
            Enviar WhatsApp
          </DialogTitle>
          <DialogDescription>
            Envie uma mensagem para {leadName} via WhatsApp Business API
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-500/10 border-green-500/30 text-green-600">
              <Check className="h-4 w-4" />
              <AlertDescription>Mensagem enviada com sucesso!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Número de Telefone</Label>
            <Input
              placeholder="+55 11 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Inclua o código do país (ex: +55 para Brasil)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Template de Mensagem</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {messageTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mensagem</Label>
            <Textarea
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {message.length} caracteres
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={sending || !phone || !message.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
