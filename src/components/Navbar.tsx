
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Activity, FileBarChart2, Users } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/architecture", icon: FileBarChart2, label: "Architecture" },
    { path: "/analysis", icon: Activity, label: "Analysis" },
    { path: "/about", icon: Users, label: "About Us" },
  ];

  return (
    <nav className="bg-card p-4 fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">KneeOA Classifier</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 nav-icon ${
                isActive(item.path)
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onMouseEnter={() => setHoveredIcon(item.label)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <item.icon 
                className={`${
                  hoveredIcon === item.label || isActive(item.path) ? "animate-scale-in" : ""
                }`} 
                size={20} 
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-icon ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon size={24} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
