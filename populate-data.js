import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nusdfspdaciogucvbouz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51c2Rmc3BkYWNpb2d1Y3Zib3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDIwOTksImV4cCI6MjA4ODgxODA5OX0.w3snEAKooEtLxWOrPFFwyijP6mXnKWXdhfE1Z4FKFHU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function populateData() {
  console.log('Starting data population...');

  // First, insert employees and get their IDs
  const employees = [
    { employee_id: 'EMP001', name: 'Rajesh Kumar', department: 'Engineering', designation: 'Senior Software Engineer', email: 'rajesh.kumar@company.com' },
    { employee_id: 'EMP002', name: 'Priya Sharma', department: 'Finance', designation: 'Finance Manager', email: 'priya.sharma@company.com' },
    { employee_id: 'EMP003', name: 'Amit Patel', department: 'Sales', designation: 'Sales Executive', email: 'amit.patel@company.com' }
  ];

  const employeeIds = {};

  for (const emp of employees) {
    const { data, error } = await supabase
      .from('employees')
      .upsert(emp, { onConflict: 'employee_id' })
      .select()
      .single();

    if (error) {
      console.error(`Error inserting employee ${emp.employee_id}:`, error);
      return;
    }
    employeeIds[emp.employee_id] = data.id;
    console.log(`✓ Employee ${emp.employee_id} inserted (ID: ${data.id})`);
  }

  // Now insert payroll records using the employee UUIDs
  const payrollRecords = [
    {
      employee_id: employeeIds['EMP001'],
      payroll_period: '01 2026',
      year: 2026,
      payment_date: '2026-01-31',
      // Monthly data
      basic_salary: 60000,
      hra: 24000,
      special_allowance: 15000,
      other_allowances: 5000,
      gross_earnings: 104000,
      // YTD data
      ytd_gross: 104000,
      ytd_deductions: 12200,
      ytd_net: 91800,
      ytd_tax: 4800,
      // Professional tax
      pt_amount: 200,
      pt_state: 'Maharashtra',
      // Provident fund
      employee_contribution: 7200,
      employer_contribution: 7200,
      pf_account_number: 'PF/MH/12345/001',
      // Income tax
      tds_amount: 4800,
      taxable_income: 780000,
      tax_regime: 'New Regime',
      // Deductions
      pf_deduction: 7200,
      pt_deduction: 200,
      tds_deduction: 4800,
      loan_deduction: 0,
      other_deductions: 0,
      total_deductions: 12200,
      // Compensation
      ctc: 1248000,
      fixed_component: 1044000,
      variable_component: 150000,
      bonus: 54000,
      // Net payment
      gross_amount: 104000,
      net_amount: 91800,
      payment_status: 'Processing',
      // Flow tracking
      flow_status: 'in_progress',
      current_stage: 'INCOME_TAX',
      flow_stages: [
        { stage: 'INITIALIZATION', status: 'completed', timestamp: '2026-01-15T09:00:00Z' },
        { stage: 'HRA', status: 'completed', timestamp: '2026-01-15T09:05:00Z' },
        { stage: 'PROF_TAX', status: 'completed', timestamp: '2026-01-15T09:10:00Z' },
        { stage: 'PROVIDENT_FUND', status: 'completed', timestamp: '2026-01-15T09:15:00Z' },
        { stage: 'INCOME_TAX', status: 'processing', timestamp: '2026-01-15T09:20:00Z' }
      ]
    },
    {
      employee_id: employeeIds['EMP002'],
      payroll_period: '01 2026',
      year: 2026,
      payment_date: '2026-01-31',
      // Monthly data
      basic_salary: 80000,
      hra: 32000,
      special_allowance: 20000,
      other_allowances: 8000,
      gross_earnings: 140000,
      // YTD data
      ytd_gross: 140000,
      ytd_deductions: 17000,
      ytd_net: 123000,
      ytd_tax: 7200,
      // Professional tax
      pt_amount: 200,
      pt_state: 'Maharashtra',
      // Provident fund
      employee_contribution: 9600,
      employer_contribution: 9600,
      pf_account_number: 'PF/MH/12345/002',
      // Income tax
      tds_amount: 7200,
      taxable_income: 1120000,
      tax_regime: 'Old Regime',
      // Deductions
      pf_deduction: 9600,
      pt_deduction: 200,
      tds_deduction: 7200,
      loan_deduction: 0,
      other_deductions: 0,
      total_deductions: 17000,
      // Compensation
      ctc: 1680000,
      fixed_component: 1400000,
      variable_component: 200000,
      bonus: 80000,
      // Net payment
      gross_amount: 140000,
      net_amount: 123000,
      payment_status: 'Completed',
      // Flow tracking
      flow_status: 'completed',
      current_stage: 'COMPLETED',
      flow_stages: [
        { stage: 'INITIALIZATION', status: 'completed', timestamp: '2026-01-15T09:00:00Z' },
        { stage: 'HRA', status: 'completed', timestamp: '2026-01-15T09:05:00Z' },
        { stage: 'PROF_TAX', status: 'completed', timestamp: '2026-01-15T09:10:00Z' },
        { stage: 'PROVIDENT_FUND', status: 'completed', timestamp: '2026-01-15T09:15:00Z' },
        { stage: 'INCOME_TAX', status: 'completed', timestamp: '2026-01-15T09:20:00Z' },
        { stage: 'COMPLETED', status: 'completed', timestamp: '2026-01-15T09:25:00Z' }
      ]
    },
    {
      employee_id: employeeIds['EMP003'],
      payroll_period: '01 2026',
      year: 2026,
      payment_date: '2026-01-31',
      // Monthly data
      basic_salary: 45000,
      hra: 18000,
      special_allowance: 10000,
      other_allowances: 3000,
      gross_earnings: 76000,
      // YTD data
      ytd_gross: 76000,
      ytd_deductions: 8600,
      ytd_net: 67400,
      ytd_tax: 3000,
      // Professional tax
      pt_amount: 200,
      pt_state: 'Gujarat',
      // Provident fund
      employee_contribution: 5400,
      employer_contribution: 5400,
      pf_account_number: 'PF/GJ/12345/003',
      // Income tax
      tds_amount: 3000,
      taxable_income: 608000,
      tax_regime: 'New Regime',
      // Deductions
      pf_deduction: 5400,
      pt_deduction: 200,
      tds_deduction: 3000,
      loan_deduction: 0,
      other_deductions: 0,
      total_deductions: 8600,
      // Compensation
      ctc: 912000,
      fixed_component: 760000,
      variable_component: 100000,
      bonus: 52000,
      // Net payment
      gross_amount: 76000,
      net_amount: 67400,
      payment_status: 'Failed',
      // Flow tracking
      flow_status: 'failed',
      current_stage: 'PROF_TAX',
      failed_at_stage: 'PROF_TAX',
      error_message: 'PT slab not found for salary range',
      flow_stages: [
        { stage: 'INITIALIZATION', status: 'completed', timestamp: '2026-01-15T09:00:00Z' },
        { stage: 'HRA', status: 'completed', timestamp: '2026-01-15T09:05:00Z' },
        { stage: 'PROF_TAX', status: 'failed', timestamp: '2026-01-15T09:10:00Z', error: 'PT slab not found for salary range' }
      ]
    }
  ];

  for (const record of payrollRecords) {
    const { error } = await supabase
      .from('payroll_records')
      .upsert(record, { onConflict: 'employee_id,payroll_period' });

    if (error) {
      console.error('Error inserting payroll record:', error);
      return;
    }
  }

  console.log('✓ All payroll records inserted');
  console.log('\n✅ All sample data populated successfully!');
}

populateData().catch(console.error);
