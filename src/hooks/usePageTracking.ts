import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Generate a simple session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('vixio_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('vixio_session_id', sessionId);
  }
  return sessionId;
};

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      // Don't track admin pages
      if (location.pathname.startsWith('/admin')) {
        return;
      }

      try {
        await supabase.from('page_views').insert({
          path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          session_id: getSessionId(),
        });
      } catch (error) {
        // Silently fail - tracking should not affect user experience
        console.debug('Page view tracking failed:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);
}

export function PageTracker() {
  usePageTracking();
  return null;
}
