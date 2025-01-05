"use client";

import { tenantWithPropertySchema } from "@/form-schema";
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
import { updateTenant } from "@/app/actions";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { getUnAssignedPropertiesWithTenantProperty } from "../actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PageProps = {
  tenant: {
    id: number;
    name: string;
    billing_date: Date;
    starting_date: Date;
    property_id: number | null;
  };
  className: ClassNameValue;
  onSave: CallableFunction | null | undefined;
};

type SelectPropertyType = {
  id: number;
  name: string;
}[];

export default function UpdateForm({ tenant, onSave }: PageProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [assignableProperties, setAssignableProperties] =
    useState<SelectPropertyType>([]);

  const form = useForm<z.infer<typeof tenantWithPropertySchema>>({
    resolver: zodResolver(tenantWithPropertySchema),
    defaultValues: tenant,
  });

  useEffect(() => {
    getUnAssignedPropertiesWithTenantProperty(tenant.id).then((properties) => {
      if (!properties) return;
      setAssignableProperties(properties);
    });
  }, [tenant.id]);

  async function onSubmit() {
    setPending(true);
    const response = await updateTenant(tenant.id, form.getValues());
    setPending(false);

    if (response.status == 200) {
      if (onSave) onSave();
      return router.push("/tenants");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tenant Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Jon Doe" {...field} />
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
          name="property_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "" : val)
                  }
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger className="w-[240px]" tabIndex={0}>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Properties</SelectLabel>
                      <SelectItem value="none">No Property</SelectItem>
                      {assignableProperties.map((property) => (
                        <SelectItem
                          value={property.id.toString()}
                          key={property.id}
                        >
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Property can be select anytime.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="billing_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Date</FormLabel>
              <FormControl>
                <>
                  <input
                    type="hidden"
                    name={field.name}
                    value={field.value.toString()}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(v) =>
                          form.setValue("billing_date", v ? v : new Date())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="starting_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Date</FormLabel>
              <FormControl>
                <>
                  <input
                    type="hidden"
                    name={field.name}
                    value={field.value.toString()}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex w-[240px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(v) =>
                          form.setValue("starting_date", v ? v : new Date())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </>
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
