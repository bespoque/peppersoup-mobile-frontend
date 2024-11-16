"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateDiscountForm({
  onClose,
  discountData,
}: {
  onClose: () => void;
  discountData: Discount;
}) {
  const [title, setTitle] = useState(discountData.title);
  const [description, setDescription] = useState(discountData.description);
  const [discountType, setDiscountType] = useState(discountData.discount_type);
  const [fixedAmount, setFixedAmount] = useState(
    discountData.fixed_amount || ""
  );
  const [percentage, setPercentage] = useState(
    discountData.discount_percentage || ""
  );
  const [startDate, setStartDate] = useState(discountData.start_date);
  const [endDate, setEndDate] = useState(discountData.end_date);
  const [usagePerUser, setUsagePerUser] = useState(discountData.usage_per_user);
  const [keyword, setKeyword] = useState(discountData.key_word_activation);
  const [promoImage, setPromoImage] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    discountData.images
  );

  useEffect(() => {
    // If there's an image path passed, set it for preview
    if (discountData.images && discountData.images.length > 0) {
      setImagePreviews(discountData.images);
    }
  }, [discountData]);

  // Handle the image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPromoImage(event.target.files[0]);
      const newImagePreviews = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prevImages) => [...prevImages, ...newImagePreviews]);
    }
  };

  // Handle form submission
  const handleSave = () => {
    // Example validation check (you should add more checks)
    if (!title || !discountType || !startDate || !endDate || !usagePerUser) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Submit the form (this should include the logic to actually update the discount)
    toast.success("Promo updated successfully!");
    onClose(); // Close the form after successful update
  };

  return (
    <div className="space-y-2 max-h-[80vh] overflow-y-auto px-4">
      <ToastContainer />
      <div className="flex gap-8">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          {/* ← Back to Promos */}
          ✖️
        </button>
        <h2 className="text-2xl font-semibold">Update Discount</h2>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-paleGreen font-semibold text-black py-2 px-6 rounded shadow"
          onClick={handleSave}
        >
          Save this Promo
        </button>
      </div>
      <form action="m-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mt-4">
              Promotion Title <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className="block mt-4">Brief Description of Promotion</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded"
              maxLength={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>
              Discount Type <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="">Please Select</option>
              <option value="1">Percentage</option>
              <option value="2">Fixed Amount</option>
            </select>
            <div className="flex space-x-4 mt-4">
              {discountType === "2" ? (
                <div className="w-1/2">
                  <label className="block">Fixed Amount</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={fixedAmount}
                    onChange={(e) => setFixedAmount(e.target.value)}
                  />
                </div>
              ) : discountType === "1" ? (
                <div className="w-1/2">
                  <label>Discount Percentage (%)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
              ) : null}
            </div>

            <label className="block mt-4">
              Valid Dates <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                className="border border-gray-300 p-2 rounded w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <input
                type="date"
                className="border border-gray-300 p-2 rounded w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="flex space-x-4 mt-4">
              <div className="w-1/2">
                <label className="block">Max Usage per User</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={usagePerUser}
                  onChange={(e) => setUsagePerUser(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label>Keyword Activation</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>

            <label className="block mt-4">
              Applicable Item <span className="text-red-500 font-bold">*</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block mb-2">Promo Banner (Photo)</label>
            <div className="border rounded-md border-gray-300 p-4 rounded flex flex-col items-center justify-center">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                id="promo-image"
                onChange={handleImageChange}
              />
              <label
                htmlFor="promo-image"
                className="cursor-pointer text-semibold"
              >
                Upload Image
              </label>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {imagePreviews.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Promo Image ${index + 1}`}
                      className="max-w-full max-h-32 object-cover rounded"
                    />
                    <button
                      onClick={() =>
                        setImagePreviews(
                          imagePreviews.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
