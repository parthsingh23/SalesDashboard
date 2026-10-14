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
    <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/40 sm:p-6">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm leading-5 text-slate-500">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="flex max-w-full flex-wrap items-center gap-2 sm:shrink-0">
            {action}
          </div>
        )}
      </div>

      <div className="mt-5 min-w-0 sm:mt-6">{children}</div>
    </section>
  );
}
