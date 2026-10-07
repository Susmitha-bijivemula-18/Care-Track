import { motion } from 'framer-motion';

export function AboutHospital() {
  
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
    <section id="about" className="relative pt-20 pb-16 md:pt-24 md:pb-20 px-6 md:px-12 lg:px-24 bg-background transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[76rem] mx-auto">
        
        {/* Main Content Split */}
        <div className="grid lg:grid-cols-[44%_56%] gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Typography & Explanation */}
          <div className="flex flex-col items-start relative z-10 lg:pt-2">
            <motion.div 
              custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-[1px] h-3 bg-foreground/30"></div>
              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-500">
                Why CareTrack
              </span>
            </motion.div>
            
            <motion.h2 
              custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-foreground leading-[1.05] mb-6 max-w-[480px]"
            >
              Healthcare shouldn't mean <span className="text-muted-foreground">waiting without knowing.</span>
            </motion.h2>

            <motion.p 
              custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className="text-[13px] text-muted-foreground max-w-[400px] leading-relaxed mb-8"
            >
              CareTrack is designed to give patients more control over their time. Instead of sitting in a waiting room with no idea when their turn will come, patients can follow their appointment, receive timely updates, and arrive when it actually matters.
            </motion.p>

            <motion.div 
              custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
              className="flex flex-col gap-1 pl-3 border-l border-foreground"
            >
              <div className="text-[9px] font-bold tracking-[0.25em] uppercase text-foreground">Less Uncertainty.</div>
              <div className="text-[9px] font-bold tracking-[0.25em] uppercase text-foreground">More Time For Care.</div>
            </motion.div>
          </div>
          
          {/* RIGHT SIDE: Editorial Flow Diagram */}
          <div className="w-full flex justify-start lg:justify-end relative mt-6 lg:mt-0">
            <div className="w-full max-w-[440px] flex flex-col relative py-2">
              
              {/* Absolute vertical connecting line */}
              <motion.div 
                custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
                className="absolute left-[7px] top-4 bottom-10 w-[1px] bg-border origin-top"
              />

              {/* 1. THE OLD WAY */}
              <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant} className="flex flex-col relative mb-8 pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-[1px] bg-border" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium mb-4">The Old Way</span>
                
                <div className="flex flex-col gap-3.5 opacity-60">
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Patients Ahead</span>
                    <span className="text-[13px] font-light tracking-wide text-foreground">— Unknown</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Waiting Time</span>
                    <span className="text-[13px] font-light tracking-wide text-foreground">— Uncertain</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Status</span>
                    <span className="text-[13px] font-light tracking-wide text-foreground">— Waiting</span>
                  </div>
                </div>
              </motion.div>

              {/* 2. THE TRANSITION */}
              <motion.div custom={5} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant} className="flex flex-col relative mb-8">
                <div className="flex flex-col items-start gap-2.5">
                  <div className="pl-8 text-[8px] font-medium tracking-[0.3em] uppercase text-muted-foreground bg-background py-0.5 relative">
                    <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-border" />
                    Uncertainty
                  </div>
                  
                  <div className="pl-8 text-[11px] font-bold tracking-[0.4em] uppercase text-foreground bg-background py-1 relative">
                    <div className="absolute left-[-2px] top-1/2 w-[19px] h-[1px] bg-foreground" />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground absolute left-[-3px] top-1/2 -translate-y-1/2" />
                    CARETRACK
                  </div>
                  
                  <div className="pl-8 text-[8px] font-medium tracking-[0.3em] uppercase text-muted-foreground bg-background py-0.5 relative">
                    <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-border" />
                    Clarity
                  </div>
                </div>
              </motion.div>

              {/* 3. THE CARETRACK WAY */}
              <motion.div custom={6} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant} className="flex flex-col relative mb-5 pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-[1px] bg-border" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-foreground font-semibold mb-4">The CareTrack Way</span>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Your Position</span>
                    <span className="text-[2.25rem] leading-none font-light tracking-tighter text-foreground">#04</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Estimated Wait</span>
                    <span className="text-[2.25rem] leading-none font-light tracking-tighter text-foreground">12 <span className="text-base tracking-widest text-muted-foreground">MIN</span></span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Status</span>
                  <span className="text-sm font-light tracking-wide text-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-foreground animate-pulse" />
                    Your turn approaching
                  </span>
                </div>
              </motion.div>

              {/* 4. NOTIFICATION HERO MOMENT */}
              <motion.div custom={7} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant} className="relative pl-6 sm:pl-8">
                <div className="absolute left-0 top-5 w-4 h-[1px] bg-border" />
                
                <div className="flex flex-col p-4 sm:p-5 bg-card border border-border shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-foreground mb-2 block">
                    Your turn is approaching
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground leading-relaxed mb-4 block">
                    Please arrive at the consultation area in approximately 10 minutes.
                  </span>
                  
                  <div className="pt-3 border-t border-border">
                    <span className="text-[8px] uppercase tracking-[0.2em] font-semibold text-muted-foreground block">
                      Know when to leave.
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.2em] font-semibold text-foreground block mt-0.5">
                      Arrive when it matters.
                    </span>
                  </div>
                </div>
                
              </motion.div>

            </div>
          </div>
          
        </div>

        {/* BOTTOM HIGHLIGHTS */}
        <motion.div 
          custom={8} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }} variants={fadeUpVariant}
          className="mt-14 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {/* Highlight 01 */}
          <div className="flex flex-col pr-4 sm:border-r border-border/50">
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-sm font-light text-muted-foreground/40">01</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground">Real-Time Queue</span>
            </div>
            <span className="text-[11px] text-muted-foreground leading-relaxed">Know where you stand at all times.</span>
          </div>
          
          {/* Highlight 02 */}
          <div className="flex flex-col pr-4 sm:border-r border-border/50">
             <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-sm font-light text-muted-foreground/40">02</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground">Timely Notifications</span>
            </div>
            <span className="text-[11px] text-muted-foreground leading-relaxed">Know exactly when to arrive.</span>
          </div>

          {/* Highlight 03 */}
          <div className="flex flex-col pr-4">
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-sm font-light text-muted-foreground/40">03</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground">Connected History</span>
            </div>
            <span className="text-[11px] text-muted-foreground leading-relaxed">Keep your consultations organized.</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}