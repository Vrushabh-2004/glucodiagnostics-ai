import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Shield, 
  Zap, 
  Activity, 
  BarChart3, 
  Users,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-card/50 backdrop-blur px-4 py-2 text-sm font-medium shadow-lg">
              <Zap className="mr-2 h-4 w-4 text-warning" />
              <span>87.6% Accuracy with Ensemble ML Models</span>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary-foreground lg:text-6xl">
              AI-Powered Diabetes Prediction
            </h1>
            
            <p className="mb-8 text-xl text-primary-foreground/90">
              Advanced machine learning with explainable AI to predict diabetes risk.
              Get instant results with feature-level insights powered by SHAP analysis.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 shadow-xl hover:shadow-glow transition-all">
                  Get Started Free
                  <Activity className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-card/50 backdrop-blur">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { label: 'Accuracy', value: '87.6%', icon: CheckCircle },
              { label: 'Predictions Made', value: '10,000+', icon: TrendingUp },
              { label: 'Active Users', value: '500+', icon: Users },
              { label: 'ML Models', value: '5', icon: Brain },
            ].map((stat) => (
              <Card key={stat.label} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    </div>
                    <stat.icon className="h-10 w-10 text-primary/30" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-lg text-muted-foreground">
              Built with state-of-the-art machine learning models and explainable AI
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Ensemble ML Models</CardTitle>
                <CardDescription>
                  Combines XGBoost, Random Forest, SVM, and Neural Networks for superior accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Hyperparameter tuned
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Cross-validated
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    SMOTE balanced
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Explainable AI</CardTitle>
                <CardDescription>
                  SHAP and LIME analysis provide transparent, interpretable predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Feature importance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Impact visualization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Plain English explanations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-info mb-4" />
                <CardTitle>Secure & Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security with role-based access and audit logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Encrypted at rest
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    JWT authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Audit trail
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join hundreds of healthcare professionals using DiabetesAI
            </p>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-card hover:bg-card/90">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
