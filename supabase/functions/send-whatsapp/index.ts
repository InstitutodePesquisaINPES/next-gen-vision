import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.json();
    const { action, accessToken, phoneNumberId, leadId, phoneNumber, message, templateName, templateParams, to } = body;

    // Get WhatsApp credentials from CRM settings if not provided
    let whatsappToken = accessToken;
    let whatsappPhoneId = phoneNumberId;

    if (!whatsappToken || !whatsappPhoneId) {
      const { data: settings } = await supabase
        .from('crm_settings')
        .select('chave, valor')
        .eq('categoria', 'whatsapp')
        .in('chave', ['whatsapp_access_token', 'whatsapp_phone_number_id', 'whatsapp_enabled']);

      const settingsMap = new Map(settings?.map(s => [s.chave, s.valor]) || []);
      
      const enabled = settingsMap.get('whatsapp_enabled');
      if (enabled !== true && enabled !== 'true' && action !== 'test') {
        return new Response(
          JSON.stringify({ error: "Integração WhatsApp não está ativada. Ative nas configurações do CRM." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      whatsappToken = whatsappToken || settingsMap.get('whatsapp_access_token');
      whatsappPhoneId = whatsappPhoneId || settingsMap.get('whatsapp_phone_number_id');
    }

    // Test connection action
    if (action === 'test') {
      if (!whatsappToken || !whatsappPhoneId) {
        return new Response(
          JSON.stringify({ error: "Token e Phone Number ID são obrigatórios para teste" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const testResponse = await fetch(
        `https://graph.facebook.com/v18.0/${whatsappPhoneId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${whatsappToken}`,
          },
        }
      );

      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        return new Response(
          JSON.stringify({ error: errorData.error?.message || "Credenciais inválidas" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Conexão válida" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send message action
    if (!whatsappToken || !whatsappPhoneId) {
      return new Response(
        JSON.stringify({ 
          error: "WhatsApp não configurado. Configure o token e Phone Number ID nas configurações do CRM.",
          setup_required: true 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const targetPhone = to || phoneNumber;
    if (!targetPhone || !message) {
      return new Response(
        JSON.stringify({ error: "Número de destino e mensagem são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format phone number (remove non-digits and ensure country code)
    let formattedPhone = targetPhone.replace(/\D/g, "");
    if (!formattedPhone.startsWith("55")) {
      formattedPhone = "55" + formattedPhone;
    }

    let requestBody: any;
    
    if (templateName) {
      requestBody = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone,
        type: "template",
        template: {
          name: templateName,
          language: { code: "pt_BR" },
          components: templateParams ? [
            {
              type: "body",
              parameters: templateParams.map((param: string) => ({
                type: "text",
                text: param
              }))
            }
          ] : undefined
        }
      };
    } else {
      requestBody = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone,
        type: "text",
        text: { 
          preview_url: true,
          body: message 
        }
      };
    }

    console.log(`Sending WhatsApp message to ${formattedPhone}`);

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${whatsappToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", result);
      
      if (leadId) {
        await supabase.from("lead_interactions").insert({
          lead_id: leadId,
          tipo: "whatsapp",
          titulo: "Mensagem WhatsApp (Falha)",
          descricao: `Falha ao enviar: ${result.error?.message || "Erro desconhecido"}`,
        });
      }

      return new Response(
        JSON.stringify({ error: result.error?.message || "Failed to send message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Message sent successfully:", result);

    if (leadId) {
      await supabase.from("lead_interactions").insert({
        lead_id: leadId,
        tipo: "whatsapp",
        titulo: templateName ? `Template: ${templateName}` : "Mensagem WhatsApp",
        descricao: message || `Template ${templateName} enviado`,
      });

      await supabase
        .from("leads")
        .update({ data_ultimo_contato: new Date().toISOString() })
        .eq("id", leadId);

      await supabase.rpc("trigger_webhooks", {
        p_evento: "whatsapp_enviado",
        p_payload: {
          lead_id: leadId,
          phone: formattedPhone,
          message_id: result.messages?.[0]?.id,
          timestamp: new Date().toISOString()
        }
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: result.messages?.[0]?.id,
        status: result.messages?.[0]?.message_status
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
