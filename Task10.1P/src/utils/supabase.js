import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bqfmhjuvaslhfqtmxadg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZm1oanV2YXNsaGZxdG14YWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTU1NTcsImV4cCI6MjA3MzkzMTU1N30.KLkJWxw6gsfhDE_SxvWF6h3W1e1rNcC8sWDXv9PDERU'
export const supabase = createClient(supabaseUrl, supabaseKey)