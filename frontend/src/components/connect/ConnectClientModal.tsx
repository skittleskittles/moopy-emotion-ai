import { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface ConnectClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (clientCode: string) => void;
  errorMessage?: string;
  onInputChange?: () => void;
}

export const ConnectClientModal = ({
  isOpen,
  onClose,
  onConnect,
  errorMessage,
  onInputChange,
}: ConnectClientModalProps) => {
  const [clientCode, setClientCode] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setClientCode(""); // 每次打开或关闭时清空
      setLocalError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = () => {
    if (!clientCode.trim()) {
      setLocalError("Please enter a valid Client Code.");
      return;
    }
    onConnect(clientCode);
    setClientCode("");
    setLocalError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientCode(e.target.value);
    if (localError) setLocalError(""); // 用户输入时自动清除错误提示
    if (onInputChange) onInputChange();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[400px] relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute right-4 top-4 text-gray-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-center text-2xl font-semibold text-primary">
          Connect with Client
        </h2>

        {/* Input */}
        <div className="mt-6 mb-8">
          <input
            type="text"
            placeholder="Please Input Client’s Code..."
            value={clientCode}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#5B78C7] focus:outline-none"
          />
        </div>

        {(localError || errorMessage) && (
          <div className="text-red-500 text-sm text-center mb-4">
            {localError || errorMessage}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-around">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConnect}>Connect</Button>
        </div>
      </div>
    </div>
  );
};
