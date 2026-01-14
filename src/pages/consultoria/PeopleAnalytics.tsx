import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, BarChart3, TrendingUp, Brain, 
  ChevronRight, CheckCircle2, Target, Zap, Award,
  Building2, GraduationCap, Heart, Clock, Shield,
  UserCheck, UserMinus, Briefcase, DollarSign, Gauge,
  LineChart, PieChart, Activity, Network, Timer,
  Lightbulb, Eye, Calendar, MessageSquare, Star, Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const analyticsAreas = [
  {
    icon: UserCheck,
    title: "Analytics de Aquisição de Talentos",
    description: "Otimização do processo de recrutamento com dados para atrair e selecionar os melhores talentos.",
    capabilities: [
      "Análise de funil de recrutamento (aplicação → contratação)",
      "Efetividade de fonte e ROI de canais de atração",
      "Benchmarking de time-to-hire e time-to-productivity",
      "Métricas de qualidade de contratação e contratação preditiva",
      "Analytics de experiência do candidato",
      "Analytics de diversidade e detecção de vieses"
    ],
    metrics: ["Time-to-Hire", "Custo por Contratação", "Qualidade da Contratação", "Taxa de Aceite"]
  },
  {
    icon: Heart,
    title: "Engajamento e Experiência do Colaborador",
    description: "Mensuração contínua e análise profunda do engajamento e experiência do colaborador.",
    capabilities: [
      "Pulse surveys e escuta contínua",
      "Tracking de eNPS e análise de drivers",
      "Mapeamento da jornada do colaborador baseado em dados",
      "Análise de sentimento em feedback qualitativo",
      "Modelagem e previsão de score de engajamento",
      "Análise de momentos que importam"
    ],
    metrics: ["eNPS", "Score de Engajamento", "Índice de Satisfação", "Score de Bem-estar"]
  },
  {
    icon: UserMinus,
    title: "Analytics de Turnover e Retenção",
    description: "Previsão e prevenção de turnover com modelos preditivos e análise de causas raiz.",
    capabilities: [
      "Modelos de previsão de turnover (flight risk scoring)",
      "Análise de entrevistas de desligamento com NLP",
      "Turnover lamentável vs não-lamentável",
      "Análise de sobrevivência por coorte e segmento",
      "Tracking de indicadores de alerta antecipado",
      "Cálculo de custo de turnover por posição"
    ],
    metrics: ["Turnover Voluntário", "Taxa de Retenção", "Score de Risco de Saída", "Taxa de Lamento"]
  },
  {
    icon: TrendingUp,
    title: "Analytics de Performance e Produtividade",
    description: "Análise de performance individual e de times para maximizar produtividade e resultados.",
    capabilities: [
      "Análise de distribuição de performance",
      "Profiling de high performers e mapeamento de DNA",
      "Analytics de atingimento de OKRs/Metas",
      "Suporte à calibração de performance",
      "Métricas de produtividade e indicadores antecedentes",
      "Automação de matriz performance vs potencial"
    ],
    metrics: ["Atingimento de Metas", "Distribuição 9-Box", "Índice de Produtividade", "Receita por Colaborador"]
  },
  {
    icon: GraduationCap,
    title: "Analytics de Aprendizagem e Desenvolvimento",
    description: "Mensuração de impacto de programas de T&D e otimização de investimentos em capacitação.",
    capabilities: [
      "Cálculo de ROI de treinamento (Kirkpatrick estendido)",
      "Análise automatizada de gaps de competências",
      "Otimização de trilhas de aprendizagem",
      "Analytics de efetividade de conteúdo",
      "Tracking de velocidade de aquisição de skills",
      "Avaliação de impacto de programas de desenvolvimento"
    ],
    metrics: ["ROI de Treinamento", "Fechamento de Gap de Skills", "Horas de Aprendizagem", "Taxa de Certificação"]
  },
  {
    icon: DollarSign,
    title: "Remuneração e Planejamento de Workforce",
    description: "Análises de remuneração, equidade salarial e planejamento estratégico da força de trabalho.",
    capabilities: [
      "Análise de equidade salarial (gênero, raça, etc)",
      "Análise de compa-ratio e benchmarking",
      "Planejamento de headcount e modelagem de cenários",
      "Analytics de custo de mão de obra e otimização",
      "Analytics de planejamento de sucessão",
      "Segmentação de workforce e mapeamento de criticidade"
    ],
    metrics: ["Compa-Ratio", "Gap Salarial", "Span of Control", "Custo de FTE"]
  },
];

const dashboards = [
  {
    title: "Dashboard Executivo de RH",
    audience: "CHRO, C-Level",
    refresh: "Semanal/Mensal",
    kpis: ["Headcount", "Turnover", "eNPS", "Custo por Contratação", "Receita por Colaborador"]
  },
  {
    title: "Centro de Comando de Recrutamento",
    audience: "Líderes de TA, Recrutadores",
    refresh: "Diário/Tempo real",
    kpis: ["Vagas Abertas", "Saúde do Pipeline", "Time-to-Fill", "Mix de Fontes"]
  },
  {
    title: "Monitor de Engajamento",
    audience: "HR BPs, Gestores de Pessoas",
    refresh: "Após cada pulse",
    kpis: ["Tendência de Engajamento", "Taxa de Resposta", "Drivers Principais", "Itens de Ação"]
  },
  {
    title: "Radar de Risco de Retenção",
    audience: "HR BPs, Liderança",
    refresh: "Semanal",
    kpis: ["Scores de Risco de Saída", "População em Risco", "Potencial de Lamento", "Intervenções"]
  },
];

const methodology = [
  {
    phase: "01",
    title: "Avaliação e Descoberta",
    duration: "2-3 semanas",
    activities: [
      "Entrevistas com RH e liderança",
      "Inventário de dados e sistemas",
      "Definição de métricas prioritárias",
      "Benchmark de maturidade"
    ]
  },
  {
    phase: "02",
    title: "Fundação de Dados",
    duration: "3-4 semanas",
    activities: [
      "Integração de fontes (HRIS, ATS, LMS)",
      "Limpeza e normalização de dados",
      "Modelo de dados unificado",
      "Framework de governança"
    ]
  },
  {
    phase: "03",
    title: "Construção de Analytics",
    duration: "4-6 semanas",
    activities: [
      "Desenvolvimento de dashboards",
      "Modelos preditivos (turnover, etc)",
      "Automação de relatórios",
      "Habilitação de self-service"
    ]
  },
  {
    phase: "04",
    title: "Adoção e Evolução",
    duration: "Contínuo",
    activities: [
      "Treinamento de RH e gestores",
      "Playbooks de ação",
      "Melhoria contínua",
      "Expansão de casos de uso"
    ]
  },
];

const integrations = [
  { name: "Workday", type: "HRIS" },
  { name: "SAP SuccessFactors", type: "HRIS" },
  { name: "ADP", type: "Folha" },
  { name: "Greenhouse", type: "ATS" },
  { name: "Lever", type: "ATS" },
  { name: "LinkedIn Recruiter", type: "Sourcing" },
  { name: "Culture Amp", type: "Engajamento" },
  { name: "Glint", type: "Engajamento" },
  { name: "Cornerstone", type: "LMS" },
  { name: "Degreed", type: "Aprendizagem" },
];

const differentiators = [
  {
    icon: Brain,
    title: "Comportamental + Analytics",
    description: "Combinamos people analytics tradicional com behavioral science para insights mais profundos sobre motivação e engajamento."
  },
  {
    icon: Shield,
    title: "Privacidade em Primeiro Lugar",
    description: "Conformidade com LGPD desde o design. Anonimização, agregação e governança rigorosos para proteger dados sensíveis."
  },
  {
    icon: Lightbulb,
    title: "Insights Acionáveis",
    description: "Não apenas dashboards - entregamos playbooks de ação para RH e gestores transformarem dados em decisões."
  },
  {
    icon: Network,
    title: "Integração Total",
    description: "Conectamos todos os sistemas de RH para uma visão 360° do ciclo de vida do colaborador."
  },
  {
    icon: Lock,
    title: "Confidencialidade Total",
    description: "Todos os projetos são conduzidos sob rigorosos acordos de confidencialidade. Os dados e informações de seus colaboradores são tratados com absoluto sigilo."
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
                Análise de Pessoas
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Análise de</span>{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Pessoas
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Inteligência de dados aplicada ao capital humano. De previsão de turnover 
              a analytics de engajamento, transforme dados de RH em decisões estratégicas 
              que atraem, desenvolvem e retêm os melhores talentos.
            </motion.p>

            {/* Confidentiality Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30"
            >
              <Lock className="w-4 h-4 text-sky-400" />
              <span className="text-sm text-sky-400">Todos os projetos sob rigorosa confidencialidade</span>
            </motion.div>

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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Areas Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Áreas de Analytics"
            title="Ciclo de Vida do Colaborador"
            titleHighlight="Orientado por Dados"
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
                  <h5 className="text-xs font-semibold text-sky-400 mb-2">MÉTRICAS CHAVE</h5>
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
            description="Dashboards customizados para diferentes públicos e necessidades de RH."
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

      {/* Methodology */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Jornada de"
            titleHighlight="Implementação"
            description="Processo estruturado para entregar valor rapidamente e de forma sustentável."
          />

          <div className="mt-12">
            <div className="grid md:grid-cols-4 gap-6">
              {methodology.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  {index < methodology.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-sky-500/50 to-transparent z-0" />
                  )}
                  <div className="glass-card p-6 relative z-10 h-full">
                    <div className="text-4xl font-bold text-sky-400/20 mb-2">{phase.phase}</div>
                    <h4 className="text-lg font-bold text-foreground">{phase.title}</h4>
                    <div className="mt-1 text-xs text-sky-400">{phase.duration}</div>
                    <ul className="mt-4 space-y-2">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Integrações"
            title="Conectamos com seus"
            titleHighlight="Sistemas"
            description="Experiência com as principais plataformas de RH do mercado."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-5 py-3 rounded-full bg-muted/30 border border-border/50 hover:border-sky-500/50 transition-colors"
              >
                <span className="font-medium text-foreground">{integration.name}</span>
                <span className="ml-2 text-xs text-sky-400">{integration.type}</span>
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
            description="O que nos torna únicos em projetos de People Analytics."
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
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 w-fit mb-4">
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
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-teal-500/20 p-12 md:p-16"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 border border-sky-500/30 mb-6">
                <Lock className="w-4 h-4 text-sky-400" />
                <span className="text-sm text-sky-400 font-medium">Confidencialidade Garantida</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pronto para transformar dados de{" "}
                <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  RH em estratégia?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Vamos discutir como people analytics pode impulsionar seus resultados de negócio.
                Todo o trabalho é realizado sob rigorosos acordos de confidencialidade.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8"
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
