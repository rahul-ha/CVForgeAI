import { Sparkles, Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {

  const cols = [
    { title: "Product", links: ["Features", "ATS Simulator", "Resume Builder", "Pricing", "Changelog"] },
    { title: "Company", links: ["About Us", "Blog", "Careers", "Press Kit", "Contact"] },
    { title: "Support", links: ["Help Center", "API Docs", "Privacy Policy", "Terms of Use", "Cookie Policy"] },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
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
