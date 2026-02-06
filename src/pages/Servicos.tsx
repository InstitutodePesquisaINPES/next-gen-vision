import { motion } from "framer-motion";
import { 
  BarChart3, Code2, Database, Brain, Palette, GitBranch,
  CheckCircle2, ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "analise-dados",
    icon: BarChart3,
    title: "Análise de Dados & BI",
    description: "Transformamos seus dados brutos em insights acionáveis com dashboards interativos e relatórios automatizados.",
    features: [
      "Dashboards interativos e personalizados",
      "KPIs em tempo real",
      "Relatórios automatizados",
      "Visualização de dados avançada",
      "Integração com múltiplas fontes de dados",
    ],
    technologies: ["Power BI", "Tableau", "Python", "SQL"],
  },
  {
    id: "ml",
    icon: Brain,
    title: "Machine Learning & IA",
    description: "Desenvolvemos modelos preditivos e soluções de inteligência artificial que automatizam processos e otimizam resultados.",
    features: [
      "Modelos preditivos personalizados",
      "Processamento de Linguagem Natural (NLP)",
      "Visão Computacional",
      "Sistemas de recomendação",
      "Detecção de anomalias e fraudes",
    ],
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI"],
  },
  {
    id: "sistemas",
    icon: Code2,
    title: "Sistemas Inteligentes",
    description: "Criamos sistemas sob medida que integram IA e automação para resolver os desafios mais complexos do seu negócio.",
    features: [
      "APIs inteligentes e escaláveis",
      "Automação de processos (RPA)",
      "Integração de sistemas legados",
      "Microserviços e arquitetura moderna",
      "Sistemas de tomada de decisão",
    ],
    technologies: ["Python", "Node.js", "FastAPI", "Docker"],
  },
  {
    id: "engenharia-dados",
    icon: Database,
    title: "Engenharia de Dados",
    description: "Arquitetamos pipelines de dados robustos e escaláveis para suportar todas as suas operações de dados.",
    features: [
      "Pipelines ETL/ELT",
      "Data Warehousing",
      "Data Lakes",
      "Processamento em tempo real",
      "Governança de dados",
    ],
    technologies: ["Apache Spark", "Airflow", "AWS", "PostgreSQL"],
  },
  {
    id: "web",
    icon: Palette,
    title: "Desenvolvimento Web & UX",
    description: "Design de interfaces modernas e intuitivas que proporcionam experiências excepcionais aos usuários.",
    features: [
      "UI/UX Design centrado no usuário",
      "Desenvolvimento frontend moderno",
      "Aplicações web responsivas",
      "Design Systems",
      "Prototipagem e testes de usabilidade",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Figma"],
  },
  {
    id: "consultoria",
    icon: GitBranch,
    title: "Consultoria & Gestão",
    description: "Metodologias ágeis e consultoria estratégica para garantir entregas eficientes alinhadas aos seus objetivos.",
    features: [
      "Consultoria em transformação digital",
      "Metodologias ágeis (Scrum/Kanban)",
      "Roadmap estratégico de tecnologia",
      "Auditoria de sistemas",
      "Treinamentos técnicos",
    ],
    technologies: ["Jira", "Confluence", "Git", "CI/CD"],
  },
];

const Servicos = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              Nossos Serviços
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Soluções completas em{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                tecnologia
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Da análise à implementação, oferecemos expertise em todas as etapas 
              da transformação digital da sua empresa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-background">
        <div className="container-custom space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="gradient-primary text-primary-foreground" asChild>
                  <Link to="/contato">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="glass-card p-8">
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">
                    Tecnologias utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      Soluções personalizadas para cada cliente, com foco em resultados mensuráveis.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pronto para começar seu projeto?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Entre em contato e descubra como podemos ajudar sua empresa 
              a alcançar novos patamares com tecnologia.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground" asChild>
                <Link to="/contato">
                  Fale com um Especialista
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/portfolio">Ver Portfólio</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Servicos;
