import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, BarChart3, PieChart, TrendingUp, LineChart, 
  ChevronRight, CheckCircle2, Monitor, Gauge, Eye,
  Database, Zap, Layers, RefreshCw, FileText, Users,
  Target, Clock, AlertCircle, Filter, Lightbulb, Shield,
  Settings, Activity, Binary, Network, Cpu, Timer,
  Building2, DollarSign, ShoppingCart, Truck, Headphones,
  Lock, Award, Workflow, GitBranch
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// ============================================
// DADOS E CONFIGURAÇÕES
// ============================================

const analyticsServices = [
  {
    icon: Monitor,
    title: "Dashboards Executivos",
    description: "Visualizações interativas em tempo real para monitoramento de KPIs críticos e tomada de decisão baseada em evidências.",
    capabilities: [
      "Design estratificado: dashboards estratégicos, táticos e operacionais",
      "Streaming em tempo real com Apache Kafka e WebSockets",
      "Drill-down interativo multi-nível com contexto preservado",
      "Sistema de alertas inteligentes com limiares dinâmicos",
      "Responsividade completa para dispositivos móveis e tablets",
      "Embedded Analytics para integração em produtos SaaS"
    ],
    technologies: ["Power BI", "Tableau", "Looker", "Metabase", "Apache Superset"]
  },
  {
    icon: RefreshCw,
    title: "Relatórios Automatizados",
    description: "Sistema inteligente de geração e distribuição de relatórios com insights acionáveis e narrativa automatizada.",
    capabilities: [
      "Agendamento flexível: diário, semanal, mensal ou sob demanda",
      "Templates customizados por perfil de audiência",
      "Múltiplos formatos de saída: PDF, Excel, HTML, Slides",
      "Geração automática de narrativa com NLG (Natural Language Generation)",
      "Detecção automática de anomalias e desvios significativos",
      "Distribuição multi-canal: e-mail, Slack, Microsoft Teams, WhatsApp"
    ],
    technologies: ["Apache Airflow", "dbt", "Jupyter", "Papermill", "Great Expectations"]
  },
  {
    icon: TrendingUp,
    title: "Analytics Preditivo e Forecasting",
    description: "Modelos estatísticos e de machine learning para antecipar tendências, sazonalidades e comportamentos futuros.",
    capabilities: [
      "Previsão de vendas, receita e demanda com múltiplos horizontes",
      "Detecção de anomalias com explicabilidade e root cause analysis",
      "Análise de cenários what-if e simulação de hipóteses",
      "Modelos de propensão: churn, conversão, cross-sell, upsell",
      "Modelagem de atribuição multi-touch para marketing",
      "Análise de coortes e modelagem de Customer Lifetime Value"
    ],
    technologies: ["Prophet", "ARIMA/SARIMA", "XGBoost", "LightGBM", "TensorFlow"]
  },
  {
    icon: Database,
    title: "Governança e Arquitetura de Dados",
    description: "Fundação sólida de infraestrutura de dados para analytics escalável, confiável e governado.",
    capabilities: [
      "Data Warehouse moderno: Snowflake, BigQuery, Redshift, Databricks",
      "Arquitetura Lakehouse com Delta Lake e Apache Iceberg",
      "Camada semântica unificada para métricas consistentes",
      "Catálogo de dados e Data Discovery automatizado",
      "Monitoramento contínuo de Data Quality com SLAs",
      "Habilitação de Self-Service Analytics para equipes de negócio"
    ],
    technologies: ["Snowflake", "dbt", "Atlan", "Monte Carlo", "Cube.dev"]
  },
];

const dashboardTypes = [
  {
    icon: Gauge,
    title: "Operacional",
    description: "Monitoramento em tempo real de processos, operações e métricas do dia a dia.",
    metrics: ["SLA Compliance", "Throughput", "Queue Size", "Error Rate", "Uptime"],
    refreshRate: "Tempo real / 1 min",
    audience: "Operadores, Supervisores, Coordenadores"
  },
  {
    icon: Target,
    title: "Estratégico",
    description: "Visão de alto nível para executivos com indicadores consolidados de performance.",
    metrics: ["Revenue", "Market Share", "NPS", "Customer LTV", "Burn Rate"],
    refreshRate: "Diário / Semanal",
    audience: "C-Level, Board, Diretoria"
  },
  {
    icon: ShoppingCart,
    title: "Comercial e Vendas",
    description: "Acompanhamento completo de pipeline, performance comercial e métricas de vendas.",
    metrics: ["Pipeline Value", "Win Rate", "Ticket Médio", "CAC", "Quota Attainment"],
    refreshRate: "Horário / Diário",
    audience: "VP Comercial, Gerentes de Vendas, Representantes"
  },
  {
    icon: DollarSign,
    title: "Financeiro",
    description: "Controle rigoroso de receitas, despesas, fluxo de caixa e projeções financeiras.",
    metrics: ["EBITDA", "Cash Flow", "Gross Margin", "Opex Ratio", "DSO"],
    refreshRate: "Diário / Mensal",
    audience: "CFO, Controllers, FP&A"
  },
  {
    icon: Users,
    title: "Produto e UX",
    description: "Métricas de produto, engajamento de usuários e análise de jornada do cliente.",
    metrics: ["DAU/MAU", "Retention", "Feature Adoption", "Funnel Conversion", "Session Duration"],
    refreshRate: "Tempo real / Diário",
    audience: "Product Managers, Designers, Growth"
  },
  {
    icon: Headphones,
    title: "Customer Success",
    description: "Monitoramento de saúde do cliente, atendimento e indicadores de satisfação.",
    metrics: ["Health Score", "CSAT", "First Response Time", "Resolution Rate", "Churn Risk"],
    refreshRate: "Horário / Diário",
    audience: "CS Managers, Suporte, Account Managers"
  },
];

const biPlatforms = [
  { 
    name: "Power BI", 
    vendor: "Microsoft",
    strengths: ["Integração nativa com ecossistema Microsoft", "Linguagem DAX robusta", "Enterprise-ready"],
    bestFor: "Organizações com stack Microsoft"
  },
  { 
    name: "Tableau", 
    vendor: "Salesforce",
    strengths: ["Visualizações avançadas e flexíveis", "Análise exploratória intuitiva", "Comunidade ativa"],
    bestFor: "Análises exploratórias complexas"
  },
  { 
    name: "Looker", 
    vendor: "Google Cloud",
    strengths: ["LookML para modelagem semântica", "Embedded Analytics nativo", "Versionamento Git"],
    bestFor: "Empresas de tecnologia e produtos SaaS"
  },
  { 
    name: "Metabase", 
    vendor: "Open Source",
    strengths: ["Simplicidade e baixa curva de aprendizado", "Self-service real", "Custo acessível"],
    bestFor: "Startups e equipes menores"
  },
  { 
    name: "Apache Superset", 
    vendor: "Apache Foundation",
    strengths: ["Open source robusto", "SQL-native", "Alta escalabilidade"],
    bestFor: "Organizações com engenharia de dados madura"
  },
  { 
    name: "Sigma Computing", 
    vendor: "Sigma",
    strengths: ["Interface similar a planilhas", "Cloud-native", "Governança integrada"],
    bestFor: "Usuários de negócio com perfil analítico"
  },
];

const implementationProcess = [
  { 
    phase: "01",
    title: "Descoberta e Levantamento",
    duration: "1-2 semanas",
    description: "Imersão profunda nas necessidades de negócio e mapeamento completo de fontes de dados.",
    activities: [
      "Entrevistas com stakeholders e usuários-chave",
      "Inventário de fontes de dados e sistemas legados",
      "Definição de KPIs prioritários por área",
      "Avaliação de infraestrutura e maturidade atual"
    ]
  },
  { 
    phase: "02",
    title: "Modelagem de Dados",
    duration: "2-3 semanas",
    description: "Design do modelo dimensional e definição de métricas padronizadas e governadas.",
    activities: [
      "Modelagem dimensional: Star Schema e Snowflake Schema",
      "Definição de camada semântica unificada",
      "Documentação de métricas e glossário de negócios",
      "Contratos de dados com times de origem"
    ]
  },
  { 
    phase: "03",
    title: "Desenvolvimento",
    duration: "3-6 semanas",
    description: "Construção de pipelines de dados, transformações e dashboards interativos.",
    activities: [
      "Desenvolvimento de pipelines ETL/ELT",
      "Construção de dashboards e visualizações",
      "Automação de relatórios e alertas",
      "Implementação de verificações de Data Quality"
    ]
  },
  { 
    phase: "04",
    title: "Testes e Validação",
    duration: "1-2 semanas",
    description: "Validação rigorosa de dados, UAT com usuários e refinamento baseado em feedback.",
    activities: [
      "Reconciliação de dados com fontes originais",
      "User Acceptance Testing (UAT) com usuários-chave",
      "Ajuste de performance e otimização de queries",
      "Refinamento de UX baseado em feedback"
    ]
  },
  { 
    phase: "05",
    title: "Implantação e Adoção",
    duration: "1-2 semanas",
    description: "Go-live em produção, capacitação de usuários e garantia de adoção sustentável.",
    activities: [
      "Publicação em ambiente de produção",
      "Treinamento segmentado por perfil de usuário",
      "Documentação completa e guias de uso",
      "Suporte intensivo pós-implantação"
    ]
  },
];

const analyticsUseCases = [
  {
    industry: "E-commerce",
    icon: ShoppingCart,
    examples: [
      "Análise de funil de conversão por canal e dispositivo",
      "Segmentação RFM automatizada para campanhas",
      "Analytics de recomendação de produtos",
      "Otimização de estoque baseada em demanda"
    ]
  },
  {
    industry: "SaaS e Tecnologia",
    icon: Cpu,
    examples: [
      "Product Usage Analytics e feature adoption",
      "Análise de coortes e retenção por segmento",
      "Tracking de adoção de funcionalidades",
      "Revenue Analytics: MRR, ARR, expansão, contração"
    ]
  },
  {
    industry: "Varejo",
    icon: Building2,
    examples: [
      "Performance de lojas e vendedores",
      "Previsão de demanda por SKU e localidade",
      "Otimização de pricing e margem",
      "Visibilidade de supply chain"
    ]
  },
  {
    industry: "Logística",
    icon: Truck,
    examples: [
      "Performance de frota e motoristas",
      "Otimização de rotas e custos",
      "Monitoramento de SLA de entregas",
      "Análise de custo por entrega e região"
    ]
  },
];

const valueProposition = [
  { icon: Clock, label: "Decisões 10x mais rápidas", description: "De dias para minutos com self-service" },
  { icon: Eye, label: "Visibilidade total do negócio", description: "Single source of truth organizacional" },
  { icon: AlertCircle, label: "Alertas proativos", description: "Anomalias detectadas automaticamente" },
  { icon: Users, label: "Self-Service Analytics", description: "Empodere equipes sem depender de TI" },
];

const stats = [
  { value: "Power BI", label: "Plataformas Líderes", description: "Tableau, Looker, Metabase e mais" },
  { value: "99.9%", label: "Disponibilidade", description: "Para sistemas críticos" },
  { value: "< 100ms", label: "Performance de Query", description: "Para dashboards interativos" },
];

const differentiators = [
  {
    icon: Award,
    title: "Rigor Metodológico",
    description: "Aplicamos frameworks consagrados de modelagem dimensional e governança de dados para garantir qualidade e escalabilidade."
  },
  {
    icon: Workflow,
    title: "Integração Completa",
    description: "Conectamos todas as fontes de dados da organização em uma visão unificada e consistente."
  },
  {
    icon: Shield,
    title: "Governança desde o Design",
    description: "Segurança, privacidade e conformidade LGPD integrados desde a arquitetura inicial."
  },
  {
    icon: Lightbulb,
    title: "Foco em Adoção",
    description: "Não basta construir dashboards bonitos. Garantimos que as equipes realmente usem e confiem nos dados."
  },
  {
    icon: Lock,
    title: "Confidencialidade Total",
    description: "Todos os projetos são conduzidos sob rigorosos acordos de confidencialidade. Seus dados estratégicos permanecem absolutamente sigilosos."
  },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function Analytics() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Chart Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="chart-pattern" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 50 L20 40 L40 45 L60 20 L80 30 L100 10 L120 25" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
              <circle cx="60" cy="20" r="3" fill="hsl(var(--primary) / 0.5)" />
              <circle cx="100" cy="10" r="3" fill="hsl(var(--primary) / 0.5)" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 hover:bg-primary/20 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Analytics e BI
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-foreground">Analytics e</span>{" "}
              <span className="gradient-text-purple">
                Business Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Dashboards executivos, relatórios automatizados e analytics preditivo 
              que transformam dados complexos em insights acionáveis. 
              Da arquitetura de dados ao painel executivo, com governança integrada.
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
                  Solicitar Demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg"
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
                <div key={index} className="p-4 rounded-xl bg-card/50 border border-border/30">
                  <value.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium text-foreground">{value.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{value.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
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
                <div className="text-3xl md:text-4xl font-bold gradient-text-purple">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços"
            title="Soluções de"
            titleHighlight="Analytics"
            description="Cobertura completa desde a infraestrutura de dados até dashboards executivos e modelos preditivos."
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
                    <div className="p-4 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                      <service.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-3 text-muted-foreground">{service.description}</p>
                    <div className="mt-6">
                      <h5 className="text-xs font-semibold text-primary mb-2">TECNOLOGIAS</h5>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                            {tech}
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

      {/* Dashboard Types Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Dashboards"
            title="Tipos de"
            titleHighlight="Painéis"
            description="Soluções customizadas para cada nível hierárquico e área funcional da sua organização."
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
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <type.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{type.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold text-primary mb-2">MÉTRICAS PRINCIPAIS</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {type.metrics.map((metric, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
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

      {/* BI Platforms Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Plataformas"
            title="Ferramentas de"
            titleHighlight="BI"
            description="Dominamos as principais plataformas do mercado para entregar a melhor solução para seu contexto."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biPlatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-foreground">{platform.name}</h4>
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs">{platform.vendor}</span>
                </div>
                <div className="space-y-2 mb-4">
                  {platform.strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {strength}
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Ideal para: </span>
                  <span className="text-xs text-foreground font-medium">{platform.bestFor}</span>
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
            badge="Aplicações"
            title="Casos de Uso por"
            titleHighlight="Indústria"
            description="Experiência em diversos setores com soluções adaptadas a cada contexto de negócio."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsUseCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <useCase.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{useCase.industry}</h4>
                </div>
                <div className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {example}
                    </div>
                  ))}
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
            badge="Metodologia"
            title="Processo de"
            titleHighlight="Implementação"
            description="Abordagem estruturada para garantir entregas de qualidade e adoção sustentável."
          />

          <div className="mt-12">
            <div className="grid md:grid-cols-5 gap-4">
              {implementationProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < implementationProcess.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                  )}
                  
                  <div className="glass-card p-6 relative z-10 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold gradient-text-purple">{step.phase}</span>
                      <div className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs">{step.duration}</div>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                    <div className="space-y-1.5">
                      {step.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Diferenciais"
            title="Por que escolher a"
            titleHighlight="Vixio"
            description="Combinamos expertise técnica com visão de negócio para entregar soluções que geram impacto real."
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
      <section className="section-padding">
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
                Pronto para transformar dados em <span className="gradient-text-purple">decisões estratégicas</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Agende uma conversa com nossos especialistas e descubra como podemos 
                acelerar sua jornada de dados e analytics.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="px-8" asChild>
                  <Link to="/contato">
                    Agendar Demonstração
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
