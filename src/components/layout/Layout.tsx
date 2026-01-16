import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { usePageTracking } from "@/hooks/usePageTracking";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Track page views for analytics
  usePageTracking();

  useEffect(() => {
    // Scroll to top on route change (unless there's a hash anchor)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = location.hash.replace("#", "");

    // Wait for the page to render before trying to scroll
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerOffset = 96; // fixed header + spacing
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const top = Math.max(absoluteTop - headerOffset, 0);

      window.scrollTo({ top, behavior: "smooth" });
    }, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
