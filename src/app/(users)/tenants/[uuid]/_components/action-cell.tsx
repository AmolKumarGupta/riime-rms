"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React from "react";

const ActionCell = ({ children, ...props }: DropdownMenuProps) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ActionCellLinkProps extends LinkProps {
  children: React.ReactNode;
}

const ActionCellLink = ({ children, ...props }: ActionCellLinkProps) => {
  return (
    <DropdownMenuItem className="cursor-pointer" asChild>
      <Link {...props}>{children}</Link>
    </DropdownMenuItem>
  );
};

export { ActionCell, ActionCellLink };
