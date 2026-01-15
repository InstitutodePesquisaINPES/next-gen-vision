import { motion } from "framer-motion";

const organizations = [
  {
    name: "Prefeitura de Vitória da Conquista",
    type: "Gestão Pública",
  },
  {
    name: "Hospital Esaú Matos",
    type: "Saúde",
  },
  {
    name: "UERJ",
    type: "Universidade",
  },
  {
    name: "UESB",
    type: "Universidade",
  },
  {
    name: "FTC",
    type: "Instituição de Ensino",
  },
  {
    name: "Secretaria de Saúde",
    type: "Gestão Pública",
  },
  {
    name: "FIOCRUZ",
    type: "Pesquisa",
  },
  {
    name: "PMVC",
    type: "Gestão Pública",
  },
];

export function ClientLogosSection() {
  return (
    <section className="py-16 relative overflow-hidden border-t border-b border-border/30">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-transparent to-muted/5" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
            Experiência comprovada em organizações de referência
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {organizations.map((org, index) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative"
            >
              <div className="glass-card p-6 text-center h-full flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/30">
                <div className="text-foreground font-semibold text-sm md:text-base mb-1 group-hover:text-primary transition-colors">
                  {org.name}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {org.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text-purple">20+</div>
            <div className="text-sm text-muted-foreground mt-1">Anos de Experiência</div>
          </div>
          <div className="h-12 w-px bg-border/50 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text-cyan">100+</div>
            <div className="text-sm text-muted-foreground mt-1">Artigos Científicos</div>
          </div>
          <div className="h-12 w-px bg-border/50 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text-purple">4º</div>
            <div className="text-sm text-muted-foreground mt-1">Melhor Indicador COVID-19</div>
          </div>
          <div className="h-12 w-px bg-border/50 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text-cyan">Dr. HC</div>
            <div className="text-sm text-muted-foreground mt-1">Doutor Honoris Causa</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
