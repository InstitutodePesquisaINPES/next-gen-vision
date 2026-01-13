import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mail, Phone, Clock, Shield, FileCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const processSteps = [
  {
    icon: Phone,
    title: "Conversa Inicial",
    description: "30 minutos para entender seu desafio",
    time: "Gratuito",
  },
  {
    icon: FileCheck,
    title: "Proposta Técnica",
    description: "Escopo, prazo e investimento claros",
    time: "Em 48h",
  },
  {
    icon: Sparkles,
    title: "Início do Projeto",
    description: "Kickoff e primeiras entregas",
    time: "Em 1 semana",
  },
];

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative z-10">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                Resposta em até 24 horas
              </span>

              {/* Headline */}
              <h2 className="mt-8 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-white">Pronto para </span>
                <span className="gradient-text">resolver de verdade?</span>
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Agende uma conversa sem compromisso. Em 30 minutos, entendemos seu 
                desafio e mostramos como podemos ajudar — com clareza e objetividade.
              </p>

              {/* Process Steps */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 border-primary/20"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <span className="text-xs font-medium text-primary">{step.time}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="group gradient-primary text-primary-foreground px-10 py-7 text-lg glow-primary"
                  asChild
                >
                  <Link to="/contato">
                    <Mail className="mr-2 h-5 w-5" />
                    Agendar Conversa
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-7 text-lg border-primary/30 hover:bg-primary/10"
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

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Orçamento gratuito e sem compromisso
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Conversa 100% confidencial
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground text-lg italic">
              "Antes de analisar, desenvolver ou implantar tecnologia, avaliamos se a organização 
              está preparada — e capacitamos as pessoas para sustentar a decisão."
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              — Posicionamento Vixio
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
