import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
 * Read and parse an MDX file from the contents/pages directory
 */
export async function getMDXPage(fileName: string): Promise<MDXPageData> {
  const filePath = path.join(process.cwd(), 'src', 'contents', 'pages', fileName);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`MDX file not found: ${fileName}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);
  
  return {
    content,
    frontmatter: frontmatter as MDXPageData['frontmatter'],
  };
}