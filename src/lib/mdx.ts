import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

export interface MDXPageData {
  content: string;
  frontmatter: {
    title: string;
    description: string;
    keywords?: string;
    author?: string;
    type?: string;
    lastUpdated?: string;
    [key: string]: unknown;
  };
}

/**
 * Read and parse an MDX file from the contents/[locale]/pages directory
 */
export async function getMDXPage(
  fileName: string,
  locale?: string
): Promise<MDXPageData> {
  // If locale is provided, use locale-specific path, otherwise fallback to old structure
  const filePath = locale
    ? path.join(process.cwd(), "src", "contents", locale, "pages", fileName)
    : path.join(process.cwd(), "src", "contents", "pages", fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `MDX file not found: ${fileName} for locale: ${locale || "default"}`
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  return {
    content,
    frontmatter: frontmatter as MDXPageData["frontmatter"],
  };
}
