"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";

interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export default function TodosPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [completedFilter, setCompletedFilter] = useState<
    "all" | "true" | "false"
  >("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["todos", page, search, completedFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      if (search) params.set("search", search);
      if (completedFilter !== "all") params.set("completed", completedFilter);

      const response = await fetch(`/api/todos?${params}`);
      if (!response.ok) throw new Error("Failed to fetch todos");
      return response.json() as Promise<{
        data: Todo[];
        pagination: PaginationInfo;
      }>;
    },
  });

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/todos/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setDeleteOpen(false);
      setDeleteId(null);
      // Refetch todos
      router.refresh();
    } catch (error) {
      alert(
        "Error deleting todo: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  const columns: ColumnDef<Todo>[] = useMemo(
    () => [
      {
        id: "title",
        header: "Title",
        cell: (info) => (
          <Link
            href={`/todos/${info.row.original.id}`}
            className="text-blue-600 hover:underline"
          >
            {info.getValue() as string}
          </Link>
        ),
        accessorKey: "title",
      },
      {
        id: "completed",
        header: "Status",
        cell: (info) => {
          const isCompleted = info.getValue() as boolean;
          return isCompleted ? "✓ Completed" : "Pending";
        },
        accessorKey: "completed",
      },
      {
        id: "createdAt",
        header: "Created",
        cell: (info) => {
          const date = new Date(info.getValue() as string);
          return date.toLocaleDateString();
        },
        accessorKey: "createdAt",
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const todoId = info.row.original.id;
          return (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push(`/todos/${todoId}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setDeleteId(todoId);
                  setDeleteOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    [router]
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">My Todos</h1>
          <button
            onClick={() => signOut()}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <Label
              htmlFor="search"
              className="block text-sm font-medium text-slate-700"
            >
              Search
            </Label>
            <Input
              id="search"
              type="text"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="mt-1"
            />
          </div>

          <div className="flex-1">
            <Label
              htmlFor="filter"
              className="block text-sm font-medium text-slate-700"
            >
              Filter by status
            </Label>
            <select
              id="filter"
              value={completedFilter}
              onChange={(e) => {
                setCompletedFilter(e.target.value as "all" | "true" | "false");
                setPage(1);
              }}
              className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <Link href="/todos/create">
            <Button>Create Todo</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center text-slate-500">Loading...</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-sm font-semibold text-slate-900"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-200 hover:bg-slate-50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-sm text-slate-700"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing {(page - 1) * (data?.pagination.pageSize || 10) + 1} to{" "}
                {Math.min(
                  page * (data?.pagination.pageSize || 10),
                  data?.pagination.total || 0
                )}{" "}
                of {data?.pagination.total || 0} results
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-2 text-sm text-slate-600">
                  Page {page} of {data?.pagination.totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setPage(
                      Math.min(data?.pagination.totalPages || 1, page + 1)
                    )
                  }
                  disabled={
                    page === data?.pagination.totalPages ||
                    data?.pagination.totalPages === 0
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <DeleteConfirmationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}
