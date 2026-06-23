import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://gekihwepevbldonhadba.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_NmUeyrfVp_oUqBZFp-w3YQ_BDzlBfLZ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
