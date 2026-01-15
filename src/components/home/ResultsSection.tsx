import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, Shield, BarChart3, Zap, Users, Brain } from "lucide-react";

const impactMetrics = [
  {
    icon: Clock,
    metric: "80%",
    label: "Redução no Tempo de Análise",
    description: "Automação de processos analíticos que antes levavam dias",
    source: "Média em projetos de BI & Analytics",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: TrendingUp,
    metric: "3.2x",
    label: "ROI em Data Science",
    description: "Retorno médio documentado em projetos de ML em produção",
    source: "McKinsey Global Institute, 2023",
    color: "from-primary to-accent",
  },
  {
    icon: Target,
    metric: "45%",
    label: "Melhoria na Precisão",
    description: "Acurácia em modelos preditivos vs. decisões baseadas em intuição",
    source: "Harvard Business Review Analytics",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Users,
    metric: "60%",
    label: "Redução de Tarefas Manuais",
    description: "Liberação de equipes para atividades estratégicas",
    source: "Benchmark operacional médio",
    color: "from-amber-500 to-orange-400",
  },
];

const caseHighlights = [
  {
    icon: BarChart3,
    sector: "Varejo",
    result: "Previsão de demanda com 94% de acurácia",
    impact: "Redução de 23% em ruptura de estoque",
  },
  {
    icon: Brain,
    sector: "Saúde",
    result: "Modelo de risco clínico validado",
    impact: "Identificação precoce em 78% dos casos",
  },
  {
    icon: Zap,
    sector: "Financeiro",
    result: "Automação de análise de crédito",
    impact: "Tempo de decisão: de 5 dias para 2 horas",
  },
  {
    icon: Shield,
    sector: "Indústria",
    result: "Manutenção preditiva em produção",
    impact: "Redução de 35% em paradas não planejadas",
  },
];

export function ResultsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            Resultados Documentados
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Impacto{" "}
            <span className="gradient-text-purple">Mensurável</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Métricas baseadas em benchmarks de mercado e literatura científica. 
            Resultados reais, não promessas genéricas.
          </p>
        </motion.div>

        {/* Impact Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {impactMetrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 relative group hover:border-primary/40 transition-all duration-300"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-t-xl opacity-60 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 mb-4`}>
                <item.icon className="w-6 h-6 text-foreground" />
              </div>
              
              <div className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                {item.metric}
              </div>
              
              <h3 className="text-base font-semibold text-foreground mb-2">
                {item.label}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                {item.description}
              </p>
              
              <p className="text-xs text-muted-foreground/70 italic border-t border-border/30 pt-3">
                Fonte: {item.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Case Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Cases por Setor
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Exemplos de impacto em diferentes indústrias (dados anonimizados por confidencialidade)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
              <Shield className="w-3 h-3" />
              Sigilo garantido
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseHighlights.map((caseItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-5 rounded-xl bg-muted/20 border border-border/30 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <caseItem.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {caseItem.sector}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-foreground mb-2">
                  {caseItem.result}
                </p>
                
                <p className="text-xs text-accent font-medium">
                  → {caseItem.impact}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Metodologia baseada em{" "}
            <span className="text-foreground font-medium">publicações científicas</span>
            {" "}e{" "}
            <span className="text-foreground font-medium">benchmarks de mercado reconhecidos</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground/60">
            <span>McKinsey Analytics</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>Harvard Business Review</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>Gartner Research</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>IEEE Publications</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
