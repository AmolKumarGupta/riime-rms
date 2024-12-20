import { z } from 'zod'

export const propertySchema = z.object({
  name: z.string().min(2, {
    message: "Property name must be at least 2 characters"
  }),
  monthly_rent: z.coerce.number({
    required_error: "Monthly Rent is required",
    invalid_type_error: "Monthly Rent must be a number",
  })
})

export const tenantSchema = z.object({
  name: z.string().min(2, {
    message: "Tenant name must be at least 2 characters"
  }),
  billing_date: z.coerce.date({
    required_error: "Billing Date is required",
    invalid_type_error: "Billing Date must be a date",
  }),
  starting_date: z.coerce.date({
    required_error: "Starting Date is required",
    invalid_type_error: "Starting Date must be a date",
  })
})