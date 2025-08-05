import { z } from 'zod';

// Newsletter form validation schema
export const newsletterFormSchema = z.object({
    email: z
        .email('Please enter a valid email address')
        .trim()
        .toLowerCase(),
});

// API request validation schemas
export const newsletterApiSchema = newsletterFormSchema;

// Types
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type NewsletterApiData = z.infer<typeof newsletterApiSchema>;