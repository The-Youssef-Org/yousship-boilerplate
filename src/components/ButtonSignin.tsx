"use client";

import { useState } from "react";
import { createClient } from "@/libs/supabase";
import config from "@/config";
import ButtonPrimary from "./ButtonPrimary";

type Props = {
  text?: string;
  // If true, render as a link to the dedicated signin page; otherwise trigger
  // an inline OAuth flow (Google by default).
  asLink?: boolean;
  provider?: "google";
  className?: string;
};

// Header / nav signin button.
const ButtonSignin = ({
  text = "Sign in",
  asLink = false,
  provider = "google",
  className = "",
}: Props) => {
  const [loading, setLoading] = useState(false);

  if (asLink) {
    return (
      <ButtonPrimary href={config.auth.loginUrl} prefetch={false} className={`px-4 py-2 ${className}`}>
        {text}
      </ButtonPrimary>
    );
  }

  const handleSignin = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <ButtonPrimary
      onClick={handleSignin}
      disabled={loading}
      className={`px-4 py-2 ${className}`}
    >
      {loading ? "Loading…" : text}
    </ButtonPrimary>
  );
};

export default ButtonSignin;
