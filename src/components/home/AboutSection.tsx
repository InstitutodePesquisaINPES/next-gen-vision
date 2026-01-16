import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Target, Lightbulb, Wrench, Users, Shield, Zap, Brain, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, fadeInUp, fadeInLeft, fadeInRight, AnimatedLine } from "@/components/ui/scroll-animations";

const methodology = [
  {
    step: "01",
    icon: Target,
    title: "Diagnóstico",
    description: "Entendemos o problema real com análise rigorosa.",
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Solução",
    description: "Desenhamos a solução específica para seu contexto.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Implementação",
    description: "Desenvolvemos e colocamos em produção.",
  },
  {
    step: "04",
    icon: Users,
    title: "Transferência",
    description: "Capacitamos sua equipe para sustentar o resultado.",
  },
];

const differentiators = [
  {
    icon: TrendingUp,
    text: "Do diagnóstico à produção — resultados em semanas, não meses"
  },
  {
    icon: Brain,
    text: "Metodologia científica validada aplicada em projetos reais"
  },
  {
    icon: Users,
    text: "Equipe multidisciplinar: dados, engenharia e estratégia"
  },
  {
    icon: Shield,
    text: "100% sigiloso — confidencialidade garantida por contrato"
  },
];

const capabilities = [
  { icon: Brain, label: "Data Science", desc: "Análise avançada de dados" },
  { icon: Zap, label: "Engenharia", desc: "Sistemas sob medida" },
  { icon: Target, label: "Estratégia", desc: "Visão de negócio" },
  { icon: Shield, label: "Sigilo", desc: "100% confidencial" },
];

export function AboutSection() {
  return (
    <section className="section-padding-lg bg-card/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] orb-primary rounded-full opacity-30" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] orb-accent rounded-full opacity-20" />

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
            <Award className="w-4 h-4" />
            Nossa Metodologia
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Consultoria que{" "}
            <span className="gradient-text-purple">entrega resultados</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Outras consultorias entregam relatórios. Nós entregamos soluções implementadas 
            com impacto mensurável nos seus KPIs.
          </p>
        </motion.div>

        {/* Methodology Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {methodology.map((item, index) => (
            <StaggerItem key={item.step} variants={fadeInUp}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-6 relative group hover:border-primary/40 transition-all duration-300 h-full"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg"
                >
                  {item.step}
                </motion.div>
                <div className="pt-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

                {/* Connection line */}
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <div className="glass-card p-8 relative z-10">
                <StaggerContainer className="grid grid-cols-2 gap-5">
                  {capabilities.map((cap, index) => (
                    <StaggerItem key={index} variants={fadeInUp}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        >
                          <cap.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                        </motion.div>
                        <div className="text-xl font-bold gradient-text-purple">{cap.label}</div>
                        <p className="text-xs text-muted-foreground mt-1">{cap.desc}</p>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Decorative */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-primary/20" 
              />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 orb-primary rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Por que escolher a{" "}
              <span className="gradient-text-purple">Vixio?</span>
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Somos uma consultoria especializada em transformar dados em decisões 
              estratégicas. Combinamos ciência de dados, engenharia de software e 
              visão de negócio para entregar soluções que funcionam.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nossa abordagem é diferente: não entregamos apenas relatórios — 
              implementamos soluções completas e capacitamos sua equipe para 
              sustentar os resultados no longo prazo.
            </p>

            <AnimatedLine className="h-0.5 w-24 bg-gradient-to-r from-primary to-accent mb-8" />

            <StaggerContainer className="space-y-4 mb-10">
              {differentiators.map((item, index) => (
                <StaggerItem key={index} variants={fadeInLeft}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="p-1.5 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground glow-primary group"
                asChild
              >
                <Link to="/sobre">
                  Conheça Nossa História
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 hover:bg-muted/20"
                asChild
              >
                <Link to="/fundador">
                  Sobre o Fundador
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
