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
            onClick={handleLogout}
            className="rounded bg-black px-4 py-2 text-white"
        >
            Logout
        </button>
    );
}