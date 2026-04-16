import { z } from "zod";

const createVideoNewsValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Description is required" }),
  caption: z.string().optional(),
  reporterId: z.string().min(1, { message: "Reporter ID is required" }),
  newsCategoryId: z
    .string()
    .min(1, { message: "News Category ID is required" }),
  newsSubCategoryId: z
    .string()
    .min(1, { message: "News Sub Category ID is required" }),
  videoLink: z
    .string()
    .min(1, { message: "Video Link is required" })
    .url({ message: "Invalid Url" }),
  status: z.enum(["PUBLISHED", "UNPUBLISHED"], {
    required_error: "Status is required",
  }),
});

export type CreateVideoNewsValidationType = z.infer<
  typeof createVideoNewsValidation
>;

const updateVideoNewsValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }).optional(),
  content: z.string().min(1, { message: "Description is required" }).optional(),
  caption: z.string().optional(),
  reporterId: z
    .string()
    .min(1, { message: "Reporter ID is required" })
    .optional(),
  newsCategoryId: z
    .string()
    .min(1, { message: "News Category ID is required" })
    .optional(),
  newsSubCategoryId: z
    .string()
    .min(1, { message: "News Sub Category ID is required" })
    .optional(),
  videoLink: z
    .string()
    .min(1, { message: "Video Link is required" })
    .optional(),
  status: z
    .enum(["PUBLISHED", "UNPUBLISHED"], {
      required_error: "Status is required",
    })
    .optional(),
});

export type UpdateVideoNewsValidation = z.infer<
  typeof updateVideoNewsValidation
>;

export const videoNewsValidation = {
  createVideoNewsValidation,
  updateVideoNewsValidation,
};
