"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface TodoFormProps {
  initialData?: {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
  };
  onSubmit: (data: {
    title: string;
    description: string | null;
    completed?: boolean;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function TodoForm({ initialData, onSubmit, isLoading }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      completed: initialData?.completed || false,
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onFormSubmit = async (data: any) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter todo title"
          className="mt-1"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter todo description (optional)"
          className="mt-1"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="completed"
          {...register("completed")}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="completed" className="m-0 cursor-pointer">
          Mark as complete
        </Label>
      </div>

      <Button variant="outline" type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Todo"}
      </Button>
    </form>
  );
}
