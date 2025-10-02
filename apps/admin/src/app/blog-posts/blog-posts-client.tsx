"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type BlogPost } from "@repo/database";
import { Button } from "@repo/ui";
import { EnhancedDataTable } from "@/components/data-table/enhanced-data-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { BlogPostDialog } from "./blog-post-dialog";
import { deleteBlogPost } from "@/actions/blog-posts";

interface BlogPostWithI18n extends BlogPost {
  titleEn?: string;
}

interface PaginatedBlogPosts {
  data: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface BlogPostsClientProps {
  paginatedData: PaginatedBlogPosts;
}

export function BlogPostsClient({
  paginatedData,
}: BlogPostsClientProps): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const currentSearch = searchParams.get("search") || "";

  const handlePageChange = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page + 1));
    startTransition(() => {
      router.push(`/blog-posts?${params.toString()}`);
    });
  };

  const handlePageSizeChange = (pageSize: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", String(pageSize));
    params.set("page", "1");
    startTransition(() => {
      router.push(`/blog-posts?${params.toString()}`);
    });
  };

  const handleSearchChange = (search: string): void => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`/blog-posts?${params.toString()}`);
    });
  };

  const handleEdit = (post: BlogPost): void => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCreate = (): void => {
    setSelectedPost(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setIsDeleting(id);
    const result = await deleteBlogPost(id);

    if (!result.success) {
      alert(result.error ?? "Failed to delete blog post");
    }

    setIsDeleting(null);
    router.refresh();
  };

  const columns: ColumnDef<BlogPostWithI18n>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div className="w-12">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Slug" />
      ),
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue("slug")}</div>
      ),
    },
    {
      accessorKey: "titleEn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title (EN)" />
      ),
      cell: ({ row }) => (
        <div className="max-w-md truncate">{row.original.titleEn || "N/A"}</div>
      ),
    },
    {
      accessorKey: "author",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Author" />
      ),
      cell: ({ row }) => <div>{row.getValue("author")}</div>,
    },
    {
      accessorKey: "isPublished",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isPublished = row.getValue("isPublished") as boolean;
        return (
          <span
            className={`rounded px-2 py-1 text-xs font-medium ${
              isPublished
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Published At" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("publishedAt") as Date;
        return (
          <div>{date ? format(new Date(date), "MMM dd, yyyy") : "N/A"}</div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original;
        const isCurrentlyDeleting = isDeleting === post.id;
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => handleEdit(post)}
              variant="ghost"
              size="sm"
              disabled={isCurrentlyDeleting}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(post.id)}
              variant="ghost"
              size="sm"
              disabled={isCurrentlyDeleting}
            >
              {isCurrentlyDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">
            Manage blog posts and articles
          </p>
        </div>
        <Button onClick={handleCreate}>Create Blog Post</Button>
      </div>

      <EnhancedDataTable
        columns={columns}
        data={paginatedData.data}
        pageCount={paginatedData.totalPages}
        pageIndex={paginatedData.page - 1}
        pageSize={paginatedData.pageSize}
        total={paginatedData.total}
        searchValue={currentSearch}
        searchPlaceholder="Search by slug, author, or destination..."
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearchChange={handleSearchChange}
      />

      <BlogPostDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
      />
    </div>
  );
}
