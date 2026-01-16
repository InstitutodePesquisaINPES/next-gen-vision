import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SignatureCanvas } from "./SignatureCanvas";
import { toast } from "sonner";
import { Loader2, Shield, CheckCircle } from "lucide-react";

interface SignatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId: string;
  documentTitle: string;
  onSuccess?: () => void;
}

export function SignatureDialog({
  open,
  onOpenChange,
  documentId,
  documentTitle,
  onSuccess,
}: SignatureDialogProps) {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<"info" | "signature" | "success">("info");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    documento: "",
    aceiteTermos: false,
  });

  const signMutation = useMutation({
    mutationFn: async () => {
      if (!signatureData) throw new Error("Assinatura não capturada");

      // Generate signature hash
      const hashInput = `${documentId}${formData.nome}${formData.documento}${new Date().toISOString()}`;
      const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(hashInput)
      );
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

      // Get user IP (simplified - in production use edge function)
      let ipAddress = "unknown";
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } catch {
        // Ignore IP fetch errors
      }

      // Insert signature record
      const { error: sigError } = await supabase
        .from("document_signatures")
        .insert({
          document_id: documentId,
          tipo_assinante: "cliente",
          nome_assinante: formData.nome,
          email_assinante: formData.email || null,
          documento_assinante: formData.documento || null,
          assinatura_imagem: signatureData,
          assinatura_hash: hashHex,
          ip_address: ipAddress,
          user_agent: navigator.userAgent,
        });

      if (sigError) throw sigError;

      // Update document status
      const { error: docError } = await supabase
        .from("generated_documents")
        .update({
          status: "assinado",
          assinado_por: formData.nome,
          assinado_em: new Date().toISOString(),
          assinatura_hash: hashHex,
          assinatura_ip: ipAddress,
          assinatura_data: {
            nome: formData.nome,
            email: formData.email,
            documento: formData.documento,
            data: new Date().toISOString(),
          },
        })
        .eq("id", documentId);

      if (docError) throw docError;

      return hashHex;
    },
    onSuccess: (hash) => {
      queryClient.invalidateQueries({ queryKey: ["document", documentId] });
      setStep("success");
      toast.success("Documento assinado com sucesso!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error("Erro ao assinar documento");
      console.error(error);
    },
  });

  const handleSignatureSave = (data: string) => {
    setSignatureData(data);
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.aceiteTermos) return;
    setStep("signature");
  };

  const handleConfirmSignature = () => {
    if (!signatureData) {
      toast.error("Por favor, desenhe sua assinatura");
      return;
    }
    signMutation.mutate();
  };

  const resetDialog = () => {
    setStep("info");
    setSignatureData(null);
    setFormData({ nome: "", email: "", documento: "", aceiteTermos: false });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {step === "info" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Assinatura Digital
              </DialogTitle>
              <DialogDescription>
                Preencha seus dados para assinar o documento "{documentTitle}"
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitInfo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documento">CPF/CNPJ</Label>
                <Input
                  id="documento"
                  value={formData.documento}
                  onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="aceite"
                  checked={formData.aceiteTermos}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, aceiteTermos: checked as boolean })
                  }
                />
                <Label htmlFor="aceite" className="text-sm leading-tight">
                  Declaro que li o documento e concordo com todos os termos apresentados.
                  Entendo que esta assinatura digital tem validade jurídica.
                </Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!formData.nome || !formData.aceiteTermos}>
                  Continuar
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "signature" && (
          <>
            <DialogHeader>
              <DialogTitle>Desenhe sua Assinatura</DialogTitle>
              <DialogDescription>
                Use o mouse ou toque para desenhar sua assinatura no campo abaixo
              </DialogDescription>
            </DialogHeader>

            <SignatureCanvas
              onSave={handleSignatureSave}
              onClear={() => setSignatureData(null)}
              title="Sua Assinatura"
              description={`Assinando como: ${formData.nome}`}
            />

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep("info")}>
                Voltar
              </Button>
              <Button
                onClick={handleConfirmSignature}
                disabled={!signatureData || signMutation.isPending}
              >
                {signMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Assinando...
                  </>
                ) : (
                  "Confirmar e Assinar"
                )}
              </Button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Documento Assinado!</h3>
              <p className="text-muted-foreground mt-1">
                Sua assinatura foi registrada com sucesso.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-sm">
              <p className="font-medium">Informações da Assinatura:</p>
              <p className="text-muted-foreground mt-1">
                Assinado por: {formData.nome}
              </p>
              <p className="text-muted-foreground">
                Data: {new Date().toLocaleString("pt-BR")}
              </p>
            </div>
            <Button onClick={resetDialog} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
