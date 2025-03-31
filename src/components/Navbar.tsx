
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Activity, FileBarChart2, Users } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/architecture", icon: FileBarChart2, label: "Architecture" },
    { path: "/analysis", icon: Activity, label: "Analysis" },
    { path: "/about", icon: Users, label: "About Us" },
  ];

  const navAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const logoAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-card/80 backdrop-blur-lg shadow-lg" 
          : "bg-card"
      }`}
      initial="hidden"
      animate="visible"
      variants={navAnimation}
    >
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2" 
          variants={logoAnimation}
        >
          <div className="bg-primary/20 p-2 rounded-full">
            <Activity className="text-primary h-6 w-6" />
          </div>
          <span className="text-2xl font-bold">
            <span className="text-primary">KneeOA</span>
            <span className="text-foreground"> Classifier</span>
          </span>
        </motion.div>
        
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-2 nav-icon relative group ${
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
                
                {isActive(item.path) && (
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-icon relative ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon size={24} />
              {isActive(item.path) && (
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                  layoutId="navbar-indicator-mobile"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
