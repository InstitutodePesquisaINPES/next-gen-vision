import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Brain, 
  Target, 
  Users, 
  Microscope, 
  Heart, 
  Fingerprint, 
  UserCheck, 
  BarChart3, 
  CheckCircle2,
  Building2,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const consultoriaAreas = [
  {
    id: "data-science",
    icon: Brain,
    title: "Machine Learning & IA",
    subtitle: "Modelos Preditivos • IA Generativa • MLOps",
    description: "Desenvolvimento e deploy de modelos de machine learning em produção, desde a prototipagem até a operacionalização escalável.",
    link: "/consultoria/data-science",
  },
  {
    id: "bioestatistica",
    icon: Microscope,
    title: "Bioestatística",
    subtitle: "Ensaios Clínicos • Epidemiologia • Regulatório",
    description: "Rigor científico em análises estatísticas para saúde, pesquisa clínica e submissões regulatórias.",
    link: "/consultoria/bioestatistica",
  },
  {
    id: "behavioral",
    icon: Heart,
    title: "Análise Comportamental",
    subtitle: "Vieses Cognitivos • Psicometria • Decisão",
    description: "Entenda como o comportamento humano impacta seus dados e descubra insights além da estatística tradicional.",
    link: "/consultoria/behavioral",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics & BI",
    subtitle: "Dashboards • Visualização • Self-Service",
    description: "Dashboards estratégicos, automação de relatórios e cultura de dados para tomada de decisão ágil.",
    link: "/consultoria/analytics",
  },
  {
    id: "planejamento",
    icon: Target,
    title: "Planejamento Estratégico",
    subtitle: "OKRs • BSC • Roadmaps",
    description: "Planejamento estratégico orientado por evidências, com metodologias comprovadas e métricas claras.",
    link: "/consultoria/planejamento",
  },
  {
    id: "people",
    icon: UserCheck,
    title: "People Analytics",
    subtitle: "RH Estratégico • Turnover • Engajamento",
    description: "Inteligência de capital humano: predição de turnover, análise de clima e otimização de gestão de pessoas.",
    link: "/consultoria/people-analytics",
  },
  {
    id: "customer",
    icon: Fingerprint,
    title: "Customer Intelligence",
    subtitle: "CDP • LTV • Churn Prediction",
    description: "Visão 360° do cliente: segmentação avançada, lifetime value e predição de churn para retenção inteligente.",
    link: "/consultoria/customer-intelligence",
  },
];

const stats = [
  { value: "150+", label: "Projetos Entregues" },
  { value: "7", label: "Especializações" },
  { value: "98%", label: "Satisfação" },
  { value: "12+", label: "Anos de Experiência" },
];

const diferenciais = [
  { icon: Award, text: "Metodologia científica rigorosa" },
  { icon: Users, text: "Equipe multidisciplinar especializada" },
  { icon: Building2, text: "Atendimento corporativo dedicado" },
  { icon: CheckCircle2, text: "Resultados mensuráveis garantidos" },
];

export default function ConsultoriaIndex() {
  return (
    <Layout>
      {/* Hero Section - Clean & Executive */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Brain className="w-4 h-4" />
                Consultoria Especializada
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight"
            >
              <span className="text-foreground">Ciência de Dados &</span>
              <br />
              <span className="gradient-text-purple">Inteligência Estratégica</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto"
            >
              Transformamos dados complexos em decisões estratégicas através de 
              metodologias científicas e análises rigorosas.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="px-8" asChild>
                <Link to="/contato">
                  Agendar Reunião
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#servicos">Ver Especializações</a>
              </Button>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section-padding bg-card/30">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nossas Especializações
            </h2>
            <p className="mt-4 text-muted-foreground">
              Soluções completas em inteligência de dados para empresas que buscam 
              resultados mensuráveis e vantagem competitiva.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultoriaAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={area.link}
                  className="group flex flex-col h-full p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-200"
                >
                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary">
                      <area.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {area.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {area.description}
                  </p>

                  {/* Link */}
                  <div className="mt-4 pt-4 border-t border-border/30 flex items-center text-sm font-medium text-primary">
                    Ver detalhes
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Por que escolher a Vixio?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Combinamos expertise técnica com visão de negócio para entregar 
                soluções que geram impacto real e mensurável.
              </p>

              <div className="mt-8 space-y-4">
                {diferenciais.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/30"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-10 rounded-2xl bg-card border border-border/50"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
                100% Sigiloso
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Precisa de uma análise personalizada?
              </h3>
              <p className="mt-4 text-muted-foreground">
                Nossa equipe de especialistas está pronta para entender seu desafio 
                e propor soluções baseadas em evidências científicas.
              </p>

              <div className="mt-8 space-y-3">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/contato">
                    Agendar Consultoria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" className="w-full" asChild>
                  <Link to="/">Voltar ao Início</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
