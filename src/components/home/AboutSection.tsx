import { motion } from "framer-motion";
import { ArrowRight, Target, Lightbulb, Wrench, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, fadeInUp } from "@/components/ui/scroll-animations";
import { usePageContent } from "@/hooks/usePageContent";

interface AboutContent {
  badge: string;
  title: string;
  title_highlight: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  steps: { step: string; title: string; description: string }[];
}

const defaultContent: AboutContent = {
  badge: "Como Trabalhamos",
  title: "Do problema à solução",
  title_highlight: "em 4 etapas",
  description: "Não entregamos apenas relatórios — implementamos soluções completas com impacto mensurável nos seus KPIs.",
  cta_primary_text: "Conheça Nossa História",
  cta_primary_link: "/sobre",
  cta_secondary_text: "Sobre o Fundador",
  cta_secondary_link: "/fundador",
  steps: [
    { step: "01", title: "Diagnóstico", description: "Mapeamos o problema real com análise rigorosa — não o sintoma." },
    { step: "02", title: "Solução", description: "Desenhamos a arquitetura específica para seu contexto e dados." },
    { step: "03", title: "Implementação", description: "Desenvolvemos e colocamos em produção com entregas incrementais." },
    { step: "04", title: "Transferência", description: "Capacitamos sua equipe para sustentar e evoluir o resultado." },
  ],
};

const stepIcons = [Target, Lightbulb, Wrench, Users];

export function AboutSection() {
  const { getSection } = usePageContent("home");
  const content = getSection<AboutContent>("about", defaultContent);

  return (
    <section className="section-padding bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] orb-primary rounded-full opacity-30" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] orb-accent rounded-full opacity-20" />

      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-20">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6">
            <Award className="w-4 h-4" />
            {content.badge}
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {content.title}{" "}
            <span className="gradient-text-purple">{content.title_highlight}</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {content.steps.map((item, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <StaggerItem key={item.step} variants={fadeInUp}>
                <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="glass-card p-6 relative group hover:border-primary/40 transition-all duration-300 h-full">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }} className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
                    {item.step}
                  </motion.div>
                  <div className="pt-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                  {index < content.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="gradient-primary text-primary-foreground glow-primary group" asChild>
            <Link to={content.cta_primary_link}>
              {content.cta_primary_text}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border/50 hover:bg-muted/20" asChild>
            <Link to={content.cta_secondary_link}>{content.cta_secondary_text}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
