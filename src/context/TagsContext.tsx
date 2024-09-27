"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';

interface Tag {
  id: number;
  user_id: number;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
}

interface TagsContextType {
  tags: Tag[];
  loading: boolean;
  error: string | null;
  addTag: (tag: Omit<Tag, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { request, loading, error } = useApi();
  const [tags, setTags] = useState<Tag[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchTags = async () => {
      if (hasFetched.current) return;
      try {
        const response = await request("/api/core/kitchen-operations/tag/all", "GET");
        if (response?.resp_code === "00") {
          setTags(response.data);
          hasFetched.current = true; 
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [request]);

  const addTag = async (tag: Omit<Tag, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await request('api/core/kitchen-operations/tags', 'POST', {}, tag);
      setTags((prevTags) => [...prevTags, response]);
    } catch (err) {
      // Handle the error if needed
    }
  };

  return (
    <TagsContext.Provider value={{ tags, loading, error, addTag }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  return context;
};
