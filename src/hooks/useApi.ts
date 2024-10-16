import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://test.bespoque.dev";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    params = {},
    data = {},
    isFormData = false 
  ) => {
    setLoading(true);
    setError(null);

    const token = Cookies.get("token");

    try {
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          UserId: "admin@gmail.com",
          UserType: "1",
          Authorization: `Bearer ${token}`,
        },
        params: method === "GET" ? params : {},
        data: method !== "GET" ? data : {},
      });

      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError("An error occurred. Please try again.");
      setLoading(false);
      throw err;
    }
  };

  return { request, loading, error };
};
