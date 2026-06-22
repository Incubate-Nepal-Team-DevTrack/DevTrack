"use client";

import { Flag, Heart, BookOpen, Target, Sparkles, Scale, Globe2, Users, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TEAM = [
  { name: "Sugam Parajuli", role: "Researcher", bio: "Math, psychology, CS & AI. Runs his own computer shop in Pokhara.", color: "#10B981" },
  { name: "Preeti Pantha", role: "Researcher", bio: "Socio-economic enthusiast passionate about developmental economics.", color: "#A3E635" },
  { name: "Tushar Shah", role: "Researcher", bio: "Socio-economic thinker. Believes everything is achievable.", color: "#FBBF24" },
  { name: "Sampada Koirala", role: "Researcher", bio: "Economics enthusiast. Lifelong learner.", color: "#6EE7B7" },
  { name: "Sushil Bhattarai", role: "Researcher", bio: "CS enthusiast leveraging tech for positive social impact.", color: "#34D399" },
  { name: "Kristina Khanal", role: "Researcher", bio: "CS enthusiast, web designer, national hackathon Tech Girl.", color: "#84CC16" },
];

const MENTORS = [
  { name: "Shubham Jha", role: "Mentor", bio: "Junior at Franklin & Marshall College, dual degree in Economics & Mathematics. Nominated for Davis Project for Peace Fellowship.", color: "#10B981" },
  { name: "Prashim Timsina", role: "Peer Mentor", bio: "CS graduate from Trinity Int'l College. Technopreneur bringing solutions to society through tech.", color: "#A3E635" },
];

export function AboutView() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-emerald-bright font-mono mb-2">{"// THE VISION"}</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
          A transparency platform for Kathmandu —<br /><span className="text-gradient-emerald">and eventually, all of Nepal.</span>
        </h1>
        <p className="text-muted-foreground mt-5 text-lg leading-relaxed max-w-3xl">
          DevTrack began as a project by six student researchers in Incubate Nepal 2024. The mission: end the
          communication gap between the Kathmandu Metropolitan City government and its citizens by making every
          development project — its budget, schedule, contractor, and accountable officials — visible, discussable,
          and accountable to the people it serves.
        </p>
      </div>

      <div className="relative bento-card mb-10 overflow-hidden glow-emerald-strong">
        <div className="absolute inset-0 mesh-animated opacity-40" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative p-8 sm:p-12">
          <Flag className="size-10 mb-4 text-emerald-bright" />
          <p className="font-display text-xl sm:text-2xl leading-relaxed">
            "DevTrack is for the people. It exists so that every Nepali — in Kathmandu today, in all of Nepal tomorrow —
            can see what their government is doing, question it, and shape it. We build it in the open, with citizens,
            for citizens."
          </p>
          <p className="mt-5 text-muted-foreground text-sm font-mono">— Team DevTrack, Incubate Nepal 2024</p>
        </div>
      </div>

      <Section icon={Target} title="The problem we're solving" body="Kathmandu Valley is experiencing rapid urbanization with numerous development projects, but citizens lack visibility into budgets, schedules, contractors and outcomes. This lack of transparency leads to delays, budget overruns, and a culture of low accountability. Citizens don't know who to hold responsible — and even when they do, there's no direct channel to reach them." />
      <Section icon={Sparkles} title="The solution we're building" body="DevTrack is a centralized platform where every government project — categorized into eight sectors (Infrastructure, Education, Healthcare, Economy, Environment, Policy, Urban Development, Citizen Benefits) — is published with full budget breakdowns, timelines, milestones, contractors, consultants, and named accountable officials. Citizens can track projects in their ward, debate them on a public forum, vote on each other's comments, and reach officials directly via public contact details. Expert voices are prioritised so KMC gets high-quality feedback." />
      <Section icon={Scale} title="Aligned with global frameworks" body="DevTrack aligns with the Open Government Partnership (OGP) principles of transparency, civic participation, and public accountability. By making KMC's project data open and engaging citizens directly, DevTrack creates the conditions for KMC to formally join OGP — a long-term goal of this initiative. The platform also draws on Nepal's e-Governance Interoperability Framework (NeGIF) and the World Bank's Digital Dividends (2016) recommendations for digital governance." />
      <Section icon={Globe2} title="Beyond Kathmandu" body="The beta launches with Kathmandu Metropolitan City's 32 wards. The architecture is designed to scale to all 753 local governments of Nepal. Every ward, municipality, and rural municipality in the country can plug into DevTrack — same data model, same public forum, same accountability framework. Our north star: a single platform where any Nepali citizen can find any government project anywhere in the country, in their language, on their phone." />

      <div className="my-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="size-6 text-emerald-bright" /> Our goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Enhance community engagement and communication with KMC",
            "Improve financial accountability and transparency in projects",
            "Ensure accessible and clear information on development projects",
            "Create a public forum where citizen voices reach the government",
            "Prioritise expert opinions to give valuable insights to KMC",
            "Position KMC for Open Government Partnership membership",
          ].map((g, i) => (
            <div key={i} className="bento-card p-4 flex items-start gap-3">
              <span className="font-mono text-xs text-emerald-bright bg-emerald-glow/15 px-2 py-1 rounded shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm">{g}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-12">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2"><Users className="size-6 text-emerald-bright" /> The team</h2>
        <p className="text-muted-foreground mb-6 font-mono text-sm">{"// SIX STUDENT RESEARCHERS · ONE MENTOR · ONE PEER MENTOR · INCUBATE NEPAL 2024"}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {TEAM.map((m) => (
            <div key={m.name} className="bento-card p-4 flex items-start gap-3 group">
              <Avatar className="size-11 border border-emerald-glow/20"><AvatarFallback style={{ backgroundColor: m.color, color: "white" }}>{m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback></Avatar>
              <div>
                <p className="font-semibold text-sm">{m.name}</p>
                <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-glow/20 text-emerald-bright inline-block mt-0.5">{m.role}</span>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MENTORS.map((m) => (
            <div key={m.name} className="bento-card p-4 flex items-start gap-3 border-emerald-glow/30">
              <Avatar className="size-12 border border-emerald-glow/40"><AvatarFallback style={{ backgroundColor: m.color, color: "white", fontSize: 14 }}>{m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback></Avatar>
              <div>
                <p className="font-semibold text-sm">{m.name}</p>
                <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-glow text-background inline-block mt-0.5">{m.role}</span>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bento-card">
        <div className="p-6">
          <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2"><BookOpen className="size-5 text-emerald-bright" /> Sustainability</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            As DevTrack gains traction, governmental agencies will adopt it as their primary means of disseminating project
            information to the public — increasing trust and engagement. The platform's scalable, adaptable design ensures
            it can evolve with technological advancements and changing user needs, securing its place as a vital resource
            for tracking and managing government projects across Nepal.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="bento-card mb-6">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg flex items-center justify-center bg-emerald-glow/10 border border-emerald-glow/30">
            <Icon className="size-5 text-emerald-bright" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
