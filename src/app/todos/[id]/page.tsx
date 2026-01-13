"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTodoDetailStore } from "@/lib/store";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TodoDetailPage() {
  const params = useParams();
  const todoId = parseInt(params.id as string);
  const { todo, setTodo } = useTodoDetailStore();

  const { data, isLoading } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: async () => {
      const response = await fetch(`/api/todos/${todoId}`);
      if (!response.ok) throw new Error("Failed to fetch todo");
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      setTodo(data);
    }
  }, [data, setTodo]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Todo Detail</h1>
            <button
              onClick={() => signOut()}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Sign out
            </button>
          </div>
        </nav>
        <div className="flex items-center justify-center py-12">Loading...</div>
      </div>
    );
  }

  const currentTodo = todo || data;

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Todo Detail</h1>
          <button
            onClick={() => signOut()}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex gap-2">
          <Link href="/todos">
            <Button variant="secondary">Back to todos</Button>
          </Link>
          <Link href={`/todos/${todoId}/edit`}>
            <Button>Edit</Button>
          </Link>
        </div>

        {currentTodo && (
          <div className="rounded-lg border border-slate-200 p-6">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              {currentTodo.title}
            </h2>

            <div className="mb-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-600">Status</p>
                <p className="mt-1 text-lg text-slate-900">
                  {currentTodo.completed ? "✓ Completed" : "Pending"}
                </p>
              </div>

              {currentTodo.description && (
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Description
                  </p>
                  <p className="mt-1 text-slate-700">
                    {currentTodo.description}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-slate-600">Created</p>
                <p className="mt-1 text-slate-700">
                  {new Date(currentTodo.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
