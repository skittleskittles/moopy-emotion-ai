import { useEffect, useRef, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ConversationVo } from "@/models/ClientDetail";

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

  // const formatDate = (utcString: string) => {
  //   const date = new Date(utcString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });
  // };

  return (
    <div className="flex flex-1 min-h-0">
      {/* Left sidebar: conversation list */}
      <div className="w-[25%] bg-gray-100 rounded-lg overflow-y-auto pl-0 p-2">
        {conversations.length === 0 ? (
          <p className="text-gray-500">No conversations available</p>
        ) : (
          conversations.map((conv) => {
            const firstMsg = conv.messageList[0]?.message || "No messages";
            const title =
              firstMsg.length > 15
                ? firstMsg.substring(0, 15) + "..."
                : firstMsg;

            return (
              <button
                key={conv.conversationId}
                onClick={() => setCurrentConversationId(conv.conversationId)}
                className={`w-full text-left px-4 py-2 my-1 rounded-lg break-words ${
                  currentConversationId === conv.conversationId
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                {title}
              </button>
            );
          })
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
