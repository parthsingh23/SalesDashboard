import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({
  title,
  description,
  action,
  children,
}: ChartCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
