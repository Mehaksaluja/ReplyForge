import { createClient } from "@supabase/supabase-js";

export type UserRow = {
  id: string;
  google_sub: string;
  email: string;
  free_replies_used: number;
  payment_customer_id: string | null;
  subscription_status: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: {
          id?: string;
          google_sub: string;
          email: string;
          free_replies_used?: number;
          payment_customer_id?: string | null;
          subscription_status?: string;
          created_at?: string;
        };
        Update: Partial<UserRow>;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
  };
};

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
    }
    client = createClient<Database>(url, key);
  }
  return client;
}
