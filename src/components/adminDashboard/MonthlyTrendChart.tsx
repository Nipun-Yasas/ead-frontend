interface MonthlyTrendData {
  month: string;
  value: number;
}

interface Props {
  data: MonthlyTrendData[];
}

export default function MonthlyTrendChart({ data }: Props) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const height = 300;
  const width = 600;
  const padding = 40;

  const xStep = (width - padding * 2) / (data.length - 1);
  const yScale = (height - padding * 2) / maxValue;

  const points = data
    .map((d, i) => {
      const x = padding + i * xStep;
      const y = height - padding - d.value * yScale;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Grid lines */}
      {[0, 20, 40, 60].map((tick) => (
        <line
          key={tick}
          x1={padding}
          y1={height - padding - tick * yScale}
          x2={width - padding}
          y2={height - padding - tick * yScale}
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      ))}

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke="#DC2626"
        strokeWidth="3"
      />

      {/* Points */}
      {data.map((d, i) => {
        const x = padding + i * xStep;
        const y = height - padding - d.value * yScale;
        return (
          <circle key={i} cx={x} cy={y} r="5" fill="#DC2626" />
        );
      })}

      {/* X-axis labels */}
      {data.map((d, i) => {
        const x = padding + i * xStep;
        return (
          <text
            key={i}
            x={x}
            y={height - padding + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#6B7280"
          >
            {d.month}
          </text>
        );
      })}

      {/* Y-axis ticks */}
      {[0, 20, 40, 60].map((tick) => (
        <text
          key={tick}
          x={padding - 10}
          y={height - padding - tick * yScale + 4}
          textAnchor="end"
          fontSize="12"
          fill="#6B7280"
        >
          {tick}
        </text>
      ))}
    </svg>
  );
}