interface EmployeeWorkloadData {
  employeeName: string;
  taskCount: number;
}

interface Props {
  data: EmployeeWorkloadData[];
}

export default function EmployeeWorkloadChart({ data }: Props) {
  const maxTasks = Math.max(...data.map((d) => d.taskCount));

  return (
    <div className="space-y-4">
      {data.map((employee, index) => {
        const percentage = (employee.taskCount / maxTasks) * 100;

        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {employee.employeeName}
              </span>
              <span className="text-sm text-gray-600">{employee.taskCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8">
              <div
                className="bg-red-600 h-8 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}