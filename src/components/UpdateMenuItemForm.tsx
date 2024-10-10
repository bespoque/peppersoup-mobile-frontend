import React, { useState, useEffect } from "react";
import { usePortionSizes } from "@/src/context/PortionSizesContext";
import { useTags } from "@/src/context/TagsContext";
import { useAddOns } from "@/src/context/AddonsContext";
import { useSides } from "@/src/context/SidesContext"; // Assuming you have a Sides context

interface UpdateMenuItemFormProps {
  menuItem: any; // The menu item to be edited
  onUpdate: (updatedItem: any) => void; // Callback after successful update
  onClose: () => void;
}

const UpdateMenuItemForm = ({
  menuItem,
  onUpdate,
  onClose,
}: UpdateMenuItemFormProps) => {
  const [name, setName] = useState(menuItem.name || "");
  const [description, setDescription] = useState(menuItem.desc || "");
  const [price, setPrice] = useState(menuItem.item_price || 0);
  const [availability, setAvailability] = useState(
    menuItem.availability || "In Stock"
  );
  const [tags, setTags] = useState<string[]>(
    menuItem.menu_item_tags.map((tag: any) => tag.tag.name) || []
  );

  // Initialize selectedPortionSize, selectedAddOns, and selectedSides
  const [selectedPortionSize, setSelectedPortionSize] = useState(
    menuItem.menu_item_portion_size[0]?.portion.id || ""
  );
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>(
    menuItem.add_ons || []
  ); // Ensure it's initialized as an array
  const [selectedSides, setSelectedSides] = useState<any[]>(
    menuItem.sides || []
  ); // Ensure it's initialized as an array

  const { portionSizes } = usePortionSizes();
  const { tags: availableTags } = useTags();
  const { addOns } = useAddOns();
  const { sides } = useSides();

  useEffect(() => {
    // Prepopulate form if the menuItem changes
    setName(menuItem.name);
    setDescription(menuItem.desc);
    setPrice(menuItem.item_price);
    setAvailability(menuItem.availability);
    setTags(menuItem.menu_item_tags.map((tag: any) => tag.tag.name));
    setSelectedPortionSize(menuItem.menu_item_portion_size[0]?.portion.id);
    setSelectedAddOns(menuItem.add_ons || []); // Ensure it's initialized as an array
    setSelectedSides(menuItem.sides || []); // Ensure it's initialized as an array
  }, [menuItem]);

  // ...

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedItem = {
      ...menuItem,
      name,
      desc: description,
      item_price: price,
      availability,
      menu_item_tags: tags.map((tag) => ({ tag: { name: tag } })),
      menu_item_portion_size: [
        {
          portion: {
            id: selectedPortionSize,
          },
        },
      ],
      add_ons: selectedAddOns,
      sides: selectedSides,
    };

    onUpdate(updatedItem); // This will close the form and update the menu item
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className=" right-4 text-gray-500 hover:text-gray-700"
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

      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          {/* Item Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Item Name*</label>
            <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Brief Description (Max 15 words)*
            </label>
            <textarea
              className="block w-full p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={150}
            />
          </div>

          {/* Portion Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Portion Size*</label>
            <div className="flex gap-2 items-center">
              <select
                value={selectedPortionSize}
                onChange={(e) => setSelectedPortionSize(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Size</option>
                {portionSizes.map((portionSize) => (
                  <option key={portionSize.id} value={portionSize.id}>
                    {portionSize.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="block w-full p-2 border border-gray-300 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₦ Price"
              />
            </div>
          </div>

          {/* Add-Ons */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Add-Ons*</label>
            <div className="space-y-2">
              {selectedAddOns.map((addOn, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={addOn.id}
                    onChange={(e) => {
                      const updatedAddOns = [...selectedAddOns];
                      updatedAddOns[index] = {
                        ...updatedAddOns[index],
                        id: e.target.value,
                      };
                      setSelectedAddOns(updatedAddOns);
                    }}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Add-On</option>
                    {addOns.map((addon) => (
                      <option key={addon.id} value={addon.id}>
                        {addon.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={addOn.amount || 0}
                    onChange={(e) => {
                      const updatedAddOns = [...selectedAddOns];
                      updatedAddOns[index].amount = e.target.value;
                      setSelectedAddOns(updatedAddOns);
                    }}
                    placeholder="₦ Price"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setSelectedAddOns([...selectedAddOns, { id: "", amount: 0 }])
                }
                className="text-blue-500"
              >
                + Add new add-on option
              </button>
            </div>
          </div>

          {/* Sides */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Sides*</label>
            <div className="space-y-2">
              {selectedSides.map((side, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={side.id}
                    onChange={(e) => {
                      const updatedSides = [...selectedSides];
                      updatedSides[index] = {
                        ...updatedSides[index],
                        id: e.target.value,
                      };
                      setSelectedSides(updatedSides);
                    }}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Side</option>
                    {sides.map((side) => (
                      <option key={side.id} value={side.id}>
                        {side.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={side.amount || 0}
                    onChange={(e) => {
                      const updatedSides = [...selectedSides];
                      updatedSides[index].amount = e.target.value;
                      setSelectedSides(updatedSides);
                    }}
                    placeholder="₦ Price"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setSelectedSides([...selectedSides, { id: "", amount: 0 }])
                }
                className="text-blue-500"
              >
                + Add new side option
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Availability */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Availability*</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Limited Offer">Limited Offer</option>
            </select>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Tags*</label>
            <div className="flex gap-2">
              {availableTags.map((tag) => (
                <label key={tag.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={tags.includes(tag.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, tag.name]);
                      } else {
                        setTags(tags.filter((t) => t !== tag.name));
                      }
                    }}
                  />
                  <span>{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Upload Photo */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Upload Item Photo*
            </label>
            <div className="border-dashed border-2 p-4 text-center">
              <span>Drag & Drop or Click to Upload</span>
            </div>
          </div>

          {/* Item Price and Total */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Item Price*</label>
            <input
              type="number"
              className="block w-full p-2 border border-gray-300 rounded"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          {/* Total Price */}
          <div className="font-bold text-xl">Total Price: ₦{price}</div>
        </div>
      </div>
    </form>
  );
};

export default UpdateMenuItemForm;
