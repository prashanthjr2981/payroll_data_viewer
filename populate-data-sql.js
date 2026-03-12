import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nusdfspdaciogucvbouz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51c2Rmc3BkYWNpb2d1Y3Zib3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDIwOTksImV4cCI6MjA4ODgxODA5OX0.w3snEAKooEtLxWOrPFFwyijP6mXnKWXdhfE1Z4FKFHU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function populateData() {
  console.log('Starting data population using RPC...');

  // Use RPC to bypass RLS and insert data directly
  const sql = `
    -- Insert employees and get their IDs
    WITH inserted_employees AS (
      INSERT INTO employees (employee_id, name, department, designation, email)
      VALUES
        ('EMP001', 'Rajesh Kumar', 'Engineering', 'Senior Software Engineer', 'rajesh.kumar@company.com'),
        ('EMP002', 'Priya Sharma', 'Finance', 'Finance Manager', 'priya.sharma@company.com'),
        ('EMP003', 'Amit Patel', 'Sales', 'Sales Executive', 'amit.patel@company.com')
      ON CONFLICT (employee_id) DO UPDATE SET
        name = EXCLUDED.name,
        department = EXCLUDED.department,
        designation = EXCLUDED.designation,
        email = EXCLUDED.email
      RETURNING id, employee_id
    )
    -- Insert payroll records
    INSERT INTO payroll_records (
      employee_id, payroll_period, year, payment_date,
      basic_salary, hra, special_allowance, other_allowances, gross_earnings,
      ytd_gross, ytd_deductions, ytd_net, ytd_tax,
      pt_amount, pt_state,
      employee_contribution, employer_contribution, pf_account_number,
      tds_amount, taxable_income, tax_regime,
      pf_deduction, pt_deduction, tds_deduction, loan_deduction, other_deductions, total_deductions,
      ctc, fixed_component, variable_component, bonus,
      gross_amount, net_amount, payment_status,
      flow_status, current_stage, failed_at_stage, error_message, flow_stages
    )
    SELECT
      e.id,
      '01 2026',
      2026,
      '2026-01-31'::date,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 60000
        WHEN e.employee_id = 'EMP002' THEN 80000
        WHEN e.employee_id = 'EMP003' THEN 45000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 24000
        WHEN e.employee_id = 'EMP002' THEN 32000
        WHEN e.employee_id = 'EMP003' THEN 18000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 15000
        WHEN e.employee_id = 'EMP002' THEN 20000
        WHEN e.employee_id = 'EMP003' THEN 10000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 5000
        WHEN e.employee_id = 'EMP002' THEN 8000
        WHEN e.employee_id = 'EMP003' THEN 3000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 104000
        WHEN e.employee_id = 'EMP002' THEN 140000
        WHEN e.employee_id = 'EMP003' THEN 76000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 104000
        WHEN e.employee_id = 'EMP002' THEN 140000
        WHEN e.employee_id = 'EMP003' THEN 76000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 12200
        WHEN e.employee_id = 'EMP002' THEN 17000
        WHEN e.employee_id = 'EMP003' THEN 8600
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 91800
        WHEN e.employee_id = 'EMP002' THEN 123000
        WHEN e.employee_id = 'EMP003' THEN 67400
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 4800
        WHEN e.employee_id = 'EMP002' THEN 7200
        WHEN e.employee_id = 'EMP003' THEN 3000
      END,
      200,
      CASE
        WHEN e.employee_id IN ('EMP001', 'EMP002') THEN 'Maharashtra'
        ELSE 'Gujarat'
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 7200
        WHEN e.employee_id = 'EMP002' THEN 9600
        WHEN e.employee_id = 'EMP003' THEN 5400
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 7200
        WHEN e.employee_id = 'EMP002' THEN 9600
        WHEN e.employee_id = 'EMP003' THEN 5400
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 'PF/MH/12345/001'
        WHEN e.employee_id = 'EMP002' THEN 'PF/MH/12345/002'
        WHEN e.employee_id = 'EMP003' THEN 'PF/GJ/12345/003'
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 4800
        WHEN e.employee_id = 'EMP002' THEN 7200
        WHEN e.employee_id = 'EMP003' THEN 3000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 780000
        WHEN e.employee_id = 'EMP002' THEN 1120000
        WHEN e.employee_id = 'EMP003' THEN 608000
      END,
      CASE
        WHEN e.employee_id = 'EMP002' THEN 'Old Regime'
        ELSE 'New Regime'
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 7200
        WHEN e.employee_id = 'EMP002' THEN 9600
        WHEN e.employee_id = 'EMP003' THEN 5400
      END,
      200,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 4800
        WHEN e.employee_id = 'EMP002' THEN 7200
        WHEN e.employee_id = 'EMP003' THEN 3000
      END,
      0,
      0,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 12200
        WHEN e.employee_id = 'EMP002' THEN 17000
        WHEN e.employee_id = 'EMP003' THEN 8600
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 1248000
        WHEN e.employee_id = 'EMP002' THEN 1680000
        WHEN e.employee_id = 'EMP003' THEN 912000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 1044000
        WHEN e.employee_id = 'EMP002' THEN 1400000
        WHEN e.employee_id = 'EMP003' THEN 760000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 150000
        WHEN e.employee_id = 'EMP002' THEN 200000
        WHEN e.employee_id = 'EMP003' THEN 100000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 54000
        WHEN e.employee_id = 'EMP002' THEN 80000
        WHEN e.employee_id = 'EMP003' THEN 52000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 104000
        WHEN e.employee_id = 'EMP002' THEN 140000
        WHEN e.employee_id = 'EMP003' THEN 76000
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 91800
        WHEN e.employee_id = 'EMP002' THEN 123000
        WHEN e.employee_id = 'EMP003' THEN 67400
      END,
      CASE
        WHEN e.employee_id = 'EMP002' THEN 'Completed'
        WHEN e.employee_id = 'EMP003' THEN 'Failed'
        ELSE 'Processing'
      END,
      CASE
        WHEN e.employee_id = 'EMP002' THEN 'completed'
        WHEN e.employee_id = 'EMP003' THEN 'failed'
        ELSE 'in_progress'
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN 'INCOME_TAX'
        WHEN e.employee_id = 'EMP002' THEN 'COMPLETED'
        WHEN e.employee_id = 'EMP003' THEN 'PROF_TAX'
      END,
      CASE
        WHEN e.employee_id = 'EMP003' THEN 'PROF_TAX'
        ELSE NULL
      END,
      CASE
        WHEN e.employee_id = 'EMP003' THEN 'PT slab not found for salary range'
        ELSE NULL
      END,
      CASE
        WHEN e.employee_id = 'EMP001' THEN '[
          {"stage": "INITIALIZATION", "status": "completed", "timestamp": "2026-01-15T09:00:00Z"},
          {"stage": "HRA", "status": "completed", "timestamp": "2026-01-15T09:05:00Z"},
          {"stage": "PROF_TAX", "status": "completed", "timestamp": "2026-01-15T09:10:00Z"},
          {"stage": "PROVIDENT_FUND", "status": "completed", "timestamp": "2026-01-15T09:15:00Z"},
          {"stage": "INCOME_TAX", "status": "processing", "timestamp": "2026-01-15T09:20:00Z"}
        ]'::jsonb
        WHEN e.employee_id = 'EMP002' THEN '[
          {"stage": "INITIALIZATION", "status": "completed", "timestamp": "2026-01-15T09:00:00Z"},
          {"stage": "HRA", "status": "completed", "timestamp": "2026-01-15T09:05:00Z"},
          {"stage": "PROF_TAX", "status": "completed", "timestamp": "2026-01-15T09:10:00Z"},
          {"stage": "PROVIDENT_FUND", "status": "completed", "timestamp": "2026-01-15T09:15:00Z"},
          {"stage": "INCOME_TAX", "status": "completed", "timestamp": "2026-01-15T09:20:00Z"},
          {"stage": "COMPLETED", "status": "completed", "timestamp": "2026-01-15T09:25:00Z"}
        ]'::jsonb
        ELSE '[
          {"stage": "INITIALIZATION", "status": "completed", "timestamp": "2026-01-15T09:00:00Z"},
          {"stage": "HRA", "status": "completed", "timestamp": "2026-01-15T09:05:00Z"},
          {"stage": "PROF_TAX", "status": "failed", "timestamp": "2026-01-15T09:10:00Z", "error": "PT slab not found for salary range"}
        ]'::jsonb
      END
    FROM inserted_employees e
    ON CONFLICT (employee_id, payroll_period) DO UPDATE SET
      basic_salary = EXCLUDED.basic_salary,
      hra = EXCLUDED.hra,
      special_allowance = EXCLUDED.special_allowance,
      other_allowances = EXCLUDED.other_allowances,
      gross_earnings = EXCLUDED.gross_earnings,
      ytd_gross = EXCLUDED.ytd_gross,
      ytd_deductions = EXCLUDED.ytd_deductions,
      ytd_net = EXCLUDED.ytd_net,
      ytd_tax = EXCLUDED.ytd_tax,
      pt_amount = EXCLUDED.pt_amount,
      pt_state = EXCLUDED.pt_state,
      employee_contribution = EXCLUDED.employee_contribution,
      employer_contribution = EXCLUDED.employer_contribution,
      pf_account_number = EXCLUDED.pf_account_number,
      tds_amount = EXCLUDED.tds_amount,
      taxable_income = EXCLUDED.taxable_income,
      tax_regime = EXCLUDED.tax_regime,
      pf_deduction = EXCLUDED.pf_deduction,
      pt_deduction = EXCLUDED.pt_deduction,
      tds_deduction = EXCLUDED.tds_deduction,
      loan_deduction = EXCLUDED.loan_deduction,
      other_deductions = EXCLUDED.other_deductions,
      total_deductions = EXCLUDED.total_deductions,
      ctc = EXCLUDED.ctc,
      fixed_component = EXCLUDED.fixed_component,
      variable_component = EXCLUDED.variable_component,
      bonus = EXCLUDED.bonus,
      gross_amount = EXCLUDED.gross_amount,
      net_amount = EXCLUDED.net_amount,
      payment_status = EXCLUDED.payment_status,
      flow_status = EXCLUDED.flow_status,
      current_stage = EXCLUDED.current_stage,
      failed_at_stage = EXCLUDED.failed_at_stage,
      error_message = EXCLUDED.error_message,
      flow_stages = EXCLUDED.flow_stages;
  `;

  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.error('Error executing SQL:', error);
    console.log('\nNote: This requires a database function to execute raw SQL with elevated privileges.');
    console.log('As a workaround, you can run the SQL directly in the Supabase dashboard SQL editor.');
  } else {
    console.log('✅ Data populated successfully!');
  }
}

populateData().catch(console.error);
