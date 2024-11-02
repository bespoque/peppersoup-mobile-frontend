"use client";

import { useRouter } from "next/navigation";
import { useOrders } from "../context/OrdersContext";
import { useEffect, useState } from "react";

const OrderNotification = () => {
  const { orders } = useOrders();
  const [showNotification, setShowNotification] = useState(false);
const router = useRouter()
  useEffect(() => {
    if ((orders?.incoming_orders?.data?.length ?? 0) > 0) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [orders]);

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 cursor-pointer rounded-lg shadow-lg flex items-center space-x-2"
    onClick={()=>router.push("/orders")}
    >
      <div className="bg-white text-red-500 p-1 rounded-full">
        <span className="text-xs font-bold">NEW</span>
      </div>
      <div>
        <p className="font-bold">New Orders Have Arrived</p>
        <p className="text-sm">
          {orders?.incoming_orders?.data?.length ?? 0} Incoming Order(s)
        </p>
      </div>
    </div>
  );
};

export default OrderNotification;
