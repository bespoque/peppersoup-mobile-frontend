import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://test.bespoque.dev";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT",
    data?: any
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      setError("An error occurred");
      setLoading(false);
      throw err;
    }
  };

  return { request, loading, error };
};
