import { useState, useEffect } from "react";
import { Sparkles, FileText, ArrowRight, Play, CheckCircle } from "lucide-react";

export default function Hero() {

  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background blobs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl" />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `
      linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)
    `, backgroundSize: "60px 60px" }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Sparkles className="w-4 h-4" />
          AI-Powered Resume Intelligence · Now in Beta
        </div>

        {/* Heading */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 transition-all duration-700 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
          Optimize Your Resume with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
            AI-Powered ATS
          </span>{" "}
          Intelligence
        </h1>

        <p className={`text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Upload your resume, paste the job description, and let our AI simulate real ATS systems — revealing your match score, missing keywords, and exactly what to fix.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <button className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-base shadow-xl shadow-indigo-300/50 hover:shadow-indigo-400/60 hover:-translate-y-1 transition-all duration-300">
            <FileText className="w-5 h-5" />
            Analyze My Resume
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Play className="w-4 h-4 fill-indigo-500 text-indigo-500" />
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