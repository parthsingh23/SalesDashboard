"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

interface DashboardNavProps {
  userName: string;
  role: string;
}

export default function DashboardNav({ userName, role }: DashboardNavProps) {
  const pathname = usePathname();

  const links = [
    { label: "Sales Overview", href: "/" },
    { label: "Products", href: "/products" },
  ];

  return (
    <header className="mb-8 rounded-xl bg-slate-950 text-white shadow-lg">
      <nav
        aria-label="Main navigation"
        className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Sales Intelligence home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-lg font-bold">
              S
            </span>

            <span className="text-lg font-bold tracking-tight">
              Sales Intelligence
            </span>
          </Link>

          <div
            aria-label="Dashboard sections"
            className="flex flex-wrap items-center gap-2"
          >
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-500 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="min-w-0">
            <p className="max-w-48 truncate text-sm font-semibold text-white">
              {userName}
            </p>
            <p className="text-xs capitalize text-slate-400">{role}</p>
          </div>

          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
