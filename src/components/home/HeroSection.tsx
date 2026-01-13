import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, BarChart3, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const heroMessages = [
  {
    headline: "Dados que",
    highlight: "decidem negócios",
    description: "Ciência de dados e bioestatística aplicadas para decisões baseadas em evidências.",
  },
  {
    headline: "Sistemas que",
    highlight: "resolvem problemas",
    description: "Soluções personalizadas, modernas e ágeis para automatizar sua operação.",
  },
  {
    headline: "Consultoria que",
    highlight: "transforma resultados",
    description: "Planejamento estratégico e análises avançadas para crescimento sustentável.",
  },
  {
    headline: "Tecnologia que",
    highlight: "conecta pessoas",
    description: "Secretária eletrônica WhatsApp, gestão de atendimento e muito mais.",
  },
  {
    headline: "Inteligência que",
    highlight: "antecipa tendências",
    description: "Machine learning e IA para prever cenários e otimizar processos.",
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Sistemas Inteligentes & Ciência de Dados
            </span>
          </motion.div>

          {/* Rotating Headlines */}
          <div className="mt-8 h-[180px] md:h-[200px] lg:h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground">
                  {currentMessage.headline}
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 bg-clip-text text-transparent">
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
            className="flex items-center justify-center gap-2 mt-6"
          >
            {heroMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Ir para mensagem ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Rotating Description */}
          <div className="h-[80px] flex items-center justify-center mt-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                {currentMessage.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* World CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-6 text-lg shadow-lg shadow-blue-500/20"
              asChild
            >
              <Link to="/consultoria">
                <BarChart3 className="mr-2 h-5 w-5" />
                Consultoria & Data
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="group gradient-primary text-primary-foreground px-8 py-6 text-lg glow-primary"
              asChild
            >
              <Link to="/sistemas">
                <Code2 className="mr-2 h-5 w-5" />
                Sistemas Inteligentes
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "150+", label: "Projetos Entregues" },
              { value: "50+", label: "Clientes Satisfeitos" },
              { value: "8+", label: "Anos de Experiência" },
              { value: "99%", label: "Taxa de Satisfação" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
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
            <span className="text-sm">Explore nossos mundos</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
