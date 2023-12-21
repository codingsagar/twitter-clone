"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function logOutUser() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      className="w-full rounded-full bg-red-500 text-white py-2 font-medium hover:bg-opacity-70 transition duration-300"
      onClick={logOutUser}
    >
      Log out
    </button>
  );
}
