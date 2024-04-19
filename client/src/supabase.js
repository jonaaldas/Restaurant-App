import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://mgkduajkgodxbbogiqbo.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1na2R1YWprZ29keGJib2dpcWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5OTkxMjUsImV4cCI6MjAxMzU3NTEyNX0.9GTByV4AhmYvs0PxcUdPUXt2sGcblHTH0rTzw_dYzRc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
