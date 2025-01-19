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

export const propertyWithVariantSchema = z.object({
  name: z.string().min(2, {
    message: "Property name must be at least 2 characters"
  }),
  monthly_rent: z.coerce.number({
    required_error: "Monthly Rent is required",
    invalid_type_error: "Monthly Rent must be a number",
  }),
  electricty_bill_included: z.coerce.boolean({
    required_error: "Electricity Included is required",
  }),
  electricty_initial_value: z.coerce.number({
    required_error: "Electricity Initial Value is required",
    invalid_type_error: "Electricity Initial Value must be a number",
  }),
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

export const tenantWithPropertySchema = tenantSchema.extend({
  property_id: z.coerce.number({
    required_error: "Property is required"
  }).nullable()
})

export const createInvoiceSchema = z.object({
  tenant_id: z.coerce.number({
    required_error: "Tenant is required"
  }).nullable(),

  property_id: z.coerce.number({
    required_error: "Property is required"
  }).nullable(),

  year: z.coerce.number({
    required_error: "Year is required",
    invalid_type_error: "Year must be a number",
  }).int().min(1900, {
    message: "Year must be at least 1900"
  }).max(new Date().getFullYear(), {
    message: `Year cannot be in the future`
  }),

  month: z.coerce.number({
    required_error: "Month is required",
    invalid_type_error: "Month must be a number",
  }).min(1, {
    message: "Month must be valid"
  }).max(12, {
    message: "Month must be valid"
  }),

  rent: z.coerce.number({
    required_error: "Rent is required",
    invalid_type_error: "Rent must be a number",
  }).min(0, {
    message: "Rent must be at least 0"
  }),

  prev_electricity_reading: z.coerce.number({
    required_error: "Previous Electricity Reading is required",
    invalid_type_error: "Previous Electricity Reading must be a number",
  }).min(0, {
    message: "Previous Electricity Reading must be at least 0"
  }),

  cur_electricity_reading: z.coerce.number({
    required_error: "Current Electricity Reading is required",
    invalid_type_error: "Current Electricity Reading must be a number",
  }).min(0, {
    message: "Current Electricity Reading must be at least 0"
  }),

  electricity_rent: z.coerce.number({
    required_error: "Electricity Rent is required",
    invalid_type_error: "Electricity Rent must be a number",
  }).min(0, {
    message: "Electricity Rent must be at least 0"
  }),

  tax: z.coerce.number({
    required_error: "Tax is required",
    invalid_type_error: "Tax must be a number",
  }).min(0, {
    message: "Tax must be at least 0"
  }),

  total: z.coerce.number({
    required_error: "Total is required",
    invalid_type_error: "Total must be a number",
  }).min(0, {
    message: "Total must be at least 0"
  }),
})