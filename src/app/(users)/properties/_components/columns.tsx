"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Loader2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProperty } from "../actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type Property = {
  id: number;
  name: string;
  monthly_rent: number | null;
};

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Property Name",
  },
  {
    accessorKey: "monthly_rent",
    header: "Monthly Rent",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      const [open, setOpen] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuSeparator /> */}

              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>

              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Property</DialogTitle>
              <DialogDescription className="sr-only">
                delete property
              </DialogDescription>
            </DialogHeader>

            <div>Do you really want to delete '{row.getValue("name")}' ?</div>

            <DialogFooter className="gap-2 justify-between sm:justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>

              <Button
                type="button"
                variant="destructive"
                onClick={async (e) => {
                  try {
                    setIsDeleting(true);
                    await deleteProperty(row.getValue("id"));
                    setOpen(false);

                  } catch (err) {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "Something went wrong",
                    });
                  }
                  
                  setIsDeleting(false);
                }}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting
                  </>
                ) : (
                  <>Yes</>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
