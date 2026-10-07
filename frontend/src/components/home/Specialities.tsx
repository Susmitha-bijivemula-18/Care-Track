import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Specialities() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const specialities = [
    { 
      id: '01', 
      name: 'CARDIOLOGY', 
      desc: 'Heart & cardiovascular care', 
      next: 'Today · 2:30 PM', 
      wait: '12 min',
      ahead: '03'
    },
    { 
      id: '02', 
      name: 'DERMATOLOGY', 
      desc: 'Skin, hair & nail care', 
      next: 'Tomorrow · 9:15 AM', 
      wait: '05 min',
      ahead: '01'
    },
    { 
      id: '03', 
      name: 'GENERAL MEDICINE', 
      desc: 'Primary & preventive care', 
      next: 'Today · 11:45 AM', 
      wait: '08 min',
      ahead: '02'
    },
    { 
      id: '04', 
      name: 'ORTHOPEDICS', 
      desc: 'Bone, joint & muscle care', 
      next: 'Wed · 1:00 PM', 
      wait: '15 min',
      ahead: '04'
    },
    { 
      id: '05', 
      name: 'PEDIATRICS', 
      desc: 'Specialized care for children', 
      next: 'Today · 4:00 PM', 
      wait: '05 min',
      ahead: '01'
    },
    { 
      id: '06', 
      name: 'NEUROLOGY', 
      desc: 'Brain & nervous system care', 
      next: 'Thu · 10:30 AM', 
      wait: '10 min',
      ahead: '02'
    },
    { 
      id: '07', 
      name: 'GYNECOLOGY', 
      desc: "Women's health & wellness", 
      next: 'Today · 1:15 PM', 
      wait: '05 min',
      ahead: '01'
    }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="specialities" className="relative py-20 md:py-24 px-6 md:px-12 lg:px-24 bg-card border-y border-border transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[76rem] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col items-start mb-16">
          <motion.div 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-[1px] h-3 bg-foreground/30"></div>
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-500">
              Specialties
            </span>
          </motion.div>

          <motion.h2 
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-3xl sm:text-4xl lg:text-[3.25rem] font-medium tracking-tight text-foreground leading-[1.05] mb-6 max-w-[640px]"
          >
            Expert care, <span className="text-muted-foreground">without the unnecessary wait.</span>
          </motion.h2>

          <motion.p 
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-[13px] text-muted-foreground max-w-[500px] leading-relaxed"
          >
            Connect with the right specialist and get a clearer view of your appointment experience before you arrive.
          </motion.p>
        </div>

        {/* VERTICAL DIRECTORY ACCORDION */}
        <div className="border-t border-border">
          {specialities.map((spec, i) => (
            <motion.div 
              key={spec.id}
              custom={3 + i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className={cn(
                "relative border-b border-border py-7 group cursor-pointer transition-colors duration-300",
                activeIdx === i ? "bg-foreground/[0.02]" : "hover:bg-foreground/[0.01]"
              )}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
            >
              <div className="relative z-10 grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr_auto] gap-4 sm:gap-8 items-start w-full px-2 sm:px-4">
                
                {/* NUMBER */}
                <div className={cn(
                  "text-2xl sm:text-4xl font-light transition-colors duration-500",
                  activeIdx === i ? "text-foreground" : "text-muted-foreground/30 group-hover:text-foreground/70"
                )}>
                  {spec.id}
                </div>
                
                {/* CONTENT */}
                <div className="flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{spec.name}</h3>
                  <p className={cn(
                    "text-[13px] mt-1 sm:mt-2 transition-colors",
                    activeIdx === i ? "text-foreground/80" : "text-muted-foreground"
                  )}>{spec.desc}</p>
                  
                  {/* EXPANDABLE APPOINTMENT INFO */}
                  <AnimatePresence initial={false}>
                    {activeIdx === i && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                         className="overflow-hidden"
                       >
                         <div className="pt-8 pb-2 flex flex-wrap lg:flex-nowrap items-center gap-6 sm:gap-12 lg:gap-16 border-t border-border/60 mt-6">
                           <div className="flex flex-col">
                             <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5 font-semibold">Next Available</span>
                             <span className="text-[13px] font-medium text-foreground">{spec.next}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5 font-semibold">Estimated Wait</span>
                             <span className="text-[13px] font-medium text-foreground">{spec.wait}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5 font-semibold">Patients Ahead</span>
                             <span className="text-[13px] font-medium text-foreground">{spec.ahead}</span>
                           </div>
                           <div className="mt-2 sm:mt-0 lg:ml-auto">
                             <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-foreground flex items-center gap-2 group/btn py-2 hover:text-muted-foreground transition-colors">
                               View Specialists <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                             </span>
                           </div>
                         </div>
                       </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* RIGHT ARROW (Desktop only) */}
                <div className={cn(
                  "hidden sm:flex items-center h-8 transition-opacity duration-300 mt-1",
                  activeIdx === i ? "opacity-100" : "opacity-20 group-hover:opacity-60"
                )}>
                  <ArrowRight className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    activeIdx === i ? "translate-x-1.5" : "group-hover:translate-x-1"
                  )} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CLOSING STATEMENT */}
        <motion.div 
          custom={10} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
          className="mt-16 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[9px] font-bold tracking-[0.3em] uppercase text-foreground/60 justify-center sm:justify-start pl-2 sm:pl-4"
        >
          <span className="hover:text-foreground transition-colors cursor-default">Right Specialist.</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="hover:text-foreground transition-colors cursor-default">Clearer Wait.</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="hover:text-foreground transition-colors cursor-default">Better Experience.</span>
        </motion.div>

      </div>
    </section>
  );
}