import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, GraduationCap, Target, BookOpen, Users, 
  ChevronRight, Check, Lightbulb, BarChart3, Brain,
  ClipboardCheck, Presentation, Award, Calendar, Lock,
  TrendingUp, Settings, MessageSquare, Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const services = [
  {
    icon: ClipboardCheck,
    anchorId: "diagnostico-empresarial",
    title: "Diagnóstico Empresarial & Organizacional",
    description: "Avaliação técnica e estratégica da empresa antes de qualquer decisão crítica.",
    capabilities: [
      "Diagnóstico de maturidade em dados",
      "Diagnóstico de processos e fluxos",
      "Diagnóstico de gestão, indicadores e governança",
      "Diagnóstico para adoção de sistemas e IA",
      "Assessment de cultura organizacional",
      "Gap analysis e roadmap de evolução",
    ],
    color: "rose",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: BookOpen,
    anchorId: "capacitacoes-in-company",
    title: "Capacitações & Formação In Company",
    description: "Programas sob medida para equipes técnicas, gestores e liderança.",
    capabilities: [
      "Leitura e interpretação de dados",
      "Indicadores, KPIs e dashboards executivos",
      "Bioestatística aplicada à gestão e saúde",
      "Uso estratégico de IA e automação",
      "Planejamento estratégico orientado por evidências",
      "Tomada de decisão baseada em dados",
    ],
    color: "rose",
    gradient: "from-pink-500 to-fuchsia-500",
  },
  {
    icon: Presentation,
    anchorId: "workshops-executivos",
    title: "Workshops Estratégicos & Executivos",
    description: "Intervenções de curta duração, focadas em decisão e alinhamento.",
    capabilities: [
      "Workshops de planejamento estratégico",
      "Alinhamento de liderança com dados",
      "Tomada de decisão baseada em evidências",
      "Estratégia, risco e cenário",
      "Definição de OKRs e métricas",
      "Design de cultura data-driven",
    ],
    color: "rose",
    gradient: "from-fuchsia-500 to-purple-500",
  },
];

const diagnosticTypes = [
  {
    title: "Maturidade em Dados",
    description: "Avaliação do nível de utilização de dados na tomada de decisão",
    deliverables: ["Relatório de maturidade", "Benchmark setorial", "Roadmap de evolução"],
  },
  {
    title: "Processos e Fluxos",
    description: "Mapeamento e análise de processos operacionais e de gestão",
    deliverables: ["Mapa de processos", "Identificação de gargalos", "Recomendações de melhoria"],
  },
  {
    title: "Governança e Indicadores",
    description: "Avaliação da estrutura de gestão, KPIs e governança corporativa",
    deliverables: ["Assessment de governança", "Análise de KPIs", "Framework recomendado"],
  },
  {
    title: "Prontidão para Tecnologia",
    description: "Avaliação da organização para adoção de sistemas e IA",
    deliverables: ["Diagnóstico de prontidão", "Riscos identificados", "Plano de preparação"],
  },
];

const trainingPrograms = [
  {
    title: "Fundamentos de Dados para Gestores",
    duration: "8h",
    format: "Presencial ou Online",
    audience: "Gerentes e Coordenadores",
  },
  {
    title: "Dashboards e Indicadores Executivos",
    duration: "16h",
    format: "Presencial",
    audience: "Liderança e C-Level",
  },
  {
    title: "Bioestatística para Saúde",
    duration: "24h",
    format: "Presencial ou Híbrido",
    audience: "Profissionais de Saúde",
  },
  {
    title: "IA e Automação na Prática",
    duration: "12h",
    format: "Online",
    audience: "Equipes Técnicas e Gestores",
  },
  {
    title: "Planejamento Estratégico Data-Driven",
    duration: "16h",
    format: "Presencial",
    audience: "Diretoria e C-Level",
  },
  {
    title: "Cultura de Dados na Organização",
    duration: "8h",
    format: "Workshop",
    audience: "Toda a organização",
  },
];

const differentiators = [
  {
    icon: Brain,
    title: "Expertise Técnica + Didática",
    description: "Equipe com experiência real de mercado e habilidade para ensinar de forma clara e aplicável.",
  },
  {
    icon: Target,
    title: "Foco em Aplicação",
    description: "Conteúdo 100% prático, com casos reais e exercícios aplicáveis ao contexto do cliente.",
  },
  {
    icon: Settings,
    title: "Personalização Total",
    description: "Programas desenhados para as necessidades específicas de cada organização.",
  },
  {
    icon: TrendingUp,
    title: "Mensuração de Impacto",
    description: "Avaliação de resultados e acompanhamento pós-capacitação.",
  },
];

const journeySteps = [
  {
    step: "01",
    title: "Diagnóstico",
    description: "Avaliamos o estado atual da organização",
  },
  {
    step: "02",
    title: "Desenho",
    description: "Projetamos o programa ideal",
  },
  {
    step: "03",
    title: "Execução",
    description: "Realizamos a capacitação ou workshop",
  },
  {
    step: "04",
    title: "Acompanhamento",
    description: "Medimos resultados e ajustamos",
  },
];

export default function EducacaoIndex() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Educação Corporativa & Diagnóstico Estratégico
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Preparar para</span>{" "}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                Decidir
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Antes de analisar, desenvolver ou implantar tecnologia, avaliamos se a organização 
              está preparada — e capacitamos as pessoas para sustentar a decisão.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Solicitar Diagnóstico
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços"
            title="O que"
            titleHighlight="Oferecemos"
            description="Diagnóstico, capacitação e formação executiva para organizações que buscam maturidade analítica."
          />

          <div className="mt-16 space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                id={service.anchorId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 md:p-10"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-10 w-fit mb-4`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-3 text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <Check className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Types */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Diagnósticos"
            title="Tipos de"
            titleHighlight="Diagnóstico"
            description="Avaliações especializadas para diferentes dimensões da organização."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diagnosticTypes.map((diagnostic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="text-lg font-bold text-foreground mb-2">{diagnostic.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{diagnostic.description}</p>
                <div className="space-y-1.5">
                  {diagnostic.deliverables.map((deliverable, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-rose-400" />
                      {deliverable}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="capacitacoes" className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Capacitações"
            title="Programas de"
            titleHighlight="Formação"
            description="Treinamentos estruturados para diferentes níveis e necessidades."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div id="formacao-liderancas" className="sr-only" />
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h4 className="font-bold text-foreground mb-3">{program.title}</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-rose-400" />
                    {program.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-rose-400" />
                    {program.format}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-rose-400" />
                    {program.audience}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Jornada"
            title="Como"
            titleHighlight="Trabalhamos"
            description="Processo estruturado para garantir resultados."
          />

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-rose-500/50 to-transparent z-0" />
                )}
                <div className="glass-card p-6 relative z-10">
                  <div className="text-4xl font-bold text-rose-400/20 mb-2">{step.step}</div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Diferenciais"
            title="Por que"
            titleHighlight="Escolher a Vixio"
            description="O que nos torna únicos em educação corporativa e diagnóstico."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4">
                  <diff.icon className="w-7 h-7 text-rose-400" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{diff.title}</h4>
                <p className="text-sm text-muted-foreground">{diff.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-fuchsia-500/20 p-12 md:p-16"
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Sua organização está{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  preparada?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Solicite um diagnóstico inicial gratuito e descubra o nível de maturidade 
                da sua organização em dados e tomada de decisão.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Solicitar Diagnóstico
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
