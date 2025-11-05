interface StatCardProps {
  title: string;
  value: number;
  bgColor: string;
}

export default function StatCard({ title, value, bgColor }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-center`}>
      <h3 className="text-6xl font-bold text-red-600 mb-2">{value}</h3>
      <p className="text-sm font-medium text-gray-700 uppercase">{title}</p>
    </div>
  );
}