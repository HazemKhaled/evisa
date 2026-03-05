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
 * Renders multiple JSON-LD script tags for SEO
 */
export function MultipleJsonLd({ data }: MultipleJsonLdProps) {
  return (
    <>
      {data.map((item, index) => (
        <Script
          key={index}
          id={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
}
