import React, { useState, useEffect } from "react";
import { usePortionSizes } from "@/src/context/PortionSizesContext";
import { useTags } from "@/src/context/TagsContext";
import { useAddOns } from "@/src/context/AddonsContext";
import { useMenu } from "@/src/context/MenuContext";
import { FaTrash } from "react-icons/fa";
import { useApi } from "@/src/hooks/useApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface AddMenuItemFormProps {
  menuType: string;
}

const AddMenuItemForm: React.FC<AddMenuItemFormProps> = ({ menuType }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const { request, loading } = useApi();
  const { refreshMenuItems } = useMenu();
  const [sizeOptions, setSizeOptions] = useState([
    { sizeId: "", size: "", price: "" },
  ]);
  const [addOnOptions, setAddOnOptions] = useState([
    { addOnId: "", addOnName: "", addOnPrice: "" },
  ]);

  const [availability, setAvailability] = useState("In Stock");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [itemPhoto, setItemPhoto] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const { portionSizes } = usePortionSizes();
  const { tags } = useTags();
  const { addOns } = useAddOns();

  const handleAddSizeOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSizeOptions([...sizeOptions, { sizeId: "", size: "", price: "" }]);
  };

  const handleFileChange = (file: File | null) => {
    setItemPhoto(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

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

  const handleFileInputClick = () => {
    const input = document.getElementById("fileInput") as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

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

  const handleAddAddOnOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAddOnOptions([
      ...addOnOptions,
      { addOnId: "", addOnName: "", addOnPrice: "" },
    ]);
  };


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

  const handleDeleteSizeOption = (index: number) => {
    const updatedOptions = sizeOptions.filter((_, i) => i !== index);
    setSizeOptions(updatedOptions);
  };

  const handleDeleteAddOnOption = (index: number) => {
    const updatedOptions = addOnOptions.filter((_, i) => i !== index);
    setAddOnOptions(updatedOptions);
  };

  const handleTagChange = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();

    let category_id = 0;
    if (menuType === "Peppersoup") {
      category_id = 1;
    } else if (menuType === "Sides") {
      category_id = 2;
    } else if (menuType === "Drinks") {
      category_id = 3;
    }

    const availabilityValue = availability === "In Stock" ? 1 : 0;

    const formData = new FormData();
    formData.append("title", itemName);
    formData.append("desc", description);
    formData.append("availability", availabilityValue.toString());
    formData.append("category_id", category_id.toString());

    selectedTags.forEach((tagId) => {
      formData.append("tag_ids[]", tagId);
    });
    if (itemPhoto) {
      formData.append("menu_item_images[]", itemPhoto);
    }
    sizeOptions.forEach((option) => {
      if (option.sizeId) {
        formData.append("portion_size_ids[]", option.sizeId);
      }
    });
    addOnOptions.forEach((option) => {
      if (option.addOnId) {
        formData.append("addson_ids[]", option.addOnId);
      }
    });


    try {
      const response = await request(
        "/api/core/kitchen-operations/menu-items/create",
        "POST",
        {},
        formData,
        true
      );

      if (response && response.resp_code === "00") {
        toast.success("Menu item added successfully!");
        await refreshMenuItems();
        router.push("/home");
      } else if (response && response.resp_code === "01") {
        toast.error(response.resp_message);
      } else {
        toast.error("Failed to add menu item");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error adding menu item:", error);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg border m-2 shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">
        Add New Menu Item - {menuType}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-paleGreen font-semibold text-black shadow-lg cursor-pointer rounded-lg"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add to menu"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Item Name
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
                required
                maxLength={100}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Type here"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Portion Size
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
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Add-Ons
              </label>
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
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-full max-w-full cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileInputClick();
                      }}
                    />
                  ) : (
                    <p onClick={handleFileInputClick}>
                      Drag & Drop or Click to Upload
                    </p>
                  )}
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
      </form>
      <p></p>
    </div>
  );
};

export default AddMenuItemForm;
