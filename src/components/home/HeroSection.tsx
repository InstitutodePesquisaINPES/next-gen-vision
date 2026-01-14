import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Brain, Code2, GraduationCap, Shield, Target, Zap, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const heroMessages = [
  {
    headline: "Não analisamos dados.",
    highlight: "Resolvemos problemas.",
    description: "Ciência de dados aplicada com foco em resultado. Diagnóstico preciso, plano de ação claro e implementação completa.",
  },
  {
    headline: "Não desenvolvemos sistemas.",
    highlight: "Automatizamos operações.",
    description: "Engenharia de software com visão de negócio. Da ideia ao deploy em semanas, não meses.",
  },
  {
    headline: "Não oferecemos treinamentos.",
    highlight: "Transformamos equipes.",
    description: "Capacitação executiva que prepara sua organização para decisões baseadas em evidências.",
  },
];

const capabilities = [
  { icon: Target, label: "Diagnóstico Preciso" },
  { icon: Zap, label: "Ação Imediata" },
  { icon: TrendingUp, label: "Resultado Mensurável" },
  { icon: Shield, label: "100% Sigiloso" },
];

const ROTATION_INTERVAL = 6000;

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Consultoria Executiva em Ciência, Sistemas & Educação
            </span>
          </motion.div>

          {/* Rotating Headlines */}
          <div className="mt-10 h-[200px] md:h-[220px] lg:h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                  <span className="text-muted-foreground">{currentMessage.headline}</span>
                  <br />
                  <span className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text">
                    {currentMessage.highlight}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            {heroMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-10 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Ir para mensagem ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Rotating Description */}
          <div className="h-[100px] flex items-center justify-center mt-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                {currentMessage.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Capabilities Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {capabilities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-border/30"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* World CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-6 text-base shadow-lg shadow-blue-500/20"
              asChild
            >
              <Link to="/consultoria">
                <Brain className="mr-2 h-5 w-5" />
                Consultoria & Data Science
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="group gradient-primary text-primary-foreground px-8 py-6 text-base glow-primary"
              asChild
            >
              <Link to="/sistemas">
                <Code2 className="mr-2 h-5 w-5" />
                Engenharia de Sistemas
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-6 text-base shadow-lg shadow-amber-500/20"
              asChild
            >
              <Link to="/educacao">
                <GraduationCap className="mr-2 h-5 w-5" />
                Educação Corporativa
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 glass-card p-8 max-w-4xl mx-auto"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">"Outras consultorias entregam relatórios.</span>{" "}
              Nós entregamos soluções implementadas. Não paramos no diagnóstico — 
              construímos o caminho, desenvolvemos a ferramenta e capacitamos a equipe 
              para sustentar o resultado."
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Do diagnóstico à implementação
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Metodologia científica
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Resultado mensurável
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#worlds"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm">Conheça nossa abordagem</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
