"use client";

import { useMemo, useState } from "react";
import {
  Building2, HeartPulse, Leaf, MapPin, Scale, School, Search, TrendingUp, Users,
  Filter, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNPR, statusMeta, priorityMeta } from "@/lib/devtrack";
import type { Project, Category, Ward } from "@/lib/types";

const CAT_ICON: Record<string, any> = {
  infrastructure: Building2, education: School, healthcare: HeartPulse, economy: TrendingUp,
  environment: Leaf, policy: Scale, urban_development: Building2, citizen_benefits: Users,
};

interface Props {
  projects: Project[];
  categories: Category[];
  wards: Ward[];
  initialCategoryId?: string;
  onOpenProject: (slug: string) => void;
}

export function ProjectsView({ projects, categories, wards, initialCategoryId, onOpenProject }: Props) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>(initialCategoryId || "ALL");
  const [wardId, setWardId] = useState<string>("ALL");
  const [status, setStatus] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (categoryId !== "ALL" && p.category.id !== categoryId) return false;
      if (wardId !== "ALL" && p.ward?.id !== wardId) return false;
      if (status !== "ALL" && p.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.summary.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [projects, categoryId, wardId, status, search]);

  const clearFilters = () => { setSearch(""); setCategoryId("ALL"); setWardId("ALL"); setStatus("ALL"); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-emerald-bright font-mono mb-2">{"// PROJECTS EXPLORER"}</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
          Every KMC project,<br /><span className="text-gradient-emerald">in one place.</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
          Filter by sector, ward or status. Click any project for the full budget breakdown, timeline, contractor, accountable officials and the public discussion.
        </p>
      </div>

      <div className="bento-card mb-6 p-4 sm:p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects by title, summary or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-emerald-glow/5 border-emerald-glow/20 focus-visible:border-emerald-glow/50 font-mono text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="w-[160px] bg-emerald-glow/5 border-emerald-glow/20"><SelectValue placeholder="Sector" /></SelectTrigger>
              <SelectContent className="glass-strong border-emerald-glow/20">
                <SelectItem value="ALL">All sectors</SelectItem>
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={wardId} onValueChange={setWardId}>
              <SelectTrigger className="w-[130px] bg-emerald-glow/5 border-emerald-glow/20"><SelectValue placeholder="Ward" /></SelectTrigger>
              <SelectContent className="glass-strong border-emerald-glow/20">
                <SelectItem value="ALL">All wards</SelectItem>
                {wards.map((w) => <SelectItem key={w.id} value={w.id}>Ward {w.number}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[130px] bg-emerald-glow/5 border-emerald-glow/20"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent className="glass-strong border-emerald-glow/20">
                <SelectItem value="ALL">All status</SelectItem>
                <SelectItem value="PLANNED">Planned</SelectItem>
                <SelectItem value="ONGOING">Ongoing</SelectItem>
                <SelectItem value="DELAYED">Delayed</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="STALLED">Stalled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {(categoryId !== "ALL" || wardId !== "ALL" || status !== "ALL" || search) && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald-glow/10">
            <span className="text-xs text-muted-foreground font-mono">{filtered.length} of {projects.length} projects</span>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto text-xs h-7 hover:bg-emerald-glow/10">
              <X className="size-3 mr-1" /> Clear
            </Button>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bento-card py-16 text-center text-muted-foreground">
          <Filter className="size-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono text-sm">{"// no projects match your filters"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpenProject(p.slug)} />)}
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const Icon = CAT_ICON[project.category.slug] || Building2;
  const sm = statusMeta(project.status);
  const pm = priorityMeta(project.priority);
  const budgetPct = project.budgetAllocated > 0 ? Math.round((project.budgetSpent / project.budgetAllocated) * 100) : 0;

  return (
    <div className="bento-card cursor-pointer flex flex-col h-full" onClick={onOpen}>
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-lg flex items-center justify-center shrink-0 border" style={{ backgroundColor: `${project.category.color}18`, borderColor: `${project.category.color}40` }}>
              <Icon className="size-5" style={{ color: project.category.color }} />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <p>{project.category.name}</p>
              <p className="text-muted-foreground/60">#{String(index + 1).padStart(3, "0")}</p>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: `${sm.color}20`, color: sm.color }}>{sm.label}</span>
        </div>
        <h3 className="font-display text-base font-semibold leading-snug">{project.title}</h3>
        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{project.summary}</p>
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono mt-3 text-muted-foreground uppercase tracking-wider">
          {project.ward && <span className="flex items-center gap-0.5"><MapPin className="size-3" /> Ward {project.ward.number}</span>}
          <span style={{ color: pm.color }}>· {pm.label}</span>
        </div>
      </div>
      <div className="px-5 pb-5 space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground font-mono uppercase text-[9px] tracking-wider">PROGRESS</span>
            <span className="font-mono font-bold text-emerald-bright">{project.progress}%</span>
          </div>
          <div className="h-1 bg-emerald-glow/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-glow to-lime-accent" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-glow/10">
          <span className="text-muted-foreground font-mono">{formatNPR(project.budgetAllocated)} · <span className="text-emerald-bright">{budgetPct}%</span></span>
          <span className="text-emerald-bright font-mono text-[10px] uppercase tracking-wider">View →</span>
        </div>
      </div>
    </div>
  );
}
