import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Building2, Car, Code2, HeartPulse, MessageSquare, Rocket, ShoppingBag, Star, Users, Zap, Cloud, Server, Package, FileCode, Shield, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    description: "Plataforma completa de atendimento multicanal, CRM integrado e automações.",
    link: "/sistemas/gestao-atendimento",
    hot: true,
  },
  {
    id: "clinicas-saude",
    icon: HeartPulse,
    title: "Sistemas para Clínicas",
    description: "Prontuário eletrônico, agendamento inteligente e gestão financeira para saúde.",
    link: "/sistemas/clinicas",
  },
  {
    id: "frota",
    icon: Car,
    title: "Gestão de Frotas",
    description: "Controle completo de veículos, motoristas, manutenções e custos operacionais.",
    link: "/sistemas/frota",
  },
  {
    id: "mentoria",
    icon: Users,
    title: "Plataforma de Mentoria",
    description: "Sistema para mentores: agendamento, videochamadas e trilhas de aprendizado.",
    link: "/sistemas/mentoria",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "Loja Virtual & E-commerce",
    description: "Plataformas de vendas online com checkout, estoque e integrações.",
    link: "/sistemas/ecommerce",
  },
  {
    id: "fidelizacao",
    icon: Star,
    title: "Programas de Fidelização",
    description: "Sistemas de pontos, cashback e gamificação para engajar clientes.",
    link: "/sistemas/fidelizacao",
  },
  {
    id: "tfd",
    icon: Building2,
    title: "TFD para Prefeituras",
    description: "Sistema de Tratamento Fora do Domicílio para gestão pelo SUS.",
    link: "/sistemas/tfd",
    gov: true,
  },
];

const plataformasSaas = [
  {
    id: "funerallog",
    name: "FuneralLog",
    description: "Gestão inteligente de serviços funerários com controle completo de operações.",
    icon: Building2,
    gradient: "from-slate-500 to-gray-600",
  },
  {
    id: "velog",
    name: "VeloG",
    description: "Sistema de gestão de frotas e logística com rastreamento em tempo real.",
    icon: Car,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "tfd360",
    name: "TFD360",
    description: "Gestão completa de Tratamento Fora do Domicílio para prefeituras.",
    icon: HeartPulse,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "clinicflow",
    name: "ClinicFlow",
    description: "Gestão operacional completa para clínicas e consultórios médicos.",
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-500",
  },
];

const marketplaceItems = [
  {
    id: "codigo-fonte",
    icon: FileCode,
    title: "Código-Fonte Completo",
    description: "Aquisição de sistemas completos com documentação e suporte para customização.",
  },
  {
    id: "licenciamento",
    icon: Shield,
    title: "Licenciamento Comercial",
    description: "Licenças para uso comercial com atualizações e suporte técnico incluso.",
  },
  {
    id: "white-label",
    icon: Layers,
    title: "White Label",
    description: "Sistemas prontos para rebranding e revenda para empresas e integradores.",
  },
  {
    id: "apis",
    icon: Package,
    title: "APIs & Módulos",
    description: "Componentes e integrações profissionais para acelerar seu desenvolvimento.",
  },
];

const pillars = [
  { icon: Code2, title: "Sob Medida", description: "Sistemas personalizados" },
  { icon: Cloud, title: "Plataformas SaaS", description: "Prontos para usar" },
  { icon: Package, title: "Marketplace", description: "Código & licenças" },
];

const diferenciais = [
  { icon: Zap, label: "Entregas Ágeis" },
  { icon: Code2, label: "Código Moderno" },
  { icon: Rocket, label: "100% Personalizado" },
  { icon: Shield, label: "100% Sigiloso" },
];

export default function SistemasIndex() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
              <Code2 className="w-4 h-4" />
              Universo Sistemas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
          >
            <span className="text-white">Engenharia de</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              Sistemas Inteligentes
            </span>
          </motion.h1>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-6"
          >
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-muted/30 border border-border/50"
              >
                <pillar.icon className="w-5 h-5 text-purple-400" />
                <div className="text-left">
                  <span className="text-sm font-semibold text-foreground">{pillar.title}</span>
                  <p className="text-xs text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Desenvolvimento de sistemas personalizados, plataformas prontas para uso (SaaS) 
            e comercialização de código-fonte e soluções white label.
          </motion.p>

          {/* Diferenciais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {diferenciais.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-border/30"
              >
                <item.icon className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 shadow-lg shadow-purple-500/20"
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
              className="border-purple-500/50 hover:bg-purple-500/10"
              asChild
            >
              <a href="#sob-medida">Ver Soluções</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ========== SUBMUNDO 1: SISTEMAS SOB MEDIDA ========== */}
      <section id="sob-medida" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium">
              <Code2 className="w-4 h-4" />
              Submundo 1
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Sistemas{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sob Medida
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Soluções personalizadas projetadas a partir das regras, fluxos e necessidades específicas da sua organização.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sistemasAreas.map((sistema, index) => (
              <motion.div
                key={sistema.id}
                id={sistema.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  to={sistema.link}
                  className="group relative block glass-card card-shimmer p-6 h-full hover-lift transition-all duration-300 hover:border-purple-500/50"
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
                  
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors w-fit">
                    <sistema.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-purple-400 transition-colors">
                    {sistema.title}
                  </h3>
                  
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {sistema.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-purple-400 text-sm font-medium">
                    Conhecer
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SUBMUNDO 2: PLATAFORMAS SAAS ========== */}
      <section id="plataformas" className="section-padding bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
              <Cloud className="w-4 h-4" />
              Submundo 2
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Plataformas Digitais{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                & SaaS
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Sistemas profissionais testados e prontos para uso imediato, com contratação por licença ou modelo SaaS.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plataformasSaas.map((plataforma, index) => (
              <motion.div
                key={plataforma.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card card-shimmer p-6 hover-lift transition-all duration-300 hover:border-emerald-500/50"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${plataforma.gradient} bg-opacity-20 w-fit mb-4`}>
                  <plataforma.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                  {plataforma.name}
                </h3>
                
                <p className="mt-2 text-sm text-muted-foreground">
                  {plataforma.description}
                </p>
                
                <div className="mt-4 flex items-center text-emerald-400 text-sm font-medium">
                  Conhecer Plataforma
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              <Server className="inline w-4 h-4 mr-2" />
              Contrate, acesse e comece a usar — sem necessidade de desenvolvimento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== SUBMUNDO 3: MARKETPLACE ========== */}
      <section id="marketplace" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium">
              <Package className="w-4 h-4" />
              Submundo 3
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Marketplace de{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Sistemas & Código
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Comercialização de sistemas completos, APIs e arquiteturas profissionais para aquisição de código-fonte, licenciamento ou white label.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketplaceItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card card-shimmer p-6 hover-lift transition-all duration-300 hover:border-amber-500/50"
              >
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors w-fit">
                  <item.icon className="w-6 h-6" />
                </div>
                
                <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-card p-8 text-center border-amber-500/20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400">Negociação 100% sigilosa</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Aqui você não contrata serviço — você adquire tecnologia como ativo intelectual.
              Ideal para empresas, integradores e desenvolvedores que buscam acelerar seus projetos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" />
                Solução Personalizada
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Não encontrou o que procura?
              </h2>
              
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Desenvolvemos sistemas 100% personalizados para atender às 
                necessidades específicas do seu negócio. Da ideia ao deploy em 
                semanas, não meses.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 shadow-lg shadow-purple-500/20"
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
                  className="border-purple-500/50 hover:bg-purple-500/10"
                  asChild
                >
                  <Link to="/">Voltar ao Início</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
