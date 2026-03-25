import Script from "next/script";

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

/**
 * JSON-LD structured data component
 * Renders JSON-LD script tags for SEO
 */
export function JsonLd({ data, id = "json-ld" }: JsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

interface MultipleJsonLdProps {
  data: Record<string, unknown>[];
}

/**
 * Multiple JSON-LD structured data component
 * Renders multiple JSON-LD script tags within a @graph structure for SEO
 */
export function MultipleJsonLd({ data }: MultipleJsonLdProps) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": data.map(item => {
      // Remove @context from individual items if present to avoid redundancy in @graph
      const { "@context": _, ...rest } = item;
      return rest;
    }),
  };

  return (
    <Script
      id="json-ld-graph"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph),
      }}
    />
  );
}
