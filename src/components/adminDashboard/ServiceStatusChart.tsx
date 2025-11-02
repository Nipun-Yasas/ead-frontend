import type { JSX } from "react";

interface ServiceStatusData {
  status: string;
  count: number;
}

interface Props {
  data: ServiceStatusData[];
}

export default function ServiceStatusChart({ data }: Props) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const getColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return "#DC2626"; // red-600
      case "IN_PROGRESS":
        return "#E5E7EB"; // gray-200
      case "PENDING":
        return "#6B7280"; // gray-500
      default:
        return "#9CA3AF"; // gray-400
    }
  };

  const getPercentage = (count: number) => ((count / total) * 100).toFixed(1);

  return (
    <div className="flex flex-col items-center">
      {/* Donut Chart */}
      <div className="relative w-64 h-64 mb-6">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {data.reduce(
            (acc, item, index) => {
              const percentage = (item.count / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = 100 - acc.offset;

              acc.elements.push(
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={getColor(item.status)}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              );

              acc.offset += percentage;
              return acc;
            },
            { elements: [] as JSX.Element[], offset: 0 }
          ).elements}
        </svg>
      </div>

      {/* Legend */}
      <div className="w-full space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getColor(item.status) }}
              />
              <span className="text-sm font-medium text-gray-700 capitalize">
                {item.status.replace("_", " ")}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {getPercentage(item.count)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}