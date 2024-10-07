import React, { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";
import { useSides } from "@/src/context/SidesContext";

interface UpdateSideModalProps {
  sideId: number | null;
  initialName: string;
  initialAmount: string;
  onClose: () => void;
}

const UpdateSideModal: React.FC<UpdateSideModalProps> = ({
  sideId,
  initialName,
  initialAmount,
  onClose,
}) => {
  const [name, setName] = useState(initialName);
  const [amount, setAmount] = useState(initialAmount);
  const { request, loading, error } = useApi();
  const { refreshSides } = useSides();

  useEffect(() => {
    setName(initialName);
    setAmount(initialAmount);
  }, [initialName, initialAmount]);

  const handleUpdateSide = async () => {
    if (!sideId) return;

    const payload = {
      id: sideId,
      name,
      amount,
    };

    try {
      await request(
        `/api/core/kitchen-operations/item-sides/edit`,
        "POST",
        {},
        payload
      );
      onClose();
      refreshSides();
    } catch (err) {
      console.error("Failed to update category", err);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Update Side</h3>

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
            placeholder="Enter category description"
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
            onClick={handleUpdateSide}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSideModal;
