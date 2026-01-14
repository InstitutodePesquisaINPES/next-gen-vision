import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Brain, Heart, Users, Eye, 
  ChevronRight, CheckCircle2, Lightbulb, Target,
  BarChart3, TrendingUp, Zap, AlertCircle, Timer,
  Puzzle, Gauge, Network, MessageSquare, Compass,
  Activity, Binary, Sparkles, Shield, BookOpen,
  Scale, Microscope, FlaskConical, ThumbsUp, ThumbsDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const coreAreas = [
  {
    icon: Brain,
    title: "Economia Comportamental Aplicada",
    description: "Aplicação de princípios de economia comportamental para entender como vieses cognitivos afetam decisões de negócio.",
    capabilities: [
      "Mapeamento de vieses cognitivos em jornadas de decisão",
      "Análise de heurísticas (ancoragem, disponibilidade, representatividade)",
      "Design de nudges e arquitetura de escolha",
      "Quantificação do impacto de vieses em métricas de negócio",
      "Experimentos de racionalidade limitada",
      "Aplicação de Teoria dos Prospectos em precificação e ofertas"
    ],
    applications: ["Precificação", "Conversão", "Retenção", "Comunicação"]
  },
  {
    icon: Heart,
    title: "Análise Psicométrica",
    description: "Mensuração científica de construtos psicológicos como atitudes, personalidade e motivação.",
    capabilities: [
      "Desenvolvimento e validação de escalas psicométricas",
      "Análise fatorial exploratória e confirmatória (AFE/AFC)",
      "Teoria de Resposta ao Item (TRI)",
      "Análise de confiabilidade (Alfa, Ômega, CCI)",
      "Validade convergente, discriminante e preditiva",
      "Invariância de medida transcultural"
    ],
    applications: ["Pesquisa de Mercado", "Avaliação de Colaboradores", "Pesquisa de UX"]
  },
  {
    icon: Eye,
    title: "Análise de Comportamento do Consumidor",
    description: "Investigação profunda dos padrões de comportamento, motivações e processos decisórios dos clientes.",
    capabilities: [
      "Mapeamento da jornada de decisão do cliente com dados",
      "Análise de pontos de atrito e abandono comportamental",
      "Segmentação psicográfica baseada em valores e atitudes",
      "Análise de conjuntos de consideração e modelagem de escolha",
      "Gatilhos emocionais e racionais de compra",
      "Análise de momentos da verdade"
    ],
    applications: ["CX", "Produto", "Marketing", "Vendas"]
  },
  {
    icon: Puzzle,
    title: "Ciência do Comportamento Organizacional",
    description: "Análise de como o comportamento humano interno afeta performance, dados e resultados da empresa.",
    capabilities: [
      "Diagnóstico de cultura organizacional com dados",
      "Análise de vieses em processos decisórios internos",
      "Impacto de dinâmicas de grupo em performance",
      "Resistência à mudança e comportamento de adoção",
      "Liderança e influência baseada em evidências",
      "Cultura de segurança e comportamentos de risco"
    ],
    applications: ["RH", "Operações", "Gestão de Mudança", "Conformidade"]
  },
];

const behavioralBiases = [
  {
    category: "Vieses de Julgamento",
    biases: [
      { name: "Ancoragem", description: "Dependência excessiva da primeira informação", impact: "Pricing, Negociação" },
      { name: "Disponibilidade", description: "Superestimar eventos facilmente lembrados", impact: "Risk Assessment" },
      { name: "Representatividade", description: "Julgar probabilidade por similaridade", impact: "Segmentação" },
      { name: "Confirmação", description: "Buscar informações que confirmam crenças", impact: "Analytics" },
    ]
  },
  {
    category: "Vieses de Decisão",
    biases: [
      { name: "Aversão à Perda", description: "Perdas pesam 2x mais que ganhos", impact: "Ofertas, Promoções" },
      { name: "Status Quo", description: "Preferência por manter situação atual", impact: "Churn, Upsell" },
      { name: "Paradoxo da Escolha", description: "Muitas opções paralisam decisão", impact: "Conversão" },
      { name: "FOMO", description: "Medo de perder oportunidade", impact: "Urgency Marketing" },
    ]
  },
  {
    category: "Vieses Sociais",
    biases: [
      { name: "Prova Social", description: "Seguir comportamento dos outros", impact: "Reviews, Testimonials" },
      { name: "Autoridade", description: "Confiar em especialistas percebidos", impact: "Comunicação" },
      { name: "Reciprocidade", description: "Retribuir favores recebidos", impact: "Lead Generation" },
      { name: "Efeito Halo", description: "Impressão geral afeta julgamentos específicos", impact: "Branding" },
    ]
  },
];

const methodologies = [
  {
    name: "Análise de Dados Comportamentais",
    description: "Identificação de padrões comportamentais em dados transacionais e de interação.",
    techniques: [
      "Sequential pattern mining para jornadas",
      "Cluster analysis comportamental",
      "Análise de cohorts por comportamento",
      "Event sequence analysis",
      "Survival analysis para engagement"
    ]
  },
  {
    name: "Experimentação Comportamental",
    description: "Testes controlados para validar hipóteses sobre comportamento humano.",
    techniques: [
      "A/B/n testing com foco em nudges",
      "Conjoint analysis para preferências",
      "MaxDiff para priorização de atributos",
      "Discrete Choice Experiments (DCE)",
      "Randomized Controlled Trials (RCT)"
    ]
  },
  {
    name: "Pesquisa Qualitativa Estruturada",
    description: "Exploração profunda de motivações e processos decisórios.",
    techniques: [
      "Entrevistas em profundidade (IDI)",
      "Grupos focais moderados",
      "Etnografia digital",
      "Think-aloud protocols",
      "Laddering technique"
    ]
  },
  {
    name: "Modelagem Comportamental",
    description: "Modelos preditivos que incorporam fatores psicológicos e contextuais.",
    techniques: [
      "Propensity models com features comportamentais",
      "Structural Equation Modeling (SEM)",
      "Hidden Markov Models para estados",
      "Agent-based modeling",
      "Bayesian belief networks"
    ]
  },
];

const typicalQuestions = [
  "Por que os clientes abandonam o carrinho mesmo com preços competitivos?",
  "Por que a adoção de novos sistemas internos é sempre tão baixa?",
  "Por que vendedores não seguem o playbook de vendas?",
  "Como vieses cognitivos afetam as decisões de compra?",
  "Quais friction points comportamentais existem na jornada do cliente?",
  "Como redesenhar incentivos para mudar comportamentos?",
];

const frameworks = [
  { name: "EAST", description: "Easy, Attractive, Social, Timely - UK Behavioural Insights Team" },
  { name: "COM-B", description: "Capability, Opportunity, Motivation - Behaviour Change Wheel" },
  { name: "MINDSPACE", description: "9 influências no comportamento - Cabinet Office UK" },
  { name: "Fogg Behavior Model", description: "Motivation x Ability x Prompt" },
  { name: "Hook Model", description: "Trigger, Action, Variable Reward, Investment" },
  { name: "JTBD", description: "Jobs to Be Done - Foco na tarefa, não no produto" },
];

const stats = [
  { value: "150+", label: "Projetos Comportamentais", description: "Em diversos setores" },
  { value: "32%", label: "Aumento Médio Conversão", description: "Com nudges baseados em evidência" },
  { value: "2.5x", label: "ROI em Intervenções", description: "Vs. abordagens tradicionais" },
  { value: "PhD", label: "Equipe Especializada", description: "Em Psicologia e Behavioral Economics" },
];

const differentiators = [
  {
    icon: FlaskConical,
    title: "Base Científica",
    description: "Não aplicamos 'truques'. Cada intervenção é baseada em literatura científica revisada por pares e validada experimentalmente."
  },
  {
    icon: Scale,
    title: "Ética Comportamental",
    description: "Seguimos princípios éticos rigorosos. Nudges que beneficiam o cliente, não que manipulam. Transparência sempre."
  },
  {
    icon: Gauge,
    title: "Mensuração de Impacto",
    description: "Toda intervenção é testada com grupo controle. Causalidade, não correlação. ROI comprovado."
  },
  {
    icon: Network,
    title: "Integração com Data",
    description: "Behavioral insights conectados com data science. Features comportamentais melhoram modelos preditivos."
  },
];

export default function BehavioralAnalytics() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Brain Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="brain-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="rgba(99,102,241,0.5)" />
              <circle cx="20" cy="30" r="2" fill="rgba(99,102,241,0.3)" />
              <circle cx="80" cy="70" r="2" fill="rgba(99,102,241,0.3)" />
              <line x1="50" y1="50" x2="20" y2="30" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="80" y2="70" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#brain-pattern)" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/consultoria" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-8 hover:bg-indigo-500/20 transition-colors"
              >
                <Brain className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Behavioral Analytics
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Behavioral</span>{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Analytics
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Muito além de análise estatística. Entenda como o comportamento humano, 
              vieses cognitivos e processos decisórios impactam seus dados, métricas 
              e resultados de negócio. Ciência comportamental aplicada a dados empresariais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Agendar Diagnóstico
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-500/50 text-lg"
                asChild
              >
                <Link to="/portfolio">Ver Cases</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
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

      {/* Core Areas Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Áreas de Expertise"
            title="Ciência Comportamental"
            titleHighlight="Aplicada"
            description="Entenda o fator humano por trás dos números e transforme insights comportamentais em vantagem competitiva."
          />

          <div className="mt-16 space-y-8">
            {coreAreas.map((area, index) => (
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
                    <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
                      <area.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{area.title}</h3>
                    <p className="mt-3 text-muted-foreground">{area.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {area.applications.map((app, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-3">
                      {area.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
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

      {/* Behavioral Biases Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Vieses Cognitivos"
            title="Vieses que Impactam"
            titleHighlight="Seus Dados"
            description="Entenda os vieses cognitivos mais comuns e como eles afetam métricas, decisões e comportamentos no seu negócio."
          />

          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {behavioralBiases.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-bold text-foreground mb-6 pb-4 border-b border-border/50">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.biases.map((bias, biasIndex) => (
                    <div key={biasIndex} className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{bias.name}</h4>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-xs">
                          {bias.impact}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{bias.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* Typical Questions Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Perguntas"
            title="Problemas que"
            titleHighlight="Resolvemos"
            description="Perguntas típicas que a análise comportamental ajuda a responder."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typicalQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <MessageSquare className="w-6 h-6 text-indigo-400 mb-3" />
                <p className="text-foreground font-medium">{question}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Abordagens"
            titleHighlight="Científicas"
            description="Combinamos múltiplas metodologias para uma compreensão completa do comportamento humano."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {methodologies.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h4 className="text-xl font-bold text-foreground">{method.name}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{method.description}</p>
                <div className="mt-4 space-y-2">
                  {method.techniques.map((technique, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      {technique}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Frameworks"
            title="Modelos"
            titleHighlight="Comportamentais"
            description="Frameworks validados cientificamente que utilizamos para estruturar análises e intervenções."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-5 hover:border-indigo-500/50 transition-colors"
              >
                <h4 className="text-lg font-bold text-foreground">{framework.name}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{framework.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Por que Nós"
            title="Nossos"
            titleHighlight="Diferenciais"
            description="O que nos diferencia de consultorias que aplicam 'truques' de behavioral design."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <diff.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h4 className="font-bold text-foreground">{diff.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{diff.description}</p>
              </motion.div>
            ))}
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/10 to-indigo-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4" />
                Entenda o fator humano
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Seus dados contam apenas{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  metade da história
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Descubra como vieses cognitivos, motivações ocultas e dinâmicas comportamentais 
                estão impactando suas métricas e decisões de negócio.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Solicitar Análise Comportamental
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-indigo-500/50"
                  asChild
                >
                  <Link to="/consultoria">Explorar Outras Áreas</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
