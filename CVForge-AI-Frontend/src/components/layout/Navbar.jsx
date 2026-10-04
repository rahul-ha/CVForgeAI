import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Features", "How It Works", "Pricing", "Login"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-100/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              CVForge <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l} href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600">{l}</a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold">
              Get Started Free
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`md:hidden transition-all ${open ? "max-h-64 pb-4" : "max-h-0"}`}>
          {links.map(l => (
            <a key={l} href="#" className="block py-1 text-slate-600">{l}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}