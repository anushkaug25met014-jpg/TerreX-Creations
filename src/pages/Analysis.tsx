import { useState } from "react";
import { wasteData, WasteEntry } from "@/data/wasteData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FlaskConical, Zap, Building2, Palette, Shield, Search, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";

import imgOverburden from "@/assets/waste-overburden.jpg";
import imgCoalWashery from "@/assets/waste-coal-washery.jpg";
import imgCoalTailings from "@/assets/waste-coal-tailings.jpg";
import imgCoalSlurry from "@/assets/waste-coal-slurry.jpg";
import imgFlyAsh from "@/assets/waste-fly-ash.jpg";
import imgBottomAsh from "@/assets/waste-bottom-ash.jpg";
import imgAcidMine from "@/assets/waste-acid-mine.jpg";
import imgFireAffected from "@/assets/waste-fire-affected.jpg";
import imgCoalGangue from "@/assets/waste-coal-gangue.jpg";
import imgFgdGypsum from "@/assets/waste-fgd-gypsum.jpg";
import imgCoalFines from "@/assets/waste-coal-fines.jpg";

import artOverburden from "@/assets/art-overburden.jpg";
import artCoalWashery from "@/assets/art-coal-washery.jpg";
import artCoalTailings from "@/assets/art-coal-tailings.jpg";
import artCoalSlurry from "@/assets/art-coal-slurry.jpg";
import artFlyAsh from "@/assets/art-fly-ash.jpg";
import artBottomAsh from "@/assets/art-bottom-ash.jpg";
import artAcidMine from "@/assets/art-acid-mine.jpg";
import artFireAffected from "@/assets/art-fire-affected.jpg";
import artCoalGangue from "@/assets/art-coal-gangue.jpg";
import artFgdGypsum from "@/assets/art-fgd-gypsum.jpg";
import artCoalFines from "@/assets/art-coal-fines.jpg";

const wasteImages: Record<string, string> = {
  "Overburden": imgOverburden,
  "Coal Washery Rejects": imgCoalWashery,
  "Coal Tailings": imgCoalTailings,
  "Coal Slurry": imgCoalSlurry,
  "Fly Ash": imgFlyAsh,
  "Bottom Ash": imgBottomAsh,
  "Acid Mine Drainage": imgAcidMine,
  "Fire Affected Waste": imgFireAffected,
  "Coal Gangue": imgCoalGangue,
  "FGD Gypsum Waste": imgFgdGypsum,
  "Coal Fines": imgCoalFines
};

const artImages: Record<string, string> = {
  "Overburden": artOverburden,
  "Coal Washery Rejects": artCoalWashery,
  "Coal Tailings": artCoalTailings,
  "Coal Slurry": artCoalSlurry,
  "Fly Ash": artFlyAsh,
  "Bottom Ash": artBottomAsh,
  "Acid Mine Drainage": artAcidMine,
  "Fire Affected Waste": artFireAffected,
  "Coal Gangue": artCoalGangue,
  "FGD Gypsum Waste": artFgdGypsum,
  "Coal Fines": artCoalFines
};

const toxColors: Record<string, string> = {
  Low: "hsl(160 100% 40%)",
  Medium: "hsl(45 100% 50%)",
  High: "hsl(0 72% 51%)",
  "Very High": "hsl(0 90% 40%)"
};

// Derived extraction metrics per waste type
const extractionMetrics: Record<string, { recovery: number; viability: string; viabilityColor: string; energy: string; energyKwh: number; details: string }> = {
  "Overburden": { recovery: 38, viability: "Moderate", viabilityColor: "hsl(45 100% 50%)", energy: "Low", energyKwh: 12, details: "Gravity-based separation keeps energy costs minimal. Iron and manganese concentrates achieve market-grade purity at scale with shaking tables." },
  "Coal Washery Rejects": { recovery: 62, viability: "High", viabilityColor: "hsl(160 100% 40%)", energy: "Medium", energyKwh: 28, details: "Magnetic separation yields high-purity iron concentrate. Acid leaching for aluminum requires controlled reagent dosing but offers strong ROI." },
  "Coal Tailings": { recovery: 45, viability: "Moderate", viabilityColor: "hsl(45 100% 50%)", energy: "Medium", energyKwh: 24, details: "Selective leaching with sulfuric acid at controlled pH enables chromium and nickel separation. Cement co-binder improves residue stability." },
  "Coal Slurry": { recovery: 28, viability: "Low", viabilityColor: "hsl(0 72% 51%)", energy: "High", energyKwh: 42, details: "Electrochemical extraction requires significant energy input. Lab-scale results show promise for lead and cadmium but scaling remains costly." },
  "Fly Ash": { recovery: 72, viability: "Very High", viabilityColor: "hsl(160 100% 50%)", energy: "Medium-High", energyKwh: 35, details: "Sequential acid digestion unlocks rare earth elements and silicon. Cenosphere recovery alone can offset total processing costs." },
  "Bottom Ash": { recovery: 55, viability: "High", viabilityColor: "hsl(160 100% 40%)", energy: "Low", energyKwh: 15, details: "Gravity and magnetic separation are energy-efficient. Iron and zinc concentrates meet industrial feedstock specifications." },
  "Acid Mine Drainage": { recovery: 34, viability: "Moderate", viabilityColor: "hsl(45 100% 50%)", energy: "Low-Medium", energyKwh: 18, details: "Oxidation precipitation is passive and low-cost. Iron oxide pigments from AMD have growing market demand in coatings and ceramics." },
  "Fire Affected Waste": { recovery: 48, viability: "Moderate", viabilityColor: "hsl(45 100% 50%)", energy: "High", energyKwh: 38, details: "Thermal pre-cooling is energy-intensive. Selective dissolution yields iron and sulphate concentrates suitable for industrial chemistry." },
  "Coal Gangue": { recovery: 41, viability: "Moderate", viabilityColor: "hsl(45 100% 50%)", energy: "Medium", energyKwh: 22, details: "Alkaline fusion followed by selective leaching extracts silicon and aluminum. Cost-effective as aggregate substitute in concrete production." },
  "FGD Gypsum Waste": { recovery: 85, viability: "Very High", viabilityColor: "hsl(160 100% 50%)", energy: "Low", energyKwh: 10, details: "Recrystallization produces wallboard-grade calcium sulfate with minimal processing. Highest economic return among all waste streams." },
  "Coal Fines": { recovery: 58, viability: "High", viabilityColor: "hsl(160 100% 40%)", energy: "Medium", energyKwh: 26, details: "Combined magnetic separation and froth flotation maximize iron recovery. Bioleaching offers low-energy pathway for manganese extraction." },
};

const Analysis = () => {
  const [selected, setSelected] = useState<WasteEntry>(wasteData[0]);
  const [search, setSearch] = useState("");
  const [artModalOpen, setArtModalOpen] = useState(false);
  const [extractionModalOpen, setExtractionModalOpen] = useState(false);

  const chartData = [
  { name: "pH Min", value: selected.ph_min },
  { name: "pH Max", value: selected.ph_max },
  { name: "Moisture Min", value: selected.moisture_min },
  { name: "Moisture Max", value: selected.moisture_max },
  { name: "Metal %", value: selected.metal_percentage }];


  const filteredData = wasteData.filter((w) =>
  w.waste_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TerreX Analysis Engine</h1>
          <p className="mt-1 text-muted-foreground">Comprehensive classification of 10 core mining residues with AI-driven extraction intelligence.</p>
        </div>
        <div>
          <p className="mb-1 text-sm text-primary">Select Residue Category</p>
          <select
            value={selected.waste_type}
            onChange={(e) => setSelected(wasteData.find((w) => w.waste_type === e.target.value)!)}
            className="w-64 rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">

            {wasteData.map((w) =>
            <option key={w.waste_type} value={w.waste_type}>{w.waste_type}</option>
            )}
          </select>
        </div>
      </div>

      {/* Top section: chart + profile */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Geochemical Profile */}
        <div className="space-y-4">
          {/* Waste Type Image */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <img
              src={wasteImages[selected.waste_type]}
              alt={selected.waste_type}
              className="h-48 w-full object-cover" />

            <div className="bg-card px-4 py-2 text-center text-sm font-semibold text-primary">
              {selected.waste_type}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <FlaskConical className="h-5 w-5 text-primary" /> Geochemical Profile
            </h3>
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Geological Source</p>
              <p className="mt-1 text-sm italic text-primary">"{selected.geological_source}"</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Moisture Content</p>
                <p className="text-lg font-bold">{selected.moisture_min}% - {selected.moisture_max}%</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Metal Ion Load</p>
                <p className="text-lg font-bold"><span className="text-primary">{selected.metal_percentage}% Avg</span></p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-border bg-secondary/30 p-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">pH Sensitivity</p>
              <p className="font-bold">{selected.ph_min} - {selected.ph_max}</p>
            </div>
            <div className="mt-3 rounded-xl border border-border bg-secondary/30 p-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Target Metal</p>
              <p className="font-bold text-primary uppercase">{selected.extraction_target}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Risk Factor Assessment</p>
              <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: toxColors[selected.toxicity_level] }}>
                <Shield className="h-4 w-4" /> {selected.toxicity_level}
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: selected.toxicity_level === "Low" ? "25%" : selected.toxicity_level === "Medium" ? "50%" : selected.toxicity_level === "High" ? "75%" : "95%",
                  backgroundColor: toxColors[selected.toxicity_level]
                }} />

            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-2xl border border-primary/30 bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Composition Distribution (Visual)</h3>
            <span className="text-xs text-muted-foreground">Auto-generated via Spectral Analysis</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "12px", color: "hsl(160 10% 92%)" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) =>
                <Cell key={i} fill={i === chartData.length - 1 ? "hsl(160 100% 40%)" : "hsl(220 15% 30%)"} />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Purification + Extraction */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="rounded-2xl border border-primary/20 bg-card p-6">
          <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold"><FlaskConical className="h-5 w-5 text-blue-400" /> Purification Method</h3>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-400">{selected.purification_type}</p>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Prescribed Process</p>
          <p className="mb-4 text-sm text-muted-foreground">{selected.purification_process}</p>
          <div className="rounded-xl border-l-2 border-primary/40 bg-secondary/30 p-4">
            <p className="text-xs text-muted-foreground">🤖 AI Suggestion: <span className="italic text-foreground">"{selected.ai_suggestion}"</span></p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="rounded-2xl border border-primary/20 bg-card p-6 cursor-pointer group"
        onClick={() => setExtractionModalOpen(true)}>
          <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold"><Zap className="h-5 w-5 text-primary" /> Extraction Workflow</h3>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">Target: {selected.extraction_target}</p>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">Industrial Steps</p>
          <p className="mb-4 text-sm text-muted-foreground">{selected.extraction_steps}</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Recovery: {selected.extraction_recovery}</span>
            <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Scale: {selected.extraction_scale}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">Click for detailed extraction metrics →</p>
        </motion.div>
      </div>

      {/* Reuse Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-border bg-card p-6 border-8 border-double">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><Building2 className="h-5 w-5 text-primary" /> Construction Strategy</h3>
          <p className="mt-2 text-sm text-muted-foreground">{selected.construction_reuse}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><Palette className="h-5 w-5 text-primary" /> Creative Output Path</h3>
          <p className="mt-2 text-sm text-muted-foreground">{selected.art_reuse}</p>
          {artImages[selected.waste_type] &&
          <div
            className="mt-4 overflow-hidden rounded-xl border border-border cursor-pointer group"
            onClick={() => setArtModalOpen(true)}>

              <div className="relative">
                <img
                src={artImages[selected.waste_type]}
                alt={`Art product from ${selected.waste_type}`}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                  <Expand className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              <div className="bg-secondary/50 px-3 py-1.5 text-center text-xs font-medium text-muted-foreground">
                Art from {selected.waste_type} — Click to expand
              </div>
            </div>
          }
        </div>
      </div>

      {/* Extraction Workflow Modal */}
      <Dialog open={extractionModalOpen} onOpenChange={setExtractionModalOpen}>
        <DialogContent className="max-w-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> Extraction Workflow — {selected.waste_type}
            </DialogTitle>
            <DialogDescription>Detailed extraction metrics and economic analysis</DialogDescription>
          </DialogHeader>
          {(() => {
            const m = extractionMetrics[selected.waste_type];
            if (!m) return null;
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {/* Recovery Efficiency */}
                  <div className="rounded-xl border border-border bg-secondary/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Metal Recovery</p>
                    <p className="mt-2 text-2xl font-bold text-primary">{m.recovery}%</p>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                  </div>
                  {/* Economic Viability */}
                  <div className="rounded-xl border border-border bg-secondary/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Economic Viability</p>
                    <p className="mt-2 text-2xl font-bold" style={{ color: m.viabilityColor }}>{m.viability}</p>
                    <p className="text-xs text-muted-foreground">Index</p>
                  </div>
                  {/* Energy Consumption */}
                  <div className="rounded-xl border border-border bg-secondary/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Energy Cost</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">{m.energyKwh}</p>
                    <p className="text-xs text-muted-foreground">kWh/ton</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Target Extraction</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{selected.extraction_target}</p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Industrial Steps</p>
                  <p className="mt-1 text-sm text-foreground">{selected.extraction_steps}</p>
                </div>

                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Detailed Analysis</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.details}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Recovery: {selected.extraction_recovery}</span>
                  <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Scale: {selected.extraction_scale}</span>
                  <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Energy: {m.energy}</span>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Art Lightbox Modal */}
      <Dialog open={artModalOpen} onOpenChange={setArtModalOpen}>
        <DialogContent className="max-w-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" /> Art from {selected.waste_type}
            </DialogTitle>
            <DialogDescription>Creative reuse output and process details</DialogDescription>
          </DialogHeader>
          {artImages[selected.waste_type] &&
          <img
            src={artImages[selected.waste_type]}
            alt={`Art product from ${selected.waste_type}`}
            className="w-full rounded-xl object-cover" />

          }
          <div className="space-y-3">
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Creative Output Path</p>
              <p className="mt-1 text-sm text-foreground">{selected.art_reuse}</p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Source Material</p>
              <p className="mt-1 text-sm text-foreground">{selected.waste_type} — {selected.geological_source}</p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Toxicity: {selected.toxicity_level}
              </span>
              <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Treatment: {selected.treatment}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dataset Table */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold">Coal Waste Dataset</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search waste type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-border bg-secondary pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />

          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 pr-4">Waste Type</th>
                <th className="pb-3 pr-4">pH Range</th>
                <th className="pb-3 pr-4">Moisture %</th>
                <th className="pb-3 pr-4">Metal Ions</th>
                <th className="pb-3 pr-4">Metal %</th>
                <th className="pb-3 pr-4">Toxicity</th>
                <th className="pb-3 pr-4">Treatment</th>
                <th className="pb-3">Reuse</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((w) =>
              <tr key={w.waste_type} className="border-b border-border/50 hover:bg-secondary/30 cursor-pointer" onClick={() => setSelected(w)}>
                  <td className="py-3 pr-4 font-medium">{w.waste_type}</td>
                  <td className="py-3 pr-4">{w.ph_min} - {w.ph_max}</td>
                  <td className="py-3 pr-4">{w.moisture_min} - {w.moisture_max}%</td>
                  <td className="py-3 pr-4 text-xs">{w.metal_ions.join(", ")}</td>
                  <td className="py-3 pr-4">{w.metal_percentage}%</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ color: toxColors[w.toxicity_level], backgroundColor: `${toxColors[w.toxicity_level]}20` }}>
                      {w.toxicity_level}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{w.treatment}</td>
                  <td className="py-3 text-xs text-muted-foreground">{w.construction_reuse}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>);

};

export default Analysis;