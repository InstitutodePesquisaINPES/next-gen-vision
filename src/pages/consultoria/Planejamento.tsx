import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Target, Compass, Map, Flag, 
  ChevronRight, CheckCircle2, Lightbulb, Rocket,
  BarChart3, Users, TrendingUp, Zap, Eye, Crosshair,
  Layers, GitBranch, Clock, Award, Building2, Cog,
  PieChart, Brain, Shield, FileText, Network, Timer,
  MessageSquare, Calendar, Gauge, AlertCircle, CheckSquare,
  Lock, Workflow, LineChart
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// ============================================
// DADOS E CONFIGURAÇÕES
// ============================================

const strategicServices = [
  {
    icon: Compass,
    title: "Diagnóstico Estratégico 360°",
    description: "Análise profunda e estruturada do cenário atual, combinando dados quantitativos com insights qualitativos para fundamentar a estratégia.",
    capabilities: [
      "Análise SWOT quantificada com scores de impacto",
      "Benchmarking competitivo com métricas comparativas",
      "Mapeamento de mercado com análise de forças competitivas",
      "Gap Analysis entre estado atual e desejado",
      "Voice of Customer (VoC) e análise de NPS",
      "Assessment de maturidade organizacional"
    ],
    deliverables: ["Relatório de Diagnóstico", "Mapa de Oportunidades", "Heat Map de Riscos"]
  },
  {
    icon: Target,
    title: "Definição de Metas e KPIs",
    description: "Estabelecimento de objetivos mensuráveis e indicadores-chave alinhados à visão estratégica e cascateados pela organização.",
    capabilities: [
      "Framework OKR com cascateamento organizacional",
      "Balanced Scorecard customizado por área",
      "North Star Metric e métricas de suporte",
      "Leading vs Lagging Indicators estruturados",
      "Dashboards executivos em tempo real",
      "Rituais de acompanhamento e governança"
    ],
    deliverables: ["Mapa Estratégico", "Dashboard de KPIs", "Playbook de Governança"]
  },
  {
    icon: Map,
    title: "Roadmap Estratégico",
    description: "Planejamento de iniciativas, priorização baseada em impacto e cronogramas de execução com alocação de recursos.",
    capabilities: [
      "Priorização com framework RICE/ICE",
      "Mapeamento de dependências e riscos",
      "Alocação de recursos e orçamento",
      "Milestone Planning com gates de validação",
      "Scenario Planning para contingências",
      "Integração com portfolio de projetos"
    ],
    deliverables: ["Roadmap Visual", "Business Cases", "Plano de Recursos"]
  },
  {
    icon: Rocket,
    title: "Gestão de Mudança e Execução",
    description: "Acompanhamento da implementação estratégica com framework de change management e garantia de adoção.",
    capabilities: [
      "Change Management com modelo ADKAR",
      "Stakeholder Mapping e plano de engajamento",
      "Comunicação estratégica multi-canal",
      "Programa de capacitação e upskilling",
      "Quick wins para momentum inicial",
      "Feedback loops e ajustes contínuos"
    ],
    deliverables: ["Change Roadmap", "Training Plan", "Calendário de Comunicação"]
  },
];

const frameworks = [
  { 
    name: "OKRs", 
    fullName: "Objectives & Key Results",
    description: "Framework de metas cascateadas com foco em resultados",
    origin: "Intel / Google",
    useCase: "Alinhamento organizacional"
  },
  { 
    name: "Balanced Scorecard", 
    fullName: "BSC - Kaplan & Norton",
    description: "4 perspectivas estratégicas integradas",
    origin: "Harvard Business School",
    useCase: "Visão holística de performance"
  },
  { 
    name: "5 Forças de Porter", 
    fullName: "Análise Competitiva",
    description: "Análise de forças de mercado e posicionamento",
    origin: "Michael Porter",
    useCase: "Posicionamento competitivo"
  },
  { 
    name: "Blue Ocean", 
    fullName: "Estratégia do Oceano Azul",
    description: "Criação de novos mercados não contestados",
    origin: "INSEAD",
    useCase: "Inovação em valor"
  },
  { 
    name: "Business Model Canvas", 
    fullName: "BMC - Osterwalder",
    description: "9 blocos do modelo de negócio",
    origin: "Strategyzer",
    useCase: "Design de modelos de negócio"
  },
  { 
    name: "Jobs to Be Done", 
    fullName: "JTBD Framework",
    description: "Foco no trabalho que o cliente quer realizar",
    origin: "Clayton Christensen",
    useCase: "Inovação centrada no cliente"
  },
];

const processPhases = [
  {
    phase: "01",
    name: "Discovery",
    duration: "2-3 semanas",
    title: "Imersão e Diagnóstico",
    description: "Entendimento profundo do negócio, contexto competitivo e aspirações dos stakeholders.",
    activities: [
      "Entrevistas executivas (C-Level, diretoria)",
      "Análise de dados internos e externos",
      "Workshops de alinhamento estratégico",
      "Benchmark competitivo detalhado",
      "Voice of Customer qualitativo"
    ],
    outputs: [
      "Relatório de Discovery",
      "Stakeholder Map",
      "SWOT Quantificado",
      "Síntese de Insights"
    ]
  },
  {
    phase: "02",
    name: "Strategy",
    duration: "3-4 semanas",
    title: "Formulação Estratégica",
    description: "Definição da visão, objetivos estratégicos e iniciativas prioritárias com validação.",
    activities: [
      "Workshop de visão e ambição",
      "Definição de pilares estratégicos",
      "Priorização de iniciativas (RICE)",
      "Modelagem financeira de cenários",
      "Validação com stakeholders-chave"
    ],
    outputs: [
      "Estratégia Documentada",
      "OKRs Definidos",
      "Portfolio de Iniciativas",
      "Business Cases"
    ]
  },
  {
    phase: "03",
    name: "Planning",
    duration: "2-3 semanas",
    title: "Planejamento Tático",
    description: "Detalhamento do roadmap, recursos necessários e plano de execução operacional.",
    activities: [
      "Detalhamento de iniciativas",
      "Alocação de recursos e budget",
      "Definição de milestones e gates",
      "Setup de governança e rituais",
      "Preparação de change management"
    ],
    outputs: [
      "Roadmap Detalhado",
      "Plano de Recursos",
      "Governance Framework",
      "Change Roadmap"
    ]
  },
  {
    phase: "04",
    name: "Execution",
    duration: "Contínuo",
    title: "Execução e Acompanhamento",
    description: "Implementação com suporte contínuo, rituais de acompanhamento e ajustes baseados em resultados.",
    activities: [
      "Kick-off com equipes de execução",
      "Reuniões semanais de progresso",
      "Reviews mensais com liderança",
      "Troubleshooting de bloqueios",
      "Ajustes baseados em resultados"
    ],
    outputs: [
      "Reports de Progresso",
      "Dashboards Atualizados",
      "Lessons Learned",
      "Roadmap Atualizado"
    ]
  },
];

const differentiators = [
  {
    icon: Brain,
    title: "Estratégia Orientada por Dados",
    description: "Diferente de consultorias tradicionais, cada recomendação é fundamentada em dados. Utilizamos análises quantitativas, modelagem de cenários e simulações para reduzir viés e aumentar assertividade."
  },
  {
    icon: Cog,
    title: "Execução Integrada",
    description: "Não entregamos apenas um plano em PowerPoint. Acompanhamos a execução, ajudamos a destravar bloqueios e garantimos que a estratégia saia do papel e gere resultados reais."
  },
  {
    icon: Users,
    title: "Engajamento Real",
    description: "Metodologia participativa que envolve todos os níveis da organização. Estratégia construída junto, não imposta de fora, garantindo ownership e adoção."
  },
  {
    icon: TrendingUp,
    title: "Foco em Resultados",
    description: "Métricas de sucesso definidas desde o início. ROI calculado e acompanhado. Remuneração atrelada à entrega de valor real mensurável."
  },
  {
    icon: Lock,
    title: "Confidencialidade Total",
    description: "Todos os projetos são conduzidos sob rigorosos acordos de confidencialidade. Suas estratégias e dados permanecem absolutamente sigilosos."
  },
];

const successMetrics = [
  { value: "300+", label: "Estratégias Implementadas", description: "Em diversos setores" },
  { value: "87%", label: "Metas Atingidas", description: "No primeiro ano" },
  { value: "3.5x", label: "ROI Médio", description: "Retorno sobre investimento" },
  { value: "NPS 72", label: "Satisfação de Clientes", description: "Promotores ativos" },
];

const typicalEngagements = [
  {
    title: "Planejamento Estratégico Anual",
    duration: "8-12 semanas",
    scope: "Ciclo completo de planejamento",
    activities: ["Diagnóstico", "Formulação", "Desdobramento", "Acompanhamento trimestral"]
  },
  {
    title: "Estratégia de Crescimento",
    duration: "6-10 semanas",
    scope: "Foco em expansão e scale-up",
    activities: ["Market sizing", "Go-to-market", "Pricing strategy", "Sales playbook"]
  },
  {
    title: "Transformação Digital",
    duration: "12-20 semanas",
    scope: "Roadmap de digitalização",
    activities: ["Assessment digital", "Priorização", "Quick wins", "Roadmap 24 meses"]
  },
  {
    title: "M&A Strategy",
    duration: "4-8 semanas",
    scope: "Due diligence estratégica",
    activities: ["Fit analysis", "Synergy mapping", "Integration plan", "Value capture"]
  },
];

const industries = [
  { name: "Saúde e Pharma", icon: "🏥" },
  { name: "Varejo e E-commerce", icon: "🛒" },
  { name: "Serviços Financeiros", icon: "🏦" },
  { name: "Tecnologia e SaaS", icon: "💻" },
  { name: "Indústria e Manufatura", icon: "🏭" },
  { name: "Educação", icon: "🎓" },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function Planejamento() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Strategic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/consultoria" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 hover:bg-primary/20 transition-colors"
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
              <span className="text-foreground">Planejamento</span>{" "}
              <span className="gradient-text-purple">
                Estratégico
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Transforme visão em execução com metodologias comprovadas. 
              Combinamos frameworks de estratégia com análise de dados para construir 
              planos que geram resultados mensuráveis e sustentáveis.
            </motion.p>

            {/* Confidentiality Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
            >
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Todos os projetos sob rigorosa confidencialidade</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Agendar Workshop Estratégico
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg"
                asChild
              >
                <Link to="/portfolio">Ver Cases</Link>
              </Button>
            </motion.div>

            {/* Success Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {successMetrics.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-card/50 border border-border/30">
                  <div className="text-2xl md:text-3xl font-bold gradient-text-purple">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-6">
            <span className="text-sm text-muted-foreground">Experiência em diversos setores</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-muted/30 border border-border/50"
              >
                <span className="text-xl">{industry.icon}</span>
                <span className="text-sm font-medium text-foreground">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços"
            title="Consultoria"
            titleHighlight="Estratégica"
            description="Apoio completo desde o diagnóstico até a implementação e acompanhamento de resultados."
          />

          <div className="mt-16 space-y-8">
            {strategicServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 md:p-10"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="p-4 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                      <service.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-3 text-muted-foreground">{service.description}</p>
                    <div className="mt-6">
                      <h5 className="text-xs font-semibold text-primary mb-2">ENTREGÁVEIS</h5>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((d, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
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

      {/* Frameworks Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Frameworks"
            title="Metodologias"
            titleHighlight="Consagradas"
            description="Utilizamos os frameworks mais reconhecidos do mercado, adaptados ao seu contexto."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6 hover-lift"
              >
                <h4 className="text-lg font-bold text-foreground">{framework.name}</h4>
                <p className="text-xs text-primary mt-1">{framework.fullName}</p>
                <p className="text-sm text-muted-foreground mt-3">{framework.description}</p>
                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-xs">
                  <span className="text-muted-foreground">{framework.origin}</span>
                  <span className="text-primary font-medium">{framework.useCase}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Jornada"
            titleHighlight="Estratégica"
            description="Uma metodologia estruturada e iterativa para garantir resultados consistentes."
          />

          <div className="mt-12 space-y-6">
            {processPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-bold gradient-text-purple">{phase.phase}</span>
                      <div>
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">{phase.name}</span>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {phase.duration}
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-foreground">{phase.title}</h4>
                    <p className="text-sm text-muted-foreground mt-2">{phase.description}</p>
                  </div>
                  <div className="lg:w-3/4 grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-3">ATIVIDADES</h5>
                      <div className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-accent mb-3">ENTREGÁVEIS</h5>
                      <div className="flex flex-wrap gap-2">
                        {phase.outputs.map((output, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            {output}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Engagements */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Projetos"
            title="Tipos de"
            titleHighlight="Engajamento"
            description="Formatos flexíveis adaptados às suas necessidades e contexto organizacional."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {typicalEngagements.map((engagement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h4 className="text-lg font-bold text-foreground">{engagement.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  {engagement.duration}
                </div>
                <p className="text-sm text-muted-foreground mt-3">{engagement.scope}</p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-1.5">
                    {engagement.activities.map((activity, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-muted/50 text-foreground text-xs">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Diferenciais"
            title="Por que escolher a"
            titleHighlight="Vixio"
            description="Combinamos rigor analítico com pragmatismo de execução para entregar resultados reais."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 md:p-16 text-center relative overflow-hidden"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">100% Confidencial</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pronto para transformar visão em <span className="gradient-text-purple">resultados</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Agende um workshop estratégico com nossos consultores e descubra como 
                podemos acelerar sua jornada de crescimento.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="px-8" asChild>
                  <Link to="/contato">
                    Agendar Workshop
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/consultoria">Ver Outras Especializações</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
