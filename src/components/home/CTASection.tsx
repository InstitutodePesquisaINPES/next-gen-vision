import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mail, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, fadeInUp } from "@/components/ui/scroll-animations";
import { usePageContent } from "@/hooks/usePageContent";

interface CTAContent {
  badge: string;
  title: string;
  title_highlight: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  guarantees: string[];
  steps: { title: string; description: string; badge: string }[];
}

const defaultContent: CTAContent = {
  badge: "Comece Agora",
  title: "Pronto para",
  title_highlight: "resolver de verdade?",
  description: "Agende uma conversa sem compromisso. Em 30 minutos, entendemos seu desafio e mostramos como podemos ajudar.",
  cta_primary_text: "Agendar Conversa",
  cta_primary_link: "/contato",
  cta_secondary_text: "WhatsApp Direto",
  cta_secondary_link: "https://wa.me/5577991005071",
  guarantees: ["Orçamento gratuito", "Conversa 100% confidencial", "Resposta em até 24h"],
  steps: [
    { title: "Conversa Inicial", description: "30 minutos para entender seu desafio", badge: "Gratuito" },
    { title: "Proposta Técnica", description: "Escopo, prazo e investimento claros", badge: "Em 48h" },
    { title: "Início do Projeto", description: "Kickoff e primeiras entregas", badge: "Em 1 semana" },
  ],
};

const stepIcons = [MessageCircle, Mail, Clock];
const stepGradients = ["from-primary to-accent", "from-violet-500 to-purple-400", "from-amber-500 to-orange-400"];

export function CTASection() {
  const { getSection } = usePageContent("home");
  const content = getSection<CTAContent>("cta", defaultContent);

  return (
    <section className="section-padding-lg relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] orb-primary rounded-full" />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] orb-accent rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-14 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <motion.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              {content.badge}
            </motion.span>

            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="text-foreground">{content.title} </span>
              <span className="gradient-text-purple">{content.title_highlight}</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {content.description}
            </motion.p>

            <StaggerContainer className="mt-14 grid md:grid-cols-3 gap-5">
              {content.steps.map((step, index) => {
                const Icon = stepIcons[index % stepIcons.length];
                const gradient = stepGradients[index % stepGradients.length];
                return (
                  <StaggerItem key={index} variants={fadeInUp}>
                    <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="glass-card p-6 border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }} className={`p-3 rounded-xl bg-gradient-to-r ${gradient} w-fit mx-auto mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <span className="inline-block text-xs font-semibold text-primary px-3 py-1 rounded-full bg-primary/10">{step.badge}</span>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="group gradient-primary text-primary-foreground px-10 py-7 text-lg glow-primary" asChild>
                <Link to={content.cta_primary_link}>
                  <Mail className="mr-2 h-5 w-5" />
                  {content.cta_primary_text}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-10 py-7 text-lg border-border/50 hover:bg-muted/20" asChild>
                <a href={content.cta_secondary_link} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {content.cta_secondary_text}
                </a>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {content.guarantees.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 + index * 0.1 }} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
