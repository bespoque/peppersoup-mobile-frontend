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

interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface TagsContextType {
  tags: Tag[];
  loading: boolean;
  error: string | null;
  addTag: (tag: Omit<Tag, "id">) => Promise<void>;
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { request, loading, error } = useApi();
  const [tags, setTags] = useState<Tag[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchTags = async () => {
      if (hasFetched.current) return;
      try {
        const data = await request(
          "/api/core/kitchen-operations/tag/all",
          "GET"
        );
        if (data.resp_code === "00") {
          setTags(
            data.data.map((item: any) => ({
              id: item.id,
              name: item.name,
              created_at: item.created_at,
              updated_at: item.updated_at,
            }))
          );
          hasFetched.current = true;
        }
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    fetchTags();
  }, [request]);

  const addTag = async (tag: Omit<Tag, "id">) => {
    try {
      const response = await request(
        "api/core/kitchen-operations/tags",
        "POST",
        {},
        tag
      );
      setTags((prevTags) => [...prevTags, response]);
    } catch (err) {
      console.error("Failed to add tag:", err);
    }
  };

  const value = useMemo(
    () => ({
      tags,
      loading,
      error,
      addTag,
    }),
    [tags, loading, error]
  );

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a TagsProvider");
  }
  return context;
};
