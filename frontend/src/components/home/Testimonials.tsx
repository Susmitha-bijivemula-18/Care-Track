export function Testimonials() {
  const reviews = [
    "I could see my queue position without constantly checking at the reception.",
    "My appointments and previous documents are much easier to keep track of.",
    "The entire appointment experience feels much more organized."
  ];

  return (
    <section id="experience" className="py-24 bg-background px-4 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Designed around the patient.</h2>
          <div className="inline-flex items-center gap-2 mt-4">
            <span className="text-2xl font-bold">4.8/5</span>
            <span className="text-foreground text-xl tracking-widest">★★★★★</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Prototype / demo rating</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((text, i) => (
            <div key={i} className="p-8 rounded-2xl bg-card border border-border">
              <p className="text-lg font-medium leading-relaxed mb-6">"{text}"</p>
              <div className="w-10 h-1 bg-foreground/10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}