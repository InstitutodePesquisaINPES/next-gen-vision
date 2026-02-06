import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";

interface HeroMessage {
  headline: string;
  highlight: string;
  description: string;
  style: "statement" | "question";
}

interface HeroContent {
  badge: string;
  value_proposition: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  trust_indicators: string[];
  messages: HeroMessage[];
}

const defaultContent: HeroContent = {
  badge: "Inteligência de Dados para Decisões Estratégicas",
  value_proposition: "Inteligência de dados e sistemas sob medida para organizações que buscam resultados mensuráveis.",
  cta_primary_text: "Falar com Especialista",
  cta_primary_link: "https://wa.me/5577991005071",
  cta_secondary_text: "Conhecer Serviços",
  cta_secondary_link: "/consultoria",
  trust_indicators: ["100% Sigiloso", "Resultados em Semanas", "Equipe Especializada"],
  messages: [
    { headline: "Dados sem estratégia", highlight: "são apenas custo.", description: "Convertemos investimento em dados em vantagem competitiva mensurável.", style: "statement" },
    { headline: "Sua diretoria decide com dados", highlight: "ou com opinião?", description: "Inteligência analítica que transforma reuniões de board em decisões precisas.", style: "question" },
    { headline: "Não entregamos dashboards.", highlight: "Entregamos respostas.", description: "Do problema de negócio à solução implementada. Sem ruído, sem relatórios ignorados.", style: "statement" },
    { headline: "Quanto sua operação perde", highlight: "por dia com processos manuais?", description: "Automação inteligente que libera sua equipe para o que realmente importa.", style: "question" },
    { headline: "IA não é tendência.", highlight: "É infraestrutura.", description: "Machine Learning em produção, não em POCs que nunca saem do papel.", style: "statement" },
    { headline: "Seu concorrente já automatizou.", highlight: "Qual é o seu plano?", description: "Consultoria estratégica para quem não pode esperar mais 2 anos.", style: "question" },
  ],
};

const trustIcons = [Shield, Clock, Award];
const ROTATION_INTERVAL = 5000;

export function HeroSection() {
  const { getSection } = usePageContent("home");
  const content = getSection<HeroContent>("hero", defaultContent);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % content.messages.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [content.messages.length]);

  const currentMessage = content.messages[activeIndex];
  const isExternal = content.cta_primary_link.startsWith("http");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute top-1/4 right-1/4 w-[500px] h-[500px] orb-primary rounded-full animate-pulse-glow" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.3 }} className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] orb-accent rounded-full animate-pulse-glow animation-delay-400" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.6 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] orb-blue rounded-full" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 bg-primary/30 rounded-full" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }} animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              {content.badge}
            </span>
          </motion.div>

          {/* Rotating Headlines */}
          <div className="min-h-[180px] md:min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={activeIndex} initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -40, filter: "blur(10px)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                  <span className="text-foreground">{currentMessage.headline}</span>
                  <br />
                  <span className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${currentMessage.style === "question" ? "gradient-text-cyan" : "gradient-text-purple"}`}>
                    {currentMessage.highlight}
                  </span>
                </h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {currentMessage.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-8">
            {content.messages.map((_, index) => (
              <button key={index} onClick={() => setActiveIndex(index)} className={`transition-all duration-300 rounded-full ${index === activeIndex ? "w-10 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} aria-label={`Ir para mensagem ${index + 1}`} />
            ))}
          </div>

          {/* Value Proposition */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            {content.value_proposition}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="group gradient-primary text-primary-foreground px-8 py-6 text-base glow-primary" asChild>
              {isExternal ? (
                <a href={content.cta_primary_link} target="_blank" rel="noopener noreferrer">
                  {content.cta_primary_text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <Link to={content.cta_primary_link}>
                  {content.cta_primary_text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-base border-border/50 hover:bg-muted/20" asChild>
              <Link to={content.cta_secondary_link}>
                {content.cta_secondary_text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {content.trust_indicators.map((label, index) => {
              const Icon = trustIcons[index % trustIcons.length];
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + index * 0.1 }} className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#worlds" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
