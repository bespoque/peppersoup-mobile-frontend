
import React from 'react';
import { completedOrdersData } from '../data/CompletedOrdersData';

type Order = {
  id: string;
  date: string;
  customerName: string;
  amount: string;
};

const CompletedOrdersTable: React.FC = () => {
  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Completion Date & Time</th>
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Customer Name</th>
            <th className="px-6 py-3">Order Amount</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {completedOrdersData.map((order, index) => (
            <tr key={index} className="text-left bg-white border-b">
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4 font-semibold">{order.id}</td>
              <td className="px-6 py-4">{order.customerName}</td>
              <td className="px-6 py-4">{order.amount}</td>
              <td className="px-6 py-4 text-blue-600 cursor-pointer">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedOrdersTable;
