"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type AccountUser = {
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
};

// Authenticated user dropdown.
// Keep this component backend-agnostic by delegating side-effects to server routes.
const ButtonAccount = ({ user }: { user?: AccountUser }) => {
  const [open, setOpen] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [user?.avatarUrl]);

  const initial =
    user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U";
  const normalizedAvatarUrl = user?.avatarUrl?.trim() ?? "";
  const hasAvatarUrl =
    normalizedAvatarUrl.length > 0 &&
    /^https?:\/\//i.test(normalizedAvatarUrl) &&
    normalizedAvatarUrl.toLowerCase() !== "null";
  const showAvatar = hasAvatarUrl && !avatarLoadFailed;

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
      }).catch(() => null);
    } finally {
      setSigningOut(false);
      window.location.assign("/");
    }
  };

  const handleBilling = async () => {
    if (billingLoading) return;
    setBillingLoading(true);
    try {
      const res = await fetch("/api/stripe/create-portal", { method: "POST" });
      const { url } = (await res.json().catch(() => ({}))) as { url?: string };
      if (url) window.location.href = url;
    } finally {
      setBillingLoading(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-2 py-1 pr-3 text-sm font-medium text-base-content hover:bg-base-200"
      >
        {showAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={normalizedAvatarUrl}
            alt={user?.name ?? "Avatar"}
            className="h-7 w-7 rounded-full object-cover"
            onError={() => setAvatarLoadFailed(true)}
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral text-xs font-semibold text-white">
            {initial}
          </span>
        )}
        <span className="hidden sm:inline">
          {user?.name ?? user?.email ?? "Account"}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-base-content/80 hover:bg-base-200"
          >
            Dashboard
          </Link>
          <button
            onClick={handleBilling}
            disabled={billingLoading}
            className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-base-content/80 hover:bg-base-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Billing
          </button>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="block w-full cursor-pointer border-t border-neutral-100 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed"
          >
            {signingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonAccount;
