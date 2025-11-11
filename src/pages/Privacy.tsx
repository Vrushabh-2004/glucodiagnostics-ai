import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  DiabetesAI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our diabetes
                  prediction platform.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
                  please do not access the application.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <p className="text-sm text-muted-foreground">
                    We collect personal information that you voluntarily provide to us when you register on the platform,
                    including name, email address, and account credentials.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Health Data</h4>
                  <p className="text-sm text-muted-foreground">
                    We collect health-related information you provide for diabetes risk prediction, including glucose levels,
                    blood pressure, BMI, and other medical indicators. All health data is encrypted and stored securely.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Usage Data</h4>
                  <p className="text-sm text-muted-foreground">
                    We automatically collect certain information when you use our platform, including IP address, browser type,
                    pages visited, and time spent on the platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• To provide and maintain our diabetes prediction service</li>
                  <li>• To generate accurate risk predictions using machine learning models</li>
                  <li>• To notify you about changes to our service</li>
                  <li>• To provide customer support and respond to your inquiries</li>
                  <li>• To improve our platform and machine learning algorithms</li>
                  <li>• To comply with legal obligations and protect user safety</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We implement industry-standard security measures to protect your personal and health information,
                  including encryption at rest and in transit, secure authentication with JWT tokens, and regular
                  security audits.
                </p>
                <p className="text-sm text-muted-foreground">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we
                  strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Data Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">You have the right to:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate or incomplete data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Export your data in a portable format</li>
                  <li>• Withdraw consent for data processing</li>
                  <li>• Object to automated decision-making</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If you have questions or concerns about this Privacy Policy, please contact us at privacy@diabetesai.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
