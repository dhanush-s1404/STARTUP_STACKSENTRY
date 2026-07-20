"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { api } from "@/services/api";
import { inquiryFormSchema, type InquiryFormData } from "@/lib/validation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { MotionDiv } from "@/lib/motion";
import {
  User,
  Briefcase,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

const industries = [
  "Healthcare",
  "Education",
  "Finance",
  "Recruitment",
  "Manufacturing",
  "Retail",
  "E-Commerce",
  "Government",
  "Real Estate",
  "Travel",
  "Logistics",
  "Hospitality",
  "Other",
];

const projectTypes = [
  "Web Application",
  "Mobile App",
  "AI/ML Platform",
  "Enterprise Software",
  "E-Commerce Platform",
  "Custom Solution",
  "Platform Migration",
  "Other",
];

const budgetRanges = [
  "Under $10K",
  "$10K - $25K",
  "$25K - $50K",
  "$50K - $100K",
  "$100K - $250K",
  "$250K - $500K",
  "$500K+",
];

const timelines = [
  "ASAP",
  "1-2 months",
  "3-4 months",
  "5-6 months",
  "7-12 months",
  "12+ months",
  "Not Sure",
];

const contactMethods = [
  { value: "email" as const, label: "Email", icon: Mail },
  { value: "phone" as const, label: "Phone", icon: Phone },
  { value: "both" as const, label: "Both", icon: Mail },
];

function InputField({
  label,
  icon: Icon,
  error,
  ...props
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/70">{label}</label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Icon className="h-4 w-4 text-white/30" />
        </div>
        <input
          {...props}
          className={`h-11 w-full rounded-xl border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none ${
            error
              ? "border-rose-500/50 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/25"
              : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
          }`}
        />
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  options,
  error,
  ...props
}: {
  label: string;
  options: string[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/70">{label}</label>
      <select
        {...props}
        className={`h-11 w-full appearance-none rounded-xl border bg-white/5 px-4 text-sm text-white transition-colors focus:outline-none ${
          error
            ? "border-rose-500/50 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/25"
            : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
        }`}
      >
        <option value="" className="bg-[hsl(240,5%,6%)]">
          Select...
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[hsl(240,5%,6%)]">
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export function ProjectInquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      preferredContact: "email",
    },
  });

  const preferredContact = watch("preferredContact");

  async function onSubmit(data: InquiryFormData) {
    try {
      await api.post("/inquiry", data);
      setIsSubmitted(true);
      toast.success("Inquiry submitted successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (isSubmitted) {
    return (
      <Section padding="lg">
        <Container size="md">
          <FadeIn>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center backdrop-blur-sm">
              <MotionDiv
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10"
              >
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </MotionDiv>
              <h2 className="text-2xl font-bold text-white">Thank you!</h2>
              <p className="mt-3 text-white/50">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    );
  }

  return (
    <Section padding="lg">
      <Container size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                  <User className="h-4 w-4 text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Personal Information
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  icon={User}
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register("name")}
                />
                <InputField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  placeholder="john@company.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <InputField
                  label="Company"
                  icon={Building2}
                  placeholder="Acme Inc."
                  error={errors.company?.message}
                  {...register("company")}
                />
                <InputField
                  label="Phone (Optional)"
                  icon={Phone}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                  <Briefcase className="h-4 w-4 text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Project Details
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Industry"
                  options={industries}
                  error={errors.industry?.message}
                  {...register("industry")}
                />
                <SelectField
                  label="Project Type"
                  options={projectTypes}
                  error={errors.projectType?.message}
                  {...register("projectType")}
                />
                <SelectField
                  label="Budget Range"
                  options={budgetRanges}
                  error={errors.budgetRange?.message}
                  {...register("budgetRange")}
                />
                <SelectField
                  label="Timeline"
                  options={timelines}
                  error={errors.timeline?.message}
                  {...register("timeline")}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10">
                  <FileText className="h-4 w-4 text-pink-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  Requirements
                </h2>
              </div>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">
                    Describe Your Project
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project goals, features, and any specific requirements..."
                    {...register("requirements")}
                    className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none ${
                      errors.requirements
                        ? "border-rose-500/50 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/25"
                        : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25"
                    }`}
                  />
                  {errors.requirements && (
                    <p className="text-xs text-rose-400">
                      {errors.requirements.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-white/70">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {contactMethods.map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() =>
                          setValue("preferredContact", method.value, {
                            shouldValidate: true,
                          })
                        }
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all ${
                          preferredContact === method.value
                            ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                            : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
                        }`}
                      >
                        <method.icon className="h-4 w-4" />
                        {method.label}
                      </button>
                    ))}
                  </div>
                  {errors.preferredContact && (
                    <p className="text-xs text-rose-400">
                      {errors.preferredContact.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Inquiry
                  </>
                )}
              </button>
              <p className="max-w-md text-center text-xs text-white/30">
                By submitting this form, you agree to our privacy policy. We
                will never share your information with third parties.
              </p>
            </div>
          </FadeIn>
        </form>
      </Container>
    </Section>
  );
}
