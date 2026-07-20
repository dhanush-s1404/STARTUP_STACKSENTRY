import { api } from "@/services/api";

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
  listServices: () => api.get<AdminService[]>("/admin/services"),
  getService: (slug: string) => api.get<AdminServiceDetail>(`/admin/services/${slug}`),
  createService: (data: Record<string, unknown>) =>
    api.post<{ id: string; slug: string; title: string }>("/admin/services", data),
  updateService: (slug: string, data: Record<string, unknown>) =>
    api.put<{ id: string; slug: string; title: string }>(`/admin/services/${slug}`, data),
  deleteService: (slug: string) =>
    api.delete<{ detail: string }>(`/admin/services/${slug}`),
  listCategories: () => api.get<ServiceCategory[]>("/admin/services/categories/list"),
  createCategory: (data: Record<string, unknown>) =>
    api.post<{ id: string; slug: string; name: string }>("/admin/services/categories", data),
};
