import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        // layout
        "flex h-10 w-full rounded-md px-3 py-2 text-sm",

        // base colors
        "bg-white text-slate-900 border border-slate-300",

        // placeholder
        "placeholder:text-slate-400",

        // focus
        "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900",

        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        // animation
        "transition-colors duration-200",

        // autofill fix (IMPORTANT)
        "autofill:bg-white",

        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
export { Input };
