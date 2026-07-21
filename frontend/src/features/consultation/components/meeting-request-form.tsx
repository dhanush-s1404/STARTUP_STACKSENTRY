"use client";

import { useState } from "react";
import { Calendar, Clock, Video, Phone, Mail, Send, Globe } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/cn";
import { api } from "@/services/api";
import { SuccessConfirmation } from "./success-confirmation";

const MEETING_TYPES = [
  { value: "video", label: "Video Call", icon: Video },
  { value: "phone", label: "Phone Call", icon: Phone },
  { value: "email", label: "Email Discussion", icon: Mail },
];

const TIMEZONES = [
  "UTC-8 (PST)", "UTC-5 (EST)", "UTC+0 (GMT)", "UTC+1 (CET)",
  "UTC+2 (EET)", "UTC+5:30 (IST)", "UTC+8 (SGT)", "UTC+10 (AEST)",
];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
];

export function MeetingRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    date: "", time: "", timezone: "", meetingType: "video", notes: "",
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    try {
      await api.post("/consultation/meeting-request", {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        preferred_date: form.date || undefined,
        preferred_time: form.time || undefined,
        timezone: form.timezone || undefined,
        meeting_type: form.meetingType,
        notes: form.notes || undefined,
      });
    } catch {
      setSubmitError(true);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitError) {
    return (
      <Section padding="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white">Submission Failed</h2>
            <p className="mt-4 text-white/60">Something went wrong. Please try again or contact us directly.</p>
            <button onClick={() => setSubmitError(false)} className="mt-6 rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600">
              Try Again
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  if (submitted) {
    return <SuccessConfirmation type="meeting" />;
  }

  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                <Calendar className="h-7 w-7 text-blue-400" />
              </div>
              <Heading
                level="h2"
                description="Schedule a consultation call with our team to discuss your project in detail."
              >
                Book a Consultation
              </Heading>
            </div>
          </FadeIn>

          <Card glass className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <InputField label="Your Name *" value={form.name} onChange={(v) => update("name", v)} placeholder="John Doe" />
                <InputField label="Email *" value={form.email} onChange={(v) => update("email", v)} placeholder="john@acme.com" type="email" />
                <InputField label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+1 555-0123" />
                <InputField label="Company" value={form.company} onChange={(v) => update("company", v)} placeholder="Acme Corp" />
              </div>

              {/* Meeting Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/60">Meeting Type</label>
                <div className="flex flex-wrap gap-3">
                  {MEETING_TYPES.map((mt) => {
                    const Icon = mt.icon;
                    return (
                      <button
                        key={mt.value}
                        type="button"
                        onClick={() => update("meetingType", mt.value)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-all",
                          form.meetingType === mt.value
                            ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                            : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/70",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {mt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date/Time */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">Preferred Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">
                    <Clock className="mr-1 inline h-3.5 w-3.5" />
                    Preferred Time
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  >
                    <option value="" className="bg-[hsl(230,63%,5%)]">Select time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t} className="bg-[hsl(230,63%,5%)]">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">
                    <Globe className="mr-1 inline h-3.5 w-3.5" />
                    Timezone
                  </label>
                  <select
                    value={form.timezone}
                    onChange={(e) => update("timezone", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  >
                    <option value="" className="bg-[hsl(230,63%,5%)]">Select timezone</option>
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz} className="bg-[hsl(230,63%,5%)]">{tz}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Additional Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Briefly describe what you'd like to discuss..."
                  className="min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                  maxLength={2000}
                />
                <div className="mt-1 flex justify-end">
                  <span className="text-xs text-white/30">{form.notes.length} / 2000</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="lg" disabled={!form.name || !form.email || submitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {submitting ? "Scheduling..." : "Schedule Consultation"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
      />
    </div>
  );
}
