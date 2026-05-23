"use client";

import { useState, type FormEvent } from "react";
import ButtonPrimary from "./ButtonPrimary";

// Email capture button (newsletter / waitlist).
// POSTs `{ email }` to /api/lead — implement that route on your end.
const ButtonLead = ({
  cta = "Join the waitlist",
  endpoint = "/api/lead",
}: {
  cta?: string;
  endpoint?: string;
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex items-start gap-3">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="9" strokeOpacity={0.2} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.5 10.5l2.5 2.5 4.5-5"
          />
        </svg>
        <div>
          <p className="text-sm font-semibold text-base-content">You&apos;re in!</p>
          <p className="mt-0.5 text-sm text-base-content/60">
            Check your inbox — we&apos;ll be in touch shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="you@startup.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-base-300 bg-base-100 px-5 py-3 text-sm text-base-content placeholder-base-content/40 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <ButtonPrimary
        type="submit"
        disabled={loading}
        className="px-5 py-3"
      >
        {loading ? "Sending…" : cta}
      </ButtonPrimary>
      {error && (
        <p className="basis-full text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

export default ButtonLead;
