export type BudgetRange = {
  id: string;
  label: string;
  minAmount: number | null;
  maxAmount: number | null;
  displayOrder: number;
};

export const BUDGET_RANGES: BudgetRange[] = [
  { id: "under-10k", label: "Under $10,000", minAmount: 0, maxAmount: 10000, displayOrder: 1 },
  { id: "10k-25k", label: "$10,000 – $25,000", minAmount: 10000, maxAmount: 25000, displayOrder: 2 },
  { id: "25k-50k", label: "$25,000 – $50,000", minAmount: 25000, maxAmount: 50000, displayOrder: 3 },
  { id: "50k-100k", label: "$50,000 – $100,000", minAmount: 50000, maxAmount: 100000, displayOrder: 4 },
  { id: "100k-250k", label: "$100,000 – $250,000", minAmount: 100000, maxAmount: 250000, displayOrder: 5 },
  { id: "250k-plus", label: "$250,000+", minAmount: 250000, maxAmount: null, displayOrder: 6 },
];

export function getBudgetRangeById(id: string): BudgetRange | undefined {
  return BUDGET_RANGES.find((r) => r.id === id);
}
