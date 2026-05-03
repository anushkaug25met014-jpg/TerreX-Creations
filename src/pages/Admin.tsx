import { motion } from "framer-motion";
import { Activity, DollarSign, Server, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stats = [
  { icon: Users, label: "Active Users", value: "1,248", sub: "+12% from last month", color: "text-primary" },
  { icon: Activity, label: "Analysis API Calls", value: "45.2k", sub: "99.9% uptime", color: "text-primary" },
  { icon: DollarSign, label: "Transaction Volume", value: "$1.2M", sub: "In the last 24h", color: "text-foreground" },
  { icon: Server, label: "Server Latency", value: "42ms", sub: "Optimal performance", color: "text-primary" },
];

const pendingApprovals = [
  { company: "Titan Mining Co.", request: 'Analysis request for "Basalt Tailings"' },
  { company: "Titan Mining Co.", request: 'Analysis request for "Basalt Tailings"' },
  { company: "Titan Mining Co.", request: 'Analysis request for "Basalt Tailings"' },
];

const Admin = () => (
  <main className="mx-auto max-w-7xl px-4 py-8">
    <h1 className="mb-8 text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin Dashboard</h1>

    {/* Stat Cards */}
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
          <p className={`mt-1 text-3xl font-bold ${s.color}`}>{s.value}</p>
          <p className="mt-1 text-xs text-primary">{s.sub}</p>
        </motion.div>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Pending Approvals */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <button className="rounded-lg border border-primary px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            Review All
          </button>
        </div>
        <div className="space-y-4">
          {pendingApprovals.map((a, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <Server className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">{a.company}</p>
                <p className="text-xs text-muted-foreground">{a.request}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Performance */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">Model Performance (AI v2.4)</h2>
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Classification Accuracy</p>
              <span className="text-sm font-bold">99.2%</span>
            </div>
            <Progress value={99.2} className="h-2 bg-secondary [&>div]:bg-primary" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Toxicity Precision</p>
              <span className="text-sm font-bold">98.8%</span>
            </div>
            <Progress value={98.8} className="h-2 bg-secondary [&>div]:bg-primary" />
          </div>
        </div>
        <button className="mt-8 w-full rounded-xl bg-secondary py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
          Download System Logs
        </button>
      </div>
    </div>
  </main>
);

export default Admin;
