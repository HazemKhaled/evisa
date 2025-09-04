import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BlogTags } from './blog-tags';

interface BlogCardProps {
  post: {
    slug: string;
    frontmatter: {
      title: string;
      description: string;
      image?: string;
      tags?: string[];
      destinations?: string[];
      author: string;
      publishedAt: string;
    };
  };
  locale: string;
  className?: string;
}

export function BlogCard({ post, locale, className }: BlogCardProps) {
  const postUrl = `/${locale}/blog/${post.slug}`;
  const publishedDate = new Date(post.frontmatter.publishedAt).toLocaleDateString(locale);

  return (
    <article className={cn('group cursor-pointer', className)}>
      <Link href={postUrl} className="block">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
          {/* Image */}
          {post.frontmatter.image && (
            <div className="aspect-video overflow-hidden">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={400}
                height={225}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h2 className="mb-3 text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.frontmatter.title}
            </h2>

            {/* Description */}
            <p className="mb-4 line-clamp-3 text-gray-600">
              {post.frontmatter.description}
            </p>

            {/* Tags */}
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="mb-4">
                <BlogTags
                  tags={post.frontmatter.tags.slice(0, 3)}
                  locale={locale}
                  className="text-xs"
                />
              </div>
            )}

            {/* Destinations */}
            {post.frontmatter.destinations && post.frontmatter.destinations.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {post.frontmatter.destinations.slice(0, 2).map((destination, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                    >
                      📍 {destination}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="font-medium">{post.frontmatter.author}</span>
              <time dateTime={post.frontmatter.publishedAt}>
                {publishedDate}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}