import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Instagram, Github } from "lucide-react";
import { VixioLogo } from "@/components/brand/VixioLogo";

const footerLinks = {
  empresa: [
    { name: "Sobre", path: "/sobre" },
    { name: "Serviços", path: "/servicos" },
    { name: "Portfólio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
  ],
  servicos: [
    { name: "Análise de Dados", path: "/servicos#analise-dados" },
    { name: "Sistemas Inteligentes", path: "/servicos#sistemas" },
    { name: "Machine Learning", path: "/servicos#ml" },
    { name: "Consultoria", path: "/servicos#consultoria" },
  ],
  suporte: [
    { name: "Contato", path: "/contato" },
    { name: "FAQ", path: "/contato#faq" },
    { name: "Área do Cliente", path: "/login" },
    { name: "Política de Privacidade", path: "/privacidade" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/vixio" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/vixio" },
  { name: "GitHub", icon: Github, url: "https://github.com/vixio" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <VixioLogo variant="full" size="lg" theme="dark" />
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Transformamos dados em decisões estratégicas com sistemas inteligentes 
              e ciência de dados de ponta. Sua visão, nossa tecnologia.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contato@vixio.com.br"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                contato@vixio.com.br
              </a>
              <a
                href="https://wa.me/5511999999999"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                +55 (11) 99999-9999
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                São Paulo, SP - Brasil
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vixio. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
