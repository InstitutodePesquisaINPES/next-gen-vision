import { motion } from "framer-motion";
import { 
  Target, Eye, Heart, Award, Users, Zap, ArrowRight,
  Building2, Code2, Brain, BarChart3, Shield, Lightbulb,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { useSEO } from "@/hooks/useSEO";
import { usePageContent } from "@/hooks/usePageContent";

interface HeroContent { badge: string; title: string; title_highlight: string; description: string; }
interface HistoryContent { title: string; paragraphs: string[]; timeline: { year: string; title: string; description: string }[]; }
interface DifferentialsContent { badge: string; title: string; description: string; items: { title: string; description: string }[]; }
interface MissionVisionContent { mission: { title: string; description: string }; vision: { title: string; description: string }; }
interface ValuesContent { badge: string; title: string; description: string; items: { title: string; description: string }[]; }
interface FAQContent { badge: string; title: string; description: string; items: { question: string; answer: string }[]; }

const defaultHero: HeroContent = { badge: "Sobre a Vixio", title: "Transformando o futuro com", title_highlight: "tecnologia", description: "Somos uma empresa de tecnologia especializada em sistemas inteligentes e ciência de dados, dedicada a transformar desafios complexos em soluções inovadoras." };
const defaultHistory: HistoryContent = { title: "Nossa História", paragraphs: ["A Vixio nasceu da paixão por transformar dados em soluções que geram valor real para as empresas.", "Ao longo dos anos, evoluímos de uma consultoria de desenvolvimento para uma empresa completa de tecnologia.", "Hoje, combinamos rigor acadêmico com agilidade de mercado para entregar sistemas inteligentes que geram impacto mensurável."], timeline: [{ year: "2016", title: "Fundação", description: "Início das operações com foco em desenvolvimento web." }, { year: "2018", title: "Expansão para Dados", description: "Ampliação para análise de dados e BI." }, { year: "2020", title: "IA & Machine Learning", description: "Entrada no mercado de ML e IA aplicada." }, { year: "2022", title: "Consolidação", description: "Mais de 100 projetos entregues." }, { year: "2024", title: "Plataforma Completa", description: "Lançamento de soluções SaaS próprias." }] };
const defaultDifferentials: DifferentialsContent = { badge: "Por que a Vixio", title: "Nossos Diferenciais", description: "O que nos torna a escolha certa para projetos de tecnologia e dados.", items: [{ title: "Equipe com DNA Científico", description: "Nossa equipe une formação acadêmica rigorosa com experiência prática." }, { title: "Metodologia Proprietária", description: "Processo estruturado em 5 fases garantindo entregas previsíveis." }, { title: "Foco em Resultados Mensuráveis", description: "Cada projeto é orientado por KPIs claros." }] };
const defaultMissionVision: MissionVisionContent = { mission: { title: "Missão", description: "Transformar dados em decisões estratégicas através de sistemas inteligentes e soluções tecnológicas inovadoras." }, vision: { title: "Visão", description: "Ser reconhecida como a principal referência em sistemas inteligentes e ciência de dados no Brasil." } };
const defaultValues: ValuesContent = { badge: "Nossos Valores", title: "O que nos move", description: "Princípios que guiam cada decisão e cada linha de código que escrevemos.", items: [{ title: "Inovação", description: "Buscamos constantemente as melhores tecnologias." }, { title: "Parceria", description: "Trabalhamos lado a lado com nossos clientes." }, { title: "Excelência", description: "Comprometimento com a qualidade." }, { title: "Paixão", description: "Amamos o que fazemos." }] };
const defaultFaq: FAQContent = { badge: "Dúvidas Frequentes", title: "Perguntas & Respostas", description: "Tudo o que você precisa saber antes de começar um projeto conosco.", items: [] };

const timelineIcons = [Building2, BarChart3, Brain, Code2, Lightbulb];
const diffIcons = [Brain, Shield, BarChart3];
const valueIcons = [Zap, Users, Award, Heart];

const FAQItem = ({ item, index }: { item: { question: string; answer: string }; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="border border-border/50 rounded-xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/30 transition-colors">
        <span className="text-foreground font-medium pr-4">{item.question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
        <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{item.answer}</p>
      </motion.div>
    </motion.div>
  );
};

const Sobre = () => {
  const { getSection } = usePageContent("sobre");
  const hero = getSection<HeroContent>("hero", defaultHero);
  const history = getSection<HistoryContent>("history", defaultHistory);
  const differentials = getSection<DifferentialsContent>("differentials", defaultDifferentials);
  const mv = getSection<MissionVisionContent>("mission_vision", defaultMissionVision);
  const values = getSection<ValuesContent>("values", defaultValues);
  const faq = getSection<FAQContent>("faq", defaultFaq);

  useSEO({ title: "Sobre a Vixio", description: "Conheça a Vixio: empresa de tecnologia especializada em sistemas inteligentes e ciência de dados desde 2016." });

  return (
    <Layout>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">{hero.badge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {hero.title}{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">{hero.title_highlight}</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{history.title}</h2>
              <div className="space-y-4 text-muted-foreground">
                {history.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <Link to="/fundador" className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline">
                Conheça nosso Fundador<ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              {history.timeline.map((item, index) => {
                const Icon = timelineIcons[index % timelineIcons.length];
                return (
                  <motion.div key={index} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative pl-14 pb-8 last:pb-0">
                    <div className="absolute left-0 top-1 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20"><Icon className="h-5 w-5 text-primary" /></div>
                    <span className="text-sm font-bold text-primary">{item.year}</span>
                    <h3 className="text-base font-semibold text-foreground mt-0.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader badge={differentials.badge} title={differentials.title} description={differentials.description} />
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {differentials.items.map((diff, index) => {
              const Icon = diffIcons[index % diffIcons.length];
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-8 hover-lift">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5"><Icon className="h-7 w-7 text-primary" /></div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{diff.title}</h3>
                  <p className="text-muted-foreground">{diff.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"><Target className="h-7 w-7 text-primary" /></div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{mv.mission.title}</h3>
              <p className="text-muted-foreground">{mv.mission.description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-8 md:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6"><Eye className="h-7 w-7 text-primary" /></div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{mv.vision.title}</h3>
              <p className="text-muted-foreground">{mv.vision.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader badge={values.badge} title={values.title} description={values.description} />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.items.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-6 text-center hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Icon className="h-6 w-6 text-primary" /></div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.items.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-custom">
            <SectionHeader badge={faq.badge} title={faq.title} description={faq.description} />
            <div className="mt-16 max-w-3xl mx-auto space-y-3">
              {faq.items.map((item, index) => (
                <FAQItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Sobre;
