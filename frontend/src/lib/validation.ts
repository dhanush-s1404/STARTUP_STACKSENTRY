import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const inquiryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  industry: z.string().min(1, "Please select an industry"),
  projectType: z.string().min(1, "Please select a project type"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  requirements: z
    .string()
    .min(20, "Please describe your requirements in at least 20 characters"),
  preferredContact: z.enum(["email", "phone", "both"], {
    errorMap: () => ({ message: "Please select a contact method" }),
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export const jobApplicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  resumeUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
  yearsOfExperience: z.number().min(0).max(50),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  expectedSalary: z.number().optional(),
  currentSalary: z.number().optional(),
  noticePeriod: z.string().optional(),
  availability: z.string().optional(),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    year: z.string(),
  })).optional(),
  certifications: z.array(z.string()).optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
  })).optional(),
  languages: z.array(z.string()).optional(),
  agreement: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
});

export const careersSearchSchema = z.object({
  query: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  employmentType: z.string().optional(),
  experienceLevel: z.string().optional(),
  workModel: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
export type CareersSearchData = z.infer<typeof careersSearchSchema>;
