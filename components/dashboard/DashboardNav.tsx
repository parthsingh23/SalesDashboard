import Link from "next/link";

export default function DashboardNav() {
  return (
    <nav className="mb-6 flex items-center gap-4 border-b border-gray-200 pb-4">
      <Link
        href="/"
        className="text-sm font-medium text-gray-700 hover:text-black"
      >
        Sales
      </Link>

      <Link
        href="/products"
        className="text-sm font-medium text-gray-700 hover:text-black"
      >
        Products
      </Link>
    </nav>
  );
}
