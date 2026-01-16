import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, Brain, BarChart3, Users, Target, TrendingUp, Activity, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VixioLogo } from "@/components/brand/VixioLogo";

const consultoriaSubmenu = [
  { 
    name: "Data Science", 
    path: "/consultoria/data-science", 
    icon: Brain,
    description: "Machine Learning & IA" 
  },
  { 
    name: "Bioestatística", 
    path: "/consultoria/bioestatistica", 
    icon: FlaskConical,
    description: "Análise estatística rigorosa" 
  },
  { 
    name: "Analytics & BI", 
    path: "/consultoria/analytics", 
    icon: BarChart3,
    description: "Dashboards e insights" 
  },
  { 
    name: "People Analytics", 
    path: "/consultoria/people-analytics", 
    icon: Users,
    description: "Inteligência de RH" 
  },
  { 
    name: "Customer Intelligence", 
    path: "/consultoria/customer-intelligence", 
    icon: Target,
    description: "CLV, segmentação e churn" 
  },
  { 
    name: "Behavioral Analytics", 
    path: "/consultoria/behavioral-analytics", 
    icon: Activity,
    description: "Análise comportamental" 
  },
  { 
    name: "Planejamento Estratégico", 
    path: "/consultoria/planejamento", 
    icon: TrendingUp,
    description: "OKRs e modelagem financeira" 
  },
];

const navLinks = [
  { name: "Início", path: "/", hasSubmenu: false },
  { name: "Consultoria", path: "/consultoria", hasSubmenu: true },
  { name: "Sistemas", path: "/sistemas", hasSubmenu: false },
  { name: "Educação", path: "/educacao", hasSubmenu: false },
  { name: "Sobre", path: "/sobre", hasSubmenu: false },
  { name: "Contato", path: "/contato", hasSubmenu: false },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultoriaOpen, setIsConsultoriaOpen] = useState(false);
  const [mobileConsultoriaOpen, setMobileConsultoriaOpen] = useState(false);
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
    setMobileConsultoriaOpen(false);
  }, [location.pathname]);

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
                onMouseEnter={() => link.hasSubmenu && setIsConsultoriaOpen(true)}
                onMouseLeave={() => link.hasSubmenu && setIsConsultoriaOpen(false)}
              >
                {link.hasSubmenu ? (
                  <>
                    <Link
                      to={link.path}
                      className={`link-underline text-sm font-medium transition-colors flex items-center gap-1 ${
                        location.pathname.startsWith("/consultoria")
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isConsultoriaOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isConsultoriaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        >
                          <div className="bg-card/98 backdrop-blur-xl border border-border/60 rounded-xl shadow-2xl p-2 w-[320px]">
                            {/* Header do dropdown */}
                            <div className="px-3 py-2 mb-1 border-b border-border/30">
                              <Link 
                                to="/consultoria"
                                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                Ver todas as especializações →
                              </Link>
                            </div>

                            {/* Items */}
                            <div className="space-y-0.5">
                              {consultoriaSubmenu.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 group ${
                                    location.pathname === item.path
                                      ? "bg-primary/10 text-primary"
                                      : "hover:bg-muted/50"
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                      ? "bg-primary/20 text-primary"
                                      : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                  }`}>
                                    <item.icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${
                                      location.pathname === item.path
                                        ? "text-primary"
                                        : "text-foreground group-hover:text-primary"
                                    }`}>
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
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
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container-custom py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.hasSubmenu ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => setMobileConsultoriaOpen(!mobileConsultoriaOpen)}
                        className={`flex items-center justify-between w-full py-2 text-lg font-medium transition-colors ${
                          location.pathname.startsWith("/consultoria")
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileConsultoriaOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {mobileConsultoriaOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            <Link
                              to="/consultoria"
                              className="block py-2 text-sm text-primary font-medium"
                            >
                              Ver todas →
                            </Link>
                            {consultoriaSubmenu.map((item) => (
                              <Link
                                key={item.path}
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
