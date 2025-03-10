import { ROUTE_PATHS } from "@/routes/Routes";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaUser, FaRobot, FaTrash, FaHome, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { chat, getChatList, saveChatMessage } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface Message {
  sender: string;
  text: string;
}

interface Conversation {
  id: number | null;
  title: string;
  messages: Message[];
}

interface Props {}

const ChatPage = (props: Props) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // 让输入框支持自动 focus

  // const location = useLocation(); // receive first message
  // const initialBotMessage = (location.state as { botMessage?: string })
  //   ?.botMessage;
  //   const botMessageSavedRef = useRef(false);

  const [conversations, setConversations] = useState<
    Record<string, Conversation[]>
  >({});
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Get chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!isLoggedIn() || !user) return;

      try {
        const response = await getChatList(user.id);
        if (response.code === 0 && Array.isArray(response.data)) {
          const formattedConversations = formatChatData(response.data);
          setConversations(formattedConversations);

          const latestDate = Object.keys(formattedConversations)
            .sort()
            .reverse()[0]; // Get the latest date
          if (latestDate && formattedConversations[latestDate].length > 0) {
            setCurrentConversationId(formattedConversations[latestDate][0].id);
            setTimeout(() => {
              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop =
                  chatContainerRef.current.scrollHeight;
              }
            }, 100);
          }
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [user]);

  // 监听 currentConversationId 变化，如果是新对话，自动 focus 到输入框
  useEffect(() => {
    if (currentConversationId === null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentConversationId]);

  // useEffect(() => {
  //   if (initialBotMessage && !botMessageSavedRef.current) {
  //     handleSaveBotMessage(initialBotMessage);
  //     botMessageSavedRef.current = true; // 标记为已执行
  //   }
  // }, [initialBotMessage]);

  // 存储 `botMessage` 并获取 `conversationId`
  // const handleSaveBotMessage = async (message: string) => {
  //   console.log("save!!");
  //   if (!isLoggedIn() || !user) return;

  //   try {
  //     const response = await saveChatMessage(0, message);

  //     if (response.code === 0 && response.data) {
  //       const conversationIdFromApi = response.data; // 后端返回的 conversationId

  //       const newConversation = {
  //         id: conversationIdFromApi,
  //         title: message.substring(0, 15) + "...",
  //         messages: [{ sender: "bot", text: message }],
  //       };

  //       setConversations([newConversation, ...conversations]);
  //       setCurrentConversationId(conversationIdFromApi);
  //     }
  //   } catch (error) {
  //     console.error("Error saving initial bot message:", error);
  //   }
  // };

  const formatChatData = (chatData: any[]) => {
    const groupedConversations: Record<string, Conversation[]> = {};

    chatData.forEach((conversation) => {
      if (conversation.messageList.length === 0) return;

      const firstMessage = conversation.messageList[0];
      const date = new Date(firstMessage.createdAt).toISOString().split("T")[0]; // Extract YYYY-MM-DD

      if (!groupedConversations[date]) {
        groupedConversations[date] = [];
      }

      groupedConversations[date].push({
        id: conversation.conversationId,
        title: firstMessage.message.substring(0, 15) + "...",
        messages: conversation.messageList.map((msg: any) => ({
          sender: msg.userId === user!.id ? "user" : "bot",
          text: msg.message,
        })),
      });
    });

    return groupedConversations;
  };

  // select conversation session (left)
  const handleSelectConversation = (conversationId: number) => {
    setCurrentConversationId(conversationId);
    setInput(""); // 切换时清空输入框
  };

  // get current conversation
  const currentConversation = Object.values(conversations)
    .flat() // Flatten to get all conversations
    .find((conv) => conv.id === currentConversationId);

  const handleNewConversation = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const newConversation: Conversation = {
      id: null,
      title: "New Conversation",
      messages: [],
    };

    setConversations((prev) => ({
      ...prev,
      [today]: prev[today]
        ? [newConversation, ...prev[today]]
        : [newConversation],
    }));

    setCurrentConversationId(null);
  };

  // send messages
  const handleSendMessage = async () => {
    if (!isLoggedIn() || !user || !user.id) {
      alert("Please log in.");
      return;
    }

    if (!input.trim() || loading) return;
    setLoading(true);

    const today = new Date().toISOString().split("T")[0]; // Get today's date
    let conversationId = currentConversationId;
    let tempConversationId = Date.now();

    setConversations((prev) => {
      let updatedConversations = { ...prev };

      if (currentConversationId === null) {
        // Create a new conversation under today's date
        const newConversation = {
          id: tempConversationId,
          title: input.length < 15 ? input : input.substring(0, 15) + "...",
          messages: [{ sender: "user", text: input }],
        };

        updatedConversations[today] = updatedConversations[today]
          ? [newConversation, ...updatedConversations[today]]
          : [newConversation];

        conversationId = tempConversationId;
        setCurrentConversationId(tempConversationId);
      } else {
        // Find the conversation and add a message
        Object.keys(updatedConversations).forEach((date) => {
          updatedConversations[date] = updatedConversations[date].map((conv) =>
            conv.id === currentConversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, { sender: "user", text: input }],
                }
              : conv
          );
        });
      }

      return updatedConversations;
    });

    setInput("");

    // send api request
    try {
      const requestData: {
        message: string;
        userId: number;
        conversationId?: number;
      } = {
        message: input,
        userId: user.id,
      };
      if (currentConversationId !== null) {
        requestData.conversationId = currentConversationId;
      }

      const response = await chat(requestData);

      if (response.code === 0 && response.data) {
        const botMessage = response.data.message;
        const conversationIdFromApi = response.data.conversationId;

        // update conversations

        setConversations((prev) => {
          let updatedConversations = { ...prev };

          Object.keys(updatedConversations).forEach((date) => {
            updatedConversations[date] = updatedConversations[date].map(
              (conv) =>
                conv.id === conversationId
                  ? {
                      ...conv,
                      id: conversationIdFromApi, // 更新 conversationId
                      messages: [
                        ...conv.messages,
                        { sender: "bot", text: botMessage },
                      ],
                    }
                  : conv
            );
          });

          return updatedConversations;
        });

        // update conversationId
        setCurrentConversationId(conversationIdFromApi);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setConversations((prev) => {
        let updatedConversations = { ...prev };

        Object.keys(updatedConversations).forEach((date) => {
          updatedConversations[date] = updatedConversations[date].map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [
                    ...conv.messages,
                    {
                      sender: "bot",
                      text: "Failed to get response. Try again later.",
                    },
                  ],
                }
              : conv
          );
        });

        return updatedConversations;
      });
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
          <div className="mt-4 overflow-y-auto max-h-[calc(100vh-200px)] space-y-2">
            {Object.entries(conversations).length === 0 ? (
              <p className="text-gray-500">No conversations</p>
            ) : (
              Object.entries(conversations).map(([date, convs]) => (
                <div key={date}>
                  {/* Date Header */}
                  <p className="text-gray-500 text-sm font-semibold mt-2 mb-1">
                    {date}
                  </p>

                  {/* Conversations for this date */}
                  {convs.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv.id!)}
                      className={`w-full flex items-center px-4 py-2 my-1 text-left rounded-lg ${
                        currentConversationId === conv.id
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {conv.title}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* bottom: new & clear & return to homepage */}
        <div>
          <button
            onClick={handleNewConversation}
            className="w-full flex items-center px-4 py-2 my-1 text-left rounded-lg hover:bg-gray-100"
          >
            <FaPlus className="mr-2" />
            New Conversation
          </button>
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
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
        >
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
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        return !inline ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language="javascript"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-gray-200 p-1 rounded" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
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
            <p className="text-2xl font-semibold text-center text-[#393e46] mt-10 px-6">
              Hi! I’m <span className="text-[#6782B8]">Moopy</span>, your AI
              Mood Companion. How can I support you today?{" "}
              <span className="text-yellow-500 text-3xl">😊</span>
            </p>
          )}
        </div>

        {/* bottom: input */}
        <div className="flex w-full bg-gray-100 p-4 border-t border-gray-300 shadow-md">
          <input
            type="text"
            ref={inputRef}
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
