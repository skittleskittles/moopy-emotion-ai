import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaExpand } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { getClientDetail } from "@/services/api";
import { ClientDetailVo } from "@/models/ClientDetail";
import { ClientChatHistory } from "./ClientChatHistory";
import { ClientProfileCard } from "./ClientProfileCard";
import { ClientMoodTrackerHistory } from "./ClientMoodTrackerHistory";
import { mockMoodRecordList } from "@/models/mockMoodRecordList";

const ClientDetailPage = () => {
  const location = useLocation();
  const clientId = location.state?.clientId;

  const [clientDetail, setClientDetail] = useState<ClientDetailVo | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchClientDetail = async () => {
      if (!isLoggedIn() || !user) return;

      try {
        const res = await getClientDetail(user.id, clientId);
        if (res.code === 0) {
          setClientDetail(res.data);
        } else {
          console.error("Failed to fetch client detail");
        }
      } catch (error) {
        console.error("Error fetching client detail:", error);
      }
    };

    fetchClientDetail();
  }, [user, clientId]);

  if (!clientId) {
    return <div className="text-center mt-10 text-red-500">Invalid Access</div>;
  }

  if (!clientDetail) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-100">
      {/* Top: Client Profile */}
      <ClientProfileCard clientDetail={clientDetail} />

      {/* Bottom: Two Panels */}
      <div className="flex flex-1 justify-center mx-10  min-h-0">
        <div className="flex gap-6 w-4/5 mx-10 mb-8 min-h-0">
          {/* Chat History Thumbnail */}
          <div className="flex flex-col flex-1 bg-white shadow-lg rounded-xl p-4 relative">
            {/* Title Bar */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-[#6782B8]">
                Chats Records
              </h3>
              <button
                onClick={() => setShowChatModal(true)}
                className="text-gray-500 hover:text-gray-700"
                title="Expand"
              >
                <FaExpand />
              </button>
            </div>
            {/* Chat History Preview */}
            <div className="flex flex-1 flex-col min-h-0 bg-gray-100  rounded-lg p-4">
              <ClientChatHistory
                conversations={clientDetail.conversationList}
              />
            </div>
          </div>

          {/* Mood Tracker Thumbnail */}
          <div className="flex flex-col flex-1 min-w-[320px] bg-white shadow-lg rounded-xl p-4 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#6782B8]">
                Mood Tracker
              </h3>
              <button
                onClick={() => setShowMoodModal(true)}
                className="text-gray-500 hover:text-gray-700"
                title="Expand"
              >
                <FaExpand />
              </button>
            </div>
            {/* Mood Tracker Preview */}
            <div className="flex flex-1 flex-col min-h-0 bg-gray-100  rounded-lg p-4">
              <ClientMoodTrackerHistory
                // moodRecordList={clientDetail.moodRecordList}
                moodRecordList={mockMoodRecordList}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col bg-white rounded-xl p-6 w-4/5 h-4/5 overflow-auto relative">
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-[#6782B8] mb-4">
              Chats Records
            </h2>
            {/* ClientChatHistory Thumbnail */}
            <div className="flex flex-1 flex-col min-h-0 bg-gray-100 rounded-lg p-4 overflow-hidden">
              <ClientChatHistory
                conversations={clientDetail.conversationList}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mood Modal */}
      {showMoodModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-4/5 h-4/5 overflow-auto relative">
            <button
              onClick={() => setShowMoodModal(false)}
              className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-[#6782B8] mb-4">
              Mood Tracker
            </h2>

            <div className="h-full bg-gray-100 rounded-lg p-4 overflow-auto">
              <ClientMoodTrackerHistory
                // moodRecordList={clientDetail.moodRecordList}
                moodRecordList={mockMoodRecordList}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetailPage;
