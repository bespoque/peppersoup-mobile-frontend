"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useApi } from "@/src/hooks/useApi";

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  menu_item_images: { image_link: string }[];
  menu_item_portion_size: { portion: { amount: number } }[];
  menu_item_tags: { tag: { name: string } }[];
}

interface ApiResponse {
  resp_code: string;
  data: {
    title: string;
    items: {
      data: MenuItem[];
    };
  }[];
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
  refreshMenuItems: () => Promise<void>;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
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

  const categorizeMenuItems = (data: ApiResponse["data"]) => {
    const categorizedData: MenuData = {
      PepperSoup: [],
      SideDishes: [],
      Drinks: [],
    };

    data.forEach((category) => {
      if (category.title === "PepperSoup") {
        categorizedData.PepperSoup = category.items.data;
      } else if (category.title === "Side Dishes") {
        categorizedData.SideDishes = category.items.data;
      } else if (category.title === "Drinks") {
        categorizedData.Drinks = category.items.data;
      }
    });

    setMenuData(categorizedData);
  };

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = (await request(
        "/api/core/kitchen-operations/menu-items/all",
        "GET"
      )) as ApiResponse;
      if (response?.resp_code === "00") {
        categorizeMenuItems(response.data);
      } else {
        setError("Failed to fetch menu items");
      }
    } catch (err) {
      setError((err as Error).message || "Error fetching menu items");
    } finally {
      setLoading(false);
    }
  };

  const refreshMenuItems = async () => {
    await fetchMenuItems();
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const value = useMemo(
    () => ({
      menuData,
      loading,
      error,
      refreshMenuItems,
    }),
    [menuData, loading, error]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
