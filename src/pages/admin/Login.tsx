import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User, Loader2, Shield, BarChart3, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VixioLogo } from '@/components/brand/VixioLogo';
import { useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Email inválido').max(255, 'Email muito longo'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(100, 'Senha muito longa'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido').max(255, 'Email muito longo'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(100, 'Senha muito longa'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

const features = [
  {
    icon: BarChart3,
    title: 'Analytics Avançado',
    description: 'Métricas e insights em tempo real'
  },
  {
    icon: FileText,
    title: 'Gestão de Documentos',
    description: 'Contratos e propostas digitais'
  },
  {
    icon: Users,
    title: 'CRM Integrado',
    description: 'Pipeline de vendas completo'
  },
  {
    icon: Shield,
    title: 'Segurança Enterprise',
    description: 'Controle de acesso por roles'
  }
];

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAdminAuthContext();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    const { error } = await signIn(data.email, data.password);
    setIsLoading(false);

    if (error) {
      toast.error(error.message || 'Erro ao fazer login');
      return;
    }

    toast.success('Login realizado com sucesso!');
    navigate('/admin');
  };

  const onSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    const { error } = await signUp(data.email, data.password, data.fullName);
    setIsLoading(false);

    if (error) {
      if (error.message.includes('already registered')) {
        toast.error('Este email já está cadastrado.');
      } else {
        toast.error(error.message || 'Erro ao criar conta');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background dark flex">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-dark" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Orbs */}
        <div className="absolute top-20 right-20 w-[400px] h-[400px] orb-primary animate-pulse-glow" />
        <div className="absolute bottom-40 left-20 w-[300px] h-[300px] orb-accent animate-pulse-glow animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] orb-blue animate-pulse-glow animation-delay-600" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          {/* Logo & Title */}
          <div>
            <VixioLogo variant="full" size="lg" />
            <div className="mt-8 space-y-3">
              <h1 className="text-4xl xl:text-5xl font-bold tracking-tight">
                <span className="text-foreground">Plataforma de</span>
                <br />
                <span className="gradient-text-purple">Gestão Executiva</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Centralize operações, automatize processos e tome decisões baseadas em dados.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6 my-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-5 rounded-xl glass-card card-glow transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>Ambiente seguro com criptografia de ponta a ponta</span>
            </div>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Vixio. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative">
        {/* Mobile background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 orb-primary animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 orb-accent animate-pulse-glow animation-delay-400" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <VixioLogo variant="full" size="md" />
          </div>

          <Card className="glass-card border-border/40 shadow-2xl">
            <CardHeader className="text-center space-y-2 pb-6">
              <div className="lg:hidden flex justify-center mb-2">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Painel Administrativo
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Acesse para gerenciar sua operação
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                  <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Cadastrar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-0">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Email corporativo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="seu@empresa.com"
                                  className="pl-11 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="••••••••"
                                  className="pl-11 pr-11 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity glow-primary" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Autenticando...
                          </>
                        ) : (
                          'Acessar Painel'
                        )}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                      Esqueceu sua senha?
                    </button>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-0">
                  <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                      <FormField
                        control={signUpForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Nome completo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Seu nome"
                                  className="pl-11 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Email corporativo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="seu@empresa.com"
                                  className="pl-11 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="Mínimo 6 caracteres"
                                  className="pl-11 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Confirmar senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="Repita a senha"
                                  className="pl-11 h-12 bg-muted/30 border-border/50 focus:border-primary focus:ring-primary/20"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity glow-primary" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Criando conta...
                          </>
                        ) : (
                          'Criar Conta'
                        )}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-xs text-muted-foreground text-center">
                      Após o cadastro, um administrador deve aprovar sua conta e atribuir as permissões necessárias.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Bottom info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground/60">
              Ambiente protegido • SSL/TLS • LGPD Compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
