import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, Cloud, Server, Check, Star, 
  ChevronRight, Zap, Shield, HeadphonesIcon, Rocket,
  Building2, Truck, Heart, Cross, Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const platforms = [
  {
    id: "funerallog",
    name: "FuneralLog",
    tagline: "Gestão Inteligente de Serviços Funerários",
    description: "Sistema completo para gestão de funerárias, incluindo controle de óbitos, velórios, documentação, estoque, financeiro e relacionamento com famílias.",
    icon: Cross,
    color: "purple",
    gradient: "from-purple-500 to-violet-500",
    features: [
      "Controle completo de óbitos e serviços",
      "Gestão de velórios e capelas",
      "Documentação automatizada",
      "Controle de estoque (urnas, coroas)",
      "Financeiro integrado",
      "Portal para famílias",
    ],
    highlight: "Líder em gestão funerária",
  },
  {
    id: "velog",
    name: "VeloG",
    tagline: "Sistema de Gestão de Frotas e Logística",
    description: "Plataforma completa para gestão de frotas, rastreamento, manutenção preventiva, controle de combustível e otimização de rotas.",
    icon: Truck,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    features: [
      "Rastreamento em tempo real",
      "Gestão de manutenções preventivas",
      "Controle de combustível e abastecimento",
      "Gestão de motoristas e jornadas",
      "Otimização de rotas",
      "Relatórios gerenciais completos",
    ],
    highlight: "Controle total da sua frota",
  },
  {
    id: "tfd360",
    name: "TFD360",
    tagline: "Gestão Completa de Tratamento Fora do Domicílio",
    description: "Sistema especializado para prefeituras gerenciarem o TFD de forma eficiente, com agendamentos, transporte, acompanhamento e prestação de contas.",
    icon: Building2,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Cadastro e controle de pacientes",
      "Agendamento de consultas e exames",
      "Gestão de transporte e motoristas",
      "Controle de acompanhantes",
      "Prestação de contas automatizada",
      "Integração com sistemas de saúde",
    ],
    highlight: "Gestão pública eficiente",
  },
  {
    id: "clinicflow",
    name: "ClinicFlow",
    tagline: "Gestão Operacional para Clínicas e Consultórios",
    description: "Plataforma moderna para gestão de clínicas, consultórios e centros médicos, com prontuário eletrônico, agendamento e faturamento.",
    icon: Heart,
    color: "rose",
    gradient: "from-rose-500 to-pink-500",
    features: [
      "Prontuário eletrônico completo",
      "Agenda inteligente multi-profissional",
      "Faturamento TISS/SUS automatizado",
      "Gestão de convênios",
      "Telemedicina integrada",
      "App para pacientes",
    ],
    highlight: "Clínica digital completa",
  },
];

const advantages = [
  {
    icon: Rocket,
    title: "Implantação Rápida",
    description: "Sistemas prontos para uso. Comece a operar em dias, não meses.",
  },
  {
    icon: Shield,
    title: "Segurança Garantida",
    description: "Infraestrutura robusta, backups automáticos e compliance com LGPD.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Dedicado",
    description: "Equipe especializada para garantir o sucesso da sua operação.",
  },
  {
    icon: Zap,
    title: "Atualizações Contínuas",
    description: "Novas funcionalidades e melhorias sem custos adicionais.",
  },
];

const pricingModels = [
  {
    model: "SaaS Mensal",
    description: "Assinatura mensal com acesso completo",
    benefits: ["Sem investimento inicial", "Atualizações inclusas", "Suporte incluído", "Escale conforme cresce"],
  },
  {
    model: "Licença Anual",
    description: "Pagamento anual com desconto",
    benefits: ["Economia de até 20%", "Preço fixo garantido", "Prioridade no suporte", "Treinamento incluído"],
  },
  {
    model: "On-Premise",
    description: "Instalação na sua infraestrutura",
    benefits: ["Controle total", "Customização disponível", "Dados locais", "Licença perpétua"],
  },
];

export default function PlataformasIndex() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
                <Cloud className="w-4 h-4" />
                Plataformas Digitais & SaaS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Soluções</span>{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Prontas
              </span>{" "}
              <span className="text-white">para Uso</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Sistemas profissionais testados e prontos para uso imediato. 
              Contrate por licença ou modelo SaaS e comece a operar hoje mesmo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Solicitar Demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Plataformas Disponíveis"
            title="Sistemas Profissionais"
            titleHighlight="Prontos para Uso"
            description="Escolha a plataforma ideal para o seu negócio e comece a operar imediatamente."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-shimmer p-8 hover-lift group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${platform.gradient} bg-opacity-10`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${platform.color}-500/10 text-${platform.color}-400`}>
                      {platform.highlight}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mt-2">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.tagline}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{platform.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {platform.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className={`w-4 h-4 text-${platform.color}-400 shrink-0`} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${platform.gradient} text-white`}
                  asChild
                >
                  <Link to="/contato">
                    Conhecer {platform.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Vantagens"
            title="Por que escolher"
            titleHighlight="nossas plataformas"
            description="Benefícios de adotar sistemas profissionais prontos para uso."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <advantage.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{advantage.title}</h4>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Modelos de Contratação"
            title="Flexibilidade para"
            titleHighlight="seu negócio"
            description="Escolha o modelo que melhor se adapta à sua realidade."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {pricingModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="text-xl font-bold text-foreground mb-2">{model.model}</h4>
                <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                <ul className="space-y-2">
                  {model.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 p-12 md:p-16"
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pronto para{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  começar?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Agende uma demonstração gratuita e descubra como nossas plataformas 
                podem transformar a operação do seu negócio.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Agendar Demonstração
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
