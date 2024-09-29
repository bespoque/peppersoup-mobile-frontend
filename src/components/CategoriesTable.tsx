import React, { useState } from "react";
import { useCategories } from "@/src/context/CategoriesContext";
import UpdateCategoryModal from "./UpdateCategoryModal"; // Import the modal
import { FiDelete } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

const CategoriesTable: React.FC = () => {
  const { categories } = useCategories();
  const [currentCategory, setCurrentCategory] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    });
  };

  const handleView = (category: any) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Created time</th>
            <th className="px-6 py-3">Updated time</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((cat, index) => (
            <tr key={index} className="text-left bg-white border-b hover:bg-gray-200">
              <td className="px-6 py-4">{cat.title}</td>
              <td className="px-6 py-4">{cat.desc}</td>
              <td className="px-6 py-4">{formatDate(cat.created_at)}</td>
              <td className="px-6 py-4">{formatDate(cat.updated_at)}</td>
              <td
                className="px-6 py-4 text-cyan-800 cursor-pointer"
                onClick={() => handleView(cat)}
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
            className={`mx-2 text-white px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-400" : "bg-cyan-900"}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`mx-2 text-white px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-400" : "bg-cyan-900"}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {showModal && currentCategory && (
        <UpdateCategoryModal
          categoryId={currentCategory.id}
          initialTitle={currentCategory.title}
          initialDesc={currentCategory.desc}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
