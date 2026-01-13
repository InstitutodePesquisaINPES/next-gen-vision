import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Target, Compass, Map, Flag, 
  ChevronRight, CheckCircle2, Lightbulb, Rocket,
  BarChart3, Users, TrendingUp, Zap, Eye, Crosshair,
  Layers, GitBranch, Clock, Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const services = [
  {
    icon: Compass,
    title: "Diagnóstico Estratégico",
    description: "Análise profunda do cenário atual, identificando forças, fraquezas, oportunidades e ameaças com base em dados.",
    features: ["Análise SWOT", "Benchmarking", "Mapeamento de Mercado", "Gap Analysis"]
  },
  {
    icon: Target,
    title: "Definição de Metas & KPIs",
    description: "Estabelecimento de objetivos SMART e indicadores-chave de performance alinhados à estratégia.",
    features: ["OKRs", "Balanced Scorecard", "Dashboards", "Métricas Customizadas"]
  },
  {
    icon: Map,
    title: "Roadmap Estratégico",
    description: "Planejamento de iniciativas, priorização de projetos e cronogramas de execução baseados em dados.",
    features: ["Priorização", "Timeline", "Recursos", "Dependências"]
  },
  {
    icon: Rocket,
    title: "Gestão de Mudança",
    description: "Acompanhamento da implementação estratégica com ajustes contínuos baseados em resultados.",
    features: ["Change Management", "Comunicação", "Treinamentos", "Monitoramento"]
  },
];

const frameworks = [
  { name: "OKRs", description: "Objectives & Key Results" },
  { name: "BSC", description: "Balanced Scorecard" },
  { name: "SWOT", description: "Análise Estratégica" },
  { name: "Porter", description: "5 Forças Competitivas" },
  { name: "Canvas", description: "Business Model Canvas" },
  { name: "Blue Ocean", description: "Estratégia do Oceano Azul" },
];

const benefits = [
  {
    icon: Eye,
    title: "Visão Clara",
    description: "Alinhamento organizacional com objetivos claros e mensuráveis."
  },
  {
    icon: Crosshair,
    title: "Foco em Resultados",
    description: "Priorização de iniciativas que geram maior impacto no negócio."
  },
  {
    icon: TrendingUp,
    title: "Crescimento Sustentável",
    description: "Estratégias baseadas em dados para crescimento de longo prazo."
  },
  {
    icon: Users,
    title: "Engajamento",
    description: "Times alinhados e motivados com metas claras e alcançáveis."
  },
];

const process = [
  { 
    phase: "Fase 1", 
    title: "Descoberta",
    duration: "2-3 semanas",
    description: "Entendimento profundo do negócio, entrevistas com stakeholders e coleta de dados."
  },
  { 
    phase: "Fase 2", 
    title: "Análise",
    duration: "2-3 semanas",
    description: "Processamento de dados, benchmarking competitivo e identificação de oportunidades."
  },
  { 
    phase: "Fase 3", 
    title: "Estratégia",
    duration: "2-4 semanas",
    description: "Definição de objetivos, KPIs e roadmap com priorização baseada em impacto."
  },
  { 
    phase: "Fase 4", 
    title: "Implementação",
    duration: "Contínuo",
    description: "Acompanhamento, ajustes e suporte para execução estratégica."
  },
];

export default function Planejamento() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        {/* Strategic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/consultoria" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-8 hover:bg-amber-500/20 transition-colors"
              >
                <Target className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Planejamento Estratégico
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Planejamento</span>{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Estratégico
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Transforme visão em execução. Metodologias comprovadas e análise de dados 
              para construir estratégias que geram resultados mensuráveis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Agendar Workshop
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500/50 text-lg"
                asChild
              >
                <Link to="/portfolio">Ver Cases</Link>
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { value: "200+", label: "Estratégias Implementadas" },
                { value: "85%", label: "Metas Atingidas" },
                { value: "3x", label: "ROI Médio" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-bold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços"
            title="Consultoria em"
            titleHighlight="Estratégia"
            description="Apoio completo desde o diagnóstico até a implementação e acompanhamento de resultados."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift group"
              >
                <div className="p-4 rounded-xl bg-amber-500/10 text-amber-400 w-fit group-hover:bg-amber-500/20 transition-colors">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Jornada"
            titleHighlight="Estratégica"
            description="Uma metodologia estruturada para garantir resultados consistentes."
          />

          <div className="mt-16 relative">
            {/* Vertical Line for Mobile, Horizontal for Desktop */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            
            <div className="grid md:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center mb-6">
                    <span className="text-lg font-bold text-amber-400">{index + 1}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-amber-400 font-medium mb-1">{item.phase}</div>
                    <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                    <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {item.duration}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologias"
            title="Frameworks"
            titleHighlight="Aplicados"
            description="Utilizamos as melhores práticas e metodologias reconhecidas globalmente."
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {frameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-5 text-center hover:border-amber-500/50 transition-colors"
              >
                <div className="text-lg font-bold text-foreground">{framework.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{framework.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
                  <Lightbulb className="w-4 h-4" />
                  Nosso Diferencial
                </span>
                <h3 className="text-3xl font-bold text-white">
                  Estratégia baseada em{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    dados reais
                  </span>
                </h3>
                <p className="mt-4 text-muted-foreground text-lg">
                  Diferente de consultorias tradicionais, combinamos visão estratégica 
                  com análise de dados avançada para decisões fundamentadas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                {[
                  "Análises quantitativas para embasar decisões",
                  "Dashboards em tempo real para acompanhamento",
                  "Modelos preditivos para cenários futuros",
                  "Integração com ciência de dados",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-muted/20 to-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/10 to-amber-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
                <Flag className="w-4 h-4" />
                Próximos Passos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para definir sua{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  estratégia?
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Agende um workshop estratégico gratuito e descubra como podemos 
                ajudar sua organização a alcançar novos patamares.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Workshop Gratuito
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500/50"
                  asChild
                >
                  <Link to="/consultoria">Ver Outras Áreas</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
