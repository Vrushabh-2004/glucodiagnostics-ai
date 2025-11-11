import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function FAQs() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-info/10">
              <HelpCircle className="h-8 w-8 text-info" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about DiabetesAI
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>General Questions</CardTitle>
                <CardDescription>Learn about DiabetesAI and how it works</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is DiabetesAI?</AccordionTrigger>
                    <AccordionContent>
                      DiabetesAI is an advanced machine learning platform designed to predict diabetes risk using the PIMA Indians
                      Diabetes Dataset. It combines multiple state-of-the-art algorithms including XGBoost, Random Forest, and
                      Neural Networks to provide accurate risk predictions with explainable AI insights.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How accurate are the predictions?</AccordionTrigger>
                    <AccordionContent>
                      Our ensemble model achieves 87.6% accuracy, 82.3% precision, and a 91.2% ROC-AUC score on validation data.
                      However, predictions should always be reviewed by qualified healthcare professionals and should not be used
                      as the sole basis for medical decisions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What data do I need to provide?</AccordionTrigger>
                    <AccordionContent>
                      To generate a prediction, you'll need to provide 8 key health indicators: number of pregnancies, glucose level,
                      blood pressure, skin thickness, insulin level, BMI (Body Mass Index), diabetes pedigree function, and age.
                      All fields should contain accurate measurements for the best prediction results.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Is my health data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes. We implement enterprise-grade security measures including data encryption at rest and in transit,
                      JWT-based authentication, role-based access control, and regular security audits. Your health data is
                      stored securely and never shared with third parties without your explicit consent.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Using the Platform</CardTitle>
                <CardDescription>How to get the most out of DiabetesAI</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I get a prediction?</AccordionTrigger>
                    <AccordionContent>
                      After logging in, navigate to the "Get Prediction" page from the dashboard. Fill in the required health
                      indicators with accurate measurements, then click "Predict Risk." The system will analyze your data using
                      our ensemble model and provide a detailed risk assessment with feature importance explanations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>What is SHAP and why is it important?</AccordionTrigger>
                    <AccordionContent>
                      SHAP (SHapley Additive exPlanations) is an explainable AI technique that shows how each health indicator
                      contributes to your risk prediction. This transparency helps you and your healthcare provider understand
                      which factors are most significant in your diabetes risk, enabling more informed health decisions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>Can I view my prediction history?</AccordionTrigger>
                    <AccordionContent>
                      Yes. Navigate to the "History" page to view all your past predictions. You can search, filter, and export
                      your history to CSV or PDF format. This allows you to track changes in your risk profile over time and
                      share reports with your healthcare provider.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>What user roles are available?</AccordionTrigger>
                    <AccordionContent>
                      DiabetesAI supports three user roles: Patient (can create predictions and view their own history),
                      Doctor (can view patient predictions and analytics), and Admin (full system access including model
                      management and user administration).
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Questions</CardTitle>
                <CardDescription>Understanding the technology behind DiabetesAI</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-9">
                    <AccordionTrigger>What machine learning models do you use?</AccordionTrigger>
                    <AccordionContent>
                      We use an ensemble approach combining Logistic Regression (baseline), Random Forest (85.4% accuracy),
                      XGBoost (86.2% accuracy), and Neural Networks (84.9% accuracy). Our ensemble model achieves the highest
                      accuracy at 87.6% by leveraging the strengths of each individual model.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger>What dataset is the model trained on?</AccordionTrigger>
                    <AccordionContent>
                      Our models are trained on the PIMA Indians Diabetes Dataset, which contains 768 samples with 8 features.
                      The dataset has been preprocessed with SMOTE (Synthetic Minority Over-sampling Technique) to handle class
                      imbalance, and includes comprehensive data cleaning and normalization steps.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-11">
                    <AccordionTrigger>How often are the models updated?</AccordionTrigger>
                    <AccordionContent>
                      Our machine learning models are retrained periodically as new data becomes available and validated.
                      Administrators can trigger model retraining from the admin panel. All model versions are tracked and
                      performance metrics are continuously monitored to ensure optimal accuracy.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-12">
                    <AccordionTrigger>Can I integrate DiabetesAI with my healthcare system?</AccordionTrigger>
                    <AccordionContent>
                      Yes. DiabetesAI provides a RESTful API that can be integrated with electronic health record (EHR) systems
                      and other healthcare platforms. Contact our team for API documentation and integration support.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account & Billing</CardTitle>
                <CardDescription>Manage your account and subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-13">
                    <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
                    <AccordionContent>
                      Yes. New users can access basic prediction features for free. Premium features including unlimited
                      predictions, advanced analytics, and PDF report exports are available with a subscription.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-14">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      Click "Forgot Password" on the login page, enter your email address, and you'll receive a password
                      reset link. The link expires after 24 hours for security purposes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-15">
                    <AccordionTrigger>Can I delete my account and data?</AccordionTrigger>
                    <AccordionContent>
                      Yes. You have the right to request deletion of your account and all associated data at any time.
                      Navigate to Account Settings and select "Delete Account," or contact our support team for assistance.
                      This action is permanent and cannot be undone.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
