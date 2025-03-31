
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const Analysis = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { toast } = useToast();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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

  const analyzeImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    toast({
      title: "Analysis started",
      description: "Processing your X-ray image...",
    });
    
    // Simulate API call to backend with Flask (would be replaced with actual fetch)
    setTimeout(() => {
      // Mock result
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
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Your results are ready",
      });
    }, 3000);
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
          Knee X-ray Analysis
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Upload X-ray Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div 
                  className="w-full h-64 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors p-4"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="X-ray preview"
                        className="w-full h-full object-contain"
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
                      <Upload size={48} className="text-muted-foreground mb-2" />
                      <p className="text-muted-foreground text-center">
                        Click to upload or drag and drop<br />
                        X-ray image (JPEG, PNG)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />
                
                <Button 
                  onClick={analyzeImage}
                  disabled={!image || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze X-ray"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-lg mb-1">Diagnosis:</p>
                    <p className="text-2xl font-bold text-primary">{result.prediction}</p>
                    <p className="text-sm text-muted-foreground">
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-lg mb-2">Classification Probabilities:</p>
                    {Object.entries(result.probabilities).map(([grade, probability]) => (
                      <div key={grade} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span>{grade}</span>
                          <span>{(probability as number * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${(probability as number) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <p className="text-lg mb-2">Heatmap Visualization:</p>
                    <div className="bg-secondary p-2 rounded-lg">
                      <img
                        src={result.heatmapUrl}
                        alt="Analysis Heatmap"
                        className="w-full h-auto rounded"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Colored regions indicate areas of interest in classification
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                  {isAnalyzing ? (
                    <div className="text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent mb-4"></div>
                      <p>Processing your image...</p>
                    </div>
                  ) : (
                    <p>Upload and analyze an X-ray to see results</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Analysis;
