import { Badge } from "@/components/ui/badge";
import { categoryColors } from "./blog-grid";

type CategoryBadgeProps = {
  category: string;
  size?: "sm" | "md";
};

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  return (
    <Badge variant={categoryColors[category] || "default"} size={size}>
      {category}
    </Badge>
  );
}
