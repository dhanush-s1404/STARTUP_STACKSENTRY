"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { adminApi, type AdminService } from "@/lib/admin/api";

export default function AdminServicesPage() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.listServices();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    try {
      await adminApi.deleteService(slug);
      setServices((prev) => prev.filter((s) => s.slug !== slug));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Services</h1>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button onClick={load} className="mt-3 text-sm text-blue-400 hover:underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="mt-1 text-white/40">{services.length} services total</p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          New Service
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="px-4 py-3 text-left font-medium text-white/60">Title</th>
              <th className="px-4 py-3 text-left font-medium text-white/60">Slug</th>
              <th className="px-4 py-3 text-left font-medium text-white/60">Status</th>
              <th className="px-4 py-3 text-left font-medium text-white/60">Order</th>
              <th className="px-4 py-3 text-left font-medium text-white/60">Active</th>
              <th className="px-4 py-3 text-right font-medium text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-white/[0.06] transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3 font-medium">{service.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-white/40">{service.slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      service.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60">{service.order}</td>
                <td className="px-4 py-3">
                  {service.is_active ? (
                    <Eye className="h-4 w-4 text-green-400" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-white/20" />
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/services/${service.slug}`}
                      className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(service.slug, service.title)}
                      className="rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-white/40">
                  No services yet. Create your first service.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
