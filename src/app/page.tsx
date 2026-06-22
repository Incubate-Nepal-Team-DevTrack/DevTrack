"use client";

import { useEffect, useState, useCallback } from "react";
import { AppShell } from "@/components/devtrack/AppShell";
import { HomeView } from "@/components/devtrack/HomeView";
import { ProjectsView } from "@/components/devtrack/ProjectsView";
import { ProjectDetailView } from "@/components/devtrack/ProjectDetailView";
import { ForumView } from "@/components/devtrack/ForumView";
import { OfficialsView } from "@/components/devtrack/OfficialsView";
import { DashboardView } from "@/components/devtrack/DashboardView";
import { BetaView } from "@/components/devtrack/BetaView";
import { AboutView } from "@/components/devtrack/AboutView";
import type { Project, Category, Ward, Official, ForumThread, BetaFeedback } from "@/lib/types";

export default function Home() {
  const [active, setActive] = useState("home");
  const [payload, setPayload] = useState<any>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [officials, setOfficials] = useState<Official[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [beta, setBeta] = useState<BetaFeedback[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/wards").then((r) => r.json()),
      fetch("/api/officials").then((r) => r.json()),
      fetch("/api/forum/threads").then((r) => r.json()),
      fetch("/api/beta").then((r) => r.json()),
      fetch("/api/stats").then((r) => r.json()),
    ]).then(([p, c, w, o, t, b, s]) => {
      setProjects(p.projects || []);
      setCategories(c.categories || []);
      setWards(w.wards || []);
      setOfficials(o.officials || []);
      setThreads(t.threads || []);
      setBeta(b.feedback || []);
      setStats(s);
      setLoaded(true);
    }).catch((err) => {
      console.error("Failed to load DevTrack data:", err);
      setLoaded(true);
    });
  }, []);

  const onNavigate = useCallback((tab: string, p?: any) => {
    setActive(tab);
    setPayload(p || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AppShell active={active} onNavigate={onNavigate}>
      {!loaded ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="size-12 mx-auto mb-4 rounded-full border-2 border-emerald-glow/30 border-t-emerald-glow animate-spin" />
            <p className="text-sm font-mono text-emerald-bright uppercase tracking-widest">{"// Loading DevTrack…"}</p>
          </div>
        </div>
      ) : (
        <>
          {active === "home" && (
            <HomeView projects={projects} threads={threads} stats={stats} onNavigate={onNavigate} />
          )}
          {active === "projects" && (
            <ProjectsView
              projects={projects}
              categories={categories}
              wards={wards}
              initialCategoryId={payload?.categoryId}
              onOpenProject={(slug) => onNavigate("project", { slug })}
            />
          )}
          {active === "project" && payload?.slug && (
            <ProjectDetailView
              slug={payload.slug}
              onBack={() => onNavigate("projects")}
              onOpenProject={(slug) => onNavigate("project", { slug })}
              onNavigate={onNavigate}
            />
          )}
          {active === "forum" && (
            <ForumView projectId={payload?.projectId} initialThreads={threads} />
          )}
          {active === "officials" && <OfficialsView officials={officials} />}
          {active === "dashboard" && (
            <DashboardView projects={projects} onOpenProject={(slug) => onNavigate("project", { slug })} onNavigate={onNavigate} />
          )}
          {active === "beta" && <BetaView initial={beta} />}
          {active === "about" && <AboutView />}
        </>
      )}
    </AppShell>
  );
}
