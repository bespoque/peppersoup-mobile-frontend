"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApi } from '@/src/hooks/useApi';

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  menu_item_images: { image_link: string }[];
  menu_item_portion_size: { portion: { amount: number } }[];
  menu_item_tags: { tag: { name: string } }[];
}

interface MenuData {
  PepperSoup: MenuItem[];
  SideDishes: MenuItem[];
  Drinks: MenuItem[];
}

interface MenuContextProps {
  menuData: MenuData;
  loading: boolean;
  error: string | null;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuData, setMenuData] = useState<MenuData>({
    PepperSoup: [],
    SideDishes: [],
    Drinks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApi();

  const categorizeMenuItems = (data: any) => {
    const categorizedData: MenuData = {
      PepperSoup: [],
      SideDishes: [],
      Drinks: [],
    };

    data.forEach((category: any) => {
      if (category.title === 'PepperSoup') {
        categorizedData.PepperSoup = category.items.data;
      } else if (category.title === 'Side Dishes') {
        categorizedData.SideDishes = category.items.data;
      } else if (category.title === 'Drinks') {
        categorizedData.Drinks = category.items.data;
      }
    });

    setMenuData(categorizedData);
  };

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await request('/api/core/kitchen-operations/menu-items/all', 'GET');
      if (response?.resp_code === '00') {
        categorizeMenuItems(response.data);
      } else {
        setError('Failed to fetch menu items');
      }
    } catch (err) {
      setError('Error fetching menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <MenuContext.Provider value={{ menuData, loading, error }}>
      {children}
    </MenuContext.Provider>
  );
};
