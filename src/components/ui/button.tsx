import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md",
    "text-sm font-medium",
    "ring-offset-white transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:scale-[1.02] active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Primary */
        default:
          "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-indigo-500/40",

        /** Secondary */
        secondary:
          "bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-400/40",

        /** OUTLINE PRIMARY */
        outline:
          "border border-gray-600 text-gray-600 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500/40",

        /** Ghost */
        ghost:
          "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400/40",

        /** Success */
        success:
          "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700 focus-visible:ring-emerald-500/40",

        /** OUTLINE SUCCESS */
        "outline-success":
          "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-500/40",

        /** Danger */
        danger:
          "bg-red-600 text-white shadow-sm hover:bg-red-500 active:bg-red-700 focus-visible:ring-red-500/40",

        /** OUTLINE DANGER */
        "outline-danger":
          "border border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100 focus-visible:ring-red-500/40",

        /** Link */
        link: "text-indigo-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
