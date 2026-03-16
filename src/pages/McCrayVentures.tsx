import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { ArrowLeft, Zap, Database, Brain, Mail, Clock, FileText, BarChart3, Shield, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase clients ────────────────────────────────────────────────────────
const monarkClient = createClient(
  "https://yjidsifrdmaxubkmqung.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqaWRzaWZyZG1heHVia21xdW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2ODk0MzMsImV4cCI6MjA2NjI2NTQzM30.tehK7_DavEkBmfQPxB29wVOiu8HlXLZnz97ZLkVRRfA"
);

const mccrayClient = createClient(
  "https://xobvgklybseiaimorwuu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvs9Ya2x5YnNlaWFpbW9yd3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjI0NjUsImV4cCI6MjA4OTEzODQ2NX0.MZiJaEmi9wMUHTM_yABvHMDLhSKKTyHRfKagN4DW-KI"
);

// ─── Static data ─────────────────────────────────────────────────────────────
const pipelineSteps = [
  {
    phase: "Ingest",
    icon: Database,
    nodes: [
      { name: "LinkedIn", detail: "Playwright / Chromium" },
      { name: "Indeed", detail: "Publisher API" },
      { name: "Direct Portals", detail: "lululemon · Digitas" },
    ],
  },
  {
    phase: "AI Process",
    icon: Brain,
    nodes: [
      { name: "Score & Filter", detail: "Claude AI · ≥70% threshold" },
      { name: "Resume Tailor", detail: "Mirrors JD language" },
      { name: "Auto-Submit", detail: "Logged to database" },
    ],
  },
  {
    phase: "Output",
    icon: Mail,
    nodes: [
      { name: "Dashboard", detail: "60s refresh · dark UI" },
      { name: "Digest", detail: "8am email brief" },
      { name: "Storage", detail: "Isolated database" },
    ],
  },
];

const scripts = [
  { file: "02_job_scraper.py", desc: "Scrapes LinkedIn, Indeed, and direct portals 3× daily", tech: "playwright · httpx · supabase", status: "Ready" },
  { file: "03_resume_tailor.py", desc: "Selects closest base template, rewrites bullets via Claude AI", tech: "Anthropic API · 6 base templates", status: "Ready" },
  { file: "04_auto_apply.py", desc: "Submits applications, logs match score + resume version", tech: "playwright · supabase insert", status: "Ready" },
  { file: "05_application_digest.py", desc: "Compiles overnight activity, sends 8am email via Resend", tech: "Resend API · supabase query", status: "Ready" },
  { file: "07_dashboard.html", desc: "Live dark dashboard — apps, pipeline, match avg, source chart", tech: "Supabase anon key · JS frontend", status: "Active" },
];

const cronSlots = [
  { time: "6:00 AM", label: "Wave 1", desc: "Scrape → Tailor → Apply" },
  { time: "8:00 AM", label: "Brief", desc: "Digest email" },
  { time: "12:00 PM", label: "Wave 2", desc: "Scrape → Tailor → Apply" },
  { time: "6:00 PM", label: "Wave 3", desc: "Scrape → Tailor → Apply" },
];

const resumeTemplates = [
  "lululemon Regional",
  "Digitas / AI PM",
  "Publicis Strategist",
  "JPMorgan Comms",
  "Luxury Retail",
  "General",
];

// ─── Automation team data ─────────────────────────────────────────────────────
const automationTeam = [
  { tier: "ceo",     initials: "BM", name: "Bryant McCray",  role: "Founder & CEO — Command & Vision",          script: "",                        schedule: "Always on",                           status: "active",  color: "accent" },
  { tier: "staff",   initials: "OT", name: "Odessa Taylor",  role: "Operations Manager",                         script: "Drive Auto-Organizer",    schedule: "One-time deploy · All verticals",     status: "standby", color: "teal"   },
  { tier: "staff",   initials: "MJ", name: "Marcus James",   role: "Venue Relations Coordinator",                script: "Venue Follow-Up Drafter", schedule: "Monday 8AM · Auto-drafts stale outreach", status: "active", color: "coral" },
  { tier: "staff",   initials: "NR", name: "Nia Rhodes",     role: "Inbox Intelligence Analyst",                 script: "Venue Reply Tracker",     schedule: "Every 2hrs · Auto-updates tracker",   status: "active",  color: "blue"   },
  { tier: "staff",   initials: "DW", name: "Dominic Walsh",  role: "Investor Relations Associate",               script: "Investor Outreach Suite", schedule: "19 drafts staged · Mar 21 trigger",   status: "active",  color: "amber"  },
  { tier: "staff",   initials: "KP", name: "Keisha Park",    role: "Executive Inbox Manager",                    script: "Gmail Auto-Archive",      schedule: "Daily 3AM · Clears 30d+ read email",  status: "active",  color: "teal"   },
  { tier: "staff",   initials: "—",  name: "Unfilled Role",  role: "Chief of Staff · Morning Brief",             script: "morning_brief.py",        schedule: "Designed · Not yet deployed",          status: "pending", color: "muted"  },
  { tier: "factory", initials: "ZA", name: "Zara Adesanya",  role: "Head of R&D · Script Factory",               script: "Meta-Script Generator",   schedule: "Claude API-powered · On demand",       status: "active",  color: "purple" },
];

const colorStyles: Record<string, string> = {
  accent: "text-accent border-accent/40 bg-accent/10",
  teal:   "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  coral:  "text-orange-400 border-orange-400/30 bg-orange-400/10",
  blue:   "text-sky-400 border-sky-400/30 bg-sky-400/10",
  amber:  "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  purple: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  muted:  "text-muted-foreground border-border bg-secondary/30",
};

const dotStyles: Record<string, string> = {
  active:  "bg-accent shadow-[0_0_6px_theme(colors.accent/50%)]",
  standby: "bg-muted-foreground/40",
  pending: "bg-yellow-500",
};

// ─── AutomationTeamSection ────────────────────────────────────────────────────
function AutomationTeamSection() {
  const ceo     = automationTeam.find(m => m.tier === "ceo")!;
  const staff   = automationTeam.filter(m => m.tier === "staff");
  const factory = automationTeam.find(m => m.tier === "factory")!;
  const row1    = staff.slice(0, 3);
  const row2    = staff.slice(3);

  const MemberCard = ({ m, small = false }: { m: typeof automationTeam[0]; small?: boolean }) => (
    <motion.div
      whileHover={{ y: -3 }}
      className={`border rounded-lg p-4 transition-colors duration-300 hover:border-accent/40 bg-background ${m.status === "pending" ? "opacity-50" : ""}`}
    >
      <div className={`inline-flex items-center justify-center rounded-full border font-mono font-medium mb-3 ${small ? "w-8 h-8 text-xs" : "w-9 h-9 text-xs"} ${colorStyles[m.color]}`}>
        {m.initials}
      </div>
      <p className="text-sm font-medium text-foreground mb-0.5">{m.name}</p>
      <p className="text-xs text-muted-foreground mb-2 leading-snug">{m.role}</p>
      {m.script && (
        <code className="text-[10px] text-muted-foreground/70 bg-secondary border border-border rounded px-1.5 py-0.5 block mb-2 truncate">
          {m.script}
        </code>
      )}
      <div className="flex items-center gap-1.5">
        <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles[m.status]}`} />
        <span className="text-[10px] text-muted-foreground">{m.schedule}</span>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20">
      <div className="editorial-container">
        <FadeIn>
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 rounded px-2 py-0.5">06</span>
            <h2 className="font-serif text-headline text-foreground">Automation Team</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-10 max-w-lg">6 scripts. Zero payroll. Always on.</p>
        </FadeIn>

        {/* CEO */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-0">
            <div className="border border-accent rounded-lg px-8 py-5 text-center bg-accent/5 relative min-w-[200px]">
              <div className={`inline-flex items-center justify-center rounded-full border font-mono font-medium w-10 h-10 text-sm mb-3 ${colorStyles["accent"]}`}>
                {ceo.initials}
              </div>
              <p className="text-sm font-medium text-foreground">{ceo.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{ceo.role}</p>
            </div>
          </div>
        </FadeIn>

        {/* Vertical connector */}
        <div className="flex justify-center"><div className="w-px h-6 bg-border" /></div>
        {/* Horizontal bar */}
        <div className="h-px bg-border mx-10" />

        {/* Branch drops row 1 */}
        <StaggerContainer className="grid grid-cols-3 gap-4 mb-0">
          {row1.map((_, i) => (
            <div key={i} className="flex justify-center">
              <div className="w-px h-5 bg-border" />
            </div>
          ))}
        </StaggerContainer>

        {/* Staff row 1 */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">
          {row1.map((m, i) => (
            <StaggerItem key={i}><MemberCard m={m} small /></StaggerItem>
          ))}
        </StaggerContainer>

        {/* Branch drops row 2 */}
        <StaggerContainer className="grid grid-cols-3 gap-4 mb-0">
          {row2.map((_, i) => (
            <div key={i} className="flex justify-center">
              <div className="w-px h-5 bg-border" />
            </div>
          ))}
        </StaggerContainer>

        {/* Staff row 2 */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {row2.map((m, i) => (
            <StaggerItem key={i}><MemberCard m={m} small /></StaggerItem>
          ))}
        </StaggerContainer>

        {/* Connector to factory */}
        <div className="flex justify-center"><div className="w-px h-5 bg-border" /></div>
        <div className="h-px bg-border" />
        <div className="flex justify-center"><div className="w-px h-4 bg-border" /></div>

        {/* Factory card — full width */}
        <FadeIn delay={0.4}>
          <motion.div
            whileHover={{ y: -3 }}
            className="border border-purple-400/25 rounded-lg p-5 flex items-center gap-4 bg-purple-400/5 hover:border-purple-400/50 transition-colors duration-300"
          >
            <div className={`inline-flex items-center justify-center rounded-full border font-mono font-medium w-10 h-10 text-sm flex-shrink-0 ${colorStyles["purple"]}`}>
              {factory.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{factory.name}</p>
              <p className="text-xs text-muted-foreground mb-1">{factory.role}</p>
              <code className="text-[10px] text-muted-foreground/70 bg-secondary border border-border rounded px-1.5 py-0.5 inline-block">
                {factory.script}
              </code>
              <p className="text-[10px] text-muted-foreground mt-1">{factory.schedule}</p>
            </div>
            <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-purple-400/25 bg-purple-400/10 text-purple-400 flex-shrink-0">
              Multiplier
            </span>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

const infraItems = [
  { label: "Database", value: "4 tables: job_postings · applications · resume_versions · digest_log" },
  { label: "Isolation", value: "Fully separate from primary projects" },
  { label: "Browser Engine", value: "Playwright + Chromium" },
  { label: "Dependencies", value: "playwright · httpx · supabase · python-dotenv" },
];

// ─── Live data types ──────────────────────────────────────────────────────────
interface LiveMetrics {
  // MonArk
  waitlistCount: number | null;
  sessionCount: number | null;
  // McCray Ventures job engine
  appsSent: number | null;
  avgMatchScore: number | null;
  jobsInPipeline: number | null;
  // Automation
  venueRepliesLogged: number | null;
  investorEmailsLogged: number | null;
}

// ─── useLiveMetrics hook ──────────────────────────────────────────────────────
function useLiveMetrics(refreshInterval = 60_000) {
  const [metrics, setMetrics] = useState<LiveMetrics>({
    waitlistCount: null,
    sessionCount: null,
    appsSent: null,
    avgMatchScore: null,
    jobsInPipeline: null,
    venueRepliesLogged: null,
    investorEmailsLogged: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAll = async () => {
    try {
      const [
        waitlist,
        sessions,
        apps,
        avgMatch,
        jobs,
        venueReplies,
        investorEmails,
      ] = await Promise.allSettled([
        monarkClient.from("waitlist_submissions").select("*", { count: "exact", head: true }),
        monarkClient.from("user_sessions").select("*", { count: "exact", head: true }),
        mccrayClient.from("applications").select("*", { count: "exact", head: true }),
        mccrayClient.from("applications").select("match_score"),
        mccrayClient.from("job_postings").select("*", { count: "exact", head: true }),
        monarkClient.from("venue_reply_log").select("*", { count: "exact", head: true }),
        monarkClient.from("investor_email_log").select("*", { count: "exact", head: true }),
      ]);

      // Calculate avg match score
      let avgScore: number | null = null;
      if (avgMatch.status === "fulfilled" && avgMatch.value.data) {
        const scores = avgMatch.value.data
          .map((r: { match_score: number }) => r.match_score)
          .filter((s: number) => typeof s === "number");
        if (scores.length > 0) {
          avgScore = Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length);
        }
      }

      setMetrics({
        waitlistCount: waitlist.status === "fulfilled" ? (waitlist.value.count ?? null) : null,
        sessionCount: sessions.status === "fulfilled" ? (sessions.value.count ?? null) : null,
        appsSent: apps.status === "fulfilled" ? (apps.value.count ?? null) : null,
        avgMatchScore: avgScore,
        jobsInPipeline: jobs.status === "fulfilled" ? (jobs.value.count ?? null) : null,
        venueRepliesLogged: venueReplies.status === "fulfilled" ? (venueReplies.value.count ?? null) : null,
        investorEmailsLogged: investorEmails.status === "fulfilled" ? (investorEmails.value.count ?? null) : null,
      });
      setError(false);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, refreshInterval);
    return () => clearInterval(interval);
  }, []);

  return { metrics, loading, error, lastUpdated, refresh: fetchAll };
}

// ─── AnimatedNumber ───────────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = "" }: { value: number | null; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef<number | null>(null);

  useEffect(() => {
    if (value === null) return;
    const start = prevValue.current ?? 0;
    prevValue.current = value;
    const diff = value - start;
    if (diff === 0) return;
    const steps = 30;
    const duration = 900;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setDisplay(Math.round(start + (diff * step) / steps));
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  if (value === null) return <span className="text-muted-foreground/40">—</span>;
  return <>{display}{suffix}</>;
}

// ─── LiveBadge ────────────────────────────────────────────────────────────────
function LiveBadge({ loading, error, lastUpdated, onRefresh }: {
  loading: boolean;
  error: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
}) {
  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className="flex items-center gap-3">
      {error ? (
        <span className="flex items-center gap-1.5 text-xs text-red-400">
          <WifiOff className="h-3 w-3" /> Connection error
        </span>
      ) : loading ? (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3 animate-spin" /> Fetching…
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-xs text-accent">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Live{timeStr ? ` · ${timeStr}` : ""}
        </span>
      )}
      <button
        onClick={onRefresh}
        className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
      >
        <RefreshCw className="h-3 w-3" /> Refresh
      </button>
    </div>
  );
}

// ─── LiveMetricsGrid ──────────────────────────────────────────────────────────
function LiveMetricsGrid() {
  const { metrics, loading, error, lastUpdated, refresh } = useLiveMetrics(60_000);

  const panels = [
    {
      label: "MonArk",
      tag: "Relationship Platform",
      color: "border-accent/40 bg-accent/5",
      items: [
        { key: "Waitlist", value: metrics.waitlistCount },
        { key: "Sessions", value: metrics.sessionCount },
      ],
    },
    {
      label: "Job Engine",
      tag: "McCray Ventures",
      color: "border-border bg-secondary/30",
      items: [
        { key: "Apps Sent", value: metrics.appsSent },
        { key: "Avg Match", value: metrics.avgMatchScore, suffix: "%" },
        { key: "In Pipeline", value: metrics.jobsInPipeline },
      ],
    },
    {
      label: "Automation",
      tag: "Reply Stack",
      color: "border-border bg-secondary/30",
      items: [
        { key: "Venue Replies", value: metrics.venueRepliesLogged },
        { key: "Investor Emails", value: metrics.investorEmailsLogged },
      ],
    },
  ];

  return (
    <section className="py-20 border-y border-border">
      <div className="editorial-container">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="text-xs text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 rounded px-2 py-0.5">Live</span>
              <h2 className="font-serif text-headline text-foreground">Operations Dashboard</h2>
            </div>
            <LiveBadge loading={loading} error={error} lastUpdated={lastUpdated} onRefresh={refresh} />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {panels.map((panel, pi) => (
            <FadeIn key={pi} delay={pi * 0.12}>
              <div className={`border rounded-lg p-6 ${panel.color}`}>
                <div className="mb-5 pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">{panel.tag}</p>
                  <p className="font-serif text-lg text-foreground">{panel.label}</p>
                </div>
                <div className="space-y-4">
                  {panel.items.map((item, ii) => (
                    <div key={ii} className="flex items-end justify-between">
                      <p className="text-xs text-muted-foreground tracking-widest uppercase">{item.key}</p>
                      <p className="font-serif text-3xl text-foreground tabular-nums">
                        <AnimatedNumber value={item.value ?? null} suffix={(item as { suffix?: string }).suffix ?? ""} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p className="text-xs text-muted-foreground mt-6 text-right">
            Auto-refreshes every 60s · Powered by Supabase
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Static ticker (job engine summary) ──────────────────────────────────────
const tickerStats = [
  { label: "Templates", end: 6 },
  { label: "Daily Waves", end: 3 },
  { label: "Scripts", end: 5 },
  { label: "Cron Jobs", end: 9 },
];

const TickerStats = () => {
  const [counts, setCounts] = useState(tickerStats.map(() => 0));
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts(tickerStats.map(s => Math.round((step / steps) * s.end)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <section ref={ref} className="py-16 border-y border-border">
      <div className="editorial-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {tickerStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">{stat.label}</p>
              <p className="font-serif text-5xl md:text-6xl text-foreground tabular-nums mb-2">
                {counts[i]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const McCrayVentures = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />

        {/* Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <FadeIn>
              <Link to="/work" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors mb-8">
                <ArrowLeft className="h-3 w-3" /> Back to Work
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-xs text-accent tracking-widest uppercase mb-4">Automation Suite</p>
              <h1 className="font-serif text-display text-foreground mb-4">
                McCray Ventures, LLC
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="accent-line mb-6 origin-left"
              />
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                A fully automated job application engine — scrapes postings, scores against profile with AI,
                tailors resumes, auto-submits, and delivers a morning digest. Built for speed and precision.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── LIVE OPERATIONS DASHBOARD ── */}
        <LiveMetricsGrid />

        {/* Static engine stats */}
        <TickerStats />

        {/* Execution Pipeline */}
        <section className="py-20">
          <div className="editorial-container">
            <FadeIn>
              <div className="flex items-center gap-3 mb-12">
                <span className="text-xs text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 rounded px-2 py-0.5">01</span>
                <h2 className="font-serif text-headline text-foreground">Execution Pipeline</h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
              {pipelineSteps.map((phase, pi) => (
                <FadeIn key={pi} delay={pi * 0.15}>
                  <div className="border border-border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                      <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
                        <phase.icon className="h-4 w-4 text-accent" />
                      </div>
                      <p className="text-xs text-muted-foreground tracking-widest uppercase">{phase.phase}</p>
                    </div>
                    <div className="space-y-4">
                      {phase.nodes.map((node, ni) => (
                        <motion.div
                          key={ni}
                          className="border border-border rounded-md p-4 hover:border-accent hover:bg-accent/5 transition-all duration-300 cursor-default"
                          whileHover={{ x: 4 }}
                        >
                          <p className="text-sm font-medium text-foreground mb-1">{node.name}</p>
                          <p className="text-xs text-muted-foreground">{node.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <div className="flex justify-center items-center gap-2 my-6">
                {["Ingest", "→", "Process", "→", "Output"].map((label, i) => (
                  <span key={i} className={`text-xs ${i % 2 === 1 ? "text-accent text-lg" : "text-muted-foreground tracking-widest uppercase"}`}>
                    {label}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Cron Schedule */}
        <section className="py-16 bg-secondary/50">
          <div className="editorial-container">
            <FadeIn>
              <div className="flex items-center gap-3 mb-10">
                <span className="text-xs text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 rounded px-2 py-0.5">02</span>
                <h2 className="font-serif text-headline text-foreground">Cron Schedule</h2>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cronSlots.map((slot, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="border border-border rounded-lg p-5 text-center bg-background hover:border-accent transition-colors duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">{slot.desc}</p>
                    <p className="font-serif text-3xl text-foreground mb-1">{slot.time.split(" ")[0]}</p>
                    <p className="text-xs text-accent">{slot.time.split(" ")[1]} · {slot.label}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Script Manifest */}
        <section className="py-20">
          <div className="editorial-container">
            <FadeIn>
              <div className="flex items-center gap-3 mb-10">
                <span className="text-xs text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 rounded px-2 py-0.5">03</span>
                <h2 className="font-serif text-headline text-foreground">Script Manifest</h2>
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-3">
              {scripts.map((s, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="border border-border rounded-lg p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-accent transition-colors duration-300"
                    whileHover={{ x: 6 }}
                  >
                    <div className="flex items-center gap-3 md:min-w-[200px]">
                      <FileText className="h-4 w-4 text-accent flex-shrink-0" />
                      <code className="text-sm text-foreground font-medium">{s.file}</code>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground mb-1">{s.desc}</p>
                      <p className="text-xs text-muted-foreground">{s.tech}</p>
                    </div>
                    <span className={`text-xs tracking-widest uppercase px-3 py-1 rounded border ${
                      s.status === "Ready"
                        ? "text-accent bg-accent/10 border-accent/20"
                        : "text-foreground bg-secondary border-border"
                    }`}>
                      {s.status}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="py-16 bg-secondary/50">
          <div className="editorial-container">
            <FadeIn>
              <div className="flex items-center gap-3 mb-10">
                <span className="text-xs text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 rounded px-2 py-0.5">04</span>
                <h2 className="font-serif text-headline text-foreground">Infrastructure</h2>
              </div>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-4">
              {infraItems.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="border border-border rounded-lg p-5 bg-background">
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">{item.label}</p>
                    <p className="text-sm text-foreground">{item.value}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.3}>
              <div className="mt-6 border border-accent/30 rounded-lg p-5 bg-accent/5 flex items-start gap-3">
                <Shield className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-1">Security</p>
                  <p className="text-sm text-muted-foreground">All credentials are stored in environment variables and rotated regularly. No API keys or secrets are exposed in the codebase or client-side code.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Resume Templates */}
        <section className="py-20">
          <div className="editorial-container">
            <FadeIn>
              <div className="flex items-center gap-3 mb-10">
                <span className="text-xs text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 rounded px-2 py-0.5">05</span>
                <h2 className="font-serif text-headline text-foreground">Resume Templates</h2>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {resumeTemplates.map((name, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="border border-border rounded-lg p-5 hover:border-accent hover:bg-accent/5 transition-all duration-300 cursor-default"
                    whileHover={{ y: -4 }}
                  >
                    <p className="text-xs text-accent tracking-widest uppercase mb-2">0{i + 1}</p>
                    <p className="text-sm font-medium text-foreground">{name}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Automation Team Org Chart */}
        <AutomationTeamSection />

        {/* Footer note */}
        <FadeIn className="py-12 border-t border-border">
          <div className="editorial-container flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">McCray Ventures, LLC · Job Engine v1.0</p>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-accent" />
              <p className="text-xs text-muted-foreground">Engine active · 3 daily waves</p>
            </div>
          </div>
        </FadeIn>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default McCrayVentures;
