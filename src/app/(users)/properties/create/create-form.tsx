"use client";

import { propertySchema, propertyWithVariantSchema } from "@/form-schema";
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
import { createProperty } from "@/app/actions";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateForm() {
  const formRef = useRef(null);
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof propertyWithVariantSchema>>({
    resolver: zodResolver(propertyWithVariantSchema),
    defaultValues: {
      name: "",
      monthly_rent: 0,
      electricty_bill_included: true,
      electricty_initial_value: 0,
    },
  });

  async function onSubmit() {
    if (!formRef.current) {
      return;
    }

    setPending(true);
    const response = await createProperty(form.getValues());

    if (response.status == 201) {
      return router.push("/properties");
    }

    setPending(false);

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
        className="w-2/3 space-y-6"
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

        <FormField
          control={form.control}
          name="electricty_bill_included"
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center space-y-0">
              <Checkbox
                id="electricty_bill_included"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel htmlFor="electricty_bill_included">
                Electricity bill included in monthly rent ?
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="electricty_initial_value"
          render={({ field }) => (
            <FormItem hidden={ form.getValues('electricty_bill_included') == true } >
              <FormLabel>Electricity Initial Value</FormLabel>
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
