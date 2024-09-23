import React, { useState } from "react";

interface AddMenuItemFormProps {
  menuType: string;
}

const AddMenuItemForm: React.FC<AddMenuItemFormProps> = ({ menuType }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [sizeOptions, setSizeOptions] = useState([{ size: "", price: "" }]);
  const [availability, setAvailability] = useState("In Stock");
  const [tags, setTags] = useState("");
  const [itemPhoto, setItemPhoto] = useState<File | null>(null);

  const handleAddSizeOption = () => {
    setSizeOptions([...sizeOptions, { size: "", price: "" }]);
  };

  const handleSizeChange = (index: number, field: string, value: string) => {
    const updatedOptions = sizeOptions.map((option, i) =>
      i === index ? { ...option, [field]: value } : option
    );
    setSizeOptions(updatedOptions);
  };

  return (
    <div className="p-8 bg-white rounded-lg border m-2 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Add New Menu Item - {menuType}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Item Name*</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type here"
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Portion (Size)*
            </label>
            <div className="flex flex-col space-y-2">
              {sizeOptions.map((option, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={option.size}
                    onChange={(e) =>
                      handleSizeChange(index, "size", e.target.value)
                    }
                    className="flex-1 p-2 border rounded"
                    placeholder="Size Name"
                  />
                  <input
                    type="text"
                    value={option.price}
                    onChange={(e) =>
                      handleSizeChange(index, "price", e.target.value)
                    }
                    className="flex-1 p-2 border rounded"
                    placeholder="₦ Price"
                  />
                </div>
              ))}
              <button
                onClick={handleAddSizeOption}
                className="text-green-600 mt-2"
              >
                + Add new item
              </button>
            </div>
          </div>
        </div>

        <div>
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

            <div>
              <label className="block text-sm font-semibold mb-1">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g. Today Special, Limited Offer"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Item Photo</label>
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

      <div className="flex justify-end mt-6">
        <button className="bg-green-500 text-white py-2 px-6 rounded shadow">
          Add this Item
        </button>
      </div>
    </div>
  );
};

export default AddMenuItemForm;
