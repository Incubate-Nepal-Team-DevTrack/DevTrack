"use client";

import { useEffect, useState } from "react";
import { Bug, Lightbulb, Heart, Star, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { timeAgo } from "@/lib/devtrack";
import type { BetaFeedback as BetaFeedbackType } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

const CATEGORY_META: Record<string, { label: string; color: string; icon: any }> = {
  BUG: { label: "Bug", color: "#F87171", icon: Bug },
  FEATURE: { label: "Feature request", color: "#10B981", icon: Lightbulb },
  IDEA: { label: "Idea", color: "#A3E635", icon: Sparkles },
  PRAISE: { label: "Praise", color: "#6EE7B7", icon: Heart },
};

interface Props {
  initial: BetaFeedbackType[];
}

export function BetaView({ initial }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<BetaFeedbackType[]>(initial);
  const [authorName, setAuthorName] = useState(user?.name || "");
  const [category, setCategory] = useState("FEATURE");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (user) setAuthorName(user.name); }, [user]);

  const submit = async () => {
    if (!authorName.trim() || !body.trim()) { toast({ title: "Name and feedback required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName, category, body, rating }),
      });
      const d = await res.json();
      setFeedback((prev) => [d.feedback, ...prev]);
      setBody("");
      setRating(5);
      toast({ title: "Thanks! Your feedback shapes DevTrack." });
    } finally { setSubmitting(false); }
  };

  const avgRating = feedback.length > 0 ? (feedback.reduce((a, f) => a + f.rating, 0) / feedback.length) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-emerald-bright font-mono mb-2">{"// BETA FEEDBACK WALL"}</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
          Help us build<br /><span className="text-gradient-emerald">DevTrack for Nepal.</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
          DevTrack is in public beta. Every comment, bug, and idea below goes directly to the team and to KMC leadership.
          {feedback.length > 0 && <span className="ml-1">Average rating: <span className="font-mono font-semibold text-lime-accent">{avgRating.toFixed(1)} / 5</span> across {feedback.length} responses.</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bento-card lg:col-span-1 h-fit lg:sticky lg:top-6">
          <div className="p-5 border-b border-emerald-glow/10 flex items-center gap-2">
            <Send className="size-4 text-emerald-bright" />
            <h2 className="font-display text-lg font-semibold">Share your feedback</h2>
          </div>
          <div className="p-5 space-y-3">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Your name</label>
              <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Anonymous Citizen" className="bg-emerald-glow/5 border-emerald-glow/20" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-emerald-glow/5 border-emerald-glow/20"><SelectValue /></SelectTrigger>
                <SelectContent className="glass-strong border-emerald-glow/20">
                  <SelectItem value="FEATURE">Feature request</SelectItem>
                  <SelectItem value="BUG">Bug report</SelectItem>
                  <SelectItem value="IDEA">Idea</SelectItem>
                  <SelectItem value="PRAISE">Praise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Your feedback</label>
              <Textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Tell us what's working, what's broken, or what you wish DevTrack could do…" className="bg-emerald-glow/5 border-emerald-glow/20" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Rating: <span className="text-lime-accent">{rating} / 5</span></label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)} className="p-1 hover:scale-110 transition-transform">
                    <Star className={`size-6 ${n <= rating ? "fill-lime-accent text-lime-accent" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>
            <Button className="w-full bg-emerald-glow hover:bg-emerald-glow/90 text-background font-semibold glow-emerald" onClick={submit} disabled={submitting}>
              <Send className="size-4 mr-2" /> {submitting ? "Posting…" : "Post feedback"}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-mono">{feedback.length} FEEDBACK ITEMS</p>
          </div>
          {feedback.length === 0 ? (
            <div className="bento-card py-12 text-center text-muted-foreground">
              <Sparkles className="size-8 mx-auto mb-3 opacity-40" />
              <p className="font-mono text-sm">{"// be the first to share feedback"}</p>
            </div>
          ) : (
            feedback.map((f) => {
              const meta = CATEGORY_META[f.category] || CATEGORY_META.FEATURE;
              const Icon = meta.icon;
              return (
                <div key={f.id} className="bento-card group">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="size-9 shrink-0 border border-emerald-glow/20">
                        <AvatarFallback style={{ backgroundColor: f.user?.avatarColor || "#6b7280", color: "white", fontSize: 12 }}>{f.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{f.authorName}</span>
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded" style={{ color: meta.color, backgroundColor: `${meta.color}20` }}>
                            <Icon className="size-3 inline mr-0.5" />{meta.label}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">{timeAgo(f.createdAt)}</span>
                          <div className="ml-auto flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star key={n} className={`size-3 ${n <= f.rating ? "fill-lime-accent text-lime-accent" : "text-muted-foreground/20"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mt-2 leading-relaxed">{f.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
