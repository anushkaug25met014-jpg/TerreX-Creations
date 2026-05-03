import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, role, email, logout } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Analysis", path: "/analysis" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Reclamation", path: "/reclamation" },
    { label: "Water Quality", path: "/water-quality" },
    ...(role === "Admin" ? [{ label: "Admin", path: "/admin" }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            TerreX
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {isAuthenticated ? (
          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{email}</p>
              <p className="text-xs text-primary">{role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <span className="flex items-center gap-1.5">
                <LogOut className="h-4 w-4" /> Logout
              </span>
            </button>
          </div>
        ) : null}

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:inline-flex"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-lg px-4 py-2.5 text-sm font-medium",
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => { setMobileOpen(false); handleLogout(); }}
              className="mt-2 block w-full rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
