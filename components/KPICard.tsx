interface KPICardProps {
  title: string;
  value: string | number;
}

export default function KPICard({ title, value }: KPICardProps) {
  return (
    <article className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md hover:shadow-slate-200/60 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h2
        title={String(value)}
        className="mt-3 break-words text-2xl font-bold leading-tight tracking-tight text-slate-900 [overflow-wrap:anywhere] sm:text-3xl"
      >
        {value}
      </h2>

      <div className="mt-4 h-px w-full bg-slate-100" />
      <p className="mt-3 text-xs font-medium text-slate-400">
        Selected reporting period
      </p>
    </article>
  );
}
