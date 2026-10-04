import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

// ─── Utility: clamp ───────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// ─── Animated Count-Up Hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1400, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

// ─── SVG Circular Progress Ring ───────────────────────────────────────────────
function ScoreRing({ score, animating }) {
  const r = 80;
  const circ = 2 * Math.PI * r;
  const displayed = useCountUp(score, 1600, animating);
  const offset = circ - (displayed / 100) * circ;
  const color =
    displayed >= 75 ? "#818cf8" : displayed >= 50 ? "#60a5fa" : "#f87171";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <div className="absolute inset-0 rounded-full opacity-20 blur-2xl" style={{ background: color }} />
      <svg width="200" height="200" className="rotate-[-90deg]">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
        <circle
          cx="100" cy="100" r={r} fill="none"
          stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.05s linear", filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-black text-white tabular-nums" style={{ fontFamily: "'Sora', sans-serif" }}>
          {displayed}
        </span>
        <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color }}>ATS Score</span>
      </div>
    </div>
  );
}

// ─── Animated Bar ─────────────────────────────────────────────────────────────
function AnimatedBar({ label, value, delay = 0, active }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [value, delay, active]);

  const color =
    value >= 75 ? "from-indigo-400 to-blue-500" :
    value >= 50 ? "from-blue-400 to-indigo-500" : "from-rose-400 to-red-500";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="text-white font-bold tabular-nums">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{
            width: `${width}%`,
            transition: "width 1s cubic-bezier(0.34,1.56,0.64,1)",
            boxShadow: width > 0 ? "0 0 12px rgba(99,102,241,0.4)" : "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── Pipeline Step ────────────────────────────────────────────────────────────
const PIPELINE_STEPS = [
  { id: 1, label: "Extracting Resume Content", icon: "📄" },
  { id: 2, label: "Matching Keywords",          icon: "🔍" },
  { id: 3, label: "Simulating ATS Engine",      icon: "⚙️" },
  { id: 4, label: "Generating AI Insights",     icon: "🧠" },
];

function AnalysisPipeline({ activeStep, done }) {
  return (
    <div className="space-y-3">
      {PIPELINE_STEPS.map((step, i) => {
        const isComplete = done || i < activeStep;
        const isActive   = !done && i === activeStep;
        return (
          <div
            key={step.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500"
            style={{
              borderColor: isComplete ? "rgba(99,102,241,0.4)"  : isActive ? "rgba(96,165,250,0.4)"  : "rgba(255,255,255,0.05)",
              background:  isComplete ? "rgba(99,102,241,0.05)" : isActive ? "rgba(96,165,250,0.08)" : "rgba(255,255,255,0.02)",
              opacity: i > activeStep && !done ? 0.4 : 1,
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all duration-500"
              style={{
                background: isComplete ? "rgba(99,102,241,0.2)"        : isActive ? "rgba(96,165,250,0.3)"        : "rgba(255,255,255,0.05)",
                boxShadow:  isComplete ? "0 0 12px rgba(99,102,241,0.5)" : isActive ? "0 0 12px rgba(96,165,250,0.5)" : "none",
              }}
            >
              {isComplete ? (
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : isActive ? (
                <span className="animate-spin text-blue-400">◌</span>
              ) : (
                <span className="text-slate-600">○</span>
              )}
            </div>
            <span
              className="text-sm font-medium transition-colors duration-300"
              style={{ color: isComplete ? "#818cf8" : isActive ? "#93c5fd" : "#475569" }}
            >
              {step.label}
            </span>
            {isActive && (
              <div className="ml-auto flex gap-1">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────
function GlassCard({ children, className = "", glow = false }) {
  return (
    <div
      className={`rounded-2xl border backdrop-blur-md ${className}`}
      style={{
        background:  "rgba(2,8,23,0.6)",
        borderColor: glow ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
        boxShadow:   glow
          ? "0 0 40px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Missing Skill Chip ───────────────────────────────────────────────────────
function SkillChip({ label, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      className="px-3 py-1.5 text-sm font-medium rounded-full border cursor-default select-none transition-all duration-300 hover:scale-105"
      style={{
        background:  "rgba(239,68,68,0.07)",
        borderColor: "rgba(239,68,68,0.3)",
        color:       "#fca5a5",
        opacity:     visible ? 1 : 0,
        transform:   visible ? "translateY(0)" : "translateY(8px)",
        transition:  `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow   = "0 0 16px rgba(239,68,68,0.3)";
        e.currentTarget.style.borderColor = "rgba(239,68,68,0.7)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow   = "0 0 0 0 rgba(239,68,68,0)";
        e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
      }}
    >
      {label}
    </span>
  );
}

// ─── Insight Card ─────────────────────────────────────────────────────────────
const INSIGHT_ICONS = ["💡", "🎯", "✨", "⚡", "🔥", "🚀", "📌", "🛠"];

function InsightCard({ text, index, active }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), index * 120);
    return () => clearTimeout(t);
  }, [active, index]);

  return (
    <div
      className="flex gap-3 items-start p-4 rounded-xl border transition-all duration-500"
      style={{
        background:  "rgba(99,102,241,0.05)",
        borderColor: "rgba(99,102,241,0.15)",
        opacity:     visible ? 1 : 0,
        transform:   visible ? "translateY(0)" : "translateY(16px)",
        transition:  "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <span className="text-lg flex-shrink-0">{INSIGHT_ICONS[index % INSIGHT_ICONS.length]}</span>
      <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
    </div>
  );
}

// ─── Typewriter Bullet ────────────────────────────────────────────────────────
function TypewriterBullet({ text, delay = 0, active }) {
  const [displayed, setDisplayed] = useState("");
  const [started,   setStarted]   = useState(false);

  useEffect(() => {
    if (!active) return;
    const st = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(st);
  }, [active, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <div
      className="p-3 rounded-lg border text-sm font-mono leading-relaxed"
      style={{
        background:  "rgba(0,0,0,0.3)",
        borderColor: "rgba(99,102,241,0.15)",
        color:       "#a5b4fc",
        minHeight:   "2.5rem",
      }}
    >
      <span className="mr-2 select-none" style={{ color: "#6366f1" }}>›</span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse" />
      )}
    </div>
  );
}

// ─── Shimmer Loader ───────────────────────────────────────────────────────────
function ShimmerBlock({ h = "h-8", w = "w-full" }) {
  return (
    <div className={`${h} ${w} rounded-lg overflow-hidden relative`} style={{ background: "rgba(255,255,255,0.03)" }}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          animation:  "shimmer 1.6s infinite",
        }}
      />
    </div>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────
function StatPill({ label, value, icon, color = "#818cf8" }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border"
      style={{
        background:  "rgba(255,255,255,0.02)",
        borderColor: `${color}22`,
        boxShadow:   `0 0 20px ${color}0a`,
      }}
    >
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{label}</p>
        <p className="text-base font-bold" style={{ color }}>{value}</p>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Read user name from localStorage — handles multiple storage shapes
  const userName = (() => {
    try {
      // Try "user" key (JSON object)
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.name && parsed.name.trim()) return parsed.name.trim();
        if (parsed.email) return parsed.email.split("@")[0];
      }
    } catch { /* ignore */ }
    // Try plain string keys
    const plain = localStorage.getItem("userName") || localStorage.getItem("name");
    if (plain && plain.trim()) return plain.trim();
    // Try decoding email from token if nothing else works
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.name) return payload.name;
        if (payload.email) return payload.email.split("@")[0];
      } catch { /* ignore */ }
    }
    return "User";
  })();

  // Initials for avatar
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b backdrop-blur-xl"
      style={{
        background:  "rgba(2,8,23,0.95)",
        borderColor: "rgba(99,102,241,0.12)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center justify-center text-white font-black flex-shrink-0"
          style={{
            width:        "36px",
            height:       "36px",
            borderRadius: "10px",
            background:   "linear-gradient(135deg, #6366f1, #3b82f6)",
            boxShadow:    "0 0 20px rgba(99,102,241,0.35)",
            fontFamily:   "'Sora', sans-serif",
            fontSize:     "13px",
          }}
        >
          CV
        </div>
        <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
          CVForge{" "}
          <span style={{
            background:           "linear-gradient(90deg, #818cf8, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
          }}>
            AI
          </span>
        </span>
      </div>

      {/* Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((p) => !p)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all duration-200"
          style={{
            background:  dropdownOpen ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.04)",
            borderColor: dropdownOpen ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.08)",
            cursor:      "pointer",
          }}
        >
          {/* Avatar */}
          <div
            className="flex items-center justify-center font-black text-white flex-shrink-0"
            style={{
              width:        "30px",
              height:       "30px",
              borderRadius: "50%",
              background:   "linear-gradient(135deg, #6366f1, #3b82f6)",
              fontSize:     "11px",
              fontFamily:   "'Sora', sans-serif",
            }}
          >
            {initials}
          </div>
          {/* Name */}
          <span
            className="text-sm font-medium text-slate-300 hidden sm:block max-w-[120px] truncate"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {userName}
          </span>
          {/* Chevron */}
          <svg
            className="w-3.5 h-3.5 text-slate-500"
            style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown panel */}
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 rounded-xl border overflow-hidden"
            style={{
              width:          "220px",
              background:     "rgba(8,15,35,0.98)",
              borderColor:    "rgba(99,102,241,0.2)",
              boxShadow:      "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)",
              backdropFilter: "blur(20px)",
              zIndex:         100,
            }}
          >
            {/* User info */}
            <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center font-black text-white flex-shrink-0"
                  style={{
                    width:        "36px",
                    height:       "36px",
                    borderRadius: "50%",
                    background:   "linear-gradient(135deg, #6366f1, #3b82f6)",
                    fontSize:     "13px",
                    fontFamily:   "'Sora', sans-serif",
                  }}
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {userName}
                  </p>
                  <p className="text-xs" style={{ color: "#818cf8", fontFamily: "'DM Sans', sans-serif" }}>
                    Free Plan
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  color:      "#f87171",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent",
                  border:     "none",
                  cursor:     "pointer",
                  textAlign:  "left",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  // ── Original state (untouched) ──
  const [file,           setFile]           = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading,        setLoading]        = useState(false);
  const [results,        setResults]        = useState(null);
  const [resumeId,       setResumeId]       = useState(null);

  // ── UI state ──
  const [pipelineStep, setPipelineStep] = useState(-1);
  const [pipelineDone, setPipelineDone] = useState(false);
  const [showResults,  setShowResults]  = useState(false);
  const [uploadDone,   setUploadDone]   = useState(false);
  const [dragOver,     setDragOver]     = useState(false);

  const fileRef    = useRef(null);
  const resultsRef = useRef(null);

  // ── Original handleUpload (untouched logic) ──
  const handleUpload = async () => {
    if (!file) return alert("Upload resume first");
    const formData = new FormData();
    formData.append("resume", file);
    try {
      setLoading(true);
      const res = await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload response:", res.data);
      setResumeId(res.data.resume?._id || res.data.resumeId);
      setUploadDone(true);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ── Original handleAnalyze (untouched logic) + pipeline animation ──
  const handleAnalyze = async () => {
    if (!resumeId || !jobDescription)
      return alert("Upload resume and add job description");

    try {
      setLoading(true);
      setShowResults(false);
      setPipelineDone(false);
      setPipelineStep(0);

      const stepDelay = (ms) => new Promise((r) => setTimeout(r, ms));
      const apiPromise = API.post("/ats/analyze", { resumeId, jobDescription });

      await stepDelay(600); setPipelineStep(1);
      await stepDelay(700); setPipelineStep(2);
      await stepDelay(700); setPipelineStep(3);

      const res = await apiPromise;
      console.log("ATS Response:", res.data);

      await stepDelay(600);
      setPipelineDone(true);
      await stepDelay(500);

      setResults(res.data);
      setShowResults(true);
      // Auto-scroll to results after a short delay for the section to render
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error("Analysis error:", err.response?.data || err);
      alert("Analysis failed");
      setPipelineStep(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  };

  const safeScore      = results?.overallMatch ?? 0;
  const keywordsFound  = results?.breakdown?.keywordMatch ?? 0;
  const techSkills     = results?.breakdown?.technicalSkills ?? 0;
  const experience     = results?.breakdown?.experience ?? 0;
  const bulletStrength = results?.breakdown?.bulletStrength ?? 0;
  const careerScore    = results?.careerReadinessScore ?? 0;

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        body {
          background: #020817;
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes floatChip {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.2); }
          50%      { box-shadow: 0 0 40px rgba(99,102,241,0.5); }
        }

        .float-chip { animation: floatChip 3s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 2.5s ease-in-out infinite; }

        ::-webkit-scrollbar       { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.2); border-radius: 3px; }
      `}</style>

      {/* ── Background ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.06) 0%, transparent 50%), #020817",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)",
            backgroundSize:  "60px 60px",
          }}
        />
      </div>

      <Navbar />

      <main className="pb-20 px-4 md:px-8 max-w-6xl mx-auto space-y-8 pt-8">

        {/* ── Page Header ── */}
        <div className="space-y-1">
          <h1
            className="text-3xl md:text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            ATS Resume{" "}
            <span style={{
              background:           "linear-gradient(135deg, #6366f1, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
            }}>
              Analyzer
            </span>
          </h1>
          <p className="text-slate-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Upload your resume · Paste the job description · Get AI-powered ATS insights
          </p>
        </div>

        {/* ── Upload + JD Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Upload Card */}
          <GlassCard className="p-6 space-y-4" glow={uploadDone}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-indigo-400 text-lg">📎</span>
              <h2 className="font-bold text-white text-sm uppercase tracking-widest" style={{ fontFamily: "'Sora', sans-serif" }}>
                Resume
              </h2>
              {uploadDone && (
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                  ✓ Uploaded
                </span>
              )}
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className="relative rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-8 cursor-pointer transition-all duration-300"
              style={{
                borderColor: dragOver ? "rgba(99,102,241,0.6)" : file ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.08)",
                background:  dragOver ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.01)",
              }}
            >
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => { setFile(e.target.files[0]); setUploadDone(false); }}
              />
              <div className="text-3xl mb-2">{file ? "📄" : "☁️"}</div>
              <p className="text-sm text-slate-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {file ? (
                  <span className="font-medium" style={{ color: "#818cf8" }}>{file.name}</span>
                ) : (
                  <>Drop PDF here or <span className="underline underline-offset-2" style={{ color: "#818cf8" }}>browse</span></>
                )}
              </p>
              {!file && <p className="text-xs text-slate-600 mt-1">PDF only · Max 10MB</p>}
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(59,130,246,0.15))",
                border:     "1px solid rgba(99,102,241,0.3)",
                color:      "#818cf8",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.25))"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(59,130,246,0.15))"; }}
            >
              {loading && !results ? "Uploading…" : "Upload Resume →"}
            </button>
          </GlassCard>

          {/* JD Card */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-400 text-lg">📋</span>
              <h2 className="font-bold text-white text-sm uppercase tracking-widest" style={{ fontFamily: "'Sora', sans-serif" }}>
                Job Description
              </h2>
            </div>
            <textarea
              placeholder="Paste the full job description here…"
              rows={7}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full resize-none rounded-xl p-3 text-sm outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border:     "1px solid rgba(255,255,255,0.07)",
                color:      "#e2e8f0",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(99,102,241,0.4)"}
              onBlur={(e)  => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
            />
            <button
              onClick={handleAnalyze}
              disabled={!resumeId || !jobDescription || loading}
              className="w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: (!resumeId || !jobDescription || loading)
                  ? "rgba(99,102,241,0.2)"
                  : "linear-gradient(135deg, #6366f1, #3b82f6)",
                color:      "#fff",
                boxShadow:  (!resumeId || !jobDescription || loading) ? "none" : "0 0 24px rgba(99,102,241,0.4)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.boxShadow = "0 0 40px rgba(99,102,241,0.6)"; }}
              onMouseLeave={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.4)"; }}
            >
              {loading ? "Analyzing…" : "⚡ Run ATS Analysis"}
            </button>
          </GlassCard>
        </div>

        {/* ── Loading / Pipeline ── */}
        {loading && pipelineStep >= 0 && (
          <GlassCard className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Analysis Pipeline
                </p>
                <AnalysisPipeline activeStep={pipelineStep} done={pipelineDone} />
              </div>
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Preparing Results
                </p>
                <div className="space-y-3">
                  <ShimmerBlock h="h-32" />
                  <div className="grid grid-cols-2 gap-3">
                    <ShimmerBlock h="h-16" />
                    <ShimmerBlock h="h-16" />
                  </div>
                  <ShimmerBlock h="h-8" w="w-3/4" />
                  <ShimmerBlock h="h-8" w="w-1/2" />
                </div>
              </div>
            </div>
            <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width:      `${pipelineDone ? 100 : (pipelineStep + 1) * 25}%`,
                  background: "linear-gradient(90deg, #6366f1, #3b82f6)",
                  boxShadow:  "0 0 12px rgba(99,102,241,0.5)",
                }}
              />
            </div>
          </GlassCard>
        )}

        {/* ── Results ── */}
        {showResults && results && (
          <div
            ref={resultsRef}
            className="space-y-6"
            style={{
              opacity:    showResults ? 1 : 0,
              transform:  showResults ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {/* Score + Stats */}
            <GlassCard className="p-6 md:p-8" glow>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Analysis Complete
                  </p>
                  <AnalysisPipeline activeStep={4} done={true} />
                </div>
                <div className="flex flex-col items-center gap-6">
                  <ScoreRing score={safeScore} animating={showResults} />
                  <div className="grid grid-cols-1 gap-3 w-full">
                    <StatPill icon="🔑" label="Keywords Found"    value={`${keywordsFound}%`} color="#818cf8" />
                    <StatPill icon="🛠" label="Skill Match"       value={`${techSkills}%`}    color="#60a5fa" />
                    <StatPill icon="🛡" label="Formatting Safety"
                      value={bulletStrength >= 70 ? "Good" : bulletStrength >= 40 ? "Fair" : "Needs Work"}
                      color={bulletStrength >= 70 ? "#34d399" : bulletStrength >= 40 ? "#fbbf24" : "#f87171"}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Breakdown bars */}
            <GlassCard className="p-6 md:p-8">
              <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-widest" style={{ fontFamily: "'Sora', sans-serif" }}>
                Score Breakdown
              </h3>
              <div className="space-y-4">
                <AnimatedBar label="Keyword Match"    value={keywordsFound}  delay={0}   active={showResults} />
                <AnimatedBar label="Technical Skills" value={techSkills}     delay={150} active={showResults} />
                <AnimatedBar label="Experience"       value={experience}     delay={300} active={showResults} />
                <AnimatedBar label="Bullet Strength"  value={bulletStrength} delay={450} active={showResults} />
              </div>
            </GlassCard>

            {/* Career Readiness */}
            <GlassCard className="p-6 md:p-8">
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: "'Sora', sans-serif" }}>
                Career Readiness
              </h3>
              <div className="flex items-end gap-2">
                <span
                  className="text-7xl font-black pulse-glow rounded-2xl px-4 py-2 tabular-nums"
                  style={{
                    fontFamily:           "'Sora', sans-serif",
                    background:           "linear-gradient(135deg, #6366f1, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:  "transparent",
                  }}
                >
                  {careerScore}
                </span>
                <span className="text-3xl font-bold text-slate-600 mb-3">/ 10</span>
                <p className="text-slate-500 text-sm ml-4 mb-3 max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {careerScore >= 8
                    ? "Outstanding. Your resume is highly competitive."
                    : careerScore >= 6
                    ? "Strong foundation with room for optimization."
                    : "Significant improvements recommended before applying."}
                </p>
              </div>
            </GlassCard>

            {/* Missing Skills */}
            {results.missingKeywords?.length > 0 && (
              <GlassCard className="p-6 md:p-8">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Missing Skills
                </h3>
                <p className="text-xs text-slate-500 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Add these keywords to increase your ATS match score
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.missingKeywords.map((k, i) => (
                    <SkillChip key={i} label={k} delay={i * 60} />
                  ))}
                </div>
              </GlassCard>
            )}

            {/* AI Improvements */}
            {results.aiInsights?.improvements?.length > 0 && (
              <GlassCard className="p-6 md:p-8">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest" style={{ fontFamily: "'Sora', sans-serif" }}>
                  AI Improvements
                </h3>
                <div className="space-y-3">
                  {results.aiInsights.improvements.map((imp, i) => (
                    <InsightCard key={i} text={imp} index={i} active={showResults} />
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Optimized Bullets */}
            {results.aiInsights?.rewrittenBullets?.length > 0 && (
              <GlassCard className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#6366f1", boxShadow: "0 0 8px #6366f1" }}
                  />
                  <h3 className="font-bold text-white text-sm uppercase tracking-widest" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Optimized Resume Bullets
                  </h3>
                  <span
                    className="ml-auto text-xs font-mono px-2 py-0.5 rounded border"
                    style={{ borderColor: "rgba(99,102,241,0.2)", color: "#818cf8", background: "rgba(99,102,241,0.05)" }}
                  >
                    AI Generated
                  </span>
                </div>
                <div className="space-y-2">
                  {results.aiInsights.rewrittenBullets.map((b, i) => (
                    <TypewriterBullet key={i} text={b} delay={i * 800} active={showResults} />
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        )}
      </main>
    </>
  );
}