"use client";

import { propertySchema } from "@/form-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProperty } from "@/app/actions";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type PageProps = {
  property: {
    id: number;
    name: string;
    monthly_rent: number;
  };
  className: ClassNameValue;
  onSave: CallableFunction | null | undefined;
};

export default function UpdateForm({ property, className, onSave }: PageProps) {
  const formRef = useRef(null);
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: property,
  });

  async function onSubmit() {
    if (!formRef.current) {
      return;
    }

    const fd = new FormData(formRef.current);

    setPending(true);
    const response = await updateProperty(property.id, fd);
    setPending(false);

    if (response.status == 200) {
      if (onSave) onSave();
      return router.push("/properties");
    }

    if (response?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error,
      });
      return;
    }

    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-2/3 space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Room 1" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthly_rent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Rent</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>Save</>
          )}
        </Button>
      </form>
    </Form>
  );
}
