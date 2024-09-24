import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Use Next.js router to redirect

const BASE_URL = "https://test.bespoque.dev";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logoutUser = () => {
    Cookies.remove("token");
    Cookies.remove("token_expiry");
    router.push("/");
  };

  const checkTokenExpiry = () => {
    const expiryTime = Cookies.get("token_expiry");
    if (expiryTime && new Date().getTime() > parseInt(expiryTime, 10)) {
      logoutUser();
    }
  };

  const request = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT",
    data?: any
  ) => {
    setLoading(true);
    setError(null);

    checkTokenExpiry();

    const token = Cookies.get("token");

    try {
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        data,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      setLoading(false);
      return response.data;
    } catch (err: any) {
      setLoading(false);
      if (err.response?.status === 401) {
        logoutUser();
      } else {
        setError("An error occurred");
      }
      throw err;
    }
  };

  return { request, loading, error };
};
