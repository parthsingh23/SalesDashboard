import type { ReactNode } from "react";

interface DataTableProps {
  headers: ReactNode[];
  children: ReactNode;
}

export default function DataTable({ headers, children }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-900">
        <thead className="border-b border-gray-300">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
