import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXPageData } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface MDXContentProps {
  data: MDXPageData;
  className?: string;
}

export function MDXContent({ data, className }: MDXContentProps) {
  const components = {
    h1: ({ children, ...props }: React.ComponentProps<"h1">) => (
      <h1
        className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.ComponentProps<"h2">) => (
      <h2
        className="mt-12 mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className="mt-8 mb-4 text-2xl font-bold tracking-tight text-gray-900"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: React.ComponentProps<"p">) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-600" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
      <ul
        className="mb-6 list-inside list-disc space-y-2 text-gray-600"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentProps<"ol">) => (
      <ol
        className="mb-6 list-inside list-decimal space-y-2 text-gray-600"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.ComponentProps<"li">) => (
      <li className="text-lg leading-relaxed" {...props}>
        {children}
      </li>
    ),
    a: ({ children, href, ...props }: React.ComponentProps<"a">) => (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({
      children,
      ...props
    }: React.ComponentProps<"blockquote">) => (
      <blockquote
        className="my-6 border-l-4 border-blue-500 bg-blue-50 py-4 pl-6 text-gray-700 italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    strong: ({ children, ...props }: React.ComponentProps<"strong">) => (
      <strong className="font-semibold text-gray-900" {...props}>
        {children}
      </strong>
    ),
  };

  return (
    <div className={cn("prose prose-lg max-w-none", className)}>
      <MDXRemote source={data.content} components={components} />
    </div>
  );
}
