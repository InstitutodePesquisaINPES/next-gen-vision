import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Brain, Database, LineChart, Cpu, 
  ChevronRight, CheckCircle2, Sparkles, Target, 
  Zap, Shield, Lightbulb, Network, Workflow, FlaskConical,
  BarChart3, TrendingUp, Layers, GitBranch, Award,
  Clock, Server, Cloud, Lock, FileText, Users,
  Code, Binary, Activity, Gauge, Building2, Globe,
  BookOpen, GraduationCap, Rocket, Eye, Terminal
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

// Stats - números de impacto expandidos
const heroStats = [
  { value: "MLOps", label: "Modelos em Produção", description: "Servindo predições em tempo real" },
  { value: "99%+", label: "SLA de Uptime", description: "Em ambientes de produção" },
  { value: "< 50ms", label: "Latência Média", description: "Inferência em tempo real" },
];

// Credenciais expandidas
const credentials = [
  { icon: Award, label: "Equipe Especializada", description: "Em Estatística, Computação e Matemática" },
  { icon: GraduationCap, label: "Base Científica", description: "Metodologia rigorosa e reprodutível" },
];

// Serviços principais expandidos
const services = [
  {
    icon: Database,
    title: "Engenharia de Dados",
    subtitle: "Arquiteturas Modernas e Escaláveis",
    description: "Construímos a fundação de dados que sua empresa precisa para escalar analytics e machine learning de forma sustentável e governada.",
    capabilities: [
      "Data Lakes e Lakehouses com Delta Lake e Iceberg",
      "Pipelines de ingestão batch e streaming em tempo real",
      "Data Quality automatizado com Great Expectations",
      "Orquestração de workflows com Airflow, Dagster e Prefect",
      "Change Data Capture (CDC) para sincronização",
      "Feature Stores para reutilização de features de ML"
    ],
    technologies: ["Snowflake", "Databricks", "dbt", "Airflow", "Kafka", "Spark"],
    outcomes: ["Redução de 70% no tempo de preparação de dados", "99.9% de disponibilidade de pipelines"]
  },
  {
    icon: Brain,
    title: "Machine Learning",
    subtitle: "Modelos Preditivos e Deep Learning",
    description: "Desenvolvemos modelos de machine learning que vão além do experimento: produção, monitoramento e evolução contínua são nossa especialidade.",
    capabilities: [
      "Modelos supervisionados para classificação e regressão",
      "Deep Learning para visão computacional e NLP",
      "Sistemas de recomendação personalizados",
      "Detecção de anomalias e fraudes em tempo real",
      "Séries temporais e forecasting avançado",
      "AutoML e otimização de hiperparâmetros"
    ],
    technologies: ["PyTorch", "TensorFlow", "XGBoost", "Scikit-learn", "Hugging Face", "Optuna"],
    outcomes: ["Modelos com AUC > 0.90 em produção", "Redução de 40% em fraudes detectadas"]
  },
  {
    icon: Cpu,
    title: "IA Generativa",
    subtitle: "Automação Inteligente com LLMs",
    description: "Implementamos soluções de IA generativa que vão muito além de chatbots: automação de processos, geração de conteúdo e busca semântica empresarial.",
    capabilities: [
      "Assistentes empresariais com RAG (Retrieval-Augmented Generation)",
      "Agentes autônomos para automação de workflows",
      "Busca semântica vetorial em documentos corporativos",
      "Geração e sumarização de conteúdo automatizada",
      "Fine-tuning de modelos para domínios específicos",
      "Guardrails e safety para uso empresarial"
    ],
    technologies: ["OpenAI", "Claude", "LangChain", "Pinecone", "Weaviate", "LlamaIndex"],
    outcomes: ["Redução de 60% em tempo de análise documental", "Atendimento 24/7 automatizado"]
  },
  {
    icon: LineChart,
    title: "Análise Estatística Avançada",
    subtitle: "Insights Acionáveis com Rigor Científico",
    description: "Aplicamos metodologias estatísticas rigorosas para responder às perguntas mais complexas do seu negócio com confiança e precisão.",
    capabilities: [
      "Design e análise de experimentos A/B com poder estatístico",
      "Inferência causal com métodos quasi-experimentais",
      "Análise de séries temporais e sazonalidade",
      "Modelagem bayesiana para incerteza",
      "Segmentação avançada com clustering",
      "Análise de sobrevivência e lifetime value"
    ],
    technologies: ["Python", "R", "Stan", "PyMC", "SciPy", "Statsmodels"],
    outcomes: ["Decisões baseadas em evidência causal", "Experimentos 3x mais eficientes"]
  },
];

// MLOps e Infraestrutura expandida
const mlopsCapabilities = [
  {
    icon: GitBranch,
    title: "Versionamento de Modelos",
    description: "Rastreabilidade completa de experimentos, datasets, features e modelos com MLflow, DVC e Weights & Biases.",
    features: ["Experimentos reprodutíveis", "Lineage de dados", "Comparação de runs", "Rollback instantâneo"]
  },
  {
    icon: Server,
    title: "Deployment e Serving",
    description: "Deploy de modelos em produção com alta disponibilidade, baixa latência e escala automática.",
    features: ["APIs REST e gRPC", "Batch inference", "A/B testing de modelos", "Shadow deployment"]
  },
  {
    icon: Activity,
    title: "Monitoramento em Produção",
    description: "Observabilidade completa de modelos em produção: drift detection, performance e explicabilidade.",
    features: ["Data drift detection", "Model performance", "Feature importance", "Alertas automatizados"]
  },
  {
    icon: Shield,
    title: "Governança e Compliance",
    description: "Modelos documentados, auditáveis e explicáveis para conformidade com LGPD e regulamentações.",
    features: ["Model cards", "Audit trails", "Explicabilidade (SHAP, LIME)", "Bias detection"]
  },
  {
    icon: Cloud,
    title: "Infraestrutura Cloud",
    description: "Arquiteturas cloud-native otimizadas para workloads de ML em escala.",
    features: ["Multi-cloud (AWS, GCP, Azure)", "Kubernetes para ML", "GPU optimization", "Cost management"]
  },
  {
    icon: Lock,
    title: "Segurança de Dados",
    description: "Proteção de dados sensíveis em todo o ciclo de vida de ML.",
    features: ["Encryption at rest/transit", "Access control", "Data masking", "Federated learning"]
  },
];

// Casos de uso por área
const useCases = [
  {
    category: "Previsão e Forecasting",
    icon: TrendingUp,
    examples: [
      { name: "Demanda", description: "Previsão de vendas para otimização de estoque" },
      { name: "Churn", description: "Identificação antecipada de clientes em risco" },
      { name: "Receita", description: "Projeção de receita para planejamento financeiro" },
      { name: "Manutenção", description: "Predição de falhas em equipamentos" },
    ]
  },
  {
    category: "Classificação e Scoring",
    icon: Target,
    examples: [
      { name: "Fraude", description: "Detecção de transações fraudulentas em tempo real" },
      { name: "Crédito", description: "Análise de risco e propensão a inadimplência" },
      { name: "Lead Scoring", description: "Priorização de oportunidades comerciais" },
      { name: "Sentimento", description: "Análise de opinião em texto e redes sociais" },
    ]
  },
  {
    category: "Personalização",
    icon: Users,
    examples: [
      { name: "Recomendação", description: "Produtos, conteúdo e ofertas personalizadas" },
      { name: "Dynamic Pricing", description: "Precificação otimizada por contexto" },
      { name: "Next Best Action", description: "Próxima melhor ação para cada cliente" },
      { name: "Segmentação", description: "Clusters dinâmicos de comportamento" },
    ]
  },
  {
    category: "Operações e Otimização",
    icon: Gauge,
    examples: [
      { name: "Rotas", description: "Otimização logística e roteirização" },
      { name: "Alocação", description: "Distribuição ótima de recursos e equipes" },
      { name: "Scheduling", description: "Agendamento inteligente de operações" },
      { name: "Quality Control", description: "Inspeção visual automatizada" },
    ]
  },
];

// Tecnologias por camada
const techStack = [
  {
    layer: "Ingestão de Dados",
    technologies: ["Apache Kafka", "AWS Kinesis", "Airbyte", "Fivetran", "Debezium"]
  },
  {
    layer: "Processamento",
    technologies: ["Apache Spark", "Databricks", "dbt", "Pandas", "Polars"]
  },
  {
    layer: "Armazenamento",
    technologies: ["Snowflake", "BigQuery", "Redshift", "Delta Lake", "S3/GCS"]
  },
  {
    layer: "Machine Learning",
    technologies: ["PyTorch", "TensorFlow", "XGBoost", "Scikit-learn", "Hugging Face"]
  },
  {
    layer: "MLOps",
    technologies: ["MLflow", "Kubeflow", "Weights & Biases", "DVC", "Feast"]
  },
  {
    layer: "LLMs & GenAI",
    technologies: ["OpenAI", "Anthropic", "LangChain", "Pinecone", "Weaviate"]
  },
];

// Metodologia de trabalho
const methodology = [
  {
    phase: "01",
    name: "Discovery",
    title: "Descoberta e Escopo",
    duration: "1-2 semanas",
    description: "Entendimento profundo do problema de negócio, dados disponíveis e definição clara de sucesso.",
    activities: [
      "Workshops de alinhamento com stakeholders",
      "Inventário e assessment de dados",
      "Definição de KPIs e métricas de sucesso",
      "Análise de viabilidade técnica e ROI"
    ],
    outputs: ["Documento de escopo", "Backlog priorizado", "Estimativa de valor"]
  },
  {
    phase: "02",
    name: "Exploration",
    title: "Exploração e Prototipagem",
    duration: "2-4 semanas",
    description: "Análise exploratória, feature engineering e desenvolvimento de protótipos para validação rápida.",
    activities: [
      "Análise exploratória de dados (EDA)",
      "Engenharia de features",
      "Experimentos com múltiplos algoritmos",
      "Baseline e benchmarks"
    ],
    outputs: ["Notebooks de análise", "Feature store inicial", "Modelo baseline"]
  },
  {
    phase: "03",
    name: "Development",
    title: "Desenvolvimento e Otimização",
    duration: "4-8 semanas",
    description: "Desenvolvimento do modelo final com otimização de hiperparâmetros e validação rigorosa.",
    activities: [
      "Seleção e otimização de modelo",
      "Cross-validation e backtesting",
      "Análise de explicabilidade",
      "Testes de robustez e edge cases"
    ],
    outputs: ["Modelo otimizado", "Documentação técnica", "Model card"]
  },
  {
    phase: "04",
    name: "Production",
    title: "Produtização e Deploy",
    duration: "2-4 semanas",
    description: "Deploy do modelo em produção com infraestrutura de serving, monitoramento e CI/CD.",
    activities: [
      "Containerização e APIs",
      "Setup de infraestrutura de serving",
      "Pipelines de CI/CD para ML",
      "Integração com sistemas existentes"
    ],
    outputs: ["Modelo em produção", "APIs documentadas", "Runbooks operacionais"]
  },
  {
    phase: "05",
    name: "Operations",
    title: "Operação e Evolução",
    duration: "Contínuo",
    description: "Monitoramento contínuo, retraining automatizado e evolução baseada em feedback do negócio.",
    activities: [
      "Monitoramento de drift e performance",
      "Retraining automatizado",
      "Análise de feedback loops",
      "Iterações de melhoria"
    ],
    outputs: ["Dashboards de monitoramento", "Alertas configurados", "Roadmap de evolução"]
  },
];

// Diferenciais expandidos
const differentials = [
  {
    icon: FlaskConical,
    title: "Rigor Científico",
    description: "Cada projeto segue metodologia científica rigorosa. Experimentos controlados, validação estatística e documentação completa garantem resultados confiáveis e reprodutíveis.",
    highlights: ["Validação estatística", "Experimentos controlados", "Peer review interno"]
  },
  {
    icon: Rocket,
    title: "Production-Ready",
    description: "Não entregamos apenas notebooks: entregamos modelos em produção com APIs, monitoramento, CI/CD e documentação operacional completa.",
    highlights: ["APIs em produção", "Monitoramento 24/7", "CI/CD para ML"]
  },
  {
    icon: Target,
    title: "Foco em Negócio",
    description: "Métricas de negócio guiam todo desenvolvimento. ROI calculado desde o início. Cada modelo é desenvolvido para gerar valor mensurável.",
    highlights: ["ROI desde o início", "Métricas de negócio", "Valor mensurável"]
  },
  {
    icon: Shield,
    title: "Governança & Compliance",
    description: "Modelos documentados, auditáveis e explicáveis. Conformidade com LGPD e regulamentações setoriais. Bias detection e fairness analysis.",
    highlights: ["LGPD compliance", "Explicabilidade", "Audit trails"]
  },
  {
    icon: Users,
    title: "Transferência de Conhecimento",
    description: "Não criamos dependência: treinamos sua equipe, documentamos tudo e garantimos que você possa operar e evoluir as soluções internamente.",
    highlights: ["Treinamento de equipe", "Documentação completa", "Handover estruturado"]
  },
  {
    icon: Zap,
    title: "Time-to-Value",
    description: "Metodologia ágil com entregas incrementais. MVP em semanas, não meses. Quick wins identificados e priorizados desde o início.",
    highlights: ["MVP em semanas", "Entregas incrementais", "Quick wins"]
  },
];

// Exemplos de aplicação (sem resultados fabricados)
const applicationExamples = [
  {
    industry: "E-commerce",
    title: "Sistema de Recomendação Personalizado",
    description: "Motor de recomendação em tempo real com deep learning para personalização de ofertas.",
  },
  {
    industry: "Financeiro",
    title: "Detecção de Fraude em Tempo Real",
    description: "Modelo de detecção com baixa latência e alta precisão.",
  },
  {
    industry: "Varejo",
    title: "Previsão de Demanda Multi-SKU",
    description: "Forecasting hierárquico para milhares de SKUs com atualização automatizada.",
  },
  {
    industry: "Saúde",
    title: "Triagem Automatizada com IA",
    description: "Modelo de classificação de prioridade com explicabilidade para auditoria.",
  },
];

export default function DataScience() {
  return (
    <Layout>
      {/* Hero Section - Estilo Executivo Impactante */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        
        {/* Orbs e padrões visuais */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
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

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-foreground">Ciência de Dados &</span>
              <br />
              <span className="gradient-text-purple">Machine Learning</span>
            </motion.h1>

            {/* Descrição expandida */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Transformamos dados em vantagem competitiva com modelos de ML em produção, 
              arquiteturas de dados modernas e IA generativa. Da prototipagem à operação, 
              entregamos soluções que geram valor mensurável para o seu negócio.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="gradient-primary text-white px-8 text-lg" asChild>
                <Link to="/contato">
                  Iniciar Projeto de ML
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 text-lg" asChild>
                <Link to="/contato">Agendar Discovery</Link>
              </Button>
            </motion.div>

            {/* Stats em destaque */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="glass-card p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text-purple">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credenciais da Equipe */}
      <section className="py-12 bg-muted/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {credentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <cred.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{cred.label}</div>
                  <div className="text-sm text-muted-foreground">{cred.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços Principais - Expandido */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Expertise Técnica"
            title="Soluções Completas em"
            titleHighlight="Data Science"
            description="Domínio completo do ciclo de vida de projetos de dados, da engenharia à operação de modelos em escala."
          />

          <div className="mt-16 space-y-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 md:p-10"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Header do serviço */}
                  <div className="lg:w-1/3">
                    <div className="p-4 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                      <service.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="text-sm text-primary/80 font-medium mt-1">{service.subtitle}</p>
                    <p className="mt-4 text-muted-foreground">{service.description}</p>
                    
                    {/* Tecnologias */}
                    <div className="mt-6">
                      <h5 className="text-xs font-semibold text-primary mb-3">TECNOLOGIAS</h5>
                      <div className="flex flex-wrap gap-2">
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

                    {/* Outcomes */}
                    <div className="mt-6 space-y-2">
                      {service.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-foreground font-medium">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Capacidades */}
                  <div className="lg:w-2/3">
                    <h5 className="text-sm font-semibold text-primary mb-4">CAPACIDADES</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{capability}</span>
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

      {/* MLOps e Infraestrutura */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Infraestrutura"
            title="MLOps &"
            titleHighlight="Governança"
            description="Não entregamos apenas modelos — construímos a infraestrutura completa para IA empresarial em escala."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mlopsCapabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-4 space-y-2">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Aplicações"
            title="Casos de Uso por"
            titleHighlight="Categoria"
            description="Experiência comprovada em diversas aplicações de machine learning e analytics."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <useCase.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{useCase.category}</h3>
                </div>
                <div className="space-y-4">
                  {useCase.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{example.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Tecnologias"
            title="Stack Tecnológico"
            titleHighlight="Moderno"
            description="Utilizamos as melhores ferramentas do mercado para cada camada da arquitetura de dados."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="text-sm font-semibold text-primary mb-4">{layer.layer}</h4>
                <div className="flex flex-wrap gap-2">
                  {layer.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 rounded-lg bg-muted/50 text-foreground text-sm font-medium border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodologia de Trabalho */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodologia"
            title="Como"
            titleHighlight="Trabalhamos"
            description="Processo estruturado e iterativo para garantir resultados consistentes e valor incremental."
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
                  {/* Fase e título */}
                  <div className="lg:w-1/4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">{phase.phase}</span>
                      </div>
                      <div>
                        <div className="text-xs text-primary font-semibold">{phase.name}</div>
                        <h4 className="text-lg font-bold text-foreground">{phase.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {phase.duration}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  
                  {/* Atividades e Outputs */}
                  <div className="lg:w-3/4 grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-3">Atividades</h5>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-primary mb-3">Outputs</h5>
                      <ul className="space-y-2">
                        {phase.outputs.map((output, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="w-4 h-4 text-primary" />
                            {output}
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

      {/* Exemplos de Aplicação */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Aplicações"
            title="Exemplos de"
            titleHighlight="Aplicação"
            description="Áreas onde aplicamos ciência de dados e machine learning."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationExamples.map((caseItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {caseItem.industry}
                </span>
                <h4 className="mt-4 font-bold text-foreground">{caseItem.title}</h4>
                <p className="mt-3 text-sm text-muted-foreground">{caseItem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Expandidos */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Por que Nós"
            title="Nossos"
            titleHighlight="Diferenciais"
            description="O que nos diferencia de outras consultorias de data science."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentials.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                  <diff.icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{diff.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{diff.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {diff.highlights.map((highlight, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-md bg-muted/50 text-xs text-foreground">
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-b from-muted/20 to-background">
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
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Vamos construir sua{" "}
                <span className="gradient-text-purple">infraestrutura de ML</span>
              </h2>
              
              <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                Nossa equipe de cientistas de dados e engenheiros de ML está pronta 
                para transformar seus dados em modelos que geram valor real. 
                Agende uma conversa e descubra como podemos acelerar sua jornada de dados.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-primary text-white px-10 text-lg" asChild>
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
