import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vwjnjvwretfvnjuiqska.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3am5qdndyZXRmdm5qdWlxc2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDk0NTMsImV4cCI6MjA3ODE4NTQ1M30.Jfe71yHobeakeQuMJVHEYiHkYJPF4db-RyevJD8Lumk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
