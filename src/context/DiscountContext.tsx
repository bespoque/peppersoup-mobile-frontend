"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useApi } from "@/src/hooks/useApi";

interface Discount {
  id: number;
  title: string;
  description: string;
  discount_rate: string;
  discount_type: string;
  discount_percentage: string;
  fixed_amount: string;
  start_date: string;
  end_date: string;
  menu_item_id: string;
  status: string;
  images: string[]; 
  created_at: string;
  updated_at: string;
}

interface DiscountsContextType {
  discounts: Discount[];
  loading: boolean;
  error: string | null;
  refreshDiscounts: () => void;
}

const DiscountsContext = createContext<DiscountsContextType | undefined>(undefined);

export const DiscountsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const hasFetched = useRef(false);

  const fetchDiscounts = async () => {
    try {
      const data = await request("/api/core/kitchen-operations/discount-and-promotion/all", "GET");    
      if (data.resp_code === "00") {
        setDiscounts(
          data.data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.desc,
            discount_type: item.discount_type,
            discount_percentage: item.discount_percentage,
            fixed_amount: item.fixed_amount,
            start_date: item.start_date,
            end_date: item.end_date,
            menu_item_id: item.menu_item_id,
            status: item.status,
            images: item.discount_images.map((imag: any) => ( imag.image_link)), 
            created_at: item.created_at,
            updated_at: item.updated_at,
          }))
        );
        hasFetched.current = true;
      }
    } catch (err) {
      console.error("Failed to fetch discounts:", err);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchDiscounts();
    }
  }, []);

  const refreshDiscounts = () => {
    hasFetched.current = false;
    fetchDiscounts();
  };



  const value = useMemo(
    () => ({
      discounts,
      loading,
      error,
      refreshDiscounts,
    }),
    [discounts, loading, error]
  );

  return <DiscountsContext.Provider value={value}>{children}</DiscountsContext.Provider>;
};

export const useDiscounts = () => {
  const context = useContext(DiscountsContext);
  if (context === undefined) {
    throw new Error("useDiscounts must be used within a DiscountsProvider");
  }
  return context;
};
