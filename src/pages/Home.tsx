
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Activity, BarChart3, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  const objectives = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Deep Learning Classification",
      description: "Build a system to classify knee osteoarthritis severity from X-ray images into three categories: Normal, Moderate, and Severe."
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "CNN Model Evaluation",
      description: "Implement and compare CNN-based transfer and deep learning models to determine the optimal classifier."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Comprehensive Metrics",
      description: "Assess models using accuracy, precision, recall, F1-score, and AUC-ROC curves for the most effective architecture."
    },
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: "User-Friendly Interface",
      description: "Create an intuitive system for uploading X-ray images and receiving instant KOA severity classification results."
    }
  ];

  return (
    <motion.div 
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl animated-gradient-border"
        variants={item}
      >
        <div className="bg-card p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-left">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="highlight-text">Knee Osteoarthritis</span>
              <span className="block mt-2">Classification System</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Advanced AI-powered diagnostic tool for accurate knee osteoarthritis severity classification using deep learning.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/analysis">
                  Try Analysis
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/architecture">
                  View Architecture
                </Link>
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="mt-8 md:mt-0 md:w-1/2 flex justify-center"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6,
              ease: "easeInOut" 
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1576671414121-aa0c81c869a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Knee X-ray" 
              className="rounded-lg shadow-2xl max-w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* What is KOA Section */}
      <motion.div variants={item}>
        <Card className="bg-card border-border shadow-lg overflow-hidden card-glow">
          <CardHeader className="bg-gradient-to-r from-secondary/50 to-accent/20">
            <CardTitle className="text-2xl text-primary">What is Knee Osteoarthritis?</CardTitle>
          </CardHeader>
          <CardContent className="text-lg space-y-4 p-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Knee osteoarthritis (KOA) is a degenerative joint disease characterized by the 
              breakdown of cartilage in the knee joint. This progressive condition affects 
              millions of people worldwide, particularly older adults.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-6"
            >
              <h3 className="font-semibold text-primary text-xl mb-3">Common Causes:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Aging (wear and tear over time)",
                  "Obesity (increased pressure on joints)",
                  "Previous joint injuries or surgery",
                  "Genetic predisposition",
                  "Repetitive stress on the knees",
                  "Joint malformation issues"
                ].map((cause, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center p-3 rounded-lg bg-secondary/20"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                    <span>{cause}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Treatment Approaches */}
      <motion.div variants={item}>
        <Card className="bg-card border-border shadow-lg overflow-hidden card-glow">
          <CardHeader className="bg-gradient-to-r from-accent/20 to-secondary/50">
            <CardTitle className="text-2xl text-primary">Treatment Approaches</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3 className="font-semibold text-primary text-xl flex items-center">
                  <div className="w-2 h-8 bg-primary mr-3 rounded-full"></div>
                  Non-Surgical Treatments
                </h3>
                <ul className="space-y-3 pl-6">
                  {[
                    "Physical therapy and structured exercise programs",
                    "Weight management to reduce stress on knee joints",
                    "Medications (anti-inflammatory drugs, pain relievers)",
                    "Corticosteroid injections for inflammation reduction",
                    "Supportive devices (braces, orthotics)"
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="list-disc"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3 className="font-semibold text-primary text-xl flex items-center">
                  <div className="w-2 h-8 bg-primary mr-3 rounded-full"></div>
                  Surgical Options
                </h3>
                <ul className="space-y-3 pl-6">
                  {[
                    "Arthroscopy for minor repairs",
                    "Osteotomy to realign bones",
                    "Partial knee replacement",
                    "Total knee replacement for severe cases",
                    "Cartilage grafting procedures"
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="list-disc"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Objectives */}
      <motion.div variants={item}>
        <h2 className="text-3xl font-bold text-center mb-8">
          <span className="highlight-text">Project Objectives</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-accent/20 transition-all duration-300"
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg float-animation">
                  {objective.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{objective.title}</h3>
                  <p className="text-muted-foreground">{objective.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.7 }}
        >
          <Link to="/architecture">
            <Button size="lg" variant="outline" className="group">
              Explore Our Architecture
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
