import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaExpand } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { getClientDetail } from "@/services/api";
import { ClientDetailVo } from "@/models/ClientDetail";
import { ClientChatHistory } from "../../components/dashboard/ChatHistory";
import { ClientProfileCard } from "../../components/dashboard/ClientProfileCard";
import { ClientMoodTrackerHistory } from "../../components/dashboard/MoodTrackerHistory";
import { ClientSurveyHistory } from "../../components/dashboard/SurveyHistory";
// import { mockMoodRecordList } from "@/models/mockMoodRecordList";
// import { mockSurveyHistory } from "@/models/mockSurveyRecordList";

const ClientDetailPage = () => {
  const location = useLocation();
  const clientId = location.state?.clientId;

  const [clientDetail, setClientDetail] = useState<ClientDetailVo | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

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

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-100">
      {/* Top: Two Panels (Client Profile + Score History) */}
      <div className="flex justify-center my-4 min-h-0 h-[28%]">
        <div className="flex gap-5 w-[90%]">
          {/* Profile */}
          <div className="flex flex-1 h-full">
            <ClientProfileCard clientDetail={clientDetail} />
          </div>

          <div className="flex-1 h-full">
            <div className="bg-white shadow-lg rounded-xl p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-primary">
                  Self-Evaluation History
                </h3>
                <button
                  onClick={() => setShowSurveyModal(true)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Expand"
                >
                  <FaExpand />
                </button>
              </div>

              <div className="flex flex-1 flex-col min-h-0 bg-gray-100 rounded-lg p-2">
                <ClientSurveyHistory
                  scoreHistory={clientDetail.surveyHistoryList}
                  expanded={showSurveyModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Two Panels (Chat History + Mood History) */}
      <div className="flex flex-1 justify-center mb-4 min-h-0">
        <div className="flex gap-5 w-[90%]">
          {/* Chat History Thumbnail */}
          <div className="flex flex-col flex-1 bg-white shadow-lg rounded-xl p-4 relative">
            {/* Title Bar */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-primary">
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
            <div className="flex flex-1 flex-col min-h-0 bg-gray-100 rounded-lg p-4">
              <ClientChatHistory
                conversations={clientDetail.conversationList}
              />
            </div>
          </div>

          {/* Mood Tracker Thumbnail */}
          <div className="flex flex-col flex-1 min-w-[320px] bg-white shadow-lg rounded-xl p-4 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-primary">
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
            <div className="flex flex-1 flex-col min-h-0 bg-gray-100 rounded-lg p-4">
              <ClientMoodTrackerHistory
                moodRecordList={clientDetail.moodRecordList}
                expanded={showMoodModal}
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
            <h2 className="text-2xl font-bold text-primary mb-4">
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
            <h2 className="text-2xl font-bold text-primary mb-4">
              Mood Tracker
            </h2>

            <div className="h-full bg-gray-100 rounded-lg p-4 overflow-auto">
              <ClientMoodTrackerHistory
                moodRecordList={clientDetail.moodRecordList}
                expanded={showMoodModal}
              />
            </div>
          </div>
        </div>
      )}

      {/* Score Modal */}
      {showSurveyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-4/5 h-4/5 overflow-auto relative">
            <button
              onClick={() => setShowSurveyModal(false)}
              className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Self-Evaluation History
            </h2>
            <div className="h-full overflow-auto">
              <ClientSurveyHistory
                scoreHistory={clientDetail.surveyHistoryList}
                expanded={showSurveyModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetailPage;
