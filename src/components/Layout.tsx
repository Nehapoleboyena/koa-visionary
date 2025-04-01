
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 15, 0],
            scale: [1, 0.9, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-56 h-56 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -15, 15, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.2, 0.4, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5
          }}
        />
      </div>

      <Navbar />
      
      <motion.main 
        className="container mx-auto pt-24 pb-12 px-4 page-transition relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      
      <footer className="border-t border-border py-6 mt-12 relative z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {new Date().getFullYear()} Knee Osteoarthritis Classification System
          </motion.p>
          <motion.p 
            className="mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Developed as a research project using deep learning and medical imaging analysis
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
