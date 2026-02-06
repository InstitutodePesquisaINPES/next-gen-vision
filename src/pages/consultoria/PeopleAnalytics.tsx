import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Users, BarChart3, TrendingUp, Brain, 
  ChevronRight, CheckCircle2, Target, Zap, Award,
  Building2, GraduationCap, Heart, Clock, Shield,
  UserCheck, UserMinus, Briefcase, DollarSign, Gauge,
  LineChart, PieChart, Activity, Network, Timer,
  Lightbulb, Eye, Calendar, MessageSquare, Star, Lock,
  UserPlus, Workflow, BookOpen, Scale
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// ============================================
// DADOS E CONFIGURAÇÕES
// ============================================

const analyticsAreas = [
  {
    icon: UserPlus,
    title: "Analytics de Aquisição de Talentos",
    description: "Otimização do processo de recrutamento e seleção com dados para atrair, avaliar e contratar os melhores talentos.",
    capabilities: [
      "Análise de funil de recrutamento: candidatura → contratação",
      "Efetividade de fontes de recrutamento e ROI por canal",
      "Benchmarking de Time-to-Hire e Time-to-Productivity",
      "Métricas de qualidade de contratação e predição de performance",
      "Analytics de experiência do candidato (Candidate Experience)",
      "Análise de diversidade e detecção de vieses no processo"
    ],
    metrics: ["Time-to-Hire", "Custo por Contratação", "Qualidade da Contratação", "Taxa de Aceite de Oferta"]
  },
  {
    icon: Heart,
    title: "Engajamento e Experiência do Colaborador",
    description: "Mensuração contínua e análise profunda do engajamento, bem-estar e experiência do colaborador.",
    capabilities: [
      "Pesquisas Pulse e escuta contínua automatizada",
      "Tracking de eNPS com análise de drivers e detratores",
      "Mapeamento da jornada do colaborador baseado em dados",
      "Análise de sentimento em feedback qualitativo com NLP",
      "Modelagem e previsão de score de engajamento",
      "Análise de Moments that Matter ao longo do ciclo de vida"
    ],
    metrics: ["eNPS", "Score de Engajamento", "Índice de Satisfação", "Score de Bem-estar"]
  },
  {
    icon: UserMinus,
    title: "Analytics de Turnover e Retenção",
    description: "Previsão e prevenção proativa de turnover com modelos preditivos e análise de causas raiz.",
    capabilities: [
      "Modelos de previsão de turnover (Flight Risk Scoring)",
      "Análise de entrevistas de desligamento com NLP",
      "Segmentação: turnover lamentável vs não-lamentável",
      "Análise de sobrevivência por coorte, cargo e segmento",
      "Tracking de indicadores de alerta antecipado",
      "Cálculo de custo de turnover por posição e senioridade"
    ],
    metrics: ["Turnover Voluntário", "Taxa de Retenção", "Score de Risco de Saída", "Taxa de Lamento"]
  },
  {
    icon: TrendingUp,
    title: "Analytics de Performance e Produtividade",
    description: "Análise de performance individual e de equipes para maximizar produtividade e resultados.",
    capabilities: [
      "Análise de distribuição de performance organizacional",
      "Profiling de High Performers e mapeamento de DNA de sucesso",
      "Analytics de atingimento de OKRs e metas por área",
      "Suporte à calibração de performance com dados",
      "Métricas de produtividade e indicadores antecedentes",
      "Automação de matriz 9-Box (Performance vs Potencial)"
    ],
    metrics: ["Atingimento de Metas", "Distribuição 9-Box", "Índice de Produtividade", "Receita por Colaborador"]
  },
  {
    icon: GraduationCap,
    title: "Analytics de Aprendizagem e Desenvolvimento",
    description: "Mensuração de impacto de programas de T&D e otimização de investimentos em capacitação.",
    capabilities: [
      "Cálculo de ROI de treinamento (Modelo Kirkpatrick estendido)",
      "Análise automatizada de gaps de competências",
      "Otimização de trilhas de aprendizagem personalizadas",
      "Analytics de efetividade e engajamento de conteúdo",
      "Tracking de velocidade de aquisição de skills",
      "Avaliação de impacto de programas de liderança"
    ],
    metrics: ["ROI de Treinamento", "Fechamento de Gap de Skills", "Horas de Aprendizagem", "Taxa de Certificação"]
  },
  {
    icon: Scale,
    title: "Remuneração e Planejamento de Workforce",
    description: "Análises de remuneração, equidade salarial e planejamento estratégico da força de trabalho.",
    capabilities: [
      "Análise de equidade salarial: gênero, raça, região",
      "Análise de Compa-Ratio e benchmarking de mercado",
      "Planejamento de headcount e modelagem de cenários",
      "Analytics de custo de mão de obra e otimização",
      "Analytics de planejamento de sucessão",
      "Segmentação de workforce e mapeamento de criticidade"
    ],
    metrics: ["Compa-Ratio", "Pay Gap", "Span of Control", "Custo de FTE"]
  },
];

const dashboards = [
  {
    title: "Dashboard Executivo de RH",
    audience: "CHRO, Diretoria, C-Level",
    refresh: "Semanal / Mensal",
    kpis: ["Headcount", "Turnover", "eNPS", "Custo por Contratação", "Receita por Colaborador"]
  },
  {
    title: "Central de Comando de Recrutamento",
    audience: "Líderes de TA, Recrutadores",
    refresh: "Diário / Tempo real",
    kpis: ["Vagas Abertas", "Saúde do Pipeline", "Time-to-Fill", "Mix de Fontes"]
  },
  {
    title: "Monitor de Engajamento",
    audience: "HR Business Partners, Gestores de Pessoas",
    refresh: "Após cada Pulse Survey",
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
      "Benchmark de maturidade analítica"
    ]
  },
  {
    phase: "02",
    title: "Fundação de Dados",
    duration: "3-4 semanas",
    activities: [
      "Integração de fontes: HRIS, ATS, LMS",
      "Limpeza e normalização de dados",
      "Modelo de dados unificado de pessoas",
      "Framework de governança e privacidade"
    ]
  },
  {
    phase: "03",
    title: "Construção de Analytics",
    duration: "4-6 semanas",
    activities: [
      "Desenvolvimento de dashboards",
      "Modelos preditivos: turnover, performance",
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
      "Playbooks de ação baseados em dados",
      "Melhoria contínua de modelos",
      "Expansão de casos de uso"
    ]
  },
];

const integrations = [
  { name: "Workday", type: "HRIS" },
  { name: "SAP SuccessFactors", type: "HRIS" },
  { name: "ADP", type: "Folha de Pagamento" },
  { name: "Greenhouse", type: "ATS" },
  { name: "Lever", type: "ATS" },
  { name: "LinkedIn Recruiter", type: "Sourcing" },
  { name: "Culture Amp", type: "Engajamento" },
  { name: "Glint", type: "Engajamento" },
  { name: "Cornerstone", type: "LMS" },
  { name: "Degreed", type: "Aprendizagem" },
  { name: "TOTVS", type: "ERP / Folha" },
  { name: "Gupy", type: "ATS" },
];

const differentiators = [
  {
    icon: Brain,
    title: "Comportamental + Analytics",
    description: "Combinamos People Analytics tradicional com Behavioral Science para insights mais profundos sobre motivação, engajamento e comportamento organizacional."
  },
  {
    icon: Shield,
    title: "Privacidade em Primeiro Lugar",
    description: "Conformidade com LGPD desde o design. Anonimização, agregação mínima e governança rigorosa para proteger dados sensíveis de colaboradores."
  },
  {
    icon: Lightbulb,
    title: "Insights Acionáveis",
    description: "Não entregamos apenas dashboards. Desenvolvemos playbooks de ação para RH e gestores transformarem dados em decisões e intervenções efetivas."
  },
  {
    icon: Network,
    title: "Integração Total",
    description: "Conectamos todos os sistemas de RH para uma visão 360° do ciclo de vida do colaborador, desde a candidatura até o desligamento."
  },
  {
    icon: Lock,
    title: "Confidencialidade Total",
    description: "Todos os projetos são conduzidos sob rigorosos acordos de confidencialidade. Os dados e informações de seus colaboradores são tratados com absoluto sigilo."
  },
];

const useCases = [
  {
    title: "Redução de Turnover",
    description: "Identificação proativa de colaboradores em risco com modelos preditivos e intervenções personalizadas.",
  },
  {
    title: "Otimização de Recrutamento",
    description: "Análise de efetividade de fontes e predição de fit cultural para contratações de maior qualidade.",
  },
  {
    title: "Melhoria de Engajamento",
    description: "Identificação de drivers de engajamento por segmento e ações direcionadas baseadas em evidências.",
  },
  {
    title: "Equidade Salarial",
    description: "Diagnóstico de gaps salariais e plano de correção para compliance e employer branding.",
  },
];

const stats = [
  { value: "6", label: "Áreas de People Analytics", description: "Cobertura completa do ciclo" },
  { value: "LGPD", label: "Privacidade em Primeiro Lugar", description: "Dados sensíveis protegidos" },
  { value: "12+", label: "Integrações com HRIS", description: "Workday, SAP, ADP e mais" },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function PeopleAnalytics() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="people-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="20" r="6" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
              <circle cx="20" cy="60" r="6" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
              <circle cx="60" cy="60" r="6" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
              <line x1="40" y1="26" x2="22" y2="54" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
              <line x1="40" y1="26" x2="58" y2="54" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
              <line x1="26" y1="60" x2="54" y2="60" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 hover:bg-primary/20 transition-colors"
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
              <span className="text-foreground">People</span>{" "}
              <span className="gradient-text-purple">
                Analytics
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

      {/* Analytics Areas Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Áreas de Atuação"
            title="Ciclo de Vida do Colaborador"
            titleHighlight="Orientado por Dados"
            description="Cobertura completa de analytics para todas as etapas do ciclo de vida do colaborador, desde a atração até o desligamento."
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

                <div className="mt-6 pt-4 border-t border-border/50">
                  <h5 className="text-xs font-semibold text-primary mb-2">MÉTRICAS PRINCIPAIS</h5>
                  <div className="flex flex-wrap gap-2">
                    {area.metrics.map((metric, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
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

      {/* Use Cases Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Casos de Uso"
            title="Resultados"
            titleHighlight="Comprovados"
            description="Exemplos de impacto real gerado por projetos de People Analytics."
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
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Dashboards"
            title="Visualizações"
            titleHighlight="Executivas"
            description="Painéis customizados para diferentes públicos e necessidades de RH."
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
                    <Users className="w-4 h-4 text-primary" />
                    {dashboard.audience}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
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
      <section className="section-padding">
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
                  {/* Connector Line */}
                  {index < methodology.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                  )}
                  
                  <div className="glass-card p-6 relative z-10 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold gradient-text-purple">{phase.phase}</span>
                      <div className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs">{phase.duration}</div>
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-4">{phase.title}</h4>
                    <div className="space-y-2">
                      {phase.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
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

      {/* Integrations Section */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <SectionHeader
            badge="Integrações"
            title="Conectamos com seus"
            titleHighlight="Sistemas de RH"
            description="Experiência com as principais plataformas de gestão de pessoas do mercado."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{integration.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{integration.type}</span>
              </motion.div>
            ))}
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
            description="Combinamos expertise técnica em analytics com profundo conhecimento de gestão de pessoas."
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
                Pronto para transformar dados de RH em <span className="gradient-text-purple">vantagem competitiva</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Agende uma conversa com nossos especialistas e descubra como People Analytics 
                pode revolucionar sua gestão de talentos.
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
