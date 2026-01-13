import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Brain, LineChart, Target, TrendingUp, Users, FileSpreadsheet, Microscope, Stethoscope, Heart, Fingerprint, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const consultoriaAreas = [
  {
    id: "data-science",
    icon: Brain,
    title: "Ciência de Dados & ML",
    description: "Machine Learning, IA Generativa e modelos preditivos em produção para resolver problemas complexos.",
    link: "/consultoria/data-science",
  },
  {
    id: "bioestatistica",
    icon: Microscope,
    title: "Bioestatística",
    description: "Ensaios clínicos, pesquisa epidemiológica e análises regulatórias com rigor científico.",
    link: "/consultoria/bioestatistica",
  },
  {
    id: "behavioral",
    icon: Heart,
    title: "Behavioral Analytics",
    description: "Entenda como vieses cognitivos e comportamento humano impactam seus dados e decisões.",
    link: "/consultoria/behavioral",
  },
  {
    id: "planejamento",
    icon: Target,
    title: "Planejamento Estratégico",
    description: "OKRs, BSC e roadmaps de crescimento com metodologias data-driven.",
    link: "/consultoria/planejamento",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Business Analytics",
    description: "Dashboards executivos, automação de relatórios e self-service BI.",
    link: "/consultoria/analytics",
  },
  {
    id: "people",
    icon: UserCheck,
    title: "People Analytics",
    description: "Turnover prediction, engagement analytics e inteligência de capital humano.",
    link: "/consultoria/people-analytics",
  },
  {
    id: "customer",
    icon: Fingerprint,
    title: "Customer Intelligence",
    description: "CDP, segmentação avançada, CLV e churn prediction para visão 360° do cliente.",
    link: "/consultoria/customer-intelligence",
  },
];

const diferenciais = [
  { icon: TrendingUp, label: "Metodologia Científica" },
  { icon: Users, label: "Equipe Multidisciplinar" },
  { icon: FileSpreadsheet, label: "Relatórios Detalhados" },
  { icon: LineChart, label: "Insights Acionáveis" },
];

export default function ConsultoriaIndex() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
              <Stethoscope className="w-4 h-4" />
              Mundo Consultoria
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="text-white">Consultoria &</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Ciência de Dados
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Muito além de análises matemáticas. Combinamos rigor científico, 
            expertise em bioestatística e visão estratégica para transformar 
            dados em vantagem competitiva real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {diferenciais.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50"
              >
                <item.icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Áreas de Atuação"
            title="Soluções Completas em"
            titleHighlight="Consultoria"
            description="Explore nossas especializações e descubra como podemos ajudar seu negócio a crescer com base em dados."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {consultoriaAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={area.link}
                  className="group block glass-card card-shimmer p-8 hover-lift transition-all duration-300 hover:border-blue-500/50"
                >
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                      <area.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {area.description}
                      </p>
                      <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                        Explorar
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Precisa de uma análise{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                personalizada?
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Nossa equipe de especialistas está pronta para entender seu desafio 
              e propor soluções baseadas em evidências.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8"
                asChild
              >
                <Link to="/contato">
                  Agendar Consultoria
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/50"
                asChild
              >
                <Link to="/">Voltar ao Início</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
