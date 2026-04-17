import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    // During build or if env vars are missing, return a proxy or null to avoid crashing
    // This allows the build to complete while still requiring keys at runtime
    console.warn("Supabase credentials missing. Client will not be functional.");
    return {} as any;
  }
  
  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};
