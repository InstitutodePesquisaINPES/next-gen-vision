import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedSolution } from "@/components/home/FeaturedSolution";
import { WorldsSection } from "@/components/home/WorldsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedSolution />
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
