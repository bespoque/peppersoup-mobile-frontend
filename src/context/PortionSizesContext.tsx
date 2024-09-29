"use client"
import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { useApi } from '../hooks/useApi';

interface PortionSize {
  id: number;
  name: string;
  amount: string;
  created_at: string;
  updated_at: string;
}

interface PortionSizesContextType {
  portionSizes: PortionSize[];
  loading: boolean;
  error: string | null;
  refreshPortionSize: () => void;
}

const PortionSizesContext = createContext<PortionSizesContextType | undefined>(undefined);

export const PortionSizesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [portionSizes, setPortionSizes] = useState<PortionSize[]>([]);
  const hasFetched = useRef(false);

  const fetchPortionSizes = async () => {
    try {
      const data = await request('/api/core/kitchen-operations/portion-size/all', 'GET');
      if (data.resp_code === '00') {
        setPortionSizes(data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
          created_at: item.created_at,
          updated_at: item.updated_at,
        })));
        hasFetched.current = true;
      }
    } catch (err) {
      console.error('Failed to fetch portion sizes:', err);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchPortionSizes();
    }
  }, []);

  const refreshPortionSize = () => {
    hasFetched.current = false;
    fetchPortionSizes();
  };

  const value = useMemo(() => ({
    portionSizes,
    loading,
    error,
    refreshPortionSize
  }), [portionSizes, loading, error]);

  return (
    <PortionSizesContext.Provider value={value}>
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
