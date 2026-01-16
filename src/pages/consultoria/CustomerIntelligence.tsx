import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, ShoppingCart, Target, Heart, 
  ChevronRight, CheckCircle2, Eye, Zap, TrendingUp,
  BarChart3, PieChart, Lightbulb, Shield, Network,
  MessageSquare, Star, DollarSign, Activity, Clock,
  UserCheck, Fingerprint, Map, Gauge, Timer, Building2,
  Megaphone, Mail, Phone, Globe, Brain, Sparkles, Lock,
  Award, Workflow, UserPlus, Repeat
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// ============================================
// DADOS E CONFIGURAÇÕES
// ============================================

const intelligenceAreas = [
  {
    icon: Fingerprint,
    title: "Plataforma de Dados do Cliente (CDP)",
    description: "Visão unificada 360° do cliente integrando todos os touchpoints, canais e fontes de dados.",
    capabilities: [
      "Resolução de identidade e matching de clientes cross-device",
      "Perfil unificado do cliente (Golden Record)",
      "Tracking cross-device e cross-channel",
      "Unificação de dados: CRM, transações, web, app, atendimento",
      "Atualizações de perfil em tempo real",
      "Estratégia de first-party data em conformidade com LGPD"
    ],
    technologies: ["CDP", "MDM", "Identity Graph", "Event Streaming"]
  },
  {
    icon: Map,
    title: "Análise da Jornada do Cliente",
    description: "Mapeamento e análise da jornada completa do cliente em todos os pontos de contato.",
    capabilities: [
      "Mapeamento de jornada baseado em dados comportamentais reais",
      "Modelagem de atribuição: multi-touch e data-driven",
      "Análise de funil de conversão com detecção de abandono",
      "Otimização do caminho de compra por segmento",
      "Identificação de Moments that Matter",
      "Triggers automatizados para orquestração de jornada"
    ],
    technologies: ["Event Streaming", "Mixpanel", "Amplitude", "Journey Analytics"]
  },
  {
    icon: Heart,
    title: "Experiência e Satisfação do Cliente",
    description: "Mensuração contínua de satisfação, esforço e lealdade do cliente em todos os canais.",
    capabilities: [
      "Análise de NPS com identificação de drivers e detratores",
      "Tracking de Customer Effort Score (CES) por touchpoint",
      "CSAT por ponto de contato e etapa da jornada",
      "Análise de Voz do Cliente (VoC) com NLP avançado",
      "Análise de sentimento em reviews, redes sociais e tickets",
      "Automação de feedback em ciclo fechado (closed loop)"
    ],
    technologies: ["Text Analytics", "NLP", "Sentiment Analysis", "VoC Platforms"]
  },
  {
    icon: DollarSign,
    title: "Valor e Monetização do Cliente",
    description: "Análise de valor do cliente para maximizar Lifetime Value e rentabilidade.",
    capabilities: [
      "Modelagem de Customer Lifetime Value (CLV) preditivo",
      "Segmentação RFM automatizada e dinâmica",
      "Análise de Share of Wallet e potencial de expansão",
      "Scoring de propensão: cross-sell, upsell, next best offer",
      "Modelagem de elasticidade e sensibilidade de preço",
      "Análise de rentabilidade por cliente e segmento"
    ],
    technologies: ["Modelos Preditivos", "ML", "BI", "Revenue Analytics"]
  },
  {
    icon: UserCheck,
    title: "Inteligência de Retenção e Churn",
    description: "Prevenção proativa de churn com modelos preditivos e intervenções personalizadas.",
    capabilities: [
      "Previsão de churn com lead time configurável (30, 60, 90 dias)",
      "Sistema de Health Score e alertas antecipados",
      "Segmentação de clientes em risco por probabilidade e valor",
      "Otimização de campanhas de retenção e ofertas",
      "Modelagem de propensão a win-back de clientes perdidos",
      "Análise de drivers de churn com inferência causal"
    ],
    technologies: ["Análise de Sobrevivência", "XGBoost", "Inferência Causal", "ML"]
  },
  {
    icon: Megaphone,
    title: "Efetividade de Marketing",
    description: "Otimização de investimentos em marketing com mensuração de impacto incremental real.",
    capabilities: [
      "Marketing Mix Modeling (MMM) para alocação de budget",
      "Multi-Touch Attribution (MTA) para canais digitais",
      "Análise de ROI de campanhas por canal e segmento",
      "Otimização de canais e alocação orçamentária",
      "Plataforma de A/B Testing e experimentação",
      "Testes de incrementalidade para medir impacto causal"
    ],
    technologies: ["Robyn", "LightweightMMM", "Experimentação", "Causal ML"]
  },
];

const segmentationApproaches = [
  {
    type: "Comportamental",
    description: "Baseada em ações e comportamentos observados no histórico de interações.",
    variables: ["Frequência de compra", "Recência", "Ticket médio", "Categorias preferidas", "Canal preferido"],
    methods: ["RFM", "K-means", "DBSCAN"]
  },
  {
    type: "Psicográfica",
    description: "Baseada em valores, atitudes, motivações e estilo de vida do cliente.",
    variables: ["Motivações", "Valores", "Interesses", "Opiniões", "Lifestyle"],
    methods: ["Análise Fatorial", "LCA", "Pesquisas"]
  },
  {
    type: "Baseada em Valor",
    description: "Focada em rentabilidade atual, potencial de crescimento e custo de servir.",
    variables: ["CLV atual", "CLV potencial", "Margem", "Share of wallet", "Custo de servir"],
    methods: ["Value Tiers", "Profit Clustering"]
  },
  {
    type: "Preditiva",
    description: "Orientada por propensão a comportamentos futuros e next best action.",
    variables: ["Propensão churn", "Propensão compra", "Propensão upsell", "Next best product"],
    methods: ["ML Models", "Propensity Scores"]
  },
];

const customerMetrics = [
  { metric: "CLV", name: "Customer Lifetime Value", description: "Valor total esperado do cliente" },
  { metric: "CAC", name: "Custo de Aquisição", description: "Custo para adquirir um cliente" },
  { metric: "NPS", name: "Net Promoter Score", description: "Lealdade e propensão a recomendar" },
  { metric: "Churn", name: "Taxa de Churn", description: "Taxa de perda de clientes" },
  { metric: "ARPU", name: "Receita Média por Usuário", description: "Receita média por cliente" },
  { metric: "NRR", name: "Net Revenue Retention", description: "Retenção líquida de receita" },
];

const methodology = [
  {
    phase: "01",
    title: "Avaliação de Dados",
    description: "Inventário completo de dados de cliente, avaliação de qualidade e identificação de gaps.",
    duration: "1-2 semanas"
  },
  {
    phase: "02",
    title: "Design de Arquitetura",
    description: "Design de CDP, estratégia de integrações, modelo de dados unificado.",
    duration: "2-3 semanas"
  },
  {
    phase: "03",
    title: "Implementação",
    description: "Integração de fontes, construção de pipelines, dashboards e modelos.",
    duration: "4-8 semanas"
  },
  {
    phase: "04",
    title: "Ativação",
    description: "Deploy de modelos preditivos, segmentação operacional e casos de uso.",
    duration: "3-4 semanas"
  },
];

const differentiators = [
  {
    icon: Brain,
    title: "Comportamental + Analytics",
    description: "Integramos Behavioral Science com Customer Analytics para entender não só o 'o quê' mas o 'por quê' por trás do comportamento do cliente."
  },
  {
    icon: Network,
    title: "Integração de Dados 360°",
    description: "Unificamos dados de CRM, transações, web, app, atendimento e marketing para uma visão verdadeiramente completa do cliente."
  },
  {
    icon: Zap,
    title: "Ativação em Tempo Real",
    description: "Insights acionáveis em tempo real, não relatórios estáticos. Triggers automatizados para next best action e personalização."
  },
  {
    icon: Shield,
    title: "Privacidade em Primeiro Lugar",
    description: "Arquitetura LGPD-compliant desde o design. Estratégia de first-party data robusta para um mundo cookieless."
  },
  {
    icon: Lock,
    title: "Confidencialidade Total",
    description: "Todos os projetos são conduzidos sob rigorosos acordos de confidencialidade. Seus dados e estratégias permanecem absolutamente sigilosos."
  },
];

const useCases = [
  {
    title: "Prevenção de Churn",
    description: "Identificação proativa de clientes em risco com modelos preditivos e campanhas de retenção personalizadas.",
    impact: "Redução de 20-35% no churn"
  },
  {
    title: "Otimização de CLV",
    description: "Segmentação por valor e potencial para priorizar investimentos em aquisição e retenção.",
    impact: "Aumento de 25% no CLV médio"
  },
  {
    title: "Personalização em Escala",
    description: "Next best offer e recomendações personalizadas baseadas em comportamento e preferências.",
    impact: "Aumento de 40% em conversão"
  },
  {
    title: "Eficiência de Marketing",
    description: "Alocação otimizada de budget com Marketing Mix Modeling e atribuição multi-touch.",
    impact: "Melhoria de 30% no ROI de mídia"
  },
];

const stats = [
  { value: "500+", label: "Milhões de Clientes Analisados", description: "Em bases unificadas" },
  { value: "92%", label: "Precisão em Modelos de Churn", description: "Média dos projetos" },
  { value: "3.2x", label: "ROI Médio", description: "Retorno sobre investimento" },
  { value: "NPS 75", label: "Satisfação de Clientes", description: "Em projetos de CX" },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function CustomerIntelligence() {
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

        {/* Customer Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="customer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="15" r="8" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
              <rect x="20" y="28" width="20" height="25" rx="3" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 hover:bg-primary/20 transition-colors"
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
              <span className="text-foreground">Customer</span>{" "}
              <span className="gradient-text-purple">
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
              De segmentação a previsão de churn, transforme dados de cliente em 
              experiências personalizadas e receita incremental.
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
                  Iniciar Projeto
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="p-4 rounded-xl bg-card/50 border border-border/30">
                  <div className="text-2xl md:text-3xl font-bold gradient-text-purple">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Metrics */}
      <section className="py-16 bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
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
                <div className="text-xl font-bold text-primary">{item.metric}</div>
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
            description="Cobertura completa de analytics e inteligência do cliente, da aquisição à retenção."
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
                  <div className="p-4 rounded-xl bg-primary/10 text-primary">
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
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {capability}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                  {area.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Casos de Uso"
            title="Resultados"
            titleHighlight="Comprovados"
            description="Exemplos de impacto real gerado por projetos de Customer Intelligence."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h4 className="text-lg font-bold text-foreground mb-3">{useCase.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Impacto típico:</span>
                  <div className="text-sm font-semibold text-primary mt-1">{useCase.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Segmentation Approaches */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Segmentação"
            title="Abordagens de"
            titleHighlight="Segmentação"
            description="Diferentes perspectivas para entender e agrupar seus clientes de forma acionável."
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
                  <h5 className="text-xs font-semibold text-primary mb-2">VARIÁVEIS</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {approach.variables.slice(0, 3).map((variable, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-muted/50 text-foreground text-xs">
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50">
                  <h5 className="text-xs font-semibold text-primary mb-2">MÉTODOS</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {approach.methods.map((method, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
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
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Como"
            titleHighlight="Trabalhamos"
            description="Processo estruturado para implementar Customer Intelligence de forma eficaz."
          />

          <div className="mt-12">
            <div className="grid md:grid-cols-4 gap-6">
              {methodology.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < methodology.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                  )}
                  
                  <div className="glass-card p-6 relative z-10 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold gradient-text-purple">{step.phase}</span>
                      <div className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs">{step.duration}</div>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            description="Combinamos expertise técnica com profundo conhecimento de comportamento do consumidor."
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
                Pronto para conhecer seus clientes de <span className="gradient-text-purple">verdade</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Agende uma conversa com nossos especialistas e descubra como Customer Intelligence 
                pode transformar sua relação com clientes e impulsionar resultados.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="px-8" asChild>
                  <Link to="/contato">
                    Iniciar Conversa
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
