// Utility helpers for DevTrack

export function formatNPR(amount: number): string {
  if (amount >= 1_000_000_000) return `NPR ${(amount / 1_000_000_000).toFixed(2)} Arba`;
  if (amount >= 100_000_000) return `NPR ${(amount / 100_000_000).toFixed(2)} Crore`;
  if (amount >= 100_000) return `NPR ${(amount / 100_000).toFixed(1)} Lakh`;
  if (amount >= 1000) return `NPR ${(amount / 1000).toFixed(0)}K`;
  return `NPR ${amount}`;
}

export function formatNPRFull(amount: number): string {
  return `NPR ${amount.toLocaleString("en-IN")}`;
}

export function formatDate(date?: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(date?: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  PLANNED: { label: "Planned", color: "#6b7280", bg: "#f3f4f6" },
  ONGOING: { label: "Ongoing", color: "#1d4ed8", bg: "#dbeafe" },
  DELAYED: { label: "Delayed", color: "#dc2626", bg: "#fee2e2" },
  COMPLETED: { label: "Completed", color: "#16a34a", bg: "#dcfce7" },
  STALLED: { label: "Stalled", color: "#92400e", bg: "#fef3c7" },
};

export const PRIORITY_META: Record<string, { label: string; color: string }> = {
  LOW: { label: "Low", color: "#9ca3af" },
  MEDIUM: { label: "Medium", color: "#f59e0b" },
  HIGH: { label: "High", color: "#ea580c" },
  CRITICAL: { label: "Critical", color: "#dc143c" },
};

export const UPDATE_TYPE_META: Record<string, { label: string; color: string }> = {
  PROGRESS: { label: "Progress", color: "#1d4ed8" },
  BUDGET: { label: "Budget", color: "#7c3aed" },
  DELAY: { label: "Delay", color: "#dc2626" },
  COMPLETION: { label: "Completion", color: "#16a34a" },
  ISSUE: { label: "Issue", color: "#92400e" },
};

export function statusMeta(s: string) { return STATUS_META[s] || STATUS_META.PLANNED; }
export function priorityMeta(p: string) { return PRIORITY_META[p] || PRIORITY_META.MEDIUM; }
export function updateTypeMeta(t: string) { return UPDATE_TYPE_META[t] || UPDATE_TYPE_META.PROGRESS; }
