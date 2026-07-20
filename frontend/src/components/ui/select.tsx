import { cn } from "@/lib/cn";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
};

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  className,
  disabled,
  id,
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white",
          "transition-colors duration-200",
          "focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/25",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/25",
          className,
        )}
      >
        <option value="" className="bg-[hsl(240,5%,6%)]">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[hsl(240,5%,6%)]">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
