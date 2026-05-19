import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ncuixngbrypmcqhypyjd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

let supabaseClient;
try {
  if (!supabaseUrl || supabaseUrl.includes('placeholder') || !supabaseAnonKey) {
    throw new Error('Missing Supabase configurations');
  }
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.warn("Supabase client deferred initialization:", e);
  supabaseClient = {
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        })
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      upsert: () => Promise.resolve({ data: null, error: null })
    })
  } as any;
}

export const supabase = supabaseClient;
