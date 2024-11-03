import React, { useState } from "react";
import {useDiscounts } from "@/src/context/DiscountContext";
import { BiEdit } from "react-icons/bi";
import UpdateAddonModal from "./UpdateAddonModal";
import { formatDate } from "../utils/dateUtils";
import { formatNumberWithCommas } from "../utils/numberUtils";

const DiscountTable: React.FC = () => {
  const { discounts } = useDiscounts();
  const [currentAddon, setcurrentAddon] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(discounts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = discounts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const handleView = (addon: any) => {
    setcurrentAddon(addon);
    setShowModal(true);
  };

  return (
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
          </tr>
        </thead>
        <tbody>
          {currentItems.map((discount, index) => (
            <tr key={index} className="text-left bg-white border-b hover:bg-gray-200 transition-colors duration-500">
              <td className="px-6 py-4">{discount.title}</td>
              <td className="px-6 py-4">{discount.discount_type}</td>
              <td className="px-6 py-4">{discount.discount_percentage ? `% ${discount.discount_percentage}` : formatNumberWithCommas(parseFloat(discount.fixed_amount))}</td>
              <td className="px-6 py-4">{formatDate(discount.start_date)}</td>
              <td className="px-6 py-4">{formatDate(discount.end_date)}</td>
              <td className="px-6 py-4">{formatDate(discount.status)}</td>
              {/* <td className="px-6 py-4 text-gray-800 cursor-pointer"
              onClick={() => handleView(add)}
              > <BiEdit /></td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
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

      {showModal && currentAddon && (
        <UpdateAddonModal
          addonId={currentAddon.id}
          initialName={currentAddon.name}
          initialAmount={currentAddon.amount}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default DiscountTable;
