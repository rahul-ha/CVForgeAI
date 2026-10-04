import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import useInView from "../../hooks/useInView";

export default function DemoPreview() {
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
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            See It In <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Action</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Watch our AI analyze a resume in real-time and surface exactly what recruiters see.</p>
        </div>

        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-1 shadow-2xl shadow-slate-900/40">
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
