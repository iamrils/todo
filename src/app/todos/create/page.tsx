"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TodoForm } from "@/components/TodoForm";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateTodoPage() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: { title: string; description: string | null }) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      return response.json();
    },
    onSuccess: () => {
      router.push("/todos");
    },
  });

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Create Todo</h1>
          <button
            onClick={() => signOut()}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/todos">
            <Button variant="secondary">Back to todos</Button>
          </Link>
        </div>

        <TodoForm
          onSubmit={(data) => mutation.mutateAsync(data)}
          isLoading={mutation.isPending}
        />

        {mutation.isError && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "An error occurred"}
          </div>
        )}
      </div>
    </div>
  );
}
