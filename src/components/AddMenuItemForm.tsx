import React, { useState, useEffect } from "react";
import { usePortionSizes } from "@/src/hooks/usePortionSizes";
import { useTags } from "@/src/hooks/useTags"; // Assuming you have a hook for tags
import { FiDelete } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";


interface AddMenuItemFormProps {
  menuType: string;
}

const AddMenuItemForm: React.FC<AddMenuItemFormProps> = ({ menuType }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [sizeOptions, setSizeOptions] = useState([
    { sizeId: "", size: "", price: "" },
  ]);
  const [availability, setAvailability] = useState("In Stock");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [itemPhoto, setItemPhoto] = useState<File | null>(null);

  const {
    portionSizes,
    loading: portionLoading,
    error: portionError,
  } = usePortionSizes();
  const { tags, loading: tagsLoading, error: tagsError } = useTags(); // Hook to fetch tags

  // Add new portion size option
  const handleAddSizeOption = () => {
    setSizeOptions([...sizeOptions, { sizeId: "", size: "", price: "" }]);
  };

  // Update portion size or price when size is selected
  const handleSizeChange = (index: number, field: string, value: string) => {
    const updatedOptions = sizeOptions.map((option, i) => {
      if (i === index) {
        if (field === "sizeId") {
          const selectedPortion = portionSizes.find(
            (portion) => portion.id === parseInt(value)
          );
          return {
            ...option,
            sizeId: value,
            size: selectedPortion?.name || "",
            price: selectedPortion?.amount || "",
          };
        }
        return { ...option, [field]: value };
      }
      return option;
    });
    setSizeOptions(updatedOptions);
  };

  // Delete portion size option
  const handleDeleteSizeOption = (index: number) => {
    const updatedOptions = sizeOptions.filter((_, i) => i !== index);
    setSizeOptions(updatedOptions);
  };

  // Handle tag selection
  const handleTagChange = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg border m-2 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Add New Menu Item - {menuType}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Item Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Item Name*
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type here"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Brief Description of Item* (Max 15 words)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type here"
              rows={3}
            />
          </div>

          {/* Portion Sizes */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Portion (Size)*
            </label>
            <div className="flex flex-col space-y-2">
              {sizeOptions.map((option, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  {/* Portion Size Dropdown */}
                  <select
                    value={option.sizeId}
                    onChange={(e) =>
                      handleSizeChange(index, "sizeId", e.target.value)
                    }
                    className="w-1/3 p-1 border rounded"
                  >
                    <option value="">Select Size</option>
                    {portionSizes.map((portion) => (
                      <option key={portion.id} value={portion.id}>
                        {portion.name}
                      </option>
                    ))}
                  </select>

                  {/* Price Input (Auto-filled) */}
                  <input
                    type="text"
                    value={option.price}
                    onChange={(e) =>
                      handleSizeChange(index, "price", e.target.value)
                    }
                    className="w-1/3 p-1 border rounded"
                    placeholder="₦ Price"
                  />

                  <button
                    onClick={() => handleDeleteSizeOption(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete this size option"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddSizeOption}
                className="text-green-600 mt-2"
              >
                + Add new size option
              </button>
            </div>
          </div>
        </div>

        <div>
          {/* Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Availability*
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-1">Tags*</label>
              <div className="flex flex-wrap">
                {tagsLoading ? (
                  <p>Loading tags...</p>
                ) : (
                  tags.map((tag) => (
                    <label key={tag.id} className="mr-4 mb-2">
                      <input
                        type="checkbox"
                        value={tag.id.toString()} // Convert tag.id to string
                        checked={selectedTags.includes(tag.id.toString())} // Ensure the comparison works
                        onChange={() => handleTagChange(tag.id.toString())} // Convert tag.id to string
                      />
                      {tag.name}
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Item Photo */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Item Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 p-4 flex justify-center items-center">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) setItemPhoto(e.target.files[0]);
                }}
                className="hidden"
                id="itemPhotoUpload"
              />
              <label
                htmlFor="itemPhotoUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                {itemPhoto ? (
                  <p>{itemPhoto.name}</p>
                ) : (
                  <>
                    <span className="text-gray-500">+</span>
                    <p className="text-gray-400">Upload or Drag Item Photo</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button className="bg-green-500 text-white py-2 px-6 rounded shadow">
          Add this Item
        </button>
      </div>
    </div>
  );
};

export default AddMenuItemForm;
