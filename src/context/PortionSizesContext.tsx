"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
// Adjust the import path as necessary

interface PortionSize {
  id: number;
  user_id: number;
  name: string;
  url: string;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PortionSizesContextType {
  portionSizes: PortionSize[];
  loading: boolean;
  error: string | null;
  addPortionSize: (portionSize: Omit<PortionSize, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

const PortionSizesContext = createContext<PortionSizesContextType | undefined>(undefined);

export const PortionSizesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [portionSizes, setPortionSizes] = useState<PortionSize[]>([]);
  const hasFetched = useRef(false);
  useEffect(() => {
    const fetchPortionSizes = async () => {
        if (hasFetched.current) return;
        try {
          const data = await request('/api/core/kitchen-operations/portion-size/all', 'GET');
          if (data.resp_code === "00") {
            setPortionSizes(data.data.map((item: any) => ({
              id: item.id,
              name: item.name,
              amount: item.amount,
            })));
            hasFetched.current = true;
          }
        } catch (err) {
          console.error("Failed to fetch portion sizes:", err);
        }
    };

    fetchPortionSizes();
  }, [request]);

  const addPortionSize = async (portionSize: Omit<PortionSize, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await request('api/core/kitchen-operations/portion-size', 'POST', {}, portionSize);
      setPortionSizes((prevPortionSizes) => [...prevPortionSizes, response]);
    } catch (err) {
      // Handle the error if needed
    }
  };

  return (
    <PortionSizesContext.Provider value={{ portionSizes, loading, error, addPortionSize }}>
      {children}
    </PortionSizesContext.Provider>
  );
};

export const usePortionSizes = () => {
  const context = useContext(PortionSizesContext);
  if (context === undefined) {
    throw new Error('usePortionSizes must be used within a PortionSizesProvider');
  }
  return context;
};
