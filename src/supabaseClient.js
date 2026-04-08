import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project details
const supabaseUrl = 'https://arhltxcdiccmgjjomzds.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaGx0eGNkaWNjbWdqam9temRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzE5MjksImV4cCI6MjA4NjMwNzkyOX0.0EOf18zRepXkslNP_0ulpgl2vzb8Rtb4S5mIpkKhM60'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)