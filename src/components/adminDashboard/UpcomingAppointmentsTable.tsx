interface AppointmentData {
  customerName: string;
  vehicleModel: string;
  serviceType: string;
  appointmentDate: string;
}

interface Props {
  data: AppointmentData[];
}

export default function UpcomingAppointmentsTable({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
              Name
            </th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
              Vehicle
            </th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
              Service
            </th>
            <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((appointment, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-700">
                {appointment.customerName}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {appointment.vehicleModel}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {appointment.serviceType}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}