import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, BarChart3, PieChart, TrendingUp, LineChart, 
  ChevronRight, CheckCircle2, Monitor, Gauge, Eye,
  Database, Zap, Layers, RefreshCw, FileText, Users,
  Target, Clock, AlertCircle, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const services = [
  {
    icon: Monitor,
    title: "Dashboards Executivos",
    description: "Visualizações interativas e em tempo real para acompanhamento de KPIs críticos do negócio.",
    features: ["Real-time Updates", "Mobile Responsive", "Drill-down", "Alertas Automáticos"]
  },
  {
    icon: PieChart,
    title: "Relatórios Automatizados",
    description: "Geração automática de relatórios periódicos com insights acionáveis para decisores.",
    features: ["Agendamento", "Múltiplos Formatos", "Distribuição Automática", "Templates Customizados"]
  },
  {
    icon: TrendingUp,
    title: "Análise Preditiva",
    description: "Modelos que antecipam tendências, sazonalidades e comportamentos futuros do mercado.",
    features: ["Forecasting", "Detecção de Anomalias", "What-If Analysis", "Cenários"]
  },
  {
    icon: Database,
    title: "Governança de Dados",
    description: "Estruturação de data warehouse, qualidade de dados e self-service analytics.",
    features: ["Data Catalog", "Data Quality", "Self-Service BI", "Data Lineage"]
  },
];

const tools = [
  { name: "Power BI", category: "Microsoft", icon: "📊" },
  { name: "Tableau", category: "Salesforce", icon: "📈" },
  { name: "Looker", category: "Google", icon: "🔍" },
  { name: "Metabase", category: "Open Source", icon: "📉" },
  { name: "Superset", category: "Apache", icon: "📊" },
  { name: "Redash", category: "Open Source", icon: "📋" },
];

const dashboardTypes = [
  {
    icon: Gauge,
    title: "Operacional",
    description: "Monitoramento em tempo real de processos e operações do dia a dia.",
    metrics: ["SLA", "Throughput", "Uptime", "Queue Size"]
  },
  {
    icon: Target,
    title: "Estratégico",
    description: "Visão de alto nível para C-Level com indicadores de performance do negócio.",
    metrics: ["Revenue", "Market Share", "CAC", "LTV"]
  },
  {
    icon: Users,
    title: "Comercial",
    description: "Acompanhamento de vendas, pipeline e performance de equipes comerciais.",
    metrics: ["Pipeline", "Win Rate", "Ticket Médio", "Churn"]
  },
  {
    icon: TrendingUp,
    title: "Financeiro",
    description: "Controle de receitas, despesas, fluxo de caixa e projeções financeiras.",
    metrics: ["EBITDA", "Cash Flow", "ROI", "Margem"]
  },
];

const process = [
  { 
    step: "01", 
    title: "Levantamento",
    description: "Entendimento das necessidades e mapeamento de fontes de dados"
  },
  { 
    step: "02", 
    title: "Modelagem",
    description: "Design do data model e definição de métricas e KPIs"
  },
  { 
    step: "03", 
    title: "Desenvolvimento",
    description: "Construção de ETL, dashboards e automações"
  },
  { 
    step: "04", 
    title: "Validação",
    description: "Testes com usuários e refinamento das visualizações"
  },
  { 
    step: "05", 
    title: "Deploy & Training",
    description: "Publicação e capacitação das equipes"
  },
];

const benefits = [
  { icon: Clock, label: "Decisões 10x mais rápidas" },
  { icon: Eye, label: "Visibilidade total do negócio" },
  { icon: AlertCircle, label: "Alertas proativos" },
  { icon: Filter, label: "Self-service analytics" },
];

export default function Analytics() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        {/* Chart Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="chart-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q25 30 50 50 T100 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-rose-400" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#chart-pattern)" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
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
                Business Analytics
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Business</span>{" "}
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Analytics
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Dashboards inteligentes e relatórios executivos que transformam 
              dados complexos em insights claros para decisões estratégicas.
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

            {/* Benefits Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 flex flex-wrap justify-center gap-4"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-muted/30 border border-border/50"
                >
                  <benefit.icon className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-medium text-foreground">{benefit.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Types Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Dashboards"
            title="Tipos de"
            titleHighlight="Dashboards"
            description="Soluções customizadas para cada nível e área da sua organização."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-6 hover-lift group"
              >
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 w-fit group-hover:bg-rose-500/20 transition-colors">
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">{type.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {type.metrics.map((metric, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-medium"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços"
            title="Soluções em"
            titleHighlight="Analytics"
            description="Do data warehouse aos dashboards executivos, oferecemos a stack completa de BI."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift group"
              >
                <div className="p-4 rounded-xl bg-rose-500/10 text-rose-400 w-fit group-hover:bg-rose-500/20 transition-colors">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-rose-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Como"
            titleHighlight="Trabalhamos"
            description="Um processo estruturado para entregar valor rapidamente."
          />

          <div className="mt-16 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-rose-400">{item.step}</span>
                  </div>
                  <h4 className="mt-4 font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Ferramentas"
            title="Plataformas"
            titleHighlight="BI"
            description="Trabalhamos com as principais ferramentas de Business Intelligence do mercado."
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-5 text-center hover:border-rose-500/50 transition-colors group"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="text-base font-bold text-foreground">{tool.name}</div>
                <div className="text-xs text-muted-foreground">{tool.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  Por que Analytics?
                </span>
                <h3 className="text-3xl font-bold text-white">
                  Dados sem visualização são apenas{" "}
                  <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                    números
                  </span>
                </h3>
                <p className="mt-4 text-muted-foreground text-lg">
                  Transformamos complexidade em clareza. Nossos dashboards não apenas 
                  mostram dados - eles contam histórias e revelam oportunidades.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "500+", label: "Dashboards Criados" },
                  { value: "50+", label: "Empresas Atendidas" },
                  { value: "10M+", label: "Linhas Processadas/Dia" },
                  { value: "99.9%", label: "Uptime Garantido" },
                ].map((item, index) => (
                  <div key={index} className="p-5 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
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
                <LineChart className="w-4 h-4" />
                Visualize o Futuro
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para tomar decisões{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  baseadas em dados?
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Agende uma demonstração e veja como nossos dashboards podem 
                transformar a forma como sua empresa toma decisões.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8"
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
                  className="border-rose-500/50"
                  asChild
                >
                  <Link to="/consultoria">Ver Outras Áreas</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
