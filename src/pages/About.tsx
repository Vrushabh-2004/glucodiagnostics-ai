import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, Shield, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">About DiabetesAI</h1>
            <p className="text-xl text-muted-foreground">
              Advanced machine learning system for diabetes risk prediction
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  DiabetesAI is a comprehensive machine learning system designed to predict diabetes risk
                  using the PIMA Indians Diabetes Dataset. Our platform combines multiple state-of-the-art
                  ML algorithms with explainable AI techniques to provide accurate, transparent predictions.
                </p>
                <p>
                  Built with modern web technologies and enterprise-grade security, DiabetesAI serves
                  healthcare professionals, researchers, and patients seeking to understand diabetes risk factors.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Brain className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>ML Architecture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Logistic Regression</span>
                    <Badge variant="outline">Baseline</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Random Forest</span>
                    <Badge variant="outline">85.4%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">XGBoost</span>
                    <Badge variant="outline">86.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ensemble Model</span>
                    <Badge className="bg-primary">87.6%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Neural Network</span>
                    <Badge variant="outline">84.9%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Database className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Dataset Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Source</span>
                    <span className="font-medium">PIMA Indians</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Samples</span>
                    <span className="font-medium">768</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Features</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Positive Cases</span>
                    <span className="font-medium">268 (34.9%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Preprocessing</span>
                    <Badge variant="outline">SMOTE</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex gap-3">
                    <Zap className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Explainable AI</h4>
                      <p className="text-sm text-muted-foreground">
                        SHAP and LIME analysis provide transparent feature importance and prediction explanations
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Secure & Compliant</h4>
                      <p className="text-sm text-muted-foreground">
                        JWT authentication, role-based access, and encrypted data storage
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Brain className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Ensemble Learning</h4>
                      <p className="text-sm text-muted-foreground">
                        Weighted voting combines multiple models for superior accuracy
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Database className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Data Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced preprocessing with outlier handling, scaling, and SMOTE balancing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Ensemble Model (XGBoost + Random Forest)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                    <p className="text-2xl font-bold text-primary">87.6%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Precision</p>
                    <p className="text-2xl font-bold">82.3%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Recall</p>
                    <p className="text-2xl font-bold">79.1%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">ROC-AUC</p>
                    <p className="text-2xl font-bold">91.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Core Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Patient Privacy First</h4>
                    <p className="text-sm text-muted-foreground">
                      We prioritize data security and patient confidentiality in every aspect of our system design and implementation.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                      <Zap className="h-8 w-8 text-secondary" />
                    </div>
                    <h4 className="font-semibold mb-2">Innovation Excellence</h4>
                    <p className="text-sm text-muted-foreground">
                      Committed to advancing healthcare through cutting-edge AI technology and continuous research-driven improvements.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-info/10">
                      <Brain className="h-8 w-8 text-info" />
                    </div>
                    <h4 className="font-semibold mb-2">Transparent AI</h4>
                    <p className="text-sm text-muted-foreground">
                      Every prediction comes with clear explanations, empowering healthcare providers to make informed decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
