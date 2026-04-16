import * as z from "zod";

const MAX_FILE_SIZE = 40 * 1024 * 1024; // 20MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const reporterFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  phone: z
    .string()
    .min(11, "Phone number must be at least 11 characters")
    .max(11, "Phone number must be less than 11 characters")
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      "Please enter a valid Bangladeshi phone number"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),

  department: z
    .string()
    .min(2, "Department must be at least 2 characters")
    .max(100, "Department must be less than 100 characters")
    ,

  profilePhoto: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 20MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters"),

  facebookLink: z
    .string()
    .url("Please enter a valid Facebook URL")
    .regex(
      /^https?:\/\/(www\.)?facebook\.com\/.+/i,
      "Please enter a valid Facebook profile URL"
    )
    .optional()
    .or(z.literal("")),

  xLink: z
    .string()
    .url("Please enter a valid X/Twitter URL")
    .regex(
      /^https?:\/\/(www\.)?twitter\.com\/.+/i,
      "Please enter a valid X/Twitter profile URL"
    )
    .optional()
    .or(z.literal("")),

  linkedinLink: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .regex(
      /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i,
      "Please enter a valid LinkedIn profile URL"
    )
    .optional()
    .or(z.literal("")),

  instagramLink: z
    .string()
    .url("Please enter a valid Instagram URL")
    .regex(
      /^https?:\/\/(www\.)?instagram\.com\/.+/i,
      "Please enter a valid Instagram profile URL"
    )
    .optional()
    .or(z.literal("")),

  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type ReporterFormValues = z.infer<typeof reporterFormSchema>;

// Helper type for API response
export type Reporter = ReporterFormValues & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
