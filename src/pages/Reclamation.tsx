import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";

const sites = [
  {
    id: 1, name: "Sector 7 Abandoned Quarry", region: "Eastern Ridge", status: "Restoring", statusColor: "hsl(45 100% 50%)",
    soil_ph: 8.1, iron_oxide: 4.1, lead: 120, arsenic: 15, lat: 45, lng: 35,
    strategies: ["Topsoil replenishment with treated bio-solids", "Native grass seeding (Kudzu alternatives)", "Phytoremediation using hyperaccumulator plants"],
  },
  {
    id: 2, name: "Sector 12 Open Pit Mine", region: "Western Valley", status: "Barren", statusColor: "hsl(0 72% 51%)",
    soil_ph: 3.2, iron_oxide: 7.8, lead: 450, arsenic: 85, lat: 60, lng: 25,
    strategies: ["Acid mine drainage treatment system", "Lime application for pH correction", "Constructed wetland installation"],
  },
  {
    id: 3, name: "Sector 3 Coal Washery Site", region: "Northern Plateau", status: "Productive", statusColor: "hsl(160 100% 40%)",
    soil_ph: 6.8, iron_oxide: 2.3, lead: 25, arsenic: 5, lat: 30, lng: 65,
    strategies: ["Maintained vegetation cover", "Ongoing water quality monitoring", "Community agricultural reuse pilot"],
  },
];

const Reclamation = () => {
  const [selected, setSelected] = useState(sites[0]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Land Reclamation & Environmental Strategy</h1>
      <p className="mt-1 mb-8 text-muted-foreground">Monitoring and restoring degraded mining landscapes with AI-guided strategies.</p>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Map area */}
        <div className="lg:col-span-3 rounded-2xl border border-primary/20 bg-card overflow-hidden relative" style={{ minHeight: 500 }}>
          {/* Simulated grid map */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(hsl(160 100% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 100% 40%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative h-full p-6">
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => setSelected(site)}
                className="absolute transition-transform hover:scale-125"
                style={{ top: `${site.lat}%`, left: `${site.lng}%` }}
              >
                <MapPin className="h-7 w-7 drop-shadow-lg" style={{ color: site.statusColor }} />
              </button>
            ))}

            {/* Legend */}
            <div className="absolute bottom-6 left-6 rounded-xl border border-border bg-card/90 p-4 backdrop-blur-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Land Status Legend</p>
              {[
                { color: "hsl(0 72% 51%)", label: "Barren (High Risk)" },
                { color: "hsl(45 100% 50%)", label: "Restoration in Progress" },
                { color: "hsl(160 100% 40%)", label: "Productive / Reclaimed" },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-2 mt-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{selected.name}</h2>
                <p className="text-sm text-primary">{selected.region}</p>
              </div>
              <span className="rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: selected.statusColor, color: selected.statusColor }}>
                {selected.status}
              </span>
            </div>

            <p className="mb-4 mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Chemical Composition</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Soil pH", value: selected.soil_ph },
                { label: "Iron Oxide", value: `${selected.iron_oxide}%` },
                { label: "Lead Presence", value: `${selected.lead} ppm` },
                { label: "Arsenic Trace", value: `${selected.arsenic} ppm` },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="mt-1 text-lg font-bold text-primary" style={{ fontFamily: "monospace" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-primary">Restoration Strategies</p>
            <div className="space-y-2">
              {selected.strategies.map((s, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary text-xs font-bold text-primary">{i + 1}</span>
                  <p className="text-sm text-muted-foreground">{s}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Reclamation;
