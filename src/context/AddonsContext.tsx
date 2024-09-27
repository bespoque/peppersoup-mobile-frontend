"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
interface Addon {
  id: number;
  user_id: number;
  name: string;
  url: string;
  amount: string;
  created_at: string;
  updated_at: string;
}

interface AddonsContextType {
  addOns: Addon[];
  loading: boolean;
  error: string | null;
  addAddon: (addon: Omit<Addon, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

const AddonsContext = createContext<AddonsContextType | undefined>(undefined);

export const AddonsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [addOns, setAddons] = useState<Addon[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchAddons = async () => {
       try {
        const data = await request('/api/core/kitchen-operations/adds-on/all', 'GET');
        if (data.resp_code === "00") {
          setAddons(data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amount: item.amount,
          })));
          hasFetched.current = true; // Mark as fetched
        }
      } catch (err) {
        console.error("Failed to fetch add-ons:", err);
      }
    };

    fetchAddons();
  }, [request]);

  const addAddon = async (addon: Omit<Addon, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await request('api/core/kitchen-operations/adds-on', 'POST', {}, addon);
      setAddons((prevAddons) => [...prevAddons, response]);
    } catch (err) {
      // Handle the error if needed
    }
  };

  return (
    <AddonsContext.Provider value={{ addOns, loading, error, addAddon }}>
      {children}
    </AddonsContext.Provider>
  );
};

export const useAddOns = () => {
  const context = useContext(AddonsContext);
  if (context === undefined) {
    throw new Error('useAddons must be used within an AddonsProvider');
  }
  return context;
};
