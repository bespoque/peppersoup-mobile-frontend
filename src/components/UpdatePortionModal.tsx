import React, { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";
import { usePortionSizes } from "@/src/context/PortionSizesContext";

interface UpdatePortionModalProps {
  portionId: number | null;
  initialName: string;
  initialAmount: string;
  onClose: () => void;
}

const UpdatePortionModal: React.FC<UpdatePortionModalProps> = ({
  portionId,
  initialName,
  initialAmount,
  onClose,
}) => {
  const [name, setName] = useState(initialName);
  const [amount, setAmount] = useState(initialAmount);
  const { request, loading, error } = useApi();
  const { refreshPortionSize } = usePortionSizes();

  useEffect(() => {
    setName(initialName);
    setAmount(initialAmount);
  }, [initialName, initialAmount]);

  const handleUpdatPortion = async () => {
    if (!portionId) return;

    const payload = {
      id: portionId,
      name,
      amount,
    };

    try {
      await request(
        `/api/core/kitchen-operations/portion-size/edit`,
        "POST",
        {},
        payload
      );
      onClose();
      refreshPortionSize();
    } catch (err) {
      console.error("Failed to update category", err);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Update Portion</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter category title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Amount"
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-paleGreen px-4 py-2 rounded"
            onClick={handleUpdatPortion}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePortionModal;
