import React from "react";

interface ChatAreaProps {
  ticket: any; // Ticket object passed from the parent component
}

const ChatArea: React.FC<ChatAreaProps> = ({ ticket }) => {
  const { ticket_conversation: conversations, customer_name, title } = ticket;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <p className="text-sm text-gray-500 mb-6">Customer: {customer_name}</p>

      {conversations.length > 0 ? (
        <div className="space-y-4">
          {conversations.map((message: any) => (
            <div
              key={message.id}
              className={`p-4 rounded-md ${
                message.id == "3"
                  ? "bg-blue-100 text-blue-900 self-start"
                  : "bg-gray-100 text-gray-900 self-end"
              }`}
            >
              <p className="text-sm text-gray-500">
                {message.customer_name} -{" "}
                {new Date(message.created_at).toLocaleString()}
              </p>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No conversations yet for this ticket.</p>
      )}
    </div>
  );
};

export default ChatArea;
