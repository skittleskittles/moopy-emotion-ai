interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[400px] relative shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-[#5B78C7]">
          {title}
        </h2>
        <p className="text-center mt-4 text-gray-600">{message}</p>

        <div className="flex justify-around mt-8">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-md bg-[#6782B8] text-white hover:bg-[#769fcd]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
