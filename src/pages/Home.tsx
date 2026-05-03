import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Building2, FlaskConical, Palette, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: FlaskConical, title: "AI Waste Classification", desc: "Advanced ML models classify mining residues by composition, toxicity, and reuse potential." },
  { icon: Shield, title: "Toxicity Detection", desc: "Real-time assessment of hazardous material levels with Low/Medium/High/Very High ratings." },
  { icon: Zap, title: "Purification Engine", desc: "AI-recommended treatment methods optimized for cost and environmental impact." },
  { icon: Building2, title: "Construction Reuse", desc: "Transform waste into bricks, cement additives, road materials, and structural fill." },
  { icon: BarChart3, title: "Metal Extraction", desc: "Identify recoverable metals including rare earth elements from mining residues." },
  { icon: Palette, title: "Art & Creative Products", desc: "Novel pathways for ceramic art, sculptures, decorative panels, and eco-installations." },
];

const stats = [
  { value: "10+", label: "Waste Categories" },
  { value: "99.2%", label: "Classification Accuracy" },
  { value: "45k+", label: "Analyses Completed" },
  { value: "12", label: "Reuse Pathways" },
];

const Home = () => (
  <main>
    {/* Hero */}
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Subtle grid bg */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(hsl(160 100% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 100% 40%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" /> TerreX: Circular Intelligence for Mining
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-6 max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Waste to <span className="text-primary">Wealth</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
        className="mb-10 max-w-2xl text-lg text-muted-foreground"
      >
        TerreX identifies high-value extraction potential, construction opportunities, and artistic reuse paths from complex mining residues using advanced geochemical intelligence.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap justify-center gap-4">
        <Link to="/analysis" className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-105">
          Start Analysis <ArrowRight className="h-5 w-5" />
        </Link>
        <Link to="/marketplace" className="inline-flex items-center rounded-xl border border-border bg-secondary px-8 py-3.5 text-base font-semibold text-foreground transition-transform hover:scale-105">
          Explore Marketplace
        </Link>
      </motion.div>
    </section>

    {/* Stats */}
    <section className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-16 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-primary">{s.value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
        </motion.div>
      ))}
    </section>

    {/* Features */}
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-2 text-center text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Platform Features</h2>
      <p className="mb-12 text-center text-muted-foreground">AI-powered waste intelligence across the entire mining lifecycle</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Impact */}
    <section className="border-t border-border bg-card/50 px-4 py-20 text-center">
      <h2 className="mb-4 text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Environmental Impact</h2>
      <p className="mx-auto mb-8 max-w-xl text-muted-foreground">Turning mining waste liabilities into sustainable economic assets while restoring degraded ecosystems.</p>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { val: "2.4M tons", label: "Waste Diverted from Landfills" },
          { val: "340+", label: "Reclamation Projects Active" },
          { val: "$18M", label: "Value Recovered from Waste" },
        ].map((item, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-8">
            <p className="text-3xl font-bold text-primary">{item.val}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default Home;
