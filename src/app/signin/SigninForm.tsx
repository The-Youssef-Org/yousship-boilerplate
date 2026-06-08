"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/libs/supabase";
import ButtonPrimary from "@/components/ButtonPrimary";
import config from "@/config";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const supabase = createClient();
  const isConfigured = !!supabase;

  // Google OAuth uses the server-side PKCE callback (code exchange).
  const oauthCallbackUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(config.auth.callbackUrl)}`
      : "";

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    const { error } = await supabase!.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: oauthCallbackUrl },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, next: config.auth.callbackUrl }),
      });
      if (!res.ok) throw new Error("Something went wrong.");
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {!isConfigured && (
        <div className="mb-6 rounded-xl border border-base-content/10 bg-base-content/[0.03] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-base-content/40">
            Coming soon
          </p>
          <p className="mt-1 text-sm leading-relaxed text-base-content/60">
            Sign-in is not available yet. Check back soon or contact us if you need access.
          </p>
        </div>
      )}

      <ButtonPrimary
        type="button"
        onClick={handleGoogle}
        disabled={loading || !isConfigured}
        className="w-full gap-3 px-4 py-3"
      >
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.6 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.7l-6.5 5C9.6 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C40.9 36.6 44 31 44 24c0-1.2-.1-2.4-.4-3.5z" />
        </svg>
        Continue with Google
      </ButtonPrimary>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-base-content/50">
        <span className="h-px flex-1 bg-base-content/10" />
        or
        <span className="h-px flex-1 bg-base-content/10" />
      </div>

      {sent ? (
        <div className="rounded-xl border border-base-content/10 bg-base-content/[0.03] px-6 py-5 text-center">
          <p className="text-sm font-semibold text-base-content">Check your inbox</p>
          <p className="mt-1 text-sm text-base-content/60">
            We sent a magic sign-in link to{" "}
            <span className="font-medium text-base-content">{email}</span>.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setEmail("");
            }}
            className="mt-4 text-xs text-base-content/50 underline hover:text-base-content"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-3">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-base-content/80">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-base-content/10 bg-base-content/[0.03] px-4 py-3 text-sm text-base-content placeholder-base-content/40 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="you@example.com"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <ButtonPrimary
            type="submit"
            disabled={loading || !email}
            className="w-full px-4 py-3"
          >
            {loading ? "Sending..." : "Send magic link"}
          </ButtonPrimary>
        </form>
      )}
    </div>
  );
};

export default SigninForm;
