export function HospitalStats() {
  const stats = [
    { value: "15K+", label: "Patients Served" },
    { value: "40+", label: "Specialists" },
    { value: "12+", label: "Medical Specialities" },
    { value: "10+", label: "Years of Care" },
    { value: "4.8/5", label: "Patient Experience" },
  ];

  return (
    <section className="py-12 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}