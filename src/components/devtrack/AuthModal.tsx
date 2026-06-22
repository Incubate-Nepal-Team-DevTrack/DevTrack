"use client";

import { useState } from "react";
import { X, Sparkles, ShieldCheck, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { DevTrackLogo } from "./AppShell";

interface Props {
  open: boolean;
  onClose: () => void;
}

const QUICK_LOGINS = [
  { email: "admin@devtrack.gov.np", label: "Admin", color: "#10B981" },
  { email: "mayor@kmc.gov.np", label: "Mayor (Official)", color: "#A3E635" },
  { email: "sushil@devtrack.np", label: "Sushil (Expert)", color: "#6EE7B7" },
  { email: "rajesh@citizen.np", label: "Rajesh (Citizen)", color: "#34D399" },
  { email: "sita@citizen.np", label: "Sita (Citizen)", color: "#84CC16" },
];

export function AuthModal({ open, onClose }: Props) {
  const { login } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const submit = async () => {
    if (!email.trim()) { toast({ title: "Email required", variant: "destructive" }); return; }
    setBusy(true);
    const result = await login(email.trim(), mode === "signup" ? name.trim() : undefined);
    setBusy(false);
    if (!result.ok) {
      toast({ title: "Login failed", description: result.error, variant: "destructive" });
      return;
    }
    toast({ title: mode === "signup" ? "Welcome to DevTrack!" : "Welcome back!" });
    onClose();
  };

  const quickLogin = async (e: string) => {
    setBusy(true);
    const r = await login(e);
    setBusy(false);
    if (r.ok) { toast({ title: "Signed in" }); onClose(); }
    else toast({ title: "Login failed", variant: "destructive" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
      <Card className="w-full max-w-md glass-strong border-emerald-glow/30 shadow-2xl glow-emerald" onClick={(e) => e.stopPropagation()}>
        <CardContent className="p-0">
          <div className="relative overflow-hidden p-6 rounded-t-lg">
            <div className="absolute inset-0 mesh-animated opacity-50" />
            <div className="absolute inset-0 grid-overlay opacity-50" />
            <div className="relative">
              <button onClick={onClose} className="absolute -top-1 -right-1 text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
              <DevTrackLogo size="sm" />
              <h2 className="font-display text-2xl font-bold mt-4">{mode === "login" ? "Welcome back" : "Join DevTrack"}</h2>
              <p className="text-muted-foreground text-sm mt-1">{mode === "login" ? "Sign in to track projects, post on the forum, and reach your officials." : "Create an account to participate in Kathmandu's transparency movement."}</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sita Tamang" className="mt-1 bg-emerald-glow/5 border-emerald-glow/20" />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 bg-emerald-glow/5 border-emerald-glow/20 font-mono text-sm" />
            </div>
            <Button className="w-full bg-emerald-glow hover:bg-emerald-glow/90 text-background font-semibold glow-emerald" onClick={submit} disabled={busy}>
              <LogIn className="size-4 mr-2" /> {busy ? "Please wait…" : (mode === "login" ? "Sign in" : "Create account")}
            </Button>

            <div className="text-center text-xs text-muted-foreground font-mono">— or try a demo account —</div>

            <div className="grid grid-cols-1 gap-2">
              {QUICK_LOGINS.map((q) => (
                <button
                  key={q.email}
                  onClick={() => quickLogin(q.email)}
                  disabled={busy}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-emerald-glow/15 hover:border-emerald-glow/40 hover:bg-emerald-glow/5 transition-colors text-left disabled:opacity-50 group"
                >
                  <div className="size-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: q.color }}>{q.label[0]}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{q.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{q.email}</p>
                  </div>
                  <Sparkles className="size-3.5 text-lime-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            <div className="text-center text-xs text-muted-foreground pt-2 border-t border-emerald-glow/10">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-emerald-bright font-medium hover:underline">
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-emerald-glow/5 p-3 rounded-lg border border-emerald-glow/10">
              <ShieldCheck className="size-4 text-emerald-bright shrink-0 mt-0.5" />
              <p>DevTrack Beta uses a simplified auth flow for demonstration. Production will use Nepal's Nagarik App integration with biometric verification.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
