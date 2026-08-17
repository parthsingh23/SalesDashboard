interface KPICardProps {
    title: string;
    value: string | number;
}

export default function KPICard({
    title,
    value,
}: KPICardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
                {title}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {value}
            </h2>
        </div>
    );
}