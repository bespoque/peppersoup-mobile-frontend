"use client";
import Summary from "@/src/components/SummaryCard";

import React, { useState } from "react";
import { useTickets } from "@/src/context/SupportTicketContext"; // Import TicketContext
import ChatArea from "@/src/components/ChatAreaProps";
import { formatDateWithTimeAndDay, timeAgo } from "@/src/utils/dateUtils";
import { Supportdata } from "@/src/data/CardsData";
import SupportTabs from "@/src/components/SupportTabs";

const Help: React.FC = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const { tickets, loading, error } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const openTickets = tickets.filter(ticket => ticket.status === "0");
  const resolvedTickets = tickets.filter(ticket => ticket.status === "3");

  const renderRecentChats = () => {
    if (loading) return <p>Loading tickets...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="flex h-screen">
        <div className="w-1/3 border-r overflow-y-auto">
          <h2 className="text-lg font-bold p-4">Recent Chats</h2>
          <ul className="">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className={`p-4 border mx-2 rounded-md cursor-pointer bg-white hover:bg-[#f9f6ee] my-2 ${
                  selectedTicket === ticket.id ? "bg-[#f9f6ee]" : ""
                }`}
                onClick={() => setSelectedTicket(ticket.id)}
              >
                <p className="font-medium flex justify-between">
                  {ticket.customer_name}{" "}
                  <span>
                    {formatDateWithTimeAndDay(ticket.created_at)} -{" "}
                    {timeAgo(ticket.created_at)}
                  </span>
                </p>
                <p className="text-md font-bold mb-1">{ticket.title}</p>
                <p className="text-xs font-semibold mb-1">{ticket.ticket_id}</p>
                <p className="text-sm text-gray-500">{ticket.message}</p>
                <p className="text-xs text-gray-400"></p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/3">
          {selectedTicket ? (
            <ChatArea
              ticket={tickets.find((ticket) => ticket.id === selectedTicket)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Select a ticket to view the conversation</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Support</h2>
        <p className="text-sm text-gray-500 mb-6">
          All tickets, messages are displayed here and you can manage it.
        </p>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveView("dashboard")}
            className={`flex items-center text-gray-700 hover:text-red-500 space-x-2 ${
              activeView === "dashboard" ? "font-bold" : ""
            }`}
          >
            <span>📊</span>
            <span>Support Dashboard</span>
          </button>
          <button
            onClick={() => setActiveView("recentChats")}
            className={`flex items-center text-gray-700 hover:text-red-500 space-x-2 ${
              activeView === "recentChats" ? "font-bold" : ""
            }`}
          >
            <span>💬</span>
            <span>Recent Chats</span>
          </button>
          <button
            onClick={() => setActiveView("ticketSystem")}
            className={`flex items-center text-gray-700 hover:text-red-500 space-x-2 ${
              activeView === "ticketSystem" ? "font-bold" : ""
            }`}
          >
            <span>🎟️</span>
            <span>Ticketing System</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 h-screen">
        {activeView === "dashboard" && (
          <>
            <div className="p-4">
              <h2 className="text-xl font-bold">Support Dashboard</h2>
              <p>Welcome to the Support Dashboard!</p>
            </div>

            <div className="grid grid-cols-3 mx-4">
              {Supportdata.map((card, index) => (
                <Summary
                  key={index}
                  iconSrc={card.iconSrc}
                  title={card.title}
                  value={card.value}
                  subtitle={card.subtitle}
                />
              ))}
            </div>
            <SupportTabs openTickets={openTickets} resolvedTickets={resolvedTickets} />
          </>
        )}
        {activeView === "recentChats" && renderRecentChats()}
        {activeView === "ticketSystem" && (
          <div className="p-4">
            <h2 className="text-xl font-bold">Ticketing System</h2>
            <p>Manage all support tickets here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Help;
