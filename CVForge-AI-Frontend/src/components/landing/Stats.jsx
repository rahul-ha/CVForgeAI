import { Target, Clock, Users, Star } from "lucide-react";
import useInView from "../../hooks/useInView";
import Counter from "../../ui/Counter";

export default function Stats() {
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
