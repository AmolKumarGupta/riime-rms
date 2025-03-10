import { cn } from "@/lib/utils";
import React from "react";

export default function CenteredLayout({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <main
      className={cn(
        "sm:pt-8 pb-8 px-2 w-full sm:max-w-[1024px] mx-auto",
        className
      )}
      {...props}
    />
  );
}
