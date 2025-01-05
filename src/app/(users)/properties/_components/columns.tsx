"use client";

import { ColumnDef, Row } from "@tanstack/react-table";

import { Loader2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
} from "@/components/ui/dialog";
import { deleteProperty } from "../actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UpdateForm from "./update-form";

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
      return <ActionCell row={row} />;
    },
  },
];

function ActionCell({ row }: { row: Row<Property> }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteProperty(row.getValue("id"));
      setOpen(false);

      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted.",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription className="sr-only">
              delete property
            </DialogDescription>
          </DialogHeader>

          <div>
            Do you really want to delete &apos;{row.getValue("name")}&apos; ?
          </div>

          <DialogFooter className="gap-2 justify-between sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>

            <Button type="button" variant="destructive" onClick={handleDelete}>
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
              Edit this property
            </SheetDescription>
          </SheetHeader>

          <UpdateForm
            className="mt-4"
            property={{
              id: row.getValue("id"),
              name: row.getValue("name"),
              monthly_rent: row.getValue("monthly_rent"),
            }}
            onSave={() => setOpenSheet(false)}
          />
        </SheetContent>
      </Sheet>
    </DropdownMenu>
  );
}
