"use client";

import { useEffect, useState, useMemo } from "react";
import { MessageSquare, Pin, ThumbsUp, ThumbsDown, BadgeCheck, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/devtrack";
import type { ForumThread as ForumThreadType } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

interface Props {
  projectId?: string;
  initialThreads: ForumThreadType[];
}

export function ForumView({ projectId, initialThreads }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [threads, setThreads] = useState<ForumThreadType[]>(initialThreads);
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    if (projectId) return threads.filter((t) => t.project?.id === projectId);
    return threads.filter((t) => !t.project);
  }, [threads, projectId]);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    fetch(`/api/forum/threads?projectId=${projectId}`)
      .then((r) => r.json())
      .then((d) => { setThreads(d.threads); setLoading(false); });
  }, [projectId]);

  const submitThread = async () => {
    if (!user) { toast({ title: "Sign in to post", variant: "destructive" }); return; }
    if (!newTitle.trim() || !newBody.trim()) { toast({ title: "Title & body required", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/forum/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, body: newBody, projectId: projectId || null }),
      });
      const d = await res.json();
      setThreads((prev) => [d.thread, ...prev]);
      setNewTitle(""); setNewBody(""); setShowNew(false);
      toast({ title: "Thread posted", description: "Your discussion is now public." });
    } finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-bright font-mono mb-2">{"// PUBLIC FORUM"}</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
            A direct line between<br /><span className="text-gradient-emerald">citizens and government.</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
            Every Nepali can post concerns, questions, and ideas on DevTrack. Expert and official responses are highlighted.
          </p>
        </div>
        <Button className="bg-emerald-glow hover:bg-emerald-glow/90 text-background font-semibold glow-emerald" onClick={() => setShowNew((v) => !v)}>
          <MessageSquare className="size-4 mr-2" /> New thread
        </Button>
      </div>

      {showNew && (
        <div className="bento-card mb-6 border-emerald-glow/30">
          <div className="p-4 space-y-3">
            <Input placeholder="Thread title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="bg-emerald-glow/5 border-emerald-glow/20" />
            <Textarea placeholder="Describe your concern, idea or question in detail…" rows={4} value={newBody} onChange={(e) => setNewBody(e.target.value)} className="bg-emerald-glow/5 border-emerald-glow/20" />
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
              <Button onClick={submitThread} disabled={submitting} className="bg-emerald-glow hover:bg-emerald-glow/90 text-background">
                <Send className="size-4 mr-2" /> {submitting ? "Posting…" : "Post thread"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted-foreground py-12 font-mono text-sm">{"// loading threads…"}</p>
      ) : filtered.length === 0 ? (
        <div className="bento-card py-12 text-center text-muted-foreground">
          <MessageSquare className="size-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono text-sm">{"// no threads yet — be the first"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((t) => <ThreadCard key={t.id} thread={t} />)}
        </div>
      )}
    </div>
  );
}

function ThreadCard({ thread }: { thread: ForumThreadType }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [replyBody, setReplyBody] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [comments, setComments] = useState(thread.comments || []);
  const [submitting, setSubmitting] = useState(false);

  const submitReply = async () => {
    if (!user) { toast({ title: "Sign in to reply", variant: "destructive" }); return; }
    if (!replyBody.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/forum/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: thread.id, body: replyBody }),
      });
      const d = await res.json();
      setComments((prev) => [...prev, d.comment]);
      setReplyBody(""); setShowReply(false);
      toast({ title: "Reply posted" });
    } finally { setSubmitting(false); }
  };

  return (
    <div className={`bento-card ${thread.pinned ? "border-emerald-glow/40" : ""}`}>
      <div className="p-5 border-b border-emerald-glow/10">
        <div className="flex items-start gap-3">
          <Avatar className="size-10 shrink-0 border border-emerald-glow/20">
            <AvatarFallback style={{ backgroundColor: thread.author.avatarColor, color: "white" }}>{thread.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {thread.pinned && <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-glow/20 text-emerald-bright"><Pin className="size-3 inline mr-1" />Pinned</span>}
              {thread.project && <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border" style={{ color: thread.project.category?.color, borderColor: `${thread.project.category?.color}40` }}>{thread.project.title}</span>}
            </div>
            <h3 className="font-display text-lg font-semibold mt-1.5 leading-snug">{thread.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {thread.author.name} · {timeAgo(thread.createdAt)}
              {thread.author.role === "EXPERT" && <span className="ml-2 font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-glow/30 text-emerald-bright"><BadgeCheck className="size-3 inline mr-0.5" />Expert</span>}
              {(thread.author.role === "OFFICIAL" || thread.author.role === "ADMIN") && <span className="ml-2 font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-glow/15 text-emerald-bright"><Shield className="size-3 inline mr-0.5" />Official</span>}
              {thread.author.expertise && <span className="ml-2 text-xs italic text-muted-foreground">— {thread.author.expertise}</span>}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">{thread.body}</p>
        <div className="border-t border-emerald-glow/10 my-4" />
        {comments.length > 0 && (
          <div className="space-y-3">
            {comments.map((c) => <CommentItem key={c.id} comment={c} />)}
          </div>
        )}
        <div className="mt-4">
          {showReply ? (
            <div className="space-y-2">
              <Textarea placeholder="Write a respectful, factual reply…" rows={3} value={replyBody} onChange={(e) => setReplyBody(e.target.value)} className="bg-emerald-glow/5 border-emerald-glow/20" />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => setShowReply(false)}>Cancel</Button>
                <Button size="sm" onClick={submitReply} disabled={submitting} className="bg-emerald-glow hover:bg-emerald-glow/90 text-background">
                  <Send className="size-3 mr-1" /> {submitting ? "Posting…" : "Post reply"}
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowReply(true)} className="border-emerald-glow/30 text-emerald-bright hover:bg-emerald-glow/10 glass">
              <MessageSquare className="size-3 mr-1" /> Reply
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: any }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [myVote, setMyVote] = useState(0);
  const [score, setScore] = useState<number>(comment.votes.reduce((a: number, v: any) => a + v.value, 0));

  const vote = async (value: number) => {
    if (!user) { toast({ title: "Sign in to vote", variant: "destructive" }); return; }
    const res = await fetch(`/api/comments/vote?commentId=${comment.id}&value=${value}`, { method: "POST" });
    const d = await res.json();
    if (d.vote === 0) { setScore((s) => s - myVote); setMyVote(0); }
    else { setScore((s) => s - myVote + d.vote); setMyVote(d.vote); }
  };

  return (
    <div className={`flex gap-3 p-3 rounded-lg ${comment.isOfficial ? "bg-emerald-glow/5 border border-emerald-glow/20" : ""}`}>
      <Avatar className="size-8 shrink-0 border border-emerald-glow/20">
        <AvatarFallback style={{ backgroundColor: comment.author.avatarColor, color: "white", fontSize: 11 }}>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground font-mono">{timeAgo(comment.createdAt)}</span>
          {comment.author.role === "EXPERT" && <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-glow/30 text-emerald-bright"><BadgeCheck className="size-3 inline mr-0.5" />Expert</span>}
          {comment.isOfficial && <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-glow/20 text-emerald-bright"><Shield className="size-3 inline mr-0.5" />Official Response</span>}
          {comment.author.expertise && <span className="text-xs italic text-muted-foreground">— {comment.author.expertise}</span>}
        </div>
        <p className="text-sm mt-1.5 leading-relaxed whitespace-pre-line">{comment.body}</p>
        <div className="flex items-center gap-1 mt-2">
          <Button variant="ghost" size="sm" className="h-7 px-2 hover:bg-emerald-glow/10" onClick={() => vote(1)}>
            <ThumbsUp className={`size-3 mr-1 ${myVote === 1 ? "text-emerald-bright" : ""}`} /> <span className="font-mono text-xs">{score > 0 ? score : ""}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 hover:bg-emerald-glow/10" onClick={() => vote(-1)}>
            <ThumbsDown className={`size-3 ${myVote === -1 ? "text-destructive" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
