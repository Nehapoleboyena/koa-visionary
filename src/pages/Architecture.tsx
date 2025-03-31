
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Architecture = () => {
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
          System Architecture
        </h1>
        
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              Knee Osteoarthritis Classification Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl p-4 bg-secondary rounded-lg shadow-inner relative overflow-hidden">
              {/* SVG Diagram */}
              <svg
                width="100%"
                height="500"
                viewBox="0 0 800 500"
                className="mx-auto my-4"
              >
                {/* Input Layer */}
                <g>
                  <rect x="50" y="200" width="100" height="100" rx="10" fill="#164e63" />
                  <text x="100" y="250" textAnchor="middle" fill="white" fontSize="14">Input X-ray</text>
                </g>
                
                {/* Arrow */}
                <path d="M 160 250 L 200 250" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowhead)" />
                
                {/* Preprocessing */}
                <g>
                  <rect x="210" y="200" width="120" height="100" rx="10" fill="#164e63" />
                  <text x="270" y="250" textAnchor="middle" fill="white" fontSize="14">Preprocessing</text>
                </g>
                
                {/* Arrow */}
                <path d="M 340 250 L 380 250" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowhead)" />
                
                {/* CNN Model */}
                <g>
                  <rect x="390" y="180" width="150" height="140" rx="10" fill="#164e63" />
                  <text x="465" y="220" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">CNN Model</text>
                  <line x1="400" y1="235" x2="530" y2="235" stroke="white" strokeWidth="1" />
                  <text x="465" y="260" textAnchor="middle" fill="white" fontSize="12">Transfer Learning</text>
                  <text x="465" y="280" textAnchor="middle" fill="white" fontSize="12">Data Augmentation</text>
                  <text x="465" y="300" textAnchor="middle" fill="white" fontSize="12">Feature Extraction</text>
                </g>
                
                {/* Arrow */}
                <path d="M 550 250 L 590 250" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowhead)" />
                
                {/* Classification */}
                <g>
                  <rect x="600" y="200" width="120" height="100" rx="10" fill="#164e63" />
                  <text x="660" y="235" textAnchor="middle" fill="white" fontSize="14">Classification</text>
                  <text x="660" y="255" textAnchor="middle" fill="white" fontSize="12">Grade 0 (Normal)</text>
                  <text x="660" y="275" textAnchor="middle" fill="white" fontSize="12">Grade 3 (Moderate)</text>
                  <text x="660" y="295" textAnchor="middle" fill="white" fontSize="12">Grade 4 (Severe)</text>
                </g>
                
                {/* Arrow definitions */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
                  </marker>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              Technical Components
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">Data Processing Pipeline</h3>
              <p>
                Our system preprocesses X-ray images through normalization, resizing, and 
                enhancement techniques to optimize them for analysis. Data augmentation 
                techniques including rotation, scaling, and flipping address class imbalance 
                and improve model generalization.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">Model Architecture</h3>
              <p>
                We employ a CNN-based deep learning model with transfer learning from 
                established architectures (ResNet, DenseNet, EfficientNet). These pre-trained 
                models are fine-tuned for the specific task of knee X-ray classification, 
                extracting critical features indicative of osteoarthritis progression.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">Classification System</h3>
              <p>
                The model outputs classification probabilities across three severity classes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><span className="font-medium">Grade 0 (Normal)</span>: No apparent degenerative changes</li>
                <li><span className="font-medium">Grade 3 (Moderate)</span>: Moderate joint space narrowing and osteophyte formation</li>
                <li><span className="font-medium">Grade 4 (Severe)</span>: Severe structural changes, significant joint space reduction</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-accent mb-2">User Interface</h3>
              <p>
                A web-based interface allows healthcare professionals to upload knee X-ray images and 
                receive instant classification results, accompanied by heatmaps highlighting 
                regions of interest contributing to the diagnosis.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Architecture;
