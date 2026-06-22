"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft, Building2, HeartPulse, Leaf, MapPin, Scale, School, TrendingUp, Users,
  Wallet, CalendarClock, CheckCircle2, Circle, AlertCircle, MessageSquare,
  Bell, ChevronRight, FileText, Building, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { formatNPR, formatNPRFull, formatDate, formatDateTime, statusMeta, priorityMeta, updateTypeMeta } from "@/lib/devtrack";
import type { Project } from "@/lib/types";

const CAT_ICON: Record<string, any> = {
  infrastructure: Building2, education: School, healthcare: HeartPulse, economy: TrendingUp,
  environment: Leaf, policy: Scale, urban_development: Building2, citizen_benefits: Users,
};

interface Props {
  slug: string;
  onBack: () => void;
  onOpenProject: (slug: string) => void;
  onNavigate: (tab: string, payload?: any) => void;
}

export function ProjectDetailView({ slug, onBack, onNavigate }: Props) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [tracked, setTracked] = useState(false);
  const [trackBusy, setTrackBusy] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/projects/${slug}`).then((r) => r.json()).then((d) => {
      setProject(d.project);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (user && project) {
      fetch("/api/projects/track").then((r) => r.json()).then((d) => {
        if (d.projectIds?.includes(project.id)) setTracked(true);
      });
    }
  }, [user, project]);

  const toggleTrack = async () => {
    if (!user) { toast({ title: "Please sign in to track projects", variant: "destructive" }); return; }
    if (!project) return;
    setTrackBusy(true);
    try {
      const res = await fetch(`/api/projects/track?projectId=${project.id}`, { method: "POST" });
      const d = await res.json();
      setTracked(d.tracked);
      toast({ title: d.tracked ? "Tracking this project" : "Stopped tracking", description: d.tracked ? "You'll get notifications on updates and milestones." : undefined });
    } finally { setTrackBusy(false); }
  };

  if (loading || !project) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-muted-foreground">
        <div className="font-mono text-sm animate-pulse">{"// loading project…"}</div>
      </div>
    );
  }

  const Icon = CAT_ICON[project.category.slug] || Building2;
  const sm = statusMeta(project.status);
  const pm = priorityMeta(project.priority);
  const budgetPct = project.budgetAllocated > 0 ? Math.round((project.budgetSpent / project.budgetAllocated) * 100) : 0;
  const overdueMilestones = project.milestones.filter((m) => m.status === "OVERDUE").length;
  const completedMilestones = project.milestones.filter((m) => m.status === "DONE").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 -ml-2 text-muted-foreground hover:text-emerald-bright font-mono text-xs uppercase tracking-wider">
        <ArrowLeft className="size-4 mr-1" /> Back to projects
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-10 rounded-lg flex items-center justify-center border" style={{ backgroundColor: `${project.category.color}18`, borderColor: `${project.category.color}40` }}>
              <Icon className="size-5" style={{ color: project.category.color }} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: project.category.color }}>{project.category.name}</span>
            {project.ward && <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono"><MapPin className="size-3" /> Ward {project.ward.number}</span>}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight">{project.title}</h1>
          <p className="text-lg text-muted-foreground mt-4 leading-relaxed">{project.summary}</p>
          <div className="flex items-center gap-2 mt-5 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded badge-glow" style={{ backgroundColor: `${sm.color}20`, color: sm.color }}>{sm.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border" style={{ color: pm.color, borderColor: `${pm.color}40` }}>{pm.label} priority</span>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-emerald-glow/30 text-emerald-bright">{project.fundingSource || "KMC"}</span>
            {project.contractor && <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-emerald-glow/20">{project.contractor}</span>}
          </div>
        </div>
        <div className="space-y-3">
          <Button
            className={`w-full font-semibold ${tracked ? "bg-emerald-glow/15 text-emerald-bright border border-emerald-glow/40 hover:bg-emerald-glow/25" : "bg-emerald-glow hover:bg-emerald-glow/90 text-background glow-emerald"}`}
            onClick={toggleTrack}
            disabled={trackBusy}
          >
            <Bell className="size-4 mr-2" /> {tracked ? "Tracking — Stop notifications" : "Track this project"}
          </Button>
          <Button variant="outline" className="w-full border-emerald-glow/30 text-emerald-bright hover:bg-emerald-glow/10 glass" onClick={() => onNavigate("forum", { projectId: project.id })}>
            <MessageSquare className="size-4 mr-2" /> Open public discussion
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatBox icon={Wallet} label="BUDGET" value={formatNPR(project.budgetAllocated)} sub={formatNPRFull(project.budgetAllocated)} color="#10B981" />
        <StatBox icon={TrendingUp} label="SPENT" value={formatNPR(project.budgetSpent)} sub={`${budgetPct}% of allocated`} color="#A3E635" />
        <StatBox icon={CheckCircle2} label="MILESTONES" value={`${completedMilestones}/${project.milestones.length}`} sub={`${overdueMilestones} overdue`} color="#6EE7B7" />
        <StatBox icon={CalendarClock} label="DUE" value={formatDate(project.endDatePlanned)} sub={`Started ${formatDate(project.startDate)}`} color="#34D399" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
              <FileText className="size-4 text-emerald-bright" />
              <h2 className="font-display text-lg font-semibold">About this project</h2>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{project.description}</p>
            </div>
          </div>

          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
              <Layers className="size-4 text-emerald-bright" />
              <h2 className="font-display text-lg font-semibold">Budget breakdown</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground font-mono uppercase text-[10px] tracking-wider">OVERALL UTILISATION</span>
                  <span className="font-mono font-semibold text-emerald-bright">{formatNPR(project.budgetSpent)} / {formatNPR(project.budgetAllocated)} · {budgetPct}%</span>
                </div>
                <div className="h-3 bg-emerald-glow/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-glow via-emerald-bright to-lime-accent transition-all duration-500" style={{ width: `${budgetPct}%` }} />
                </div>
              </div>
              <div className="space-y-3 pt-2">
                {project.budgetLines.map((bl) => {
                  const pct = bl.amount > 0 ? Math.round((bl.spent / bl.amount) * 100) : 0;
                  return (
                    <div key={bl.id}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="font-medium">{bl.label}</span>
                        <span className="text-muted-foreground font-mono text-xs">{formatNPR(bl.spent)} / {formatNPR(bl.amount)} <span className="text-emerald-bright font-semibold">({pct}%)</span></span>
                      </div>
                      <div className="h-1.5 bg-emerald-glow/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-glow to-emerald-bright" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
              <CalendarClock className="size-4 text-emerald-bright" />
              <h2 className="font-display text-lg font-semibold">Timeline & milestones</h2>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {project.milestones.map((m, i) => {
                  const Icon = m.status === "DONE" ? CheckCircle2 : m.status === "OVERDUE" ? AlertCircle : Circle;
                  const color = m.status === "DONE" ? "#10B981" : m.status === "OVERDUE" ? "#F87171" : "#6B7280";
                  const last = i === project.milestones.length - 1;
                  return (
                    <div key={m.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <Icon className="size-5" style={{ color }} />
                        {!last && <div className="w-px flex-1 my-1 bg-emerald-glow/15" />}
                      </div>
                      <div className={`flex-1 pb-3 ${last ? "" : "border-b border-dashed border-emerald-glow/10"}`}>
                        <p className="font-medium text-sm">{m.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <span className="text-muted-foreground font-mono">Due: {formatDate(m.dueDate)}</span>
                          {m.completedAt && <span className="text-emerald-bright font-mono">· Completed {formatDate(m.completedAt)}</span>}
                          {m.status === "OVERDUE" && <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: "#F8717120", color: "#F87171" }}>OVERDUE</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="size-4 text-emerald-bright" />
                <h2 className="font-display text-lg font-semibold">Project updates</h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{project.updates.length} TOTAL</span>
            </div>
            <div className="p-5">
              {project.updates.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6 font-mono">{"// no official updates yet"}</p>
              ) : (
                <div className="space-y-4">
                  {project.updates.map((u) => {
                    const um = updateTypeMeta(u.type);
                    return (
                      <div key={u.id} className="pb-4 border-b border-emerald-glow/10 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded" style={{ color: um.color, backgroundColor: `${um.color}20` }}>{um.label}</span>
                          <span className="text-xs text-muted-foreground font-mono">{formatDateTime(u.createdAt)}</span>
                          {u.author && <span className="text-xs text-muted-foreground font-mono">· by {u.author.name}</span>}
                        </div>
                        <p className="font-semibold text-sm">{u.title}</p>
                        <p className="text-sm text-muted-foreground mt-1.5 whitespace-pre-line leading-relaxed">{u.body}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10">
              <h3 className="font-display text-base font-semibold">Project facts</h3>
            </div>
            <div className="p-5 space-y-2.5 text-sm">
              <Fact label="Contractor" value={project.contractor || "TBD"} />
              <Fact label="Consultant" value={project.consultant || "—"} />
              <Fact label="Funding" value={project.fundingSource || "KMC"} />
              <Fact label="Start date" value={formatDate(project.startDate)} />
              <Fact label="Planned end" value={formatDate(project.endDatePlanned)} />
              <Fact label="Actual end" value={formatDate(project.endDateActual)} />
              {project.ward && <Fact label="Ward" value={`Ward ${project.ward.number}`} />}
            </div>
          </div>

          {project.latitude && project.longitude && (
            <div className="bento-card">
              <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
                <MapPin className="size-4 text-emerald-bright" />
                <h3 className="font-display text-base font-semibold">Location</h3>
              </div>
              <div className="p-5">
                <div className="aspect-video rounded-lg border border-emerald-glow/20 relative overflow-hidden grid-overlay bg-emerald-glow/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="size-3 rounded-full bg-emerald-glow mx-auto mb-2 badge-glow" style={{ color: "#10B981" }} />
                      <p className="text-xs font-mono text-emerald-bright">{project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 font-mono">{"// interactive Leaflet map coming in v2.0"}</p>
              </div>
            </div>
          )}

          {project.threads && project.threads.length > 0 && (
            <div className="bento-card">
              <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
                <MessageSquare className="size-4 text-emerald-bright" />
                <h3 className="font-display text-base font-semibold">Public discussion</h3>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-3 font-mono">{project.threads[0].comments.length} CITIZEN COMMENTS</p>
                <Button variant="outline" className="w-full border-emerald-glow/30 text-emerald-bright hover:bg-emerald-glow/10 glass" onClick={() => onNavigate("forum", { projectId: project.id })}>
                  Open discussion <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bento-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="size-7 rounded-md flex items-center justify-center border" style={{ backgroundColor: `${color}15`, borderColor: `${color}40` }}>
          <Icon className="size-4" style={{ color }} />
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{label}</span>
      </div>
      <p className="text-lg sm:text-xl font-display font-bold leading-tight ticker-num" style={{ color }}>{value}</p>
      <p className="text-xs text-muted-foreground mt-1 font-mono">{sub}</p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground text-xs uppercase tracking-wider font-mono">{label}</span>
      <span className="font-medium text-right text-sm">{value}</span>
    </div>
  );
}
