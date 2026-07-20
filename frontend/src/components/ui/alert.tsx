import { cn } from "@/lib/cn";
import { AlertTriangle, CheckCircle, Info, XCircle, X } from "lucide-react";
import type { ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  action?: ReactNode;
};

const variantConfig = {
  info: {
    icon: Info,
    containerStyle: "border-blue-500/20 bg-blue-500/5",
    iconStyle: "text-blue-400",
    titleStyle: "text-blue-300",
    textStyle: "text-blue-200/70",
  },
  success: {
    icon: CheckCircle,
    containerStyle: "border-emerald-500/20 bg-emerald-500/5",
    iconStyle: "text-emerald-400",
    titleStyle: "text-emerald-300",
    textStyle: "text-emerald-200/70",
  },
  warning: {
    icon: AlertTriangle,
    containerStyle: "border-amber-500/20 bg-amber-500/5",
    iconStyle: "text-amber-400",
    titleStyle: "text-amber-300",
    textStyle: "text-amber-200/70",
  },
  error: {
    icon: XCircle,
    containerStyle: "border-red-500/20 bg-red-500/5",
    iconStyle: "text-red-400",
    titleStyle: "text-red-300",
    textStyle: "text-red-200/70",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  icon,
  closable,
  onClose,
  className,
  action,
}: AlertProps) {
  const config = variantConfig[variant];
  const Icon = icon || <config.icon className="h-5 w-5 shrink-0" />;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4",
        config.containerStyle,
        className,
      )}
    >
      <div className={cn("mt-0.5", config.iconStyle)}>{Icon}</div>
      <div className="flex-1 space-y-1">
        {title && (
          <h4 className={cn("text-sm font-semibold", config.titleStyle)}>{title}</h4>
        )}
        <div className={cn("text-sm", config.textStyle)}>{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {closable && (
        <button
          onClick={onClose}
          className={cn("shrink-0 transition-colors hover:opacity-70", config.iconStyle)}
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
