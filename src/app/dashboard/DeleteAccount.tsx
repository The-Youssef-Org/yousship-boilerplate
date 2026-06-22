"use client";

import { useState } from "react";
import { createClient } from "@/libs/supabase";

const CONFIRM_PHRASE = "DELETE";

const DeleteAccount = ({ email }: { email: string }) => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Failed to delete account.");
      }

      // Clear both browser auth state and server cookie session before redirecting.
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      await fetch("/api/auth/signout", { method: "POST" });

      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-base font-semibold text-base-content">
          Delete your account
        </h3>
        <p className="mt-1 text-sm text-base-content/70">
          This removes your account and signs you out for good. You can
          always create a new account later.
        </p>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-5 inline-flex items-center rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            Delete account
          </button>
        )}
      </div>

      {open && (
        <div
          className="mt-4 rounded-2xl border border-red-200 bg-red-50/60 p-5"
          style={{ rowGap: "1rem", display: "flex", flexDirection: "column" }}
        >
          <p className="text-sm text-red-800">
            To confirm, type{" "}
            <span className="font-mono font-semibold">{CONFIRM_PHRASE}</span>{" "}
            below. We&apos;ll delete the account for{" "}
            <span className="font-semibold">{email}</span>.
          </p>
          <input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            className="w-full rounded-xl border border-red-200 bg-base-100 px-4 py-3 text-sm text-base-content focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirm("");
                setError(null);
              }}
              disabled={loading}
              className="inline-flex items-center rounded-xl border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium text-base-content hover:bg-base-200 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading || confirm !== CONFIRM_PHRASE}
              className="inline-flex min-w-40 items-center justify-center rounded-xl border border-red-700 px-5 py-2.5 text-sm font-semibold shadow-sm transition disabled:cursor-default"
              style={{
                backgroundColor:
                  loading || confirm !== CONFIRM_PHRASE ? "#fee2e2" : "#dc2626",
                color: loading || confirm !== CONFIRM_PHRASE ? "#991b1b" : "#ffffff",
                cursor: loading || confirm !== CONFIRM_PHRASE ? "default" : "pointer",
              }}
            >
              {loading ? "Deleting..." : "Delete account"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
