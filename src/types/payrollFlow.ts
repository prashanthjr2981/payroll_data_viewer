export type PayrollStage =
  | 'INITIALIZATION'
  | 'HRA'
  | 'PROF_TAX'
  | 'PROVIDENT_FUND'
  | 'INCOME_TAX'
  | 'COMPLETED';

export type StageStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface PayrollFlowStage {
  stage: PayrollStage;
  status: StageStatus;
  error?: string;
  timestamp?: string;
}

export interface PayrollFlow {
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  currentStage?: PayrollStage;
  stages: PayrollFlowStage[];
  failedAt?: PayrollStage;
  errorMessage?: string;
}

export const PAYROLL_STAGES: { stage: PayrollStage; label: string; description: string }[] = [
  { stage: 'INITIALIZATION', label: 'Initialization', description: 'Setting up payroll parameters' },
  { stage: 'HRA', label: 'HRA Calculation', description: 'House Rent Allowance computation' },
  { stage: 'PROF_TAX', label: 'Professional Tax', description: 'Professional tax deduction' },
  { stage: 'PROVIDENT_FUND', label: 'Provident Fund', description: 'PF contribution calculation' },
  { stage: 'INCOME_TAX', label: 'Income Tax', description: 'TDS calculation and deduction' },
  { stage: 'COMPLETED', label: 'Completed', description: 'Payroll processing finished' }
];
