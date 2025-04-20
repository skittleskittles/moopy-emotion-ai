import React from "react";

const clients = [
  {
    name: "Kylie Grace",
    joinDate: "03/15/2025",
    lastActive: "03/15/2025",
    remarks: "Kylie Grace",
  },
  {
    name: "Robert Stone",
    joinDate: "03/15/2025",
    lastActive: "03/15/2025",
    remarks: "Robert Stone",
  },
  {
    name: "lawyer",
    joinDate: "03/15/2025",
    lastActive: "03/15/2025",
    remarks: "Bryan",
  },
  {
    name: "1234",
    joinDate: "03/15/2025",
    lastActive: "03/15/2025",
    remarks: "Emily",
  },
  {
    name: "Emma",
    joinDate: "03/18/2025",
    lastActive: "03/20/2025",
    remarks: "Emma",
  },
];

const TherapistDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-[#5B78C7]">5 Clients</h2>
          <button className="bg-[#5B78C7] text-white px-4 py-2 rounded hover:bg-[#6d8ee1]">
            Connect with Clients
          </button>
        </div>

        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600">
              <th className="p-2 border-y">CLIENT’S NICKNAME</th>
              <th className="p-2 border-y">JOIN DATE</th>
              <th className="p-2 border-y">LAST ACTIVE DATE</th>
              <th className="p-2 border-y">REMARKS</th>
              <th className="p-2 border-y">OPERATIONS</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client, index) => (
              <tr key={index} className="bg-white rounded-md">
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.joinDate}</td>
                <td className="p-3">{client.lastActive}</td>
                <td className="p-3">{client.remarks}</td>
                <td className="p-3 flex gap-3">
                  <button className="bg-[#9DB6E0] text-white px-4 py-1 rounded hover:bg-[#b0c8f0]">
                    Details
                  </button>
                  <button className="bg-[#9DB6E0] text-white px-4 py-1 rounded hover:bg-[#b0c8f0]">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TherapistDashboardPage;
