/*
  # Create Payroll System Tables

  ## Overview
  This migration creates a comprehensive payroll data management system with proper relationships and security.

  ## New Tables

  ### 1. employees
  - `id` (uuid, primary key) - Unique identifier
  - `employee_id` (text, unique) - Employee identifier code
  - `name` (text) - Full name
  - `department` (text) - Department name
  - `designation` (text) - Job designation
  - `email` (text, unique) - Email address
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. payroll_records
  Main payroll data table containing all payroll information for each employee and period
  - `id` (uuid, primary key) - Unique identifier
  - `employee_id` (uuid, foreign key) - Reference to employees table
  - `payroll_period` (text) - Period in format "MM YYYY" (e.g., "01 2026")
  - Monthly data fields (basic_salary, hra, special_allowance, etc.)
  - YTD data fields (year, ytd_gross, ytd_deductions, ytd_net, ytd_tax)
  - Professional tax fields (pt_amount, pt_state)
  - Provident fund fields (employee_contribution, employer_contribution, pf_account_number)
  - Income tax fields (tds_amount, taxable_income, tax_regime)
  - Deduction fields (pf_deduction, pt_deduction, tds_deduction, loan_deduction, other_deductions, total_deductions)
  - Compensation fields (ctc, fixed_component, variable_component, bonus)
  - Net payment fields (gross_amount, total_deductions, net_amount, payment_date, payment_status)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record last update timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Policies allow authenticated users to read all data (for now, can be restricted per employee later)
  - Only service role can insert/update/delete records

  ## Indexes
  - Index on employee_id for faster lookups
  - Unique constraint on (employee_id, payroll_period) combination
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text UNIQUE NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  designation text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create payroll_records table
CREATE TABLE IF NOT EXISTS payroll_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  payroll_period text NOT NULL,
  
  -- Monthly data
  basic_salary numeric(12,2) DEFAULT 0,
  hra numeric(12,2) DEFAULT 0,
  special_allowance numeric(12,2) DEFAULT 0,
  other_allowances numeric(12,2) DEFAULT 0,
  gross_earnings numeric(12,2) DEFAULT 0,
  
  -- YTD data
  year integer NOT NULL,
  ytd_gross numeric(12,2) DEFAULT 0,
  ytd_deductions numeric(12,2) DEFAULT 0,
  ytd_net numeric(12,2) DEFAULT 0,
  ytd_tax numeric(12,2) DEFAULT 0,
  
  -- Professional tax
  pt_amount numeric(12,2) DEFAULT 0,
  pt_state text DEFAULT '',
  
  -- Provident fund
  employee_contribution numeric(12,2) DEFAULT 0,
  employer_contribution numeric(12,2) DEFAULT 0,
  pf_account_number text DEFAULT '',
  
  -- Income tax
  tds_amount numeric(12,2) DEFAULT 0,
  taxable_income numeric(12,2) DEFAULT 0,
  tax_regime text DEFAULT 'New',
  
  -- Deductions
  pf_deduction numeric(12,2) DEFAULT 0,
  pt_deduction numeric(12,2) DEFAULT 0,
  tds_deduction numeric(12,2) DEFAULT 0,
  loan_deduction numeric(12,2) DEFAULT 0,
  other_deductions numeric(12,2) DEFAULT 0,
  total_deductions numeric(12,2) DEFAULT 0,
  
  -- Compensation
  ctc numeric(12,2) DEFAULT 0,
  fixed_component numeric(12,2) DEFAULT 0,
  variable_component numeric(12,2) DEFAULT 0,
  bonus numeric(12,2) DEFAULT 0,
  
  -- Net payment
  gross_amount numeric(12,2) DEFAULT 0,
  net_amount numeric(12,2) DEFAULT 0,
  payment_date date NOT NULL,
  payment_status text DEFAULT 'Pending',
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(employee_id, payroll_period)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_payroll_employee_id ON payroll_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_payroll_period ON payroll_records(payroll_period);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_records ENABLE ROW LEVEL SECURITY;

-- Policies for employees table
CREATE POLICY "Allow authenticated users to read employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow service role to insert employees"
  ON employees
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to update employees"
  ON employees
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role to delete employees"
  ON employees
  FOR DELETE
  TO service_role
  USING (true);

-- Policies for payroll_records table
CREATE POLICY "Allow authenticated users to read payroll records"
  ON payroll_records
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow service role to insert payroll records"
  ON payroll_records
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Allow service role to update payroll records"
  ON payroll_records
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role to delete payroll records"
  ON payroll_records
  FOR DELETE
  TO service_role
  USING (true);