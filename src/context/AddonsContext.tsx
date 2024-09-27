"use client"
import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { useApi } from '../hooks/useApi';

interface Addon {
  id: number;
  name: string;
  amount: string;
}

interface AddonsContextType {
  addOns: Addon[];
  loading: boolean;
  error: string | null;
  addAddon: (addon: Omit<Addon, 'id'>) => Promise<void>;
}

const AddonsContext = createContext<AddonsContextType | undefined>(undefined);

export const AddonsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [addOns, setAddons] = useState<Addon[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchAddons = async () => {
      if (hasFetched.current) return;
      try {
        const data = await request('/api/core/kitchen-operations/adds-on/all', 'GET');
        if (data.resp_code === '00') {
          setAddons(data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            amount: item.amount,
          })));
          hasFetched.current = true;
        }
      } catch (err) {
        console.error('Failed to fetch add-ons:', err);
      }
    };

    fetchAddons();
  }, [request]);

  const addAddon = async (addon: Omit<Addon, 'id'>) => {
    try {
      const response = await request('api/core/kitchen-operations/adds-on', 'POST', {}, addon);
      setAddons((prevAddons) => [...prevAddons, response]);
    } catch (err) {
      console.error('Failed to add add-on:', err);
    }
  };

  // Memoize the value passed to the provider
  const value = useMemo(() => ({
    addOns,
    loading,
    error,
    addAddon,
  }), [addOns, loading, error]);

  return (
    <AddonsContext.Provider value={value}>
      {children}
    </AddonsContext.Provider>
  );
};

export const useAddOns = () => {
  const context = useContext(AddonsContext);
  if (context === undefined) {
    throw new Error('useAddOns must be used within an AddonsProvider');
  }
  return context;
};
