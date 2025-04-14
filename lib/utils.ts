import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Prisma  } from '@prisma/client'; // Import Decimal type from Prisma
import * as z from 'zod'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: "USD"
})

export function convertTieredPricesToNumber(
  tieredPrices: { minQty: number; price: Prisma.Decimal }[]
): { minQty: number; price: number }[] {
  return tieredPrices.map(tier => ({
    minQty: tier.minQty,
    price: tier.price.toNumber(), // 将 Prisma.Decimal 转为 JS number
  }))
}

export const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  tieredPrices: z.array(
    z.object({
      minQty: z.coerce.number().min(1, "Minimum quantity must be at least 1"),  // minQty >= 1
      price: z.coerce.number().min(0),
    })
  ).optional(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  description: z.string().min(0)
  
})

export type ProductFormValues = z.infer<typeof formSchema>;