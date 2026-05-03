import { motion } from "framer-motion";
import { Building, Factory, Palette, Search, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";

const listings = [
  { id: 1, seller: "Titan Mining Co.", type: "Fly Ash", qty: "5,000 tons", price: "$12/ton", category: "Construction", status: "Available", icon: Factory },
  { id: 2, seller: "EcoRecover Ltd.", type: "Bottom Ash Aggregates", qty: "2,200 tons", price: "$18/ton", category: "Construction", status: "Available", icon: Building },
  { id: 3, seller: "MetalPure Inc.", type: "Iron Oxide Pigments", qty: "340 kg", price: "$85/kg", category: "Art", status: "Available", icon: Palette },
  { id: 4, seller: "GreenBuild Corp.", type: "Coal Gangue Bricks", qty: "10,000 units", price: "$0.45/unit", category: "Construction", status: "Sold", icon: Building },
  { id: 5, seller: "RareEarth Solutions", type: "Cenosphere Extract", qty: "120 kg", price: "$220/kg", category: "Metal", status: "Available", icon: Factory },
  { id: 6, seller: "ArtMineral Studio", type: "Fire-Texture Tiles", qty: "500 pieces", price: "$15/pc", category: "Art", status: "Available", icon: Palette },
  { id: 7, seller: "ReGen Mining", type: "FGD Gypsum", qty: "8,000 tons", price: "$9/ton", category: "Construction", status: "Available", icon: Building },
  { id: 8, seller: "PureTech Metals", type: "Recovered Iron (Fe)", qty: "1,800 kg", price: "$1.2/kg", category: "Metal", status: "Available", icon: Factory },
];

const categories = ["All", "Construction", "Metal", "Art"];

const Marketplace = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = listings.filter(
    (l) =>
      (filter === "All" || l.category === filter) &&
      (l.type.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Waste Marketplace</h1>
      <p className="mt-1 mb-8 text-muted-foreground">Connect mining companies, manufacturers, recyclers, artists, and buyers.</p>

      {/* Stakeholder Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: Factory, label: "Mining Companies", count: 24 },
          { icon: Building, label: "Manufacturers", count: 18 },
          { icon: Users, label: "Recyclers", count: 12 },
          { icon: ShoppingBag, label: "Buyers", count: 45 },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 text-center">
            <s.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text" placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-border bg-secondary pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((l, i) => (
          <motion.div key={l.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="mb-3 flex items-center justify-between">
              <l.icon className="h-5 w-5 text-primary" />
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${l.status === "Available" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                {l.status}
              </span>
            </div>
            <h3 className="font-semibold">{l.type}</h3>
            <p className="text-xs text-muted-foreground">{l.seller}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{l.qty}</span>
              <span className="font-bold text-primary">{l.price}</span>
            </div>
            <button className="mt-4 w-full rounded-lg bg-secondary py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
              Contact Seller
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default Marketplace;
