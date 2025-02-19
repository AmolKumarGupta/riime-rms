"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInvoiceSchema } from "@/form-schema";
import { months } from "@/lib/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { rentVariant, tenant as tenantFacade } from "@/db/facades";
import { useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { createInvoice } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type PageProps = {
  tenant: Awaited<ReturnType<typeof tenantFacade.firstUsingUuidWithProperty>>;
  propertyVariants: Awaited<ReturnType<typeof rentVariant.all>>;
};

export default function CreateForm({ tenant, propertyVariants }: PageProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const electricityVariant = useMemo(() => {
    return propertyVariants.find((variant) => variant.name === "electricity");
  }, [propertyVariants]);

  const form = useForm<z.infer<typeof createInvoiceSchema>>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      tenant_id: tenant?.id,
      property_id: tenant?.property_id ?? undefined,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      rent: tenant?.property?.monthly_rent ?? 0,
      prev_electricity_reading:
        electricityVariant && electricityVariant.current
          ? electricityVariant.current
          : 0,
      cur_electricity_reading: 0,
      electricity_rent: 0,
      tax: 0,
      total: 0,
    },
  });

  const rent = form.watch("rent");
  const electricity_rent = form.watch("electricity_rent");
  const tax = form.watch("tax");
  const prev = form.watch("prev_electricity_reading");
  const cur = form.watch("cur_electricity_reading");
  const { setValue } = form;

  useEffect(() => {
    const calculated = (cur - prev) * 10;
    setValue("electricity_rent", Math.max(calculated, 0));
  }, [cur, prev, setValue]);

  useEffect(() => {
    const calculated = Number(rent) + Number(electricity_rent) + Number(tax);
    setValue("total", Math.max(calculated, 0));
  }, [rent, electricity_rent, tax, setValue]);

  async function onSubmit(data: z.infer<typeof createInvoiceSchema>) {
    setPending(true);
    const response = await createInvoice(data);

    if (response.status == 201) {
      return router.push("/tenants");
    }

    setPending(false);

    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: response?.error
        ? response.error
        : "There was a problem with your request.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent className="max-h-64">
                        <SelectGroup>
                          <SelectLabel>Months</SelectLabel>
                          {months().map(({ value, label }) => (
                            <SelectItem value={value.toString()} key={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormLabel htmlFor="rent" className="col-span-2 flex items-center">
            Monthly Rent:{" "}
          </FormLabel>
          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {electricityVariant && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <FormLabel
                htmlFor="prev_electricity_reading"
                className="col-span-2 flex items-center text-zinc-500"
              >
                Previous Electricity Reading:{" "}
              </FormLabel>
              <FormField
                control={form.control}
                name="prev_electricity_reading"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        min={electricityVariant?.current}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormLabel
                htmlFor="cur_electricity_reading"
                className="col-span-2 flex items-center text-zinc-500"
              >
                Current Electricity Reading:{" "}
              </FormLabel>
              <FormField
                control={form.control}
                name="cur_electricity_reading"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        min={form.getValues("prev_electricity_reading")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormLabel
                htmlFor="electricity_rent"
                className="col-span-2 flex items-center"
              >
                Electricity Rent:{" "}
              </FormLabel>
              <FormField
                control={form.control}
                name="electricity_rent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} min={0} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <Separator />

        <div className="grid grid-cols-3 gap-4">
          <FormLabel
            htmlFor="subtotal"
            className="col-span-2 flex items-center"
          >
            Sub Total:{" "}
          </FormLabel>
          <FormField
            name="subtotal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={Number(rent) + Number(electricity_rent)}
                    min={0}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormLabel htmlFor="tax" className="col-span-2 flex items-center">
            Tax:{" "}
          </FormLabel>
          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormLabel htmlFor="total" className="col-span-2 flex items-center">
            Total:{" "}
          </FormLabel>
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">
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
