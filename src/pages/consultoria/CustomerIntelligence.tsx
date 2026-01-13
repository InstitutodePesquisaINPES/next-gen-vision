import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, ShoppingCart, Target, Heart, 
  ChevronRight, CheckCircle2, Eye, Zap, TrendingUp,
  BarChart3, PieChart, Lightbulb, Shield, Network,
  MessageSquare, Star, DollarSign, Activity, Clock,
  UserCheck, Fingerprint, Map, Gauge, Timer, Building2,
  Megaphone, Mail, Phone, Globe, Brain, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const intelligenceAreas = [
  {
    icon: Fingerprint,
    title: "Customer Identity & Data Platform",
    description: "Visão unificada 360° do cliente integrando todos os touchpoints e canais.",
    capabilities: [
      "Identity resolution e customer matching",
      "Unified customer profile (Golden Record)",
      "Cross-device e cross-channel tracking",
      "Data unification de CRM, transações, web, app",
      "Real-time profile updates",
      "Privacy-compliant first-party data strategy"
    ],
    technologies: ["CDP", "MDM", "Identity Graph"]
  },
  {
    icon: Map,
    title: "Customer Journey Analytics",
    description: "Mapeamento e análise da jornada completa do cliente em todos os touchpoints.",
    capabilities: [
      "Journey mapping baseado em dados comportamentais",
      "Attribution modeling (multi-touch, data-driven)",
      "Conversion funnel analysis com drop-off detection",
      "Path-to-purchase optimization",
      "Moment of Truth identification",
      "Journey orchestration triggers"
    ],
    technologies: ["Event Streaming", "Mixpanel", "Amplitude"]
  },
  {
    icon: Heart,
    title: "Experience & Satisfaction Analytics",
    description: "Mensuração contínua de satisfação, esforço e lealdade do cliente.",
    capabilities: [
      "NPS analysis com drivers e detractors",
      "Customer Effort Score (CES) tracking",
      "CSAT por touchpoint e jornada",
      "Voice of Customer analysis (NLP)",
      "Sentiment analysis em reviews e social",
      "Closed-loop feedback automation"
    ],
    technologies: ["Text Analytics", "Qualtrics", "Medallia"]
  },
  {
    icon: DollarSign,
    title: "Customer Value & Monetization",
    description: "Análise de valor do cliente para maximizar lifetime value e rentabilidade.",
    capabilities: [
      "Customer Lifetime Value (CLV) modeling",
      "RFM segmentation automatizada",
      "Share of wallet analysis",
      "Cross-sell / Upsell propensity scoring",
      "Price sensitivity e elasticity modeling",
      "Customer profitability analysis"
    ],
    technologies: ["Predictive Models", "ML", "BI"]
  },
  {
    icon: UserCheck,
    title: "Retention & Churn Intelligence",
    description: "Prevenção proativa de churn com modelos preditivos e intervenções personalizadas.",
    capabilities: [
      "Churn prediction com lead time configurável",
      "Early warning system e health scores",
      "At-risk customer segmentation",
      "Retention campaign optimization",
      "Win-back propensity modeling",
      "Churn driver analysis (causal)"
    ],
    technologies: ["Survival Analysis", "XGBoost", "Causal Inference"]
  },
  {
    icon: Megaphone,
    title: "Marketing Effectiveness",
    description: "Otimização de investimentos em marketing com mensuração de impacto real.",
    capabilities: [
      "Marketing Mix Modeling (MMM)",
      "Multi-touch attribution (MTA)",
      "Campaign ROI analysis",
      "Channel optimization e budget allocation",
      "A/B testing e experimentation platform",
      "Incrementality testing"
    ],
    technologies: ["Robyn", "LightweightMMM", "Experimentation"]
  },
];

const segmentationApproaches = [
  {
    type: "Comportamental",
    description: "Baseada em ações e comportamentos observados",
    variables: ["Frequência de compra", "Recência", "Ticket médio", "Categorias preferidas", "Canal preferido"],
    methods: ["RFM", "K-means", "DBSCAN"]
  },
  {
    type: "Psicográfica",
    description: "Baseada em valores, atitudes e estilo de vida",
    variables: ["Motivações", "Valores", "Interesses", "Opiniões", "Lifestyle"],
    methods: ["Factor Analysis", "LCA", "Surveys"]
  },
  {
    type: "Baseada em Valor",
    description: "Focada em rentabilidade e potencial de crescimento",
    variables: ["CLV atual", "CLV potencial", "Margem", "Share of wallet", "Custo de servir"],
    methods: ["Value-based", "Profitability tiers"]
  },
  {
    type: "Preditiva",
    description: "Orientada por propensão a comportamentos futuros",
    variables: ["Propensão churn", "Propensão compra", "Propensão upsell", "Next best product"],
    methods: ["ML Models", "Propensity scores"]
  },
];

const useCases = [
  {
    industry: "E-commerce",
    icon: ShoppingCart,
    cases: [
      { title: "Previsão de Churn", result: "-32% churn rate" },
      { title: "Personalização de Ofertas", result: "+45% conversão" },
      { title: "CLV Optimization", result: "+28% LTV" },
    ]
  },
  {
    industry: "Varejo",
    icon: Building2,
    cases: [
      { title: "RFM Segmentation", result: "+35% resposta campaigns" },
      { title: "Store Attribution", result: "ROAS +40%" },
      { title: "Basket Analysis", result: "+18% ticket" },
    ]
  },
  {
    industry: "SaaS B2B",
    icon: Globe,
    cases: [
      { title: "Product Usage Analytics", result: "-25% churn" },
      { title: "Expansion Revenue Scoring", result: "+52% upsell" },
      { title: "Health Score", result: "NRR +15pp" },
    ]
  },
  {
    industry: "Financeiro",
    icon: DollarSign,
    cases: [
      { title: "Next Best Offer", result: "+38% cross-sell" },
      { title: "Channel Optimization", result: "-22% CAC" },
      { title: "Attrition Prevention", result: "+R$15M retained" },
    ]
  },
];

const customerMetrics = [
  { metric: "CLV", name: "Customer Lifetime Value", description: "Valor total do cliente ao longo da relação" },
  { metric: "CAC", name: "Customer Acquisition Cost", description: "Custo de aquisição por cliente" },
  { metric: "NPS", name: "Net Promoter Score", description: "Lealdade e propensão a recomendar" },
  { metric: "Churn", name: "Churn Rate", description: "Taxa de perda de clientes" },
  { metric: "ARPU", name: "Average Revenue Per User", description: "Receita média por usuário" },
  { metric: "NRR", name: "Net Revenue Retention", description: "Retenção líquida de receita" },
];

const methodology = [
  {
    phase: "01",
    title: "Data Assessment",
    description: "Inventário de dados de cliente, qualidade e gaps",
    duration: "1-2 semanas"
  },
  {
    phase: "02",
    title: "Architecture Design",
    description: "Design de CDP, integrações e modelo de dados",
    duration: "2-3 semanas"
  },
  {
    phase: "03",
    title: "Implementation",
    description: "Integração de fontes, pipelines e dashboards",
    duration: "4-8 semanas"
  },
  {
    phase: "04",
    title: "Activation",
    description: "Modelos preditivos, segmentação e use cases",
    duration: "3-4 semanas"
  },
];

const stats = [
  { value: "100+", label: "Projetos CI", description: "Customer Intelligence" },
  { value: "50M+", label: "Perfis Unificados", description: "Em CDPs implementadas" },
  { value: "+38%", label: "Aumento CLV Médio", description: "Com personalização" },
  { value: "-30%", label: "Redução Churn", description: "Com modelos preditivos" },
];

const differentiators = [
  {
    icon: Brain,
    title: "Behavioral + Analytics",
    description: "Integramos behavioral science com customer analytics para entender não só o 'o quê' mas o 'por quê' por trás do comportamento."
  },
  {
    icon: Network,
    title: "360° Data Integration",
    description: "Unificamos dados de CRM, transações, web, app, atendimento e marketing para uma visão verdadeiramente completa."
  },
  {
    icon: Zap,
    title: "Real-Time Activation",
    description: "Insights acionáveis em tempo real, não relatórios estáticos. Triggers automatizados para next best action."
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "Arquitetura LGPD-compliant desde o design. First-party data strategy para um mundo cookieless."
  },
];

export default function CustomerIntelligence() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        {/* Customer Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="customer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="15" r="8" fill="none" stroke="rgba(251,146,60,0.5)" strokeWidth="1" />
              <rect x="20" y="28" width="20" height="25" rx="3" fill="none" stroke="rgba(251,146,60,0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#customer-pattern)" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8 hover:bg-orange-500/20 transition-colors"
              >
                <Users className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Customer Intelligence
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Customer</span>{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Visão 360° do cliente com CDP, analytics avançado e modelos preditivos. 
              De segmentação a churn prediction, transforme dados de cliente em 
              experiências personalizadas e receita incremental.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Iniciar Projeto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500/50 text-lg"
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
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
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

      {/* Customer Metrics */}
      <section className="py-16 bg-muted/10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium">
              <BarChart3 className="w-4 h-4" />
              Métricas de Cliente
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {customerMetrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-4 text-center hover-lift"
              >
                <div className="text-xl font-bold text-orange-400">{item.metric}</div>
                <div className="text-sm font-medium text-foreground mt-1">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Areas Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Soluções"
            title="Customer Intelligence"
            titleHighlight="Completo"
            description="Cobertura end-to-end de analytics e inteligência do cliente."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {intelligenceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-orange-500/10 text-orange-400">
                    <area.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  {area.capabilities.slice(0, 4).map((capability, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                      {capability}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                  {area.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Segmentation Approaches */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Segmentação"
            title="Abordagens de"
            titleHighlight="Segmentação"
            description="Diferentes perspectivas para entender e agrupar seus clientes."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {segmentationApproaches.map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="text-lg font-bold text-foreground">{approach.type}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{approach.description}</p>
                
                <div className="mt-4">
                  <h5 className="text-xs font-semibold text-orange-400 mb-2">VARIÁVEIS</h5>
                  <div className="flex flex-wrap gap-1">
                    {approach.variables.slice(0, 3).map((v, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-muted/50 text-foreground text-xs">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h5 className="text-xs font-semibold text-orange-400 mb-2">MÉTODOS</h5>
                  <div className="flex flex-wrap gap-1">
                    {approach.methods.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-xs">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Cases por Indústria"
            title="Resultados"
            titleHighlight="Comprovados"
            description="Impacto real de Customer Intelligence em diferentes setores."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                    <industry.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-foreground">{industry.industry}</h4>
                </div>
                <div className="space-y-3">
                  {industry.cases.map((c, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-muted/30">
                      <div className="text-sm font-medium text-foreground">{c.title}</div>
                      <div className="text-sm font-bold text-orange-400">{c.result}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Metodologia de"
            titleHighlight="Implementação"
            description="Abordagem estruturada para construir sua capability de Customer Intelligence."
          />

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-orange-400">{phase.phase}</span>
                </div>
                <h4 className="font-bold text-foreground">{phase.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{phase.description}</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-orange-400">
                  <Timer className="w-3 h-3" />
                  {phase.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Por que Nós"
            title="Nossos"
            titleHighlight="Diferenciais"
            description="O que nos diferencia em Customer Intelligence."
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
                <div className="w-14 h-14 mx-auto rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <diff.icon className="w-7 h-7 text-orange-400" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/10 to-orange-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Conheça seus clientes de verdade
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para uma visão{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  360° do seu cliente?
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Descubra como uma estratégia de Customer Intelligence pode transformar 
                dados dispersos em relacionamentos lucrativos e duradouros.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Iniciar Customer Intelligence
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500/50"
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
