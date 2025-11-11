export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface PredictionInput {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

export interface ShapValue {
  feature: string;
  value: number;
  impact: number;
}

export interface PredictionResult {
  id: string;
  userId: string;
  input: PredictionInput;
  prediction: 0 | 1;
  probability: number;
  riskLevel: 'low' | 'moderate' | 'high';
  shapValues: ShapValue[];
  modelUsed: string;
  createdAt: string;
  explanation: string;
}

export interface ModelInfo {
  name: string;
  version: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  lastTrained: string;
  status: 'active' | 'training' | 'inactive';
}
