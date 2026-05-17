import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";

// This layout wraps all pages under /dashboard and ensures the user is
// authenticated. Unauthenticated visitors are redirected to the login page.
// Add any dashboard-wide UI (sidebar, top nav) here.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(config.auth.loginUrl);
  }

  return <>{children}</>;
}
