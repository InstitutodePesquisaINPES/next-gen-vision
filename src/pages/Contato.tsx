import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import { usePageContent } from "@/hooks/usePageContent";

interface HeroContent {
  badge: string;
  title: string;
  title_highlight: string;
  description: string;
}

interface ContactInfoContent {
  items: { title: string; value: string; link: string | null }[];
  whatsapp_link: string;
  whatsapp_text: string;
  whatsapp_note: string;
}

interface FAQContent {
  title: string;
  description: string;
  items: { question: string; answer: string }[];
}

const defaultHero: HeroContent = {
  badge: "Contato",
  title: "Vamos",
  title_highlight: "conversar",
  description: "Entre em contato e descubra como podemos ajudar sua empresa a alcançar novos patamares com tecnologia.",
};

const defaultInfo: ContactInfoContent = {
  items: [
    { title: "Email", value: "contato@vixio.com.br", link: "mailto:contato@vixio.com.br" },
    { title: "Telefone", value: "+55 (77) 99100-5071", link: "tel:+5577991005071" },
    { title: "Localização", value: "São Paulo, SP - Brasil", link: null },
    { title: "Horário", value: "Seg - Sex: 9h às 18h", link: null },
  ],
  whatsapp_link: "https://wa.me/5577991005071",
  whatsapp_text: "Falar no WhatsApp",
  whatsapp_note: "Resposta em até 2 horas em horário comercial",
};

const defaultFaq: FAQContent = {
  title: "Perguntas Frequentes",
  description: "Algumas das perguntas mais comuns que recebemos.",
  items: [
    { question: "Qual o prazo médio para desenvolvimento de um projeto?", answer: "O prazo varia de acordo com a complexidade. Projetos simples podem levar de 2 a 4 semanas, enquanto sistemas mais complexos podem levar de 2 a 6 meses." },
    { question: "Vocês oferecem suporte após a entrega?", answer: "Sim! Oferecemos pacotes de suporte e manutenção contínua para garantir que sua solução continue funcionando perfeitamente." },
    { question: "Como funciona o processo de orçamento?", answer: "Após o primeiro contato, agendamos uma reunião para entender suas necessidades. Em seguida, elaboramos uma proposta detalhada com escopo, prazo e investimento." },
    { question: "Vocês trabalham com projetos de qualquer tamanho?", answer: "Sim! Atendemos desde startups até grandes corporações, adaptando nossas soluções às necessidades e orçamento de cada cliente." },
  ],
};

const contactIcons = [Mail, Phone, MapPin, Clock];

const Contato = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const { getSection } = usePageContent("contato");
  
  const hero = getSection<HeroContent>("hero", defaultHero);
  const info = getSection<ContactInfoContent>("info", defaultInfo);
  const faq = getSection<FAQContent>("faq", defaultFaq);

  useSEO({
    title: "Contato",
    description: "Entre em contato com a Vixio. Fale com nossos especialistas em dados, IA e sistemas inteligentes.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        nome: formData.name, email: formData.email, telefone: formData.phone || null,
        empresa: formData.company || null, observacoes: `Assunto: ${formData.subject}\n\n${formData.message}`,
        origem: "site_contato", pagina_origem: "/contato", status: "novo" as const,
      });
      if (error) throw error;
      toast({ title: "Mensagem enviada com sucesso!", description: "Entraremos em contato em até 24 horas." });
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast({ title: "Erro ao enviar mensagem", description: "Tente novamente ou entre em contato pelo WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">{hero.badge}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {hero.title}{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">{hero.title_highlight}</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Informações de Contato</h2>
              {info.items.map((item, index) => {
                const Icon = contactIcons[index % contactIcons.length];
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.title}</div>
                      {item.link ? (
                        <a href={item.link} className="text-foreground font-medium hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-foreground font-medium">{item.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="pt-6">
                <Button size="lg" className="w-full gradient-primary text-primary-foreground" asChild>
                  <a href={info.whatsapp_link} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {info.whatsapp_text}
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-3 text-center">{info.whatsapp_note}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <div className="glass-card p-8 md:p-10">
                <h2 className="text-2xl font-bold text-foreground mb-2">Envie sua mensagem</h2>
                <p className="text-muted-foreground mb-8">Preencha o formulário abaixo e entraremos em contato em breve.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Nome da empresa" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Sobre o que deseja falar?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Descreva seu projeto ou dúvida..." rows={5} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground" disabled={isSubmitting}>
                    {isSubmitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" />Enviando...</>) : (<><Send className="mr-2 h-5 w-5" />Enviar Mensagem</>)}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">{faq.title}</h2>
            <p className="text-muted-foreground mb-12">{faq.description}</p>
            <div className="space-y-6 text-left">
              {faq.items.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
