import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, BarChart3, TrendingUp, Brain, 
  ChevronRight, CheckCircle2, Target, Zap, Award,
  Building2, GraduationCap, Heart, Clock, Shield,
  UserCheck, UserMinus, Briefcase, DollarSign, Gauge,
  LineChart, PieChart, Activity, Network, Timer,
  Lightbulb, Eye, Calendar, MessageSquare, Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const analyticsAreas = [
  {
    icon: UserCheck,
    title: "Talent Acquisition Analytics",
    description: "Otimização do processo de recrutamento com dados para atrair e selecionar os melhores talentos.",
    capabilities: [
      "Análise de funnel de recrutamento (aplicação → contratação)",
      "Source effectiveness e ROI de canais de atração",
      "Time-to-hire e time-to-productivity benchmarking",
      "Quality of hire metrics e predictive hiring",
      "Candidate experience analytics",
      "Diversity hiring analytics e bias detection"
    ],
    metrics: ["Time-to-Hire", "Cost-per-Hire", "Quality of Hire", "Offer Acceptance Rate"]
  },
  {
    icon: Heart,
    title: "Employee Engagement & Experience",
    description: "Mensuração contínua e análise profunda do engajamento e experiência do colaborador.",
    capabilities: [
      "Pulse surveys e continuous listening",
      "eNPS tracking e análise de drivers",
      "Employee journey mapping baseado em dados",
      "Sentiment analysis de feedback qualitativo",
      "Engagement score modeling e prediction",
      "Moment that matter analysis"
    ],
    metrics: ["eNPS", "Engagement Score", "Satisfaction Index", "Wellbeing Score"]
  },
  {
    icon: UserMinus,
    title: "Turnover & Retention Analytics",
    description: "Previsão e prevenção de turnover com modelos preditivos e análise de causas raiz.",
    capabilities: [
      "Turnover prediction models (flight risk scoring)",
      "Exit interview analysis com NLP",
      "Regrettable vs non-regrettable turnover",
      "Survival analysis por coorte e segmento",
      "Early warning indicators tracking",
      "Cost of turnover calculation por posição"
    ],
    metrics: ["Voluntary Turnover", "Retention Rate", "Flight Risk Score", "Regret Rate"]
  },
  {
    icon: TrendingUp,
    title: "Performance & Productivity Analytics",
    description: "Análise de performance individual e de times para maximizar produtividade e resultados.",
    capabilities: [
      "Performance distribution analysis",
      "High performer profiling e DNA mapping",
      "OKR/Goal attainment analytics",
      "Performance calibration support",
      "Productivity metrics e leading indicators",
      "Performance vs potential matrix automation"
    ],
    metrics: ["Goal Attainment", "9-Box Distribution", "Productivity Index", "Revenue per Employee"]
  },
  {
    icon: GraduationCap,
    title: "Learning & Development Analytics",
    description: "Mensuração de impacto de programas de T&D e otimização de investimentos em capacitação.",
    capabilities: [
      "Learning ROI calculation (Kirkpatrick extended)",
      "Skills gap analysis automatizada",
      "Learning path optimization",
      "Content effectiveness analytics",
      "Skill acquisition velocity tracking",
      "Development program impact assessment"
    ],
    metrics: ["Training ROI", "Skill Gap Closure", "Learning Hours", "Certification Rate"]
  },
  {
    icon: DollarSign,
    title: "Compensation & Workforce Planning",
    description: "Análises de remuneração, equidade salarial e planejamento estratégico da força de trabalho.",
    capabilities: [
      "Pay equity analysis (gender, race, etc)",
      "Compa-ratio analysis e benchmarking",
      "Headcount planning e scenario modeling",
      "Labor cost analytics e optimization",
      "Succession planning analytics",
      "Workforce segmentation e criticality mapping"
    ],
    metrics: ["Compa-Ratio", "Pay Gap", "Span of Control", "FTE Cost"]
  },
];

const dashboards = [
  {
    title: "Executive HR Dashboard",
    audience: "CHRO, C-Level",
    refresh: "Weekly/Monthly",
    kpis: ["Headcount", "Turnover", "eNPS", "Cost per Hire", "Revenue per Employee"]
  },
  {
    title: "Talent Acquisition Command Center",
    audience: "TA Leaders, Recruiters",
    refresh: "Daily/Real-time",
    kpis: ["Open Requisitions", "Pipeline Health", "Time-to-Fill", "Source Mix"]
  },
  {
    title: "Engagement Pulse Monitor",
    audience: "HR BPs, People Managers",
    refresh: "After each pulse",
    kpis: ["Engagement Trend", "Response Rate", "Key Drivers", "Action Items"]
  },
  {
    title: "Retention Risk Radar",
    audience: "HR BPs, Leadership",
    refresh: "Weekly",
    kpis: ["Flight Risk Scores", "At-Risk Population", "Regret Potential", "Interventions"]
  },
];

const methodology = [
  {
    phase: "01",
    title: "Assessment & Discovery",
    duration: "2-3 semanas",
    activities: [
      "Entrevistas com HR e liderança",
      "Inventário de dados e sistemas",
      "Definição de métricas prioritárias",
      "Benchmark de maturidade"
    ]
  },
  {
    phase: "02",
    title: "Data Foundation",
    duration: "3-4 semanas",
    activities: [
      "Integração de fontes (HRIS, ATS, LMS)",
      "Data cleaning e normalization",
      "Modelo de dados unificado",
      "Governance framework"
    ]
  },
  {
    phase: "03",
    title: "Analytics Build",
    duration: "4-6 semanas",
    activities: [
      "Dashboard development",
      "Modelos preditivos (turnover, etc)",
      "Automação de reports",
      "Self-service enablement"
    ]
  },
  {
    phase: "04",
    title: "Adoption & Evolution",
    duration: "Contínuo",
    activities: [
      "Treinamento de HR e managers",
      "Playbooks de ação",
      "Continuous improvement",
      "Expansão de use cases"
    ]
  },
];

const integrations = [
  { name: "Workday", type: "HRIS" },
  { name: "SAP SuccessFactors", type: "HRIS" },
  { name: "ADP", type: "Payroll" },
  { name: "Greenhouse", type: "ATS" },
  { name: "Lever", type: "ATS" },
  { name: "LinkedIn Recruiter", type: "Sourcing" },
  { name: "Culture Amp", type: "Engagement" },
  { name: "Glint", type: "Engagement" },
  { name: "Cornerstone", type: "LMS" },
  { name: "Degreed", type: "Learning" },
];

const useCases = [
  {
    title: "Previsão de Turnover",
    description: "Modelo que identifica colaboradores em risco com 3 meses de antecedência.",
    metrics: ["AUC 0.85", "30% redução turnover", "R$ 2M economia/ano"]
  },
  {
    title: "Otimização de Recrutamento",
    description: "Análise de canais e processos para reduzir time-to-hire mantendo qualidade.",
    metrics: ["-40% time-to-hire", "-25% cost-per-hire", "+15% quality of hire"]
  },
  {
    title: "Pay Equity Analysis",
    description: "Identificação e correção de gaps salariais por gênero e etnia.",
    metrics: ["Gap de 4.5% identificado", "100% correção", "Compliance garantido"]
  },
];

const stats = [
  { value: "50+", label: "Empresas Atendidas", description: "De 200 a 50.000 colaboradores" },
  { value: "2M+", label: "Colaboradores Analisados", description: "Em projetos diversos" },
  { value: "35%", label: "Redução Média Turnover", description: "Com modelos preditivos" },
  { value: "4x", label: "ROI em People Analytics", description: "Retorno comprovado" },
];

const differentiators = [
  {
    icon: Brain,
    title: "Behavioral + Analytics",
    description: "Combinamos people analytics tradicional com behavioral science para insights mais profundos sobre motivação e engajamento."
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "LGPD compliance desde o design. Anonimização, agregação e governance rigorosos para proteger dados sensíveis."
  },
  {
    icon: Lightbulb,
    title: "Actionable Insights",
    description: "Não apenas dashboards - entregamos playbooks de ação para HR e managers transformarem dados em decisões."
  },
  {
    icon: Network,
    title: "Integração Total",
    description: "Conectamos todos os sistemas de HR para uma visão 360° do employee lifecycle."
  },
];

export default function PeopleAnalytics() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        {/* Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="people-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="20" r="6" fill="none" stroke="rgba(14,165,233,0.5)" strokeWidth="1" />
              <circle cx="20" cy="60" r="6" fill="none" stroke="rgba(14,165,233,0.5)" strokeWidth="1" />
              <circle cx="60" cy="60" r="6" fill="none" stroke="rgba(14,165,233,0.5)" strokeWidth="1" />
              <line x1="40" y1="26" x2="22" y2="54" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" />
              <line x1="40" y1="26" x2="58" y2="54" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" />
              <line x1="26" y1="60" x2="54" y2="60" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#people-pattern)" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-medium mb-8 hover:bg-sky-500/20 transition-colors"
              >
                <Users className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                People Analytics
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">People</span>{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Analytics
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Inteligência de dados aplicada ao capital humano. De turnover prediction 
              a engagement analytics, transforme dados de RH em decisões estratégicas 
              que atraem, desenvolvem e retêm os melhores talentos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8 text-lg"
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
                className="border-sky-500/50 text-lg"
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
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
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

      {/* Analytics Areas Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Áreas de Analytics"
            title="Employee Lifecycle"
            titleHighlight="Data-Driven"
            description="Cobertura completa de analytics para todas as etapas do ciclo de vida do colaborador."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {analyticsAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-sky-500/10 text-sky-400">
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
                      <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                      {capability}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border/50">
                  <h5 className="text-xs font-semibold text-sky-400 mb-2">KEY METRICS</h5>
                  <div className="flex flex-wrap gap-2">
                    {area.metrics.map((metric, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Dashboards"
            title="Visualizações"
            titleHighlight="Executivas"
            description="Dashboards customizados para diferentes públicos e necessidades de HR."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboards.map((dashboard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h4 className="font-bold text-foreground">{dashboard.title}</h4>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-400" />
                    {dashboard.audience}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400" />
                    {dashboard.refresh}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {dashboard.kpis.map((kpi, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-muted/50 text-foreground text-xs">
                      {kpi}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Cases"
            title="Resultados"
            titleHighlight="Comprovados"
            description="Projetos reais de People Analytics com impacto mensurável."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <h4 className="text-lg font-bold text-foreground">{useCase.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{useCase.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {useCase.metrics.map((metric, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 text-sm font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Metodologia de"
            titleHighlight="Implementação"
            description="Abordagem estruturada para construir sua capability de People Analytics."
          />

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 border-2 border-sky-500/50 flex items-center justify-center">
                    <span className="text-lg font-bold text-sky-400">{phase.phase}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{phase.title}</h4>
                    <span className="text-xs text-sky-400">{phase.duration}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Integrações"
            title="Sistemas"
            titleHighlight="Conectados"
            description="Integramos com os principais sistemas de HR do mercado."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="glass-card px-5 py-3 hover:border-sky-500/50 transition-colors"
              >
                <div className="font-medium text-foreground">{integration.name}</div>
                <div className="text-xs text-muted-foreground">{integration.type}</div>
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
            description="O que nos diferencia em People Analytics."
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
                <div className="w-14 h-14 mx-auto rounded-xl bg-sky-500/10 flex items-center justify-center mb-4">
                  <diff.icon className="w-7 h-7 text-sky-400" />
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
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-cyan-500/10 to-sky-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Transforme seu RH em Data-Driven
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para liderar com{" "}
                <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  People Analytics?
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Descubra como dados podem transformar suas decisões de RH e criar 
                vantagem competitiva através do seu capital humano.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Iniciar People Analytics
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sky-500/50"
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
