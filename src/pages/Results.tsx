import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, CheckCircle2, Download, ArrowLeft, TrendingUp, Activity } from 'lucide-react';
import { PredictionResult } from '@/types';

export default function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('latestPrediction');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate('/predict');
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const riskColor = {
    low: 'text-green-500',
    moderate: 'text-yellow-500',
    high: 'text-red-500',
  }[result.riskLevel];

  const riskBgColor = {
    low: 'bg-green-500/10 border-green-500',
    moderate: 'bg-yellow-500/10 border-yellow-500',
    high: 'bg-red-500/10 border-red-500',
  }[result.riskLevel];

  const shapData = result.shapValues.map(sv => ({
    feature: sv.feature,
    impact: sv.impact,
    value: sv.value,
  }));

  const handleExportPDF = () => {
    // Mock PDF export - in real implementation, use jsPDF or similar
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `diabetes-prediction-${result.id}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Prediction Results</h1>
              <p className="text-muted-foreground">
                Analysis ID: {result.id}
              </p>
            </div>
            <Button onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Risk Assessment Card */}
          <Card className={`glass-card mb-8 border-2 ${riskBgColor}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {result.riskLevel === 'low' ? (
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                  )}
                  <div>
                    <CardTitle className="text-2xl">
                      Risk Level: <span className={riskColor}>{result.riskLevel.toUpperCase()}</span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Model: {result.modelUsed}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{(result.probability * 100).toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Diabetes Risk</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Alert>
                <Activity className="h-4 w-4" />
                <AlertDescription className="text-base">
                  {result.explanation}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* SHAP Feature Importance */}
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Feature Contribution Analysis (SHAP)
              </CardTitle>
              <CardDescription>
                How each health metric contributed to your risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={shapData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="feature" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [value.toFixed(3), 'Impact']}
                  />
                  <Legend />
                  <Bar dataKey="impact" name="Feature Impact" radius={[0, 8, 8, 0]}>
                    {shapData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.impact > 0.15 ? 'hsl(var(--chart-3))' : 'hsl(var(--primary))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6 space-y-2">
                <h4 className="font-semibold">Key Insights:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {shapData.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>
                        <strong>{item.feature}:</strong> Value of {item.value.toFixed(1)} contributed {(item.impact * 100).toFixed(1)}% to the prediction
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Input Summary */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Input Summary</CardTitle>
              <CardDescription>Patient health metrics used for this prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(result.input).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-lg font-semibold">{typeof value === 'number' ? value.toFixed(2) : value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button onClick={() => navigate('/predict')} className="flex-1">
              New Prediction
            </Button>
            <Button variant="outline" onClick={() => navigate('/history')} className="flex-1">
              View History
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
