import { User, PredictionInput, PredictionResult, ModelInfo } from '@/types';

const API_BASE = '/api';

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
            role: 'patient',
            createdAt: new Date().toISOString(),
          },
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  register: async (email: string, password: string, name: string): Promise<{ user: User; token: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email,
            name,
            role: 'patient',
            createdAt: new Date().toISOString(),
          },
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },
};

// Prediction APIs
export const predictionAPI = {
  predict: async (input: PredictionInput): Promise<PredictionResult> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const probability = Math.random();
        resolve({
          id: Math.random().toString(36).substring(7),
          userId: '1',
          input,
          prediction: probability > 0.5 ? 1 : 0,
          probability,
          riskLevel: probability > 0.7 ? 'high' : probability > 0.4 ? 'moderate' : 'low',
          shapValues: [
            { feature: 'Glucose', value: input.glucose, impact: 0.25 },
            { feature: 'BMI', value: input.bmi, impact: 0.18 },
            { feature: 'Age', value: input.age, impact: 0.15 },
            { feature: 'Diabetes Pedigree', value: input.diabetesPedigreeFunction, impact: 0.12 },
            { feature: 'Pregnancies', value: input.pregnancies, impact: 0.10 },
          ],
          modelUsed: 'Ensemble-XGBoost-v2.1',
          createdAt: new Date().toISOString(),
          explanation: probability > 0.5 
            ? 'Based on your health metrics, there is an elevated risk of diabetes. Key contributing factors include glucose levels and BMI.'
            : 'Your health metrics indicate a low risk of diabetes. Continue maintaining healthy lifestyle habits.',
        });
      }, 2000);
    });
  },

  getHistory: async (userId: string): Promise<PredictionResult[]> => {
    return Promise.resolve([]);
  },

  getById: async (id: string): Promise<PredictionResult | null> => {
    return Promise.resolve(null);
  },
};

// Model APIs
export const modelAPI = {
  getStatus: async (): Promise<ModelInfo[]> => {
    return Promise.resolve([
      {
        name: 'Ensemble-XGBoost',
        version: 'v2.1',
        accuracy: 0.876,
        precision: 0.823,
        recall: 0.791,
        f1Score: 0.807,
        rocAuc: 0.912,
        lastTrained: '2024-01-15T10:30:00Z',
        status: 'active',
      },
      {
        name: 'Random Forest',
        version: 'v1.8',
        accuracy: 0.854,
        precision: 0.801,
        recall: 0.778,
        f1Score: 0.789,
        rocAuc: 0.891,
        lastTrained: '2024-01-10T14:20:00Z',
        status: 'active',
      },
    ]);
  },
};
