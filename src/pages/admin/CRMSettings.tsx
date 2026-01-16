import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Save, 
  Eye, 
  EyeOff, 
  Settings2, 
  TestTube,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface CRMSetting {
  id: string;
  chave: string;
  valor: any;
  descricao: string | null;
  categoria: string | null;
}

const CRMSettings = () => {
  const queryClient = useQueryClient();
  const [showToken, setShowToken] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [settings, setSettings] = useState({
    whatsapp_access_token: '',
    whatsapp_phone_number_id: '',
    whatsapp_enabled: false,
    whatsapp_default_template: 'Olá {{nome}}, tudo bem? Sou da Vixio e gostaria de conversar sobre {{assunto}}.',
  });

  const { data: crmSettings, isLoading } = useQuery({
    queryKey: ['crm-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crm_settings')
        .select('*')
        .eq('categoria', 'whatsapp');
      
      if (error) throw error;
      return data as CRMSetting[];
    },
  });

  // Load settings into state
  useEffect(() => {
    if (crmSettings) {
      const newSettings = { ...settings };
      crmSettings.forEach((setting) => {
        if (setting.chave in newSettings) {
          const value = setting.valor;
          if (setting.chave === 'whatsapp_enabled') {
            (newSettings as any)[setting.chave] = value === true || value === 'true';
          } else if (typeof value === 'string') {
            (newSettings as any)[setting.chave] = value;
          }
        }
      });
      setSettings(newSettings);
    }
  }, [crmSettings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const settingsToSave = [
        { chave: 'whatsapp_access_token', valor: settings.whatsapp_access_token, descricao: 'Token de acesso da API do WhatsApp Business' },
        { chave: 'whatsapp_phone_number_id', valor: settings.whatsapp_phone_number_id, descricao: 'ID do número de telefone do WhatsApp Business' },
        { chave: 'whatsapp_enabled', valor: settings.whatsapp_enabled, descricao: 'Integração WhatsApp ativada' },
        { chave: 'whatsapp_default_template', valor: settings.whatsapp_default_template, descricao: 'Template padrão de mensagem' },
      ];

      for (const setting of settingsToSave) {
        const existing = crmSettings?.find(s => s.chave === setting.chave);
        
        if (existing) {
          const { error } = await supabase
            .from('crm_settings')
            .update({ valor: setting.valor, updated_at: new Date().toISOString() })
            .eq('id', existing.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('crm_settings')
            .insert({
              chave: setting.chave,
              valor: setting.valor,
              descricao: setting.descricao,
              categoria: 'whatsapp',
            });
          
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crm-settings'] });
      toast.success('Configurações salvas com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao salvar configurações');
      console.error(error);
    },
  });

  const testConnection = async () => {
    if (!settings.whatsapp_access_token || !settings.whatsapp_phone_number_id) {
      toast.error('Preencha o token e o ID do telefone para testar');
      return;
    }

    setTestingConnection(true);
    setConnectionStatus('idle');

    try {
      const response = await supabase.functions.invoke('send-whatsapp', {
        body: {
          action: 'test',
          accessToken: settings.whatsapp_access_token,
          phoneNumberId: settings.whatsapp_phone_number_id,
        },
      });

      if (response.error) {
        throw response.error;
      }

      setConnectionStatus('success');
      toast.success('Conexão com WhatsApp Business API válida!');
    } catch (error: any) {
      setConnectionStatus('error');
      toast.error('Falha na conexão: ' + (error.message || 'Verifique suas credenciais'));
    } finally {
      setTestingConnection(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Configurações do CRM"
        description="Configure integrações e preferências do CRM"
      />

      <div className="space-y-6">
        {/* WhatsApp Integration */}
        <Card className="glass-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Integração WhatsApp Business</CardTitle>
              <CardDescription>Configure a API do WhatsApp Business para enviar mensagens diretamente do CRM</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enable/Disable */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Ativar integração</Label>
                <p className="text-sm text-muted-foreground">
                  Permite enviar mensagens do WhatsApp diretamente pela página do lead
                </p>
              </div>
              <Switch
                checked={settings.whatsapp_enabled}
                onCheckedChange={(checked) => setSettings({ ...settings, whatsapp_enabled: checked })}
              />
            </div>

            {/* Access Token */}
            <div className="space-y-2">
              <Label htmlFor="access-token">Access Token</Label>
              <div className="relative">
                <Input
                  id="access-token"
                  type={showToken ? 'text' : 'password'}
                  value={settings.whatsapp_access_token}
                  onChange={(e) => setSettings({ ...settings, whatsapp_access_token: e.target.value })}
                  placeholder="EAAxxxxxxxx..."
                  className="pr-10 font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Token de acesso permanente da API do WhatsApp Business. 
                <a 
                  href="https://developers.facebook.com/docs/whatsapp/business-management-api/get-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Saiba como obter
                </a>
              </p>
            </div>

            {/* Phone Number ID */}
            <div className="space-y-2">
              <Label htmlFor="phone-id">Phone Number ID</Label>
              <Input
                id="phone-id"
                value={settings.whatsapp_phone_number_id}
                onChange={(e) => setSettings({ ...settings, whatsapp_phone_number_id: e.target.value })}
                placeholder="123456789012345"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                ID do número de telefone configurado no WhatsApp Business
              </p>
            </div>

            {/* Default Template */}
            <div className="space-y-2">
              <Label htmlFor="template">Template padrão de mensagem</Label>
              <Textarea
                id="template"
                value={settings.whatsapp_default_template}
                onChange={(e) => setSettings({ ...settings, whatsapp_default_template: e.target.value })}
                placeholder="Olá {{nome}}, ..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Use {"{{nome}}"}, {"{{empresa}}"}, {"{{assunto}}"} para variáveis dinâmicas
              </p>
            </div>

            {/* Test Connection */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                onClick={testConnection}
                disabled={testingConnection || !settings.whatsapp_access_token}
              >
                {testingConnection ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <TestTube className="w-4 h-4 mr-2" />
                )}
                Testar conexão
              </Button>
              
              {connectionStatus === 'success' && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Conexão válida
                </span>
              )}
              
              {connectionStatus === 'error' && (
                <span className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  Falha na conexão
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* General CRM Settings */}
        <Card className="glass-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Configurações Gerais</CardTitle>
              <CardDescription>Preferências gerais do CRM</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground py-4">
              Mais configurações serão adicionadas em breve...
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            size="lg"
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar configurações
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CRMSettings;
