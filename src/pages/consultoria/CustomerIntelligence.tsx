import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, ShoppingCart, Target, Heart, 
  ChevronRight, CheckCircle2, Eye, Zap, TrendingUp,
  BarChart3, PieChart, Lightbulb, Shield, Network,
  MessageSquare, Star, DollarSign, Activity, Clock,
  UserCheck, Fingerprint, Map, Gauge, Timer, Building2,
  Megaphone, Mail, Phone, Globe, Brain, Sparkles, Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const intelligenceAreas = [
  {
    icon: Fingerprint,
    title: "Plataforma de Dados e Identidade do Cliente",
    description: "Visão unificada 360° do cliente integrando todos os touchpoints e canais.",
    capabilities: [
      "Resolução de identidade e matching de clientes",
      "Perfil unificado do cliente (Golden Record)",
      "Tracking cross-device e cross-channel",
      "Unificação de dados de CRM, transações, web, app",
      "Atualizações de perfil em tempo real",
      "Estratégia de first-party data conforme LGPD"
    ],
    technologies: ["CDP", "MDM", "Identity Graph"]
  },
  {
    icon: Map,
    title: "Análise da Jornada do Cliente",
    description: "Mapeamento e análise da jornada completa do cliente em todos os touchpoints.",
    capabilities: [
      "Mapeamento de jornada baseado em dados comportamentais",
      "Modelagem de atribuição (multi-touch, data-driven)",
      "Análise de funil de conversão com detecção de abandono",
      "Otimização do caminho de compra",
      "Identificação de Momentos da Verdade",
      "Triggers de orquestração de jornada"
    ],
    technologies: ["Event Streaming", "Mixpanel", "Amplitude"]
  },
  {
    icon: Heart,
    title: "Análise de Experiência e Satisfação",
    description: "Mensuração contínua de satisfação, esforço e lealdade do cliente.",
    capabilities: [
      "Análise de NPS com drivers e detratores",
      "Tracking de Customer Effort Score (CES)",
      "CSAT por touchpoint e jornada",
      "Análise de Voz do Cliente (NLP)",
      "Análise de sentimento em reviews e redes sociais",
      "Automação de feedback em ciclo fechado"
    ],
    technologies: ["Text Analytics", "Qualtrics", "Medallia"]
  },
  {
    icon: DollarSign,
    title: "Valor e Monetização do Cliente",
    description: "Análise de valor do cliente para maximizar lifetime value e rentabilidade.",
    capabilities: [
      "Modelagem de Customer Lifetime Value (CLV)",
      "Segmentação RFM automatizada",
      "Análise de share of wallet",
      "Scoring de propensão a cross-sell / upsell",
      "Modelagem de sensibilidade e elasticidade de preço",
      "Análise de rentabilidade por cliente"
    ],
    technologies: ["Modelos Preditivos", "ML", "BI"]
  },
  {
    icon: UserCheck,
    title: "Inteligência de Retenção e Churn",
    description: "Prevenção proativa de churn com modelos preditivos e intervenções personalizadas.",
    capabilities: [
      "Previsão de churn com lead time configurável",
      "Sistema de alerta antecipado e health scores",
      "Segmentação de clientes em risco",
      "Otimização de campanhas de retenção",
      "Modelagem de propensão a win-back",
      "Análise de drivers de churn (causal)"
    ],
    technologies: ["Análise de Sobrevivência", "XGBoost", "Inferência Causal"]
  },
  {
    icon: Megaphone,
    title: "Efetividade de Marketing",
    description: "Otimização de investimentos em marketing com mensuração de impacto real.",
    capabilities: [
      "Marketing Mix Modeling (MMM)",
      "Atribuição multi-touch (MTA)",
      "Análise de ROI de campanhas",
      "Otimização de canais e alocação de budget",
      "Plataforma de A/B testing e experimentação",
      "Testes de incrementalidade"
    ],
    technologies: ["Robyn", "LightweightMMM", "Experimentação"]
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
    methods: ["Análise Fatorial", "LCA", "Pesquisas"]
  },
  {
    type: "Baseada em Valor",
    description: "Focada em rentabilidade e potencial de crescimento",
    variables: ["CLV atual", "CLV potencial", "Margem", "Share of wallet", "Custo de servir"],
    methods: ["Value-based", "Níveis de Rentabilidade"]
  },
  {
    type: "Preditiva",
    description: "Orientada por propensão a comportamentos futuros",
    variables: ["Propensão churn", "Propensão compra", "Propensão upsell", "Next best product"],
    methods: ["Modelos de ML", "Propensity scores"]
  },
];

const customerMetrics = [
  { metric: "CLV", name: "Customer Lifetime Value", description: "Valor total do cliente ao longo da relação" },
  { metric: "CAC", name: "Custo de Aquisição", description: "Custo de aquisição por cliente" },
  { metric: "NPS", name: "Net Promoter Score", description: "Lealdade e propensão a recomendar" },
  { metric: "Churn", name: "Taxa de Churn", description: "Taxa de perda de clientes" },
  { metric: "ARPU", name: "Receita Média por Usuário", description: "Receita média por usuário" },
  { metric: "NRR", name: "Retenção Líquida de Receita", description: "Retenção líquida de receita" },
];

const methodology = [
  {
    phase: "01",
    title: "Avaliação de Dados",
    description: "Inventário de dados de cliente, qualidade e gaps",
    duration: "1-2 semanas"
  },
  {
    phase: "02",
    title: "Design de Arquitetura",
    description: "Design de CDP, integrações e modelo de dados",
    duration: "2-3 semanas"
  },
  {
    phase: "03",
    title: "Implementação",
    description: "Integração de fontes, pipelines e dashboards",
    duration: "4-8 semanas"
  },
  {
    phase: "04",
    title: "Ativação",
    description: "Modelos preditivos, segmentação e casos de uso",
    duration: "3-4 semanas"
  },
];

const differentiators = [
  {
    icon: Brain,
    title: "Comportamental + Analytics",
    description: "Integramos behavioral science com customer analytics para entender não só o 'o quê' mas o 'por quê' por trás do comportamento."
  },
  {
    icon: Network,
    title: "Integração de Dados 360°",
    description: "Unificamos dados de CRM, transações, web, app, atendimento e marketing para uma visão verdadeiramente completa."
  },
  {
    icon: Zap,
    title: "Ativação em Tempo Real",
    description: "Insights acionáveis em tempo real, não relatórios estáticos. Triggers automatizados para next best action."
  },
  {
    icon: Shield,
    title: "Privacidade em Primeiro Lugar",
    description: "Arquitetura LGPD-compliant desde o design. Estratégia de first-party data para um mundo sem cookies."
  },
  {
    icon: Lock,
    title: "Confidencialidade Total",
    description: "Todos os projetos são conduzidos sob rigorosos acordos de confidencialidade. Seus dados e estratégias permanecem absolutamente sigilosos."
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
                Inteligência de Clientes
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Inteligência de</span>{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Clientes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Visão 360° do cliente com CDP, analytics avançado e modelos preditivos. 
              De segmentação a previsão de churn, transforme dados de cliente em 
              experiências personalizadas e receita incremental.
            </motion.p>

            {/* Confidentiality Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30"
            >
              <Lock className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-400">Todos os projetos sob rigorosa confidencialidade</span>
            </motion.div>

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
            title="Inteligência de Clientes"
            titleHighlight="Completa"
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
                  <div className="flex flex-wrap gap-1.5">
                    {approach.variables.slice(0, 3).map((variable, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-muted/50 text-foreground text-xs">
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50">
                  <h5 className="text-xs font-semibold text-orange-400 mb-2">MÉTODOS</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {approach.methods.map((method, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Como"
            titleHighlight="Trabalhamos"
            description="Processo estruturado para implementar Customer Intelligence de forma eficaz."
          />

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {index < methodology.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent z-0" />
                )}
                <div className="glass-card p-6 relative z-10">
                  <div className="text-4xl font-bold text-orange-400/20 mb-2">{step.phase}</div>
                  <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-orange-400">
                    <Clock className="w-3 h-3" />
                    {step.duration}
                  </div>
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
            badge="Por que nós"
            title="Nossos"
            titleHighlight="Diferenciais"
            description="O que nos torna únicos em projetos de Customer Intelligence."
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
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 w-fit mb-4">
                  <diff.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{diff.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{diff.description}</p>
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
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-yellow-500/20 p-12 md:p-16"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 mb-6">
                <Lock className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400 font-medium">Confidencialidade Garantida</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pronto para conhecer melhor{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  seus clientes?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Vamos discutir como transformar seus dados de cliente em vantagem competitiva.
                Todo o trabalho é realizado sob rigorosos acordos de confidencialidade.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Conversa
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
