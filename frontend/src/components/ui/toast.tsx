import { cn } from "@/lib/cn";

type ToastVariant = "default" | "success" | "error" | "warning" | "info";

type ToastProps = {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  className?: string;
  onClose?: () => void;
};

const variantStyles: Record<ToastVariant, string> = {
  default: "border-white/10 bg-white/5",
  success: "border-emerald-500/20 bg-emerald-500/10",
  error: "border-red-500/20 bg-red-500/10",
  warning: "border-amber-500/20 bg-amber-500/10",
  info: "border-blue-500/20 bg-blue-500/10",
};

const dotStyles: Record<ToastVariant, string> = {
  default: "bg-white/60",
  success: "bg-emerald-400",
  error: "bg-red-400",
  warning: "bg-amber-400",
  info: "bg-blue-400",
};

export function Toast({ variant = "default", title, description, className, onClose }: ToastProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 backdrop-blur-xl shadow-xl",
        variantStyles[variant],
        className,
      )}
    >
      <span className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", dotStyles[variant])} />
      <div className="flex-1 space-y-1">
        {title && <p className="text-sm font-medium text-white">{title}</p>}
        {description && <p className="text-sm text-white/50">{description}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 text-white/40 transition-colors hover:text-white"
          aria-label="Close notification"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
