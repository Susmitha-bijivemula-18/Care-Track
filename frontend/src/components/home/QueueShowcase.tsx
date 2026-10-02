import { motion } from 'framer-motion';

export function QueueShowcase() {
  return (
    <section className="py-24 bg-foreground text-background px-4 md:px-8 overflow-hidden relative">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/patients-waiting.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-background">Know when it's your turn.</h2>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-10">
            No more guessing how long you will wait. CareTrack keeps you informed as your appointment moves through the queue in real-time.
          </p>

          <div className="space-y-6 max-w-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Live Queue Updates</h4>
                <p className="text-sm text-white/60 leading-relaxed">See your token number, current position, and estimated waiting time — all updated as the queue moves forward.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Prescriptions & Records</h4>
                <p className="text-sm text-white/60 leading-relaxed">Access your prescriptions, lab reports, and consultation notes from previous visits — all in one place for easy reference.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Appointment History</h4>
                <p className="text-sm text-white/60 leading-relaxed">Review your complete consultation timeline — past doctors, diagnoses, and documents — so you're always prepared for your next visit.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md bg-background text-foreground rounded-2xl p-8 shadow-2xl"
          >
            <div className="border-b border-border pb-6 mb-6">
              <div className="font-semibold text-xl">DR. ANANYA RAO</div>
              <div className="text-muted-foreground">Cardiology</div>
            </div>

            <div className="mb-8">
              <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Your Token</div>
              <div className="text-6xl font-black tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent w-max">A-27</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Current</div>
                <div className="font-semibold text-xl">A-23</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Ahead</div>
                <div className="font-semibold text-xl">3</div>
              </div>
              <div className="col-span-2 mt-2">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Estimated Wait</div>
                <div className="font-semibold text-xl text-foreground">18 min</div>
              </div>
            </div>

            <div className="space-y-3">
              {['A-23', 'A-24', 'A-25', 'A-26'].map((token, i) => (
                <div key={token} className="flex items-center gap-4 text-muted-foreground opacity-50">
                  <span className="w-12 font-medium">{token}</span>
                  <div className="w-2 h-2 rounded-full bg-border" />
                </div>
              ))}
              <div className="flex items-center gap-4 font-semibold text-blue-500">
                <span className="w-12">A-27</span>
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span className="text-sm">YOU</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}