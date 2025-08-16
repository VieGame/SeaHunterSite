import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .trim(),
    email: z
        .email('Please enter a valid email address')
        .trim()
        .toLowerCase(),
    subject: z
        .string()
        .min(5, 'Subject must be at least 5 characters')
        .max(100, 'Subject cannot exceed 100 characters')
        .trim(),
    message: z
        .string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message cannot exceed 1000 characters')
        .trim(),
});

// Newsletter form validation schema
export const newsletterFormSchema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address')
        .trim()
        .toLowerCase(),
});

// API request validation schemas
export const contactApiSchema = contactFormSchema;
export const newsletterApiSchema = newsletterFormSchema;

// Types
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type ContactApiData = z.infer<typeof contactApiSchema>;
export type NewsletterApiData = z.infer<typeof newsletterApiSchema>;
