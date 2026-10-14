import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5"
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-offset-4"
          aria-label="Sales Analytics home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M4 19V12M10 19V5M16 19V9M22 19V3"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span className="hidden sm:block">
            <span className="block text-sm font-bold tracking-tight text-slate-900">
              Sales Analytics
            </span>
            <span className="block text-xs text-slate-500">
              Business intelligence
            </span>
          </span>
        </Link>

        <div
          aria-label="Dashboard sections"
          className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
        >
          <Link
            href="/"
            className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
          >
            Sales
          </Link>

          <Link
            href="/products"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Products
          </Link>
        </div>
      </div>

      <LogoutButton />
    </nav>
  );
}
