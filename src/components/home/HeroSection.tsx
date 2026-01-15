import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const heroMessages = [
  // Afirmação impactante
  {
    headline: "Dados sem estratégia",
    highlight: "são apenas custo.",
    description: "Convertemos investimento em dados em vantagem competitiva mensurável.",
    style: "statement",
  },
  // Pergunta provocativa C-Level
  {
    headline: "Sua diretoria decide com dados",
    highlight: "ou com opinião?",
    description: "Inteligência analítica que transforma reuniões de board em decisões precisas.",
    style: "question",
  },
  // Afirmação impactante
  {
    headline: "Não entregamos dashboards.",
    highlight: "Entregamos respostas.",
    description: "Do problema de negócio à solução implementada. Sem ruído, sem relatórios ignorados.",
    style: "statement",
  },
  // Pergunta provocativa C-Level
  {
    headline: "Quanto sua operação perde",
    highlight: "por dia com processos manuais?",
    description: "Automação inteligente que libera sua equipe para o que realmente importa.",
    style: "question",
  },
  // Afirmação impactante
  {
    headline: "IA não é tendência.",
    highlight: "É infraestrutura.",
    description: "Machine Learning em produção, não em POCs que nunca saem do papel.",
    style: "statement",
  },
  // Pergunta provocativa C-Level
  {
    headline: "Seu concorrente já automatizou.",
    highlight: "Qual é o seu plano?",
    description: "Consultoria estratégica para quem não pode esperar mais 2 anos.",
    style: "question",
  },
];

const ROTATION_INTERVAL = 5000;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroMessages.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const currentMessage = heroMessages[activeIndex];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Orbs - Executive style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] orb-primary rounded-full animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] orb-accent rounded-full animate-pulse-glow animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orb-blue rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Rotating Headlines */}
          <div className="min-h-[160px] md:min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                  <span className="text-foreground">{currentMessage.headline}</span>
                  <br />
                  <span className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${
                    currentMessage.style === "question" ? "gradient-text-cyan" : "gradient-text"
                  }`}>
                    {currentMessage.highlight}
                  </span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                  {currentMessage.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 mb-8">
            {heroMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para mensagem ${index + 1}`}
              />
            ))}
          </div>

          {/* Value Proposition */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Inteligência de dados e sistemas sob medida para organizações que buscam{" "}
            <span className="text-foreground font-medium">resultados mensuráveis</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group gradient-primary text-primary-foreground px-8 py-6 text-base glow-primary"
              asChild
            >
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                Falar com Especialista
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base border-border/50 hover:bg-muted/20"
              asChild
            >
              <Link to="/consultoria">
                Conhecer Serviços
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a
              href="#worlds"
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
