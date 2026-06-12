export const plans = ["free", "starter", "pro", "scale", "enterprise"] as const;

export type Plan = (typeof plans)[number];
