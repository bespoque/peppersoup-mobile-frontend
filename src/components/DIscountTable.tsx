import React, { useState, useRef, useEffect } from "react";
import { useDiscounts } from "@/src/context/DiscountContext";
import { formatDate } from "../utils/dateUtils";
import { formatNumberWithCommas } from "../utils/numberUtils";
import { FiSettings } from "react-icons/fi";
import { useApi } from "../hooks/useApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateDiscountForm from "./UpdateDiscountForm";

const Modal: React.FC<{
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
}> = ({ title, onCancel, onConfirm, loading }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
    <div className="bg-white p-6 rounded shadow-lg">
      <p>{title}</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onCancel}
          className="mr-2 px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

const DiscountTable: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { discounts, refreshDiscounts } = useDiscounts();
  const { request, loading } = useApi();
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(
    null
  );

  const totalPages = Math.ceil(discounts.length / ITEMS_PER_PAGE);
  const currentItems = discounts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const toggleDropdown = (index: number) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
  }, []);

  const handleDelete = (discountId: number) => {
    setDeleteId(discountId);
    setShowDeleteModal(true);
  };

  const handleDiscountUpdate = (discount: Discount) => {
    setSelectedDiscount(discount);
    setShowUpdateModal(true);
    // Navigate to edit form or open modal (implementation dependent)
  };

  const handleCloseForm = () => {
    setSelectedDiscount(null);
  };
  const Dropdown: React.FC<{
    onEdit: () => void;
    onDelete: () => void;
  }> = ({ onEdit, onDelete }) => (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10"
    >
      <button
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        const response = await request(
          "/api/core/kitchen-operations/discount-and-promotion/delete",
          "POST",
          {},
          { id: deleteId }
        );

        if (response?.resp_code === "00") {
          toast.success("Deleted successfully!");
          refreshDiscounts();
        } else {
          toast.error(response?.resp_message || "Failed to delete");
        }
        setShowDeleteModal(false);
        setDeleteId(null);
      } catch (error) {
        toast.error("An error occurred while deleting the discount.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full p-4">
        <table className="min-w-full mt-6 bg-white">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Value</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((discount, index) => (
              <tr
                key={discount.id}
                className="text-left bg-white border-b hover:bg-gray-200 transition-colors duration-500"
              >
                <td className="px-6 py-4">
                  <div className="font-bold">{discount.title}</div>
                  <div className="text-sm text-gray-500">
                    {discount.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {discount.discount_type === "1"
                    ? "Percentage"
                    : "Fixed Amount"}
                </td>
                <td className="px-6 py-4">
                  {discount.discount_type === "1"
                    ? `% ${discount.discount_percentage}`
                    : formatNumberWithCommas(
                        parseFloat(discount.fixed_amount || "0")
                      )}
                </td>
                <td className="px-6 py-4">{formatDate(discount.start_date)}</td>
                <td className="px-6 py-4">{formatDate(discount.end_date)}</td>
                <td className="px-6 py-4">
                  {discount.status === "1" ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-800 relative">
                  <FiSettings
                    onClick={() => toggleDropdown(index)}
                    className="cursor-pointer"
                  />
                  {activeDropdown === index && (
                    <Dropdown
                      onEdit={() => handleDiscountUpdate(discount)}
                      onDelete={() => handleDelete(discount.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-evenly items-center mt-4">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div>
            <button
              className={`mx-2 text-white px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-400" : "bg-cyan-900"
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`mx-2 text-white px-4 py-2 rounded ${
                currentPage === totalPages ? "bg-gray-400" : "bg-cyan-900"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal
          title="Are you sure you want to delete this discount?"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          loading={loading}
        />
      )}
      {selectedDiscount && (
       <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <UpdateDiscountForm
              onClose={handleCloseForm}
              discountData={selectedDiscount}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountTable;
