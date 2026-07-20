import { cn } from "@/lib/cn";

type MainLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      {children}
    </div>
  );
}
