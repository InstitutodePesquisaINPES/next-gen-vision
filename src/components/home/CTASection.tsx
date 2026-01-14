import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const processSteps = [
  {
    icon: MessageCircle,
    title: "Conversa Inicial",
    description: "30 minutos para entender seu desafio",
    badge: "Gratuito",
  },
  {
    icon: Mail,
    title: "Proposta Técnica",
    description: "Escopo, prazo e investimento claros",
    badge: "Em 48h",
  },
  {
    icon: Clock,
    title: "Início do Projeto",
    description: "Kickoff e primeiras entregas",
    badge: "Em 1 semana",
  },
];

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] orb-primary rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] orb-accent rounded-full animate-pulse-glow animation-delay-400" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="glass-card p-10 md:p-14 text-center">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="text-foreground">Pronto para </span>
              <span className="gradient-text">resolver de verdade?</span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Agende uma conversa sem compromisso. Em 30 minutos, entendemos seu desafio e mostramos como podemos ajudar.
            </p>

            {/* Process Steps */}
            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-5 border-primary/10"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mx-auto mb-3">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <span className="text-xs font-medium text-primary">{step.badge}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="group gradient-primary text-primary-foreground px-8 py-6 text-base glow-primary"
                asChild
              >
                <Link to="/contato">
                  <Mail className="mr-2 h-5 w-5" />
                  Agendar Conversa
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base border-border/50 hover:bg-muted/20"
                asChild
              >
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Direto
                </a>
              </Button>
            </div>

            {/* Trust indicator */}
            <p className="mt-8 text-sm text-muted-foreground">
              Orçamento gratuito • Conversa 100% confidencial • Resposta em até 24h
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
