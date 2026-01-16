import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VixioLogo } from "@/components/brand/VixioLogo";
import { Shield, CheckCircle, XCircle, Search, Loader2, FileText, User, Calendar, Hash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ValidateDocument = () => {
  const [code, setCode] = useState("");
  const [searchCode, setSearchCode] = useState("");

  const { data: document, isLoading, isError } = useQuery({
    queryKey: ["validate-document", searchCode],
    queryFn: async () => {
      if (!searchCode) return null;

      const { data, error } = await supabase
        .from("generated_documents")
        .select("id, titulo, status, codigo_validacao, assinado_por, assinado_em, assinatura_hash, created_at")
        .eq("codigo_validacao", searchCode.toUpperCase())
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!searchCode,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCode(code.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container max-w-2xl mx-auto py-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <VixioLogo variant="full" size="lg" className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Validação de Documento</h1>
          <p className="text-muted-foreground">
            Verifique a autenticidade de documentos assinados digitalmente
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Validar Documento
            </CardTitle>
            <CardDescription>
              Digite o código de validação presente no documento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Ex: A1B2C3D4"
                className="flex-1 font-mono text-lg tracking-wider"
                maxLength={8}
              />
              <Button type="submit" disabled={!code.trim() || isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Validar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {searchCode && !isLoading && (
          <Card>
            <CardContent className="pt-6">
              {document ? (
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div className={`rounded-lg p-6 text-center ${
                    document.status === "assinado" 
                      ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" 
                      : "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                  }`}>
                    {document.status === "assinado" ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                          Documento Válido e Assinado
                        </h3>
                        <p className="text-green-600 dark:text-green-400 mt-1">
                          Este documento foi assinado digitalmente e é autêntico.
                        </p>
                      </>
                    ) : (
                      <>
                        <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
                          Documento Encontrado
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 mt-1">
                          Este documento é válido mas ainda não foi assinado.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Document Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Título do Documento</p>
                        <p className="font-medium">{document.titulo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Hash className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Código de Validação</p>
                        <p className="font-mono font-medium">{document.codigo_validacao}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Data de Criação</p>
                        <p className="font-medium">
                          {format(new Date(document.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </div>

                    {document.assinado_por && (
                      <>
                        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Assinado por</p>
                            <p className="font-medium">{document.assinado_por}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Data da Assinatura</p>
                            <p className="font-medium">
                              {document.assinado_em && format(new Date(document.assinado_em), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                            </p>
                          </div>
                        </div>

                        {document.assinatura_hash && (
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Hash de Verificação</p>
                            <p className="font-mono text-xs break-all">{document.assinatura_hash}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Security Notice */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      <Shield className="h-3 w-3 inline mr-1" />
                      Verificação realizada em {format(new Date(), "dd/MM/yyyy 'às' HH:mm")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-red-700 dark:text-red-300">
                    Documento Não Encontrado
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    O código informado não corresponde a nenhum documento válido.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Verifique se o código foi digitado corretamente.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Sistema de validação de documentos digitais</p>
          <p className="mt-1">Vixio © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default ValidateDocument;
