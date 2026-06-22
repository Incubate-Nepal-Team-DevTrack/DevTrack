"use client";

import { useEffect, useState } from "react";
import { Bell, MessageSquare, Activity, MapPin, LogOut, Sparkles, BadgeCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatNPR, timeAgo, statusMeta } from "@/lib/devtrack";
import type { Project } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";

interface Props {
  projects: Project[];
  onOpenProject: (slug: string) => void;
  onNavigate: (tab: string) => void;
}

export function DashboardView({ projects, onOpenProject, onNavigate }: Props) {
  const { user, logout } = useAuth();
  const [tracked, setTracked] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/projects/track").then((r) => r.json()).then((d) => setTracked(d.projectIds || []));
    fetch("/api/notifications").then((r) => r.json()).then((d) => setNotifications(d.notifications || []));
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <Sparkles className="size-12 mx-auto text-emerald-bright mb-3" />
        <h2 className="font-display text-2xl font-bold">Sign in to access your dashboard</h2>
        <p className="text-muted-foreground mt-2">Track projects, get notifications, and post on the forum.</p>
      </div>
    );
  }

  const trackedProjects = projects.filter((p) => tracked.includes(p.id));
  const myWardProjects = user.ward ? projects.filter((p) => p.ward?.id === user.ward.id) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="bento-card mb-6 overflow-hidden">
        <div className="relative p-6 sm:p-8">
          <div className="absolute inset-0 mesh-animated opacity-30" />
          <div className="absolute inset-0 grid-overlay opacity-50" />
          <div className="relative flex flex-col sm:flex-row items-start gap-4">
            <Avatar className="size-16 border-2 border-emerald-glow/40">
              <AvatarFallback style={{ backgroundColor: user.avatarColor, color: "white", fontSize: 22 }}>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{user.name}</h1>
                {user.role === "EXPERT" && <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-emerald-glow/40 text-emerald-bright"><BadgeCheck className="size-3 inline mr-1" />Expert</span>}
                {user.role === "OFFICIAL" && <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-emerald-glow text-background"><Shield className="size-3 inline mr-1" />Official</span>}
                {user.role === "ADMIN" && <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-emerald-glow text-background">Admin</span>}
              </div>
              <p className="text-muted-foreground text-sm mt-1 font-mono">{user.email}</p>
              {user.expertise && <p className="text-emerald-bright/70 text-sm mt-1 italic">{user.expertise}</p>}
              {user.ward && <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1 font-mono"><MapPin className="size-3" /> Ward {user.ward.number} · {user.ward.name}</p>}
            </div>
            <Button variant="outline" className="border-emerald-glow/30 text-emerald-bright hover:bg-emerald-glow/10 glass" onClick={logout}>
              <LogOut className="size-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="size-4 text-emerald-bright" />
                <h2 className="font-display text-lg font-semibold">Tracked projects</h2>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{trackedProjects.length} TOTAL</span>
            </div>
            <div className="p-5">
              {trackedProjects.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="font-mono text-sm">{"// not tracking any projects yet"}</p>
                  <Button variant="outline" className="mt-3 border-emerald-glow/30 text-emerald-bright hover:bg-emerald-glow/10 glass" onClick={() => onNavigate("projects")}>
                    <Activity className="size-4 mr-1" /> Explore projects
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {trackedProjects.map((p) => {
                    const sm = statusMeta(p.status);
                    return (
                      <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-glow/5 cursor-pointer transition-colors" onClick={() => onOpenProject(p.slug)}>
                        <span className="size-2 rounded-full badge-glow" style={{ backgroundColor: sm.color, color: sm.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{p.title}</p>
                          <p className="text-xs text-muted-foreground font-mono">{p.category.name} · {formatNPR(p.budgetAllocated)} · {p.progress}% complete</p>
                        </div>
                        <div className="h-1.5 w-16 bg-emerald-glow/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-glow to-lime-accent" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {user.ward && (
            <div className="bento-card">
              <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
                <MapPin className="size-4 text-emerald-bright" />
                <h2 className="font-display text-lg font-semibold">My Ward ({user.ward.number})</h2>
                <span className="font-mono text-xs text-muted-foreground ml-auto">{myWardProjects.length} PROJECTS</span>
              </div>
              <div className="p-5">
                {myWardProjects.length === 0 ? (
                  <p className="text-sm text-muted-foreground font-mono">{"// no projects in your ward right now"}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {myWardProjects.slice(0, 4).map((p) => (
                      <div key={p.id} className="p-3 rounded-lg border border-emerald-glow/15 cursor-pointer hover:border-emerald-glow/40 hover:bg-emerald-glow/5 transition-all" onClick={() => onOpenProject(p.slug)}>
                        <p className="font-medium text-sm line-clamp-2">{p.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 font-mono">{statusMeta(p.status).label} · {formatNPR(p.budgetAllocated)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
              <Bell className="size-4 text-emerald-bright" />
              <h2 className="font-display text-base font-semibold">Notifications</h2>
            </div>
            <div className="p-5">
              {notifications.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4 font-mono">{"// no notifications yet"}</p>
              ) : (
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded bg-emerald-glow/5 border border-emerald-glow/10">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 font-mono">{timeAgo(n.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bento-card">
            <div className="p-5 border-b border-emerald-glow/10">
              <h2 className="font-display text-base font-semibold">Quick actions</h2>
            </div>
            <div className="p-3 space-y-1">
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-glow/10" onClick={() => onNavigate("forum")}><MessageSquare className="size-4 mr-2 text-emerald-bright" /> Open forum</Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-glow/10" onClick={() => onNavigate("projects")}><Activity className="size-4 mr-2 text-emerald-bright" /> Browse projects</Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-glow/10" onClick={() => onNavigate("officials")}><MapPin className="size-4 mr-2 text-emerald-bright" /> Find officials</Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-emerald-glow/10" onClick={() => onNavigate("beta")}><Sparkles className="size-4 mr-2 text-emerald-bright" /> Beta feedback</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
