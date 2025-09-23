DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_slug_unique'
    ) THEN
        ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug");
    END IF;
END $$;