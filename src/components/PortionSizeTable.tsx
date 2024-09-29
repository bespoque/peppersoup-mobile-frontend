import React, { useState } from "react";
import { usePortionSizes } from "@/src/context/PortionSizesContext";


const PortionSizeTable: React.FC = () => {
  const { portionSizes } = usePortionSizes();

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(portionSizes.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = portionSizes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
  const formatNumberWithCommas = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Addon</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Created time</th>
            <th className="px-6 py-3">Updated time</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((size, index) => (
            <tr key={index} className="text-left bg-white border-b hover:bg-gray-200 transition-colors duration-500">
              <td className="px-6 py-4">{size.name}</td>
              <td className="px-6 py-4">{formatNumberWithCommas(parseFloat(size.amount))}</td>
              <td className="px-6 py-4">{formatDate(size.created_at)}</td>
              <td className="px-6 py-4">{formatDate(size.updated_at)}</td>
              <td className="px-6 py-4 text-blue-600 cursor-pointer">View</td>
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
    </div>
  );
};

export default PortionSizeTable;
