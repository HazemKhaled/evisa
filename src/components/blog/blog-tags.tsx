import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BlogTagsProps {
  tags: string[];
  currentTag?: string;
  locale: string;
  className?: string;
}

export function BlogTags({ tags, currentTag, locale, className }: BlogTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => {
        const isActive = currentTag === tag.toLowerCase();
        const tagUrl = `/${locale}/blog/t/${encodeURIComponent(tag.toLowerCase())}`;
        
        return (
          <Link
            key={tag}
            href={tagUrl}
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
}