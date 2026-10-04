import { ChevronRight } from "lucide-react";
import useInView from "../../hooks/useInView";

export default function ATSPreview() {
  const [ref, inView] = useInView();

  const bars = [
    { label: "Technical Skills", pct: 87, color: "from-indigo-500 to-blue-500" },
    { label: "Experience Match", pct: 74, color: "from-purple-500 to-indigo-500" },
    { label: "Keyword Density", pct: 91, color: "from-blue-500 to-cyan-500" },
    { label: "Impact Strength", pct: 68, color: "from-teal-500 to-emerald-500" },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">ATS Breakdown</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>
              Understand Exactly How<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">ATS Systems Score You</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              We break down your resume across four critical dimensions that ATS software actually uses to rank candidates — giving you a precise action plan.
            </p>
            <button className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200">
              Get Your Breakdown
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className={`space-y-6 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {bars.map((b, i) => (
              <div key={b.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700">{b.label}</span>
                  <span className="text-sm font-black text-slate-900">{inView ? b.pct : 0}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${b.color} transition-all duration-1000`}
                    style={{ width: inView ? `${b.pct}%` : "0%", transitionDelay: `${i * 150 + 300}ms` }}
                  />
                </div>
              </div>
            ))}

            {/* Sample keywords */}
            <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Missing Keywords Detected</p>
              <div className="flex flex-wrap gap-2">
                {["React.js", "CI/CD", "Agile", "REST APIs", "TypeScript", "AWS"].map(k => (
                  <span key={k} className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold border border-red-200">{k}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}