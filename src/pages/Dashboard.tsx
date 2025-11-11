import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Activity, 
  BarChart3, 
  History, 
  Settings, 
  TrendingUp,
  Users,
  Shield,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Manage your diabetes risk predictions and analytics</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Link to="/predict">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20">
                <CardHeader>
                  <Activity className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">New Prediction</CardTitle>
                  <CardDescription>Get instant diabetes risk assessment</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/history">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <History className="h-8 w-8 text-info mb-2" />
                  <CardTitle className="text-lg">History</CardTitle>
                  <CardDescription>View past predictions</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/analytics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Analytics</CardTitle>
                  <CardDescription>Track trends over time</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {user?.role === 'admin' && (
              <Link to="/admin">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <Shield className="h-8 w-8 text-warning mb-2" />
                    <CardTitle className="text-lg">Admin Panel</CardTitle>
                    <CardDescription>Manage system settings</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Predictions</CardDescription>
                <CardTitle className="text-3xl">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Average Risk Score</CardDescription>
                <CardTitle className="text-3xl">32%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Low risk category</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Model Accuracy</CardDescription>
                <CardTitle className="text-3xl">87.6%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Ensemble XGBoost v2.1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Predictions</CardTitle>
              <CardDescription>Your latest diabetes risk assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: '2024-01-15', risk: 'Low', probability: '23%' },
                  { date: '2024-01-10', risk: 'Moderate', probability: '48%' },
                  { date: '2024-01-05', risk: 'Low', probability: '31%' },
                ].map((prediction, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{prediction.date}</p>
                      <p className="text-sm text-muted-foreground">Risk Level: {prediction.risk}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{prediction.probability}</p>
                      <Link to={`/results/${idx}`}>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
