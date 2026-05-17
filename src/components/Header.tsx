import { createClient } from "@/libs/supabase/server";
import HeaderClient from "./HeaderClient";
import type { Profile } from "@/libs/types";

// Server wrapper — reads the Supabase session on the server so the header
// renders with the correct auth state on first paint (no flicker on refresh).
const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Pick<Profile, "name" | "image" | "email"> | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("name, image, email")
      .eq("id", user.id)
      .single<Pick<Profile, "name" | "image" | "email">>();
    profile = data ?? null;
  }

  return <HeaderClient initialUser={user} initialProfile={profile} />;
};

export default Header;
