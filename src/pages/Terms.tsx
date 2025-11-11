import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
              <FileText className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">Terms of Use</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By accessing and using DiabetesAI, you accept and agree to be bound by the terms and provision of this agreement.
                  If you do not agree to these Terms of Use, please do not use our platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold text-warning">Important Notice</p>
                <p>
                  DiabetesAI is a predictive tool designed to assist in identifying diabetes risk. It is NOT a substitute
                  for professional medical advice, diagnosis, or treatment. All predictions and recommendations should be
                  reviewed by qualified healthcare professionals.
                </p>
                <p className="text-sm text-muted-foreground">
                  Always seek the advice of your physician or other qualified health provider with any questions you may have
                  regarding a medical condition. Never disregard professional medical advice or delay in seeking it because
                  of something you have learned from this platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information.
                  Failure to do so constitutes a breach of the Terms.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Account Security</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>• You must notify us immediately of any unauthorized access to your account</li>
                    <li>• You are responsible for all activities that occur under your account</li>
                    <li>• We reserve the right to suspend or terminate accounts that violate these terms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acceptable Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You agree NOT to:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use the platform for any illegal or unauthorized purpose</li>
                  <li>• Violate any laws in your jurisdiction</li>
                  <li>• Infringe upon or violate our intellectual property rights</li>
                  <li>• Submit false or misleading information</li>
                  <li>• Attempt to gain unauthorized access to the platform or related systems</li>
                  <li>• Interfere with or disrupt the platform or servers</li>
                  <li>• Transmit any viruses, malware, or other malicious code</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The platform and its original content, features, and functionality are owned by DiabetesAI and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our machine learning models, algorithms, and proprietary technology remain our exclusive property.
                  You may not reverse engineer, decompile, or attempt to extract the source code of our models.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  To the maximum extent permitted by law, DiabetesAI shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.
                </p>
                <p className="text-sm text-muted-foreground">
                  We make no warranties or representations about the accuracy or completeness of the platform's predictions
                  or the reliability of any information obtained through the platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                  provide at least 30 days' notice prior to any new terms taking effect.
                </p>
                <p className="text-sm text-muted-foreground">
                  Your continued use of the platform after changes take effect constitutes acceptance of the revised Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If you have any questions about these Terms, please contact us at legal@diabetesai.com
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
