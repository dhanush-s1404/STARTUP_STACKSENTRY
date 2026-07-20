const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export type AdminService = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  short_description: string | null;
  icon: string | null;
  status: string;
  is_active: boolean;
  order: number;
  category_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminServiceDetail = AdminService & {
  features: string[];
  process: string[];
  faq: string[];
  technologies: string[];
  pricing_tier: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
};

export type ServiceCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
};

export const adminApi = {
  listServices: () => request<AdminService[]>("/api/admin/services"),
  getService: (slug: string) => request<AdminServiceDetail>(`/api/admin/services/${slug}`),
  createService: (data: Record<string, unknown>) =>
    request<{ id: string; slug: string; title: string }>("/api/admin/services", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateService: (slug: string, data: Record<string, unknown>) =>
    request<{ id: string; slug: string; title: string }>(`/api/admin/services/${slug}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteService: (slug: string) =>
    request<{ detail: string }>(`/api/admin/services/${slug}`, { method: "DELETE" }),
  listCategories: () => request<ServiceCategory[]>("/api/admin/services/categories/list"),
  createCategory: (data: Record<string, unknown>) =>
    request<{ id: string; slug: string; name: string }>("/api/admin/services/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
