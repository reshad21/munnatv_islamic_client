import * as z from "zod";

export const SubCategoriesFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  showMenu: z.enum(["PUBLISHED", "UNPUBLISHED"]),
  newsCategoryId: z.string().uuid("Parent category is required"),
});

export type SubCategoriesFormValues = z.infer<typeof SubCategoriesFormSchema>;

export interface SubCategoriesApiData {
  title: string;
  showMenu: boolean;
  newsCategoryId: string;
}

export const categoriesApiSchema = SubCategoriesFormSchema.transform((data): SubCategoriesApiData => ({
  title: data.title,
  showMenu: data.showMenu === "PUBLISHED",
  newsCategoryId: data.newsCategoryId,
}));
