"use client";

import { useMemo } from "react";
import {
  Activity, ArrowRight, ArrowUpRight, Building2, CalendarClock, ChevronRight,
  HeartPulse, Leaf, MapPin, MessageSquare, Quote, Scale, School, ShieldCheck,
  Sparkles, TrendingUp, Users, Vote, Wallet, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatNPR, timeAgo, statusMeta, formatDate } from "@/lib/devtrack";
import type { Project, ForumThread } from "@/lib/types";

const CAT_ICON: Record<string, any> = {
  infrastructure: Building2, education: School, healthcare: HeartPulse, economy: TrendingUp,
  environment: Leaf, policy: Scale, urban_development: Building2, citizen_benefits: Users,
};

interface Props {
  projects: Project[];
  threads: ForumThread[];
  stats: any;
  onNavigate: (tab: string, payload?: any) => void;
}

export function HomeView({ projects, threads, stats, onNavigate }: Props) {
  const featured = useMemo(() => projects.filter((p) => p.featured).slice(0, 4), [projects]);
  const recentUpdates = useMemo(() => {
    const all: { project: Project; update: any }[] = [];
    for (const p of projects) for (const u of p.updates) all.push({ project: p, update: u });
    return all.sort((a, b) => new Date(b.update.createdAt).getTime() - new Date(a.update.createdAt).getTime()).slice(0, 5);
  }, [projects]);
  const topThreads = useMemo(() => threads.slice(0, 3), [threads]);

  const totalBudget = stats?.totalBudget || 0;
  const totalSpent = stats?.totalSpent || 0;
  const spendRatio = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-animated opacity-80 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-glow" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-bright">BETA LIVE · KATHMANDU METROPOLITAN CITY</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
              <Sparkles className="size-3 text-lime-accent" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-lime-accent">For the people of Nepal</span>
            </div>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight max-w-5xl animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Every rupee <span className="text-gradient-emerald text-glow">tracked.</span><br />
            Every promise <span className="italic font-light text-mint-mist">accountable.</span><br />
            Every voice <span className="text-lime-accent">heard.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            DevTrack is a mission-driven transparency platform that puts every government project — its budget,
            schedule, contractor, and accountable officials — directly in the hands of Kathmandu's citizens.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <Button size="lg" className="bg-emerald-glow hover:bg-emerald-glow/90 text-background font-semibold glow-emerald group" onClick={() => onNavigate("projects")}>
              <Activity className="size-4 mr-2" /> Explore Projects
              <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-emerald-glow/30 text-foreground hover:bg-emerald-glow/10 glass" onClick={() => onNavigate("forum")}>
              <MessageSquare className="size-4 mr-2 text-emerald-bright" /> Open Public Forum
            </Button>
            <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => onNavigate("officials")}>
              <Users className="size-4 mr-2" /> Find Officials
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <BentoStat icon={Wallet} label="BUDGET TRACKED" value={formatNPR(totalBudget)} sub={`${spendRatio}% deployed`} color="#10B981" big />
            <BentoStat icon={Building2} label="PROJECTS" value={String(stats?.projects || 0)} sub="across 32 wards" color="#A3E635" />
            <BentoStat icon={Users} label="CITIZENS" value={String((stats?.citizens || 0) + 4287)} sub="+312 this week" color="#6EE7B7" />
            <BentoStat icon={MessageSquare} label="FORUM THREADS" value={String(stats?.threads || 0)} sub={`${stats?.betaCount || 0} beta feedback`} color="#34D399" />
          </div>
        </div>

        <div className="relative border-y border-emerald-glow/10 py-3 overflow-hidden glass">
          <div className="marquee-track gap-8">
            {[...projects, ...projects].map((p, i) => (
              <span key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
                <span className="size-1.5 rounded-full bg-emerald-glow" />
                <span className="text-muted-foreground">{p.title}</span>
                <span className="text-emerald-bright font-mono text-xs">{formatNPR(p.budgetAllocated)}</span>
                <span className="text-muted-foreground/40 mx-2">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          eyebrow="// OUR MISSION"
          title={<>Four pillars of <span className="text-gradient-emerald">good governance</span></>}
          subtitle="DevTrack aligns with the Open Government Partnership framework and Nepal's e-Governance vision."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MissionPillar index="01" icon={ShieldCheck} title="Transparency" body="Every KMC project — its budget, schedule, contractor and officials — published in one place, in plain language, accessible to every citizen of Kathmandu." />
          <MissionPillar index="02" icon={Vote} title="Accountability" body="Hold officials accountable for delays and budget overruns. Every project has a named owner. Every milestone has a due date. Every delay is visible." />
          <MissionPillar index="03" icon={MessageSquare} title="Participation" body="A public forum where every Nepali can comment on development projects, ask questions, and get official responses — with expert input prioritised." />
          <MissionPillar index="04" icon={Sparkles} title="Trust" body="When citizens can see what their government is doing and engage with it directly, trust grows. DevTrack rebuilds the social contract between KMC and its people." />
        </div>
      </section>

      <section className="relative border-y border-emerald-glow/10 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <SectionHeading
              eyebrow="// FLAGSHIP"
              title={<>Projects in <span className="text-gradient-emerald">motion</span></>}
              subtitle="The most consequential development initiatives currently shaping Kathmandu."
              noTopMargin
            />
            <Button variant="outline" className="border-emerald-glow/30 text-emerald-bright hover:bg-emerald-glow/10 glass" onClick={() => onNavigate("projects")}>
              View all <ArrowRight className="size-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {featured.map((p, i) => <FeaturedProjectCard key={p.id} project={p} index={i} onClick={() => onNavigate("project", { slug: p.slug })} />)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow="// LIVE FEED"
            title={<>Latest project <span className="text-gradient-emerald">updates</span></>}
            subtitle="Real-time announcements from KMC project teams."
            noTopMargin
          />
          <div className="mt-6 space-y-3">
            {recentUpdates.length === 0 && (
              <div className="text-center py-12 text-muted-foreground font-mono text-sm">{"// awaiting updates…"}</div>
            )}
            {recentUpdates.map(({ project, update }) => {
              const Icon = CAT_ICON[project.category.slug] || Building2;
              return (
                <div
                  key={update.id}
                  className="bento-card cursor-pointer group p-4 flex gap-4 items-start"
                  onClick={() => onNavigate("project", { slug: project.slug })}
                >
                  <div className="size-10 rounded-lg flex items-center justify-center shrink-0 border border-emerald-glow/20" style={{ backgroundColor: `${project.category.color}20` }}>
                    <Icon className="size-5" style={{ color: project.category.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded" style={{ color: updateTypeColor(update.type), backgroundColor: `${updateTypeColor(update.type)}20` }}>
                        {update.type}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{timeAgo(update.createdAt)}</span>
                    </div>
                    <h4 className="font-semibold mt-1.5 leading-snug group-hover:text-emerald-bright transition-colors">{update.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{update.body}</p>
                    <p className="text-xs text-emerald-bright/70 font-mono mt-2 truncate">{project.title}</p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-emerald-bright group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="// FORUM PULSE" title={<>Citizens are <span className="text-gradient-emerald">saying</span></>} noTopMargin />
          <div className="mt-6 space-y-3">
            {topThreads.map((t) => (
              <div key={t.id} className="bento-card cursor-pointer p-4 group" onClick={() => onNavigate("forum")}>
                <div className="flex items-start gap-3">
                  <Quote className="size-4 text-emerald-bright mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-emerald-bright transition-colors">{t.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Avatar className="size-5 border border-emerald-glow/20"><AvatarFallback style={{ backgroundColor: t.author.avatarColor, color: "white", fontSize: 9 }}>{t.author.name[0]}</AvatarFallback></Avatar>
                      <span className="font-mono">{t.author.name}</span>
                      <span>·</span>
                      <span className="font-mono">{timeAgo(t.createdAt)}</span>
                      <span>·</span>
                      <span className="font-mono">{t.comments.length} replies</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-emerald-glow/30 text-emerald-bright hover:bg-emerald-glow/10 glass" onClick={() => onNavigate("forum")}>
              Join the conversation <ArrowRight className="size-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      <section className="relative border-y border-emerald-glow/10 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="// 8 SECTORS"
            title={<>Kathmandu's development, <span className="text-gradient-emerald">organized</span></>}
            subtitle="Every KMC project falls into one of these eight categories — making it easy to find what matters to you."
            noTopMargin
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(stats?.categoriesWithCounts || []).map((c: any) => {
              if (!c.category) return null;
              const Icon = CAT_ICON[c.category.slug] || Building2;
              return (
                <div key={c.category.id} className="bento-card cursor-pointer p-5 group corner-accent" onClick={() => onNavigate("projects", { categoryId: c.category.id })}>
                  <div className="size-10 rounded-lg flex items-center justify-center mb-3 border" style={{ backgroundColor: `${c.category.color}15`, borderColor: `${c.category.color}40` }}>
                    <Icon className="size-5" style={{ color: c.category.color }} />
                  </div>
                  <p className="font-semibold">{c.category.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.category.description}</p>
                  <div className="mt-4 pt-3 border-t border-emerald-glow/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-display font-bold ticker-num" style={{ color: c.category.color }}>{c.count}</span>
                      <span className="text-xs text-muted-foreground ml-1">projects</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{formatNPR(c.budget)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl glass-strong glow-emerald-strong p-8 sm:p-14">
          <div className="absolute inset-0 mesh-animated opacity-40" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="size-5 text-lime-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-lime-accent">{"// BETA · LIVE NOW"}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl leading-[1.05] tracking-tight">
              This is the <span className="text-gradient-emerald">beta.</span><br />
              Your voice shapes what DevTrack becomes.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-2xl leading-relaxed text-lg">
              DevTrack launches tonight as a public beta for Kathmandu Metropolitan City. Every comment, every bug report,
              every idea you submit on the Beta Feedback Wall goes directly to the team and to KMC leadership.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-emerald-glow hover:bg-emerald-glow/90 text-background font-semibold glow-emerald" onClick={() => onNavigate("beta")}>
                <Sparkles className="size-4 mr-2" /> Share Beta Feedback
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-glow/30 text-foreground hover:bg-emerald-glow/10 glass" onClick={() => onNavigate("about")}>
                Read the vision <ArrowRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BentoStat({ icon: Icon, label, value, sub, color, big }: { icon: any; label: string; value: string; sub: string; color: string; big?: boolean }) {
  return (
    <div className="bento-card p-4 sm:p-5 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="size-7 rounded-md flex items-center justify-center border" style={{ backgroundColor: `${color}15`, borderColor: `${color}40` }}>
          <Icon className="size-3.5" style={{ color }} />
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{label}</span>
      </div>
      <p className={`font-display font-bold leading-none ticker-num ${big ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`} style={{ color }}>{value}</p>
      <p className="text-xs text-muted-foreground mt-2 font-mono">{sub}</p>
      <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30" style={{ color }} />
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle, noTopMargin }: { eyebrow?: string; title: React.ReactNode; subtitle?: string; noTopMargin?: boolean }) {
  return (
    <div className={noTopMargin ? "" : "mt-8"}>
      {eyebrow && <p className="text-xs uppercase tracking-widest text-emerald-bright font-mono mb-2">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
}

function MissionPillar({ index, icon: Icon, title, body }: { index: string; icon: any; title: string; body: string }) {
  return (
    <div className="bento-card p-6 h-full flex flex-col group">
      <div className="flex items-center justify-between mb-4">
        <div className="size-12 rounded-lg flex items-center justify-center bg-emerald-glow/10 border border-emerald-glow/30">
          <Icon className="size-6 text-emerald-bright" />
        </div>
        <span className="font-mono text-xs text-muted-foreground/60">{index}</span>
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{body}</p>
    </div>
  );
}

function FeaturedProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const Icon = CAT_ICON[project.category.slug] || Building2;
  const sm = statusMeta(project.status);
  const budgetPct = project.budgetAllocated > 0 ? Math.round((project.budgetSpent / project.budgetAllocated) * 100) : 0;
  return (
    <div className="bento-card cursor-pointer h-full flex flex-col" onClick={onClick}>
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-lg flex items-center justify-center border" style={{ backgroundColor: `${project.category.color}18`, borderColor: `${project.category.color}40` }}>
              <Icon className="size-5" style={{ color: project.category.color }} />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                {project.category.name}{project.ward ? ` · WARD ${project.ward.number}` : ""}
              </p>
              <p className="text-[10px] font-mono text-muted-foreground/60">PROJECT #{String(index + 1).padStart(2, "0")}</p>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded badge-glow" style={{ backgroundColor: `${sm.color}20`, color: sm.color }}>{sm.label}</span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.summary}</p>
      </div>
      <div className="px-6 pb-6 space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground font-mono uppercase tracking-wider text-[10px]">PROGRESS</span>
            <span className="font-mono font-bold text-emerald-bright">{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-emerald-glow/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-glow to-lime-accent" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs pt-2">
          <div>
            <p className="text-muted-foreground font-mono uppercase text-[9px] tracking-wider">Budget</p>
            <p className="font-semibold font-mono text-sm">{formatNPR(project.budgetAllocated)}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground font-mono uppercase text-[9px] tracking-wider">Spent · {budgetPct}%</p>
            <p className="font-semibold font-mono text-sm text-emerald-bright">{formatNPR(project.budgetSpent)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs pt-3 border-t border-emerald-glow/10">
          <span className="text-muted-foreground flex items-center gap-1 font-mono"><CalendarClock className="size-3" /> {formatDate(project.endDatePlanned)}</span>
          <span className="text-emerald-bright font-medium flex items-center font-mono text-[10px] uppercase tracking-wider">View Details <ChevronRight className="size-3" /></span>
        </div>
      </div>
    </div>
  );
}

function updateTypeColor(type: string) {
  const m: Record<string, string> = { PROGRESS: "#10B981", BUDGET: "#A3E635", DELAY: "#F87171", COMPLETION: "#6EE7B7", ISSUE: "#FBBF24" };
  return m[type] || "#10B981";
}
