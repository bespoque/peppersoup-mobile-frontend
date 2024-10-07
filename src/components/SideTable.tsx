import React, { useState } from "react";
import { useSides } from "@/src/context/SidesContext";
import { BiEdit } from "react-icons/bi";
import UpdateSideModal from "./UpdateSideModal";
const SideTable: React.FC = () => {
  const { sides } = useSides();
  const [currentSIde, setCurrentSide] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sides.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sides.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const handleView = (side: any) => {
    setCurrentSide(side);
    setShowModal(true);
  };

  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Side</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Created time</th>
            <th className="px-6 py-3">Updated time</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((side, index) => (
            <tr
              key={index}
              className="text-left bg-white border-b hover:bg-gray-200 transition-colors duration-500"
            >
              <td className="px-6 py-4">{side.name}</td>
              <td className="px-6 py-4">
                {formatNumberWithCommas(parseFloat(side.amount))}
              </td>
              <td className="px-6 py-4">{formatDate(side.created_at)}</td>
              <td className="px-6 py-4">{formatDate(side.updated_at)}</td>
              <td
                className="px-6 py-4 text-gray-800 cursor-pointer"
                onClick={() => handleView(side)}
              >
                <BiEdit />
              </td>
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

      {showModal && currentSIde && (
        <UpdateSideModal
          sideId={currentSIde.id}
          initialName={currentSIde.name}
          initialAmount={currentSIde.amount}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SideTable;
