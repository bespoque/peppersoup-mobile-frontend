import React, { useState } from "react";
import { useApi } from "@/src/hooks/useApi";

const formatNumberWithCommas = (value: string) => {
  const cleanedValue = value.replace(/[^\d]/g, "");
  return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface ConfigModalProps {
  selectedMenu: string | null;
  formData: { name: string; amount: string; title: string; desc: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCloseModal: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({
  selectedMenu,
  formData,
  handleInputChange,
  handleCloseModal,
}) => {
  const [error, setError] = useState<string | null>(null);
  const { request, loading } = useApi();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatNumberWithCommas(value);
    handleInputChange({
      ...e,
      target: {
        ...e.target,
        value: formattedValue,
        name: "amount",
      },
    });
  };

  const handleSubmit = async () => {
    let endpoint = "";
    const payload: any = {};

    if (selectedMenu === "category" && (!formData.title || !formData.desc)) {
      setError("Both title and description are required for categories.");
      return;
    }
    if (selectedMenu !== "category" && (!formData.name || !formData.amount)) {
      setError("Both name and amount are required for this item.");
      return;
    }

    switch (selectedMenu) {
      case "category":
        endpoint = "/api/core/kitchen-operations/category/create";
        payload.title = formData.title;
        payload.desc = formData.desc;
        break;
      case "tag":
        endpoint = "/api/core/kitchen-operations/tag/create";
        payload.name = formData.name;
        payload.amount = formData.amount.replace(/,/g, "");
        break;
      case "side":
        endpoint = "/api/core/kitchen-operations/item-sides/create";
        payload.name = formData.name;
        payload.amount = formData.amount.replace(/,/g, "");
        break;
      case "portion":
        endpoint = "/api/core/kitchen-operations/portion-size/create";
        payload.name = formData.name;
        payload.amount = formData.amount.replace(/,/g, "");
        break;
      case "addon":
        endpoint = "/api/core/kitchen-operations/adds-on/create";
        payload.name = formData.name;
        payload.amount = formData.amount.replace(/,/g, "");
        break;
      default:
        setError("Invalid selection");
        return;
    }

    try {
      await request(endpoint, "POST", {}, payload);
      setError(null); 
      handleCloseModal(); 
    } catch (err) {
      setError("Failed to create item. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">
          {selectedMenu === "category" ? "Add Category" : `Add ${selectedMenu}`}
        </h3>

        {selectedMenu === "category" ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter category title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Description <span className="text-red-500">*</span></label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter category description"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder={`Enter ${selectedMenu} name`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Amount <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleAmountChange}
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
                required
              />
            </div>
          </>
        )}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="bg-paleGreen text-black px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={loading} 
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
