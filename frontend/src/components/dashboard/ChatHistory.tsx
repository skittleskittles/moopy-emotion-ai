import { useEffect, useRef, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ConversationVo } from "@/models/ClientDetail";
import { format } from "date-fns";

interface ClientChatHistoryProps {
  conversations: ConversationVo[];
}

export const ClientChatHistory = ({
  conversations,
}: ClientChatHistoryProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [currentConversationId]);

  useEffect(() => {
    if (conversations.length > 0 && currentConversationId === null) {
      setCurrentConversationId(conversations[0].conversationId);
    }
  }, [conversations]);

  const currentConversation = conversations.find(
    (conv) => conv.conversationId === currentConversationId
  );

  const formatDate = (utcString: string) => {
    const date = new Date(utcString);
    return format(date, "MM/dd/yyyy");
  };

  const groupedConversations: Record<string, ConversationVo[]> = {};

  conversations.forEach((conv) => {
    const dateKey = conv.messageList[0]?.createdAt
      ? formatDate(conv.messageList[0].createdAt)
      : "Unknown";

    if (!groupedConversations[dateKey]) {
      groupedConversations[dateKey] = [];
    }
    groupedConversations[dateKey].push(conv);
  });

  return (
    <div className="flex flex-1 min-h-0">
      {/* Left sidebar: grouped by date */}
      <div className="w-[25%] bg-gray-100 rounded-lg overflow-y-auto pl-0 p-2">
        {Object.keys(groupedConversations).length === 0 ? (
          <p className="text-gray-500">No conversations available</p>
        ) : (
          Object.entries(groupedConversations)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, convs]) => (
              <div key={date}>
                <p className="text-sm text-gray-500 font-semibold mt-3 mb-1">
                  {date}
                </p>
                {convs.map((conv) => {
                  const firstMsg =
                    conv.messageList[0]?.message || "No messages";
                  const title =
                    firstMsg.length > 25
                      ? firstMsg.slice(0, 25) + "..."
                      : firstMsg;
                  return (
                    <button
                      key={conv.conversationId}
                      onClick={() =>
                        setCurrentConversationId(conv.conversationId)
                      }
                      className={`w-full text-left px-4 py-2 my-1 rounded-lg break-words text-sm ${
                        currentConversationId === conv.conversationId
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            ))
        )}
      </div>

      {/* Right chat panel */}
      <div className="flex flex-col flex-1 min-h-0 bg-white p-4 rounded-r-lg">
        {/* Chat content scrollable */}
        <div
          className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto"
          ref={chatContainerRef}
        >
          {currentConversation ? (
            currentConversation.messageList.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 1 ? "justify-end" : "justify-start"
                }`}
              >
                {/* Bot avatar */}
                {msg.sender === 0 && (
                  <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <FaRobot className="w-4 h-4" />
                  </div>
                )}

                {/* Message bubble */}
                <div className="flex items-center space-x-2 max-w-[70%] px-4 py-2 rounded-xl bg-gray-300 text-black">
                  <div className="break-words">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.message.replace(/\n/g, "  \n")}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* User avatar */}
                {msg.sender === 1 && (
                  <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center ml-2">
                    <FaUser className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No conversation selected
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
