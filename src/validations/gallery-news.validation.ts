import { z } from "zod";

export const createGalleryNewsValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Description is required" }),
  caption: z.string().optional(),
  reporterId: z.string().min(1, { message: "Reporter is required" }),
  newsCategoryId: z.string().min(1, { message: "Category is required" }),
  newsSubCategoryId: z.string().min(1, { message: "Sub Category is required" }),
  images: z.array(z.instanceof(File)).refine((files) => files.length > 0, {
    message: "At least one image is required",
  }),
  status: z.enum(["PUBLISHED", "UNPUBLISHED"], {
    required_error: "Status is required",
  }),
});

export type CreateGalleryNewsValidationType = z.infer<
  typeof createGalleryNewsValidation
>;

export const updateGalleryNewsValidation = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  caption: z.string().optional(),
  reporterId: z.string().optional(),
  newsCategoryId: z.string().optional(),
  newsSubCategoryId: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
  status: z
    .enum(["PUBLISHED", "UNPUBLISHED"], {
      required_error: "Status is required",
    })
    .optional(),
  deleteImages: z.array(z.string()).optional(),
});

export type UpdateGalleryNewsValidationType = z.infer<
  typeof updateGalleryNewsValidation
>;
