import { render } from "@testing-library/react";

import { JsonLd, MultipleJsonLd } from "../json-ld";

// Mock Next.js Script component
jest.mock("next/script", () => ({
  __esModule: true,
  default: ({
    id,
    type,
    dangerouslySetInnerHTML,
  }: {
    id: string;
    type: string;
    dangerouslySetInnerHTML: { __html: string };
  }) => (
    <script
      id={id}
      type={type}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  ),
}));

describe("JsonLd component", () => {
  it("should render JSON-LD script with correct data", () => {
    const testData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Test Organization",
      url: "https://test.com",
    };

    render(<JsonLd data={testData} />);

    const script = document.querySelector('script[id="json-ld"]');
    expect(script).toBeInTheDocument();
    expect(script).toHaveAttribute("type", "application/ld+json");
    expect(script).toHaveTextContent(JSON.stringify(testData));
  });

  it("should handle complex nested data", () => {
    const complexData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Test Article",
      author: {
        name: "Test Author",
        type: "Person",
      },
      publisher: {
        name: "Test Publisher",
        logo: {
          url: "https://test.com/logo.png",
          width: 200,
          height: 60,
        },
      },
    };

    render(<JsonLd data={complexData} />);

    const script = document.querySelector('script[id="json-ld"]');
    expect(script).toHaveTextContent(JSON.stringify(complexData));
  });

  it("should handle empty data", () => {
    const emptyData = {};

    render(<JsonLd data={emptyData} />);

    const script = document.querySelector('script[id="json-ld"]');
    expect(script).toHaveTextContent("{}");
  });
});

describe("MultipleJsonLd component", () => {
  it("should render multiple JSON-LD scripts", () => {
    const testData = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Organization",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Website",
      },
    ];

    render(<MultipleJsonLd data={testData} />);

    const scripts = document.querySelectorAll('script[id^="json-ld"]');
    expect(scripts).toHaveLength(2);

    expect(scripts[0]).toHaveAttribute("id", "json-ld-0");
    expect(scripts[0]).toHaveTextContent(JSON.stringify(testData[0]));

    expect(scripts[1]).toHaveAttribute("id", "json-ld-1");
    expect(scripts[1]).toHaveTextContent(JSON.stringify(testData[1]));
  });

  it("should handle empty array", () => {
    render(<MultipleJsonLd data={[]} />);

    const scripts = document.querySelectorAll('script[id^="json-ld"]');
    expect(scripts).toHaveLength(0);
  });

  it("should handle single item array", () => {
    const singleData = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Single Article",
      },
    ];

    render(<MultipleJsonLd data={singleData} />);

    const scripts = document.querySelectorAll('script[id^="json-ld"]');
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toHaveAttribute("id", "json-ld-0");
    expect(scripts[0]).toHaveTextContent(JSON.stringify(singleData[0]));
  });

  it("should generate unique IDs for each script", () => {
    const testData = [
      { "@type": "Organization", name: "Org 1" },
      { "@type": "Organization", name: "Org 2" },
      { "@type": "Organization", name: "Org 3" },
    ];

    render(<MultipleJsonLd data={testData} />);

    const scripts = document.querySelectorAll('script[id^="json-ld"]');
    const ids = Array.from(scripts).map(script => script.getAttribute("id"));

    expect(ids).toEqual(["json-ld-0", "json-ld-1", "json-ld-2"]);
    expect(new Set(ids).size).toBe(3); // All IDs should be unique
  });
});
