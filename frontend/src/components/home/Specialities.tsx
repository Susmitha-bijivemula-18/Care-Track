import { Heart, Activity, Brain, Stethoscope, Baby, Scissors, Ear, Activity as Gynecology } from 'lucide-react';
import { motion } from 'framer-motion';

export function Specialities() {
  const specialities = [
    { icon: Heart, name: 'Cardiology', desc: 'Specialized care focused on heart health and cardiovascular conditions.', color: 'text-red-500 bg-red-500/10' },
    { icon: Activity, name: 'Dermatology', desc: 'Expert diagnosis and treatment of skin, hair, and nail conditions.', color: 'text-orange-500 bg-orange-500/10' },
    { icon: Stethoscope, name: 'General Medicine', desc: 'Comprehensive primary care and preventive health services.', color: 'text-emerald-500 bg-emerald-500/10' },
    { icon: Scissors, name: 'Orthopedics', desc: 'Advanced treatment for bone, joint, and muscle conditions.', color: 'text-blue-500 bg-blue-500/10' },
    { icon: Baby, name: 'Pediatrics', desc: 'Compassionate medical care for infants, children, and adolescents.', color: 'text-pink-500 bg-pink-500/10' },
    { icon: Brain, name: 'Neurology', desc: 'Expertise in diagnosing and treating nervous system disorders.', color: 'text-purple-500 bg-purple-500/10' },
    { icon: Gynecology, name: 'Gynecology', desc: "Comprehensive women's health and reproductive care.", color: 'text-rose-500 bg-rose-500/10' },
    { icon: Ear, name: 'ENT', desc: 'Specialized treatment for ear, nose, and throat conditions.', color: 'text-teal-500 bg-teal-500/10' },
  ];

  return (
    <section id="specialities" className="py-24 bg-card border-y border-border px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Expertise when you need it.</h2>
          <p className="text-lg text-muted-foreground">Connect with specialists across a range of healthcare disciplines.</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-8 snap-x scrollbar-thin">
          {specialities.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group p-5 rounded-xl border border-border bg-background hover:shadow-card transition-all cursor-pointer relative overflow-hidden w-[85vw] sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] shrink-0 snap-start"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${spec.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{spec.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{spec.desc}</p>
                <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <span className="text-foreground">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}