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
    data = {} // Add a data parameter to handle request body
  ) => {
    setLoading(true);
    setError(null);

    const token = Cookies.get("token"); // Assuming the token is stored in cookies

    try {
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        headers: {
          "Content-Type": "application/json",
          "UserId": "admin@gmail.com", // Replace with dynamic value if necessary
          "UserType": "1",
          Authorization: `Bearer ${token}`,
        },
        params: method === "GET" ? params : {}, // Only send params for GET requests
        data: method !== "GET" ? data : {}, // Send data for non-GET requests (POST, PUT, etc.)
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
