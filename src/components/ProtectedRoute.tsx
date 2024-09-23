"use client"; // Ensure this is present

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser(); 
  const router = useRouter();

  useEffect(() => {

    if (user === undefined) return; 
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (user === undefined) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
