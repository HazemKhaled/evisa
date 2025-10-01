"use client";

import { useState } from "react";
import { type BlogPost } from "@repo/database";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { BlogPostDialog } from "./blog-post-dialog";
import { deleteBlogPost } from "@/actions/blog-posts";

interface BlogPostWithI18n extends BlogPost {
  titleEn?: string;
}

interface BlogPostsClientProps {
  posts: BlogPostWithI18n[];
}

export function BlogPostsClient({
  posts,
}: BlogPostsClientProps): React.JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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

    const result = await deleteBlogPost(id);
    if (result.success) {
      alert("Blog post deleted successfully");
    } else {
      alert(`Failed to delete: ${result.error}`);
    }
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
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(post)}
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-sm text-gray-600">
            Manage blog posts and articles
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Blog Post
        </button>
      </div>

      <DataTable columns={columns} data={posts} />

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
