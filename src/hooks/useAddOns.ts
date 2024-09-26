import { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";

interface AddOn {
  id: number;
  name: string;
  amount: string;
}

export const useAddOns = () => {
  const { request, loading, error } = useApi();
  const [addOns, setAddOns] = useState<AddOn[]>([]);

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const data = await request('/api/core/kitchen-operations/adds-on/all', 'GET');
        if (data.resp_code === "00") {
          setAddOns(data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amount: item.amount,
          })));
        }
      } catch (err) {
        console.error("Failed to fetch add-ons:", err);
      }
    };

    fetchAddOns();
  }, [request]);

  return { addOns, loading, error };
};
