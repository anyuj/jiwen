import { capitalize } from "@jiwen/lib/helpers";
import type { Plan } from "@jiwen/lib/types";
import { Badge } from "@jiwen/ui/components/badge";

const PLAN_VARIANTS = {
  free: "default",
  starter: "blue",
  pro: "violet",
  scale: "orange",
  enterprise: "black",
} as const;

export default function PlanBadge({ plan }: { plan: Plan }) {
  const variant = PLAN_VARIANTS[plan];

  return <Badge variant={variant}>{capitalize(plan)}</Badge>;
}
