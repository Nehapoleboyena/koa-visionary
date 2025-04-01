
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, XCircle, FileType, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

const Analysis = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { toast } = useToast();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideIn = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      } 
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image
      if (!selectedFile.type.match(/image.*/)) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPEG, PNG)",
          variant: "destructive",
        });
        return;
      }
      
      // Check if file is too large (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const analyzeImage = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    toast({
      title: "Analysis started",
      description: "Processing your X-ray image...",
    });
    
    try {
      // Create FormData object to send the image
      const formData = new FormData();
      formData.append('image', image);

      // Make request to Flask backend
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      
      // Launch confetti animation on successful analysis
      launchConfetti();
      
      toast({
        title: "Analysis complete",
        description: "Your results are ready",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      // Fallback to mock result for demo purposes
      const mockResult = {
        prediction: "Grade 3 - Moderate",
        confidence: 0.84,
        probabilities: {
          "Grade 0 (Normal)": 0.12,
          "Grade 3 (Moderate)": 0.84,
          "Grade 4 (Severe)": 0.04
        },
        heatmapUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
      };
      setResult(mockResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          <span className="highlight-text text-5xl">Knee X-ray Analysis</span>
        </h1>
        <motion.p 
          className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Upload your knee X-ray image and our AI will classify the severity of osteoarthritis
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            variants={popIn}
            transition={{ delay: 0.2 }}
            className="animated-gradient-border"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-none h-full shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Upload size={24} className="mr-2" />
                  Upload X-ray Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-64 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors p-4 relative overflow-hidden group"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="X-ray preview"
                          className="w-full h-full object-contain"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearImage();
                          }}
                          className="absolute top-2 right-2 bg-card rounded-full p-1 hover:bg-destructive transition-colors"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl animate-pulse" />
                          <Upload size={48} className="text-primary mb-2 relative" />
                        </motion.div>
                        <motion.p 
                          className="text-muted-foreground text-center relative z-10"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          Click to upload or drag and drop<br />
                          X-ray image (JPEG, PNG)
                        </motion.p>
                      </>
                    )}
                  </motion.div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  <motion.div 
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={analyzeImage}
                      disabled={!image || isAnalyzing}
                      className="w-full bg-primary hover:bg-primary/80 transition-all duration-300 group"
                    >
                      {isAnalyzing ? (
                        <>
                          <span className="mr-2">Analyzing</span>
                          <span className="inline-block animate-bounce">.</span>
                          <span className="inline-block animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                          <span className="inline-block animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                        </>
                      ) : (
                        <>
                          Analyze X-ray
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            variants={slideIn}
            transition={{ delay: 0.4 }}
            className="animated-gradient-border"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-none h-full shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <FileType size={24} className="mr-2" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div 
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <motion.div 
                        className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <p className="text-lg mb-1">Diagnosis:</p>
                        <motion.p 
                          className="text-2xl font-bold text-primary"
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15,
                            delay: 0.3
                          }}
                        >
                          {result.prediction}
                        </motion.p>
                        <motion.p 
                          className="text-sm text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          Confidence: {(result.confidence * 100).toFixed(1)}%
                        </motion.p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <p className="text-lg mb-2">Classification Probabilities:</p>
                        {Object.entries(result.probabilities).map(([grade, probability], index) => (
                          <motion.div 
                            key={grade} 
                            className="mb-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                          >
                            <div className="flex justify-between mb-1">
                              <span>{grade}</span>
                              <span>{(probability as number * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-secondary/30 rounded-full h-3 overflow-hidden">
                              <motion.div
                                className="h-3 rounded-full bg-gradient-to-r from-primary/80 to-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${(probability as number) * 100}%` }}
                                transition={{ delay: 0.6 + (index * 0.1), duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p className="text-lg mb-2">Heatmap Visualization:</p>
                        <motion.div 
                          className="bg-secondary/30 p-3 rounded-lg overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.img
                            src={result.heatmapUrl}
                            alt="Analysis Heatmap"
                            className="w-full h-auto rounded shadow-md"
                            initial={{ filter: 'blur(10px)' }}
                            animate={{ filter: 'blur(0px)' }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                          />
                        </motion.div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Colored regions indicate areas of interest in classification
                        </p>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="placeholder"
                      className="h-64 flex flex-col items-center justify-center text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {isAnalyzing ? (
                        <div className="text-center">
                          <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                              <span className="text-xs text-primary font-bold animate-pulse">AI</span>
                            </div>
                          </div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            Processing your image...
                          </motion.p>
                        </div>
                      ) : (
                        <motion.div 
                          className="text-center"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <div className="bg-secondary/30 p-6 rounded-xl">
                            <FileType size={40} className="mx-auto mb-2 text-muted-foreground/60" />
                            <p>Upload and analyze an X-ray image<br />to see results</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analysis;
