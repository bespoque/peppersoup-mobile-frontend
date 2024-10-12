import React, { useState, useEffect } from "react";
import { useTags } from "@/src/context/TagsContext";
import { usePortionSizes } from "@/src/context/PortionSizesContext";
import { useAddOns } from "@/src/context/AddonsContext";
import Image from "next/image";

interface UpdateMenuItemFormProps {
  menuItem: any;
  onUpdate: (updatedItem: any) => void;
  onClose: () => void;
}

const UpdateMenuItemForm = ({
  menuItem,
  onUpdate,
  onClose,
}: UpdateMenuItemFormProps) => {
  const [name, setName] = useState(menuItem.name || "");
  const [description, setDescription] = useState(menuItem.desc || "");
  const [availability, setAvailability] = useState(
    menuItem.availability || "In Stock"
  );
  const [tags, setTags] = useState<string[]>(
    menuItem.menu_item_tags.map((tag: any) => tag.tag.name) || []
  );
  const [selectedPortionSizes, setSelectedPortionSizes] = useState<any[]>(
    menuItem.menu_item_portion_size.map((portion: any) => ({
      id: portion.portion.id,
      name: portion.portion.name,
      amount: portion.portion.amount,
    })) || []
  );
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>(
    menuItem.menu_item_add_ons.map((addOn: any) => ({
      id: addOn.addson.id,
      name: addOn.addson.name,
    })) || []
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(
    menuItem.menu_item_images[0]?.image_link || null // Use the first image from the images array
  );

  console.log("selectedAddOns", selectedAddOns);

  const { tags: availableTags } = useTags();
  const { portionSizes } = usePortionSizes();
  const { addOns } = useAddOns();

  const handlePortionSizeChange = (portionSizeId: number) => {
    setSelectedPortionSizes((prev) =>
      prev.find((portion) => portion.id === portionSizeId)
        ? prev.filter((portion) => portion.id !== portionSizeId)
        : [
            ...prev,
            portionSizes.find((portion) => portion.id === portionSizeId),
          ]
    );
  };

  const handleAddOnChange = (addOnId: number) => {
    setSelectedAddOns((prev) =>
      prev.find((addOn) => addOn.id === addOnId)
        ? prev.filter((addOn) => addOn.id !== addOnId)
        : [...prev, addOns.find((addOn) => addOn.id === addOnId)]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItem = {
      ...menuItem,
      name,
      description,
      availability,
      tags,
      portionSizes: selectedPortionSizes,
      addOns: selectedAddOns,
      image: selectedImage, // Include the updated image in the updated item
    };
    onUpdate(updatedItem);
  };

  const formatNumberWithCommas = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-2 max-h-[80vh] overflow-y-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖️
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Update Menu Item
          </button>
        </div>
        <h2 className="text-2xl mb-4">Update Menu Item</h2>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-sm font-medium">Item Name*</label>
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Brief Description (Max 150 characters)*
              </label>
              <textarea
                className="block w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={150}
              />
            </div>

            {/* Portion Sizes */}
            <label className="block text-sm font-medium">Portion Sizes</label>
            <div className="mb-4 border rounded-md border-gray-400 p-2">
              <div className="grid grid-cols-2 gap-2">
                {portionSizes.map((portion) => (
                  <label
                    key={portion.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPortionSizes.some(
                        (p) => p.id === portion.id
                      )}
                      onChange={() => handlePortionSizeChange(portion.id)}
                    />
                    <span>
                      {portion.name} -{" "}
                      {formatNumberWithCommas(parseFloat(portion.amount))}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <label className="block text-sm font-medium">Add-ons</label>
            <div className="mb-4 border rounded-md border-gray-400 p-2">
              <div className="grid grid-cols-2 gap-2">
                {addOns.map((addOn) => (
                  <label key={addOn.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.some((a) => a.id === addOn.id)}
                      onChange={() => handleAddOnChange(addOn.id)}
                    />
                    <span>
                      {addOn.name} -{" "}
                      {formatNumberWithCommas(parseFloat(addOn.amount))}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2">
            <div className="flex gap-4 mb-4">
              <div className="w-full">
                <label className="block text-sm font-medium">
                  Availability*
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium">Tags*</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTags.map((tag) => (
                    <label key={tag.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={tags.includes(tag.name)}
                        onChange={() =>
                          setTags((prev) =>
                            prev.includes(tag.name)
                              ? prev.filter((t) => t !== tag.name)
                              : [...prev, tag.name]
                          )
                        }
                      />
                      <span>{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Preview and Upload */}
            <label className="block text-sm text-center font-medium">
              Menu Item Image
            </label>
            <div
              className="mb-4 border rounded-md border-gray-400 p-4 flex justify-center items-center"
              style={{ height: "400px", position: "relative" }}
            >
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Menu Item"
                  className="mt-2 mb-2 w-full h-full object-cover border border-gray-300 rounded"
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenuItemForm;
