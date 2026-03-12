-- Add flow tracking columns to payroll_records table
ALTER TABLE payroll_records 
ADD COLUMN flow_status TEXT DEFAULT 'pending',
ADD COLUMN current_stage TEXT,
ADD COLUMN failed_at_stage TEXT,
ADD COLUMN error_message TEXT,
ADD COLUMN flow_stages JSONB DEFAULT '[]'::jsonb;