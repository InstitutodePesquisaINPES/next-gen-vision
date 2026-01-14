import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, BarChart3, PieChart, TrendingUp, LineChart, 
  ChevronRight, CheckCircle2, Monitor, Gauge, Eye,
  Database, Zap, Layers, RefreshCw, FileText, Users,
  Target, Clock, AlertCircle, Filter, Lightbulb, Shield,
  Settings, Activity, Binary, Network, Cpu, Timer,
  Building2, DollarSign, ShoppingCart, Truck, Headphones
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const analyticsServices = [
  {
    icon: Monitor,
    title: "Painéis Executivos",
    description: "Visualizações interativas e em tempo real para monitoramento de KPIs críticos do negócio.",
    capabilities: [
      "Design de painéis estratégicos, táticos e operacionais",
      "Streaming em tempo real com Kafka e WebSockets",
      "Drill-down interativo multi-nível",
      "Alertas inteligentes com limiares dinâmicos",
      "Design responsivo para dispositivos móveis",
      "Analytics embarcado para produtos SaaS"
    ],
    technologies: ["Power BI", "Tableau", "Looker", "Metabase", "Superset"]
  },
  {
    icon: RefreshCw,
    title: "Relatórios Automatizados",
    description: "Sistema de geração e distribuição automática de relatórios com insights acionáveis.",
    capabilities: [
      "Agendamento flexível (diário, semanal, mensal, sob demanda)",
      "Modelos customizados por audiência",
      "Múltiplos formatos (PDF, Excel, HTML, Slides)",
      "Automação de narrativa com geração de texto",
      "Detecção automática de anomalias",
      "Distribuição multi-canal (e-mail, Slack, Teams)"
    ],
    technologies: ["Apache Airflow", "dbt", "Jupyter", "Papermill", "Great Expectations"]
  },
  {
    icon: TrendingUp,
    title: "Análise Preditiva e Previsão",
    description: "Modelos que antecipam tendências, sazonalidades e comportamentos futuros do mercado.",
    capabilities: [
      "Previsão de vendas, receita e demanda",
      "Detecção de anomalias com explicabilidade",
      "Análise de cenários e simulação hipotética",
      "Pontuação de propensão (evasão, upsell, conversão)",
      "Modelagem de atribuição multi-toque",
      "Análise de coorte e valor vitalício"
    ],
    technologies: ["Prophet", "ARIMA", "XGBoost", "TensorFlow", "H2O.ai"]
  },
  {
    icon: Database,
    title: "Governança e Arquitetura de Dados",
    description: "Fundação sólida de dados para analytics escalável e confiável.",
    capabilities: [
      "Data Warehouse moderno (Snowflake, BigQuery, Redshift)",
      "Lakehouse de dados com Delta Lake / Iceberg",
      "Camada semântica unificada",
      "Catálogo de dados e descoberta",
      "Monitoramento automatizado de qualidade de dados",
      "Habilitação de análise autônoma"
    ],
    technologies: ["Snowflake", "dbt", "Atlan", "Monte Carlo", "Cube"]
  },
];

const dashboardTypes = [
  {
    icon: Gauge,
    title: "Operacional",
    description: "Monitoramento em tempo real de processos e operações do dia a dia.",
    metrics: ["SLA Compliance", "Throughput", "Queue Size", "Error Rate", "Uptime"],
    refreshRate: "Real-time / 1 min",
    audience: "Operadores, Supervisores"
  },
  {
    icon: Target,
    title: "Estratégico",
    description: "Visão de alto nível para C-Level com indicadores de performance do negócio.",
    metrics: ["Revenue", "Market Share", "NPS", "Customer LTV", "Burn Rate"],
    refreshRate: "Diário / Semanal",
    audience: "C-Level, Board"
  },
  {
    icon: ShoppingCart,
    title: "Comercial & Vendas",
    description: "Acompanhamento de pipeline, performance de vendas e métricas comerciais.",
    metrics: ["Pipeline Value", "Win Rate", "Ticket Médio", "CAC", "Quota Attainment"],
    refreshRate: "Horário / Diário",
    audience: "Sales Leaders, Reps"
  },
  {
    icon: DollarSign,
    title: "Financeiro",
    description: "Controle de receitas, despesas, fluxo de caixa e projeções financeiras.",
    metrics: ["EBITDA", "Cash Flow", "Gross Margin", "Opex Ratio", "DSO"],
    refreshRate: "Diário / Mensal",
    audience: "CFO, Controllers"
  },
  {
    icon: Users,
    title: "Produto & UX",
    description: "Métricas de produto, engajamento de usuários e jornada do cliente.",
    metrics: ["DAU/MAU", "Retention", "Feature Adoption", "Funnel Conversion", "NPS"],
    refreshRate: "Real-time / Diário",
    audience: "Product Managers, Designers"
  },
  {
    icon: Headphones,
    title: "Customer Success",
    description: "Saúde do cliente, suporte e indicadores de satisfação.",
    metrics: ["Health Score", "CSAT", "First Response Time", "Resolution Rate", "Churn Risk"],
    refreshRate: "Horário",
    audience: "CS Managers, Support"
  },
];

const biPlatforms = [
  { 
    name: "Power BI", 
    vendor: "Microsoft",
    strengths: ["Integração Microsoft", "DAX poderoso", "Enterprise-ready"],
    bestFor: "Empresas Microsoft-centric"
  },
  { 
    name: "Tableau", 
    vendor: "Salesforce",
    strengths: ["Visualizações avançadas", "Flexibilidade", "Comunidade"],
    bestFor: "Análises exploratórias complexas"
  },
  { 
    name: "Looker", 
    vendor: "Google",
    strengths: ["LookML modeling", "Embedded", "Git-based"],
    bestFor: "Produtos SaaS, empresas tech"
  },
  { 
    name: "Metabase", 
    vendor: "Open Source",
    strengths: ["Simplicidade", "Self-service", "Custo"],
    bestFor: "Startups, times menores"
  },
  { 
    name: "Apache Superset", 
    vendor: "Apache Foundation",
    strengths: ["Open source", "SQL-native", "Escalável"],
    bestFor: "Empresas com engenharia forte"
  },
  { 
    name: "Sigma Computing", 
    vendor: "Sigma",
    strengths: ["Spreadsheet-like", "Cloud-native", "Governance"],
    bestFor: "Usuários de negócio avançados"
  },
];

const implementationProcess = [
  { 
    phase: "01",
    title: "Descoberta e Requisitos",
    duration: "1-2 semanas",
    description: "Entendimento das necessidades de negócio e mapeamento de fontes de dados.",
    activities: [
      "Entrevistas com stakeholders",
      "Inventário de fontes de dados",
      "Definição de KPIs prioritários",
      "Avaliação de infraestrutura atual"
    ]
  },
  { 
    phase: "02",
    title: "Modelagem de Dados",
    duration: "2-3 semanas",
    description: "Design do modelo de dados e definição de métricas padronizadas.",
    activities: [
      "Modelagem dimensional (Estrela/Floco de Neve)",
      "Definição de camada semântica",
      "Documentação de métricas",
      "Contratos de dados com fontes"
    ]
  },
  { 
    phase: "03",
    title: "Desenvolvimento",
    duration: "3-6 semanas",
    description: "Construção de pipelines, transformações e painéis.",
    activities: [
      "Desenvolvimento de ETL/ELT",
      "Desenvolvimento de painéis",
      "Automação de relatórios",
      "Verificações de qualidade de dados"
    ]
  },
  { 
    phase: "04",
    title: "Testes e Validação",
    duration: "1-2 semanas",
    description: "Validação de dados, UAT e refinamento com usuários.",
    activities: [
      "Reconciliação de dados",
      "UAT com usuários-chave",
      "Ajuste de performance",
      "Refinamento de UX"
    ]
  },
  { 
    phase: "05",
    title: "Implantação e Adoção",
    duration: "1-2 semanas",
    description: "Go-live, treinamento e garantia de adoção.",
    activities: [
      "Publicação em produção",
      "Treinamento de usuários",
      "Documentação e guias",
      "Suporte pós-implantação"
    ]
  },
];

const analyticsUseCases = [
  {
    industry: "E-commerce",
    icon: ShoppingCart,
    examples: [
      "Análise de funil de conversão",
      "RFM segmentation",
      "Product recommendation analytics",
      "Inventory optimization"
    ]
  },
  {
    industry: "SaaS",
    icon: Cpu,
    examples: [
      "Product usage analytics",
      "Cohort retention analysis",
      "Feature adoption tracking",
      "Revenue analytics (MRR/ARR)"
    ]
  },
  {
    industry: "Varejo",
    icon: Building2,
    examples: [
      "Store performance analytics",
      "Demand forecasting",
      "Pricing optimization",
      "Supply chain visibility"
    ]
  },
  {
    industry: "Logística",
    icon: Truck,
    examples: [
      "Fleet performance tracking",
      "Route optimization analytics",
      "Delivery SLA monitoring",
      "Cost per delivery analysis"
    ]
  },
];

const valueProposition = [
  { icon: Clock, label: "Decisões 10x mais rápidas", description: "De dias para minutos com análise autônoma" },
  { icon: Eye, label: "Visibilidade total", description: "Fonte única da verdade para toda empresa" },
  { icon: AlertCircle, label: "Alertas proativos", description: "Anomalias detectadas automaticamente" },
  { icon: Users, label: "Análise autônoma", description: "Empodere times sem depender de TI" },
];

const stats = [
  { value: "1000+", label: "Dashboards Criados", description: "Em produção ativa" },
  { value: "50B+", label: "Linhas Processadas", description: "Por mês em pipelines" },
  { value: "99.9%", label: "Uptime Garantido", description: "Para sistemas críticos" },
  { value: "< 100ms", label: "Query Performance", description: "Para dashboards interativos" },
];

export default function Analytics() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        {/* Chart Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="chart-pattern" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 50 L20 40 L40 45 L60 20 L80 30 L100 10 L120 25" fill="none" stroke="rgba(244,63,94,0.5)" strokeWidth="1" />
              <circle cx="60" cy="20" r="3" fill="rgba(244,63,94,0.5)" />
              <circle cx="100" cy="10" r="3" fill="rgba(244,63,94,0.5)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#chart-pattern)" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-medium mb-8 hover:bg-rose-500/20 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Inteligência de Negócios e BI
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Inteligência de</span>{" "}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Negócios
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Dashboards inteligentes, relatórios automatizados e analytics preditivo 
              que transformam dados complexos em insights claros e decisões estratégicas.
              Da arquitetura de dados ao dashboard executivo.
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
                  Solicitar Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-rose-500/50 text-lg"
                asChild
              >
                <Link to="/portfolio">Ver Dashboards</Link>
              </Button>
            </motion.div>

            {/* Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {valueProposition.map((value, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <value.icon className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">{value.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{value.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Types Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Dashboards"
            title="Tipos de"
            titleHighlight="Dashboards"
            description="Soluções customizadas para cada nível e área da sua organização."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-6 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                    <type.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{type.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold text-rose-400 mb-2">MÉTRICAS</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {type.metrics.map((metric, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 text-xs">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                    <span><Clock className="w-3 h-3 inline mr-1" />{type.refreshRate}</span>
                    <span>{type.audience}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Services Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços"
            title="Soluções Completas em"
            titleHighlight="Analytics"
            description="Do data warehouse aos dashboards executivos, oferecemos a stack completa de BI."
          />

          <div className="mt-16 space-y-8">
            {analyticsServices.map((service, index) => (
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
                    <div className="p-4 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-4">
                      <service.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-3 text-muted-foreground">{service.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-medium border border-rose-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle2 className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
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

      {/* Implementation Process */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Implementação"
            titleHighlight="Estruturada"
            description="Metodologia comprovada para entregar valor rapidamente e garantir adoção."
          />

          <div className="mt-16 space-y-4">
            {implementationProcess.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex items-center gap-4 md:w-1/4">
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 border-2 border-rose-500/50 flex items-center justify-center shrink-0">
                      <span className="text-xl font-bold text-rose-400">{phase.phase}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{phase.title}</h4>
                      <span className="text-xs text-rose-400 flex items-center gap-1">
                        <Timer className="w-3 h-3" />{phase.duration}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-1/4">
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  <div className="md:w-1/2 flex flex-wrap gap-2">
                    {phase.activities.map((activity, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-muted/50 text-foreground text-sm border border-border/50">
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

      {/* BI Platforms Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Plataformas"
            title="Ferramentas de"
            titleHighlight="BI"
            description="Expertise nas principais plataformas de Business Intelligence do mercado."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6 hover:border-rose-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xl font-bold text-foreground">{platform.name}</h4>
                  <span className="px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs">
                    {platform.vendor}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {platform.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-rose-400" />
                      {strength}
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-xs text-rose-400">Ideal para: {platform.bestFor}</span>
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
            badge="Aplicações"
            title="Analytics por"
            titleHighlight="Indústria"
            description="Soluções específicas para os desafios de cada setor."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsUseCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-4">
                  <useCase.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-foreground mb-3">{useCase.industry}</h4>
                <ul className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
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
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-pink-500/10 to-rose-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-medium mb-6">
                <Lightbulb className="w-4 h-4" />
                Transforme Dados em Decisões
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para ter{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  visibilidade total do seu negócio?
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Agende uma demonstração gratuita e veja como nossos dashboards podem 
                transformar a forma como sua empresa toma decisões.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Demo Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-rose-500/50"
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
