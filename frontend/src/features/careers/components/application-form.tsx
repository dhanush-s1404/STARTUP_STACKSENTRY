"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema, type JobApplicationFormData } from "@/lib/validation";
import { cn } from "@/lib/cn";
import { useApiMutation } from "@/hooks/use-api";
import { useLocalStorage } from "@/hooks";
import { AnimatePresence } from "@/lib/motion";
import { FadeIn } from "@/components/ui/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Send,
  Save,
} from "lucide-react";

type ApplicationFormProps = {
  jobSlug: string;
  jobTitle: string;
};

const STEPS = [
  { id: "personal", title: "Personal Info", icon: User },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "skills", title: "Skills & Education", icon: GraduationCap },
  { id: "documents", title: "Documents", icon: FileText },
  { id: "review", title: "Review & Submit", icon: CheckCircle2 },
] as const;

const STEP_FIELDS: (keyof JobApplicationFormData)[][] = [
  ["fullName", "email", "phone", "country", "city"],
  ["linkedinUrl", "githubUrl", "portfolioUrl", "yearsOfExperience", "currentSalary", "expectedSalary", "noticePeriod", "availability"],
  ["skills", "education", "certifications", "languages"],
  ["resumeUrl", "coverLetter", "projects"],
  ["agreement"],
];

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Germany", "France",
  "India", "Singapore", "Australia", "Japan", "Brazil", "UAE", "Netherlands",
  "Ireland", "Remote (Global)",
];

const AVAILABILITY_OPTIONS = [
  "Immediately", "2 weeks", "1 month", "2 months", "3+ months",
];

const NOTICE_PERIOD_OPTIONS = [
  "No notice period", "1 week", "2 weeks", "1 month", "2 months", "3+ months",
];

const DEFAULT_VALUES: JobApplicationFormData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
  resumeUrl: "",
  coverLetter: "",
  yearsOfExperience: 0,
  skills: [],
  expectedSalary: undefined,
  currentSalary: undefined,
  noticePeriod: "",
  availability: "",
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  agreement: false as unknown as true,
};

const DRAFT_KEY_PREFIX = "ss-application-draft-";

export function ApplicationForm({ jobSlug, jobTitle }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [certInput, setCertInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const draftKey = `${DRAFT_KEY_PREFIX}${jobSlug}`;
  const [savedDraft, setSavedDraft] = useLocalStorage<JobApplicationFormData | null>(
    draftKey,
    null,
  );

  const removeDraft = useCallback(() => {
    setSavedDraft(null);
  }, [setSavedDraft]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: savedDraft || DEFAULT_VALUES,
    mode: "onBlur",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: "projects" });

  const watchedValues = watch();
  const watchedSkills = watch("skills");
  const watchedCertifications = watch("certifications");
  const watchedLanguages = watch("languages");

  const mutation = useApiMutation<{ success: boolean }, JobApplicationFormData>(
    `/api/careers/applications/${jobSlug}`,
    "POST",
    {
      onSuccess: () => {
        removeDraft();
        setIsSubmitted(true);
      },
    },
  );

  // Auto-save draft every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentValues = getValues();
      const hasData = currentValues.fullName || currentValues.email;
      if (hasData) {
        setSavedDraft(currentValues);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [getValues, setSavedDraft]);

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / STEPS.length) * 100),
    [currentStep],
  );

  const validateStep = useCallback(
    async (step: number) => {
      const fields = STEP_FIELDS[step];
      const result = await trigger(fields);
      return result;
    },
    [trigger],
  );

  const handleNext = useCallback(async () => {
    const valid = await validateStep(currentStep);
    if (valid && currentStep < STEPS.length - 1) {
      const currentValues = getValues();
      setSavedDraft(currentValues);
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, validateStep, getValues, setSavedDraft]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const onSubmit = useCallback(
    (data: JobApplicationFormData) => {
      mutation.mutate(data);
    },
    [mutation],
  );

  const addSkill = useCallback(() => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const current = getValues("skills");
    if (!current.includes(trimmed)) {
      setValue("skills", [...current, trimmed], { shouldValidate: true });
    }
    setSkillInput("");
  }, [skillInput, getValues, setValue]);

  const removeSkill = useCallback(
    (skill: string) => {
      const current = getValues("skills");
      setValue(
        "skills",
        current.filter((s) => s !== skill),
        { shouldValidate: true },
      );
    },
    [getValues, setValue],
  );

  const addCertification = useCallback(() => {
    const trimmed = certInput.trim();
    if (!trimmed) return;
    const current = getValues("certifications") || [];
    if (!current.includes(trimmed)) {
      setValue("certifications", [...current, trimmed], { shouldValidate: true });
    }
    setCertInput("");
  }, [certInput, getValues, setValue]);

  const removeCertification = useCallback(
    (cert: string) => {
      const current = getValues("certifications") || [];
      setValue(
        "certifications",
        current.filter((c) => c !== cert),
        { shouldValidate: true },
      );
    },
    [getValues, setValue],
  );

  const addLanguage = useCallback(() => {
    const trimmed = languageInput.trim();
    if (!trimmed) return;
    const current = getValues("languages") || [];
    if (!current.includes(trimmed)) {
      setValue("languages", [...current, trimmed], { shouldValidate: true });
    }
    setLanguageInput("");
  }, [languageInput, getValues, setValue]);

  const removeLanguage = useCallback(
    (lang: string) => {
      const current = getValues("languages") || [];
      setValue(
        "languages",
        current.filter((l) => l !== lang),
        { shouldValidate: true },
      );
    },
    [getValues, setValue],
  );

  if (isSubmitted) {
    return (
      <Card className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Application Submitted!</h2>
          <p className="text-white/50">
            Thank you for applying to <span className="text-white/70">{jobTitle}</span>.
            Our team will review your application within 5 business days.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-white">
            Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
          </span>
          <span className="text-white/40">{progress}%</span>
        </div>
        <ProgressBar value={progress} color="blue" size="md" animated />

        {/* Step indicators */}
        <div className="hidden sm:flex items-center justify-between">
          {STEPS.map((step, i) => {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (i < currentStep) setCurrentStep(i);
                }}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                  isActive && "bg-blue-500/10 text-blue-400",
                  isCompleted && "text-emerald-400 hover:text-emerald-300 cursor-pointer",
                  !isActive && !isCompleted && "text-white/30",
                  i > currentStep && "cursor-default",
                )}
                disabled={i > currentStep}
              >
                <step.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          <FadeIn key={currentStep} direction="up" duration={0.3}>
            <Card>
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                    <p className="mt-1 text-sm text-white/40">Tell us about yourself</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      error={errors.fullName?.message}
                      {...register("fullName")}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-white/80">Country</label>
                      <select
                        className={cn(
                          "flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors",
                          "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
                          errors.country && "border-red-500/50",
                        )}
                        {...register("country")}
                      >
                        <option value="" className="bg-[hsl(240,5%,6%)]">Select country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-[hsl(240,5%,6%)]">{c}</option>
                        ))}
                      </select>
                      {errors.country?.message && (
                        <p className="text-xs text-red-400">{errors.country.message}</p>
                      )}
                    </div>
                    <Input
                      label="City"
                      placeholder="San Francisco"
                      error={errors.city?.message}
                      {...register("city")}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Experience */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Professional Experience</h2>
                    <p className="mt-1 text-sm text-white/40">Share your professional background</p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input
                      label="LinkedIn URL"
                      placeholder="https://linkedin.com/in/yourprofile"
                      error={errors.linkedinUrl?.message}
                      {...register("linkedinUrl")}
                    />
                    <Input
                      label="GitHub URL"
                      placeholder="https://github.com/yourusername"
                      error={errors.githubUrl?.message}
                      {...register("githubUrl")}
                    />
                    <Input
                      label="Portfolio URL"
                      placeholder="https://yourportfolio.com"
                      error={errors.portfolioUrl?.message}
                      {...register("portfolioUrl")}
                    />
                    <Input
                      label="Years of Experience"
                      type="number"
                      min={0}
                      max={50}
                      error={errors.yearsOfExperience?.message}
                      {...register("yearsOfExperience", { valueAsNumber: true })}
                    />
                    <Input
                      label="Current Salary (USD)"
                      type="number"
                      placeholder="Optional"
                      error={errors.currentSalary?.message}
                      {...register("currentSalary", { valueAsNumber: true })}
                    />
                    <Input
                      label="Expected Salary (USD)"
                      type="number"
                      placeholder="Optional"
                      error={errors.expectedSalary?.message}
                      {...register("expectedSalary", { valueAsNumber: true })}
                    />
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-white/80">Notice Period</label>
                      <select
                        className={cn(
                          "flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors",
                          "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
                        )}
                        {...register("noticePeriod")}
                      >
                        <option value="" className="bg-[hsl(240,5%,6%)]">Select notice period</option>
                        {NOTICE_PERIOD_OPTIONS.map((o) => (
                          <option key={o} value={o} className="bg-[hsl(240,5%,6%)]">{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-white/80">Availability</label>
                      <select
                        className={cn(
                          "flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors",
                          "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
                        )}
                        {...register("availability")}
                      >
                        <option value="" className="bg-[hsl(240,5%,6%)]">Select availability</option>
                        {AVAILABILITY_OPTIONS.map((o) => (
                          <option key={o} value={o} className="bg-[hsl(240,5%,6%)]">{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Skills & Education */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Skills & Education</h2>
                    <p className="mt-1 text-sm text-white/40">Highlight your qualifications</p>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/80">Skills *</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill (e.g. React, Python)"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button type="button" variant="secondary" size="sm" onClick={addSkill} icon={<Plus className="h-4 w-4" />}>
                        Add
                      </Button>
                    </div>
                    {errors.skills?.message && (
                      <p className="text-xs text-red-400">{errors.skills.message}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {(watchedSkills || []).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-300"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="rounded-full p-0.5 hover:bg-blue-500/20"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-white/80">Education</label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          appendEducation({ institution: "", degree: "", field: "", year: "" })
                        }
                        icon={<Plus className="h-4 w-4" />}
                      >
                        Add
                      </Button>
                    </div>
                    {educationFields.map((field, index) => (
                      <div key={field.id} className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-white/40">Education {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeEducation(index)}
                            className="rounded-md p-1 text-white/30 hover:text-red-400"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Input
                            placeholder="Institution"
                            {...register(`education.${index}.institution`)}
                          />
                          <Input
                            placeholder="Degree"
                            {...register(`education.${index}.degree`)}
                          />
                          <Input
                            placeholder="Field of Study"
                            {...register(`education.${index}.field`)}
                          />
                          <Input
                            placeholder="Graduation Year"
                            {...register(`education.${index}.year`)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/80">Certifications</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a certification"
                        value={certInput}
                        onChange={(e) => setCertInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCertification();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button type="button" variant="secondary" size="sm" onClick={addCertification} icon={<Plus className="h-4 w-4" />}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(watchedCertifications || []).map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
                        >
                          {cert}
                          <button
                            type="button"
                            onClick={() => removeCertification(cert)}
                            className="rounded-full p-0.5 hover:bg-purple-500/20"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/80">Languages</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a language"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addLanguage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button type="button" variant="secondary" size="sm" onClick={addLanguage} icon={<Plus className="h-4 w-4" />}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(watchedLanguages || []).map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300"
                        >
                          {lang}
                          <button
                            type="button"
                            onClick={() => removeLanguage(lang)}
                            className="rounded-full p-0.5 hover:bg-cyan-500/20"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Documents */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Documents & Projects</h2>
                    <p className="mt-1 text-sm text-white/40">Upload your resume and share your portfolio</p>
                  </div>

                  <Input
                    label="Resume URL"
                    placeholder="https://drive.google.com/your-resume.pdf"
                    hint="Link to your resume (Google Drive, Dropbox, personal site)"
                    error={errors.resumeUrl?.message}
                    {...register("resumeUrl")}
                  />

                  <Textarea
                    label="Cover Letter"
                    placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                    error={errors.coverLetter?.message}
                    {...register("coverLetter")}
                  />

                  {/* Projects */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-white/80">Projects</label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          appendProject({ name: "", description: "", url: "" })
                        }
                        icon={<Plus className="h-4 w-4" />}
                      >
                        Add Project
                      </Button>
                    </div>
                    {projectFields.map((field, index) => (
                      <div key={field.id} className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-white/40">Project {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeProject(index)}
                            className="rounded-md p-1 text-white/30 hover:text-red-400"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Input
                            placeholder="Project name"
                            {...register(`projects.${index}.name`)}
                          />
                          <Input
                            placeholder="Project URL"
                            {...register(`projects.${index}.url`)}
                          />
                        </div>
                        <Textarea
                          placeholder="Brief description of the project..."
                          className="min-h-[80px]"
                          {...register(`projects.${index}.description`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Review Your Application</h2>
                    <p className="mt-1 text-sm text-white/40">
                      Please review your information before submitting
                    </p>
                  </div>

                  {/* Review sections */}
                  <div className="space-y-6">
                    <ReviewSection title="Personal Information">
                      <ReviewItem label="Name" value={watchedValues.fullName} />
                      <ReviewItem label="Email" value={watchedValues.email} />
                      <ReviewItem label="Phone" value={watchedValues.phone} />
                      <ReviewItem label="Location" value={`${watchedValues.city}, ${watchedValues.country}`} />
                    </ReviewSection>

                    <ReviewSection title="Experience">
                      <ReviewItem label="Years of Experience" value={`${watchedValues.yearsOfExperience} years`} />
                      <ReviewItem label="LinkedIn" value={watchedValues.linkedinUrl || "—"} />
                      <ReviewItem label="GitHub" value={watchedValues.githubUrl || "—"} />
                      <ReviewItem label="Portfolio" value={watchedValues.portfolioUrl || "—"} />
                      <ReviewItem label="Notice Period" value={watchedValues.noticePeriod || "—"} />
                      <ReviewItem label="Availability" value={watchedValues.availability || "—"} />
                    </ReviewSection>

                    <ReviewSection title="Skills & Education">
                      <div className="space-y-1.5">
                        <span className="text-xs text-white/40">Skills</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(watchedValues.skills || []).map((skill) => (
                            <span key={skill} className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {(watchedValues.education || []).length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-xs text-white/40">Education</span>
                          {(watchedValues.education || []).map((edu, i) => (
                            <p key={i} className="text-sm text-white/70">
                              {edu.degree} in {edu.field} — {edu.institution} ({edu.year})
                            </p>
                          ))}
                        </div>
                      )}
                      <ReviewItem
                        label="Certifications"
                        value={(watchedValues.certifications || []).join(", ") || "—"}
                      />
                      <ReviewItem
                        label="Languages"
                        value={(watchedValues.languages || []).join(", ") || "—"}
                      />
                    </ReviewSection>

                    <ReviewSection title="Documents">
                      <ReviewItem label="Resume URL" value={watchedValues.resumeUrl || "—"} />
                      <ReviewItem label="Cover Letter" value={watchedValues.coverLetter || "—"} truncate />
                      {(watchedValues.projects || []).length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-xs text-white/40">Projects</span>
                          {(watchedValues.projects || []).map((proj, i) => (
                            <p key={i} className="text-sm text-white/70">
                              {proj.name}
                              {proj.url && (
                                <span className="ml-1 text-blue-400">({proj.url})</span>
                              )}
                              {proj.description && (
                                <span className="ml-1 text-white/40">— {proj.description}</span>
                              )}
                            </p>
                          ))}
                        </div>
                      )}
                    </ReviewSection>
                  </div>

                  {/* Agreement */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <Checkbox
                      label="I confirm that all information provided is accurate and complete"
                      description="I agree to the Terms of Service and Privacy Policy. I understand that providing false information may result in disqualification."
                      checked={!!watchedValues.agreement}
                      onChange={(e) =>
                        setValue("agreement", (e.target as HTMLInputElement).checked as unknown as true, {
                          shouldValidate: true,
                        })
                      }
                    />
                    {errors.agreement?.message && (
                      <p className="mt-2 text-xs text-red-400">{errors.agreement.message}</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </FadeIn>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <div>
            {currentStep > 0 && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <Save className="h-3.5 w-3.5" />
              Auto-saving draft
            </div>

            {currentStep < STEPS.length - 1 ? (
              <Button type="button" onClick={handleNext} icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                loading={mutation.isPending}
                icon={<Send className="h-4 w-4" />}
                disabled={!watchedValues.agreement}
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

/* ---------- Review helpers ---------- */

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.01] p-4">
      <h3 className="text-sm font-medium text-white/60">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function ReviewItem({
  label,
  value,
  truncate,
}: {
  label: string;
  value: string | number | undefined;
  truncate?: boolean;
}) {
  return (
    <div className="space-y-0.5">
      <span className="text-xs text-white/30">{label}</span>
      <p className={cn("text-sm text-white/70", truncate && "line-clamp-2")}>
        {value || "—"}
      </p>
    </div>
  );
}
