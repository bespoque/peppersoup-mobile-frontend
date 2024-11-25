import React, { useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { PiFolderOpenFill } from "react-icons/pi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useApi } from "../hooks/useApi";
import ResolveTicketModal from "./ResolveTicketModal";

interface OpenTicketsProps {
  openTickets: any[];
}

const OpenTickets: React.FC<OpenTicketsProps> = ({ openTickets }) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { request, loading } = useApi();

  const handleResolveTicket = async () => {
    if (!selectedTicketId) return;
    try {
      await request("/api/core/kitchen-operations/support-ticket/resolve", "POST", {}, { id: selectedTicketId });
      alert("Ticket resolved successfully!");
      setShowModal(false);
    } catch (err) {
      console.error("Error resolving ticket:", err);
    }
  };

  return (
    <div className="w-full p-4">
      <table className="min-w-full mt-6 bg-white">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="px-6 py-3">Customer Name</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {openTickets.map((ticket, index) => (
            <tr
              key={index}
              className="text-left bg-white border-b hover:bg-gray-200"
            >
              <td className="px-6 py-4">{ticket.customer_name}</td>
              <td className="px-6 py-4">{ticket.title}</td>
              <td className="px-6 py-4 flex items-center space-x-2">
                Open <PiFolderOpenFill />
              </td>
              <td className="px-6 py-4">{formatDate(ticket.created_at)}</td>
              <td className="px-6 py-4">
                <AiOutlineCheckCircle
                  className="text-green-500 cursor-pointer"
                  onClick={() => {
                    setSelectedTicketId(ticket.id);
                    setShowModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ResolveTicketModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleResolveTicket}
        loading={loading}
      />
    </div>
  );
};

export default OpenTickets;
