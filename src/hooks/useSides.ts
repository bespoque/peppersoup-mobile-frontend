import { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";

interface Side {
  id: number;
  name: string;
  amount: string;
}

export const useSides = () => {
  const { request, loading, error } = useApi();
  const [sides, setSides] = useState<Side[]>([]);

  useEffect(() => {
    const fetchSides = async () => {
      try {
        const data = await request('/api/core/kitchen-operations/item-sides/all', 'GET');
        if (data.resp_code === "00") {
          setSides(data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amount: item.amount,
          })));
        }
      } catch (err) {
        console.error("Failed to fetch sides:", err);
      }
    };

    fetchSides();
  }, [request]);

  return { sides, loading, error };
};
