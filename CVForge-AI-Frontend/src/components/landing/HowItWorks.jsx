import { Upload,Clipboard,BarChart3 } from "lucide-react";
import useInView from "../../hooks/useInView";
export default function HowItWorks(){
    const [ref,inView]= useInView();
    const steps = [
    { icon: <Upload className="w-7 h-7" />, n: "01", title: "Upload Your Resume", desc: "Drop in your PDF resume. Our parser handles any format — one column, two column, infographic-style." },
    { icon: <Clipboard className="w-7 h-7" />, n: "02", title: "Paste Job Description", desc: "Copy the job posting you're applying for. Our AI extracts the exact skills and keywords recruiters are scanning for." },
    { icon: <BarChart3 className="w-7 h-7" />, n: "03", title: "Get Your AI Report", desc: "Receive a detailed ATS simulation report with your match score, missing keywords, and specific rewrites to boost your odds." },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            From Resume to Results in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">3 Steps</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">No setup, no complexity. Just upload, analyze, and land more interviews.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-0.5 bg-gradient-to-r from-indigo-200 via-blue-300 to-indigo-200" />

          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`relative text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 items-center justify-center text-white shadow-xl shadow-indigo-200 mb-6 mx-auto">
                {s.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-indigo-200 text-indigo-600 text-xs font-black flex items-center justify-center">{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>{s.title}</h3>
              <p className="text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

