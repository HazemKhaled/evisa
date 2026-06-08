import { type NextRequest, NextResponse } from "next/server";

/**
 * Basic HTML to Markdown converter designed for AI agents.
 * Bypasses styling, script, and boilerplate tags, focusing on clean structure.
 */
function convertHtmlToMarkdown(html: string): string {
  let doc = html;

  // 1. Remove comments
  doc = doc.replace(/<!--[\s\S]*?-->/g, "");

  // 2. Remove script, style, head, header, footer, nav tags and their contents
  doc = doc.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  doc = doc.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  doc = doc.replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi, "");
  doc = doc.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "");
  doc = doc.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "");
  doc = doc.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "");

  // Extract page title if available
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : "";

  // 3. Headings
  doc = doc.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  doc = doc.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  doc = doc.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  doc = doc.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n");
  doc = doc.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n");
  doc = doc.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n");

  // 4. Bold / Strong, Italic / Em, Paragraphs, Line Breaks
  doc = doc.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**");
  doc = doc.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*");
  doc = doc.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");
  doc = doc.replace(/<br\s*\/?>/gi, "\n");

  // 5. Links: <a href="url">text</a> -> [text](url)
  doc = doc.replace(
    /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (match, href, text) => {
      // Clean up inner tags inside the link text
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      if (!cleanText) return "";
      return `[${cleanText}](${href})`;
    }
  );

  // 6. Lists
  // Convert list items to markdown list items
  doc = doc.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1");
  // Remove wrapping ul and ol tags
  doc = doc.replace(/<\/?(ul|ol)[^>]*>/gi, "\n");

  // 7. Table Handling (convert HTML tables to Markdown tables)
  // Process headers (th) and cells (td)
  doc = doc.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (match, trContent) => {
    // Find all columns in this row
    const cols: string[] = [];
    const cellRegex = /<(th|td)[^>]*>([\s\S]*?)<\/\1>/gi;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(trContent)) !== null) {
      cols.push(cellMatch[2].replace(/<[^>]+>/g, "").trim());
    }

    if (cols.length === 0) return "";

    // Check if this row is inside a thead or is all th's
    const isHeader = trContent.toLowerCase().includes("<th");
    const rowStr = `| ${cols.join(" | ")} |`;

    if (isHeader) {
      const separator = `| ${cols.map(() => "---").join(" | ")} |`;
      return `\n${rowStr}\n${separator}`;
    }
    return `\n${rowStr}`;
  });
  doc = doc.replace(/<\/?(table|thead|tbody|tfoot)[^>]*>/gi, "\n");

  // 8. Remove all remaining HTML tags
  doc = doc.replace(/<[^>]+>/g, "");

  // 9. Clean up common HTML entities
  doc = doc.replace(/&nbsp;/g, " ");
  doc = doc.replace(/&amp;/g, "&");
  doc = doc.replace(/&lt;/g, "<");
  doc = doc.replace(/&gt;/g, ">");
  doc = doc.replace(/&quot;/g, '"');
  doc = doc.replace(/&#39;/g, "'");

  // 10. Trim whitespace and multiple newlines
  doc = doc.replace(/\r/g, "");
  // Reduce 3+ newlines to exactly 2
  doc = doc.replace(/\n\s*\n\s*\n+/g, "\n\n");
  doc = doc.trim();

  // Prepend title if it exists and isn't already the first line
  if (pageTitle && !doc.startsWith(`# ${pageTitle}`)) {
    doc = `# ${pageTitle}\n\n${doc}`;
  }

  return doc;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetPath = searchParams.get("url") || "/";

  try {
    const origin = request.nextUrl.origin;
    const targetUrl = new URL(targetPath, origin);

    // Set headers explicitly requesting text/html to avoid recursion loop
    const fetchHeaders = new Headers();
    fetchHeaders.set("accept", "text/html");

    // Forward the cookie header if it is set (e.g. for language choice)
    const cookie = request.headers.get("cookie");
    if (cookie) {
      fetchHeaders.set("cookie", cookie);
    }

    const res = await fetch(targetUrl.toString(), {
      headers: fetchHeaders,
      redirect: "follow",
    });

    if (!res.ok) {
      return new NextResponse(
        `Failed to fetch page content: ${res.statusText}`,
        {
          status: res.status,
          headers: { "Content-Type": "text/plain" },
        }
      );
    }

    const html = await res.text();
    const markdown = convertHtmlToMarkdown(html);

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
      },
    });
  } catch (error) {
    console.error("Markdown negotiation error:", error);
    return new NextResponse(
      `Error during markdown conversion: ${error instanceof Error ? error.message : "Unknown error"}`,
      {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      }
    );
  }
}
