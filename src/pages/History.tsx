import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { predictionAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Download, Search, FileText, Calendar } from 'lucide-react';
import { PredictionResult } from '@/types';

export default function History() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [filteredPredictions, setFilteredPredictions] = useState<PredictionResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [user]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = predictions.filter(p => 
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.riskLevel.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPredictions(filtered);
    } else {
      setFilteredPredictions(predictions);
    }
  }, [searchTerm, predictions]);

  const loadHistory = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const history = await predictionAPI.getHistory(user.id);
      
      // Mock data if empty
      if (history.length === 0) {
        const mockHistory: PredictionResult[] = [
          {
            id: 'pred-001',
            userId: user.id,
            input: {
              pregnancies: 6,
              glucose: 148,
              bloodPressure: 72,
              skinThickness: 35,
              insulin: 0,
              bmi: 33.6,
              diabetesPedigreeFunction: 0.627,
              age: 50,
            },
            prediction: 1,
            probability: 0.74,
            riskLevel: 'high',
            shapValues: [],
            modelUsed: 'Ensemble-XGBoost-v2.1',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            explanation: 'High risk detected',
          },
          {
            id: 'pred-002',
            userId: user.id,
            input: {
              pregnancies: 2,
              glucose: 110,
              bloodPressure: 68,
              skinThickness: 22,
              insulin: 94,
              bmi: 24.5,
              diabetesPedigreeFunction: 0.312,
              age: 28,
            },
            prediction: 0,
            probability: 0.23,
            riskLevel: 'low',
            shapValues: [],
            modelUsed: 'Ensemble-XGBoost-v2.1',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            explanation: 'Low risk detected',
          },
          {
            id: 'pred-003',
            userId: user.id,
            input: {
              pregnancies: 4,
              glucose: 135,
              bloodPressure: 78,
              skinThickness: 28,
              insulin: 105,
              bmi: 29.2,
              diabetesPedigreeFunction: 0.485,
              age: 42,
            },
            prediction: 0,
            probability: 0.52,
            riskLevel: 'moderate',
            shapValues: [],
            modelUsed: 'Ensemble-XGBoost-v2.1',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            explanation: 'Moderate risk detected',
          },
        ];
        setPredictions(mockHistory);
        setFilteredPredictions(mockHistory);
      } else {
        setPredictions(history);
        setFilteredPredictions(history);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Risk Level', 'Probability', 'Glucose', 'BMI', 'Age'];
    const rows = filteredPredictions.map(p => [
      p.id,
      new Date(p.createdAt).toLocaleDateString(),
      p.riskLevel,
      (p.probability * 100).toFixed(1) + '%',
      p.input.glucose,
      p.input.bmi,
      p.input.age,
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prediction-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'moderate': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Prediction History</h1>
          <p className="text-muted-foreground">
            Review all past diabetes risk assessments
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Past Predictions</CardTitle>
                <CardDescription>
                  {filteredPredictions.length} prediction{filteredPredictions.length !== 1 ? 's' : ''} found
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportToCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button onClick={() => navigate('/predict')}>
                  <FileText className="mr-2 h-4 w-4" />
                  New Prediction
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or risk level..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {filteredPredictions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No predictions found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search' : 'Get started by creating your first prediction'}
                </p>
                {!searchTerm && (
                  <Button onClick={() => navigate('/predict')}>
                    Create Prediction
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date
                        </div>
                      </TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Key Metrics</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPredictions.map((prediction) => (
                      <TableRow key={prediction.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">{prediction.id}</TableCell>
                        <TableCell>
                          {new Date(prediction.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRiskBadgeVariant(prediction.riskLevel)}>
                            {prediction.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {(prediction.probability * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          Glucose: {prediction.input.glucose} | BMI: {prediction.input.bmi.toFixed(1)} | Age: {prediction.input.age}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              sessionStorage.setItem('latestPrediction', JSON.stringify(prediction));
                              navigate('/results');
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
