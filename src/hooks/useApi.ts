import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://test.bespoque.dev";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (endpoint: string, method: "GET" | "POST", params = {}) => {
    setLoading(true);
    setError(null);

    const token = Cookies.get("token"); // Ensure token is securely stored

    try {
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        headers: {
          "Content-Type": "application/json",
          "UserId": "admin@gmail.com",
          "UserType": "1",
          Authorization: `Bearer ${token}`, // Secure API with token
        },
        params, // Pass query parameters here (like category_id)
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
