import React, { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";
import { useTags } from "@/src/context/TagsContext";

interface UpdateTagModalProps {
  tagId: number | null;
  initialName: string;
  onClose: () => void;
}

const UpdateTagModal: React.FC<UpdateTagModalProps> = ({
  tagId,
  initialName,
  onClose,
}) => {
  const [name, setName] = useState(initialName);
  const { request, loading, error } = useApi();
  const { refreshTags } = useTags();

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleUpdateTag = async () => {
    if (!tagId) return;

    const payload = {
      id: tagId,
      name,
    };

    try {
      await request(
        `/api/core/kitchen-operations/tag/edit`,
        "POST",
        {},
        payload
      );
      onClose();
      refreshTags();
    } catch (err) {
      console.error("Failed to update category", err);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Update Tag</h3>

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
            onClick={handleUpdateTag}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTagModal;
