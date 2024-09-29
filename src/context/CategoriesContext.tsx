"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useApi } from "../hooks/useApi";

interface Category {
  id: number;
  title: string;
  desc: string;
  created_at: string;
  updated_at: string;
}

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { request, loading, error } = useApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      if (hasFetched.current) return;
      try {
        const data = await request(
          "/api/core/kitchen-operations/category/all",
          "GET"
        );
        if (data.resp_code === "00") {
          setCategories(
            data.data.map((item: any) => ({
              id: item.id,
              title: item.title,
              desc: item.desc,
              created_at: item.created_at,
              updated_at: item.updated_at,
            }))
          );
          hasFetched.current = true;
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [request]);

  const addCategory = async (category: Omit<Category, "id">) => {
    try {
      const response = await request(
        "/api/core/kitchen-operations/menu-items/categories",
        "POST",
        {},
        category
      );
      setCategories((prevCategories) => [...prevCategories, response]);
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  const value = useMemo(
    () => ({
      categories,
      loading,
      error,
      addCategory,
    }),
    [categories, loading, error]
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
