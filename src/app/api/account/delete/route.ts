import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/libs/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// Deletes the currently signed-in user's profile row and their auth account.
// Requires SUPABASE_SERVICE_ROLE_KEY to be set (server-only env var).
export async function POST() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !url) {
    return NextResponse.json(
      {
        error:
          "Delete account is not configured: missing SUPABASE_SERVICE_ROLE_KEY on the server.",
      },
      { status: 500 },
    );
  }

  const admin = createAdminClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Remove the profile row first; then delete the auth user. The trigger
  // on auth.users will not fire on delete, so the profile cleanup is explicit.
  const { error: profileError } = await admin
    .from("profiles")
    .delete()
    .eq("id", user.id);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  const { error: authError } = await admin.auth.admin.deleteUser(user.id);
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
