import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function Seo({ title, description, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    const scriptId = "page-json-ld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [title, description, jsonLd]);

  return null;
}
