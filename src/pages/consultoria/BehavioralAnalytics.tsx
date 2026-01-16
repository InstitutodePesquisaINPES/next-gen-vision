import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Brain, Heart, Users, Eye, 
  ChevronRight, CheckCircle2, Lightbulb, Target,
  BarChart3, TrendingUp, Zap, AlertCircle, Timer,
  Puzzle, Gauge, Network, MessageSquare, Compass,
  Activity, Binary, Sparkles, Shield, BookOpen,
  Scale, Microscope, FlaskConical, ThumbsUp, ThumbsDown,
  Award, GraduationCap, Building2, Lock, Rocket,
  Clock, FileText, TestTube, Layers, Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// Stats de impacto
const heroStats = [
  { value: "150+", label: "Projetos Comportamentais", description: "Em diversos setores" },
  { value: "32%", label: "Aumento Médio Conversão", description: "Com nudges baseados em evidência" },
  { value: "2.5x", label: "ROI em Intervenções", description: "Vs. abordagens tradicionais" },
  { value: "PhD", label: "Equipe Especializada", description: "Em Psicologia e Behavioral Economics" },
];

// Credenciais
const credentials = [
  { icon: GraduationCap, label: "PhDs em Psicologia", description: "Formação acadêmica rigorosa" },
  { icon: Award, label: "Publicações Científicas", description: "Em journals de comportamento" },
  { icon: Building2, label: "Fortune 500", description: "Clientes globais atendidos" },
  { icon: Globe, label: "Projetos Internacionais", description: "Brasil, EUA e Europa" },
];

// Áreas de expertise expandidas
const coreAreas = [
  {
    icon: Brain,
    title: "Economia Comportamental Aplicada",
    description: "Aplicação de princípios de economia comportamental para entender como vieses cognitivos afetam decisões de negócio e como desenhar intervenções efetivas.",
    capabilities: [
      "Mapeamento de vieses cognitivos em jornadas de decisão",
      "Análise de heurísticas (ancoragem, disponibilidade, representatividade)",
      "Design de nudges e arquitetura de escolha (choice architecture)",
      "Quantificação do impacto de vieses em métricas de negócio",
      "Experimentos de racionalidade limitada",
      "Aplicação de Teoria dos Prospectos em precificação e ofertas",
      "Framing effects e reframe de comunicações",
      "Default options e opt-in/opt-out design"
    ],
    applications: ["Precificação", "Conversão", "Retenção", "Comunicação", "Onboarding"],
    outcomes: ["Aumento de conversão", "Redução de churn", "Melhoria de adesão"]
  },
  {
    icon: Heart,
    title: "Análise Psicométrica",
    description: "Mensuração científica de construtos psicológicos como atitudes, personalidade e motivação com instrumentos validados.",
    capabilities: [
      "Desenvolvimento e validação de escalas psicométricas",
      "Análise fatorial exploratória e confirmatória (AFE/AFC)",
      "Teoria de Resposta ao Item (TRI) e modelos Rasch",
      "Análise de confiabilidade (Alfa, Ômega, CCI, teste-reteste)",
      "Validade convergente, discriminante e preditiva",
      "Invariância de medida transcultural e por grupos",
      "Normatização e padronização de instrumentos",
      "Análise de viés de resposta (social desirability, acquiescence)"
    ],
    applications: ["Pesquisa de Mercado", "Avaliação de Colaboradores", "Pesquisa de UX", "Seleção"],
    outcomes: ["Instrumentos validados", "Métricas confiáveis", "Insights acionáveis"]
  },
  {
    icon: Eye,
    title: "Análise de Comportamento do Consumidor",
    description: "Investigação profunda dos padrões de comportamento, motivações e processos decisórios dos clientes usando dados e pesquisa.",
    capabilities: [
      "Mapeamento da jornada de decisão do cliente com dados comportamentais",
      "Análise de pontos de atrito e abandono comportamental",
      "Segmentação psicográfica baseada em valores e atitudes",
      "Análise de conjuntos de consideração e modelagem de escolha",
      "Identificação de gatilhos emocionais e racionais de compra",
      "Análise de momentos da verdade (moments of truth)",
      "Mapeamento de jobs-to-be-done e outcome expectations",
      "Análise de influência social e peer effects"
    ],
    applications: ["CX", "Produto", "Marketing", "Vendas", "Pricing"],
    outcomes: ["Aumento de conversão", "Melhoria de NPS", "Otimização de jornada"]
  },
  {
    icon: Puzzle,
    title: "Ciência do Comportamento Organizacional",
    description: "Análise de como o comportamento humano interno afeta performance, dados e resultados da empresa.",
    capabilities: [
      "Diagnóstico de cultura organizacional com dados quantitativos",
      "Análise de vieses em processos decisórios internos",
      "Impacto de dinâmicas de grupo em performance de times",
      "Resistência à mudança e comportamento de adoção",
      "Liderança e influência baseada em evidências",
      "Cultura de segurança e comportamentos de risco",
      "Incentivos e motivação intrínseca vs extrínseca",
      "Engajamento e commitment organizacional"
    ],
    applications: ["RH", "Operações", "Gestão de Mudança", "Conformidade", "Safety"],
    outcomes: ["Redução de turnover", "Melhoria de engajamento", "Adoção de mudanças"]
  },
];

// Vieses comportamentais expandidos
const behavioralBiases = [
  {
    category: "Vieses de Julgamento",
    description: "Como formamos impressões e avaliamos situações",
    biases: [
      { name: "Ancoragem", description: "Dependência excessiva da primeira informação recebida", impact: "Pricing, Negociação, Expectativas" },
      { name: "Disponibilidade", description: "Superestimar probabilidade de eventos facilmente lembrados", impact: "Risk Assessment, Decisões" },
      { name: "Representatividade", description: "Julgar probabilidade por similaridade a estereótipos", impact: "Segmentação, Targeting" },
      { name: "Confirmação", description: "Buscar e interpretar informações que confirmam crenças", impact: "Analytics, Pesquisa, Decisões" },
    ]
  },
  {
    category: "Vieses de Decisão",
    description: "Como escolhemos entre alternativas",
    biases: [
      { name: "Aversão à Perda", description: "Perdas pesam 2x mais que ganhos equivalentes", impact: "Ofertas, Promoções, Cancelamento" },
      { name: "Status Quo", description: "Preferência forte por manter situação atual", impact: "Churn, Upsell, Adoção" },
      { name: "Paradoxo da Escolha", description: "Muitas opções paralisam decisão e reduzem satisfação", impact: "Conversão, UX" },
      { name: "FOMO", description: "Medo de perder oportunidade gera urgência", impact: "Urgency Marketing, Vendas" },
    ]
  },
  {
    category: "Vieses Sociais",
    description: "Como os outros influenciam nossas decisões",
    biases: [
      { name: "Prova Social", description: "Seguir comportamento dos outros como sinal de correção", impact: "Reviews, Testimonials, Popularidade" },
      { name: "Autoridade", description: "Confiar desproporcionalmente em especialistas percebidos", impact: "Comunicação, Endosso" },
      { name: "Reciprocidade", description: "Sentir obrigação de retribuir favores recebidos", impact: "Lead Generation, Trials" },
      { name: "Efeito Halo", description: "Impressão geral positiva afeta julgamentos específicos", impact: "Branding, First Impressions" },
    ]
  },
];

// Metodologias expandidas
const methodologies = [
  {
    name: "Análise de Dados Comportamentais",
    description: "Identificação de padrões comportamentais em dados transacionais, de interação e observacionais.",
    icon: BarChart3,
    techniques: [
      "Sequential pattern mining para jornadas",
      "Cluster analysis comportamental",
      "Análise de cohorts por comportamento",
      "Event sequence analysis",
      "Survival analysis para engagement",
      "Análise de transição de estados"
    ],
    outputs: ["Segmentos comportamentais", "Jornadas mapeadas", "Padrões identificados"]
  },
  {
    name: "Experimentação Comportamental",
    description: "Testes controlados para validar hipóteses sobre comportamento humano e eficácia de intervenções.",
    icon: FlaskConical,
    techniques: [
      "A/B/n testing com foco em nudges",
      "Conjoint analysis para preferências",
      "MaxDiff para priorização de atributos",
      "Discrete Choice Experiments (DCE)",
      "Randomized Controlled Trials (RCT)",
      "Quasi-experiments com matching"
    ],
    outputs: ["Efeitos causais validados", "ROI de intervenções", "Insights acionáveis"]
  },
  {
    name: "Pesquisa Qualitativa Estruturada",
    description: "Exploração profunda de motivações, processos decisórios e significados por trás do comportamento.",
    icon: MessageSquare,
    techniques: [
      "Entrevistas em profundidade (IDI)",
      "Grupos focais moderados",
      "Etnografia digital e observação",
      "Think-aloud protocols",
      "Laddering technique para valores",
      "Jobs-to-be-done interviews"
    ],
    outputs: ["Mapas de significado", "Insights qualitativos", "Hipóteses geradas"]
  },
  {
    name: "Modelagem Comportamental",
    description: "Modelos preditivos que incorporam fatores psicológicos e contextuais para previsões mais precisas.",
    icon: Network,
    techniques: [
      "Propensity models com features comportamentais",
      "Structural Equation Modeling (SEM)",
      "Hidden Markov Models para estados",
      "Agent-based modeling",
      "Bayesian belief networks",
      "Modelos de escolha discreta"
    ],
    outputs: ["Modelos preditivos", "Simulações de cenários", "Recomendações personalizadas"]
  },
];

// Frameworks comportamentais expandidos
const frameworks = [
  { 
    name: "EAST", 
    fullName: "Easy, Attractive, Social, Timely",
    description: "Framework do UK Behavioural Insights Team para design de intervenções efetivas",
    origin: "UK Behavioural Insights Team",
    useCase: "Design de nudges e intervenções"
  },
  { 
    name: "COM-B", 
    fullName: "Capability, Opportunity, Motivation - Behaviour",
    description: "Modelo que identifica o que precisa mudar para que um comportamento ocorra",
    origin: "UCL Behaviour Change Wheel",
    useCase: "Diagnóstico de barreiras comportamentais"
  },
  { 
    name: "MINDSPACE", 
    fullName: "9 Influências no Comportamento",
    description: "Checklist de 9 influências comportamentais para design de políticas",
    origin: "UK Cabinet Office",
    useCase: "Checklist de design de intervenções"
  },
  { 
    name: "Fogg Behavior Model", 
    fullName: "Motivation × Ability × Prompt",
    description: "Comportamento ocorre quando motivação, habilidade e trigger convergem",
    origin: "Stanford Persuasive Tech Lab",
    useCase: "Design de produtos e onboarding"
  },
  { 
    name: "Hook Model", 
    fullName: "Trigger, Action, Variable Reward, Investment",
    description: "Modelo de formação de hábitos para produtos digitais",
    origin: "Nir Eyal",
    useCase: "Design de produtos habit-forming"
  },
  { 
    name: "JTBD", 
    fullName: "Jobs to Be Done",
    description: "Foco no trabalho que o cliente quer realizar, não no produto",
    origin: "Clayton Christensen",
    useCase: "Inovação e posicionamento"
  },
];

// Perguntas típicas expandidas
const typicalQuestions = [
  { 
    question: "Por que os clientes abandonam o carrinho mesmo com preços competitivos?",
    area: "E-commerce"
  },
  { 
    question: "Por que a adoção de novos sistemas internos é sempre tão baixa?",
    area: "Change Management"
  },
  { 
    question: "Por que vendedores não seguem o playbook de vendas?",
    area: "Sales Ops"
  },
  { 
    question: "Como vieses cognitivos afetam as decisões de compra dos clientes?",
    area: "Consumer Insights"
  },
  { 
    question: "Quais friction points comportamentais existem na jornada do cliente?",
    area: "CX"
  },
  { 
    question: "Como redesenhar incentivos para mudar comportamentos de colaboradores?",
    area: "RH"
  },
  { 
    question: "Por que clientes não aderem a programas de fidelidade?",
    area: "Loyalty"
  },
  { 
    question: "Como aumentar a taxa de renovação de assinaturas?",
    area: "Retention"
  },
];

// Diferenciais expandidos
const differentiators = [
  {
    icon: FlaskConical,
    title: "Base Científica Rigorosa",
    description: "Não aplicamos 'truques de psicologia'. Cada intervenção é baseada em literatura científica revisada por pares e validada experimentalmente em contexto real."
  },
  {
    icon: Scale,
    title: "Ética Comportamental",
    description: "Seguimos princípios éticos rigorosos. Nudges que beneficiam genuinamente o cliente, não que manipulam. Transparência e autonomia preservadas."
  },
  {
    icon: Gauge,
    title: "Mensuração de Impacto Causal",
    description: "Toda intervenção é testada com grupo controle randomizado. Medimos causalidade, não correlação. ROI comprovado estatisticamente."
  },
  {
    icon: Network,
    title: "Integração com Data Science",
    description: "Behavioral insights conectados com analytics avançado. Features comportamentais melhoram modelos preditivos de churn, conversão e LTV."
  },
  {
    icon: Rocket,
    title: "Da Teoria à Prática",
    description: "Não entregamos apenas relatórios: implementamos as intervenções, testamos e iteramos até alcançar resultados mensuráveis."
  },
  {
    icon: Lock,
    title: "Confidencialidade Total",
    description: "Todos os projetos sob rigorosos acordos de confidencialidade. Insights comportamentais são vantagem competitiva protegida."
  },
];

// Casos de aplicação
const applicationCases = [
  {
    industry: "E-commerce",
    challenge: "Alto abandono de carrinho apesar de preços competitivos",
    intervention: "Redesenho de checkout com redução de friction e nudges de urgência",
    result: "+18% conversão em checkout",
  },
  {
    industry: "SaaS",
    challenge: "Baixa ativação de trial para paid",
    intervention: "Onboarding com progressive disclosure e goal-gradient effect",
    result: "+35% trial-to-paid",
  },
  {
    industry: "Financeiro",
    challenge: "Resistência a migração para novo app",
    intervention: "Change management com loss aversion framing e social proof",
    result: "85% de adoção em 30 dias",
  },
  {
    industry: "Varejo",
    challenge: "Programa de fidelidade com baixa adesão",
    intervention: "Gamification com endowed progress e variable rewards",
    result: "+45% engajamento ativo",
  },
];

export default function BehavioralAnalytics() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
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
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
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
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
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
              {heroStats.map((stat, index) => (
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

      {/* Credentials Badges */}
      <section className="py-12 bg-muted/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {credentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50"
              >
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <cred.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{cred.label}</div>
                  <div className="text-sm text-muted-foreground">{cred.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Areas Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Áreas de Expertise"
            title="Ciência Comportamental"
            titleHighlight="Aplicada"
            description="Entenda o fator humano por trás dos números e transforme insights comportamentais em vantagem competitiva."
          />

          <div className="mt-16 space-y-10">
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
                    
                    <div className="mt-6">
                      <h5 className="text-xs font-semibold text-indigo-400 mb-2">APLICAÇÕES</h5>
                      <div className="flex flex-wrap gap-2">
                        {area.applications.map((app, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      {area.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-foreground font-medium">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <h5 className="text-sm font-semibold text-indigo-400 mb-4">CAPACIDADES</h5>
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
      <section className="section-padding bg-muted/10">
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
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {category.category}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 pb-4 border-b border-border/50">
                  {category.description}
                </p>
                <div className="space-y-4">
                  {category.biases.map((bias, biasIndex) => (
                    <div key={biasIndex} className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{bias.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{bias.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {bias.impact.split(', ').map((impact, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-xs">
                            {impact}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Questions Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Perguntas"
            title="Problemas que"
            titleHighlight="Resolvemos"
            description="Perguntas típicas de negócio que a análise comportamental ajuda a responder."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {typicalQuestions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6 hover-lift"
              >
                <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                  {item.area}
                </span>
                <MessageSquare className="w-6 h-6 text-indigo-400 mt-4 mb-3" />
                <p className="text-foreground font-medium">{item.question}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Abordagens"
            titleHighlight="Científicas"
            description="Combinamos múltiplas metodologias para uma compreensão completa do comportamento humano."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {methodologies.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-8 hover-lift"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <method.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground">{method.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold text-indigo-400 mb-3">TÉCNICAS</h5>
                    <div className="space-y-2">
                      {method.techniques.map((technique, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                          {technique}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <h5 className="text-xs font-semibold text-indigo-400 mb-2">OUTPUTS</h5>
                    <div className="flex flex-wrap gap-2">
                      {method.outputs.map((output, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-muted/50 text-foreground text-xs">
                          {output}
                        </span>
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
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Frameworks"
            title="Modelos"
            titleHighlight="Comportamentais"
            description="Frameworks validados cientificamente que utilizamos para estruturar análises e intervenções."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-6 hover:border-indigo-500/50 transition-colors hover-lift"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-foreground">{framework.name}</h4>
                  <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs">
                    {framework.origin}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{framework.fullName}</p>
                <p className="text-sm text-muted-foreground">{framework.description}</p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <span className="text-xs text-indigo-400">Uso: {framework.useCase}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Cases */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Resultados"
            title="Cases de"
            titleHighlight="Aplicação"
            description="Exemplos de intervenções comportamentais e resultados alcançados."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {applicationCases.map((caseItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                  {caseItem.industry}
                </span>
                <h4 className="mt-4 font-bold text-foreground">{caseItem.challenge}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{caseItem.intervention}</p>
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-lg font-bold text-green-400">{caseItem.result}</span>
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
            badge="Por que Nós"
            title="Nossos"
            titleHighlight="Diferenciais"
            description="O que nos diferencia de consultorias que aplicam 'truques' de behavioral design."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
                  <diff.icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{diff.title}</h4>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Seus dados contam apenas{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  metade da história
                </span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                Descubra como vieses cognitivos, motivações ocultas e dinâmicas comportamentais 
                estão impactando suas métricas e decisões de negócio. Agende um diagnóstico 
                comportamental e desbloqueie insights que a análise tradicional não revela.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-10 text-lg"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Diagnóstico Comportamental
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
