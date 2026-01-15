import { motion } from "framer-motion";
import { ArrowRight, Brain, Code2, GraduationCap, Microscope, Server, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    gradient: "from-blue-500 to-cyan-400",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
    buttonClass: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
    result: "Decisões 3x mais rápidas com base em dados",
    features: [
      "Machine Learning & IA Preditiva",
      "Análise Bioestatística Avançada",
      "Dashboards para C-Level",
      "Customer & People Intelligence",
    ],
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
    gradient: "from-purple-500 to-pink-400",
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
    buttonClass: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    result: "Maturidade analítica em 90 dias",
    features: [
      "Diagnóstico de Maturidade",
      "Capacitação Prática In Company",
      "Formação de Lideranças",
      "Preparação para Adoção de IA",
    ],
  },
];

export function WorldsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] orb-blue rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] orb-primary rounded-full" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Soluções de{" "}
            <span className="gradient-text-purple">Inteligência Estratégica</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Três dimensões integradas para transformar dados em vantagem competitiva.
          </p>
        </motion.div>

        {/* Three Main Blocks */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {worlds.map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group glass-card card-shimmer p-8 ${world.borderColor} ${world.hoverBorder} transition-all duration-500 hover:-translate-y-1`}
            >
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
              <p className="text-xs text-primary font-medium mb-3">
                {world.subtitle}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {world.description}
              </p>

              {/* Result Highlight */}
              <div className={`px-3 py-2 rounded-lg bg-gradient-to-r ${world.gradient} bg-opacity-10 border border-white/5 mb-5`}>
                <p className="text-xs font-semibold text-foreground">
                  → {world.result}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {world.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${world.gradient}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full ${world.buttonClass} group/btn`}
                asChild
              >
                <Link to={world.link}>
                  Explorar
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
