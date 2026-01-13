import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Brain, Database, LineChart, Cpu, Code2, 
  Layers, GitBranch, ChevronRight, CheckCircle2, BarChart3,
  Sparkles, Target, Zap, Users, Award, TrendingUp, Cog,
  Shield, FileText, BookOpen, Lightbulb, Network, Binary,
  Workflow, FlaskConical, Gauge, Eye, AlertCircle, Timer
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const coreCapabilities = [
  {
    icon: Database,
    title: "Engenharia de Dados",
    description: "Arquiteturas de dados modernas e escaláveis que formam a fundação para análises avançadas e modelos de ML.",
    features: [
      "Data Lakes & Lakehouses com Delta Lake e Apache Iceberg",
      "Pipelines ETL/ELT com Apache Airflow, dbt e Prefect",
      "Streaming em tempo real com Kafka e Apache Flink",
      "Data Quality frameworks com Great Expectations",
      "Orquestração e observabilidade de pipelines",
      "Modelagem dimensional e Data Vault 2.0"
    ],
    technologies: ["Snowflake", "Databricks", "BigQuery", "Redshift", "dbt", "Airflow"]
  },
  {
    icon: Brain,
    title: "Machine Learning & Deep Learning",
    description: "Desenvolvimento de modelos preditivos, classificatórios e sistemas de recomendação com técnicas state-of-the-art.",
    features: [
      "Modelos supervisionados: XGBoost, LightGBM, CatBoost, Random Forest",
      "Deep Learning: CNNs, RNNs, Transformers, GANs",
      "NLP avançado: BERT, GPT fine-tuning, Embeddings semânticos",
      "Computer Vision: detecção, segmentação, OCR",
      "Sistemas de recomendação híbridos",
      "AutoML e otimização de hiperparâmetros"
    ],
    technologies: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "MLflow"]
  },
  {
    icon: Cpu,
    title: "IA Generativa & LLMs",
    description: "Implementação de soluções com Large Language Models para automação inteligente e geração de conteúdo.",
    features: [
      "Chatbots empresariais com RAG (Retrieval Augmented Generation)",
      "Fine-tuning de modelos para domínios específicos",
      "Sistemas de busca semântica com embeddings vetoriais",
      "Agentes autônomos com LangChain e LlamaIndex",
      "Geração de documentos e relatórios automatizados",
      "Extração estruturada de informações (NER, IE)"
    ],
    technologies: ["OpenAI", "Claude", "Llama", "Pinecone", "Weaviate", "LangChain"]
  },
  {
    icon: LineChart,
    title: "Análise Exploratória & Estatística",
    description: "Investigação rigorosa de dados para descoberta de padrões, correlações e insights acionáveis.",
    features: [
      "Análise estatística descritiva e inferencial",
      "Testes de hipóteses e intervalos de confiança",
      "Análise de séries temporais e sazonalidade",
      "Segmentação e clusterização (K-means, DBSCAN, hierárquico)",
      "Análise de coortes e lifetime value",
      "Causal inference e experimentos A/B"
    ],
    technologies: ["Python", "R", "Pandas", "NumPy", "SciPy", "Statsmodels"]
  },
];

const advancedServices = [
  {
    icon: Network,
    title: "MLOps & Model Governance",
    description: "Infraestrutura completa para deploy, monitoramento e governança de modelos em produção.",
    items: [
      "CI/CD para modelos de ML com MLflow e Kubeflow",
      "Feature Stores (Feast, Tecton) para reutilização",
      "Model Registry e versionamento",
      "A/B testing e canary deployments",
      "Monitoramento de drift e performance",
      "Explainability (SHAP, LIME) e fairness"
    ]
  },
  {
    icon: Workflow,
    title: "Arquitetura de Dados Moderna",
    description: "Design de arquiteturas robustas seguindo as melhores práticas da indústria.",
    items: [
      "Data Mesh e domínios descentralizados",
      "Medallion Architecture (Bronze/Silver/Gold)",
      "Event-driven architecture com CDC",
      "Data Contracts e Schema Registry",
      "Semantic Layer com dbt Semantic Layer ou Cube",
      "Data Catalog e descoberta de dados"
    ]
  },
  {
    icon: FlaskConical,
    title: "Experimentação & Otimização",
    description: "Frameworks de experimentação para validação científica de hipóteses de negócio.",
    items: [
      "Design de experimentos (A/B, multi-variado)",
      "Bayesian optimization para parâmetros",
      "Multi-armed bandits para alocação dinâmica",
      "Uplift modeling para impacto causal",
      "Sample size calculation e power analysis",
      "Sequential testing para decisões rápidas"
    ]
  },
];

const applications = [
  {
    category: "Previsão & Forecasting",
    icon: TrendingUp,
    color: "purple",
    examples: ["Previsão de Demanda", "Churn Prediction", "Revenue Forecasting", "Planejamento de Estoque"]
  },
  {
    category: "Classificação & Detecção",
    icon: Shield,
    color: "emerald",
    examples: ["Detecção de Fraude", "Credit Scoring", "Classificação de Documentos", "Análise de Sentimento"]
  },
  {
    category: "Personalização & Recomendação",
    icon: Users,
    color: "rose",
    examples: ["Sistemas de Recomendação", "Personalização de Preços", "Next Best Action", "Segmentação Avançada"]
  },
  {
    category: "Otimização & Operações",
    icon: Cog,
    color: "amber",
    examples: ["Otimização de Rotas", "Manutenção Preditiva", "Workforce Optimization", "Alocação de Recursos"]
  },
];

const methodology = [
  {
    phase: "01",
    title: "Discovery & Scoping",
    duration: "1-2 semanas",
    description: "Entendimento profundo do problema de negócio e dados disponíveis.",
    deliverables: [
      "Problem Statement documentado",
      "Data Assessment Report",
      "Success Metrics definidas",
      "Project Charter e timeline"
    ],
    activities: [
      "Entrevistas com stakeholders",
      "Análise de fontes de dados",
      "Benchmark de soluções",
      "Definição de MVP"
    ]
  },
  {
    phase: "02",
    title: "Data Engineering",
    duration: "2-4 semanas",
    description: "Preparação e transformação de dados para análise e modelagem.",
    deliverables: [
      "Pipelines de ingestão",
      "Feature Store estruturado",
      "Documentação de dados",
      "Quality Gates implementados"
    ],
    activities: [
      "ETL/ELT development",
      "Feature engineering",
      "Data profiling",
      "Validação de qualidade"
    ]
  },
  {
    phase: "03",
    title: "Experimentação & Modeling",
    duration: "3-6 semanas",
    description: "Desenvolvimento iterativo de modelos com rigor científico.",
    deliverables: [
      "Experimentos documentados",
      "Modelo campeão validado",
      "Análise de erros",
      "Interpretabilidade report"
    ],
    activities: [
      "Baseline establishment",
      "Feature selection",
      "Hyperparameter tuning",
      "Cross-validation rigorosa"
    ]
  },
  {
    phase: "04",
    title: "Productionization",
    duration: "2-4 semanas",
    description: "Deploy do modelo em produção com infraestrutura robusta.",
    deliverables: [
      "API de scoring",
      "Pipeline de inferência",
      "Dashboards de monitoring",
      "Runbook operacional"
    ],
    activities: [
      "Containerização",
      "Integração com sistemas",
      "Testes de carga",
      "Setup de alertas"
    ]
  },
  {
    phase: "05",
    title: "Monitoring & Iteration",
    duration: "Contínuo",
    description: "Monitoramento contínuo e evolução baseada em performance real.",
    deliverables: [
      "Reports de performance",
      "Análises de drift",
      "Retraining pipelines",
      "Roadmap de melhorias"
    ],
    activities: [
      "Tracking de métricas",
      "Detecção de drift",
      "Champion/challenger",
      "Feedback loops"
    ]
  },
];

const techStack = [
  { category: "Languages", items: ["Python", "R", "SQL", "Scala"] },
  { category: "ML/DL Frameworks", items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM"] },
  { category: "Data Engineering", items: ["Spark", "dbt", "Airflow", "Kafka", "Flink"] },
  { category: "MLOps", items: ["MLflow", "Kubeflow", "Feast", "Great Expectations", "Evidently"] },
  { category: "Cloud & Infra", items: ["AWS SageMaker", "GCP Vertex AI", "Azure ML", "Databricks", "Snowflake"] },
  { category: "LLM & GenAI", items: ["LangChain", "LlamaIndex", "Pinecone", "Weaviate", "Hugging Face"] },
];

const differentials = [
  {
    icon: BookOpen,
    title: "Rigor Científico",
    description: "Aplicamos metodologia científica rigorosa: hipóteses claras, experimentos controlados, validação estatística e documentação completa de todos os experimentos."
  },
  {
    icon: Cog,
    title: "Produção-Ready",
    description: "Não entregamos notebooks - entregamos soluções em produção com APIs, monitoramento, alertas e pipelines de retraining automatizados."
  },
  {
    icon: Lightbulb,
    title: "Business-First",
    description: "Métricas de negócio guiam todo o desenvolvimento. ROI é calculado desde o início e validado com experimentos controlados."
  },
  {
    icon: Shield,
    title: "Governança & Compliance",
    description: "Modelos documentados, auditáveis e explicáveis. Atendemos requisitos de LGPD, regulatórios financeiros e padrões de fairness."
  },
];

const stats = [
  { value: "150+", label: "Modelos em Produção", description: "Servindo milhões de predições/dia" },
  { value: "98.5%", label: "SLA de Uptime", description: "Em ambientes críticos de produção" },
  { value: "R$ 500M+", label: "Valor Gerado", description: "Em receita adicional e economia" },
  { value: "< 50ms", label: "Latência Média", description: "Para inferência em tempo real" },
];

export default function DataScience() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl" />
        </div>

        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <pattern id="neural-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="rgba(139,92,246,0.3)" />
              <line x1="30" y1="30" x2="60" y2="30" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" />
              <line x1="30" y1="30" x2="45" y2="60" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#neural-pattern)" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
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
                Data Science & Machine Learning
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Ciência de Dados &</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Machine Learning
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Transformamos dados em vantagem competitiva com modelos de ML em produção, 
              arquiteturas de dados modernas e IA generativa. Do data lake ao modelo em produção 
              servindo milhões de predições.
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
                  Iniciar Projeto de ML
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-lg"
                asChild
              >
                <Link to="/contato">Falar com Especialista</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Competências Core"
            title="Expertise Técnica"
            titleHighlight="Profunda"
            description="Domínio completo do ciclo de vida de projetos de Data Science, desde a engenharia de dados até modelos em produção."
          />

          <div className="mt-16 space-y-8">
            {coreCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 md:p-10"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4">
                      <capability.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{capability.title}</h3>
                    <p className="mt-3 text-muted-foreground">{capability.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {capability.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-3">
                      {capability.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Serviços Avançados"
            title="Além do Modelo:"
            titleHighlight="Infraestrutura de ML"
            description="Não entregamos apenas modelos - construímos a infraestrutura completa para ML em escala empresarial."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {advancedServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift"
              >
                <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* Applications Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Aplicações"
            title="Áreas de"
            titleHighlight="Aplicação"
            description="Soluções de Data Science e ML para diferentes domínios de negócio."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{category.category}</h3>
                <ul className="mt-4 space-y-2">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Processo"
            titleHighlight="End-to-End"
            description="Uma metodologia rigorosa e iterativa que garante entrega de valor desde o primeiro sprint."
          />

          <div className="mt-16 space-y-6">
            {methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 md:p-8"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center">
                        <span className="text-xl font-bold text-purple-400">{phase.phase}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{phase.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Timer className="w-4 h-4" />
                          {phase.duration}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  
                  <div className="lg:w-3/4 grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-purple-400 mb-3">Atividades</h5>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-purple-400 mb-3">Entregáveis</h5>
                      <ul className="space-y-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-purple-400" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Tecnologias"
            title="Stack"
            titleHighlight="Moderno"
            description="Utilizamos as ferramentas mais avançadas e adotadas pela indústria."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6"
              >
                <h4 className="text-sm font-semibold text-purple-400 mb-4">{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-muted/50 text-foreground text-sm font-medium border border-border/50">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Por que Nós"
            title="Nossos"
            titleHighlight="Diferenciais"
            description="O que nos diferencia de outras consultorias de Data Science."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <diff.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h4 className="font-bold text-foreground">{diff.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{diff.description}</p>
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
                Pronto para transformar dados em resultados?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vamos construir sua{" "}
                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  infraestrutura de ML
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Nossa equipe de cientistas de dados e engenheiros de ML está pronta 
                para transformar seus dados em modelos em produção que geram valor real.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Discovery Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50"
                  asChild
                >
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
