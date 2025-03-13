import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { TaskStatus } from "@/features/tasks/types";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        new: "bg-gradient-to-b from-gray-600 to-gray-700 text-primary-foreground hover:from-gray-700 hover:to-gray-800",
        resolved:
          "bg-gradient-to-b from-green-600 to-green-700 text-primary-foreground hover:from-green-700 hover:to-green-800",
        inProgress:
          "bg-gradient-to-b from-yellow-600 to-yellow-700 text-primary-foreground hover:from-yellow-700 hover:to-yellow-800",
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [TaskStatus.TODO]:
          "border-transparent bg-red-400 text-primary hover:bg-red-400/80",
        [TaskStatus.IN_PROGRESS]:
          "border-transparent bg-yellow-400 text-primary hover:bg-yellow-400/80",

        [TaskStatus.IN_REVIEW]:
          "border-transparent bg-blue-400 text-primary hover:bg-blue-400/80",
        [TaskStatus.DONE]:
          "border-transparent bg-emerald-400 text-primary hover:bg-emerald-400/80",

        [TaskStatus.BACKLOG]:
          "border-transparent bg-pink-400 text-primary hover:bg-pink-400/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
