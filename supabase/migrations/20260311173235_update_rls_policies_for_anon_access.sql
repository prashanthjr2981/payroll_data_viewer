/*
  # Update RLS Policies for Anonymous Access

  ## Changes
  This migration updates the Row Level Security policies to allow anonymous users to read data.
  This is appropriate for a payroll viewing application where users can check their payroll
  information without requiring authentication.

  ## Security Updates
  - Drop existing restrictive policies that require authentication
  - Add new policies allowing anonymous (anon role) users to read employee and payroll data
  - Maintain service role restrictions for write operations

  ## Important Notes
  1. This allows anyone with the anon key to read payroll data
  2. In production, you should implement proper authentication and restrict access per employee
  3. Write operations still require service role access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read employees" ON employees;
DROP POLICY IF EXISTS "Allow authenticated users to read payroll records" ON payroll_records;

-- Create new policies for anonymous read access
CREATE POLICY "Allow anon users to read employees"
  ON employees
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon users to read payroll records"
  ON payroll_records
  FOR SELECT
  TO anon
  USING (true);