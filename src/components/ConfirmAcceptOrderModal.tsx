import { FC } from "react";

interface ConfirmAcceptOrderModalProps {
  orderId: number;
  onConfirm: () => void;
  onCancel: () => void;
  isOngoingOrder: boolean;
  loading: boolean;
}

const ConfirmAcceptOrderModal: FC<ConfirmAcceptOrderModalProps> = ({
  onConfirm,
  onCancel,
  isOngoingOrder,
  loading,
}) => {
    
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        {isOngoingOrder ? (
          <p className="text-lg font-semibold mb-4">
            Do you want to mark as completed order?
          </p>
        ) : (
          <p className="text-lg font-semibold mb-4">
            Do you want to accept this order?
          </p>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {loading ? "Processing..." : "Yes, Continue"}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAcceptOrderModal;
