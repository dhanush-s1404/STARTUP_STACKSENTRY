import { cn } from "@/lib/cn";

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-white/[0.06]", className)}>
      <table className="w-full text-sm text-left">{children}</table>
    </div>
  );
}

type TableHeadProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <thead className={cn("border-b border-white/[0.06] bg-white/[0.02]", className)}>
      {children}
    </thead>
  );
}

type TableBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn("divide-y divide-white/[0.04]", className)}>{children}</tbody>;
}

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableRow({ children, className }: TableRowProps) {
  return (
    <tr className={cn("transition-colors hover:bg-white/[0.02]", className)}>
      {children}
    </tr>
  );
}

type TableCellProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableCell({ children, className }: TableCellProps) {
  return <td className={cn("px-4 py-3 text-white/70", className)}>{children}</td>;
}

type TableHeaderCellProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableHeaderCell({ children, className }: TableHeaderCellProps) {
  return (
    <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40", className)}>
      {children}
    </th>
  );
}
