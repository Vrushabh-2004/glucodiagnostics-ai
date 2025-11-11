import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { predictionAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { HelpCircle, Loader2, Activity } from 'lucide-react';
import { PredictionInput } from '@/types';

const fieldInfo = {
  pregnancies: 'Number of times pregnant (0-17)',
  glucose: 'Plasma glucose concentration (0-200 mg/dL)',
  bloodPressure: 'Diastolic blood pressure (0-122 mm Hg)',
  skinThickness: 'Triceps skin fold thickness (0-99 mm)',
  insulin: '2-Hour serum insulin (0-846 mu U/ml)',
  bmi: 'Body mass index (0-67.1 kg/m²)',
  diabetesPedigreeFunction: 'Diabetes pedigree function (0.078-2.42)',
  age: 'Age in years (21-81)',
};

export default function Predict() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PredictionInput>({
    pregnancies: 0,
    glucose: 120,
    bloodPressure: 80,
    skinThickness: 20,
    insulin: 80,
    bmi: 25,
    diabetesPedigreeFunction: 0.5,
    age: 30,
  });

  const handleChange = (field: keyof PredictionInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const validateInputs = (): boolean => {
    const validations = [
      { field: 'pregnancies', min: 0, max: 17 },
      { field: 'glucose', min: 0, max: 200 },
      { field: 'bloodPressure', min: 0, max: 122 },
      { field: 'skinThickness', min: 0, max: 99 },
      { field: 'insulin', min: 0, max: 846 },
      { field: 'bmi', min: 0, max: 67.1 },
      { field: 'diabetesPedigreeFunction', min: 0.078, max: 2.42 },
      { field: 'age', min: 21, max: 81 },
    ];

    for (const { field, min, max } of validations) {
      const value = formData[field as keyof PredictionInput];
      if (value < min || value > max) {
        toast({
          title: 'Validation Error',
          description: `${field} must be between ${min} and ${max}`,
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const result = await predictionAPI.predict(formData);
      
      // Store result in sessionStorage for the results page
      sessionStorage.setItem('latestPrediction', JSON.stringify(result));
      
      toast({
        title: 'Prediction Complete',
        description: 'Analysis generated successfully',
      });
      
      navigate('/results');
    } catch (error) {
      toast({
        title: 'Prediction Failed',
        description: 'An error occurred while processing your request',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Diabetes Risk Prediction</h1>
            <p className="text-muted-foreground">
              Enter patient health metrics to generate a diabetes risk assessment
            </p>
          </div>

          <Alert className="mb-6">
            <Activity className="h-4 w-4" />
            <AlertDescription>
              All fields are required. Hover over the help icon for acceptable ranges and descriptions.
            </AlertDescription>
          </Alert>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Patient Health Metrics</CardTitle>
              <CardDescription>
                Provide accurate measurements for the most reliable prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <TooltipProvider>
                    {Object.entries(fieldInfo).map(([field, info]) => (
                      <div key={field} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={field} className="capitalize">
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{info}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id={field}
                          type="number"
                          step="any"
                          value={formData[field as keyof PredictionInput]}
                          onChange={(e) => handleChange(field as keyof PredictionInput, e.target.value)}
                          required
                          className="transition-all focus:scale-[1.02]"
                        />
                      </div>
                    ))}
                  </TooltipProvider>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Generate Prediction'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
