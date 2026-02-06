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

const values = [
  {
    icon: Zap,
    title: "Inovação",
    description: "Buscamos constantemente as melhores tecnologias e metodologias para entregar soluções de ponta.",
  },
  {
    icon: Users,
    title: "Parceria",
    description: "Trabalhamos lado a lado com nossos clientes, construindo relacionamentos de longo prazo.",
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Comprometimento com a qualidade em cada linha de código e cada entrega.",
  },
  {
    icon: Heart,
    title: "Paixão",
    description: "Amamos o que fazemos e isso se reflete em cada projeto que desenvolvemos.",
  },
];

const timeline = [
  { year: "2016", title: "Fundação", description: "Início das operações com foco em desenvolvimento web e soluções PHP para pequenas e médias empresas.", icon: Building2 },
  { year: "2018", title: "Expansão para Dados", description: "Ampliação do portfólio para incluir análise de dados e Business Intelligence, atendendo demandas corporativas.", icon: BarChart3 },
  { year: "2020", title: "IA & Machine Learning", description: "Entrada no mercado de Machine Learning e IA aplicada, com projetos em saúde pública e gestão estratégica.", icon: Brain },
  { year: "2022", title: "Consolidação", description: "Mais de 100 projetos entregues, expansão da equipe multidisciplinar e parcerias com instituições de ensino.", icon: Code2 },
  { year: "2024", title: "Plataforma Completa", description: "Lançamento de soluções SaaS próprias e consolidação como referência em sistemas inteligentes e ciência de dados.", icon: Lightbulb },
];

const differentials = [
  {
    icon: Brain,
    title: "Equipe com DNA Científico",
    description: "Nossa equipe une formação acadêmica rigorosa (mestrados e doutorados) com experiência prática de mercado.",
  },
  {
    icon: Shield,
    title: "Metodologia Proprietária",
    description: "Processo estruturado em 5 fases — Discovery, Exploration, Development, Production e Operations — garantindo entregas previsíveis.",
  },
  {
    icon: BarChart3,
    title: "Foco em Resultados Mensuráveis",
    description: "Cada projeto é orientado por KPIs claros, com dashboards de acompanhamento em tempo real para o cliente.",
  },
];

const faqItems = [
  {
    question: "Quais tipos de projetos a Vixio atende?",
    answer: "Atendemos desde startups que precisam de MVPs até grandes corporações com demandas complexas de ciência de dados, automação com IA, Business Intelligence, sistemas de gestão e plataformas SaaS. Nossos projetos mais comuns incluem dashboards analíticos, sistemas de atendimento inteligente, análises preditivas e consultoria em dados.",
  },
  {
    question: "Qual é o prazo médio de entrega de um projeto?",
    answer: "Projetos menores (dashboards, automações) levam de 2 a 4 semanas. Projetos de médio porte (sistemas de gestão, plataformas web) de 1 a 3 meses. Projetos complexos (ciência de dados, IA aplicada, SaaS) de 3 a 6 meses. Após a fase de Discovery, fornecemos um cronograma detalhado com marcos de entrega.",
  },
  {
    question: "Como funciona o processo de contratação?",
    answer: "Iniciamos com uma reunião de diagnóstico gratuita para entender suas necessidades. Em seguida, elaboramos uma proposta técnica detalhada com escopo, cronograma e investimento. Após aprovação, o projeto segue nosso processo estruturado em 5 fases com checkpoints de validação em cada etapa.",
  },
  {
    question: "A Vixio oferece suporte após a entrega?",
    answer: "Sim. Todos os projetos incluem um período de suporte pós-entrega (geralmente 30 a 90 dias). Além disso, oferecemos planos de manutenção contínua com SLA definido, atualizações de segurança e evolução do sistema conforme novas necessidades surgirem.",
  },
  {
    question: "Vocês trabalham com dados sensíveis? Como garantem a segurança?",
    answer: "Trabalhamos com dados de saúde, financeiros e corporativos. Seguimos práticas de segurança como criptografia em trânsito e em repouso, controle de acesso baseado em papéis (RBAC), ambientes isolados e conformidade com LGPD. Nosso fundador tem experiência em comitês de ética em pesquisa.",
  },
  {
    question: "Qual é o investimento mínimo para um projeto?",
    answer: "O investimento varia conforme complexidade e escopo. Projetos de consultoria pontual iniciam a partir de R$ 5.000. Sistemas e plataformas customizadas a partir de R$ 15.000. Oferecemos condições de pagamento flexíveis, com possibilidade de parcelamento vinculado às entregas do projeto.",
  },
  {
    question: "Vocês atendem empresas fora de Vitória da Conquista?",
    answer: "Sim. Atendemos clientes em todo o Brasil de forma remota, com reuniões por videoconferência e ferramentas de gestão de projetos online. Para projetos que exigem presença física, avaliamos caso a caso.",
  },
  {
    question: "Posso acompanhar o andamento do projeto em tempo real?",
    answer: "Sim. Cada cliente recebe acesso ao nosso painel de acompanhamento de projetos com visibilidade sobre fases, entregas, prazos e indicadores de progresso. Além disso, realizamos reuniões periódicas de alinhamento.",
  },
];

const FAQItem = ({ item, index }: { item: typeof faqItems[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-border/50 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/30 transition-colors"
      >
        <span className="text-foreground font-medium pr-4">{item.question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Sobre = () => {
  useSEO({
    title: "Sobre a Vixio",
    description: "Conheça a Vixio: empresa de tecnologia especializada em sistemas inteligentes e ciência de dados desde 2016.",
  });
  return (
    <Layout>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              Sobre a Vixio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Transformando o futuro com{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                tecnologia
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Somos uma empresa de tecnologia especializada em sistemas inteligentes 
              e ciência de dados, dedicada a transformar desafios complexos em soluções inovadoras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossa História — sem foto do fundador, com timeline visual */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A Vixio nasceu da paixão por transformar dados em soluções que geram 
                  valor real para as empresas. Fundada por profissionais com vasta experiência 
                  em pesquisa científica, desenvolvimento de software e gestão estratégica.
                </p>
                <p>
                  Ao longo dos anos, evoluímos de uma consultoria de desenvolvimento 
                  para uma empresa completa de tecnologia, atendendo desde startups 
                  até organizações públicas em suas jornadas de transformação digital.
                </p>
                <p>
                  Hoje, combinamos rigor acadêmico com agilidade de mercado para entregar 
                  sistemas inteligentes que geram impacto mensurável.
                </p>
              </div>
              <Link 
                to="/fundador" 
                className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline"
              >
                Conheça nosso Fundador
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Mini timeline visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-14 pb-8 last:pb-0"
                >
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                  <h3 className="text-base font-semibold text-foreground mt-0.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diferenciais — substituindo "prova social" genérica */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Por que a Vixio"
            title="Nossos Diferenciais"
            description="O que nos torna a escolha certa para projetos de tecnologia e dados."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {differentials.map((diff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 hover-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <diff.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{diff.title}</h3>
                <p className="text-muted-foreground">{diff.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Missão</h3>
              <p className="text-muted-foreground">
                Transformar dados em decisões estratégicas através de sistemas inteligentes 
                e soluções tecnológicas inovadoras, impulsionando o crescimento sustentável 
                de nossos clientes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Visão</h3>
              <p className="text-muted-foreground">
                Ser reconhecida como a principal referência em sistemas inteligentes 
                e ciência de dados no Brasil, liderando a transformação digital 
                com soluções que fazem a diferença.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Nossos Valores"
            title="O que nos move"
            description="Princípios que guiam cada decisão e cada linha de código que escrevemos."
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section — expandido */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            badge="Dúvidas Frequentes"
            title="Perguntas & Respostas"
            description="Tudo o que você precisa saber antes de começar um projeto conosco."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, index) => (
              <FAQItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
