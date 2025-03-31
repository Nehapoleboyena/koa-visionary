import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const teamMembers = [
    {
      name: "Darshana",
      role: "Data Scientist & ML Engineer",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80",
      bio: "Specializes in machine learning algorithms and deep learning architectures for medical imaging analysis.",
    },
    {
      name: "Varshini",
      role: "Frontend Developer & UX Designer",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300&q=80",
      bio: "Expert in creating intuitive and accessible user interfaces for healthcare applications.",
    },
    {
      name: "Neha",
      role: "Research Lead & Biomedical Engineer",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=300&q=80",
      bio: "Bridges the gap between clinical requirements and technological solutions in healthcare AI.",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          About Our Team
        </h1>
        
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          We are a dedicated team of researchers and engineers working to improve 
          knee osteoarthritis diagnosis through advanced deep learning techniques.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="bg-card border-border hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={`${member.name}`}
                      className="w-full h-64 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                        <p className="text-primary-foreground/80">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <p>{member.bio}</p>
                    
                    <div className="flex space-x-4 pt-2">
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github size={20} />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto">
            To develop accessible, accurate, and efficient AI-powered diagnostic tools 
            that assist healthcare professionals in early detection and proper 
            management of knee osteoarthritis, ultimately improving patient outcomes 
            and quality of life.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
