import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye, Heart, Award, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import founderImage from "@/assets/founder.png";

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
  { year: "2016", title: "Fundação", description: "Início das operações focado em desenvolvimento web e PHP." },
  { year: "2018", title: "Expansão", description: "Ampliação para análise de dados e Business Intelligence." },
  { year: "2020", title: "IA & ML", description: "Entrada no mercado de Machine Learning e Inteligência Artificial." },
  { year: "2022", title: "Consolidação", description: "Mais de 100 projetos entregues e expansão da equipe." },
  { year: "2024", title: "Presente", description: "Referência em sistemas inteligentes e ciência de dados." },
];

const Sobre = () => {
  return (
    <Layout>
      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
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

      {/* Founder Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden glow-accent">
                <img
                  src={founderImage}
                  alt="Fundador Vixio"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-6 max-w-xs">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                  8+ Anos
                </div>
                <div className="text-sm text-muted-foreground">
                  de experiência em tecnologia
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
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
                  em desenvolvimento de software e ciência de dados, nossa empresa se destaca 
                  pela combinação única de expertise técnica e visão estratégica.
                </p>
                <p>
                  Ao longo dos anos, evoluímos de uma pequena consultoria de desenvolvimento 
                  para uma empresa completa de tecnologia, capaz de atender desde startups 
                  até grandes corporações em suas jornadas de transformação digital.
                </p>
                <p>
                  Hoje, somos referência em sistemas inteligentes, integrando as mais 
                  avançadas tecnologias de Machine Learning e Inteligência Artificial 
                  em soluções práticas e escaláveis.
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
          </div>
        </div>
      </section>

      {/* Mission, Vision Section */}
      <section className="section-padding bg-background">
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
      <section className="section-padding bg-card">
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

      {/* Timeline Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Nossa Trajetória"
            title="Uma história de crescimento"
          />

          <div className="mt-16 max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-8 border-l border-primary/30 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-primary" />
                <div className="glass-card p-6">
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
