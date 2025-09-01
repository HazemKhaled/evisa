import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXPageData } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface MDXContentProps {
  data: MDXPageData;
  className?: string;
  isRTL?: boolean;
}

export function MDXContent({ data, className, isRTL }: MDXContentProps) {
  const components = {
    h1: ({ children, ...props }: React.ComponentProps<'h1'>) => (
      <h1
        className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.ComponentProps<'h2'>) => (
      <h2
        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6 mt-12"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.ComponentProps<'h3'>) => (
      <h3
        className="text-2xl font-bold tracking-tight text-gray-900 mb-4 mt-8"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: React.ComponentProps<'p'>) => (
      <p className="text-lg text-gray-600 mb-6 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: React.ComponentProps<'ul'>) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-600" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentProps<'ol'>) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-600" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.ComponentProps<'li'>) => (
      <li className="text-lg leading-relaxed" {...props}>
        {children}
      </li>
    ),
    a: ({ children, href, ...props }: React.ComponentProps<'a'>) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: React.ComponentProps<'blockquote'>) => (
      <blockquote
        className="border-l-4 border-blue-500 pl-6 italic text-gray-700 my-6 bg-blue-50 py-4"
        {...props}
      >
        {children}
      </blockquote>
    ),
    strong: ({ children, ...props }: React.ComponentProps<'strong'>) => (
      <strong className="font-semibold text-gray-900" {...props}>
        {children}
      </strong>
    ),
  };

  return (
    <div className={cn('prose prose-lg max-w-none', isRTL && 'text-right', className)}>
      <MDXRemote source={data.content} components={components} />
    </div>
  );
}