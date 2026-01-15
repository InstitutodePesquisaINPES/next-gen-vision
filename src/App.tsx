import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLoader } from "@/components/ui/page-loader";

// Eager load main pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load secondary pages for better performance
const Sobre = lazy(() => import("./pages/Sobre"));
const Fundador = lazy(() => import("./pages/Fundador"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const Contato = lazy(() => import("./pages/Contato"));

// Mundos - Lazy loaded
const ConsultoriaIndex = lazy(() => import("./pages/consultoria/Index"));
const DataScience = lazy(() => import("./pages/consultoria/DataScience"));
const Bioestatistica = lazy(() => import("./pages/consultoria/Bioestatistica"));
const Planejamento = lazy(() => import("./pages/consultoria/Planejamento"));
const Analytics = lazy(() => import("./pages/consultoria/Analytics"));
const BehavioralAnalytics = lazy(() => import("./pages/consultoria/BehavioralAnalytics"));
const PeopleAnalytics = lazy(() => import("./pages/consultoria/PeopleAnalytics"));
const CustomerIntelligence = lazy(() => import("./pages/consultoria/CustomerIntelligence"));
const SistemasIndex = lazy(() => import("./pages/sistemas/Index"));
const PlataformasIndex = lazy(() => import("./pages/plataformas/Index"));
const MarketplaceIndex = lazy(() => import("./pages/marketplace/Index"));
const EducacaoIndex = lazy(() => import("./pages/educacao/Index"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home Central */}
            <Route path="/" element={<Index />} />
            
            {/* Mundo Consultoria */}
            <Route path="/consultoria" element={<ConsultoriaIndex />} />
            <Route path="/consultoria/data-science" element={<DataScience />} />
            <Route path="/consultoria/bioestatistica" element={<Bioestatistica />} />
            <Route path="/consultoria/planejamento" element={<Planejamento />} />
            <Route path="/consultoria/analytics" element={<Analytics />} />
            <Route path="/consultoria/behavioral" element={<BehavioralAnalytics />} />
            <Route path="/consultoria/people-analytics" element={<PeopleAnalytics />} />
            <Route path="/consultoria/customer-intelligence" element={<CustomerIntelligence />} />
            
            {/* Mundo Sistemas */}
            <Route path="/sistemas" element={<SistemasIndex />} />
            
            {/* Plataformas SaaS */}
            <Route path="/plataformas" element={<PlataformasIndex />} />
            
            {/* Marketplace */}
            <Route path="/marketplace" element={<MarketplaceIndex />} />
            
            {/* Educação */}
            <Route path="/educacao" element={<EducacaoIndex />} />
            
            {/* Páginas Gerais */}
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/fundador" element={<Fundador />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contato" element={<Contato />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
