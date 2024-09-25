import { useState, useEffect } from 'react';
import { useApi } from '@/src/hooks/useApi';

interface Tag {
  id: number;
  name: string;
}

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { request, loading, error } = useApi();

  const fetchTags = async () => {
    try {
      const response = await request("/api/core/kitchen-operations/tag/all", "GET");
      if (response?.resp_code === "00") {
        setTags(response.data);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, loading, error };
};
