import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, Clock, Target, Shield, BarChart3, Zap, Users, Brain,
  ShoppingCart, Stethoscope, Building2, Factory, Truck, GraduationCap,
  Banknote, Megaphone, Leaf, Smartphone, ChevronLeft, ChevronRight,
  type LucideIcon
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

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

interface CaseHighlight {
  icon: LucideIcon;
  sector: string;
  category: string;
  result: string;
  impact: string;
  metric: string;
  color: string;
}

const caseHighlights: CaseHighlight[] = [
  // SISTEMAS
  {
    icon: Smartphone,
    sector: "Sistemas",
    category: "Gestão Empresarial",
    result: "ERP customizado para rede de franquias com 45 unidades",
    impact: "Integração completa de vendas, estoque e financeiro",
    metric: "45 Unidades",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Building2,
    sector: "Sistemas",
    category: "Gestão Imobiliária",
    result: "Plataforma de gestão de imóveis e contratos",
    impact: "Automatização de cobranças e relatórios de ocupação",
    metric: "R$50M",
    color: "from-indigo-500 to-blue-400",
  },
  {
    icon: Factory,
    sector: "Sistemas",
    category: "Controle de Produção",
    result: "Sistema MES para rastreabilidade em indústria alimentícia",
    impact: "100% de rastreabilidade lote-a-lote",
    metric: "100%",
    color: "from-slate-500 to-zinc-400",
  },
  {
    icon: Truck,
    sector: "Sistemas",
    category: "Logística",
    result: "TMS integrado com roteirização inteligente",
    impact: "Redução de 28% nos custos de transporte",
    metric: "28%",
    color: "from-emerald-500 to-teal-400",
  },
  // CONSULTORIA
  {
    icon: BarChart3,
    sector: "Consultoria",
    category: "Analytics & BI",
    result: "Implementação de data warehouse e dashboards executivos",
    impact: "Decisões baseadas em dados em tempo real",
    metric: "Real-time",
    color: "from-primary to-accent",
  },
  {
    icon: Brain,
    sector: "Consultoria",
    category: "Data Science",
    result: "Modelo preditivo de churn para telecom",
    impact: "Retenção de 12.000 clientes em risco",
    metric: "12K",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Users,
    sector: "Consultoria",
    category: "People Analytics",
    result: "Dashboard de clima e performance para RH",
    impact: "Redução de 25% no turnover voluntário",
    metric: "25%",
    color: "from-amber-500 to-orange-400",
  },
  {
    icon: Target,
    sector: "Consultoria",
    category: "Customer Intelligence",
    result: "Segmentação avançada e LTV preditivo",
    impact: "Aumento de 34% no ticket médio por segmento",
    metric: "34%",
    color: "from-rose-500 to-red-400",
  },
  {
    icon: Shield,
    sector: "Consultoria",
    category: "Behavioral Analytics",
    result: "Análise comportamental para detecção de fraudes",
    impact: "Economia de R$2.3M em fraudes evitadas",
    metric: "R$2.3M",
    color: "from-red-500 to-orange-400",
  },
  {
    icon: TrendingUp,
    sector: "Consultoria",
    category: "Planejamento Estratégico",
    result: "Modelagem de cenários e forecast financeiro",
    impact: "Acurácia de 92% nas projeções trimestrais",
    metric: "92%",
    color: "from-green-500 to-emerald-400",
  },
  // PLATAFORMAS
  {
    icon: ShoppingCart,
    sector: "Plataformas",
    category: "E-commerce B2B",
    result: "Marketplace white-label para distribuidora",
    impact: "Digitalização de 800+ clientes atacado",
    metric: "800+",
    color: "from-cyan-500 to-sky-400",
  },
  {
    icon: GraduationCap,
    sector: "Plataformas",
    category: "LMS Educacional",
    result: "Plataforma de cursos com gamificação",
    impact: "Aumento de 45% na taxa de conclusão",
    metric: "45%",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: Stethoscope,
    sector: "Plataformas",
    category: "Telemedicina",
    result: "Sistema de agendamento e prontuário eletrônico",
    impact: "3.500 consultas/mês processadas",
    metric: "3.5K/mês",
    color: "from-teal-500 to-cyan-400",
  },
  // EDUCAÇÃO CORPORATIVA
  {
    icon: Zap,
    sector: "Educação",
    category: "Capacitação Técnica",
    result: "Programa de formação em Data Science in-company",
    impact: "42 profissionais certificados",
    metric: "42 Cert.",
    color: "from-yellow-500 to-amber-400",
  },
  {
    icon: Brain,
    sector: "Educação",
    category: "Workshop Analytics",
    result: "Treinamento de Power BI e SQL para times de negócio",
    impact: "Autonomia analítica para 5 departamentos",
    metric: "5 Times",
    color: "from-pink-500 to-rose-400",
  },
  // MARKETPLACE
  {
    icon: Megaphone,
    sector: "Marketplace",
    category: "Soluções Prontas",
    result: "Templates de dashboards setoriais",
    impact: "Implementação em até 72h",
    metric: "72h",
    color: "from-orange-500 to-red-400",
  },
  {
    icon: Banknote,
    sector: "Marketplace",
    category: "Automações",
    result: "Pacotes de automação RPA para financeiro",
    impact: "60% de redução em tarefas manuais",
    metric: "60%",
    color: "from-lime-500 to-green-400",
  },
];

export function ResultsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

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

        {/* Case Highlights Carousel */}
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
                {caseHighlights.length} exemplos de resultados entregues
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
                <Shield className="w-3 h-3" />
                Dados anonimizados
              </div>
              {/* Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-border/50"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-border/50"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {caseHighlights.map((caseItem, index) => (
                <div
                  key={index}
                  className="flex-none w-[280px] md:w-[320px]"
                >
                  <div className="p-5 rounded-xl bg-muted/20 border border-border/30 hover:border-primary/30 transition-all duration-300 group h-full">
                    {/* Metric badge */}
                    <div className={`inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r ${caseItem.color} text-white text-xs font-bold mb-4`}>
                      {caseItem.metric}
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${caseItem.color} bg-opacity-20`}>
                        <caseItem.icon className="w-4 h-4 text-foreground" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-primary uppercase tracking-wider block">
                          {caseItem.sector}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {caseItem.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-foreground mb-3 min-h-[40px]">
                      {caseItem.result}
                    </p>
                    
                    <p className="text-xs text-accent font-medium">
                      → {caseItem.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Categories summary */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground text-center mb-4">
              Áreas de atuação
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Sistemas ERP/CRM",
                "Consultoria Analytics", 
                "Data Science & IA",
                "People Analytics",
                "Plataformas Web",
                "Educação Corporativa",
                "Marketplace",
                "Automação RPA"
              ].map((area, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-muted/30 text-muted-foreground border border-border/20"
                >
                  {area}
                </span>
              ))}
            </div>
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
