"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import { useApi } from "@/src/hooks/useApi";

interface TicketConversation {
  id: number;
  ticket_id: string;
  message: string;
  user_id: string;
  customer_name: string;
  is_support: string;
  support_tickets_id: string;
  created_at: string;
  updated_at: string;
}

interface Ticket {
  id: number;
  ticket_id: string;
  customer_name: string;
  title: string;
  message: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  ticket_conversation: TicketConversation[];
}

interface TicketContextProps {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  refreshTickets: () => Promise<void>;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};



export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();
  const hasFetched = useRef(false);
  console.log("tickets", tickets);

  const fetchTickets = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error
    try {
      const data = await request(
        "/api/core/kitchen-operations/support-ticket/history",
        "GET"
      );
      if (data.resp_code === "00") {
        // Access the correct level of the JSON structure
        setTickets(data.data.data);
        hasFetched.current = true;
      } else {
        setError(data.resp_message || "Failed to fetch tickets");
      }
    } catch (err) {
      setError("An error occurred while fetching tickets");
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchTickets();
    }
  }, []);

  const refreshTickets = async () => {
    hasFetched.current = false;
    await fetchTickets();
  };

  const value = useMemo(
    () => ({
      tickets,
      loading,
      error,
      refreshTickets,
    }),
    [tickets, loading, error]
  );

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};
