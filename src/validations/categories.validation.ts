import * as z from "zod";

// Form schema (UI values)
export const categoriesFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  showMenu: z.enum(["PUBLISHED", "UNPUBLISHED"])
});

export type CategoriesFormValues = z.infer<typeof categoriesFormSchema>;

// API schema (backend values)
export interface CategoriesApiData {
  title: string;
  showMenu: boolean;
}

// Transform UI values to API values
export const categoriesApiSchema = categoriesFormSchema.transform((data): CategoriesApiData => ({
  title: data.title,
  showMenu: data.showMenu === "PUBLISHED"
}));
