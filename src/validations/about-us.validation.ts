import { z } from "zod";

export const aboutUsFormSchema = z.object({
    description: z.string().min(1, "Description is required"),
    aboutUsImages: z.array(z.union([z.instanceof(File), z.string()])).optional(),
});
