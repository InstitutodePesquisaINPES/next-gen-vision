import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppMessage {
  leadId: string;
  phoneNumber: string;
  message: string;
  templateName?: string;
  templateParams?: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
    const WHATSAPP_PHONE_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
      return new Response(
        JSON.stringify({ 
          error: "WhatsApp API credentials not configured",
          setup_required: true 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { leadId, phoneNumber, message, templateName, templateParams }: WhatsAppMessage = await req.json();

    // Format phone number (remove non-digits and ensure country code)
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    
    let requestBody: any;
    
    if (templateName) {
      // Template message (for marketing or transactional)
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
              parameters: templateParams.map(param => ({
                type: "text",
                text: param
              }))
            }
          ] : undefined
        }
      };
    } else {
      // Text message
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

    // Send message via WhatsApp Business API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", result);
      
      // Log failed interaction
      await supabase.from("lead_interactions").insert({
        lead_id: leadId,
        tipo: "whatsapp",
        titulo: "Mensagem WhatsApp (Falha)",
        descricao: `Falha ao enviar: ${result.error?.message || "Erro desconhecido"}`,
      });

      return new Response(
        JSON.stringify({ error: result.error?.message || "Failed to send message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log successful interaction
    await supabase.from("lead_interactions").insert({
      lead_id: leadId,
      tipo: "whatsapp",
      titulo: templateName ? `Template: ${templateName}` : "Mensagem WhatsApp",
      descricao: message || `Template ${templateName} enviado`,
    });

    // Update last contact date
    await supabase
      .from("leads")
      .update({ data_ultimo_contato: new Date().toISOString() })
      .eq("id", leadId);

    // Trigger webhooks
    await supabase.rpc("trigger_webhooks", {
      p_evento: "whatsapp_enviado",
      p_payload: {
        lead_id: leadId,
        phone: formattedPhone,
        message_id: result.messages?.[0]?.id,
        timestamp: new Date().toISOString()
      }
    });

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
