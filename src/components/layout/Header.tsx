import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Phone, Mail, ChevronDown, 
  // Consultoria icons
  Brain, BarChart3, Users, Target, TrendingUp, Activity, FlaskConical,
  // Sistemas icons
  Bot, MessageSquare, HeartPulse, Car, ShoppingBag, Code2, Cloud, Package,
  // Educação icons
  GraduationCap, ClipboardCheck, BookOpen, Presentation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VixioLogo } from "@/components/brand/VixioLogo";

const consultoriaSubmenu = [
  { name: "Data Science", path: "/consultoria/data-science", icon: Brain, description: "Machine Learning & IA" },
  { name: "Bioestatística", path: "/consultoria/bioestatistica", icon: FlaskConical, description: "Análise estatística rigorosa" },
  { name: "Analytics & BI", path: "/consultoria/analytics", icon: BarChart3, description: "Dashboards e insights" },
  { name: "People Analytics", path: "/consultoria/people-analytics", icon: Users, description: "Inteligência de RH" },
  { name: "Customer Intelligence", path: "/consultoria/customer-intelligence", icon: Target, description: "CLV, segmentação e churn" },
  { name: "Behavioral Analytics", path: "/consultoria/behavioral-analytics", icon: Activity, description: "Análise comportamental" },
  { name: "Planejamento Estratégico", path: "/consultoria/planejamento", icon: TrendingUp, description: "OKRs e modelagem financeira" },
];

const sistemasSubmenu = [
  { name: "Secretária WhatsApp", path: "/sistemas#whatsapp-secretaria", icon: Bot, description: "Atendimento 24/7 com IA" },
  { name: "Gestão de Atendimento", path: "/sistemas#gestao-atendimento", icon: MessageSquare, description: "CRM e multicanal" },
  { name: "Sistemas para Clínicas", path: "/sistemas#clinicas-saude", icon: HeartPulse, description: "Prontuário e agendamento" },
  { name: "Gestão de Frotas", path: "/sistemas#frota", icon: Car, description: "Controle de veículos" },
  { name: "E-commerce", path: "/sistemas#ecommerce", icon: ShoppingBag, description: "Lojas virtuais" },
  { name: "Plataformas SaaS", path: "/sistemas#plataformas", icon: Cloud, description: "Sistemas prontos" },
  { name: "Marketplace", path: "/sistemas#marketplace", icon: Package, description: "Código & licenças" },
];

const educacaoSubmenu = [
  { name: "Diagnóstico Empresarial", path: "/educacao#diagnostico-empresarial", icon: ClipboardCheck, description: "Avaliação de maturidade" },
  { name: "Capacitações In Company", path: "/educacao#capacitacoes-in-company", icon: BookOpen, description: "Formação personalizada" },
  { name: "Workshops Executivos", path: "/educacao#workshops-executivos", icon: Presentation, description: "Decisão e alinhamento" },
  { name: "Formação de Lideranças", path: "/educacao#formacao-liderancas", icon: GraduationCap, description: "Cultura data-driven" },
];

interface SubmenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface NavLink {
  name: string;
  path: string;
  hasSubmenu: boolean;
  submenu?: SubmenuItem[];
  viewAllLabel?: string;
}

const navLinks: NavLink[] = [
  { name: "Início", path: "/", hasSubmenu: false },
  { name: "Consultoria", path: "/consultoria", hasSubmenu: true, submenu: consultoriaSubmenu, viewAllLabel: "Ver todas as especializações" },
  { name: "Sistemas", path: "/sistemas", hasSubmenu: true, submenu: sistemasSubmenu, viewAllLabel: "Ver todos os sistemas" },
  { name: "Educação", path: "/educacao", hasSubmenu: true, submenu: educacaoSubmenu, viewAllLabel: "Ver todos os serviços" },
  { name: "Sobre", path: "/sobre", hasSubmenu: false },
  { name: "Contato", path: "/contato", hasSubmenu: false },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileOpenSubmenu(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (linkName: string) => {
    setOpenDropdown(linkName);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <VixioLogo variant="full" size="lg" theme="dark" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.hasSubmenu && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                {link.hasSubmenu ? (
                  <>
                    <Link
                      to={link.path}
                      className={`link-underline text-sm font-medium transition-colors flex items-center gap-1 ${
                        location.pathname.startsWith(link.path) && link.path !== "/"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Dropdown Menu - FUNDO SÓLIDO */}
                    <AnimatePresence>
                      {openDropdown === link.name && link.submenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                        >
                          {/* Área invisível para manter hover */}
                          <div className="absolute -top-2 left-0 right-0 h-4" />
                          {/* Dropdown com fundo sólido e gradiente sutil */}
                          <div className="bg-card border border-border rounded-2xl shadow-xl shadow-black/30 p-3 w-[340px]">
                            {/* Header do dropdown */}
                            <div className="px-3 py-2.5 mb-2 border-b border-border/40">
                              <Link 
                                to={link.path}
                                className="text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                              >
                                <span>{link.viewAllLabel}</span>
                                <motion.span
                                  className="inline-block"
                                  whileHover={{ x: 3 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  →
                                </motion.span>
                              </Link>
                            </div>

                            {/* Items com hover suave */}
                            <div className="space-y-1 max-h-[420px] overflow-y-auto">
                              {link.submenu.map((item, idx) => (
                                <motion.div
                                  key={item.path + item.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.03, duration: 0.2 }}
                                >
                                  <Link
                                    to={item.path}
                                    className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ease-out group relative overflow-hidden ${
                                      location.pathname === item.path
                                        ? "bg-primary/15"
                                        : "hover:bg-accent/50"
                                    }`}
                                  >
                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <motion.div 
                                      className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                                        location.pathname === item.path
                                          ? "bg-primary/20 text-primary"
                                          : "bg-muted/40 text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary group-hover:scale-110"
                                      }`}
                                      whileHover={{ rotate: [0, -5, 5, 0] }}
                                      transition={{ duration: 0.4 }}
                                    >
                                      <item.icon className="h-4 w-4" />
                                    </motion.div>
                                    <div className="flex-1 min-w-0 relative">
                                      <p className={`text-sm font-medium transition-all duration-300 ${
                                        location.pathname === item.path
                                          ? "text-primary"
                                          : "text-foreground group-hover:text-primary group-hover:translate-x-1"
                                      }`}>
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-0.5 truncate transition-colors duration-300 group-hover:text-muted-foreground/80">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`link-underline text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/30 hidden lg:inline-flex"
              asChild
            >
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button 
              size="sm" 
              className="gradient-primary text-primary-foreground glow-primary font-semibold px-4 lg:px-5"
              asChild
            >
              <Link to="/contato">
                Fale Conosco
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[hsl(210,45%,13%)] border-b border-border"
          >
            <div className="container-custom py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.hasSubmenu && link.submenu ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setMobileOpenSubmenu(mobileOpenSubmenu === link.name ? null : link.name)}
                        className={`flex items-center justify-between w-full py-2 text-lg font-medium transition-colors ${
                          location.pathname.startsWith(link.path) && link.path !== "/"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileOpenSubmenu === link.name ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {mobileOpenSubmenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            <Link
                              to={link.path}
                              className="block py-2 text-sm text-primary font-medium"
                            >
                              Ver todos →
                            </Link>
                            {link.submenu.map((item) => (
                              <Link
                                key={item.path + item.name}
                                to={item.path}
                                className={`flex items-center gap-2 py-2 text-sm transition-colors ${
                                  location.pathname === item.path
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-2 text-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  asChild
                >
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button className="w-full justify-center gradient-primary text-primary-foreground" asChild>
                  <Link to="/contato">
                    <Mail className="h-4 w-4 mr-2" />
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
