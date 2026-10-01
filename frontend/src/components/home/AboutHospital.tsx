export function AboutHospital() {
  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
            Care that begins with listening.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Care Speciality Hospital, we believe healthcare should feel personal, coordinated, and accessible. Our approach combines experienced specialists with thoughtful technology to create a smoother experience for every patient.
          </p>
          <div className="mt-8 inline-block px-3 py-1 bg-muted rounded-full text-xs font-semibold tracking-widest uppercase">
            Care Speciality Hospital
          </div>
        </div>
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-border">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
}