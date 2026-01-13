import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Building2, Car, Code2, HeartPulse, MessageSquare, Rocket, ShoppingBag, Star, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const sistemasAreas = [
  {
    id: "whatsapp-secretaria",
    icon: Bot,
    title: "Secretária Eletrônica WhatsApp",
    description: "Atendimento automatizado inteligente 24/7 com IA conversacional integrada ao WhatsApp Business.",
    link: "/sistemas/whatsapp-secretaria",
    hot: true,
  },
  {
    id: "gestao-atendimento",
    icon: MessageSquare,
    title: "Gestão de Atendimento",
    description: "Plataforma completa de atendimento multicanal, CRM integrado e automações - muito além do Chatwoot.",
    link: "/sistemas/gestao-atendimento",
    hot: true,
  },
  {
    id: "clinicas-saude",
    icon: HeartPulse,
    title: "Sistemas para Clínicas",
    description: "Prontuário eletrônico, agendamento inteligente, gestão financeira e relatórios para área da saúde.",
    link: "/sistemas/clinicas",
  },
  {
    id: "frota",
    icon: Car,
    title: "Gestão de Frotas",
    description: "Controle completo de veículos, motoristas, manutenções, rotas e custos operacionais.",
    link: "/sistemas/frota",
  },
  {
    id: "mentoria",
    icon: Users,
    title: "Plataforma de Mentoria",
    description: "Sistema completo para mentores: agendamento, videochamadas, trilhas de aprendizado e pagamentos.",
    link: "/sistemas/mentoria",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "Loja Virtual & E-commerce",
    description: "Plataformas de vendas online personalizadas com checkout, gestão de estoque e integrações.",
    link: "/sistemas/ecommerce",
  },
  {
    id: "fidelizacao",
    icon: Star,
    title: "Programas de Fidelização",
    description: "Sistemas de pontos, cashback, clubes de vantagens e gamificação para engajar clientes.",
    link: "/sistemas/fidelizacao",
  },
  {
    id: "tfd",
    icon: Building2,
    title: "TFD para Prefeituras",
    description: "Sistema de Tratamento Fora do Domicílio para gestão de pacientes em deslocamento pelo SUS.",
    link: "/sistemas/tfd",
    gov: true,
  },
];

const diferenciais = [
  { icon: Zap, label: "Entregas Ágeis" },
  { icon: Code2, label: "Código Moderno" },
  { icon: Rocket, label: "100% Personalizado" },
  { icon: Users, label: "Suporte Dedicado" },
];

export default function SistemasIndex() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <Code2 className="w-4 h-4" />
              Mundo Sistemas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Sistemas{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 bg-clip-text text-transparent">
              Inteligentes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Soluções personalizadas, modernas e eficientes para resolver problemas 
            reais do seu negócio. Desenvolvemos sistemas sob medida com agilidade 
            e tecnologia de ponta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {diferenciais.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Systems Grid Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Nossas Soluções"
            title="Sistemas para Cada"
            titleHighlight="Necessidade"
            description="Explore nosso catálogo de sistemas e encontre a solução perfeita para o seu desafio."
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sistemasAreas.map((sistema, index) => (
              <motion.div
                key={sistema.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  to={sistema.link}
                  className="group relative block glass-card p-6 h-full hover-lift transition-all duration-300 hover:border-primary/50"
                >
                  {sistema.hot && (
                    <span className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold">
                      HOT
                    </span>
                  )}
                  {sistema.gov && (
                    <span className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">
                      GOV
                    </span>
                  )}
                  
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors w-fit">
                    <sistema.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {sistema.title}
                  </h3>
                  
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {sistema.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    Conhecer
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions CTA */}
      <section className="section-padding bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 md:p-16 text-center border-primary/20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Solução Personalizada
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Não encontrou o que procura?
            </h2>
            
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              Desenvolvemos sistemas 100% personalizados para atender às 
              necessidades específicas do seu negócio. Da ideia ao deploy em 
              semanas, não meses.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground px-8 glow-primary"
                asChild
              >
                <Link to="/contato">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50"
                asChild
              >
                <Link to="/">Voltar ao Início</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
