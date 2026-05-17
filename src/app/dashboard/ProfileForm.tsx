"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase";
import ButtonPrimary from "@/components/ButtonPrimary";

type Props = {
  initialName: string;
  initialImage: string;
  email: string;
};

const ProfileForm = ({ initialName, initialImage, email }: Props) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!info) return;
    const timer = setTimeout(() => setInfo(null), 5000);
    return () => clearTimeout(timer);
  }, [info]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setInfo(null);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Not signed in.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        name: name.trim() || null,
        image: image.trim() || null,
      })
      .eq("id", user.id);

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setInfo("Profile updated.");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col"
      style={{ rowGap: "1.5rem" }}
    >
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium text-base-content/80"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          disabled
          className="mt-1 w-full cursor-not-allowed rounded-xl border border-base-300 bg-base-200 px-4 py-3 text-sm text-base-content/70"
        />
        <p className="mt-1 text-xs text-base-content/60">
          Email is managed by your sign-in provider and cannot be changed here.
        </p>
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium text-base-content/80">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mt-1 w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div>
        <label htmlFor="image" className="text-sm font-medium text-base-content/80">
          Avatar URL
        </label>
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://…"
          className="mt-1 w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm text-base-content focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      {info && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {info}
        </p>
      )}

      <div className="flex items-center justify-start gap-3">
            <ButtonPrimary
          type="submit"
          disabled={loading}
              className="px-6 py-3 shadow-sm"
        >
          {loading ? "Saving…" : "Save changes"}
            </ButtonPrimary>
      </div>
    </form>
  );
};

export default ProfileForm;
