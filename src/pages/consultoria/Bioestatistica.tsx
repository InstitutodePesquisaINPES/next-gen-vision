import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Microscope, FileText, BarChart2, Activity, 
  ChevronRight, CheckCircle2, FlaskConical, Heart, Shield,
  BookOpen, Award, Users, TrendingUp, Dna, Pill, ClipboardList
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const services = [
  {
    icon: FlaskConical,
    title: "Ensaios Clínicos",
    description: "Desenho estatístico, cálculo amostral e análise de dados para estudos clínicos de todas as fases.",
    features: ["Fase I a IV", "Randomização", "Análise Interina", "Relatórios ICH"]
  },
  {
    icon: BarChart2,
    title: "Análises Estatísticas",
    description: "Aplicação de métodos estatísticos rigorosos para pesquisas biomédicas e epidemiológicas.",
    features: ["Regressões", "Survival Analysis", "Meta-análises", "Análise Multivariada"]
  },
  {
    icon: FileText,
    title: "Publicações Científicas",
    description: "Suporte completo para análises estatísticas em artigos, teses e dissertações.",
    features: ["Revisão por Pares", "Reprodutibilidade", "Visualizações", "Metodologia"]
  },
  {
    icon: Shield,
    title: "Regulatório & Compliance",
    description: "Análises alinhadas com exigências ANVISA, FDA, EMA e boas práticas regulatórias.",
    features: ["FDA 21 CFR Part 11", "CDISC Standards", "GCP", "Auditoria"]
  },
];

const areas = [
  { icon: Heart, label: "Cardiologia" },
  { icon: Dna, label: "Genética" },
  { icon: Pill, label: "Farmacologia" },
  { icon: Activity, label: "Epidemiologia" },
  { icon: Microscope, label: "Oncologia" },
  { icon: FlaskConical, label: "Pesquisa Clínica" },
];

const methodology = [
  {
    phase: "Planejamento",
    title: "Desenho do Estudo",
    items: ["Definição de objetivos", "Cálculo amostral", "Escolha do design", "Plano de análise estatística"]
  },
  {
    phase: "Coleta",
    title: "Gestão de Dados",
    items: ["Validação de formulários", "Data cleaning", "Quality control", "Codificação de variáveis"]
  },
  {
    phase: "Análise",
    title: "Métodos Estatísticos",
    items: ["Análises descritivas", "Testes de hipóteses", "Modelos ajustados", "Análise de sensibilidade"]
  },
  {
    phase: "Entrega",
    title: "Relatórios & Suporte",
    items: ["Tabelas e figuras", "Interpretação clínica", "Suporte para revisão", "Documentação completa"]
  },
];

const credentials = [
  { value: "100+", label: "Estudos Realizados" },
  { value: "25+", label: "Publicações Indexadas" },
  { value: "15", label: "Anos de Experiência" },
  { value: "98%", label: "Aprovação Regulatória" },
];

export default function Bioestatistica() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        {/* DNA Helix Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8 hover:bg-emerald-500/20 transition-colors"
              >
                <Microscope className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Bioestatística
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Bio</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                estatística
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Rigor científico e expertise estatística para pesquisas clínicas, 
              estudos epidemiológicos e publicações de alto impacto.
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

            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {credentials.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-12 bg-muted/10">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-muted/30 border border-border/50 hover:border-emerald-500/50 transition-colors"
              >
                <area.icon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-foreground">{area.label}</span>
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
            title="Expertise em"
            titleHighlight="Bioestatística"
            description="Suporte estatístico completo para todas as etapas da pesquisa científica e desenvolvimento clínico."
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
                <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit group-hover:bg-emerald-500/20 transition-colors">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Processo"
            titleHighlight="Rigoroso"
            description="Seguimos padrões internacionais para garantir qualidade e reprodutibilidade."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-xs text-emerald-400 font-medium">{phase.phase}</div>
                    <div className="text-lg font-bold text-foreground">{phase.title}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Compliance & Qualidade
                </span>
                <h3 className="text-3xl font-bold text-white">
                  Conformidade com{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Padrões Internacionais
                  </span>
                </h3>
                <p className="mt-4 text-muted-foreground text-lg">
                  Todas as nossas análises seguem diretrizes de agências reguladoras 
                  e boas práticas clínicas, garantindo aceitação global.
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
                  { title: "ANVISA", desc: "Agência Nacional" },
                  { title: "FDA", desc: "US Food & Drug" },
                  { title: "EMA", desc: "European Medicines" },
                  { title: "ICH-GCP", desc: "Good Clinical Practice" },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <div className="text-lg font-bold text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Pesquisa Científica
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Precisa de suporte{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  estatístico?
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Seja para ensaios clínicos, publicações científicas ou análises regulatórias, 
                nossa equipe está pronta para ajudar.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Falar com Especialista
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/50"
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
