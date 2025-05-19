import { useEffect, useRef, useState } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function TermsModal({
  isOpen,
  onClose,
  onAgree,
}: TermsModalProps) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const isBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 5;
        setIsScrolledToBottom(isBottom);
        if (isBottom) setShowWarning(false);
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isOpen]);

  const handleAgreeClick = () => {
    if (!isScrolledToBottom) {
      setShowWarning(true);
    } else {
      onAgree();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[600px] max-w-full p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">
          MENTAL HEALTH DISCLAIMER AGREEMENT
        </h2>

        {/* Content (scrollable) */}
        <div
          ref={contentRef}
          className="max-h-80 overflow-y-auto border p-4 text-sm text-gray-700 space-y-4"
        >
          <p>
            Privacy policies can be dense and inaccessible. Sometimes you just
            want your question answered quickly without having to navigate pages
            of text. With this document, we hope to make that easier. We tried
            our best to make our Privacy Policy as easy to navigate and
            understand as possible.
          </p>
          <p>
            This Mental Health Disclaimer Agreement is made and entered into by
            and between the undersigned party User and Moopy. By accessing,
            using, or participating in any mental health-related content,
            services, or resources provided by the Provider, the User agrees to
            the following terms and conditions:
          </p>
          <h3 className="font-semibold">
            1. Not a Substitute for Professional Medical Advice
          </h3>
          <p>
            The information, guidance, and resources provided by the Provider,
            whether through digital platforms, written materials, verbal
            communications, or any other means, are for educational and
            informational purposes only. They are not intended to replace,
            substitute, or serve as a form of professional medical,
            psychological, or psychiatric advice, diagnosis, or treatment.
          </p>
          <h3 className="font-semibold">2. No Therapist-Client Relationship</h3>
          <p>
            Engaging with the Provider’s content or services does not establish
            a therapist-client, doctor-patient, or any other professional
            healthcare relationship. The User acknowledges that the Provider
            does not offer medical diagnoses, prescriptions, or individualized
            treatment plans.
          </p>
          <h3 className="font-semibold">
            3. Seek Professional Help When Needed
          </h3>
          <p>
            The User acknowledges that mental health conditions require
            professional attention from licensed healthcare providers. If the
            User is experiencing severe emotional distress, suicidal thoughts,
            or a mental health crisis, they should immediately seek professional
            help from a licensed mental health practitioner, emergency services,
            or crisis helplines.
          </p>
          <h3 className="font-semibold">4. Limitation of Liability</h3>
          <p>
            The Provider shall not be held liable for any direct, indirect,
            incidental, or consequential damages resulting from the use or
            misuse of any mental health-related content or services. The User
            assumes full responsibility for their own mental and emotional
            well-being.
          </p>
          <h3 className="font-semibold">5. Confidentiality & Privacy</h3>
          <p>
            The Provider does not guarantee confidentiality of any information
            shared in public forums, group discussions, or digital interactions.
            The User should exercise discretion when sharing personal
            information.
          </p>
          <h3 className="font-semibold">6. User Privacy</h3>
          <p>
            To safeguard user privacy, all users will be required to log in
            anonymously.
          </p>
          <h3 className="font-semibold">7. Voluntary Participation</h3>
          <p>
            The User acknowledges that their participation in any mental
            health-related activities, programs, or discussions offered by the
            Provider is completely voluntary and at their own discretion.
          </p>
          <h3 className="font-semibold">8. Agreement to Terms</h3>
          <p>
            By accessing or using the Provider’s mental health resources, the
            User confirms they have read, understood, and agreed to the terms
            outlined in this Agreement. The User acknowledges that they should
            seek independent legal or professional advice if they have concerns
            about this Agreement.
          </p>
        </div>

        {/* Warning */}
        {showWarning && (
          <p className="text-red-500 text-sm text-center mt-2">
            Please scroll down and read the full agreement before continuing.
          </p>
        )}

        {/* Button */}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              isScrolledToBottom
                ? "bg-primary"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleAgreeClick}
          >
            Agree & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
