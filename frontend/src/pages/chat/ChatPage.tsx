import { ROUTE_PATHS } from "@/routes/Routes";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaUser, FaRobot, FaTrash, FaHome, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { chat, getChatList } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface Message {
  sender: string;
  text: string;
  loading: boolean;
}

interface Conversation {
  id: number | null;
  title: string;
  messages: Message[];
}

interface Props {}

const ChatPage = (_: Props) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // 让输入框支持自动 focus

  const location = useLocation();
  const jumpFromSurvey = location.state?.fromSurvey || false;

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

          if (jumpFromSurvey) {
            const latestDate = Object.keys(formattedConversations)
              .sort()
              .reverse()[0]; // Get the latest date
            if (latestDate && formattedConversations[latestDate].length > 0) {
              setCurrentConversationId(
                formattedConversations[latestDate][0].id
              );
              setTimeout(() => {
                if (chatContainerRef.current) {
                  chatContainerRef.current.scrollTop =
                    chatContainerRef.current.scrollHeight;
                }
              }, 100);
            }
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

  // 监听 conversations 变化，每次有变更滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current!.scrollTop =
          chatContainerRef.current!.scrollHeight;
      }, 100); // 确保在DOM更新后执行
    }
  }, [conversations]);

  const formatToLocalDate = (utcString: string) => {
    const date = new Date(utcString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatChatData = (chatData: any[]) => {
    const groupedConversations: Record<string, Conversation[]> = {};

    chatData.forEach((conversation) => {
      if (conversation.messageList.length === 0) return;

      const firstMessage = conversation.messageList[0];
      const date = formatToLocalDate(firstMessage.createdAt);

      if (!groupedConversations[date]) {
        groupedConversations[date] = [];
      }

      groupedConversations[date].push({
        id: conversation.conversationId,
        title:
          firstMessage.message.length < 20
            ? firstMessage.message
            : firstMessage.message.substring(0, 20) + "...",
        messages: conversation.messageList.map((msg: any) => ({
          sender: msg.sender === 1 ? "user" : "bot",
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
    const today = formatToLocalDate(new Date().toISOString()); // Get today's date

    let existingNullConversation = conversations[today]?.find(
      (conv) => conv.id === null
    );
    if (existingNullConversation) {
      setCurrentConversationId(existingNullConversation.id);
      return;
    }

    const newConversation: Conversation = {
      id: null,
      title: "New Conversation",
      messages: [],
    };

    setConversations((prev) => {
      let updatedConversations = { ...prev };

      // 插入新的会话
      updatedConversations[today] = updatedConversations[today]
        ? [newConversation, ...updatedConversations[today]]
        : [newConversation];

      // 对 updatedConversations 的 keys（日期）进行排序（从最新到最旧）
      const sortedConversations = Object.fromEntries(
        Object.entries(updatedConversations).sort(([dateA], [dateB]) =>
          dateB.localeCompare(dateA)
        )
      );

      return sortedConversations;
    });

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

    const today = formatToLocalDate(new Date().toISOString()); // Get today's date
    let conversationId = currentConversationId;
    let tempConversationId = Date.now();
    let updatedConversations = { ...conversations };

    let existingNullConversation = updatedConversations[today]?.find(
      (conv) => conv.id === null
    );
    if (currentConversationId === null) {
      if (existingNullConversation) {
        // **如果已有 `id: null` 的对话，修改该对话**
        console.log("existingNullConversation");
        existingNullConversation.id = tempConversationId;
        existingNullConversation.title =
          input.length < 20 ? input : input.substring(0, 20) + "...";
        existingNullConversation.messages.push({
          sender: "user",
          text: input,
          loading: false,
        });
      } else {
        // **否则创建新的对话**
        const newConversation = {
          id: tempConversationId,
          title: input.length < 20 ? input : input.substring(0, 20) + "...",
          messages: [{ sender: "user", text: input, loading: false }],
        };

        updatedConversations[today] = updatedConversations[today]
          ? [newConversation, ...updatedConversations[today]] // **追加到列表**
          : [newConversation];

        updatedConversations = Object.fromEntries(
          Object.entries(updatedConversations).sort(([dateA], [dateB]) =>
            dateB.localeCompare(dateA)
          )
        );
      }
      conversationId = tempConversationId;
      setCurrentConversationId(conversationId);
    } else {
      // Find the conversation and add a message
      Object.keys(updatedConversations).forEach((date) => {
        updatedConversations[date] = updatedConversations[date].map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  { sender: "user", text: input, loading: false },
                ],
              }
            : conv
        );
      });
    }

    // Bot 的 loading 状态
    Object.keys(updatedConversations).forEach((date) => {
      updatedConversations[date] = updatedConversations[date].map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                { sender: "bot", text: "", loading: true }, // Bot 的 loading 状态
              ],
            }
          : conv
      );
    });

    setConversations(updatedConversations);
    setInput("");

    // send api request
    try {
      const requestData: {
        message: string;
        userId: number;
        sender: number;
        conversationId?: number;
      } = {
        message: input,
        userId: user.id,
        sender: 1,
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
                      messages: conv.messages.map((msg) =>
                        msg.loading
                          ? { sender: "bot", text: botMessage, loading: false } // 替换 loading
                          : msg
                      ),
                    }
                  : conv
            );
          });

          return updatedConversations;
        });

        console.log(
          "conversationIdFromApi:",
          conversationIdFromApi,
          "tempConversationId:",
          tempConversationId,
          "currentConversationId:",
          currentConversationId
        );
        // update conversationId
        setTimeout(() => {
          setCurrentConversationId(conversationIdFromApi);
        }, 0);
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
                  messages: conv.messages.map((msg) =>
                    msg.loading
                      ? {
                          sender: "bot",
                          text: "Failed to get response. Try again later.",
                          loading: false,
                        }
                      : msg
                  ),
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
    setConversations({});
    setCurrentConversationId(null);
  };

  return (
    <div className="flex h-[calc(100vh-60px)] bg-gray-100 overflow-hidden">
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
      <div className="flex flex-col flex-1 h-[calc(100vh-60px)]">
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
                  className={`flex items-center space-x-2 max-w-md px-4 py-2 rounded-xl  ${
                    msg.loading ? "bg-gray-300" : "bg-gray-300 text-black"
                  }`}
                >
                  {/* loading */}
                  {msg.loading ? (
                    <div className="flex space-x-2 items-center justify-center">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
                    </div>
                  ) : (
                    // {/* message content */}
                    <div className="break-words">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text.replace(/\n/g, "  \n")}
                      </ReactMarkdown>
                    </div>
                  )}
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
              Hi! I’m <span className="text-primary">Moopy</span>, your AI Mood
              Companion. How are you feeling today?{" "}
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
            placeholder={loading ? "Loading..." : "Type your message..."}
            disabled={loading}
          />
          <Button
            onClick={handleSendMessage}
            className={`ml-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
