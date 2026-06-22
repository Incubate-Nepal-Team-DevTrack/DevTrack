"use client";

import { Phone, Mail, MapPin, Clock, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import type { Official } from "@/lib/types";
import { formatDate } from "@/lib/devtrack";

interface Props {
  officials: Official[];
}

export function OfficialsView({ officials }: Props) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");

  const filtered = useMemo(() => {
    return officials.filter((o) => {
      if (role === "EXEC" && !["Mayor", "Deputy Mayor"].includes(o.title)) return false;
      if (role === "WARD" && !o.title.includes("Ward")) return false;
      if (role === "DEPT" && !o.title.includes("Chief")) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!o.name.toLowerCase().includes(q) && !o.portfolio.toLowerCase().includes(q) && !o.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [officials, search, role]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-emerald-bright font-mono mb-2">{"// DIRECT CONTACT"}</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
          Reach the people who<br /><span className="text-gradient-emerald">govern you — directly.</span>
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base">
          Every official listed here has a public phone, email, office address, and surgery hours. Use them. Democracy works when citizens show up.
        </p>
      </div>

      <div className="bento-card mb-6 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name, role or ward…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-emerald-glow/5 border-emerald-glow/20 font-mono text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[{ v: "ALL", l: "All" }, { v: "EXEC", l: "Mayor & Deputy" }, { v: "WARD", l: "Ward Chairs" }, { v: "DEPT", l: "Dept. Chiefs" }].map((r) => (
            <Button key={r.v} variant={role === r.v ? "default" : "outline"} size="sm" onClick={() => setRole(r.v)} className={role === r.v ? "bg-emerald-glow text-background" : "border-emerald-glow/30 text-foreground hover:bg-emerald-glow/10 glass"}>{r.l}</Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((o) => <OfficialCard key={o.id} official={o} />)}
      </div>
    </div>
  );
}

function OfficialCard({ official }: { official: Official }) {
  const isExec = ["Mayor", "Deputy Mayor"].includes(official.title);
  return (
    <div className={`bento-card h-full ${isExec ? "border-emerald-glow/40" : ""}`}>
      <div className="p-5 border-b border-emerald-glow/10">
        <div className="flex items-start gap-3">
          <div className="size-14 rounded-full flex items-center justify-center shrink-0 text-white text-xl font-bold border-2" style={{ backgroundColor: official.photoColor, borderColor: isExec ? "var(--emerald-glow)" : "transparent" }}>
            {official.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-semibold leading-snug">{official.name}</h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${isExec ? "bg-emerald-glow text-background" : "bg-emerald-glow/15 text-emerald-bright"}`}>{official.title}</span>
              {official.party && <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-glow/20 text-muted-foreground">{official.party}</span>}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">{official.portfolio}</p>
      </div>
      <div className="p-5 space-y-2.5 text-sm">
        <ContactRow icon={Phone} label={official.phone} href={`tel:${official.phone}`} />
        <ContactRow icon={Mail} label={official.email} href={`mailto:${official.email}`} />
        <ContactRow icon={MapPin} label={official.officeAddress} />
        <ContactRow icon={Clock} label={<><span className="font-mono uppercase text-[10px] text-muted-foreground">SURGERY:</span> {official.surgeryHours}</>} />
        {official.ward && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-emerald-glow/10 font-mono">
            <Users className="size-3" /> Represents Ward {official.ward.number}
          </div>
        )}
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">In office since {formatDate(official.termStart)}</p>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, href }: { icon: any; label: React.ReactNode; href?: string }) {
  const inner = (
    <div className="flex items-start gap-2">
      <Icon className="size-3.5 text-emerald-bright mt-0.5 shrink-0" />
      <span className="text-xs leading-relaxed">{label}</span>
    </div>
  );
  return href ? <a href={href} className="hover:text-emerald-bright transition-colors block">{inner}</a> : inner;
}
