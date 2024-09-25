import { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";

interface PortionSize {
  id: number;
  name: string;
  amount: string;
}

export const usePortionSizes = () => {
  const { request, loading, error } = useApi(); // Using the existing useApi hook for requests
  const [portionSizes, setPortionSizes] = useState<PortionSize[]>([]);

  useEffect(() => {
    const fetchPortionSizes = async () => {
      try {
        const data = await request('/api/core/kitchen-operations/portion-size/all', 'GET');
        if (data.resp_code === "00") {
          setPortionSizes(data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amount: item.amount,
          })));
        }
      } catch (err) {
        console.error("Failed to fetch portion sizes:", err);
      }
    };

    fetchPortionSizes();
  }, [request]);

  return { portionSizes, loading, error };
};
