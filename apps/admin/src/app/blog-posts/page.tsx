import { auth } from "@repo/auth";
import { redirect } from "next/navigation";
import { getBlogPosts } from "@/actions/blog-posts";
import { BlogPostsClient } from "./blog-posts-client";

export default async function BlogPostsPage(): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPostsClient posts={posts} />
    </div>
  );
}
