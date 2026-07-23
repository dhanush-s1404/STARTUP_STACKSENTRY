import Link from "next/link";
import { Building2, LayoutDashboard, MessageSquare, Calendar, HelpCircle, Cpu, Shield, BookOpen, ArrowLeft } from "lucide-react";
import AdminGuard from "@/components/admin/admin-guard";

const navLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/services", icon: Building2, label: "Services" },
  { href: "/admin/consultation", icon: MessageSquare, label: "Consultation" },
  { href: "/admin/consultation/meetings", icon: Calendar, label: "Meetings" },
  { href: "/admin/consultation/faqs", icon: HelpCircle, label: "FAQ" },
  { href: "/admin/engineering/principles", icon: Cpu, label: "Engineering" },
  { href: "/admin/engineering/security", icon: Shield, label: "Security" },
  { href: "/admin/engineering/knowledge", icon: BookOpen, label: "Knowledge" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[hsl(230,63%,5%)] text-white">
        <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-white/[0.06] bg-[hsl(230,63%,3%)]">
          <div className="flex h-16 items-center gap-2 border-b border-white/[0.06] px-6">
            <Building2 className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">StackSentry Admin</span>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/[0.06] p-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
          </div>
        </aside>
        <main className="ml-64 min-h-screen p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}
