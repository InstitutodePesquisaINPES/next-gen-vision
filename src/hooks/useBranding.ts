import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BrandingSettings {
  logoUrl: string | null;
  logoDarkUrl: string | null;
  logoLightUrl: string | null;
  faviconUrl: string | null;
}

/**
 * Fetches branding URLs (logos, favicon) from site_settings.
 * Returns null values when no custom branding is configured,
 * allowing components to fall back to static assets.
 */
export function useBranding() {
  return useQuery({
    queryKey: ["branding-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .eq("category", "theme")
        .in("key", [
          "theme_logo_url",
          "theme_logo_dark_url",
          "theme_logo_light_url",
          "theme_favicon_url",
        ]);

      if (error) throw error;

      const map = new Map(data?.map((d) => [d.key, d.value]) ?? []);

      return {
        logoUrl: map.get("theme_logo_url") || null,
        logoDarkUrl: map.get("theme_logo_dark_url") || null,
        logoLightUrl: map.get("theme_logo_light_url") || null,
        faviconUrl: map.get("theme_favicon_url") || null,
      } as BrandingSettings;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
