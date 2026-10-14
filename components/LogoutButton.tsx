"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  function handleLogout() {
    signOut({
      callbackUrl: `${window.location.origin}/login`,
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:border-slate-700 md:bg-slate-900 md:text-slate-300 md:hover:border-red-900 md:hover:bg-red-950 md:hover:text-red-300 md:focus-visible:ring-offset-slate-950"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-4 w-4"
      >
        <path
          d="M10 17l5-5-5-5M15 12H3m9-8h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Logout
    </button>
  );
}
