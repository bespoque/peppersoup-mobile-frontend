import React, { useState, useEffect } from "react";
import { usePortionSizes } from "@/src/hooks/usePortionSizes";
import { useTags } from "@/src/hooks/useTags"; // Assuming you have a hook for tags
import { useAddOns } from "@/src/hooks/useAddOns"; // Assuming you have a hook for add-ons
import { useSides } from "@/src/hooks/useSides"; // Assuming you have a hook for sides
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
  const [addOnOptions, setAddOnOptions] = useState([
    { addOnId: "", addOnName: "", addOnPrice: "" },
  ]);
  const [sideOptions, setSideOptions] = useState([
    { sideId: "", sideName: "", sidePrice: "" },
  ]);
  const [availability, setAvailability] = useState("In Stock");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [itemPhoto, setItemPhoto] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    portionSizes,
    loading: portionLoading,
    error: portionError,
  } = usePortionSizes();
  const { tags, loading: tagsLoading, error: tagsError } = useTags();
  const { addOns, loading: addOnsLoading, error: addOnsError } = useAddOns();
  const { sides, loading: sidesLoading, error: sidesError } = useSides();

  // Add new portion size option
  const handleAddSizeOption = () => {
    setSizeOptions([...sizeOptions, { sizeId: "", size: "", price: "" }]);
  };

  // Image upload and preview handler
  const handleFileChange = (file: File | null) => {
    setItemPhoto(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // Handle drag-and-drop events
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Handle clicking on the file input directly
  const handleFileInputClick = () => {
    const input = document.getElementById("fileInput") as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  // Handle file input without resetting value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
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

  // Add new add-on option
  const handleAddAddOnOption = () => {
    setAddOnOptions([
      ...addOnOptions,
      { addOnId: "", addOnName: "", addOnPrice: "" },
    ]);
  };

  // Update add-on when selected
  const handleAddOnChange = (index: number, field: string, value: string) => {
    const updatedOptions = addOnOptions.map((option, i) => {
      if (i === index) {
        if (field === "addOnId") {
          const selectedAddOn = addOns.find(
            (addOn) => addOn.id === parseInt(value)
          );
          return {
            ...option,
            addOnId: value,
            addOnName: selectedAddOn?.name || "",
            addOnPrice: selectedAddOn?.amount || "",
          };
        }
        return { ...option, [field]: value };
      }
      return option;
    });
    setAddOnOptions(updatedOptions);
  };

  // Add new side option
  const handleAddSideOption = () => {
    setSideOptions([
      ...sideOptions,
      { sideId: "", sideName: "", sidePrice: "" },
    ]);
  };

  // Update side when selected
  const handleSideChange = (index: number, field: string, value: string) => {
    const updatedOptions = sideOptions.map((option, i) => {
      if (i === index) {
        if (field === "sideId") {
          const selectedSide = sides.find(
            (side) => side.id === parseInt(value)
          );
          return {
            ...option,
            sideId: value,
            sideName: selectedSide?.name || "",
            sidePrice: selectedSide?.amount || "",
          };
        }
        return { ...option, [field]: value };
      }
      return option;
    });
    setSideOptions(updatedOptions);
  };

  // Delete portion size option
  const handleDeleteSizeOption = (index: number) => {
    const updatedOptions = sizeOptions.filter((_, i) => i !== index);
    setSizeOptions(updatedOptions);
  };

  // Delete add-on option
  const handleDeleteAddOnOption = (index: number) => {
    const updatedOptions = addOnOptions.filter((_, i) => i !== index);
    setAddOnOptions(updatedOptions);
  };

  // Delete side option
  const handleDeleteSideOption = (index: number) => {
    const updatedOptions = sideOptions.filter((_, i) => i !== index);
    setSideOptions(updatedOptions);
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
      <div className="mt-6 flex justify-end">
        <button
          className="px-4 py-2 bg-paleGreen font-semibold text-black shadow-lg rounded-lg"
          onClick={() => console.log("Submit form")}
        >
          Add to menu
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
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

          <div className="mb-4 space-y-2">
            <label className="block text-sm font-semibold mb-1 ">
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
              Portion Size*
            </label>
            <div className="flex flex-col space-y-2 border shadow-sm p-2">
              {sizeOptions.map((option, index) => (
                <div key={index} className="flex space-x-2 items-center">
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
                  <input
                    type="text"
                    readOnly
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

          {/* Add-Ons */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Add-Ons*</label>
            <div className="flex flex-col space-y-2 border shadow-sm p-2">
              {addOnOptions.map((option, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  <select
                    value={option.addOnId}
                    onChange={(e) =>
                      handleAddOnChange(index, "addOnId", e.target.value)
                    }
                    className="w-1/3 p-1 border rounded"
                  >
                    <option value="">Select Add-On</option>
                    {addOns.map((addOn) => (
                      <option key={addOn.id} value={addOn.id}>
                        {addOn.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    readOnly
                    value={option.addOnPrice}
                    onChange={(e) =>
                      handleAddOnChange(index, "addOnPrice", e.target.value)
                    }
                    className="w-1/3 p-1 border rounded"
                    placeholder="₦ Price"
                  />
                  <button
                    onClick={() => handleDeleteAddOnOption(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete this add-on option"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddAddOnOption}
                className="text-green-600 mt-2"
              >
                + Add new add-on option
              </button>
            </div>
          </div>

          {/* Sides */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Sides*</label>
            <div className="flex flex-col space-y-2 border shadow-sm p-2">
              {sideOptions.map((option, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  <select
                    value={option.sideId}
                    onChange={(e) =>
                      handleSideChange(index, "sideId", e.target.value)
                    }
                    className="w-1/3 p-1 border rounded"
                  >
                    <option value="">Select Side</option>
                    {sides.map((side) => (
                      <option key={side.id} value={side.id}>
                        {side.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    readOnly
                    value={option.sidePrice}
                    onChange={(e) =>
                      handleSideChange(index, "sidePrice", e.target.value)
                    }
                    className="w-1/3 p-1 border rounded"
                    placeholder="₦ Price"
                  />
                  <button
                    onClick={() => handleDeleteSideOption(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete this side option"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddSideOption}
                className="text-green-600 mt-2"
              >
                + Add new side option
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-4">
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
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tag.id.toString()}
                      checked={selectedTags.includes(tag.id.toString())}
                      onChange={() => handleTagChange(tag.id.toString())}
                    />
                    <label htmlFor={tag.id.toString()} className="ml-1">
                      {tag.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Item Photo with Preview and Drag-and-Drop */}
          <div className="md:col-span-3">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Upload Item Photo*
              </label>

              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleFileInputClick} // Attach click handler to the container
                className="border rounded-md border-gray-400 p-4 flex justify-center items-center cursor-pointer"
                style={{ height: "400px", position: "relative" }}
              >
                {imagePreview ? (
                  // Click the image to open the file picker
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-full max-w-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling to the parent
                      handleFileInputClick();
                    }}
                  />
                ) : (
                  <p onClick={handleFileInputClick}>
                    Drag & Drop or Click to Upload
                  </p>
                )}

                {/* Hidden input for file upload */}
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleInputChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItemForm;
