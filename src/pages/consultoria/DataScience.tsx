import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Brain, Database, LineChart, Cpu, 
  ChevronRight, CheckCircle2, Sparkles, Target, 
  Zap, Shield, Lightbulb, Network, Workflow, FlaskConical
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Stats - números de impacto
const stats = [
  { value: "150+", label: "Modelos em Produção", description: "Servindo milhões de predições/dia" },
  { value: "98.5%", label: "SLA de Uptime", description: "Em ambientes críticos" },
  { value: "R$ 500M+", label: "Valor Gerado", description: "Em receita e economia" },
  { value: "< 50ms", label: "Latência Média", description: "Inferência em tempo real" },
];

// Serviços principais - simplificado
const services = [
  {
    icon: Database,
    title: "Engenharia de Dados",
    subtitle: "Arquiteturas Modernas & Escaláveis",
    description: "Data Lakes, pipelines ETL/ELT, streaming em tempo real e governança de dados.",
    technologies: ["Snowflake", "Databricks", "dbt", "Airflow", "Kafka"],
  },
  {
    icon: Brain,
    title: "Machine Learning",
    subtitle: "Modelos Preditivos & Deep Learning",
    description: "Desenvolvimento de modelos supervisionados, NLP avançado e sistemas de recomendação.",
    technologies: ["PyTorch", "TensorFlow", "XGBoost", "Hugging Face"],
  },
  {
    icon: Cpu,
    title: "IA Generativa & LLMs",
    subtitle: "Automação Inteligente",
    description: "Chatbots empresariais com RAG, agentes autônomos e busca semântica vetorial.",
    technologies: ["OpenAI", "Claude", "LangChain", "Pinecone"],
  },
  {
    icon: LineChart,
    title: "Analytics Avançado",
    subtitle: "Insights Acionáveis",
    description: "Análise estatística, séries temporais, experimentos A/B e causal inference.",
    technologies: ["Python", "R", "Pandas", "SciPy"],
  },
];

// Infraestrutura MLOps - simplificado
const infrastructure = [
  {
    icon: Network,
    title: "MLOps & Governança",
    description: "CI/CD para modelos, Feature Stores, monitoramento de drift e explainability.",
  },
  {
    icon: Workflow,
    title: "Arquitetura de Dados",
    description: "Data Mesh, Medallion Architecture, Data Contracts e Semantic Layer.",
  },
  {
    icon: FlaskConical,
    title: "Experimentação",
    description: "Design de experimentos A/B, Bayesian optimization e uplift modeling.",
  },
];

// Aplicações por área
const applications = [
  { area: "Previsão", examples: ["Demanda", "Churn", "Revenue", "Estoque"] },
  { area: "Classificação", examples: ["Fraude", "Credit Scoring", "Documentos", "Sentimento"] },
  { area: "Personalização", examples: ["Recomendação", "Pricing", "Next Best Action", "Segmentação"] },
  { area: "Operações", examples: ["Rotas", "Manutenção Preditiva", "Workforce", "Recursos"] },
];

// Diferenciais
const differentials = [
  { icon: Lightbulb, title: "Rigor Científico", description: "Metodologia científica com experimentos controlados e validação estatística." },
  { icon: Target, title: "Produção-Ready", description: "Entregamos soluções em produção com APIs, monitoramento e pipelines automatizados." },
  { icon: Sparkles, title: "Business-First", description: "Métricas de negócio guiam todo desenvolvimento. ROI calculado desde o início." },
  { icon: Shield, title: "Governança", description: "Modelos documentados, auditáveis e explicáveis. LGPD e fairness compliance." },
];

export default function DataScience() {
  return (
    <Layout>
      {/* Hero Section - Estilo Executivo */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        
        {/* Orbs sutis */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/consultoria" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Brain className="w-4 h-4 text-primary" />
                Consultoria
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">Data Science & Machine Learning</span>
              </Link>
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className="text-foreground">Ciência de Dados &</span>
              <br />
              <span className="gradient-text-purple">Machine Learning</span>
            </motion.h1>

            {/* Descrição */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Transformamos dados em vantagem competitiva com modelos de ML em produção, 
              arquiteturas de dados modernas e IA generativa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="gradient-primary text-white px-8" asChild>
                <Link to="/contato">
                  Iniciar Projeto de ML
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10" asChild>
                <Link to="/contato">Falar com Especialista</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text-purple">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serviços Principais */}
      <section className="py-24 bg-muted/5">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Expertise Técnica
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Soluções de <span className="gradient-text-purple">Data Science</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Domínio completo do ciclo de vida de projetos, da engenharia de dados aos modelos em produção.
            </p>
          </motion.div>

          {/* Grid de Serviços */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 hover-lift group"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                    <p className="text-sm text-primary/80 font-medium">{service.subtitle}</p>
                    <p className="mt-3 text-muted-foreground">{service.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infraestrutura MLOps */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6">
              <Network className="w-4 h-4" />
              Infraestrutura
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Além do Modelo: <span className="gradient-text-purple">ML em Escala</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Não entregamos apenas modelos - construímos a infraestrutura completa para ML empresarial.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {infrastructure.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 text-center hover-lift"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aplicações - Compacto */}
      <section className="py-24 bg-muted/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6">
              <Target className="w-4 h-4" />
              Aplicações
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Áreas de <span className="gradient-text-purple">Atuação</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-bold text-primary mb-4">{app.area}</h3>
                <ul className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Por que Nós
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nossos <span className="gradient-text-purple">Diferenciais</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <diff.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-foreground">{diff.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{diff.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6">
                <Zap className="w-4 h-4" />
                Pronto para transformar dados em resultados?
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Vamos construir sua{" "}
                <span className="gradient-text-purple">infraestrutura de ML</span>
              </h2>
              
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossa equipe de cientistas de dados e engenheiros de ML está pronta 
                para transformar seus dados em modelos que geram valor real.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-primary text-white px-8" asChild>
                  <Link to="/contato">
                    Agendar Discovery Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10" asChild>
                  <Link to="/consultoria">Explorar Outras Áreas</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
