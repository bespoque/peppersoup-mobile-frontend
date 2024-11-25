import React from "react";
import { formatDate } from "../utils/dateUtils";
import { BiSolidCheckCircle } from "react-icons/bi";

interface ClosedTicketsProps {
  resolvedTickets: any[]; // Replace `any` with the appropriate type for tickets
}

const OpenTickets: React.FC<ClosedTicketsProps> = ({ resolvedTickets }) => {
  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Customer Name</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {resolvedTickets.map((ticket, index) => (
            <tr key={index} className="text-left bg-white border-b hover:bg-gray-200">
              <td className="px-6 py-4">{ticket.customer_name}</td>
              <td className="px-6 py-4">{ticket.title}</td>
              <td className="px-6 py-4">Resolved<BiSolidCheckCircle color="green"/></td>
              <td className="px-6 py-4">{formatDate(ticket.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenTickets;
