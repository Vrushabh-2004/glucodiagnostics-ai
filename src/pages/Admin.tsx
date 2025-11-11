import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { modelAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  RefreshCw, 
  Users, 
  Activity, 
  Database, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  Download,
  Upload
} from 'lucide-react';
import { ModelInfo } from '@/types';

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [isRetraining, setIsRetraining] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    setIsLoading(true);
    try {
      const modelData = await modelAPI.getStatus();
      setModels(modelData);
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetrain = async () => {
    setIsRetraining(true);
    try {
      // Mock retrain - in real implementation, call POST /api/models/retrain
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: 'Model Retraining Initiated',
        description: 'The model retraining process has started. You will receive an email notification when complete.',
      });
      
      // Simulate model update
      await loadModels();
    } catch (error) {
      toast({
        title: 'Retrain Failed',
        description: 'An error occurred while initiating model retraining',
        variant: 'destructive',
      });
    } finally {
      setIsRetraining(false);
    }
  };

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

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
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            System management and model administration
          </p>
        </div>

        <Tabs defaultValue="models" className="space-y-6">
          <TabsList>
            <TabsTrigger value="models">
              <Activity className="mr-2 h-4 w-4" />
              Models
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings className="mr-2 h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="flex items-center justify-between">
              <Alert>
                <Database className="h-4 w-4" />
                <AlertDescription>
                  Manage ML models, trigger retraining, and monitor performance metrics
                </AlertDescription>
              </Alert>
              <Button onClick={handleRetrain} disabled={isRetraining}>
                {isRetraining ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Retraining...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retrain Models
                  </>
                )}
              </Button>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Active Models</CardTitle>
                <CardDescription>Current model versions and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model Name</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Accuracy</TableHead>
                        <TableHead>Precision</TableHead>
                        <TableHead>Recall</TableHead>
                        <TableHead>ROC-AUC</TableHead>
                        <TableHead>Last Trained</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {models.map((model) => (
                        <TableRow key={`${model.name}-${model.version}`}>
                          <TableCell className="font-semibold">{model.name}</TableCell>
                          <TableCell className="font-mono text-sm">{model.version}</TableCell>
                          <TableCell>
                            <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                              {model.status === 'active' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                              {model.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{(model.accuracy * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(model.precision * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(model.recall * 100).toFixed(1)}%</TableCell>
                          <TableCell className="font-semibold">{(model.rocAuc * 100).toFixed(1)}%</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(model.lastTrained).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Model Actions */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Dataset
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload new training data for model improvement
                  </p>
                  <Button variant="outline" className="w-full">
                    Select File
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download model artifacts for deployment
                  </p>
                  <Button variant="outline" className="w-full">
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure email alerts for model events
                  </p>
                  <Button variant="outline" className="w-full">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">
                    User management features will be implemented here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Database, API, and system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Database Status</h4>
                      <p className="text-sm text-muted-foreground">PostgreSQL connection active</p>
                    </div>
                    <Badge variant="default">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Connected
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">API Rate Limiting</h4>
                      <p className="text-sm text-muted-foreground">100 requests per minute per user</p>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Model Cache</h4>
                      <p className="text-sm text-muted-foreground">Loaded models cached in memory</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
