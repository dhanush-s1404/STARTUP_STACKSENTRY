import { cn } from "@/lib/cn";

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      {children}
    </div>
  );
}
