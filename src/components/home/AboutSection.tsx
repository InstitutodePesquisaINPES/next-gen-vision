import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Target, Lightbulb, Wrench, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import founderImage from "@/assets/founder.png";

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
  "Não paramos no diagnóstico — implementamos a solução",
  "Metodologia científica com rigor acadêmico",
  "Entregas em semanas, não meses",
  "100% sigiloso — seu projeto é confidencial",
];

export function AboutSection() {
  return (
    <section className="section-padding bg-card/50 relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Consultoria que{" "}
            <span className="gradient-text-purple">resolve de verdade</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Enquanto outras consultorias entregam relatórios, nós entregamos soluções funcionando.
          </p>
        </motion.div>

        {/* Methodology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {methodology.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 relative group hover:border-primary/40 transition-all duration-300"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {item.step}
              </div>
              <div className="pt-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden">
                <img
                  src={founderImage}
                  alt="Fundador Vixio"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border border-primary/20" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 orb-primary rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Expertise técnica com{" "}
              <span className="gradient-text-purple">visão executiva</span>
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              A Vixio nasceu da frustração com consultorias que entregam diagnósticos brilhantes... e param por aí. Combinamos profundidade científica com capacidade de execução.
            </p>

            <ul className="space-y-3 mb-8">
              {differentiators.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
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
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
