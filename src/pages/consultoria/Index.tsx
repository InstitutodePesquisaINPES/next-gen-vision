import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Target, Users, Microscope, Heart, Fingerprint, UserCheck, BarChart3, CheckCircle2, Building2, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";

interface HeroContent {
  badge: string;
  title_line1: string;
  title_line2: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  stats: { value: string; label: string }[];
}

interface ServicesContent {
  title: string;
  description: string;
  items: { id: string; title: string; subtitle: string; description: string; link: string }[];
}

interface DifferentialsContent {
  title: string;
  description: string;
  items: { text: string }[];
  cta_badge: string;
  cta_title: string;
  cta_description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
}

const defaultHero: HeroContent = {
  badge: "Consultoria Especializada",
  title_line1: "Ciência de Dados &",
  title_line2: "Inteligência Estratégica",
  description: "Transformamos dados complexos em decisões estratégicas através de metodologias científicas e análises rigorosas.",
  cta_primary_text: "Agendar Reunião",
  cta_primary_link: "/contato",
  cta_secondary_text: "Ver Especializações",
  stats: [{ value: "7", label: "Especializações" }, { value: "Multidisciplinar", label: "Equipe" }],
};

const defaultServices: ServicesContent = {
  title: "Nossas Especializações",
  description: "Soluções completas em inteligência de dados para empresas que buscam resultados mensuráveis e vantagem competitiva.",
  items: [
    { id: "data-science", title: "Machine Learning & IA", subtitle: "Modelos Preditivos • IA Generativa • MLOps", description: "Desenvolvimento e deploy de modelos de machine learning em produção.", link: "/consultoria/data-science" },
    { id: "bioestatistica", title: "Bioestatística", subtitle: "Ensaios Clínicos • Epidemiologia • Regulatório", description: "Rigor científico em análises estatísticas para saúde e pesquisa clínica.", link: "/consultoria/bioestatistica" },
    { id: "behavioral", title: "Análise Comportamental", subtitle: "Vieses Cognitivos • Psicometria • Decisão", description: "Insights além da estatística tradicional.", link: "/consultoria/behavioral" },
    { id: "analytics", title: "Analytics & BI", subtitle: "Dashboards • Visualização • Self-Service", description: "Dashboards estratégicos e cultura de dados.", link: "/consultoria/analytics" },
    { id: "planejamento", title: "Planejamento Estratégico", subtitle: "OKRs • BSC • Roadmaps", description: "Planejamento orientado por evidências.", link: "/consultoria/planejamento" },
    { id: "people", title: "People Analytics", subtitle: "RH Estratégico • Turnover • Engajamento", description: "Inteligência de capital humano.", link: "/consultoria/people-analytics" },
    { id: "customer", title: "Customer Intelligence", subtitle: "CDP • LTV • Churn Prediction", description: "Visão 360° do cliente.", link: "/consultoria/customer-intelligence" },
  ],
};

const defaultDifferentials: DifferentialsContent = {
  title: "Por que escolher a Vixio?",
  description: "Combinamos expertise técnica com visão de negócio para entregar soluções que geram impacto real e mensurável.",
  items: [
    { text: "Metodologia científica rigorosa" },
    { text: "Equipe multidisciplinar especializada" },
    { text: "Atendimento corporativo dedicado" },
    { text: "Resultados mensuráveis garantidos" },
  ],
  cta_badge: "100% Sigiloso",
  cta_title: "Precisa de uma análise personalizada?",
  cta_description: "Nossa equipe de especialistas está pronta para entender seu desafio e propor soluções baseadas em evidências científicas.",
  cta_primary_text: "Agendar Consultoria",
  cta_primary_link: "/contato",
  cta_secondary_text: "Voltar ao Início",
  cta_secondary_link: "/",
};

const serviceIcons = [Brain, Microscope, Heart, BarChart3, Target, UserCheck, Fingerprint];
const diffIcons = [Award, Users, Building2, CheckCircle2];

export default function ConsultoriaIndex() {
  const { getSection } = usePageContent("consultoria");
  const hero = getSection<HeroContent>("hero", defaultHero);
  const services = getSection<ServicesContent>("services", defaultServices);
  const diffs = getSection<DifferentialsContent>("differentials", defaultDifferentials);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Brain className="w-4 h-4" />
                {hero.badge}
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
              <span className="text-foreground">{hero.title_line1}</span><br />
              <span className="gradient-text-purple">{hero.title_line2}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              {hero.description}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="px-8" asChild>
                <Link to={hero.cta_primary_link}>{hero.cta_primary_text}<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#servicos">{hero.cta_secondary_text}</a>
              </Button>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-20 grid grid-cols-2 gap-6 md:gap-8 max-w-xl mx-auto">
            {hero.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{services.title}</h2>
            <p className="mt-4 text-muted-foreground">{services.description}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.items.map((area, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <motion.div key={area.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                  <Link to={area.link} className="group flex flex-col h-full p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary"><Icon className="w-5 h-5" /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{area.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{area.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{area.description}</p>
                    <div className="mt-4 pt-4 border-t border-border/30 flex items-center text-sm font-medium text-primary">
                      Ver detalhes<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{diffs.title}</h2>
              <p className="mt-4 text-muted-foreground">{diffs.description}</p>
              <div className="mt-8 space-y-4">
                {diffs.items.map((item, index) => {
                  const Icon = diffIcons[index % diffIcons.length];
                  return (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/30">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary"><Icon className="w-5 h-5" /></div>
                      <span className="text-foreground font-medium">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="p-8 md:p-10 rounded-2xl bg-card border border-border/50">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">{diffs.cta_badge}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{diffs.cta_title}</h3>
              <p className="mt-4 text-muted-foreground">{diffs.cta_description}</p>
              <div className="mt-8 space-y-3">
                <Button size="lg" className="w-full" asChild>
                  <Link to={diffs.cta_primary_link}>{diffs.cta_primary_text}<ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="ghost" className="w-full" asChild>
                  <Link to={diffs.cta_secondary_link}>{diffs.cta_secondary_text}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
