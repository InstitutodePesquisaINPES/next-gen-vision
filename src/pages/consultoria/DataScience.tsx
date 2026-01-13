import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Brain, Database, LineChart, Cpu, Code2, 
  Layers, GitBranch, ChevronRight, CheckCircle2, BarChart3,
  Sparkles, Target, Zap, Users, Award, TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const services = [
  {
    icon: Database,
    title: "Engenharia de Dados",
    description: "Pipelines robustos, ETL automatizado e data lakes escaláveis para preparar sua infraestrutura.",
    features: ["Data Warehousing", "ETL/ELT Pipelines", "Data Quality", "Cloud Integration"]
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Modelos preditivos e classificatórios customizados para resolver problemas complexos do seu negócio.",
    features: ["Modelos Supervisionados", "Deep Learning", "NLP & Visão Computacional", "MLOps"]
  },
  {
    icon: LineChart,
    title: "Análise Exploratória",
    description: "Investigação profunda dos dados para descobrir padrões ocultos e oportunidades estratégicas.",
    features: ["Análise Estatística", "Visualização Avançada", "Correlações", "Segmentação"]
  },
  {
    icon: Cpu,
    title: "IA Generativa",
    description: "Soluções com LLMs, chatbots inteligentes e automação de processos com IA de última geração.",
    features: ["Chatbots Customizados", "Geração de Conteúdo", "RAG Systems", "Fine-tuning"]
  },
];

const technologies = [
  { name: "Python", category: "Linguagem" },
  { name: "TensorFlow", category: "Deep Learning" },
  { name: "PyTorch", category: "Deep Learning" },
  { name: "Scikit-learn", category: "ML" },
  { name: "Pandas", category: "Data" },
  { name: "Apache Spark", category: "Big Data" },
  { name: "AWS/GCP/Azure", category: "Cloud" },
  { name: "Docker/K8s", category: "DevOps" },
];

const cases = [
  {
    title: "Previsão de Demanda",
    industry: "Varejo",
    result: "40% redução de estoque",
    description: "Modelo de séries temporais para otimização de inventário em rede varejista."
  },
  {
    title: "Detecção de Fraude",
    industry: "Fintech",
    result: "92% de precisão",
    description: "Sistema de ML em tempo real para identificação de transações fraudulentas."
  },
  {
    title: "Recomendação de Produtos",
    industry: "E-commerce",
    result: "+35% conversão",
    description: "Engine de recomendação personalizada baseado em comportamento do usuário."
  },
];

const process = [
  { step: "01", title: "Discovery", description: "Entendimento profundo do problema e dos dados disponíveis" },
  { step: "02", title: "Preparação", description: "Limpeza, transformação e feature engineering" },
  { step: "03", title: "Modelagem", description: "Experimentação e seleção do melhor modelo" },
  { step: "04", title: "Validação", description: "Testes rigorosos e métricas de performance" },
  { step: "05", title: "Deploy", description: "Implementação em produção com monitoramento" },
];

export default function DataScience() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/consultoria" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-8 hover:bg-purple-500/20 transition-colors"
              >
                <Brain className="w-4 h-4" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                Data Science
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Ciência de</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Dados
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Transformamos dados brutos em inteligência acionável. Machine Learning, 
              IA e análises avançadas para decisões que impulsionam resultados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Iniciar Projeto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-lg"
                asChild
              >
                <Link to="/portfolio">Ver Cases</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { value: "50+", label: "Modelos em Produção" },
                { value: "98%", label: "Taxa de Sucesso" },
                { value: "10M+", label: "Registros Processados" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços"
            title="Soluções Completas em"
            titleHighlight="Data Science"
            description="Do tratamento de dados à IA em produção, oferecemos expertise end-to-end para seus desafios analíticos."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift group"
              >
                <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400 w-fit group-hover:bg-purple-500/20 transition-colors">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-3 text-muted-foreground">{service.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Processo"
            titleHighlight="Científico"
            description="Seguimos uma metodologia rigorosa para garantir resultados consistentes e escaláveis."
          />

          <div className="mt-16 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-purple-400">{item.step}</span>
                  </div>
                  <h4 className="mt-4 font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Stack"
            title="Tecnologias"
            titleHighlight="Avançadas"
            description="Utilizamos as ferramentas mais modernas do mercado para entregar soluções de ponta."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card px-6 py-3 hover:border-purple-500/50 transition-all cursor-default"
              >
                <div className="text-foreground font-medium">{tech.name}</div>
                <div className="text-xs text-muted-foreground">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Cases"
            title="Resultados"
            titleHighlight="Comprovados"
            description="Projetos reais que geraram impacto mensurável para nossos clientes."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {cases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift group"
              >
                <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
                  <Sparkles className="w-4 h-4" />
                  {item.industry}
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-lg font-bold text-green-400">{item.result}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-muted/20 to-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-violet-500/10 to-purple-500/5" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Pronto para começar?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Transforme seus dados em{" "}
                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  vantagem competitiva
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Nossa equipe de cientistas de dados está pronta para entender seu desafio 
                e propor soluções que geram resultados reais.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Consultoria Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50"
                  asChild
                >
                  <Link to="/consultoria">Ver Outras Áreas</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
