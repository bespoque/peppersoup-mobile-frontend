import React, { useState } from "react";
import { useTags } from "@/src/context/TagsContext";
import { usePortionSizes } from "@/src/context/PortionSizesContext";
import { useAddOns } from "@/src/context/AddonsContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "../hooks/useApi";
import { useMenu } from "../context/MenuContext";
import { isBase64File, base64ToFile } from "../utils/fileUtils"; // Import the functions

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
  const { request, loading } = useApi();
  const { refreshMenuItems } = useMenu();
  const [availability, setAvailability] = useState(
    menuItem.availability === "1" ? "In Stock" : "Out of Stock"
  );
  const [selectedTags, setSelectedTags] = useState<number[]>(
    menuItem.menu_item_tags.map((tag: any) => tag.tag.id) || []
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
    menuItem.menu_item_images[menuItem.menu_item_images.length - 1]
      ?.image_link || null
  );

  const { tags: availableTags } = useTags();
  const { portionSizes } = usePortionSizes();
  const { addOns } = useAddOns();

  const handleTagChange = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem = {
      title: name,
      desc: description,
      availability: availability === "In Stock" ? "1" : "0",
      tag_ids: Array.from(new Set(selectedTags)),
      category_id: menuItem.category_id,
      portion_size_ids: Array.from(
        new Set(selectedPortionSizes.map((portion) => portion.id))
      ),
      addson_ids: Array.from(new Set(selectedAddOns.map((addOn) => addOn.id))),
      menu_item_images: [selectedImage],
      id: menuItem?.id,
    };

   const fileString = `${selectedImage}`;
   const base64String = `${selectedImage}`;
   console.log("is file", isBase64File(fileString)); // true if valid base64 file

   let fileMain;
   if (isBase64File(fileString)) {
     const file = base64ToFile(base64String, "image.jpg");
     fileMain = file;
   } else {
     fileMain = selectedImage;
   }

    const formData = new FormData();
    formData.append("title", name);
    formData.append("desc", description);
    formData.append("availability", availability === "In Stock" ? "1" : "0");
    formData.append("category_id", String(menuItem.category_id));
    formData.append("id", String(menuItem.id));

    // Append portion size IDs without square brackets
    updatedItem.portion_size_ids.forEach((id) => {
      formData.append("portion_size_ids[]", id); // Remove []
    });

    // Append tag IDs without square brackets
    updatedItem.tag_ids.forEach((id) => {
      formData.append("tag_ids[]", id.toString()); // Remove []
    });

    // Append add-on IDs without square brackets
    updatedItem.addson_ids.forEach((id) => {
      formData.append("addson_ids[]", id.toString()); // Remove []
    });

    // Append image if present
    if (fileMain && fileMain instanceof File) {
      formData.append("menu_item_images[]", fileMain);
    }

    try {
      const response = await request(
        "/api/core/kitchen-operations/menu-items/edit",
        "POST",
        {},
        formData,
        true
      );

      if (response && response.resp_code === "00") {
        toast.success("Menu item updated successfully!");
        await refreshMenuItems();
      } else {
        toast.error(response?.resp_message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error updating menu item:", error);
    }

    onUpdate(updatedItem);
  };

  const formatNumberWithCommas = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <ToastContainer />
      <div className="space-y-2 max-h-[80vh] overflow-y-auto px-4">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖️
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {loading ? "Updating..." : "Update Menu Item"}
            </button>
          </div>
          <h2 className="text-2xl mb-4">Update Menu Item</h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="mb-4">
                <label className="block text-sm font-medium">Item Name*</label>
                <input
                  type="text"
                  required
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
                  required
                  className="block w-full p-2 border border-gray-300 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={70}
                />
              </div>

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

              <label className="block text-sm font-medium">Add-ons</label>
              <div className="mb-4 border rounded-md border-gray-400 p-2">
                <div className="grid grid-cols-2 gap-2">
                  {addOns.map((addOn) => (
                    <label
                      key={addOn.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddOns.some((a) => a.id === addOn.id)}
                        onChange={() => handleAddOnChange(addOn.id)}
                      />
                      <span>{addOn.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

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
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="In Stock">In Stock</option>
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium">Tags*</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTags.map((tag) => (
                      <label
                        key={tag.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => handleTagChange(tag.id)}
                        />
                        <span>{tag.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

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
                onChange={handleImageChange}
                accept="image/*"
                className="block w-full mb-4 text-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateMenuItemForm;
