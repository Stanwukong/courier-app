import Container from "@/components/shared/container";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "150+", label: "Countries Served" },
  { value: "50K+", label: "Shipments Delivered" },
  { value: "10K+", label: "Happy Clients" },
];

export default function CompanyStats() {
  return (
    <section className="bg-slate-900 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-orange-500">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
