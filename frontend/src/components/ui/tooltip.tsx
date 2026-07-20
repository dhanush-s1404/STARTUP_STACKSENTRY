import { cn } from "@/lib/cn";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
};

const sideStyles = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export function Tooltip({ children, content, side = "top", className }: TooltipProps) {
  return (
    <div className="group/tooltip relative inline-flex">
      {children}
      <div
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium",
          "bg-white/10 text-white backdrop-blur-sm border border-white/10",
          "opacity-0 scale-95 transition-all duration-200",
          "group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100",
          sideStyles[side],
          className,
        )}
      >
        {content}
      </div>
    </div>
  );
}
