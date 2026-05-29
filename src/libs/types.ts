// Shared types for the public.profiles table created in Supabase.
export type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  customer_id: string | null;
  plan_id: string | null;
  payment_provider: string | null;
  has_access: boolean;
  updated_at: string;
  created_at: string;
};
