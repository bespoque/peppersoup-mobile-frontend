import React, { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";
import { useCategories } from "@/src/context/CategoriesContext";

interface UpdateCategoryModalProps {
  categoryId: number | null;
  initialTitle: string;
  initialDesc: string;
  onClose: () => void;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  categoryId,
  initialTitle,
  initialDesc,
  onClose,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [desc, setDesc] = useState(initialDesc);
  const { request, loading, error } = useApi();
  const { refreshCategories } = useCategories();

  useEffect(() => {
    setTitle(initialTitle);
    setDesc(initialDesc);
  }, [initialTitle, initialDesc]);

  const handleUpdateCategory = async () => {
    if (!categoryId) return;

    const payload = {
      id: categoryId,
      title,
      desc,
    };

    try {
      await request(`/api/core/kitchen-operations/category/edit`, "POST", {}, payload);
      onClose(); 
      refreshCategories()
    } catch (err) {
      console.error("Failed to update category", err);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Update Category</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter category title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            onClick={handleUpdateCategory}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
