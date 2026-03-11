import { PayrollData } from '../types/payroll';

const mockPayrollDatabase: Record<string, Record<string, PayrollData>> = {
  'EMP001': {
    '01 2026': {
      employee: {
        employee_id: 'EMP001',
        name: 'John Doe',
        department: 'Engineering',
        designation: 'Senior Developer',
        email: 'john.doe@company.com'
      },
      monthly: {
        basic_salary: 50000.00,
        hra: 20000.00,
        special_allowance: 15000.00,
        other_allowances: 5000.00,
        gross_earnings: 90000.00
      },
      ytd: {
        year: 2026,
        ytd_gross: 90000.00,
        ytd_deductions: 15000.00,
        ytd_net: 75000.00,
        ytd_tax: 8000.00
      },
      professionalTax: {
        pt_amount: 200.00,
        pt_state: 'Maharashtra'
      },
      providentFund: {
        employee_contribution: 6000.00,
        employer_contribution: 6000.00,
        pf_account_number: 'PF123456789'
      },
      incomeTax: {
        tds_amount: 8000.00,
        taxable_income: 90000.00,
        tax_regime: 'New'
      },
      deductions: {
        pf_deduction: 6000.00,
        pt_deduction: 200.00,
        tds_deduction: 8000.00,
        loan_deduction: 0.00,
        other_deductions: 800.00,
        total_deductions: 15000.00
      },
      compensation: {
        ctc: 1200000.00,
        fixed_component: 1080000.00,
        variable_component: 100000.00,
        bonus: 20000.00
      },
      netPayment: {
        gross_amount: 90000.00,
        total_deductions: 15000.00,
        net_amount: 75000.00,
        payment_date: '2026-01-31',
        payment_status: 'Paid'
      }
    },
    '02 2026': {
      employee: {
        employee_id: 'EMP001',
        name: 'John Doe',
        department: 'Engineering',
        designation: 'Senior Developer',
        email: 'john.doe@company.com'
      },
      monthly: {
        basic_salary: 50000.00,
        hra: 20000.00,
        special_allowance: 15000.00,
        other_allowances: 5000.00,
        gross_earnings: 90000.00
      },
      ytd: {
        year: 2026,
        ytd_gross: 180000.00,
        ytd_deductions: 30000.00,
        ytd_net: 150000.00,
        ytd_tax: 16000.00
      },
      professionalTax: {
        pt_amount: 200.00,
        pt_state: 'Maharashtra'
      },
      providentFund: {
        employee_contribution: 6000.00,
        employer_contribution: 6000.00,
        pf_account_number: 'PF123456789'
      },
      incomeTax: {
        tds_amount: 8000.00,
        taxable_income: 90000.00,
        tax_regime: 'New'
      },
      deductions: {
        pf_deduction: 6000.00,
        pt_deduction: 200.00,
        tds_deduction: 8000.00,
        loan_deduction: 0.00,
        other_deductions: 800.00,
        total_deductions: 15000.00
      },
      compensation: {
        ctc: 1200000.00,
        fixed_component: 1080000.00,
        variable_component: 100000.00,
        bonus: 20000.00
      },
      netPayment: {
        gross_amount: 90000.00,
        total_deductions: 15000.00,
        net_amount: 75000.00,
        payment_date: '2026-02-28',
        payment_status: 'Paid'
      }
    }
  },
  'EMP002': {
    '01 2026': {
      employee: {
        employee_id: 'EMP002',
        name: 'Jane Smith',
        department: 'Finance',
        designation: 'Financial Analyst',
        email: 'jane.smith@company.com'
      },
      monthly: {
        basic_salary: 45000.00,
        hra: 18000.00,
        special_allowance: 12000.00,
        other_allowances: 5000.00,
        gross_earnings: 80000.00
      },
      ytd: {
        year: 2026,
        ytd_gross: 80000.00,
        ytd_deductions: 13000.00,
        ytd_net: 67000.00,
        ytd_tax: 7000.00
      },
      professionalTax: {
        pt_amount: 200.00,
        pt_state: 'Karnataka'
      },
      providentFund: {
        employee_contribution: 5400.00,
        employer_contribution: 5400.00,
        pf_account_number: 'PF987654321'
      },
      incomeTax: {
        tds_amount: 7000.00,
        taxable_income: 80000.00,
        tax_regime: 'Old'
      },
      deductions: {
        pf_deduction: 5400.00,
        pt_deduction: 200.00,
        tds_deduction: 7000.00,
        loan_deduction: 0.00,
        other_deductions: 400.00,
        total_deductions: 13000.00
      },
      compensation: {
        ctc: 1000000.00,
        fixed_component: 960000.00,
        variable_component: 30000.00,
        bonus: 10000.00
      },
      netPayment: {
        gross_amount: 80000.00,
        total_deductions: 13000.00,
        net_amount: 67000.00,
        payment_date: '2026-01-31',
        payment_status: 'Paid'
      }
    }
  },
  'EMP003': {
    '01 2026': {
      employee: {
        employee_id: 'EMP003',
        name: 'Robert Johnson',
        department: 'HR',
        designation: 'HR Manager',
        email: 'robert.j@company.com'
      },
      monthly: {
        basic_salary: 55000.00,
        hra: 22000.00,
        special_allowance: 18000.00,
        other_allowances: 5000.00,
        gross_earnings: 100000.00
      },
      ytd: {
        year: 2026,
        ytd_gross: 100000.00,
        ytd_deductions: 17000.00,
        ytd_net: 83000.00,
        ytd_tax: 10000.00
      },
      professionalTax: {
        pt_amount: 200.00,
        pt_state: 'Maharashtra'
      },
      providentFund: {
        employee_contribution: 6600.00,
        employer_contribution: 6600.00,
        pf_account_number: 'PF456789123'
      },
      incomeTax: {
        tds_amount: 10000.00,
        taxable_income: 100000.00,
        tax_regime: 'New'
      },
      deductions: {
        pf_deduction: 6600.00,
        pt_deduction: 200.00,
        tds_deduction: 10000.00,
        loan_deduction: 0.00,
        other_deductions: 200.00,
        total_deductions: 17000.00
      },
      compensation: {
        ctc: 1400000.00,
        fixed_component: 1200000.00,
        variable_component: 150000.00,
        bonus: 50000.00
      },
      netPayment: {
        gross_amount: 100000.00,
        total_deductions: 17000.00,
        net_amount: 83000.00,
        payment_date: '2026-01-31',
        payment_status: 'Paid'
      }
    }
  }
};

export const getPayrollData = async (
  employeeId: string,
  payrollPeriod: string
): Promise<PayrollData | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const employeeData = mockPayrollDatabase[employeeId];
  if (!employeeData) {
    return null;
  }

  const periodData = employeeData[payrollPeriod];
  return periodData || null;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};
