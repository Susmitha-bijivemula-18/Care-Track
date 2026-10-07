import { motion } from 'framer-motion';

export function QueueShowcase() {
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
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#080808]">
      {/* Background Image & Sophisticated Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
      <div className="absolute inset-0 bg-black/80" />
      
      <div className="w-full max-w-[80rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 grid lg:grid-cols-[45%_55%] gap-12 lg:gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: Messaging */}
        <div className="flex flex-col text-white">
          <motion.h2 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight mb-8 leading-[1.05]"
          >
            Know when it's your turn.
          </motion.h2>
          
          <motion.p 
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
            className="text-[14px] text-white/70 max-w-md leading-relaxed mb-16"
          >
            No more guessing how long you will wait. CareTrack keeps you informed as your appointment moves through the queue in real time.
          </motion.p>

          <div className="space-y-12 max-w-md">
            
            <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant} className="flex flex-col">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-xl font-light text-white/30">01</span>
                <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white">Live Queue</h4>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed pl-10">
                Follow your token and position in the queue in real time.
              </p>
            </motion.div>

            <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant} className="flex flex-col">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-xl font-light text-white/30">02</span>
                <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white">Timely Notifications</h4>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed pl-10">
                Get notified when your consultation time is approaching, so you can arrive at the right time instead of waiting.
              </p>
            </motion.div>

            <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant} className="flex flex-col">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-xl font-light text-white/30">03</span>
                <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white">Connected History</h4>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed pl-10">
                Access previous consultations, prescriptions and medical records in one place.
              </p>
            </motion.div>

          </div>
        </div>

        {/* RIGHT SIDE: Premium Product UI Showcase */}
        <div className="relative flex flex-col justify-center lg:justify-end items-center lg:items-end w-full mt-8 lg:mt-0 pt-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[420px] bg-card text-foreground border border-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] relative flex flex-col p-6 sm:p-8 lg:mr-10"
          >
             {/* Header */}
             <div className="flex items-start justify-between border-b border-border pb-6 mb-8">
               <div className="flex flex-col">
                 <div className="font-semibold text-xl tracking-tight mb-1">Dr. Ananya Rao</div>
                 <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Cardiology</div>
               </div>
               
               {/* Live Indicator */}
               <div className="flex items-center gap-2.5 px-3 py-1.5 border border-border/60 bg-foreground/[0.02]">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                  <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-foreground">Live Queue</span>
               </div>
             </div>

             {/* Token & Stats */}
             <div className="flex flex-col mb-10">
               <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Your Token</div>
               <div className="text-[4rem] leading-none font-light tracking-tighter text-foreground">A-27</div>
             </div>

             <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-border">
               <div className="flex flex-col">
                 <div className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Current</div>
                 <div className="text-2xl font-light text-foreground">A-23</div>
               </div>
               <div className="flex flex-col">
                 <div className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Ahead</div>
                 <div className="text-2xl font-light text-foreground">3</div>
               </div>
               <div className="flex flex-col">
                 <div className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Est. Wait</div>
                 <div className="text-2xl font-light text-foreground">18 <span className="text-[10px] tracking-widest text-muted-foreground">MIN</span></div>
               </div>
             </div>

             {/* Live Queue Visual */}
             <div className="flex flex-col gap-4">
               {['A-23', 'A-24', 'A-25', 'A-26'].map((token, i) => (
                 <div key={token} className="flex items-center gap-5 text-muted-foreground opacity-40">
                   <span className="w-10 text-sm font-medium tracking-wide">{token}</span>
                   <div className="w-[1px] h-3 bg-foreground/60" />
                 </div>
               ))}
               
               <div className="flex items-center gap-5 text-foreground pt-2">
                 <span className="w-10 text-sm font-bold tracking-wide">A-27</span>
                 <div className="w-[1.5px] h-4 bg-foreground" />
                 <span className="text-[9px] font-bold tracking-[0.25em] uppercase">You</span>
               </div>
             </div>
          </motion.div>

          {/* Floating Notification Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[360px] bg-foreground text-background shadow-2xl p-6 relative lg:absolute lg:right-[-20px] lg:bottom-20 mt-[-20px] lg:mt-0 z-20"
          >
             <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-background">Your Turn Is Approaching</span>
             </div>
             <span className="text-[13px] font-medium leading-relaxed block italic opacity-90">
               "Please arrive at the consultation area in approximately 10 minutes."
             </span>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}