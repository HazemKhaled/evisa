import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-12 mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-8 mb-4 text-2xl font-bold tracking-tight text-gray-900"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-600" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="mb-6 list-inside list-disc space-y-2 text-gray-600"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-6 list-inside list-decimal space-y-2 text-gray-600"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-lg leading-relaxed" {...props}>
        {children}
      </li>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-blue-500 pl-6 text-gray-700 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    ...components,
  };
}
