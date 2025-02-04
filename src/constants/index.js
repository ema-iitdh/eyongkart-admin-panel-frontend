import z from 'zod';

export const OrderStatus = {
  Pending: 'warning',
  Processing: 'primary',
  Shipped: 'secondary',
  Delivered: 'success',
  Cancelled: 'destructive',
};

export const ROLES = {
  Super_Admin: 'Super_Admin',
  Shop_Seller_Site_Admin: 'Shop_Seller_Site_Admin',
};

// TODO: move this to schema folder
export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z
    .string()
    .max(200, 'Short description cannot exceed 200 characters')
    .optional(),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  shop: z.string().min(1, 'Shop is required'),
  specifications: z.object({
    material: z.string().optional(),
    weaveType: z.string().optional(),
    craftTechnique: z.string().optional(),
    careInstructions: z.string().optional(),
    fabricCount: z.string().optional(),
    borderType: z.string().optional(),
    borderWidth: z.string().optional(),
    palluDetails: z.string().optional(),
    threadCount: z.number().optional(),
    zariType: z.string().optional(),
  }),
  gender: z.enum(['Male', 'Female', 'Unisex']),
  ageGroup: z.enum(['Adult', 'Kids', 'All']),
  status: z.enum(['draft', 'published', 'archived']),
  isVisible: z.boolean(),
  metaTitle: z
    .string()
    .max(60, 'Meta title should not exceed 60 characters')
    .optional(),
  metaDescription: z
    .string()
    .max(160, 'Meta description should not exceed 160 characters')
    .optional(),
  keywords: z.array(z.string()).optional(),
  variants: z
    .array(
      z.object({
        color: z.object({
          name: z.string().min(1, 'Color name is required'),
          code: z.string().optional(),
          description: z.string().optional(),
        }),
        pattern: z.object({
          name: z.string().optional(),
          description: z.string().optional(),
        }),
        size: z.object({
          value: z.string().min(1, 'Size value is required'),
          measurements: z.object({
            length: z.object({
              value: z.number(),
              unit: z.enum(['cm', 'inches', 'meters']),
            }),
            width: z.object({
              value: z.number(),
              unit: z.enum(['cm', 'inches', 'meters']),
            }),
          }),
          sizeChart: z.string().optional(),
        }),
        price: z.object({
          basePrice: z.number().min(0, 'Price cannot be negative'),
          discount: z
            .number()
            .min(0, 'Discount cannot be negative')
            .max(100, 'Discount cannot exceed 100%'),
        }),
        stock: z.object({
          quantity: z.number().min(0, 'Stock quantity must be non-negative'),
          status: z.enum(['in_stock', 'out_of_stock', 'low_stock']),
        }),
        isActive: z.boolean(),
        showInCarousel: z.boolean(),
        certifications: z
          .array(
            z.object({
              name: z.string(),
              certificateNumber: z.string(),
              issuedBy: z.string(),
              validUntil: z.date(),
            })
          )
          .optional(),
        geographicIndication: z
          .object({
            region: z.string().optional(),
            state: z.string().optional(),
            isGICertified: z.boolean().optional(),
          })
          .optional(),
      })
    )
    .min(1, 'At least one variant is required'),
});
