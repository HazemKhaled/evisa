/**
 * Blog Post Validation Utilities
 *
 * Validates blog post frontmatter and content according to schema requirements.
 * Provides detailed error messages for debugging and content creation.
 */

export interface BlogPostValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface RequiredFrontmatterFields {
  title: string;
  description: string;
  destinations?: string[];
  image: string;
  tags: string[];
  author: string;
  publishedAt: string;
}

/**
 * Validate blog post frontmatter according to schema requirements
 */
export function validateBlogPostFrontmatter(
  frontmatter: Record<string, unknown>,
  slug: string
): BlogPostValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  const requiredFields = [
    "title",
    "description",
    "image",
    "tags",
    "author",
    "publishedAt",
  ];

  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      errors.push(`Missing required field: ${field}`);
    } else if (
      typeof frontmatter[field] === "string" &&
      !frontmatter[field].toString().trim()
    ) {
      errors.push(`Required field '${field}' cannot be empty`);
    }
  }

  // Type validation
  if (frontmatter.title && typeof frontmatter.title !== "string") {
    errors.push(`Field 'title' must be a string`);
  }

  if (frontmatter.description && typeof frontmatter.description !== "string") {
    errors.push(`Field 'description' must be a string`);
  }

  if (frontmatter.image && typeof frontmatter.image !== "string") {
    errors.push(`Field 'image' must be a string (URL or path)`);
  }

  if (frontmatter.author && typeof frontmatter.author !== "string") {
    errors.push(`Field 'author' must be a string`);
  }

  if (frontmatter.publishedAt && typeof frontmatter.publishedAt !== "string") {
    errors.push(`Field 'publishedAt' must be a string (ISO date format)`);
  }

  // Array fields validation
  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    errors.push(`Field 'tags' must be an array`);
  } else if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
    if (frontmatter.tags.length === 0) {
      warnings.push(
        `Field 'tags' is empty - consider adding relevant tags for better discoverability`
      );
    }

    // Validate each tag
    frontmatter.tags.forEach((tag: unknown, index: number) => {
      if (typeof tag !== "string") {
        errors.push(`Tag at index ${index} must be a string`);
      } else if (!tag.trim()) {
        errors.push(`Tag at index ${index} cannot be empty`);
      }
    });
  }

  if (frontmatter.destinations && !Array.isArray(frontmatter.destinations)) {
    errors.push(`Field 'destinations' must be an array`);
  } else if (
    frontmatter.destinations &&
    Array.isArray(frontmatter.destinations)
  ) {
    // Validate each destination code
    frontmatter.destinations.forEach((dest: unknown, index: number) => {
      if (typeof dest !== "string") {
        errors.push(`Destination at index ${index} must be a string`);
      } else if (!dest.trim()) {
        errors.push(`Destination at index ${index} cannot be empty`);
      } else if (dest.length !== 2 && dest.length !== 3) {
        warnings.push(
          `Destination '${dest}' should be a 2 or 3-letter country code`
        );
      }
    });
  }

  if (frontmatter.related_visas && !Array.isArray(frontmatter.related_visas)) {
    errors.push(`Field 'related_visas' must be an array`);
  }

  // Date validation
  if (frontmatter.publishedAt && typeof frontmatter.publishedAt === "string") {
    const publishedDate = new Date(frontmatter.publishedAt);
    if (isNaN(publishedDate.getTime())) {
      errors.push(
        `Field 'publishedAt' must be a valid date (received: ${frontmatter.publishedAt})`
      );
    } else {
      // Check if date is too far in the future
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      if (publishedDate > oneYearFromNow) {
        warnings.push(
          `Published date is more than a year in the future: ${frontmatter.publishedAt}`
        );
      }
    }
  }

  if (frontmatter.lastUpdated && typeof frontmatter.lastUpdated === "string") {
    const updatedDate = new Date(frontmatter.lastUpdated);
    if (isNaN(updatedDate.getTime())) {
      errors.push(
        `Field 'lastUpdated' must be a valid date (received: ${frontmatter.lastUpdated})`
      );
    }
  }

  // Content length validation
  if (frontmatter.title && typeof frontmatter.title === "string") {
    if (frontmatter.title.length < 10) {
      warnings.push(
        `Title is very short (${frontmatter.title.length} characters) - consider making it more descriptive`
      );
    } else if (frontmatter.title.length > 100) {
      warnings.push(
        `Title is very long (${frontmatter.title.length} characters) - consider shortening for better SEO`
      );
    }
  }

  if (frontmatter.description && typeof frontmatter.description === "string") {
    if (frontmatter.description.length < 50) {
      warnings.push(
        `Description is short (${frontmatter.description.length} characters) - consider expanding for better SEO`
      );
    } else if (frontmatter.description.length > 200) {
      warnings.push(
        `Description is very long (${frontmatter.description.length} characters) - consider shortening for better SEO`
      );
    }
  }

  // Image URL validation
  if (frontmatter.image && typeof frontmatter.image === "string") {
    const imageUrl = frontmatter.image;
    if (!imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
      warnings.push(
        `Image path should be absolute URL or start with '/' (received: ${imageUrl})`
      );
    }
  }

  // Slug consistency check
  if (frontmatter.title && typeof frontmatter.title === "string") {
    const titleSlug = frontmatter.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    if (!slug.includes(titleSlug.substring(0, 20))) {
      warnings.push(
        `Slug '${slug}' doesn't match title '${frontmatter.title}' - consider using a more descriptive filename`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate blog post content structure
 */
export function validateBlogPostContent(
  content: string,
  _slug: string
): BlogPostValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Content length validation
  if (!content || content.trim().length === 0) {
    errors.push(`Blog post content cannot be empty`);
  } else if (content.trim().length < 100) {
    warnings.push(
      `Content is very short (${content.length} characters) - consider adding more detail`
    );
  }

  // Basic MDX structure validation
  if (content && content.includes("```")) {
    const codeBlocks = content.match(/```[\s\S]*?```/g);
    if (codeBlocks) {
      codeBlocks.forEach((block, index) => {
        if (!block.includes("\n")) {
          warnings.push(
            `Code block ${index + 1} might be malformed - should have language specification and content`
          );
        }
      });
    }
  }

  // Check for common markdown issues
  if (content && content.includes("](")) {
    const links = content.match(/\[([^\]]*)\]\(([^)]*)\)/g);
    if (links) {
      links.forEach((link, index) => {
        const urlMatch = link.match(/\]\(([^)]*)\)/);
        if (urlMatch && urlMatch[1]) {
          const url = urlMatch[1];
          if (url.includes(" ")) {
            errors.push(
              `Link ${index + 1} has spaces in URL: ${url} - URLs should be properly encoded`
            );
          }
        }
      });
    }
  }

  // Check for heading structure
  const headings = content.match(/^#{1,6}\s+.+$/gm);
  if (headings) {
    let hasH1 = false;
    headings.forEach(heading => {
      if (heading.startsWith("# ")) {
        if (hasH1) {
          warnings.push(
            `Multiple H1 headings found - consider using H2-H6 for subsections`
          );
        }
        hasH1 = true;
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Comprehensive blog post validation
 */
export function validateBlogPost(
  frontmatter: Record<string, unknown>,
  content: string,
  slug: string
): BlogPostValidationResult {
  const frontmatterResult = validateBlogPostFrontmatter(frontmatter, slug);
  const contentResult = validateBlogPostContent(content, slug);

  return {
    isValid: frontmatterResult.isValid && contentResult.isValid,
    errors: [...frontmatterResult.errors, ...contentResult.errors],
    warnings: [...frontmatterResult.warnings, ...contentResult.warnings],
  };
}

/**
 * Format validation results for logging
 */
export function formatValidationResult(
  result: BlogPostValidationResult,
  slug: string
): string {
  let output = `\n--- Blog Post Validation: ${slug} ---\n`;

  if (result.isValid) {
    output += `✅ Valid\n`;
  } else {
    output += `❌ Invalid (${result.errors.length} errors)\n`;
  }

  if (result.errors.length > 0) {
    output += `\nErrors:\n`;
    result.errors.forEach((error, index) => {
      output += `  ${index + 1}. ${error}\n`;
    });
  }

  if (result.warnings.length > 0) {
    output += `\nWarnings:\n`;
    result.warnings.forEach((warning, index) => {
      output += `  ${index + 1}. ${warning}\n`;
    });
  }

  output += `\n--- End Validation ---\n`;
  return output;
}
