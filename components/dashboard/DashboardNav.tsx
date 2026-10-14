"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const navigation = [
  {
    label: "Sales Overview",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M4 19V12M10 19V5M16 19V9M22 19V3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function DashboardNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Mobile navigation */}
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            {navigation[0].icon}
          </span>
          <span className="truncate text-sm font-bold text-slate-900">
            Sales Intelligence
          </span>
        </Link>

        <LogoutButton />
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 md:flex">
        <Link href="/" className="flex items-center gap-3 px-6 py-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30">
            {navigation[0].icon}
          </span>
          <span>
            <span className="block text-base font-bold tracking-tight text-white">
              Sales Intelligence
            </span>
            <span className="mt-0.5 block text-xs text-slate-400">
              Analytics workspace
            </span>
          </span>
        </Link>

        <div className="px-4 pt-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Workspace
          </p>

          <nav aria-label="Main navigation" className="space-y-1.5">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-950/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-800 p-4">
          <div className="mb-4 rounded-xl bg-slate-900 p-3">
            <p className="text-xs font-medium text-slate-300">
              Analytics Dashboard
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Sales performance and product insights
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile section navigation */}
      <nav
        aria-label="Main navigation"
        className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 md:hidden"
      >
        {navigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
