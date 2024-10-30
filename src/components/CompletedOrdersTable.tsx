import React from "react";
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
          {completedOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4">{formatDate(order.created_at)}</td>
              <td className="px-6 py-4">{order.order_id}</td>
              <td className="px-6 py-4">{order.users?.firstname} {order.users?.lastname}</td>
              <td className="px-6 py-4">
              ₦ {formatNumberWithCommas(parseFloat(order.amount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedOrdersTable;
