import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, Sparkles, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Target,
    title: "Diagnóstico Preciso",
    description: "Mapeamento do problema real, não do sintoma.",
  },
  {
    icon: Zap,
    title: "Solução Sob Medida",
    description: "Arquitetura desenhada para seu contexto específico.",
  },
  {
    icon: Sparkles,
    title: "Implementação Completa",
    description: "Do conceito à produção com sua equipe.",
  },
];

export function FeaturedSolution() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6"
              >
                <Fingerprint className="w-4 h-4" />
                Solução Exclusiva
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
              >
                Inteligência Estratégica
                <br />
                <span className="gradient-text-purple">Personalizada™</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-lg text-muted-foreground"
              >
                Seu desafio é único? Nós desenhamos a solução ideal. 
                Analisamos sua demanda, compreendemos o problema e criamos 
                uma metodologia exclusiva para sua organização.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="mt-4 text-muted-foreground"
              >
                Combinamos ciência de dados, engenharia de software e visão 
                estratégica para entregar resultados que impactam diretamente seus indicadores.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Button 
                  size="lg" 
                  className="gradient-primary text-primary-foreground glow-primary"
                  asChild
                >
                  <Link to="/contato">
                    Conhecer Solução
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* Stats highlight */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-purple">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-purple">3x</div>
                  <div className="text-xs text-muted-foreground">Retorno Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text-purple">45d</div>
                  <div className="text-xs text-muted-foreground">Tempo p/ Resultado</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
