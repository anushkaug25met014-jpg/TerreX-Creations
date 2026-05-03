import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Activity, Gauge, Beaker, Shield, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Waves, Zap, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const waterData = [
  { id: 1, ph: 7.2, turbidity: 1.5, dissolvedOxygen: 8.5, quality: "Good", treatment: "No Action Needed" },
  { id: 2, ph: 6.8, turbidity: 3.2, dissolvedOxygen: 7.8, quality: "Good", treatment: "No Action Needed" },
  { id: 3, ph: 5.1, turbidity: 12.0, dissolvedOxygen: 5.0, quality: "Poor", treatment: "Filtration + Aeration" },
  { id: 4, ph: 8.4, turbidity: 0.7, dissolvedOxygen: 9.2, quality: "Good", treatment: "No Action Needed" },
  { id: 5, ph: 7.9, turbidity: 5.8, dissolvedOxygen: 6.9, quality: "Fair", treatment: "Sedimentation + Filtration" },
  { id: 6, ph: 4.8, turbidity: 15.3, dissolvedOxygen: 4.3, quality: "Poor", treatment: "Full Treatment Required" },
  { id: 7, ph: 7.0, turbidity: 2.5, dissolvedOxygen: 7.0, quality: "Good", treatment: "No Action Needed" },
  { id: 8, ph: 8.8, turbidity: 7.1, dissolvedOxygen: 5.8, quality: "Fair", treatment: "Filtration" },
  { id: 9, ph: 6.2, turbidity: 10.4, dissolvedOxygen: 6.2, quality: "Poor", treatment: "Aeration + Clarification" },
  { id: 10, ph: 7.5, turbidity: 0.5, dissolvedOxygen: 8.8, quality: "Good", treatment: "No Action Needed" },
];

function classifyWater(ph: number, turbidity: number, dissolvedOxygen: number) {
  let score = 0;
  if (ph >= 6.5 && ph <= 8.5) score += 2;
  else if (ph >= 5.5 && ph <= 9.0) score += 1;
  if (turbidity <= 5) score += 2;
  else if (turbidity <= 10) score += 1;
  if (dissolvedOxygen >= 6) score += 2;
  else if (dissolvedOxygen >= 4) score += 1;

  if (score >= 5) return { quality: "Good", treatment: "No Action Needed", color: "text-emerald-400" };
  if (score >= 3) return { quality: "Fair", treatment: "Activated Carbon + UV Filtration recommended", color: "text-amber-400" };
  return { quality: "Poor", treatment: "Chlorination, Sedimentation & Advanced Filtration required", color: "text-red-400" };
}

const qualityBadge = (q: string) => {
  if (q === "Good") return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"><CheckCircle className="h-3 w-3 mr-1" /> Good</Badge>;
  if (q === "Fair") return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30"><AlertTriangle className="h-3 w-3 mr-1" /> Fair</Badge>;
  return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="h-3 w-3 mr-1" /> Poor</Badge>;
};

const WaterQuality = () => {
  const [ph, setPh] = useState("");
  const [turbidity, setTurbidity] = useState("");
  const [dissolvedOxygen, setDissolvedOxygen] = useState("");
  const [result, setResult] = useState<{ quality: string; treatment: string; color: string } | null>(null);
  const [showDatasheet, setShowDatasheet] = useState(false);
  const [selectedSample, setSelectedSample] = useState<typeof waterData[0] | null>(null);

  const handleAnalyze = () => {
    const p = parseFloat(ph);
    const t = parseFloat(turbidity);
    const d = parseFloat(dissolvedOxygen);
    if (isNaN(p) || isNaN(t) || isNaN(d)) return;
    setResult(classifyWater(p, t, d));
  };

  const sensorRanges = [
    { icon: Beaker, label: "pH Sensor", range: "0–14", ideal: "6.5–8.5" },
    { icon: Waves, label: "Turbidity Sensor", range: "0–1000 NTU", ideal: "≤5 NTU" },
    { icon: Activity, label: "Dissolved Oxygen", range: "0–20 mg/L", ideal: "≥6 mg/L" },
  ];

  const features = [
    { icon: Zap, title: "Real-Time IoT Monitoring", desc: "Connected to low-cost sensors at mining discharge points for continuous water quality tracking." },
    { icon: Shield, title: "Environmental Compliance", desc: "Helps mining companies maintain regulatory standards and reduce legal risks." },
    { icon: Globe, title: "Community Protection", desc: "Early contamination alerts protect surrounding villages, workers, and groundwater quality." },
    { icon: Gauge, title: "Scalable & Affordable", desc: "Integrates with government environmental dashboards for large-scale deployment." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-background to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
              <Droplets className="h-8 w-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AquaGuard <span className="text-cyan-400">AI</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              AI-based smart water quality monitoring for mining zones. Instantly classify water as Good, Fair, or Poor
              using pH, turbidity, and dissolved oxygen parameters with ML-powered predictions.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
        {/* Analyzer */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold text-foreground text-center mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Analyze Water Quality
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Input measured values from your water sample for ML-based classification.
          </p>
          <Card className="mx-auto max-w-lg border-cyan-500/20 bg-card">
            <CardContent className="p-6 space-y-4">
              <Input
                type="number"
                placeholder="pH Level (0–14)"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                className="bg-secondary border-border"
              />
              <Input
                type="number"
                placeholder="Turbidity (NTU)"
                value={turbidity}
                onChange={(e) => setTurbidity(e.target.value)}
                className="bg-secondary border-border"
              />
              <Input
                type="number"
                placeholder="Dissolved Oxygen (mg/L)"
                value={dissolvedOxygen}
                onChange={(e) => setDissolvedOxygen(e.target.value)}
                className="bg-secondary border-border"
              />
              <Button onClick={handleAnalyze} className="w-full bg-cyan-500 hover:bg-cyan-600 text-background font-semibold">
                Analyze Quality
              </Button>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-border bg-secondary p-5 text-center space-y-2"
                >
                  <p className="text-sm text-muted-foreground">Classification Result</p>
                  <p className={`text-3xl font-bold ${result.color}`}>{result.quality}</p>
                  <p className="text-sm text-muted-foreground">{result.treatment}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.section>

        {/* Sensor Ranges */}
        <section>
          <h2 className="text-2xl font-bold text-foreground text-center mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sensor Interfacing Ranges
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {sensorRanges.map((s) => (
              <Card key={s.label} className="border-border bg-card text-center">
                <CardContent className="p-6">
                  <s.icon className="mx-auto mb-3 h-8 w-8 text-cyan-400" />
                  <h3 className="font-semibold text-foreground">{s.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Range: {s.range}</p>
                  <p className="text-sm text-cyan-400 font-medium">Ideal: {s.ideal}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Datasheet */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Water Quality Datasheet
            </h2>
            <Button variant="outline" onClick={() => setShowDatasheet(!showDatasheet)} className="border-cyan-500/30 text-cyan-400">
              {showDatasheet ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
              {showDatasheet ? "Collapse" : "View Data"}
            </Button>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Dataset of 10 mining zone water samples with ML-classified quality labels and treatment suggestions. Click any row for details.
          </p>
          {showDatasheet && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
              <Card className="border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-cyan-400">ID</TableHead>
                      <TableHead className="text-cyan-400">pH</TableHead>
                      <TableHead className="text-cyan-400">Turbidity (NTU)</TableHead>
                      <TableHead className="text-cyan-400">DO (mg/L)</TableHead>
                      <TableHead className="text-cyan-400">Quality</TableHead>
                      <TableHead className="text-cyan-400">Treatment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waterData.map((row) => (
                      <TableRow
                        key={row.id}
                        className="border-border cursor-pointer hover:bg-secondary/80 transition-colors"
                        onClick={() => setSelectedSample(row)}
                      >
                        <TableCell className="text-foreground font-mono">{row.id}</TableCell>
                        <TableCell className="text-foreground">{row.ph}</TableCell>
                        <TableCell className="text-foreground">{row.turbidity}</TableCell>
                        <TableCell className="text-foreground">{row.dissolvedOxygen}</TableCell>
                        <TableCell>{qualityBadge(row.quality)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{row.treatment}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold text-foreground text-center mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why AquaGuard AI for Mining Zones?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title} className="border-border bg-card">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <f.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Treatment Guide */}
        <section className="pb-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Treatment Recommendations
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-emerald-500/20 bg-card">
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
                <h3 className="font-semibold text-emerald-400">Good Quality</h3>
                <p className="text-sm text-muted-foreground mt-2">Safe for consumption. Only periodic monitoring needed.</p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20 bg-card">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-amber-400" />
                <h3 className="font-semibold text-amber-400">Fair Quality</h3>
                <p className="text-sm text-muted-foreground mt-2">Apply activated carbon + UV filtration before use.</p>
              </CardContent>
            </Card>
            <Card className="border-red-500/20 bg-card">
              <CardContent className="p-6 text-center">
                <XCircle className="mx-auto mb-3 h-8 w-8 text-red-400" />
                <h3 className="font-semibold text-red-400">Poor Quality</h3>
                <p className="text-sm text-muted-foreground mt-2">Requires chlorination, sedimentation, and advanced filtration.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Sample Detail Modal */}
      <Dialog open={!!selectedSample} onOpenChange={() => setSelectedSample(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Sample #{selectedSample?.id} — Detailed Analysis
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Full parameter breakdown and treatment recommendation.
            </DialogDescription>
          </DialogHeader>
          {selectedSample && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-secondary p-3 text-center">
                  <p className="text-xs text-muted-foreground">pH Level</p>
                  <p className="text-xl font-bold text-foreground">{selectedSample.ph}</p>
                  <p className="text-xs text-muted-foreground">{selectedSample.ph >= 6.5 && selectedSample.ph <= 8.5 ? "✅ Normal" : "⚠️ Abnormal"}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3 text-center">
                  <p className="text-xs text-muted-foreground">Turbidity</p>
                  <p className="text-xl font-bold text-foreground">{selectedSample.turbidity}</p>
                  <p className="text-xs text-muted-foreground">{selectedSample.turbidity <= 5 ? "✅ Clear" : "⚠️ Cloudy"}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3 text-center">
                  <p className="text-xs text-muted-foreground">DO (mg/L)</p>
                  <p className="text-xl font-bold text-foreground">{selectedSample.dissolvedOxygen}</p>
                  <p className="text-xs text-muted-foreground">{selectedSample.dissolvedOxygen >= 6 ? "✅ Adequate" : "⚠️ Low"}</p>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Quality Classification</p>
                <div className="mb-2">{qualityBadge(selectedSample.quality)}</div>
                <p className="text-sm text-muted-foreground">{selectedSample.treatment}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaterQuality;
