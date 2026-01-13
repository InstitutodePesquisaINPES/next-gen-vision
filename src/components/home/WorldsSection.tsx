import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Brain, Code2, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const worlds = [
  {
    id: "consultoria",
    title: "Consultoria & Data Science",
    subtitle: "Ciência de Dados • Bioestatística • Planejamento",
    description:
      "Análises avançadas, estudos bioestatísticos rigorosos, business intelligence e planejamento estratégico baseado em evidências científicas.",
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
  },
  {
    id: "sistemas",
    title: "Sistemas Inteligentes",
    subtitle: "Automação • Gestão • Soluções Personalizadas",
    description:
      "Desenvolvimento de sistemas sob medida: secretária eletrônica WhatsApp, gestão de clínicas, TFD, frotas, e-commerce, fidelização e muito mais.",
    icon: Code2,
    secondaryIcon: BarChart3,
    link: "/sistemas",
    gradient: "from-purple-500 via-purple-400 to-pink-400",
    bgGlow: "bg-primary/20",
    borderColor: "border-primary/30",
    hoverBorder: "hover:border-primary/60",
    buttonBg: "gradient-primary",
    features: [
      "Secretária WhatsApp IA",
      "Sistemas para Clínicas",
      "Gestão de Frotas",
      "TFD para Prefeituras",
    ],
  },
];

export function WorldsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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
            Dois Mundos, Uma Solução
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold">
            Explore nossos{" "}
            <span className="gradient-text">universos</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Escolha o caminho que melhor atende às suas necessidades e descubra 
            soluções especializadas para transformar seu negócio.
          </p>
        </motion.div>

        {/* Worlds Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {worlds.map((world, index) => (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`group relative glass-card p-8 md:p-10 ${world.borderColor} ${world.hoverBorder} transition-all duration-500`}
            >
              {/* Glow Effect on Hover */}
              <div
                className={`absolute inset-0 ${world.bgGlow} rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
              />

              {/* Icons */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${world.gradient} bg-opacity-10`}
                  style={{
                    background: `linear-gradient(135deg, ${world.id === 'consultoria' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(147, 51, 234, 0.15)'} 0%, transparent 100%)`,
                  }}
                >
                  <world.icon className="w-8 h-8 text-foreground" />
                </div>
                <div
                  className={`p-3 rounded-xl bg-muted/50`}
                >
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
                  Explorar {world.id === 'consultoria' ? 'Consultoria' : 'Sistemas'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
