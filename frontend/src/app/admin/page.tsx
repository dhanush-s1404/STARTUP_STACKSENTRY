import Link from "next/link";
import { Building2, MessageSquare, Calendar, HelpCircle, Cpu, Shield, BookOpen, ArrowRight } from "lucide-react";

export const metadata = { title: "Admin Dashboard - StackSentry" };

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-white/60">Manage your StackSentry website content.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          href="/admin/services"
          icon={Building2}
          iconColor="blue"
          title="Services"
          description="Manage service offerings"
        />
        <AdminCard
          href="/admin/consultation"
          icon={MessageSquare}
          iconColor="purple"
          title="Consultation"
          description="View project discoveries & inquiries"
        />
        <AdminCard
          href="/admin/consultation/meetings"
          icon={Calendar}
          iconColor="green"
          title="Meeting Requests"
          description="Manage consultation bookings"
        />
        <AdminCard
          href="/admin/consultation/faqs"
          icon={HelpCircle}
          iconColor="amber"
          title="FAQ"
          description="Manage frequently asked questions"
        />
        <AdminCard
          href="/admin/engineering/principles"
          icon={Cpu}
          iconColor="purple"
          title="Engineering Principles"
          description="Manage engineering principles"
        />
        <AdminCard
          href="/admin/engineering/security"
          icon={Shield}
          iconColor="red"
          title="Security Content"
          description="Manage security topics"
        />
        <AdminCard
          href="/admin/engineering/knowledge"
          icon={BookOpen}
          iconColor="cyan"
          title="Knowledge Center"
          description="Manage knowledge articles"
        />
      </div>
    </div>
  );
}

function AdminCard({ href, icon: Icon, iconColor, title, description }: {
  href: string; icon: any; iconColor: string; title: string; description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-blue-500/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${iconColor}-500/10`}>
            <Icon className={`h-5 w-5 text-${iconColor}-400`} />
          </div>
          <div>
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm text-white/40">{description}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-white/20 transition-colors group-hover:text-white/60" />
      </div>
    </Link>
  );
}
