"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { adminApi } from "@/lib/admin/api";

export default function EditServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    short_description: "",
    icon: "",
    status: "active",
    is_active: true,
    order: 0,
    features: "",
    process: "",
    faq: "",
    technologies: "",
    pricing_tier: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const service = await adminApi.getService(slug);
        setForm({
          slug: service.slug,
          title: service.title,
          description: service.description || "",
          short_description: service.short_description || "",
          icon: service.icon || "",
          status: service.status,
          is_active: service.is_active,
          order: service.order,
          features: Array.isArray(service.features) ? service.features.join("\n") : "",
          process: Array.isArray(service.process) ? service.process.join("\n") : "",
          faq: Array.isArray(service.faq) ? service.faq.join("\n") : "",
          technologies: Array.isArray(service.technologies) ? service.technologies.join("\n") : "",
          pricing_tier: service.pricing_tier || "",
          seo_title: service.seo_title || "",
          seo_description: service.seo_description || "",
          seo_keywords: service.seo_keywords || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load service");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const data = {
        ...form,
        order: Number(form.order),
        features: form.features ? form.features.split("\n").map((s) => s.trim()).filter(Boolean) : [],
        process: form.process ? form.process.split("\n").map((s) => s.trim()).filter(Boolean) : [],
        faq: form.faq ? form.faq.split("\n").map((s) => s.trim()).filter(Boolean) : [],
        technologies: form.technologies
          ? form.technologies.split("\n").map((s) => s.trim()).filter(Boolean)
          : [],
      };
      await adminApi.updateService(slug, data);
      router.push("/admin/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update service");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/admin/services"
            className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Service Not Found</h1>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/admin/services"
          className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit: {form.title}</h1>
          <p className="mt-1 font-mono text-xs text-white/40">{form.slug}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Icon Key</label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Order</label>
              <input
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                name="is_active"
                type="checkbox"
                checked={form.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-white/10 bg-white/5"
              />
              <label className="text-sm text-white/80">Active</label>
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <label className="text-sm font-medium text-white/80">Short Description</label>
            <input
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
            />
          </div>
          <div className="mt-4 space-y-1.5">
            <label className="text-sm font-medium text-white/80">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="flex w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold">Content (one item per line)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Features</label>
              <textarea
                name="features"
                value={form.features}
                onChange={handleChange}
                rows={6}
                className="flex w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Process Steps</label>
              <textarea
                name="process"
                value={form.process}
                onChange={handleChange}
                rows={6}
                className="flex w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">FAQ</label>
              <textarea
                name="faq"
                value={form.faq}
                onChange={handleChange}
                rows={6}
                className="flex w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">Technologies</label>
              <textarea
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                rows={6}
                className="flex w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="mb-4 text-lg font-semibold">SEO</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">SEO Title</label>
              <input
                name="seo_title"
                value={form.seo_title}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/80">SEO Description</label>
              <input
                name="seo_description"
                value={form.seo_description}
                onChange={handleChange}
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
              />
            </div>
          </div>
          <div className="mt-4 space-y-1.5">
            <label className="text-sm font-medium text-white/80">SEO Keywords</label>
            <input
              name="seo_keywords"
              value={form.seo_keywords}
              onChange={handleChange}
              className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/services"
            className="flex h-10 items-center rounded-lg border border-white/10 px-4 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
