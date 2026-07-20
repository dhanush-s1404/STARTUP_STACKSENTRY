import { cn } from "@/lib/cn";

type AuthLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center px-4 py-12",
        className,
      )}
    >
      <div className="mesh-gradient pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-lg font-bold text-white">S</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
