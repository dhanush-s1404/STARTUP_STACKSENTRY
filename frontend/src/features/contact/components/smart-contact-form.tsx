"use client";

import { useState } from "react";
import { Send, Loader2, Check, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { inquiryTypes } from "@/data/contact";

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  website: string;
  inquiryType: string;
  budgetRange: string;
  preferredContact: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  website: "",
  inquiryType: "general",
  budgetRange: "",
  preferredContact: "email",
  message: "",
  consent: false,
};

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Australia", "India", "Singapore", "Japan", "UAE", "Brazil", "Other",
];

const budgetRanges = [
  "Under $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000+",
];

export function SmartContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const selectedInquiry = inquiryTypes.find((t) => t.id === formData.inquiryType);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.consent) newErrors.consent = "You must agree to be contacted";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          subject: `Contact: ${selectedInquiry?.label || "General"}`,
          message: formData.message,
          phone: formData.phone || undefined,
          inquiry_type: formData.inquiryType,
          preferred_contact: formData.preferredContact,
          consent: formData.consent,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(data.message);
      } else {
        setStatus("error");
        setServerMessage(data.detail || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setServerMessage("Unable to submit form. Please try again.");
    }
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (status === "success") {
    return (
      <Card glass padding="xl" className="text-center">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <Check className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
          <p className="text-white/40 max-w-md mx-auto">{serverMessage}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card glass padding="xl" id="contact-form">
      <h3 className="text-xl font-semibold text-white mb-2">Send us a message</h3>
      <p className="text-sm text-white/40 mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Full Name *" error={errors.name}>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="John Doe"
              className={inputClass(errors.name)}
            />
          </FormField>
          <FormField label="Business Email *" error={errors.email}>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john@company.com"
              className={inputClass(errors.email)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Company" error={errors.company}>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Your Company Ltd."
              className={inputClass(errors.company)}
            />
          </FormField>
          <FormField label="Phone Number" error={errors.phone}>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className={inputClass(errors.phone)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Country" error={errors.country}>
            <select
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
              className={inputClass(errors.country)}
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Company Website" error={errors.website}>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="https://company.com"
              className={inputClass(errors.website)}
            />
          </FormField>
        </div>

        <FormField label="Inquiry Type" error={undefined}>
          <select
            value={formData.inquiryType}
            onChange={(e) => updateField("inquiryType", e.target.value)}
            className={inputClass()}
          >
            {inquiryTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          {selectedInquiry && (
            <p className="mt-1 text-xs text-white/30">{selectedInquiry.description}</p>
          )}
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Budget Range" error={undefined}>
            <select
              value={formData.budgetRange}
              onChange={(e) => updateField("budgetRange", e.target.value)}
              className={inputClass()}
            >
              <option value="">Select budget</option>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Preferred Contact Method" error={undefined}>
            <select
              value={formData.preferredContact}
              onChange={(e) => updateField("preferredContact", e.target.value)}
              className={inputClass()}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="video">Video Call</option>
            </select>
          </FormField>
        </div>

        <FormField label="Project Description *" error={errors.message}>
          <textarea
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Tell us about your project, goals, and requirements..."
            rows={5}
            className={cn(inputClass(errors.message), "resize-y min-h-[120px]")}
          />
        </FormField>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/[0.06] bg-white/[0.03] text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="consent" className="text-xs text-white/40">
            I agree to be contacted by StackSentry regarding my inquiry. View our{" "}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>.
          </label>
        </div>
        {errors.consent && <p className="text-xs text-red-400 -mt-4">{errors.consent}</p>}

        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-3">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {serverMessage}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === "loading"}
          icon={status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          iconPosition="right"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30",
    "border-white/[0.06] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20",
    "transition-all",
    error && "border-red-500/50"
  );
}
