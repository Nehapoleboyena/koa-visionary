
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          Knee Osteoarthritis Classification System
        </h1>
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">What is Knee Osteoarthritis?</CardTitle>
          </CardHeader>
          <CardContent className="text-lg space-y-4">
            <p>
              Knee osteoarthritis (KOA) is a degenerative joint disease characterized by the 
              breakdown of cartilage in the knee joint. This progressive condition affects 
              millions of people worldwide, particularly older adults.
            </p>
            <p>
              <span className="font-semibold text-primary">Common Causes:</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aging (wear and tear over time)</li>
              <li>Obesity (increased pressure on knee joints)</li>
              <li>Previous joint injuries or surgery</li>
              <li>Genetic predisposition</li>
              <li>Repetitive stress on the knees</li>
              <li>Joint malformation or alignment issues</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Treatment Approaches</CardTitle>
          </CardHeader>
          <CardContent className="text-lg space-y-4">
            <p>
              <span className="font-semibold text-primary">Non-Surgical Treatments:</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Physical therapy and structured exercise programs</li>
              <li>Weight management to reduce stress on knee joints</li>
              <li>Medications (anti-inflammatory drugs, pain relievers)</li>
              <li>Corticosteroid injections for inflammation reduction</li>
              <li>Supportive devices (braces, orthotics)</li>
            </ul>
            
            <p className="mt-4">
              <span className="font-semibold text-primary">Surgical Options:</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Arthroscopy for minor repairs</li>
              <li>Osteotomy to realign bones</li>
              <li>Partial or total knee replacement for severe cases</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Project Objectives</CardTitle>
          </CardHeader>
          <CardContent className="text-lg">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                Build a deep learning-based system to classify knee osteoarthritis (KOA) 
                severity from X-ray images into three categories: Grade 0 (Normal), 
                Grade 3 (Moderate), and Grade 4 (Severe).
              </li>
              <li>
                Implement and evaluate CNN-based transfer and deep learning models to 
                determine the best-performing classifier.
              </li>
              <li>
                Implement data augmentation techniques to handle dataset imbalance, 
                ensuring fair model performance across the three classes.
              </li>
              <li>
                Assess models using key metrics such as accuracy, precision, recall, 
                F1-score, and AUC-ROC curves selecting the most effective architecture.
              </li>
              <li>
                Create a system where users can upload X-ray images and receive KOA 
                severity classification results.
              </li>
            </ol>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;
