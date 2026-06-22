"use client";

import { useEffect, useState, ReactNode } from "react";
import {
  Activity, Building2, Menu, MessageSquare, Sparkles, Users,
  Bell, LogIn, LogOut, LayoutDashboard, ChevronDown, MapPin, Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { AuthModal } from "./AuthModal";

const NAV = [
  { id: "home", label: "Home", icon: Activity },
  { id: "projects", label: "Projects", icon: Building2 },
  { id: "officials", label: "Officials", icon: Users },
  { id: "forum", label: "Forum", icon: MessageSquare },
  { id: "beta", label: "Beta", icon: Sparkles },
  { id: "about", label: "Vision", icon: Flag },
];

export function DevTrackLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 28 : size === "lg" ? 48 : 36;
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative shrink-0" style={{ width: dim, height: dim }}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path d="M24 2 L42 12 L42 36 L24 46 L6 36 L6 12 Z" fill="none" stroke="url(#dt-grad)" strokeWidth="2.5" />
          <path d="M16 14 L24 14 C31.7 14 38 18.9 38 24 C38 29.1 31.7 34 24 34 L16 34 Z" fill="url(#dt-grad)" />
          <path d="M10 24 L16 24 L18 19 L22 29 L24 24 L38 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="dt-grad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#A3E635" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="leading-none">
        <p className={`font-display font-bold tracking-tight ${size === "lg" ? "text-2xl" : "text-base"}`}>
          Dev<span className="text-gradient-emerald">Track</span>
        </p>
        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">KMC · Beta v1.0</p>
      </div>
    </div>
  );
}

interface AppShellProps {
  active: string;
  onNavigate: (tab: string) => void;
  children: ReactNode;
}

function AppShellInner({ active, onNavigate, children }: AppShellProps) {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <div className="fixed inset-0 mesh-animated opacity-50 pointer-events-none" />
      <div className="fixed inset-0 grid-overlay pointer-events-none opacity-60" />

      <header className={`sticky top-0 z-40 transition-all ${scrolled ? "glass-strong border-b border-emerald-glow/15" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <button onClick={() => go("home")} className="shrink-0">
            <DevTrackLogo size="md" />
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full glass">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-glow" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-bright">LIVE · KMC</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 ml-2">
            {NAV.map((n) => {
              const Icon = n.icon;
              const isActive = active === n.id || (active === "project" && n.id === "projects") || (active === "dashboard" && n.id === "home");
              return (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isActive ? "text-foreground bg-emerald-glow/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? "text-emerald-bright" : ""}`} /> {n.label}
                  {isActive && <span className="absolute -bottom-px left-2 right-2 h-px bg-gradient-to-r from-transparent via-emerald-glow to-transparent" />}
                </button>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 pr-3 rounded-full glass hover:border-emerald-glow/30 transition-all">
                    <Avatar className="size-7">
                      <AvatarFallback style={{ backgroundColor: user.avatarColor, color: "white", fontSize: 11 }}>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 glass-strong border-emerald-glow/20">
                  <div className="p-3">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs h-5 border-emerald-glow/40 text-emerald-bright">{user.role}</Badge>
                      {user.ward && <span className="text-xs text-muted-foreground flex items-center gap-0.5"><MapPin className="size-3" /> Ward {user.ward.number}</span>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => go("dashboard")} className="cursor-pointer">
                    <LayoutDashboard className="size-4 mr-2" /> My Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => go("beta")} className="cursor-pointer">
                    <Sparkles className="size-4 mr-2" /> Beta Feedback
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); go("home"); }} className="cursor-pointer text-destructive">
                    <LogOut className="size-4 mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" className="hidden sm:flex bg-emerald-glow hover:bg-emerald-glow/90 text-background font-semibold glow-emerald" onClick={() => setAuthOpen(true)}>
                <LogIn className="size-4 mr-1" /> Sign in
              </Button>
            )}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden glass">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-strong border-l border-emerald-glow/20">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <DevTrackLogo size="sm" />
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 py-2 space-y-1">
                  {NAV.map((n) => {
                    const Icon = n.icon;
                    const isActive = active === n.id;
                    return (
                      <button
                        key={n.id}
                        onClick={() => go(n.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive ? "bg-emerald-glow/15 text-emerald-bright" : "hover:bg-white/5"
                        }`}
                      >
                        <Icon className="size-4" /> {n.label}
                      </button>
                    );
                  })}
                  {user && (
                    <button onClick={() => go("dashboard")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5">
                      <LayoutDashboard className="size-4 text-emerald-bright" /> My Dashboard
                    </button>
                  )}
                  {!user && (
                    <Button className="w-full mt-2 bg-emerald-glow hover:bg-emerald-glow/90 text-background font-semibold" onClick={() => { setMobileOpen(false); setAuthOpen(true); }}>
                      <LogIn className="size-4 mr-1" /> Sign in
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">{children}</main>

      <footer className="mt-auto border-t border-emerald-glow/15 glass relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <DevTrackLogo size="md" />
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed mt-4">
              A mission-driven transparency and accountability platform for Kathmandu Metropolitan City.
              Built by Team DevTrack at Incubate Nepal 2024. For the people of Nepal.
            </p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-bright mt-4">
              Aligned with Open Government Partnership
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Platform</p>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => go("projects")} className="hover:text-emerald-bright transition-colors">All Projects</button></li>
              <li><button onClick={() => go("officials")} className="hover:text-emerald-bright transition-colors">Officials</button></li>
              <li><button onClick={() => go("forum")} className="hover:text-emerald-bright transition-colors">Public Forum</button></li>
              <li><button onClick={() => go("beta")} className="hover:text-emerald-bright transition-colors">Beta Feedback</button></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Organization</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => go("about")} className="hover:text-emerald-bright transition-colors">About DevTrack</button></li>
              <li>Incubate Nepal 2024</li>
              <li>Kathmandu Metropolitan City</li>
              <li>Open Government Partnership</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-emerald-glow/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground font-mono">© 2024 Team DevTrack · Incubate Nepal</p>
            <p className="text-xs text-muted-foreground font-mono">BETA v1.0 · Made for the citizens of Kathmandu</p>
          </div>
        </div>
      </footer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export function AppShell(props: AppShellProps) {
  return (
    <AuthProvider>
      <AppShellInner {...props} />
    </AuthProvider>
  );
}
