// Shared types
export type Role = "CITIZEN" | "EXPERT" | "OFFICIAL" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  expertise?: string | null;
  ward?: { id: string; number: number; name: string } | null;
  avatarColor: string;
  bio?: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Ward {
  id: string;
  number: number;
  name: string;
  district: string;
  population: number;
  area: number;
  latitude: number;
  longitude: number;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  completedAt?: string | null;
  status: string;
}

export interface BudgetLine {
  id: string;
  label: string;
  amount: number;
  spent: number;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  body: string;
  type: string;
  createdAt: string;
  author?: { name: string } | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  status: string;
  priority: string;
  budgetAllocated: number;
  budgetSpent: number;
  progress: number;
  startDate?: string | null;
  endDatePlanned?: string | null;
  endDateActual?: string | null;
  contractor?: string | null;
  consultant?: string | null;
  fundingSource?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  featured: boolean;
  category: Category;
  ward?: Ward | null;
  milestones: Milestone[];
  budgetLines: BudgetLine[];
  updates: ProjectUpdate[];
  threads?: ForumThread[];
}

export interface Comment {
  id: string;
  threadId: string;
  parentId?: string | null;
  body: string;
  isOfficial: boolean;
  createdAt: string;
  author: { id: string; name: string; role: string; avatarColor: string; expertise?: string | null };
  votes: { id: string; value: number }[];
}

export interface ForumThread {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string;
  author: { id: string; name: string; role: string; avatarColor: string; expertise?: string | null };
  project?: { id: string; title: string; slug: string; category?: { color: string } } | null;
  comments: Comment[];
}

export interface Official {
  id: string;
  name: string;
  title: string;
  portfolio: string;
  phone: string;
  email: string;
  officeAddress: string;
  surgeryHours: string;
  party?: string | null;
  photoColor: string;
  termStart: string;
  ward?: Ward | null;
}

export interface BetaFeedback {
  id: string;
  authorName: string;
  category: string;
  body: string;
  rating: number;
  createdAt: string;
  user?: { name: string; avatarColor: string; role: string } | null;
}
