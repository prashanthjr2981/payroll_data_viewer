import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nusdfspdaciogucvbouz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51c2Rmc3BkYWNpb2d1Y3Zib3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDIwOTksImV4cCI6MjA4ODgxODA5OX0.w3snEAKooEtLxWOrPFFwyijP6mXnKWXdhfE1Z4FKFHU';

const supabase = createClient(supabaseUrl, supabaseKey);

// Since we can't use service role to execute raw SQL, let's directly insert with the policies
// This will help us understand what's wrong

async function testInsert() {
  console.log('Testing insert...');

  const { data, error } = await supabase
    .from('employees')
    .insert({
      employee_id: 'TEST001',
      name: 'Test User',
      department: 'Test',
      designation: 'Tester',
      email: 'test@test.com'
    })
    .select();

  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert successful:', data);
  }
}

testInsert();
