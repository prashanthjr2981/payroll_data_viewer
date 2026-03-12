export interface Employee {
  employee_id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
}

export interface PayrollMonthlyData {
  basic_salary: number;
  hra: number;
  special_allowance: number;
  other_allowances: number;
  gross_earnings: number;
}

export interface PayrollYTDData {
  year: number;
  ytd_gross: number;
  ytd_deductions: number;
  ytd_net: number;
  ytd_tax: number;
}

export interface ProfessionalTax {
  pt_amount: number;
  pt_state: string;
}

export interface ProvidentFund {
  employee_contribution: number;
  employer_contribution: number;
  pf_account_number: string;
}

export interface IncomeTax {
  tds_amount: number;
  taxable_income: number;
  tax_regime: string;
}

export interface Deductions {
  pf_deduction: number;
  pt_deduction: number;
  tds_deduction: number;
  loan_deduction: number;
  other_deductions: number;
  total_deductions: number;
}

export interface CompensationDetails {
  ctc: number;
  fixed_component: number;
  variable_component: number;
  bonus: number;
}

export interface NetPayment {
  gross_amount: number;
  total_deductions: number;
  net_amount: number;
  payment_date: string;
  payment_status: string;
}

export interface PayrollFlowData {
  status: string;
  currentStage?: string;
  failedAt?: string;
  errorMessage?: string;
  stages: any[];
}

export interface PayrollData {
  employee: Employee;
  monthly: PayrollMonthlyData;
  ytd: PayrollYTDData;
  professionalTax: ProfessionalTax;
  providentFund: ProvidentFund;
  incomeTax: IncomeTax;
  deductions: Deductions;
  compensation: CompensationDetails;
  netPayment: NetPayment;
  flow?: PayrollFlowData;
}
