import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, Sparkles, Target, Zap, Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, fadeInUp, fadeInRight, AnimatedCounter } from "@/components/ui/scroll-animations";

const features = [
  {
    icon: Target,
    title: "Diagnóstico Preciso",
    description: "Mapeamento do problema real, não do sintoma. Análise rigorosa antes de qualquer desenvolvimento.",
  },
  {
    icon: Zap,
    title: "Solução Sob Medida",
    description: "Arquitetura desenhada para seu contexto específico. Nada de templates genéricos.",
  },
  {
    icon: Sparkles,
    title: "Implementação Completa",
    description: "Do conceito à produção com sua equipe. Entrega funcional, não apenas documentação.",
  },
];

const stats = [
  { value: "100%", label: "Sigiloso", icon: Shield },
  { value: "Semanas", label: "Não Meses", icon: Clock },
  { value: "Sob Medida", label: "Para Seu Contexto", icon: Award },
];

export function FeaturedSolution() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      
      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] orb-primary rounded-full opacity-30" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] orb-accent rounded-full opacity-20" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6"
              >
                <Fingerprint className="w-4 h-4" />
                Solução Exclusiva
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
              >
                Inteligência Estratégica
                <br />
                <span className="gradient-text-purple">Personalizada™</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg text-muted-foreground leading-relaxed"
              >
                Seu desafio é único? Nós desenhamos a solução ideal. 
                Analisamos sua demanda, compreendemos o problema e criamos 
                uma metodologia exclusiva para sua organização.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-4 text-muted-foreground leading-relaxed"
              >
                Combinamos ciência de dados, engenharia de software e visão 
                estratégica para entregar resultados que impactam diretamente seus indicadores.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button 
                  size="lg" 
                  className="gradient-primary text-primary-foreground glow-primary group"
                  asChild
                >
                  <Link to="/contato">
                    Conhecer Solução
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-border/50 hover:bg-muted/20"
                  asChild
                >
                  <Link to="/consultoria">
                    Ver Especializações
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <StaggerContainer className="space-y-5">
                {features.map((feature, index) => (
                  <StaggerItem key={index} variants={fadeInRight}>
                    <motion.div
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                      className="flex items-start gap-4 p-5 rounded-xl bg-muted/20 border border-border/30 hover:border-primary/30 hover:bg-muted/30 transition-all duration-300 group"
                    >
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors"
                      >
                        <feature.icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Stats highlight */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="mb-2"
                    >
                      <stat.icon className="w-5 h-5 text-primary mx-auto mb-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <div className="text-xl font-bold gradient-text-purple">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
