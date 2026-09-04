"use client";

import { useState } from "react";

interface AdminTestButtonProps {
  role?: string;
}

export default function AdminTestButton({ role }: AdminTestButtonProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (role !== "admin") {
    return null;
  }

  async function handleAdminTest() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/admin-test");
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Admin action failed");
        return;
      }

      setMessage(data.message);
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleAdminTest}
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Checking..." : "Admin Test"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
