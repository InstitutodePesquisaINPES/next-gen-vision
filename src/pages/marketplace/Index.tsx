import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ArrowRight, ShoppingBag, Package, Code, FileCode, 
  ChevronRight, Check, Zap, Shield, Lock,
  Database, Cpu, BarChart3, Settings, Globe, Server
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const modalities = [
  {
    icon: FileCode,
    title: "Venda de Código-Fonte",
    description: "Adquira o código-fonte completo do sistema para desenvolvimento e customização independente.",
    benefits: ["Propriedade total do código", "Liberdade de modificação", "Sem dependência de terceiros", "Documentação completa"],
  },
  {
    icon: Shield,
    title: "Licenciamento Comercial",
    description: "Licencie sistemas para operação comercial com suporte e atualizações garantidas.",
    benefits: ["Direito de uso comercial", "Suporte técnico incluso", "Atualizações de segurança", "Múltiplas instalações"],
  },
  {
    icon: Globe,
    title: "White Label",
    description: "Opere nossos sistemas com sua marca própria, ideal para revendedores e integradores.",
    benefits: ["Sua marca, nossa tecnologia", "Customização de identidade", "Suporte ao parceiro", "Modelo de receita recorrente"],
  },
  {
    icon: Package,
    title: "Módulos e APIs",
    description: "Componentes individuais e APIs para integração em projetos existentes.",
    benefits: ["Integração flexível", "Componentes testados", "Documentação técnica", "Suporte à integração"],
  },
];

const availableAssets = [
  {
    category: "Sistemas de Gestão (ERP)",
    icon: Database,
    color: "purple",
    items: [
      { name: "ERP Clínicas & Consultórios", description: "Sistema completo de gestão para área da saúde" },
      { name: "ERP Funerárias", description: "Gestão completa de serviços funerários" },
      { name: "ERP Logística & Frotas", description: "Controle de frotas, rotas e entregas" },
      { name: "ERP Serviços Públicos", description: "Gestão de TFD e serviços municipais" },
    ],
  },
  {
    category: "Plataformas de Automação",
    icon: Cpu,
    color: "emerald",
    items: [
      { name: "Secretária Virtual WhatsApp", description: "Atendimento automatizado com IA" },
      { name: "Motor de Regras de Negócio", description: "Engine configurável para automação" },
      { name: "Orquestrador de Workflows", description: "Automação de processos empresariais" },
      { name: "Chatbot Empresarial", description: "Assistente virtual customizável" },
    ],
  },
  {
    category: "APIs e Motores",
    icon: Settings,
    color: "blue",
    items: [
      { name: "API de Agendamento", description: "Gestão de agendas e horários" },
      { name: "Motor de Notificações", description: "Push, SMS, email e WhatsApp" },
      { name: "API de Documentos", description: "Geração e gestão de documentos" },
      { name: "Motor de Relatórios", description: "Geração dinâmica de relatórios" },
    ],
  },
  {
    category: "Dashboards e Analytics",
    icon: BarChart3,
    color: "rose",
    items: [
      { name: "Dashboard Executivo", description: "Painéis de KPIs configuráveis" },
      { name: "Motor de BI", description: "Business Intelligence embedável" },
      { name: "Analytics de Produto", description: "Tracking e análise de uso" },
      { name: "Reporting Framework", description: "Framework de relatórios" },
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Consulta",
    description: "Entre em contato para conhecer os ativos disponíveis e discutir suas necessidades.",
  },
  {
    step: "02",
    title: "Avaliação Técnica",
    description: "Nossa equipe apresenta a documentação, arquitetura e demonstração do sistema.",
  },
  {
    step: "03",
    title: "Proposta Comercial",
    description: "Definimos o modelo de aquisição e condições comerciais adequadas.",
  },
  {
    step: "04",
    title: "Transferência",
    description: "Realizamos a entrega do código, documentação e treinamento técnico.",
  },
];

const targetAudience = [
  { title: "Software Houses", description: "Acelere seu portfólio com sistemas prontos" },
  { title: "Integradores", description: "Ofereça soluções completas aos seus clientes" },
  { title: "Empresas de TI", description: "Expanda sua oferta de serviços" },
  { title: "Startups", description: "Valide seu modelo de negócio mais rápido" },
];

export default function MarketplaceIndex() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
                <ShoppingBag className="w-4 h-4" />
                Marketplace de Sistemas & Código
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className="text-white">Tecnologia como</span>{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Ativo
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Comercialização de sistemas completos, APIs, módulos e arquiteturas profissionais 
              para aquisição de código-fonte, licenciamento ou operação white label.
            </motion.p>

            {/* Confidentiality Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400">Negociações sob total confidencialidade</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 text-lg"
                asChild
              >
                <Link to="/contato">
                  Consultar Ativos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modalities Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Modalidades"
            title="Formas de"
            titleHighlight="Aquisição"
            description="Diferentes modelos para atender às necessidades do seu negócio."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((modality, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <modality.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{modality.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{modality.description}</p>
                <ul className="space-y-1.5">
                  {modality.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-amber-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Assets Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Catálogo"
            title="Ativos"
            titleHighlight="Disponíveis"
            description="Sistemas, módulos e APIs prontos para aquisição."
          />

          <div className="mt-16 space-y-12">
            {availableAssets.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-${category.color}-500/10`}>
                    <category.icon className={`w-6 h-6 text-${category.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{category.category}</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="glass-card p-5 hover-lift">
                      <h4 className="font-bold text-foreground mb-2">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <SectionHeader
            badge="Processo"
            title="Como"
            titleHighlight="Funciona"
            description="Processo simples e transparente para aquisição de tecnologia."
          />

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent z-0" />
                )}
                <div className="glass-card p-6 relative z-10">
                  <div className="text-4xl font-bold text-amber-400/20 mb-2">{step.step}</div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Para Quem"
            title="Ideal para"
            titleHighlight="Empresas de Tecnologia"
            description="Nosso marketplace atende empresas que buscam acelerar seu portfólio."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <h4 className="text-lg font-bold text-foreground mb-2">{audience.title}</h4>
                <p className="text-sm text-muted-foreground">{audience.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-red-500/20 p-12 md:p-16"
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400 font-medium">Negociações Confidenciais</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Interessado em{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  adquirir tecnologia?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Entre em contato para conhecer nosso catálogo completo e discutir 
                as melhores opções para o seu negócio.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8"
                  asChild
                >
                  <Link to="/contato">
                    Iniciar Conversa
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
