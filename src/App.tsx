import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLoader } from "@/components/ui/page-loader";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

// Eager load main pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load secondary pages
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

// Admin pages - Lazy loaded
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Index"));
const AdminContent = lazy(() => import("./pages/admin/Content"));
const AdminNavigation = lazy(() => import("./pages/admin/Navigation"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminBackup = lazy(() => import("./pages/admin/Backup"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminLeads = lazy(() => import("./pages/admin/Leads"));
const AdminLeadDetail = lazy(() => import("./pages/admin/LeadDetail"));
const AdminPipeline = lazy(() => import("./pages/admin/Pipeline"));
const AdminTasks = lazy(() => import("./pages/admin/Tasks"));
const AdminWebhooks = lazy(() => import("./pages/admin/Webhooks"));
const AdminAuditLog = lazy(() => import("./pages/admin/AuditLog"));
const AdminCRMDashboard = lazy(() => import("./pages/admin/CRMDashboard"));

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
            
            {/* Admin Panel - wrapped in AdminAuthProvider */}
            <Route path="/admin/login" element={<AdminAuthProvider><AdminLogin /></AdminAuthProvider>} />
            <Route path="/admin" element={<AdminAuthProvider><AdminDashboard /></AdminAuthProvider>} />
            <Route path="/admin/conteudo" element={<AdminAuthProvider><AdminContent /></AdminAuthProvider>} />
            <Route path="/admin/navegacao" element={<AdminAuthProvider><AdminNavigation /></AdminAuthProvider>} />
            <Route path="/admin/configuracoes" element={<AdminAuthProvider><AdminSettings /></AdminAuthProvider>} />
            <Route path="/admin/usuarios" element={<AdminAuthProvider><AdminUsers /></AdminAuthProvider>} />
            <Route path="/admin/backup" element={<AdminAuthProvider><AdminBackup /></AdminAuthProvider>} />
            <Route path="/admin/analytics" element={<AdminAuthProvider><AdminAnalytics /></AdminAuthProvider>} />
            <Route path="/admin/leads" element={<AdminAuthProvider><AdminLeads /></AdminAuthProvider>} />
            <Route path="/admin/crm" element={<AdminAuthProvider><AdminCRMDashboard /></AdminAuthProvider>} />
            <Route path="/admin/leads/:id" element={<AdminAuthProvider><AdminLeadDetail /></AdminAuthProvider>} />
            <Route path="/admin/pipeline" element={<AdminAuthProvider><AdminPipeline /></AdminAuthProvider>} />
            <Route path="/admin/tarefas" element={<AdminAuthProvider><AdminTasks /></AdminAuthProvider>} />
            <Route path="/admin/webhooks" element={<AdminAuthProvider><AdminWebhooks /></AdminAuthProvider>} />
            <Route path="/admin/auditoria" element={<AdminAuthProvider><AdminAuditLog /></AdminAuthProvider>} />
            
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
