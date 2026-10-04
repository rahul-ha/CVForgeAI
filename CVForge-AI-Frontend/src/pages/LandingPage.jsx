import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  FileText, Zap, Target, TrendingUp, Star, CheckCircle, 
  ArrowRight, Menu, X, Upload, Clipboard, BarChart3, 
  Shield, Sparkles, ChevronRight, Play, Github, Twitter, 
  Linkedin, Mail, Brain, Award, Clock, Users
} from "lucide-react";

// ─── Utility: useInView hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Animated Counter ──────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY >= 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Features", "How It Works", "Pricing"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 ${
        scrolled
          ? "shadow-lg shadow-black/30"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/30 flex-shrink-0">
              <span className="text-white text-xs font-black tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>CV</span>
            </div>
            <span
              className="text-lg font-bold tracking-tight text-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              CVForge{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                AI
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
              >
                {l}
              </a>
            ))}
            <Link
              to="/login"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* Register Button */}
          <div className="hidden md:block">
            <Link to="/register">
              <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200">
                Get Started Free
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all duration-200 flex-shrink-0"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-64 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm font-medium text-slate-400 hover:text-white py-1"
              >
                {l}
              </a>
            ))}
            <Link
              to="/login"
              className="text-sm font-medium text-slate-400 hover:text-white py-1"
            >
              Login
            </Link>
            <Link to="/register">
              <button className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold w-full">
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#020817]" style={{ maxWidth: "100vw" }}>
      {/* Background blobs — contained within viewport */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[min(600px,90vw)] bg-purple-900/20 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Sparkles className="w-4 h-4" />
          AI-Powered Resume Intelligence · Now in Beta
        </div>

        {/* Heading */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-white transition-all duration-700 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
          Optimize Your Resume with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
            AI-Powered ATS
          </span>{" "}
          Intelligence
        </h1>

        <p className={`text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Upload your resume, paste the job description, and let our AI simulate real ATS systems — revealing your match score, missing keywords, and exactly what to fix.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <button className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300" onClick={() => {
            const token = localStorage.getItem("token");
            if (token) { navigate("/dashboard"); } else { navigate("/login"); }
          }}>
            <FileText className="w-5 h-5" />
            Analyze My Resume
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold text-base backdrop-blur-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
            <Play className="w-4 h-4 fill-indigo-400 text-indigo-400" />
            View Demo
          </button>
        </div>

        {/* Trust badges */}
        <div className={`flex flex-wrap items-center justify-center gap-6 mt-14 text-sm text-slate-500 transition-all duration-700 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
          {["No credit card required", "Free tier available", "10K+ resumes analyzed"].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Demo Preview ──────────────────────────────────────────────────────────
function DemoPreview() {
  const [ref, inView] = useInView();
  const [step, setStep] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  const steps = [
    { label: "Extracting Resume", done: true },
    { label: "Matching Keywords", done: true },
    { label: "Simulating ATS", done: true },
    { label: "Generating Insights", done: false },
  ];

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setStep(i);
      setBarWidth(Math.min(i * 25, 100));
      if (i >= 4) clearInterval(t);
    }, 800);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section ref={ref} className="py-24 bg-[#030d1a] relative">
      {/* Subtle glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            See It In <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Action</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Watch our AI analyze a resume in real-time and surface exactly what recruiters see.</p>
        </div>

        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 p-px shadow-2xl shadow-black/60">
            <div className="rounded-[22px] bg-slate-950 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-slate-500 font-mono">CVForge AI — ATS Simulation</span>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: analysis steps */}
                  <div className="space-y-3">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">Analysis Pipeline</p>
                    {steps.map((s, i) => (
                      <div key={s.label} className={`flex items-center gap-3 transition-all duration-500 ${step > i ? "opacity-100" : "opacity-30"}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step > i ? "bg-emerald-500" : "bg-slate-700"}`}>
                          {step > i ? <CheckCircle className="w-3 h-3 text-white" /> : <div className="w-2 h-2 rounded-full bg-slate-500" />}
                        </div>
                        <span className={`text-sm font-medium ${step > i ? "text-white" : "text-slate-500"}`}>{s.label}</span>
                        {step === i + 1 && i === 3 && (
                          <div className="flex gap-1 ml-auto">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Overall Progress</span>
                        <span>{barWidth}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: match score */}
                  <div className="flex flex-col gap-4">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Match Score</p>
                    <div className="flex items-center justify-center py-6">
                      <div className="relative">
                        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="8" />
                          <circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke="url(#grad)" strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="264"
                            strokeDashoffset={264 - (264 * (step >= 4 ? 78 : step * 20)) / 100}
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#6366f1" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black text-white">{step >= 4 ? 78 : step * 20}%</span>
                          <span className="text-xs text-slate-400">ATS Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Mini metrics */}
                    <div className="space-y-2">
                      {[["Keywords Found", "24/31"], ["Skill Match", "High"], ["Formatting", "ATS-Safe"]].map(([label, val]) => (
                        <div key={label} className="flex justify-between items-center px-3 py-2 rounded-lg bg-slate-900">
                          <span className="text-xs text-slate-400">{label}</span>
                          <span className="text-xs font-bold text-emerald-400">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────
function Features() {
  const [ref, inView] = useInView();
  const cards = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      title: "Increase ATS Score",
      desc: "Our AI simulates 15+ popular ATS platforms to pinpoint exactly why your resume gets filtered out — and how to fix it."
    },
    {
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      title: "Custom-Tailored Optimization",
      desc: "Every suggestion is personalized to the specific job description you're targeting, not generic advice."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      title: "Bullet Impact Analyzer",
      desc: "Weak bullet points cost you interviews. We score each bullet for action verbs, quantifiable outcomes, and recruiter impact."
    },
    {
      icon: <Award className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500",
      title: "Career Readiness Score",
      desc: "Get a holistic readiness score across skills, experience alignment, keyword density, and formatting quality."
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#020817] relative">
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-4">Platform Features</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Everything You Need to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Land More Interviews</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Stop guessing what recruiters want. Our AI tells you exactly what's missing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`group p-6 rounded-3xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-white/[0.06] hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {c.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{c.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ATS Breakdown ─────────────────────────────────────────────────────────
function ATSPreview() {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const bars = [
    { label: "Technical Skills", pct: 87, color: "from-indigo-500 to-blue-500" },
    { label: "Experience Match", pct: 74, color: "from-purple-500 to-indigo-500" },
    { label: "Keyword Density", pct: 91, color: "from-blue-500 to-cyan-500" },
    { label: "Impact Strength", pct: 68, color: "from-teal-500 to-emerald-500" },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#030d1a] relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">ATS Breakdown</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
              Understand Exactly How<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">ATS Systems Score You</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              We break down your resume across four critical dimensions that ATS software actually uses to rank candidates — giving you a precise action plan.
            </p>
            <button className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (token) { navigate("/dashboard"); } else { navigate("/login"); }
              }}>
              Get Your Breakdown
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className={`space-y-6 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {bars.map((b, i) => (
              <div key={b.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-300">{b.label}</span>
                  <span className="text-sm font-black text-white">{inView ? b.pct : 0}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${b.color} transition-all duration-1000`}
                    style={{ width: inView ? `${b.pct}%` : "0%", transitionDelay: `${i * 150 + 300}ms` }}
                  />
                </div>
              </div>
            ))}

            {/* Sample keywords */}
            <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Missing Keywords Detected</p>
              <div className="flex flex-wrap gap-2">
                {["React.js", "CI/CD", "Agile", "REST APIs", "TypeScript", "AWS"].map(k => (
                  <span key={k} className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">{k}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────
function Stats() {
  const [ref, inView] = useInView();
  const stats = [
    { icon: <Target className="w-6 h-6" />, val: 85, suffix: "%", label: "Avg Match Accuracy", color: "text-indigo-600" },
    { icon: <Clock className="w-6 h-6" />, val: 30, suffix: "s", label: "Analysis Time", color: "text-blue-600" },
    { icon: <Users className="w-6 h-6" />, val: 10, suffix: "K+", label: "Resumes Optimized", color: "text-purple-600" },
    { icon: <Star className="w-6 h-6" />, val: 4.9, suffix: "★", label: "User Rating", color: "text-amber-500" },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex w-12 h-12 rounded-2xl bg-white/20 items-center justify-center text-white mb-4">
                {s.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-1">
                {inView && <Counter end={typeof s.val === "number" ? Math.floor(s.val) : s.val} suffix={s.suffix} />}
              </div>
              <p className="text-blue-100 font-medium text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, inView] = useInView();
  const steps = [
    { icon: <Upload className="w-7 h-7" />, n: "01", title: "Upload Your Resume", desc: "Drop in your PDF resume. Our parser handles any format — one column, two column, infographic-style." },
    { icon: <Clipboard className="w-7 h-7" />, n: "02", title: "Paste Job Description", desc: "Copy the job posting you're applying for. Our AI extracts the exact skills and keywords recruiters are scanning for." },
    { icon: <BarChart3 className="w-7 h-7" />, n: "03", title: "Get Your AI Report", desc: "Receive a detailed ATS simulation report with your match score, missing keywords, and specific rewrites to boost your odds." },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#020817] relative">
      {/* Glow blobs */}
      <div className="absolute top-0 right-1/3 w-72 h-72 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-4">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            From Resume to Results in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">3 Steps</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">No setup, no complexity. Just upload, analyze, and land more interviews.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-0.5 bg-gradient-to-r from-indigo-500/30 via-blue-500/50 to-indigo-500/30" />

          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`relative text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 items-center justify-center text-white shadow-xl shadow-indigo-500/30 mb-6 mx-auto">
                {s.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500/50 text-indigo-400 text-xs font-black flex items-center justify-center">{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>{s.title}</h3>
              <p className="text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────
function CTA() {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className={`relative max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Join 10,000+ job seekers already winning
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
          Ready to Land Your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">Dream Job?</span>
        </h2>
        <p className="text-blue-200 text-xl mb-10 max-w-xl mx-auto">Stop sending resumes into the void. Start getting callbacks with AI-optimized applications.</p>
        <button className="group inline-flex items-center gap-2 px-6 py-3.5 sm:px-10 sm:py-5 rounded-full bg-white text-indigo-700 font-black text-sm sm:text-lg shadow-2xl hover:shadow-white/20 hover:-translate-y-1 hover:bg-indigo-50 transition-all duration-300"
          onClick={() => {
            const token = localStorage.getItem("token");
            if (token) { navigate("/dashboard"); } else { navigate("/login"); }
          }}
        >
          <FileText className="w-5 h-5" />
          Analyze My Resume Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-blue-400 text-sm mt-5">No credit card required · Free forever plan available</p>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "ATS Simulator", "Resume Builder", "Pricing", "Changelog"] },
    { title: "Company", links: ["About Us", "Blog", "Careers", "Press Kit", "Contact"] },
    { title: "Support", links: ["Help Center", "API Docs", "Privacy Policy", "Terms of Use", "Cookie Policy"] },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md shadow-indigo-500/30">
                <span className="text-white text-xs font-black tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>CV</span>
              </div>
              <span className="text-white font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>CVForge AI</span>
            </div>
            <p className="text-sm leading-relaxed mb-5">AI-powered ATS simulation and resume optimization for modern job seekers.</p>
            <div className="flex gap-3">
              {[<Twitter className="w-4 h-4" />, <Github className="w-4 h-4" />, <Linkedin className="w-4 h-4" />, <Mail className="w-4 h-4" />].map((icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm hover:text-white transition-colors duration-200">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 CVForge AI. All rights reserved.</p>
          <p className="text-sm">Built with ❤️ to help you get hired faster.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ──────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="font-sans overflow-x-hidden w-full" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      <DemoPreview />
      <Features />
      <ATSPreview />
      <Stats />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}