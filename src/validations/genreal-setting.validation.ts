import { z } from "zod";

export const communicationFormSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  credit: z
    .string()
    .min(2, "Credit must be at least 2 characters")
    .max(100, "Credit must be less than 100 characters"),
  officeAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  phone: z
    .string()
   ,
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  managementCouncil: z
    .string()
    .min(2, "Management council must be at least 2 characters")
    .max(100, "Management council must be less than 100 characters"),
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
      /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]+$/i,
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
  whatsappLink: z
    .string()
    .url("Please enter a valid WhatsApp URL")
    .regex(
      /^https?:\/\/(www\.)?wa\.me\/.+/i,
      "Please enter a valid WhatsApp URL"
    )
    .optional()
    .or(z.literal("")),
  googleMapLink: z
    .string()
    .url("Please enter a valid Google Maps URL")
    .regex(
      /^https?:\/\/(www\.)?google\.com\/maps\/.+/i,
      "Please enter a valid Google Maps URL"
    )
    .optional()
    .or(z.literal("")),
});

export type CompanyCommunicationFormValues = z.infer<
  typeof communicationFormSchema
>;
