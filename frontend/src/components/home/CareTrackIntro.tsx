import { motion } from 'framer-motion';
import { Search, CalendarCheck, Radio, FolderOpen } from 'lucide-react';

export function CareTrackIntro() {
  const steps = [
    { num: '01', title: 'FIND', desc: 'Find a doctor based on specialty, availability, and preferred schedule.', icon: Search, color: 'text-blue-500 bg-blue-500/10' },
    { num: '02', title: 'BOOK', desc: 'Choose your doctor, date, and available appointment time.', icon: CalendarCheck, color: 'text-emerald-500 bg-emerald-500/10' },
    { num: '03', title: 'TRACK', desc: 'Receive your token and follow your position in the queue in real-time.', icon: Radio, color: 'text-orange-500 bg-orange-500/10' },
    { num: '04', title: 'CONTINUE', desc: 'Keep your consultation history and healthcare documents organized for future visits.', icon: FolderOpen, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
          How It Works
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Healthcare that stays with you.</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          CareTrack brings your appointments, queue updates, medical records, and healthcare history together in one simple patient experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-px bg-border" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative bg-card border border-border rounded-2xl p-6 text-center hover:shadow-card transition-shadow"
            >
              {/* Step number badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                {step.num}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mt-4 mb-5 ${step.color}`}>
                <Icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2 tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

              {/* Arrow connector for mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4 text-muted-foreground/30">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4L10 16M10 16L5 11M10 16L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}