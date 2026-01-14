import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WorldsSection } from "@/components/home/WorldsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TechnologiesSection } from "@/components/home/TechnologiesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <section id="worlds">
        <WorldsSection />
      </section>
      <AboutSection />
      <TechnologiesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
