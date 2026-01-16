import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Microscope, FileText, BarChart2, Activity, 
  ChevronRight, CheckCircle2, FlaskConical, Heart, Shield,
  BookOpen, Award, Users, TrendingUp, Dna, Pill, ClipboardList,
  Calculator, Target, Zap, Eye, AlertCircle, Timer, Database,
  PieChart, Binary, Sparkles, GraduationCap, Building2, Globe,
  Lock, FileCheck, Beaker, Stethoscope, Brain, TestTube,
  Clock, Briefcase, Scale, Network
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// Credenciais de impacto
const credentials = [
  { value: "200+", label: "Estudos Clínicos", description: "Todas as fases (I-IV)" },
  { value: "50+", label: "Publicações", description: "Em journals de alto impacto" },
  { value: "20+", label: "Anos de Experiência", description: "Em pesquisa clínica" },
  { value: "99%", label: "Taxa de Aprovação", description: "Em submissões regulatórias" },
];

// Badges de credibilidade
const credentialsBadges = [
  { icon: GraduationCap, label: "PhDs em Estatística", description: "Equipe com formação acadêmica" },
  { icon: Award, label: "ICH/GCP Certified", description: "Conformidade com boas práticas" },
  { icon: Globe, label: "Experiência Global", description: "ANVISA, FDA, EMA" },
  { icon: BookOpen, label: "Publicações Científicas", description: "Em journals tier-1" },
];

// Áreas de expertise expandidas
const expertiseAreas = [
  {
    icon: FlaskConical,
    title: "Ensaios Clínicos",
    description: "Suporte estatístico completo para todas as fases de desenvolvimento clínico de medicamentos, dispositivos médicos e vacinas.",
    capabilities: [
      "Desenho de estudos Fase I-IV com cálculo de poder",
      "Cálculo amostral e power analysis com múltiplos cenários",
      "Randomização estratificada, em blocos e adaptativa",
      "Análises interinas com regras de stopping (futility/efficacy)",
      "Análise por intenção de tratar (ITT) e per protocol (PP)",
      "Adaptive trial designs e platform trials",
      "Tabelas, listagens e figuras (TLF) para submissão",
      "Análise de non-inferiority e equivalence"
    ],
    standards: ["ICH E6 (GCP)", "ICH E9/E9(R1)", "FDA 21 CFR Part 11", "CDISC"],
    outcomes: ["Aprovação regulatória", "Publicações em alto impacto", "Redução de custos de desenvolvimento"]
  },
  {
    icon: BarChart2,
    title: "Análise Estatística Avançada",
    description: "Aplicação rigorosa de métodos estatísticos para pesquisas biomédicas, epidemiológicas e de saúde pública.",
    capabilities: [
      "Modelos lineares generalizados (GLM, GLMM, GAM)",
      "Análise de sobrevivência (Kaplan-Meier, Cox, AFT, competing risks)",
      "Meta-análises e revisões sistemáticas (pairwise e network)",
      "Análise multivariada (PCA, FA, MCA, cluster)",
      "Modelos de equações estruturais (SEM, CFA)",
      "Análise de dados longitudinais e painel",
      "Análise de dados faltantes (MCAR, MAR, MNAR)",
      "Inferência causal com métodos observacionais"
    ],
    standards: ["STROBE", "CONSORT", "PRISMA", "RECORD"],
    outcomes: ["Publicações de alto impacto", "Evidência para decisão clínica"]
  },
  {
    icon: Database,
    title: "Real World Evidence (RWE)",
    description: "Análises de dados do mundo real para suporte a decisões clínicas, regulatórias e de acesso ao mercado.",
    capabilities: [
      "Estudos observacionais retrospectivos e prospectivos",
      "Análise de registros eletrônicos de saúde (EHR/EMR)",
      "Propensity Score Matching, IPTW e overlap weighting",
      "Análise de claims e bases administrativas de saúde",
      "Estudos de utilização de medicamentos (DUR)",
      "Avaliação de efetividade comparativa (CER)",
      "Target trial emulation",
      "Análise de safety signals e farmacovigilância"
    ],
    standards: ["ISPE Guidelines", "EMA RWD Framework", "FDA RWE Program", "ISPOR"],
    outcomes: ["Suporte a incorporação", "Extensão de indicações", "Renovação de patentes"]
  },
  {
    icon: Calculator,
    title: "Avaliação de Tecnologias em Saúde (ATS)",
    description: "Análises econômicas e de impacto para incorporação de tecnologias em sistemas de saúde.",
    capabilities: [
      "Análise de custo-efetividade (CEA) com razão incremental",
      "Análise de custo-utilidade (CUA) com QALY e DALY",
      "Análise de impacto orçamentário (BIA) multi-horizonte",
      "Modelagem de Markov, microssimulação e DES",
      "Análise de sensibilidade determinística e probabilística (PSA)",
      "Avaliação de valor terapêutico adicionado",
      "Network meta-analysis para comparações indiretas",
      "MCDA e frameworks de value assessment"
    ],
    standards: ["NICE Guidelines", "CONITEC/MS", "ISPOR Standards", "Cochrane"],
    outcomes: ["Incorporação ao SUS", "Reembolso por operadoras", "Precificação baseada em valor"]
  },
];

// Tipos de estudo expandidos
const studyDesigns = [
  {
    type: "Ensaio Clínico Randomizado (RCT)",
    icon: FlaskConical,
    description: "Padrão-ouro para demonstrar eficácia causal com alocação aleatória",
    designs: ["Paralelo", "Crossover", "Factorial 2x2", "Cluster", "Adaptive", "Platform/Basket"],
    analysis: ["ANCOVA", "Mixed Models (MMRM)", "GEE", "Responder analysis", "LOCF vs MMRM"],
    considerations: ["Cálculo de poder", "Regras de stopping", "Interim analysis"]
  },
  {
    type: "Estudos Observacionais",
    icon: Eye,
    description: "Dados do mundo real para hipóteses causais quando RCT não é viável",
    designs: ["Coorte prospectiva/retrospectiva", "Caso-Controle", "Transversal", "Nested case-control"],
    analysis: ["Propensity Score", "Instrumental Variables", "DiD", "Regression discontinuity"],
    considerations: ["Confounding", "Selection bias", "Immortal time bias"]
  },
  {
    type: "Meta-Análises",
    icon: Sparkles,
    description: "Síntese quantitativa de evidências de múltiplos estudos",
    designs: ["Pairwise fixed/random", "Network (NMA)", "IPD Meta-Analysis", "Bayesian NMA"],
    analysis: ["Heterogeneity (I²)", "GRADE Assessment", "Publication Bias", "Sensitivity analysis"],
    considerations: ["Inclusão de estudos", "Quality assessment", "Transitivity"]
  },
  {
    type: "Estudos Diagnósticos",
    icon: Target,
    description: "Avaliação de performance de testes diagnósticos e biomarcadores",
    designs: ["Acurácia diagnóstica", "Prognóstico", "Prediction models", "Calibration studies"],
    analysis: ["Sensibilidade/Especificidade", "ROC/AUC", "Net Benefit", "Decision curve analysis"],
    considerations: ["Spectrum bias", "Verification bias", "External validation"]
  },
];

// Áreas terapêuticas
const therapeuticAreas = [
  { icon: Heart, name: "Cardiologia", studies: "Hipertensão, IC, FA, DAC, AVC", projects: "45+" },
  { icon: Dna, name: "Oncologia", studies: "Sólidos, hematológicos, imunoterapia", projects: "60+" },
  { icon: Brain, name: "Neurologia", studies: "Alzheimer, Parkinson, EM, Epilepsia", projects: "25+" },
  { icon: Pill, name: "Infectologia", studies: "HIV, hepatites, antimicrobianos, COVID-19", projects: "35+" },
  { icon: Users, name: "Pediatria", studies: "Vacinas, doenças raras, desenvolvimento", projects: "20+" },
  { icon: Stethoscope, name: "Reumatologia", studies: "AR, LES, espondiloartrites, psoríase", projects: "15+" },
];

// Conformidade regulatória expandida
const regulatoryCompliance = [
  {
    agency: "ANVISA",
    country: "Brasil",
    flag: "🇧🇷",
    description: "Agência Nacional de Vigilância Sanitária",
    services: [
      "Dossiês de registro de medicamentos e dispositivos",
      "Estudos de bioequivalência e biodisponibilidade",
      "Relatórios de segurança (PBRER/PSUR)",
      "Pareceres técnicos para submissão",
      "RDC 09/2015 e normativas de ensaios clínicos",
      "Suporte a auditorias e inspeções"
    ]
  },
  {
    agency: "FDA",
    country: "Estados Unidos",
    flag: "🇺🇸",
    description: "Food and Drug Administration",
    services: [
      "IND/NDA/BLA Statistical Sections",
      "Análises conforme ICH E9/E9(R1)",
      "FDA 21 CFR Part 11 compliance",
      "Integrated Summary of Safety/Efficacy (ISS/ISE)",
      "Suporte a Advisory Committee meetings",
      "505(b)(2) pathway analyses"
    ]
  },
  {
    agency: "EMA",
    country: "Europa",
    flag: "🇪🇺",
    description: "European Medicines Agency",
    services: [
      "CTD Module 5 preparation",
      "Scientific Advice meetings support",
      "Risk-benefit assessment documentation",
      "Pediatric Investigation Plans (PIP)",
      "PRIME/Breakthrough designation",
      "Post-authorization studies (PASS/PAES)"
    ]
  },
];

// Metodologia de trabalho
const methodology = [
  {
    phase: "01",
    title: "Planejamento Estatístico",
    description: "Desenho rigoroso do estudo com fundamentos metodológicos sólidos e alinhamento com objetivos regulatórios.",
    deliverables: [
      "Protocolo estatístico (SAP) detalhado",
      "Cálculo amostral com múltiplos cenários",
      "Plano de randomização e estratificação",
      "Case Report Forms (CRF) design",
      "Data Management Plan (DMP)"
    ],
    duration: "2-4 semanas"
  },
  {
    phase: "02",
    title: "Gestão de Dados",
    description: "Coleta, validação e preparação de dados seguindo padrões internacionais GCP e CDISC.",
    deliverables: [
      "Database design em formato CDISC",
      "Edit checks e validation programming",
      "Data cleaning documentation completa",
      "Coding (MedDRA, WHO-DD, ATC)",
      "Database lock memo e final reconciliation"
    ],
    duration: "Ongoing"
  },
  {
    phase: "03",
    title: "Análise Estatística",
    description: "Execução das análises conforme plano pré-especificado com validação por programação independente.",
    deliverables: [
      "Análises primárias e secundárias pré-especificadas",
      "Análises exploratórias documentadas",
      "Sensitivity e subgroup analyses",
      "Double programming e validation",
      "Outputs em formatos para publicação"
    ],
    duration: "4-8 semanas"
  },
  {
    phase: "04",
    title: "Relatórios & Submissão",
    description: "Documentação completa para publicação científica e submissão regulatória.",
    deliverables: [
      "Statistical Report (CSR Section 11)",
      "TLFs para submissão regulatória",
      "Datasets CDISC (SDTM, ADaM)",
      "Define.xml e Reviewer's Guides",
      "Suporte para queries de agências"
    ],
    duration: "3-6 semanas"
  },
];

// Software expertise expandido
const softwareExpertise = [
  { name: "SAS", category: "Industry Standard", use: "Análises clínicas, submissões regulatórias, TLF generation" },
  { name: "R", category: "Statistical Computing", use: "Análises avançadas, visualizações, Shiny apps, meta-análises" },
  { name: "STATA", category: "Epidemiology", use: "Surveys, análise de sobrevida, meta-análises, econometria" },
  { name: "Python", category: "Data Science", use: "ML em saúde, processamento de dados, automação" },
  { name: "Medidata Rave", category: "EDC", use: "Data management, eCRF design, edit checks" },
  { name: "nQuery", category: "Sample Size", use: "Power analysis, adaptive designs, grupo sequencial" },
  { name: "NONMEM", category: "PK/PD", use: "Modelagem farmacocinética e farmacodinâmica" },
  { name: "TreeAge", category: "Health Economics", use: "Modelos de Markov, CEA, BIA" },
];

// Publicações recentes
const publications = [
  {
    title: "Análise de Não-Inferioridade em Ensaios Cardiovasculares: Considerações Metodológicas",
    journal: "Statistical Methods in Medical Research",
    year: "2024",
    type: "Metodologia",
    impact: "IF: 2.3"
  },
  {
    title: "Propensity Score em Estudos Observacionais: Uma Revisão Prática para Pesquisadores",
    journal: "Revista de Saúde Pública",
    year: "2023",
    type: "Revisão",
    impact: "IF: 2.1"
  },
  {
    title: "Network Meta-Analysis em Oncologia: Aplicações e Limitações em HTA",
    journal: "Journal of Clinical Epidemiology",
    year: "2023",
    type: "Metodologia",
    impact: "IF: 7.4"
  },
  {
    title: "Real World Evidence para Extensão de Indicações: Framework Prático",
    journal: "Pharmacoepidemiology and Drug Safety",
    year: "2024",
    type: "Aplicação",
    impact: "IF: 2.9"
  },
];

// Diferenciais
const differentiators = [
  {
    icon: GraduationCap,
    title: "Expertise Científica",
    description: "Equipe com PhDs em Bioestatística, Epidemiologia e Medicina. Publicações em journals de alto impacto e participação em guidelines internacionais."
  },
  {
    icon: Shield,
    title: "Compliance Regulatório",
    description: "Experiência comprovada com ANVISA, FDA e EMA. Processos certificados ICH-GCP e conformidade com 21 CFR Part 11."
  },
  {
    icon: Target,
    title: "Foco em Resultados",
    description: "99% de taxa de aprovação em submissões regulatórias. Análises desenhadas para suportar claims de eficácia e segurança."
  },
  {
    icon: Network,
    title: "Rede Global",
    description: "Parcerias com CROs internacionais, universidades e centros de pesquisa. Capacidade de conduzir estudos multicêntricos."
  },
  {
    icon: Lock,
    title: "Confidencialidade",
    description: "Todos os projetos sob rigorosos acordos de confidencialidade. Dados de pesquisa tratados com absoluto sigilo."
  },
  {
    icon: Clock,
    title: "Agilidade",
    description: "Processos otimizados para atender timelines regulatórias. Capacidade de escalar equipe conforme demanda do projeto."
  },
];

export default function Bioestatistica() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>

        {/* DNA Helix Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="dna-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M20 0 Q40 20 20 40 Q0 60 20 80" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="0.5" />
              <path d="M60 0 Q40 20 60 40 Q80 60 60 80" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="0.5" />
              <line x1="20" y1="10" x2="60" y2="10" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
              <line x1="20" y1="30" x2="60" y2="30" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
              <line x1="20" y1="50" x2="60" y2="50" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
              <line x1="20" y1="70" x2="60" y2="70" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dna-pattern)" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8 hover:bg-emerald-500/20 transition-colors"
              >
                <Microscope className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Bioestatística & Pesquisa Clínica
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Bio</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                estatística
              </span>
              <span className="text-white"> Avançada</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Rigor científico e metodologia estatística de excelência para pesquisa clínica, 
              estudos epidemiológicos, submissões regulatórias e publicações de alto impacto.
              Da hipótese à publicação, com conformidade internacional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Solicitar Proposta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-lg"
                asChild
              >
                <Link to="/portfolio">Ver Publicações</Link>
              </Button>
            </motion.div>

            {/* Credentials Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {credentials.map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
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
            {credentialsBadges.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50"
              >
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
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

      {/* Therapeutic Areas */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Experiência Terapêutica"
            title="Áreas"
            titleHighlight="Terapêuticas"
            description="Expertise em múltiplas áreas terapêuticas com projetos entregues e publicações."
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {therapeuticAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-5 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                  <area.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="font-bold text-foreground">{area.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{area.studies}</p>
                <div className="mt-2 text-sm font-bold text-emerald-400">{area.projects} projetos</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Expertise"
            title="Áreas de"
            titleHighlight="Especialização"
            description="Suporte estatístico completo para todas as etapas da pesquisa científica e desenvolvimento clínico."
          />

          <div className="mt-16 space-y-10">
            {expertiseAreas.map((area, index) => (
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
                    <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
                      <area.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{area.title}</h3>
                    <p className="mt-3 text-muted-foreground">{area.description}</p>
                    
                    <div className="mt-6">
                      <h5 className="text-xs font-semibold text-emerald-400 mb-2">PADRÕES SEGUIDOS</h5>
                      <div className="flex flex-wrap gap-2">
                        {area.standards.map((standard, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                            {standard}
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
                    <h5 className="text-sm font-semibold text-emerald-400 mb-4">CAPACIDADES</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      {area.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
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

      {/* Study Designs Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Tipos de"
            titleHighlight="Estudos"
            description="Expertise em todos os desenhos de estudo reconhecidos pela comunidade científica internacional."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {studyDesigns.map((design, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <design.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{design.type}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{design.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 gap-6">
                  <div>
                    <h5 className="text-xs font-semibold text-emerald-400 mb-3">DESENHOS</h5>
                    <div className="flex flex-wrap gap-2">
                      {design.designs.map((d, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-muted/50 text-foreground text-xs">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-emerald-400 mb-3">MÉTODOS DE ANÁLISE</h5>
                    <div className="flex flex-wrap gap-2">
                      {design.analysis.map((a, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-emerald-400 mb-3">CONSIDERAÇÕES</h5>
                    <div className="flex flex-wrap gap-2">
                      {design.considerations.map((c, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-muted/30 text-muted-foreground text-xs">
                          {c}
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

      {/* Regulatory Compliance Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Compliance"
            title="Conformidade"
            titleHighlight="Regulatória"
            description="Análises alinhadas com exigências das principais agências reguladoras globais."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {regulatoryCompliance.map((agency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{agency.flag}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{agency.agency}</h3>
                    <p className="text-sm text-muted-foreground">{agency.country}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{agency.description}</p>
                <ul className="space-y-3">
                  {agency.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Fluxo de"
            titleHighlight="Trabalho"
            description="Metodologia rigorosa seguindo padrões internacionais de pesquisa clínica."
          />

          <div className="mt-16 space-y-6">
            {methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 md:p-8"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
                        <span className="text-xl font-bold text-emerald-400">{phase.phase}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{phase.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-emerald-400">
                          <Clock className="w-4 h-4" />
                          {phase.duration}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  <div className="lg:w-3/4">
                    <h5 className="text-sm font-semibold text-emerald-400 mb-3">ENTREGÁVEIS</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      {phase.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                          <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
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

      {/* Software Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Ferramentas"
            title="Software"
            titleHighlight="Estatístico"
            description="Domínio das principais ferramentas utilizadas na indústria farmacêutica e pesquisa acadêmica."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {softwareExpertise.map((software, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-5 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-foreground">{software.name}</span>
                  <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs">
                    {software.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{software.use}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Publicações"
            title="Contribuições"
            titleHighlight="Científicas"
            description="Publicações recentes em periódicos indexados de alto impacto."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                    {pub.type}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-muted/50 text-muted-foreground text-xs">
                    {pub.impact}
                  </span>
                </div>
                <h4 className="font-bold text-foreground leading-tight">{pub.title}</h4>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="italic">{pub.journal}</span>
                  <span>{pub.year}</span>
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
            badge="Por que Nós"
            title="Nossos"
            titleHighlight="Diferenciais"
            description="O que nos diferencia em projetos de bioestatística e pesquisa clínica."
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
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Suporte Estatístico Especializado
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Da hipótese à{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  publicação
                </span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                Seja para ensaios clínicos, publicações científicas ou submissões regulatórias, 
                nossa equipe de bioestatísticos está pronta para garantir rigor metodológico, 
                conformidade regulatória e sucesso do seu projeto de pesquisa.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 text-lg"
                  asChild
                >
                  <Link to="/contato">
                    Consultar Especialista
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/50"
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
