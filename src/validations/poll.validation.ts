import { z } from "zod";

const pollSchema = z.object({
  title: z.string().min(1, "Poll title is required"),
  description: z.string().optional(),
  thumbnail: z.any().nullable().optional(),
  pollOption: z
    .array(
      z.object({
        title: z.string().min(1, "Answer option is required"),
      })
    )
    .min(2, "At least two answer options are required"),
});

export default pollSchema;
