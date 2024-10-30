"use client"
import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface MenuItem {
  id: number;
  name: string;
  url: string;
  desc: string;
  availability: string;

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
  lat: string;
  long: string;
  menu_item: MenuItem;
  users: User;
  created_at: string;
  updated_at: string;

}

interface PaginatedOrders {
  current_page: number;
  data: Order[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  total: number;
}

interface OrdersData {
  incoming_orders: PaginatedOrders;
  ongoing_orders: PaginatedOrders;
  completed_orders: PaginatedOrders;
}

interface OrdersContextType {
  orders: OrdersData | null;
  loading: boolean;
  error: string | null;
  refreshOrders: () => void;
}


const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [orders, setOrders] = useState<OrdersData | null>(null);
  const hasFetched = useRef(false);

  const fetchOrders = async () => {
    try {
      const data = await request("/api/core/kitchen-operations/orders/history", "GET");
      if (data.resp_code === "00") {
        setOrders({
          incoming_orders: {
            ...data.data.incoming_orders[0], // Pagination and orders data for incoming_orders
            data: data.data.incoming_orders[0].data.map((order: any) => ({
              ...order,
              users: order.users,
              menu_item: order.menu_item,
            })),
          },
          ongoing_orders: {
            ...data.data.ongoing_orders[0], // Pagination and orders data for ongoing_orders
            data: data.data.ongoing_orders[0].data.map((order: any) => ({
              ...order,
              users: order.users,
              menu_item: order.menu_item,
            })),
          },
          completed_orders: {
            ...data.data.completed_others[0], // Pagination and orders data for completed_orders
            data: data.data.completed_others[0].data.map((order: any) => ({
              ...order,
              users: order.users,
              menu_item: order.menu_item,
            })),
          },
        });
        hasFetched.current = true;
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };
  console.log("ordersse", orders);
  

  useEffect(() => {
    if (!hasFetched.current) {
      fetchOrders();
    }
  }, []);

  const refreshOrders = () => {
    hasFetched.current = false;
    fetchOrders();
  };

  const value = useMemo(
    () => ({
      orders,
      loading,
      error,
      refreshOrders
    }),
    [orders, loading, error]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
