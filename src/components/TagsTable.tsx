import React, { useState } from "react";
import { useTags } from "@/src/context/TagsContext";
import { BiEdit } from "react-icons/bi";
import UpdateTagModal from "./UpdateTagModal";
const TagsTable: React.FC = () => {
  const { tags } = useTags();

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTag, setCurrentTag] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const totalPages = Math.ceil(tags.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = tags.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const handleView = (tag: any) => {
    setCurrentTag(tag);
    setShowModal(true);
  };

  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Tag</th>
            <th className="px-6 py-3">Created time</th>
            <th className="px-6 py-3">Updated time</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((tag, index) => (
            <tr
              key={index}
              className="text-left bg-white border-b hover:bg-gray-200 transition-colors duration-500"
            >
              <td className="px-6 py-4">{tag.name}</td>
              <td className="px-6 py-4">{formatDate(tag.created_at)}</td>
              <td className="px-6 py-4">{formatDate(tag.updated_at)}</td>
              <td
                className="px-6 py-4 text-gray-800 cursor-pointer"
                onClick={() => handleView(tag)}
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

      {showModal && currentTag && (
        <UpdateTagModal
          tagId={currentTag.id}
          initialName={currentTag.name}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TagsTable;
