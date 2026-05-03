import { Globe, Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const roles = ["Industry", "Buyer", "Admin", "Manufacturer"] as const;
type Role = (typeof roles)[number];

const Login = () => {
  const [role, setRole] = useState<Role>("Industry");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    const success = login(email, password, role);
    if (!success) {
      setError("Invalid admin credentials");
      return;
    }
    navigate(role === "Admin" ? "/admin" : "/");
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Globe className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Secure Access
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your credentials to access the platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6">
          {/* Role selector */}
          <div className="mb-5">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Access Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-all",
                    role === r
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2.5 focus-within:ring-2 focus-within:ring-primary">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2.5 focus-within:ring-2 focus-within:ring-primary">
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="mb-3 text-sm font-medium text-destructive">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Sign In to {role} Portal
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
