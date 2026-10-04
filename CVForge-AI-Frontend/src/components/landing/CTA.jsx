import { FileText, ArrowRight, Sparkles } from "lucide-react";
import useInView from "../../hooks/useInView";

export default function CTA() {
  const [ref, inView] = useInView();

   return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
      </div>
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
        <button className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-indigo-700 font-black text-lg shadow-2xl hover:shadow-white/20 hover:-translate-y-1 hover:bg-indigo-50 transition-all duration-300">
          <FileText className="w-5 h-5" />
          Analyze My Resume Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-blue-400 text-sm mt-5">No credit card required · Free forever plan available</p>
      </div>
    </section>
  );
}