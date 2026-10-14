"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create your account.");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d1b] px-4 py-10 text-white sm:px-6">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1426]/90 shadow-2xl shadow-black/30 md:grid-cols-2">
        <section className="hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-indigo-500/15 via-[#101a32] to-[#0d1426] p-10 md:flex lg:p-14">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-lg font-bold shadow-lg shadow-indigo-500/25">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Sales<span className="text-indigo-400">Analytics</span>
            </span>
          </Link>

          <div className="py-12">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Start with the data
            </p>
            <h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">
              Make every sales decision count.
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Create your account to explore revenue trends, product
              performance, and business insights in one place.
            </p>

            <div className="mt-10 space-y-4 text-sm text-slate-300">
              <p className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                  1
                </span>
                Explore your sales performance
              </p>
              <p className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                  2
                </span>
                Discover product level insights
              </p>
              <p className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                  3
                </span>
                Make informed decisions
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500">Sales Analytics Dashboard</p>
        </section>

        <section className="p-6 sm:p-10 lg:p-14">
          <Link href="/" className="mb-10 flex items-center gap-3 md:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 font-bold">
              S
            </span>
            <span className="font-semibold">
              Sales<span className="text-indigo-400">Analytics</span>
            </span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-indigo-300">
              Get started
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Create your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Enter your details to get started with Sales Analytics.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-[#080d1b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#080d1b] px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-3 text-xs font-medium text-slate-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Use at least 6 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter your password again"
                required
                className="w-full rounded-xl border border-white/10 bg-[#080d1b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-300 hover:text-indigo-200"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-8 text-center text-xs leading-5 text-slate-500">
            Your account access is managed securely by the application.
          </p>
        </section>
      </div>
    </main>
  );
}
