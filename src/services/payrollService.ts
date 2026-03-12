import { PayrollData } from '../types/payroll';
import { supabase } from '../lib/supabase';

export const getPayrollData = async (
  employeeId: string,
  payrollPeriod: string
): Promise<PayrollData | null> => {
  const { data: employee, error: employeeError } = await supabase
    .from('employees')
    .select('*')
    .eq('employee_id', employeeId)
    .maybeSingle();

  if (employeeError || !employee) {
    return null;
  }

  const { data: payrollRecord, error: payrollError } = await supabase
    .from('payroll_records')
    .select('*')
    .eq('employee_id', employee.id)
    .eq('payroll_period', payrollPeriod)
    .maybeSingle();

  if (payrollError || !payrollRecord) {
    return null;
  }

  const defaultFlowStages = [
    { stage: 'INITIALIZATION', status: 'completed' },
    { stage: 'HRA', status: 'completed' },
    { stage: 'PROF_TAX', status: 'completed' },
    { stage: 'PROVIDENT_FUND', status: 'completed' },
    { stage: 'INCOME_TAX', status: 'completed' },
    { stage: 'COMPLETED', status: 'completed' }
  ];

  return {
    employee: {
      employee_id: employee.employee_id,
      name: employee.name,
      department: employee.department,
      designation: employee.designation,
      email: employee.email
    },
    monthly: {
      basic_salary: payrollRecord.basic_salary,
      hra: payrollRecord.hra,
      special_allowance: payrollRecord.special_allowance,
      other_allowances: payrollRecord.other_allowances,
      gross_earnings: payrollRecord.gross_earnings
    },
    ytd: {
      year: payrollRecord.year,
      ytd_gross: payrollRecord.ytd_gross,
      ytd_deductions: payrollRecord.ytd_deductions,
      ytd_net: payrollRecord.ytd_net,
      ytd_tax: payrollRecord.ytd_tax
    },
    professionalTax: {
      pt_amount: payrollRecord.pt_amount,
      pt_state: payrollRecord.pt_state
    },
    providentFund: {
      employee_contribution: payrollRecord.employee_contribution,
      employer_contribution: payrollRecord.employer_contribution,
      pf_account_number: payrollRecord.pf_account_number
    },
    incomeTax: {
      tds_amount: payrollRecord.tds_amount,
      taxable_income: payrollRecord.taxable_income,
      tax_regime: payrollRecord.tax_regime
    },
    deductions: {
      pf_deduction: payrollRecord.pf_deduction,
      pt_deduction: payrollRecord.pt_deduction,
      tds_deduction: payrollRecord.tds_deduction,
      loan_deduction: payrollRecord.loan_deduction,
      other_deductions: payrollRecord.other_deductions,
      total_deductions: payrollRecord.total_deductions
    },
    compensation: {
      ctc: payrollRecord.ctc,
      fixed_component: payrollRecord.fixed_component,
      variable_component: payrollRecord.variable_component,
      bonus: payrollRecord.bonus
    },
    netPayment: {
      gross_amount: payrollRecord.gross_amount,
      total_deductions: payrollRecord.total_deductions,
      net_amount: payrollRecord.net_amount,
      payment_date: payrollRecord.payment_date,
      payment_status: payrollRecord.payment_status
    },
    flow: {
      status: payrollRecord.flow_status || 'completed',
      currentStage: payrollRecord.current_stage,
      failedAt: payrollRecord.failed_at_stage,
      errorMessage: payrollRecord.error_message,
      stages: payrollRecord.flow_stages || defaultFlowStages
    }
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};
