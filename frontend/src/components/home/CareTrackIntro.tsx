import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function CareTrackIntro() {
  const steps = [
    { 
      num: '01', 
      title: 'FIND', 
      desc: 'Choose a doctor based on specialty and availability.', 
      isRich: false 
    },
    { 
      num: '02', 
      title: 'BOOK', 
      desc: 'Select your doctor, date and available appointment time.', 
      isRich: false 
    },
    { 
      num: '03', 
      title: 'TRACK', 
      desc: 'Follow your position in the queue in real time.', 
      isRich: true, 
      type: 'track' 
    },
    { 
      num: '04', 
      title: 'GET NOTIFIED', 
      desc: 'Receive a notification when your consultation time is approaching, so you can arrive at the right time instead of waiting unnecessarily.', 
      isRich: true, 
      type: 'notify' 
    },
    { 
      num: '05', 
      title: 'CONTINUE', 
      desc: 'Access your previous consultations, prescriptions and healthcare history.', 
      isRich: false 
    },
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[90rem] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-[1px] h-3 bg-foreground/30"></div>
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-foreground">
              How It Works
            </span>
            <div className="w-[1px] h-3 bg-foreground/30"></div>
          </motion.div>
          
          <motion.h2 
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground leading-[1.05] mb-8"
          >
            Healthcare that stays with you.
          </motion.h2>

          <motion.p 
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-[14px] text-muted-foreground max-w-[600px] leading-relaxed"
          >
            From booking to consultation, CareTrack keeps you informed so you know where you stand, when to arrive, and what happened during your previous visits.
          </motion.p>
        </div>

        {/* DESKTOP HORIZONTAL JOURNEY */}
        <motion.div 
          custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
          className="hidden lg:flex w-full relative"
        >
          {/* Main Background Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-border" />
          
          <div className="grid grid-cols-5 w-full">
            {steps.map((step, i) => (
              <div 
                 key={i}
                 className="flex flex-col px-6 xl:px-8 pt-8 pb-4 relative group cursor-default h-full"
              >
                {/* Active Hover Line */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-foreground scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  {step.num} — {step.title}
                </span>
                
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-8 opacity-70 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300">
                  {step.desc}
                </p>
                
                {/* TRACK UI */}
                {step.isRich && step.type === 'track' && (
                   <div className="mt-auto w-full pt-4">
                      <div className="flex flex-col border border-border p-5 bg-card opacity-30 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                         <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Your Position</span>
                         <span className="text-3xl font-light text-foreground leading-none mb-5">#04</span>
                         
                         <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Estimated Wait</span>
                         <span className="text-3xl font-light text-foreground leading-none mb-5">12 <span className="text-sm tracking-widest text-muted-foreground">MIN</span></span>

                         <div className="flex items-center gap-2 mt-1 pt-4 border-t border-border">
                            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                            <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-foreground">Live Queue</span>
                         </div>
                      </div>
                   </div>
                )}

                {/* NOTIFY UI */}
                {step.isRich && step.type === 'notify' && (
                   <div className="mt-auto w-full pt-4">
                      <div className="flex flex-col border border-border p-5 bg-card opacity-30 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none">
                         <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-foreground mb-3">Your Turn Is Approaching</span>
                         <span className="text-[12px] leading-relaxed text-muted-foreground italic">"Please arrive at the consultation area in approximately 10 minutes."</span>
                      </div>
                   </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* MOBILE/TABLET VERTICAL TIMELINE */}
        <motion.div 
          custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
          className="flex lg:hidden flex-col gap-10 relative pl-2 md:pl-6 max-w-2xl mx-auto"
        >
           {/* Vertical Line */}
           <div className="absolute left-[13px] md:left-[29px] top-2 bottom-0 w-[1px] bg-border" />
           
           {steps.map((step, i) => (
             <div key={i} className="flex flex-col relative pl-10 md:pl-12 group cursor-default">
               {/* Timeline Dot */}
               <div className="absolute left-[-3px] md:left-[13px] top-[6px] w-[9px] h-[9px] bg-background border border-border rounded-full group-hover:border-foreground group-hover:scale-125 transition-all duration-300" />
               
               <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                 {step.num} — {step.title}
               </span>
               
               <p className="text-[13px] text-muted-foreground leading-relaxed mb-2 group-hover:text-foreground transition-colors duration-300">
                 {step.desc}
               </p>
               
               {/* Mobile Rich UIs */}
               {step.isRich && step.type === 'track' && (
                 <div className="w-full max-w-[240px] mt-4 mb-2">
                    <div className="flex flex-col border border-border p-4 bg-card opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                       <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Your Position</span>
                       <span className="text-2xl font-light text-foreground leading-none mb-4">#04</span>
                       
                       <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Estimated Wait</span>
                       <span className="text-2xl font-light text-foreground leading-none mb-4">12 <span className="text-xs text-muted-foreground">MIN</span></span>

                       <div className="flex items-center gap-2 pt-3 border-t border-border">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                          <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-foreground">Live Queue</span>
                       </div>
                    </div>
                 </div>
               )}

               {step.isRich && step.type === 'notify' && (
                 <div className="w-full max-w-[240px] mt-4 mb-2">
                    <div className="flex flex-col border border-border p-4 bg-card opacity-80 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none">
                       <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-foreground mb-2">Your Turn Is Approaching</span>
                       <span className="text-[12px] leading-relaxed text-muted-foreground italic">"Please arrive in approx. 10 minutes."</span>
                    </div>
                 </div>
               )}
             </div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}