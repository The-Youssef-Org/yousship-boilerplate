import { createClient } from "@/libs/supabase/server";
import HeaderClient from "./HeaderClient";
import type { Profile } from "@/libs/types";

// Server wrapper — reads the Supabase session on the server so the header
// renders with the correct auth state on first paint (no flicker on refresh).
const Header = async () => {
  const supabase = await createClient();

  let user = null;
  let profile: Pick<Profile, "name" | "image" | "email"> | null = null;

  if (supabase) {
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, image, email")
        .eq("id", user.id)
        .single<Pick<Profile, "name" | "image" | "email">>();
      profile = profileData ?? null;
    }
  }

  return <HeaderClient initialUser={user} initialProfile={profile} />;
};

export default Header;