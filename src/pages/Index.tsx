import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WorldsSection } from "@/components/home/WorldsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { CTASection } from "@/components/home/CTASection";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Vixio | Inteligência de Dados & Sistemas",
    description: "Consultoria em Data Science, Machine Learning e sistemas inteligentes. Transformamos dados em vantagem competitiva mensurável.",
  });
  return (
    <Layout>
      <HeroSection />
      <section id="worlds">
        <WorldsSection />
      </section>
      <AboutSection />
      <ResultsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
