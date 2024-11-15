"use client";
import React, { useState } from "react";
import { useMenu } from "@/src/context/MenuContext";
import { useApi } from "@/src/hooks/useApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDiscounts } from "../context/DiscountContext";

export default function NewDiscountForm({ onClose }: { onClose: () => void }) {
  const [promotionName, setPromotionName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxUsage, setMaxUsage] = useState("3");
  const [keywordActivation, setKeywordActivation] = useState("");
  const [applicableItems, setApplicableItems] = useState<string[]>([]);
  const [promoImage, setPromoImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { menuData, loading, error } = useMenu();
  const { request, loading: isLoading, error: saveError } = useApi();
  const { refreshDiscounts } = useDiscounts();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPromoImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  type MenuItem = {
    id: number;
    name: string;
  };

  const handleSave = async () => {
    if (!promotionName || !startDate || !endDate || !applicableItems.length) {
      alert("Please fill in all required fields");
      return;
    }


    const formatDateTimeFromString = (dateString: string): string => {
      // Create a Date object from the input date string
      const date = new Date(dateString);
    
      // Get the year, month, day, hours, minutes, and seconds
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      // Return the formatted date string in "YYYY-MM-DD HH:MM:SS" format
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    
    // Example usage:
    const formattedDate = formatDateTimeFromString('2024-11-05');
    console.log(formattedDate); // Output: "2024-11-05 00:00:00" (or the current time if provided)
     // Output: "2024-11-04 09:21:18"
    
    console.log("startDate", startDate);
    

    const formData = new FormData();
    formData.append("title", promotionName);
    formData.append("desc", description);
    formData.append("discount_type", discountType);
    formData.append("discount_percentage", "5");
    // formData.append("discount_percentage", discountPercentage);
    formData.append("fixed_amount", "5000");
    // formData.append("fixed_amount", fixedAmount);
    formData.append("start_date", (formatDateTimeFromString(startDate)));
    formData.append("end_date", formatDateTimeFromString(endDate));
    formData.append("usage_per_user", maxUsage);
    formData.append("key_word_activation", keywordActivation);
    formData.append("menu_item_id", applicableItems[0]);

    if (promoImage) {
      formData.append("discount_images[]", promoImage);
    }

    try {
      const response = await request(
        "/api/core/kitchen-operations/discount-and-promotion/create",
        "POST",
        {},
        formData,
        true
      );

      if (response && response.resp_code === "00") {
        toast.success("Promo added successfully!");
        refreshDiscounts();
        onClose();
      } else if (response && response.resp_code === "01") {
        toast.error(response.resp_message);
        onClose();
      } else {
        toast.error("Failed to add menu item");
        onClose();
      }

    } catch (error) {
      console.error("Error saving the promo:", error);
      alert("There was an error saving the promo");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border m-2 shadow-lg">
      <ToastContainer />
      <div className="flex gap-8">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 underline font-bold"
        >
          ← Back to Promos
        </button>
        <h2 className="text-2xl font-semibold">New Promo</h2>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-paleGreen font-semibold text-black py-2 px-6 rounded shadow"
        >
          Save this Promo
        </button>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-4 mb-6">
        <div>
          <label className="flex font-bold items-center">
            <input type="checkbox" className="mr-2" />
            Remove this item from showing on mobile app
          </label>

          <label className="block mt-4">Promotion Name <span className="text-red-500 font-bold">*</span></label>
          <input
            type="text"
            value={promotionName}
            onChange={(e) => setPromotionName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />

          <label className="block mt-4">Brief Description of Promotion</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            maxLength={100}
          />

          <label>Discount Types <span className="text-red-500 font-bold">*</span></label>
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Please Select</option>
            <option value="1">Percentage</option>
            <option value="2">Fixed Amount</option>
          </select>
          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block">Or Fixed Amount</label>
              <input
                type="number"
                value={fixedAmount}
                onChange={(e) => setFixedAmount(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                disabled={discountType !== "2"}
              />
            </div>

            <div className="w-1/2">
              <label>Discount Percentage (%)</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                disabled={discountType !== "1"}
              />
            </div>
          </div>

          <label className="block mt-4">Valid Dates <span className="text-red-500 font-bold">*</span></label>
          <div className="flex space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block">Max Usage per User</label>
              <input
                type="number"
                value={maxUsage}
                onChange={(e) => setMaxUsage(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="w-1/2">
              <label>Keyword Activation</label>
              <input
                type="text"
                value={keywordActivation}
                onChange={(e) => setKeywordActivation(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          <label className="block mt-4">Applicable Item <span className="text-red-500 font-bold">*</span></label>
          {loading ? (
            <p>Loading items...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <select
              value={applicableItems}
              onChange={(e) => setApplicableItems([e.target.value])}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select items within this menu</option>
              {Object.entries(menuData).map(([category, items]) => (
                <optgroup key={category} label={category}>
                  {items.map((item: MenuItem) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          )}
        </div>

        <div className="mt-4">
          <label className="block mb-2">Promo Banner (Photo)</label>
          <div className="border rounded-md border-gray-300 p-4 rounded flex flex-col items-center justify-center"
          >
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              id="promo-image"
            />
            <label
              htmlFor="promo-image"
              className="cursor-pointer text-semibold"
            >
              Upload Image
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Promo preview"
                 className="max-h-full max-w-full"
              />
            )}
            {promoImage && (
              <div className="text-sm text-center text-gray-600 mt-1">
                {promoImage.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
