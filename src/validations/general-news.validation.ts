import { z } from "zod";

export const generalNewsFormSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  subtitle: z.string({ required_error: "Sub Title is required" }),
  description: z.string({ required_error: "Content is required" }),
  thumbnail: z.any().optional(),
  caption: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["PUBLISHED", "UNPUBLISHED"]).optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  upazila: z.string().optional(),
  publicationType: z
    .enum([
      "LEAD",
      "TOP",
      "BOX",
      "INTERNATIONAL",
      "SPORTS",
      "ENGLISH",
      "NATIONAL",
    ])
    .optional(),
});

export const generalNewsApiSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  subTitle: z.string({ required_error: "Sub Title is required" }),
  caption: z.string().optional(),
  content: z.string({ required_error: "Content is required" }),
  reporterId: z.string().optional(),
  newsCategoryId: z.string().optional(),
  newsSubCategoryId: z.string().optional(),
  divisionId: z.string().optional(),
  districtId: z.string().optional(),
  upazilaId: z.string().optional(),
  status: z.enum(["PUBLISHED", "UNPUBLISHED"]).optional(),
  thumbnail: z.any().optional(),
  publicationType: z
    .enum([
      "LEAD",
      "TOP",
      "BOX",
      "INTERNATIONAL",
      "SPORTS",
      "ENGLISH",
      "NATIONAL",
    ])
    .optional(),
});

export type GeneralNewsFormValues = z.infer<typeof generalNewsFormSchema>;
