import { z } from "zod";

export const advertisementFormSchema = z.object({
  placement: z.string().min(1, "Placement is required"),
  metadata: z.string().optional(),
  adImage: z.any().refine((file) => file !== null, "Image is required"),
  redirect: z.string().optional(),
  status: z.enum(["PUBLISHED", "UNPUBLISHED"]).default("UNPUBLISHED"),
});

export type TAdvertisementForm = z.infer<typeof advertisementFormSchema>;
