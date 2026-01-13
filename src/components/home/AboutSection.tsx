import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Target, Lightbulb, Wrench, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import founderImage from "@/assets/founder.png";

const methodology = [
  {
    step: "01",
    icon: Target,
    title: "Diagnóstico Profundo",
    description: "Entendemos o problema real, não apenas os sintomas. Análise rigorosa com metodologia científica.",
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Solução Sob Medida",
    description: "Desenhamos a solução específica para seu contexto. Sem templates genéricos.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Implementação Completa",
    description: "Desenvolvemos, testamos e colocamos em produção. Você não recebe relatório — recebe solução funcionando.",
  },
  {
    step: "04",
    icon: Users,
    title: "Transferência de Conhecimento",
    description: "Capacitamos sua equipe para sustentar e evoluir o resultado. Independência, não dependência.",
  },
];

const differentiators = [
  "Não paramos no diagnóstico — implementamos a solução",
  "Metodologia científica com rigor acadêmico",
  "Equipe multidisciplinar: dados, sistemas e negócios",
  "Entregas em semanas, não meses",
  "100% sigiloso — seu projeto é confidencial",
];

export function AboutSection() {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/30 text-muted-foreground text-sm font-medium">
            Nossa Abordagem
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Consultoria que{" "}
            <span className="gradient-text">resolve de verdade</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-lg">
            Enquanto outras consultorias entregam PowerPoints com recomendações, 
            nós entregamos soluções implementadas, funcionando e gerando resultado.
          </p>
        </motion.div>

        {/* Methodology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {methodology.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 relative group hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                {item.step}
              </div>
              <div className="pt-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 rounded-2xl overflow-hidden glow-accent">
                <img
                  src={founderImage}
                  alt="Fundador Vixio"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 md:right-8 z-20 glass-card p-6 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">100%</div>
                    <div className="text-xs text-muted-foreground">Projetos entregues com resultado</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -top-4 -left-4 md:left-8 z-20 glass-card p-4"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">100% Sigiloso</span>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-primary/30 animate-pulse-glow" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/30 text-muted-foreground text-sm font-medium mb-6">
              Por que a Vixio
            </span>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Expertise técnica com{" "}
              <span className="gradient-text">visão executiva</span>
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              A Vixio nasceu da frustração com consultorias que entregam diagnósticos 
              brilhantes... e param por aí. Combinamos profundidade científica com 
              capacidade de execução para entregar resultados reais.
            </p>

            <ul className="space-y-4 mb-10">
              {differentiators.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground glow-primary"
                asChild
              >
                <Link to="/sobre">
                  Conheça Nossa História
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link to="/contato">
                  Agende uma Conversa
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
