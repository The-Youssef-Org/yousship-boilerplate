"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import config from "@/config";
import { createClient } from "@/libs/supabase";
import AnnouncementBar from "./AnnouncementBar";
import ButtonSignin from "./ButtonSignin";
import ButtonAccount from "./ButtonAccount";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import type { Profile } from "@/libs/types";

type HeaderProfile = Pick<Profile, "name" | "image" | "email"> | null;

const links = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/#features", label: "Features" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

const HeaderClient = ({
  initialUser = null,
  initialProfile = null,
}: {
  initialUser?: User | null;
  initialProfile?: HeaderProfile;
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser);
  const [profile, setProfile] = useState<HeaderProfile>(initialProfile);

  useEffect(() => {
    const supabase = createClient();
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        const { data } = await supabase
          .from("profiles")
          .select("name, image, email")
          .eq("id", nextUser.id)
          .single<HeaderProfile>();
        setProfile(data ?? null);
      } else {
        setProfile(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const accountUser = user
    ? {
        email: profile?.email ?? user.email,
        name:
          profile?.name ??
          (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          ([
            user.user_metadata?.given_name as string | undefined,
            user.user_metadata?.family_name as string | undefined,
          ]
            .filter(Boolean)
            .join(" ") || undefined) ??
          null,
        avatarUrl:
          profile?.image ??
          (user.user_metadata?.avatar_url as string | undefined) ??
          (user.user_metadata?.picture as string | undefined) ??
          null,
      }
    : undefined;

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky z-40 border-b border-base-300/70 bg-base-100/80 backdrop-blur ${
          config.announcementBar.show ? "top-9" : "top-0"
        }`}
      >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Logo size={32} className="-m-1.5 p-1.5 text-lg font-semibold" />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {config.enableThemeToggle && <ThemeToggle />}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-base-content/80"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              {open ? (
                <path d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.36a1 1 0 111.415 1.414L13.414 10.586l4.362 4.361a1 1 0 01-1.415 1.415L12 12l-4.361 4.362A1 1 0 016.225 14.95l4.36-4.36-4.36-4.362a1 1 0 010-1.415z" />
              ) : (
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-base-content/80 hover:text-base-content"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-5">
          {config.enableThemeToggle && <ThemeToggle />}
          {config.auth.showInHeader && (user ? <ButtonAccount user={accountUser} /> : <ButtonSignin asLink />)}
        </div>
      </nav>

      {open && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <div className="space-y-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-base-content hover:bg-base-200"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {config.auth.showInHeader && <div className="pt-2">
              {user ? <ButtonAccount user={accountUser} /> : <ButtonSignin asLink />}
            </div>}
          </div>
        </div>
      )}
      </header>
    </>
  );
};

export default HeaderClient;
