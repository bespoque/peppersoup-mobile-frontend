"use client"
import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { useApi } from '../hooks/useApi';

interface Side {
  id: number;
  name: string;
  amount: string;
  created_at: string;
  updated_at: string;
}

interface SidesContextType {
  sides: Side[];
  loading: boolean;
  error: string | null;
  addSide: (side: Omit<Side, 'id'>) => Promise<void>;
}

const SidesContext = createContext<SidesContextType | undefined>(undefined);

export const SidesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [sides, setSides] = useState<Side[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchSides = async () => {
      if (hasFetched.current) return;
      try {
        const data = await request('/api/core/kitchen-operations/item-sides/all', 'GET');
        if (data.resp_code === '00') {
          setSides(data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amount: item.amount,
            created_at: item.created_at,
            updated_at: item.updated_at,
          })));
          hasFetched.current = true;
        }
      } catch (err) {
        console.error('Failed to fetch sides:', err);
      }
    };

    fetchSides();
  }, [request]);

  const addSide = async (side: Omit<Side, 'id'>) => {
    try {
      const response = await request('api/core/kitchen-operations/item-sides', 'POST', {}, side);
      setSides((prevSides) => [...prevSides, response]);
    } catch (err) {
      console.error('Failed to add side:', err);
    }
  };

  // Memoize the value passed to the provider
  const value = useMemo(() => ({
    sides,
    loading,
    error,
    addSide,
  }), [sides, loading, error]);

  return (
    <SidesContext.Provider value={value}>
      {children}
    </SidesContext.Provider>
  );
};

export const useSides = () => {
  const context = useContext(SidesContext);
  if (context === undefined) {
    throw new Error('useSides must be used within a SidesProvider');
  }
  return context;
};
