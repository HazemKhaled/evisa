import { auth } from "@repo/auth/server";
import { redirect } from "next/navigation";
import { getBlogPostsPaginated } from "@/actions/blog-posts";
import { BlogPostsClient } from "./blog-posts-client";

interface BlogPostsPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function BlogPostsPage({
  searchParams,
}: BlogPostsPageProps): Promise<React.JSX.Element> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;
  const search = params.search || "";

  const paginatedData = await getBlogPostsPaginated({ page, pageSize, search });

  return (
    <div>
      <BlogPostsClient paginatedData={paginatedData} />
    </div>
  );
}
