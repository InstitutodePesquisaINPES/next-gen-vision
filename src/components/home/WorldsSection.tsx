import { motion } from "framer-motion";
import { ArrowRight, Brain, Code2, GraduationCap, Microscope, Server, Target, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, fadeInUp, scaleIn } from "@/components/ui/scroll-animations";

const worlds = [
  {
    id: "ciencia",
    title: "Ciência de Dados & Inteligência",
    subtitle: "Para CEOs e diretores que precisam de decisões baseadas em evidências",
    description:
      "Transforme dados dispersos em insights acionáveis. Reduza o tempo de análise em até 80% e tome decisões com confiança estatística.",
    icon: Brain,
    secondaryIcon: Microscope,
    link: "/consultoria",
    gradient: "from-violet-500 to-purple-400",
    borderColor: "border-violet-500/20",
    hoverBorder: "hover:border-violet-500/50",
    buttonClass: "bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600",
    result: "Decisões 3x mais rápidas com base em dados",
    features: [
      "Machine Learning & IA Preditiva",
      "Análise Bioestatística Avançada",
      "Dashboards para C-Level",
      "Customer & People Intelligence",
    ],
    stats: { value: "80%", label: "Redução em tempo de análise" }
  },
  {
    id: "engenharia",
    title: "Engenharia de Sistemas",
    subtitle: "Para operações que perdem horas com processos manuais",
    description:
      "Automatize fluxos repetitivos e libere sua equipe para atividades estratégicas. Sistemas que crescem junto com seu negócio.",
    icon: Code2,
    secondaryIcon: Server,
    link: "/sistemas",
    gradient: "from-primary to-accent",
    borderColor: "border-primary/20",
    hoverBorder: "hover:border-primary/50",
    buttonClass: "gradient-primary text-white",
    result: "Redução de 60% em tarefas operacionais",
    features: [
      "Sistemas Sob Medida",
      "Plataformas SaaS Escaláveis",
      "Secretária Virtual com IA",
      "APIs & Integrações Complexas",
    ],
    stats: { value: "60%", label: "Menos tarefas manuais" }
  },
  {
    id: "educacao",
    title: "Educação Corporativa",
    subtitle: "Para empresas que querem autonomia em dados",
    description:
      "Capacite sua equipe para interpretar dados e tomar decisões independentes. Cultura data-driven começa pelas pessoas.",
    icon: GraduationCap,
    secondaryIcon: Target,
    link: "/educacao",
    gradient: "from-amber-500 to-orange-400",
    borderColor: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
    buttonClass: "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700",
    result: "Maturidade analítica em 90 dias",
    features: [
      "Diagnóstico de Maturidade",
      "Capacitação Prática In Company",
      "Formação de Lideranças",
      "Preparação para Adoção de IA",
    ],
    stats: { value: "90", label: "Dias para maturidade" }
  },
];

export function WorldsSection() {
  return (
    <section className="section-padding-lg relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] orb-blue rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] orb-primary rounded-full" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Soluções Integradas
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Três Dimensões de{" "}
            <span className="gradient-text-purple">Inteligência Estratégica</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Ciência, engenharia e educação trabalhando juntas para transformar 
            dados em vantagem competitiva sustentável.
          </p>
        </motion.div>

        {/* Three Main Blocks */}
        <StaggerContainer className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {worlds.map((world, index) => (
            <StaggerItem key={world.id} variants={fadeInUp}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group glass-card card-shimmer p-8 h-full ${world.borderColor} ${world.hoverBorder} transition-all duration-500`}
              >
                {/* Stat Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`inline-flex px-3 py-1.5 rounded-full bg-gradient-to-r ${world.gradient} text-white text-xs font-bold mb-6`}
                >
                  {world.stats.value} {world.stats.label}
                </motion.div>

                {/* Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${world.gradient} bg-opacity-10`}>
                    <world.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <world.secondaryIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {world.title}
                </h3>
                <p className="text-xs text-primary font-medium mb-3 uppercase tracking-wider">
                  {world.subtitle}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {world.description}
                </p>

                {/* Result Highlight */}
                <div className={`px-4 py-3 rounded-xl bg-gradient-to-r ${world.gradient} bg-opacity-10 border border-white/5 mb-6`}>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    {world.result}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {world.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className={`w-4 h-4 text-transparent bg-gradient-to-r ${world.gradient} bg-clip-text`} style={{ color: 'hsl(var(--primary))' }} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${world.buttonClass} group/btn transition-all duration-300`}
                  asChild
                >
                  <Link to={world.link}>
                    Explorar Soluções
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Não sabe por onde começar? Nós ajudamos a identificar a melhor solução para seu contexto.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:bg-muted/20"
            asChild
          >
            <Link to="/contato">
              Agendar Diagnóstico Gratuito
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
