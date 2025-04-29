import { useState } from "react";
import copyIcon from "../../assets/copy.png";
import checkIcon from "../../assets/check.png";

type CopyButtonProps = {
  text: string;
};

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.top = "-1000px"; // Move off screen
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 hover:opacity-80"
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <img
        src={copied ? checkIcon : copyIcon}
        alt={copied ? "Copied" : "Copy"}
        className="w-4 h-4"
      />
    </button>
  );
};
