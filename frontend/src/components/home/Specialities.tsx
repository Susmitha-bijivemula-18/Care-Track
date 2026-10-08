import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Specialities() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const specialities = [
    { 
      id: '01', 
      name: 'Cardiology', 
      desc: 'Heart & cardiovascular care', 
      next: 'Today · 2:30 PM', 
      wait: '12 min',
      ahead: '3 patients ahead'
    },
    { 
      id: '02', 
      name: 'Dermatology', 
      desc: 'Skin, hair & nail care', 
      next: 'Tomorrow · 9:15 AM', 
      wait: '05 min',
      ahead: '1 patient ahead'
    },
    { 
      id: '03', 
      name: 'General Medicine', 
      desc: 'Primary & preventive care', 
      next: 'Today · 11:45 AM', 
      wait: '08 min',
      ahead: '2 patients ahead'
    },
    { 
      id: '04', 
      name: 'Orthopedics', 
      desc: 'Bone, joint & muscle care', 
      next: 'Wed · 1:00 PM', 
      wait: '15 min',
      ahead: '4 patients ahead'
    },
    { 
      id: '05', 
      name: 'Pediatrics', 
      desc: 'Specialized care for children', 
      next: 'Today · 4:00 PM', 
      wait: '05 min',
      ahead: '1 patient ahead'
    },
    { 
      id: '06', 
      name: 'Neurology', 
      desc: 'Brain & nervous system care', 
      next: 'Thu · 10:30 AM', 
      wait: '10 min',
      ahead: '2 patients ahead'
    },
    { 
      id: '07', 
      name: 'Gynecology', 
      desc: "Women's health & wellness", 
      next: 'Today · 1:15 PM', 
      wait: '05 min',
      ahead: '1 patient ahead'
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
        <div className="flex flex-col items-start mb-10">
          <motion.div 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand transition-colors duration-500">
              Specialties
            </span>
          </motion.div>

          <motion.h2 
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-foreground leading-[1.1] mb-5 max-w-[640px]"
          >
            Find the right doctor.
          </motion.h2>

          <motion.p 
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-base text-foreground/80 max-w-[500px] leading-relaxed"
          >
            Choose a specialist based on your needs and availability.
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
              <div className="relative z-10 grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr_auto] gap-4 sm:gap-6 items-start w-full px-2 sm:px-4">
                
                {/* NUMBER */}
                <div className={cn(
                  "text-xl sm:text-3xl font-heading font-semibold transition-colors duration-300 pt-0.5",
                  activeIdx === i ? "text-foreground" : "text-muted-foreground/40 group-hover:text-foreground/70"
                )}>
                  {spec.id}
                </div>
                
                {/* CONTENT */}
                <div className="flex flex-col pr-2">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{spec.name}</h3>
                  <p className={cn(
                    "text-[14px] mt-1 transition-colors",
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
                         <div className="pt-6 pb-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 border-t border-border/60 mt-5">
                           <div className="flex flex-col">
                             <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Next Available</span>
                             <span className="text-sm font-semibold text-foreground">{spec.next}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Estimated Wait</span>
                             <span className="text-sm font-semibold text-foreground">{spec.wait}</span>
                           </div>
                           <div className="flex flex-col">
                             <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Status</span>
                             <span className="text-sm font-semibold text-foreground">{spec.ahead}</span>
                           </div>
                           
                           {/* PRIMARY ACTION */}
                           <div className="mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto">
                             <Link to="/book-appointment" className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-all active:scale-[0.98] group/btn">
                               View Doctors <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                             </Link>
                           </div>
                         </div>
                       </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* RIGHT ARROW (Accordion Toggle) */}
                <div className="hidden sm:flex items-center h-8 transition-opacity duration-300 mt-1 opacity-40 group-hover:opacity-100">
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-300 text-foreground",
                    activeIdx === i ? "-rotate-180" : "group-hover:translate-y-1"
                  )} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CLOSING STATEMENT */}
        <motion.div 
          custom={10} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-xs font-semibold uppercase tracking-wider text-foreground/50 justify-center sm:justify-start pl-2 sm:pl-4"
        >
          <span className="hover:text-foreground transition-colors cursor-default">Right Specialist</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="hover:text-foreground transition-colors cursor-default">Clearer Wait</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="hover:text-foreground transition-colors cursor-default">Better Experience</span>
        </motion.div>

      </div>
    </section>
  );
}