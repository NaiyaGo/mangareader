import { createBrowserClient } from "@supabase/ssr";
//console.log("lib/client.js");
export function createClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }