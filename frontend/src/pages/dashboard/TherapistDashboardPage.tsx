import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { connectionList, connect, disconnect } from "@/services/api";
import { ConnectionVO, ConnectType } from "@/models/Connection";
import { ConnectClientModal } from "@/components/connect/ConnectClientModal";
import { ConfirmModal } from "@/components/connect/ConfirmModal";
import { toast } from "sonner";
import { ROUTE_PATHS } from "@/routes/Routes";

import { mockConnections } from "@/models/mockClientsList";

const TherapistDashboardPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [connections, setConnections] = useState<ConnectionVO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [connectError, setConnectError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnections = async () => {
      if (!isLoggedIn() || !user) return;

      try {
        const data = await connectionList(user?.id, 0); // 这里 therapistId, clientId 你可以传实际值
        setConnections(data.data);

        // mock data
        // setConnections(mockConnections);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };

    fetchConnections();
  }, [user]);

  const formatDateToPST = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles", // 重点！让它转到PST/PDT
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleConnectClient = async (clientCode: string) => {
    if (!isLoggedIn() || !user) return;

    try {
      const res = await connect(
        user?.userCode,
        clientCode,
        "",
        ConnectType.Therapist_Connect_Client
      );
      if (res.code !== 0) {
        throw new Error("Failed to connect client.");
      }
      setIsModalOpen(false);

      // refresh list
      const data = await connectionList(user.id, 0);
      setConnections(data.data);
    } catch (error: any) {
      setConnectError("Failed to connect client.");
    }
  };

  const handleDeleteClick = (clientId: number) => {
    setSelectedClientId(clientId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDisconnect = async () => {
    if (!isLoggedIn() || !user || selectedClientId === null) return;

    try {
      const res = await disconnect(user.id, selectedClientId);
      if (res.code !== 0) {
        throw new Error(res.msg || "Disconnect failed");
      }

      console.log("Disconnected successfully!");
      toast.success("Disconnected successfully!");

      // refresh list
      const data = await connectionList(user.id, 0);
      setConnections(data.data);

      // 关闭modal
      setIsConfirmModalOpen(false);
      setSelectedClientId(null);
    } catch (error) {
      console.error("Failed to disconnect:", error);
      toast.error("Failed to disconnect. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-[#6782B8]">
            {connections.length} Clients
          </h2>
          <button
            className="bg-[#6782B8] text-white px-4 py-2 rounded hover:bg-[#769fcd]"
            onClick={() => setIsModalOpen(true)}
          >
            Connect with Clients
          </button>
        </div>

        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600">
              <th className="p-2 border-y">CLIENT’S NAME</th>
              <th className="p-2 border-y">JOIN DATE</th>
              <th className="p-2 border-y">LAST ACTIVE DATE</th>
              <th className="p-2 border-y">REMARKS</th>
              <th className="p-2 border-y">OPERATIONS</th>
            </tr>
          </thead>

          <tbody>
            {connections.map((connection, index) => (
              <tr key={index} className="bg-white rounded-md">
                <td className="p-3">{connection.clientName}</td>
                <td className="p-3">
                  {formatDateToPST(connection.connectDate)}
                </td>
                <td className="p-3">
                  {formatDateToPST(connection.lastActiveDate)}
                </td>
                <td className="p-3">{connection.remark}</td> {/* remark */}
                <td className="p-3 flex gap-3">
                  <button
                    className="bg-[#6782B8] text-white px-4 py-1 rounded hover:bg-[#769fcd]"
                    onClick={() =>
                      navigate(ROUTE_PATHS.THERAPIST_DASHBOARD_CLIENT_DETIAL, {
                        state: { clientId: connection.clientId },
                      })
                    }
                  >
                    Details
                  </button>
                  <button
                    className="bg-[#D3D3D3] text-white px-4 py-1 rounded hover:bg-[#B0B0B0]"
                    onClick={() => handleDeleteClick(connection.clientId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Connect Modal */}
      <ConnectClientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setConnectError("");
        }}
        onConnect={handleConnectClient}
        errorMessage={connectError}
        onInputChange={() => setConnectError("")}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Disconnect Client"
        message="Are you sure you want to disconnect this client?"
        onConfirm={handleConfirmDisconnect}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setSelectedClientId(null);
        }}
      />
    </div>
  );
};

export default TherapistDashboardPage;
