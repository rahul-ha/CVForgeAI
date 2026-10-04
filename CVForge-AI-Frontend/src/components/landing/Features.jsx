import { TrendingUp, Target, Zap, Award } from "lucide-react";
import useInView from "../../hooks/useInView";

export default function Features() {
  const [ref, inView] = useInView();

  const cards = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-50",
      title: "Increase ATS Score",
      desc: "Our AI simulates 15+ popular ATS platforms to pinpoint exactly why your resume gets filtered out — and how to fix it."
    },
    {
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
      title: "Custom-Tailored Optimization",
      desc: "Every suggestion is personalized to the specific job description you're targeting, not generic advice."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      title: "Bullet Impact Analyzer",
      desc: "Weak bullet points cost you interviews. We score each bullet for action verbs, quantifiable outcomes, and recruiter impact."
    },
    {
      icon: <Award className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500",
      bg: "bg-teal-50",
      title: "Career Readiness Score",
      desc: "Get a holistic readiness score across skills, experience alignment, keyword density, and formatting quality."
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">Platform Features</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Everything You Need to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Land More Interviews</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">Stop guessing what recruiters want. Our AI tells you exactly what's missing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`group p-6 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-100/80 hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {c.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{c.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
