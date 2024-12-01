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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type Tenant = {
  id: number;
  name: string;
  billing_date: Date;
  starting_date: Date;
  property_id: number | null;
};

export const columns: ColumnDef<Tenant>[] = [
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
    header: "Tenant Name",
  },
  {
    accessorKey: "property_id",
    header: "Property",
    cell: () => null
  },
  {
    accessorKey: "billing_date",
    header: "Billing Date",
    cell: ({ row }) => (new Date(row.getValue("billing_date"))).toDateString(),
  },
  {
    accessorKey: "starting_date",
    header: "Starting Date",
    cell: ({ row }) => (new Date(row.getValue("starting_date"))).toDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      const [open, setOpen] = useState(false);
      const [openSheet, setOpenSheet] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);

      const handleDelete = async (e: any) => {
        try {
          setIsDeleting(true);
          // await deleteTenant(row.getValue("id"));
          setOpen(false);

          toast({
            title: "Tenant deleted",
            description: "The tenant has been successfully deleted.",
          });
        } catch (err) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        }

        setIsDeleting(false);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setOpenSheet(true)}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setOpen(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Tenant</DialogTitle>
                <DialogDescription className="sr-only">
                  delete tenant
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
                  onClick={handleDelete}
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

          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetContent className="w-full sm:w-3/4">
              <SheetHeader>
                <SheetTitle>Edit {row.getValue("name")}</SheetTitle>
                <SheetDescription className="sr-only">
                  Edit this tenant
                </SheetDescription>
              </SheetHeader>

              {/* <UpdateForm
                className="mt-4"
                tenant={{
                  id: row.getValue("id"),
                  name: row.getValue("name"),
                  monthly_rent: row.getValue("monthly_rent"),
                }}
                onSave={() => setOpenSheet(false)}
              /> */}
            </SheetContent>
          </Sheet>
        </DropdownMenu>
      );
    },
  },
];