import { create } from "zustand";

interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

interface TodoDetailStore {
  todo: Todo | null;
  setTodo: (todo: Todo | null) => void;
  updateTodo: (todo: Partial<Todo>) => void;
  clearTodo: () => void;
}

/**
 * Zustand store for Todo detail state management
 *
 * JUSTIFICATION:
 * - Used for temporary client-side state of the todo being viewed/edited
 * - Provides simple, lightweight state management without Redux complexity
 * - Enables smooth UI updates when navigating between todo detail and edit pages
 * - Alternatives considered:
 *   - React Context: Would be overkill for single-entity state
 *   - Redux: Too verbose for this simple use case
 *   - React Query cache: Less suitable for mutable UI state updates
 */
export const useTodoDetailStore = create<TodoDetailStore>((set) => ({
  todo: null,
  setTodo: (todo) => set({ todo }),
  updateTodo: (updates) =>
    set((state) => ({
      todo: state.todo ? { ...state.todo, ...updates } : null,
    })),
  clearTodo: () => set({ todo: null }),
}));
