import { cn } from "@/lib/cn";
import { AlertTriangle, RefreshCw, ArrowLeft, Home } from "lucide-react";
import type { ReactNode } from "react";

type ErrorStateProps = {
  title?: string;
  description?: string;
  code?: string | number;
  onRetry?: () => void;
  onGoBack?: () => void;
  className?: string;
  icon?: ReactNode;
};

export function ErrorState({
  title = "Something went wrong",
  description,
  code,
  onRetry,
  onGoBack,
  className,
  icon,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className,
      )}
    >
      <div className="mb-6 rounded-2xl bg-red-500/10 p-6 text-red-400">
        {icon || <AlertTriangle className="h-12 w-12" />}
      </div>
      {code && (
        <p className="mb-2 text-sm font-mono text-red-400">Error {code}</p>
      )}
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mb-8 max-w-md text-sm text-[hsl(var(--color-text-muted))]">
        {description || "An unexpected error occurred. Please try again or contact support if the problem persists."}
      </p>
      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
        {onGoBack && (
          <button
            onClick={onGoBack}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        )}
        {!onRetry && !onGoBack && (
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        )}
      </div>
    </div>
  );
}
