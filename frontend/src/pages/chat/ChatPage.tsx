import { ROUTE_PATHS } from "@/routes/Routes";
import React, { useState } from "react";
import { FaUser, FaRobot, FaTrash, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { chat } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface Message {
  sender: string;
  text: string;
}

interface Props {}

const ChatPage = (props: Props) => {
  const { isLoggedIn } = useAuth();
  
  const [conversations, setConversations] = useState<
    { id: number; title: string; messages: Message[] }[]
  >([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // get current conversation
  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  );

  // send messages
  const handleSendMessage = async () => {
    if (!isLoggedIn()) {
      alert("Please log in.");
      return;
    }

    if (!input.trim() || loading) return;
    setLoading(true);

    let updatedConversations = [...conversations];
    let newConversationId = currentConversationId;

    if (currentConversationId === null) {
      // create new conversation
      const newConversation = {
        id: Date.now(),
        title: input.length < 15 ? input : input.substring(0, 15) + "...",
        messages: [{ sender: "user", text: input }],
      };
      updatedConversations.unshift(newConversation);
      newConversationId = newConversation.id;
      setCurrentConversationId(newConversation.id);
    } else {
      // update current conversation
      const index = updatedConversations.findIndex(
        (conv) => conv.id === currentConversationId
      );
      updatedConversations[index].messages.push({
        sender: "user",
        text: input,
      });
    }

    setConversations(updatedConversations);
    setInput("");

    // send api request
    try {
      const response = await chat(input);

      // update conversations
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === newConversationId
            ? { ...conv, messages: [...conv.messages, { sender: "bot", text: response.data }] }
            : conv
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === newConversationId
            ? { ...conv, messages: [...conv.messages, { sender: "bot", text: "Failed to get response. Try again later." }] }
            : conv
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearConversations = () => {
    setConversations([]);
    setCurrentConversationId(null);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] bg-gray-100 overflow-hidden">
      {/* left part: conversation records */}
      <div className="w-64 bg-gray-100 shadow-lg p-4 flex flex-col justify-between">
        <div>
          {/* <h1 className="text-x1 font-semibold text-blue-600">Chatbot</h1> */}
          <div className="mt-4">
            {conversations.length === 0 ? (
              <p className="text-gray-500">No conversations</p>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setCurrentConversationId(conv.id)}
                  className={`w-full flex items-center px-4 py-2 my-1 text-left rounded-lg ${
                    currentConversationId === conv.id
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {conv.title}
                </button>
              ))
            )}
          </div>
        </div>

        {/* bottom: clear & return to homepage */}
        <div>
          <button
            onClick={handleClearConversations}
            className="w-full flex items-center px-4 py-2 my-1 text-left rounded-lg hover:bg-gray-100"
          >
            <FaTrash className="mr-2" />
            Clear Chats
          </button>
          <button
            onClick={() => navigate(ROUTE_PATHS.HOME)}
            className="w-full flex items-center px-4 py-2 my-1 text-left rounded-lg hover:bg-gray-100"
          >
            <FaHome className="mr-2" />
            Homepage
          </button>
        </div>
      </div>

      {/* right part: conversation window */}
      <div className="flex flex-col flex-1 h-[calc(100vh-56px)]">
        {/* top: title */}
        {/* conversation content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {currentConversation ? (
            currentConversation.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* bot avatar */}
                {msg.sender === "bot" && (
                  <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <FaRobot className="w-4 h-4" />
                  </div>
                )}

                {/* bubble */}
                <div
                  className={`max-w-md px-4 py-2 rounded-xl bg-gray-300 text-black}`}
                >
                  {msg.text}
                </div>

                {/* user avatar */}
                {msg.sender === "user" && (
                  <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center ml-2">
                    <FaUser className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Start a new conversation...
            </p>
          )}
        </div>

        {/* bottom: input */}
        <div className="flex w-full bg-gray-100 p-4 border-t border-gray-300 shadow-md">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-h-[40px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-[#6782B8] hover:bg-[#769fcd] text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
