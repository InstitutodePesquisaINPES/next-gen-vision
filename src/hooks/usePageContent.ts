import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export interface PageSection {
  section_key: string;
  content_value: Json;
  is_active: boolean | null;
  ordem: number | null;
}

/**
 * Fetches all active content sections for a given page slug.
 * Returns a map of section_key → content_value for easy access.
 */
export function usePageContent(pageSlug: string) {
  const query = useQuery({
    queryKey: ["page-content", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("section_key, content_value, is_active, ordem")
        .eq("page_slug", pageSlug)
        .eq("is_active", true)
        .order("ordem", { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data as PageSection[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000,
  });

  /**
   * Get content for a specific section, with a fallback default.
   * Usage: getSection<MyType>("hero", defaultHeroContent)
   */
  function getSection<T>(sectionKey: string, fallback: T): T {
    if (!query.data) return fallback;
    const section = query.data.find((s) => s.section_key === sectionKey);
    if (!section) return fallback;
    return section.content_value as T;
  }

  /**
   * Get all sections matching a prefix, useful for repeated items.
   * Usage: getSections<MyType>("service_")
   */
  function getSections<T>(prefix: string): T[] {
    if (!query.data) return [];
    return query.data
      .filter((s) => s.section_key.startsWith(prefix))
      .map((s) => s.content_value as T);
  }

  return {
    ...query,
    getSection,
    getSections,
    sections: query.data ?? [],
  };
}
