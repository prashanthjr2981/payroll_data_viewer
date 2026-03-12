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

export const PAYROLL_STAGES: {
  stage: PayrollStage;
  label: string;
  description: string;
  tables: string[];
  tableDetails: string;
}[] = [
  {
    stage: 'INITIALIZATION',
    label: 'Initialization',
    description: 'Setting up payroll parameters and fetching employee master data',
    tables: ['EMPR', 'MONR'],
    tableDetails: 'Reads from Employee Master (EMPR) for basic details and Monthly Payroll (MONR) for salary structure'
  },
  {
    stage: 'HRA',
    label: 'HRA Calculation',
    description: 'House Rent Allowance computation based on city classification',
    tables: ['MONR'],
    tableDetails: 'Updates Monthly Payroll (MONR) with calculated HRA amount based on metro/non-metro classification'
  },
  {
    stage: 'PROF_TAX',
    label: 'Professional Tax',
    description: 'Professional tax deduction based on state rules',
    tables: ['PROF', 'DEDR'],
    tableDetails: 'Reads from Professional Tax Master (PROF) and updates Deductions (DEDR) with PT amount'
  },
  {
    stage: 'PROVIDENT_FUND',
    label: 'Provident Fund',
    description: 'PF contribution calculation (employee and employer)',
    tables: ['PFDR', 'DEDR'],
    tableDetails: 'Updates Provident Fund (PFDR) with contributions and Deductions (DEDR) with employee PF deduction'
  },
  {
    stage: 'INCOME_TAX',
    label: 'Income Tax',
    description: 'TDS calculation and deduction based on tax regime',
    tables: ['TAXR', 'DEDR', 'YTDR'],
    tableDetails: 'Reads/updates Income Tax (TAXR), Deductions (DEDR) for TDS, and Year-to-Date (YTDR) for cumulative tax'
  },
  {
    stage: 'COMPLETED',
    label: 'Completed',
    description: 'Payroll processing finished and net payment calculated',
    tables: ['NETP', 'YTDR'],
    tableDetails: 'Writes final Net Payment (NETP) and updates Year-to-Date accumulations (YTDR)'
  }
];
