import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Brain, LineChart, Target, TrendingUp, Users, FileSpreadsheet, Microscope, Heart, Fingerprint, UserCheck, BarChart3, Sparkles, Shield, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const consultoriaAreas = [
  {
    id: "data-science",
    icon: Brain,
    title: "Aprendizado de Máquina e IA",
    subtitle: "Modelos Preditivos • IA Generativa • Operações de ML",
    description: "Desenvolvimento e deploy de modelos de aprendizado de máquina em produção, desde a prototipagem até a operacionalização escalável.",
    link: "/consultoria/data-science",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    hoverBg: "hover:bg-blue-500/20",
    borderColor: "hover:border-blue-500/50",
  },
  {
    id: "bioestatistica",
    icon: Microscope,
    title: "Análise Bioestatística",
    subtitle: "Ensaios Clínicos • Epidemiologia • Regulatório",
    description: "Rigor científico em análises estatísticas para saúde, pesquisa clínica e submissões regulatórias.",
    link: "/consultoria/bioestatistica",
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    hoverBg: "hover:bg-emerald-500/20",
    borderColor: "hover:border-emerald-500/50",
  },
  {
    id: "behavioral",
    icon: Heart,
    title: "Análise Comportamental",
    subtitle: "Vieses Cognitivos • Psicometria • Decisão",
    description: "Entenda como o comportamento humano impacta seus dados e descubra insights além da estatística tradicional.",
    link: "/consultoria/behavioral",
    gradient: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500/10",
    hoverBg: "hover:bg-rose-500/20",
    borderColor: "hover:border-rose-500/50",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Painéis Executivos",
    subtitle: "BI • Visualização de Dados • Análise Autônoma",
    description: "Painéis estratégicos, automação de relatórios e cultura de dados para tomada de decisão ágil.",
    link: "/consultoria/analytics",
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    hoverBg: "hover:bg-amber-500/20",
    borderColor: "hover:border-amber-500/50",
  },
  {
    id: "planejamento",
    icon: Target,
    title: "Consultoria Estratégica",
    subtitle: "OKRs • BSC • Roteiros Orientados por Dados",
    description: "Planejamento estratégico orientado por evidências, com metodologias comprovadas e métricas claras.",
    link: "/consultoria/planejamento",
    gradient: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
    hoverBg: "hover:bg-purple-500/20",
    borderColor: "hover:border-purple-500/50",
  },
  {
    id: "people",
    icon: UserCheck,
    title: "Análise de Pessoas",
    subtitle: "RH Estratégico • Rotatividade • Engajamento",
    description: "Inteligência de capital humano: predição de rotatividade, análise de clima e otimização de gestão de pessoas.",
    link: "/consultoria/people-analytics",
    gradient: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500/10",
    hoverBg: "hover:bg-indigo-500/20",
    borderColor: "hover:border-indigo-500/50",
  },
  {
    id: "customer",
    icon: Fingerprint,
    title: "Inteligência de Clientes",
    subtitle: "CDP • Valor Vitalício • Previsão de Evasão",
    description: "Visão 360° do cliente: segmentação avançada, valor vitalício e predição de evasão para retenção inteligente.",
    link: "/consultoria/customer-intelligence",
    gradient: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    hoverBg: "hover:bg-cyan-500/20",
    borderColor: "hover:border-cyan-500/50",
  },
];

const pillars = [
  { 
    icon: Sparkles, 
    title: "Ciência",
    description: "Metodologia científica rigorosa" 
  },
  { 
    icon: Microscope, 
    title: "Bioestatística",
    description: "Análises robustas e validadas" 
  },
  { 
    icon: Lightbulb, 
    title: "Planejamento",
    description: "Estratégia orientada por dados" 
  },
];

const diferenciais = [
  { icon: TrendingUp, label: "Metodologia Científica" },
  { icon: Users, label: "Equipe Multidisciplinar" },
  { icon: FileSpreadsheet, label: "Relatórios Detalhados" },
  { icon: LineChart, label: "Insights Acionáveis" },
  { icon: Shield, label: "100% Sigiloso" },
];

export default function ConsultoriaIndex() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Universo Ciência de Dados
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
          >
            <span className="text-white">Ciência de Dados &</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Inteligência Estratégica
            </span>
          </motion.h1>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-6"
          >
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-muted/30 border border-border/50"
              >
                <pillar.icon className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <span className="text-sm font-semibold text-foreground">{pillar.title}</span>
                  <p className="text-xs text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Consultoria em Data Science, análises bioestatísticas rigorosas, business intelligence 
            e planejamento estratégico orientado por evidências científicas.
          </motion.p>

          {/* Diferenciais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {diferenciais.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-border/30"
              >
                <item.icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 shadow-lg shadow-blue-500/20"
              asChild
            >
              <Link to="/contato">
                Agendar Consultoria
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/50 hover:bg-blue-500/10"
              asChild
            >
              <a href="#servicos">Ver Serviços</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicos" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/30 text-muted-foreground text-sm font-medium">
              7 Especializações
            </span>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Serviços de{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Inteligência Estratégica
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Explore nossas especializações e descubra como transformar dados em vantagem competitiva.
            </p>
          </motion.div>

          {/* Featured Services - First Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {consultoriaAreas.slice(0, 3).map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={area.link}
                  className={`group block h-full glass-card card-shimmer p-8 transition-all duration-300 ${area.borderColor}`}
                >
                  <div className={`inline-flex p-4 rounded-2xl ${area.bgColor} ${area.hoverBg} transition-colors mb-6`}>
                    <area.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mb-2">
                    {area.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-400 transition-colors mb-3">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <div className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${area.gradient} bg-clip-text text-transparent`}>
                    Explorar Serviço
                    <ArrowRight className="ml-2 w-4 h-4 text-blue-400 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Secondary Services - Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultoriaAreas.slice(3).map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              >
                <Link
                  to={area.link}
                  className={`group block h-full glass-card card-shimmer p-6 transition-all duration-300 ${area.borderColor}`}
                >
                  <div className={`inline-flex p-3 rounded-xl ${area.bgColor} ${area.hoverBg} transition-colors mb-4`}>
                    <area.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    {area.subtitle}
                  </p>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-blue-400 transition-colors mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <div className={`inline-flex items-center text-xs font-medium bg-gradient-to-r ${area.gradient} bg-clip-text text-transparent`}>
                    Explorar
                    <ArrowRight className="ml-1 w-3 h-3 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">Todos os projetos são 100% sigilosos</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Precisa de uma análise{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  personalizada?
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Nossa equipe de especialistas está pronta para entender seu desafio 
                e propor soluções baseadas em evidências científicas.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 shadow-lg shadow-blue-500/20"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Consultoria
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-500/50 hover:bg-blue-500/10"
                  asChild
                >
                  <Link to="/">Voltar ao Início</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
