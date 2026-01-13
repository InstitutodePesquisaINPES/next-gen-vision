import { motion } from "framer-motion";
import { ArrowRight, Brain, Code2, Cloud, ShoppingBag, GraduationCap, Microscope, BarChart3, Server, Package, BookOpen, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const worlds = [
  {
    id: "ciencia",
    title: "Ciência de Dados & Inteligência Estratégica",
    subtitle: "Ciência • Bioestatística • Planejamento",
    description:
      "Consultoria em Data Science, análises bioestatísticas rigorosas, business intelligence e planejamento estratégico orientado por evidências científicas.",
    icon: Brain,
    secondaryIcon: Microscope,
    link: "/consultoria",
    gradient: "from-blue-500 via-cyan-500 to-blue-400",
    bgGlow: "bg-blue-500/20",
    borderColor: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/60",
    buttonBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    features: [
      "Machine Learning & IA",
      "Análise Bioestatística",
      "Dashboards Executivos",
      "Consultoria Estratégica",
    ],
    buttonText: "Explorar Ciência de Dados",
  },
  {
    id: "engenharia",
    title: "Engenharia de Sistemas Inteligentes",
    subtitle: "Automação • Gestão • Soluções Personalizadas",
    description:
      "Desenvolvimento de sistemas sob medida, projetados a partir das regras, fluxos e necessidades específicas de cada organização.",
    icon: Code2,
    secondaryIcon: BarChart3,
    link: "/sistemas",
    gradient: "from-purple-500 via-purple-400 to-pink-400",
    bgGlow: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    hoverBorder: "hover:border-purple-500/60",
    buttonBg: "bg-gradient-to-r from-purple-500 to-pink-500",
    features: [
      "Secretária WhatsApp IA",
      "Sistemas para Clínicas",
      "Gestão de Frotas",
      "TFD para Prefeituras",
    ],
    buttonText: "Explorar Sistemas",
  },
  {
    id: "plataformas",
    title: "Plataformas Digitais & SaaS",
    subtitle: "Soluções Prontas • Uso Imediato • Escalabilidade",
    description:
      "Sistemas profissionais testados e prontos para uso imediato, com contratação por licença ou modelo SaaS, sem necessidade de desenvolvimento sob medida.",
    icon: Cloud,
    secondaryIcon: Server,
    link: "/plataformas",
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
    bgGlow: "bg-emerald-500/20",
    borderColor: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-500/60",
    buttonBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
    features: [
      "FuneralLog",
      "VeloG",
      "TFD360",
      "ClinicFlow",
    ],
    buttonText: "Ver Plataformas",
  },
  {
    id: "marketplace",
    title: "Marketplace de Sistemas & Código",
    subtitle: "Código-Fonte • White Label • Licenciamento",
    description:
      "Comercialização de sistemas completos, APIs, módulos e arquiteturas profissionais para aquisição de código-fonte, licenciamento ou white label.",
    icon: ShoppingBag,
    secondaryIcon: Package,
    link: "/marketplace",
    gradient: "from-amber-500 via-orange-500 to-red-400",
    bgGlow: "bg-amber-500/20",
    borderColor: "border-amber-500/30",
    hoverBorder: "hover:border-amber-500/60",
    buttonBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    features: [
      "Venda de Código-Fonte",
      "Licenciamento Comercial",
      "White Label",
      "APIs & Módulos",
    ],
    buttonText: "Explorar Marketplace",
  },
  {
    id: "educacao",
    title: "Educação Corporativa & Diagnóstico",
    subtitle: "Capacitação • Avaliação • Tomada de Decisão",
    description:
      "Programas estruturados de capacitação, diagnóstico organizacional e formação executiva, voltados à maturidade analítica e tomada de decisão baseada em dados.",
    icon: GraduationCap,
    secondaryIcon: Target,
    link: "/educacao",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-400",
    bgGlow: "bg-rose-500/20",
    borderColor: "border-rose-500/30",
    hoverBorder: "hover:border-rose-500/60",
    buttonBg: "bg-gradient-to-r from-rose-500 to-pink-500",
    features: [
      "Diagnóstico Empresarial",
      "Capacitação In Company",
      "Workshops Estratégicos",
      "Formação Executiva",
    ],
    buttonText: "Explorar Educação",
  },
];

export function WorldsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/30 text-muted-foreground text-sm font-medium">
            Ecossistema Completo
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Cinco universos,{" "}
            <span className="gradient-text">uma visão integrada</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
            Da ciência de dados à educação corporativa, oferecemos um ecossistema completo 
            de soluções para transformar dados em vantagem competitiva.
          </p>
        </motion.div>

        {/* First Row - 2 Main Blocks */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {worlds.slice(0, 2).map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative glass-card card-shimmer p-8 ${world.borderColor} ${world.hoverBorder} transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Glow Effect on Hover */}
              <div
                className={`absolute inset-0 ${world.bgGlow} rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
              />

              {/* Icons */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-4 rounded-2xl`}
                  style={{
                    background: `linear-gradient(135deg, ${world.id === 'ciencia' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(147, 51, 234, 0.15)'} 0%, transparent 100%)`,
                  }}
                >
                  <world.icon className="w-8 h-8 text-foreground" />
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <world.secondaryIcon className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground font-medium mb-2">
                {world.subtitle}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {world.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {world.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {world.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${world.gradient}`}
                    />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className={`w-full ${world.buttonBg} text-white group/btn`}
                asChild
              >
                <Link to={world.link}>
                  {world.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Second Row - 3 Secondary Blocks */}
        <div className="grid md:grid-cols-3 gap-6">
          {worlds.slice(2).map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 2) * 0.15 }}
              className={`group relative glass-card card-shimmer p-6 ${world.borderColor} ${world.hoverBorder} transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Glow Effect on Hover */}
              <div
                className={`absolute inset-0 ${world.bgGlow} rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
              />

              {/* Icons */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${world.gradient} bg-opacity-10`}
                  style={{
                    background: `linear-gradient(135deg, rgba(${world.id === 'plataformas' ? '16, 185, 129' : world.id === 'marketplace' ? '245, 158, 11' : '244, 63, 94'}, 0.15) 0%, transparent 100%)`,
                  }}
                >
                  <world.icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <world.secondaryIcon className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Content */}
              <p className="text-xs text-muted-foreground font-medium mb-1">
                {world.subtitle}
              </p>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {world.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {world.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 mb-6">
                {world.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <div
                      className={`w-1 h-1 rounded-full bg-gradient-to-r ${world.gradient}`}
                    />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="sm"
                className={`w-full ${world.buttonBg} text-white group/btn`}
                asChild
              >
                <Link to={world.link}>
                  {world.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
