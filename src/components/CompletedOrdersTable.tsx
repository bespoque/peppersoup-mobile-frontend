import React, { useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { formatNumberWithCommas } from "../utils/numberUtils";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface Order {
  id: number;
  amount: string;
  order_id: string;
  country: string;
  state: string;
  city: string;
  payment_reference: string;
  numbers_of_order: string;
  order_amount: string;
  created_at: string;
  updated_at: string;
  users: User;
}

interface CompletedOrdersTableProps {
  completedOrders: Order[];
}

const CompletedOrdersTable: React.FC<CompletedOrdersTableProps> = ({
  completedOrders,
}) => {
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(completedOrders.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = completedOrders.slice(
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

  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Order Date</th>
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Customer Name</th>
            <th className="px-6 py-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4">{formatDate(order.created_at)}</td>
              <td className="px-6 py-4">{order.order_id}</td>
              <td className="px-6 py-4">
                {order.users?.firstname} {order.users?.lastname}
              </td>
              <td className="px-6 py-4">
                ₦ {formatNumberWithCommas(parseFloat(order.amount))}
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
    </div>
  );
};

export default CompletedOrdersTable;
