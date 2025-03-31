
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background">
      <Navbar />
      <motion.main 
        className="container mx-auto pt-24 pb-12 px-4 page-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Knee Osteoarthritis Classification System</p>
          <p className="mt-1">Developed as a research project using deep learning and medical imaging analysis</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
