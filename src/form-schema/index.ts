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