import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  Building2, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Heart,
  BarChart3,
  FileText,
  Medal,
  Briefcase,
  Target,
  CheckCircle2,
  Brain,
  LineChart,
  Database,
  Microscope,
  Linkedin,
  ExternalLink
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import founderImage from "@/assets/founder.png";

const education = [
  {
    period: "2002-2006",
    degree: "Doutorado",
    field: "Fisiologia e Fisiopatologia Clínica e Experimental",
    institution: "Universidade do Estado do Rio de Janeiro (UERJ)",
    icon: GraduationCap,
  },
  {
    period: "2001-2002",
    degree: "Mestrado",
    field: "Fisiologia e Fisiopatologia Clínica e Experimental",
    institution: "Universidade do Estado do Rio de Janeiro (UERJ)",
    icon: GraduationCap,
  },
  {
    period: "1997-2001",
    degree: "Licenciatura Plena",
    field: "Ciências Biológicas",
    institution: "Universidade do Estado do Rio de Janeiro (UERJ)",
    icon: BookOpen,
  },
];

const careerHighlights = [
  {
    period: "2025 - Atual",
    role: "Coordenador de Extensão Medicina & Gestor de Monitoria",
    organization: "Unex - Centro Universitário de Excelência",
    description: "Liderança de programas de extensão e monitoria acadêmica no curso de Medicina.",
    icon: Building2,
  },
  {
    period: "2022-2025",
    role: "Assessor de Planejamento",
    organization: "Secretaria Municipal de Saúde de Vitória da Conquista",
    description: "Planejamento estratégico e gestão baseada em dados para políticas públicas de saúde.",
    icon: Target,
  },
  {
    period: "2020-2022",
    role: "Estatístico COVID-19",
    organization: "Prefeitura Municipal de Vitória da Conquista",
    description: "Análise estatística que colocou a cidade no 4º melhor indicador de letalidade entre as 100 maiores cidades do Brasil.",
    icon: BarChart3,
  },
  {
    period: "2019 - Atual",
    role: "Presidente",
    organization: "Instituto de Pesquisa e Extensão (InPES)",
    description: "Liderança institucional em pesquisa científica e projetos de extensão.",
    icon: Award,
  },
  {
    period: "2017 - Atual",
    role: "Gerente de Ensino, Pesquisa e Extensão",
    organization: "Fundação Pública de Saúde (FSVC) - Hospital Esaú Matos",
    description: "Gestão integrada de atividades acadêmicas e de pesquisa em ambiente hospitalar.",
    icon: Briefcase,
  },
  {
    period: "2017-2023",
    role: "Coordenador do Comitê de Ética e Pesquisa",
    organization: "Fundação Pública de Saúde (FSVC) - Hospital Esaú Matos",
    description: "Supervisão ética de projetos de pesquisa em saúde.",
    icon: FileText,
  },
  {
    period: "2014-2017",
    role: "Diretor de Pós-Graduação, Pesquisa e Extensão",
    organization: "Faculdade Independente do Nordeste - FAINOR",
    description: "Direção estratégica de programas de pós-graduação e iniciativas de pesquisa.",
    icon: GraduationCap,
  },
];

const academicExperience = [
  {
    period: "2019",
    role: "Professor",
    institution: "Faculdade Santo Agostinho",
  },
  {
    period: "2010-2019",
    role: "Professor",
    institution: "Faculdade de Tecnologia e Ciências - FTC",
  },
  {
    period: "2008-2019",
    role: "Professor",
    institution: "Faculdade Independente do Nordeste - FAINOR",
  },
  {
    period: "2006-2007",
    role: "Professor",
    institution: "Associação Universitária Santa Ursula - USU",
  },
];

const achievements = [
  {
    icon: FileText,
    value: "100+",
    label: "Artigos Científicos",
    description: "Publicações em revistas nacionais e internacionais",
  },
  {
    icon: Medal,
    value: "Doutor Honoris Causa",
    label: "Título Honorífico",
    description: "Reconhecimento pelas contribuições ao progresso das Ciências",
  },
  {
    icon: Award,
    value: "Cidadão Conquistense",
    label: "Título de Honra",
    description: "Pelo destaque dado à Vitória da Conquista durante a pandemia",
  },
  {
    icon: TrendingUp,
    value: "4º Melhor",
    label: "Indicador de Letalidade",
    description: "Entre as 100 maiores cidades do Brasil durante a COVID-19",
  },
];

const competencies = [
  { name: "Gestão de Processos e Pessoas", level: 100, icon: Users },
  { name: "Indicadores de Performance (KPIs)", level: 100, icon: TrendingUp },
  { name: "Gestão da Qualidade", level: 100, icon: CheckCircle2 },
  { name: "Gestão em Saúde", level: 100, icon: Heart },
  { name: "Big Data & Analytics", level: 100, icon: Database },
  { name: "Business Intelligence", level: 100, icon: BarChart3 },
  { name: "Pesquisa Científica", level: 100, icon: Microscope },
  { name: "Data Science", level: 100, icon: Brain },
];

const impactAreas = [
  {
    title: "Gestão em Saúde",
    description: "Experiência consolidada em planejamento estratégico e gestão baseada em dados para o setor de saúde pública e privada.",
    icon: Heart,
  },
  {
    title: "Big Data & Analytics",
    description: "Expertise em análise de grandes volumes de dados, transformando informações em insights acionáveis para tomada de decisão.",
    icon: Database,
  },
  {
    title: "Business Intelligence",
    description: "Construção de dashboards executivos em BI que permitem monitoramento em tempo real e interpretação estratégica de dados.",
    icon: LineChart,
  },
  {
    title: "Pesquisa Científica",
    description: "Liderança de grupos de pesquisa com mais de 150 artigos publicados em revistas internacionais de alto impacto.",
    icon: Microscope,
  },
];

const Fundador = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 orb-primary rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 orb-accent rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                CEO & Fundador
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Dr. Stenio Fernando{" "}
                <span className="gradient-text-purple">Pimentel Duarte</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Ph.D. em Fisiologia e Fisiopatologia Clínica e Experimental
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cientista, gestor e empreendedor com mais de 20 anos de experiência em pesquisa, 
                ensino e gestão estratégica. Combina rigor científico com visão executiva para 
                transformar dados em decisões que impactam vidas.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="glass-card px-5 py-3">
                  <span className="text-2xl font-bold gradient-text-cyan">20+</span>
                  <span className="text-sm text-muted-foreground ml-2">Anos de Experiência</span>
                </div>
                <div className="glass-card px-5 py-3">
                  <span className="text-2xl font-bold gradient-text-purple">100+</span>
                  <span className="text-sm text-muted-foreground ml-2">Artigos Científicos</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="http://lattes.cnpq.br/5318656227506357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium text-sm hover:bg-primary/20 transition-all duration-300 hover-lift"
                >
                  <ExternalLink className="h-4 w-4" />
                  Currículo Lattes
                </a>
                <a
                  href="https://www.linkedin.com/in/stenio-fernando-duarte-b58b8bb0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/20 font-medium text-sm hover:bg-[#0077B5]/20 transition-all duration-300 hover-lift"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden glow-primary">
                <img
                  src={founderImage}
                  alt="Dr. Stenio Fernando Pimentel Duarte - CEO e Fundador da Vixio"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </div>
              
              {/* Floating achievements card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 glass-card p-5 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Medal className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Doutor Honoris Causa</div>
                    <div className="text-xs text-muted-foreground">Contribuições às Ciências</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="container-custom">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-2xl md:text-3xl font-light text-foreground italic leading-relaxed">
              "Transformar dados em decisões que salvam vidas e impulsionam negócios 
              é mais do que uma profissão — é uma vocação."
            </p>
            <footer className="mt-6 text-muted-foreground">
              — Dr. Stenio Fernando Pimentel Duarte
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Reconhecimento"
            title="Conquistas e "
            titleHighlight="Impacto"
            description="Uma trajetória marcada por contribuições significativas para a ciência, saúde pública e gestão estratégica."
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center hover-lift card-glow"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-2xl font-bold gradient-text-purple mb-1">
                  {achievement.value}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {achievement.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Impact */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            badge="Expertise"
            title="Áreas de "
            titleHighlight="Atuação"
            description="Competências que combinam rigor acadêmico com aplicação prática no mundo corporativo."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 card-shimmer hover-lift"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <area.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Formação Acadêmica"
            title="Excelência em "
            titleHighlight="Educação"
            description="Formação sólida em uma das mais prestigiadas universidades do Brasil."
          />

          <div className="mt-16 max-w-4xl mx-auto space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover-lift"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <edu.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {edu.degree}
                        </h3>
                        <p className="text-primary font-medium">
                          {edu.field}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience Timeline */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            badge="Trajetória Profissional"
            title="Experiência "
            titleHighlight="Executiva"
            description="Uma carreira dedicada à gestão, pesquisa e transformação institucional."
          />

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
              
              {careerHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16 md:pl-20 pb-10 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-6 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="glass-card p-6 hover-lift card-glow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.role}
                          </h3>
                          <p className="text-sm text-primary">
                            {item.organization}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Experience */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            badge="Docência"
            title="Experiência "
            titleHighlight="Acadêmica"
            description="Mais de uma década dedicada à formação de profissionais em instituições de ensino superior."
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {academicExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-5 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary">{exp.period}</span>
                <h3 className="text-sm font-semibold text-foreground mt-1 mb-1">
                  {exp.role}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {exp.institution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competencies */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            badge="Competências"
            title="Habilidades "
            titleHighlight="Estratégicas"
            description="Expertise desenvolvida ao longo de décadas de atuação profissional e acadêmica."
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-5 hover-lift"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <skill.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COVID-19 Impact Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orb-primary rounded-full blur-3xl opacity-30" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Impacto na Pandemia COVID-19
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Durante a pandemia, o trabalho estatístico liderado pelo Dr. Stenio Fernando foi 
              fundamental para posicionar Vitória da Conquista como referência nacional em gestão 
              de crise sanitária.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="text-3xl font-bold gradient-text-cyan mb-2">4º Lugar</div>
                <p className="text-sm text-muted-foreground">
                  Melhor indicador de letalidade entre as 100 maiores cidades do Brasil
                </p>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold gradient-text-purple mb-2">Única Cidade</div>
                <p className="text-sm text-muted-foreground">
                  Que não atingiu 100% da capacidade de leitos de UTI ocupados
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conheça a <span className="gradient-text-purple">Vixio</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              A expertise do Dr. Stenio Fernando é a base da Vixio. Conheça como transformamos 
              dados em decisões estratégicas para impulsionar o seu negócio.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/sobre"
                className="inline-flex items-center px-6 py-3 rounded-lg gradient-primary text-white font-medium hover-lift"
              >
                Sobre a Empresa
              </a>
              <a
                href="/contato"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-primary/30 text-foreground font-medium hover:bg-primary/10 transition-colors"
              >
                Entre em Contato
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Fundador;
