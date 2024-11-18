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
    <div className="fixed bottom-4 right-4 bg-white e p-3 cursor-pointer rounded-lg shadow-lg flex items-center space-x-2"
    onClick={()=>router.push("/orders")}
    >
      <div className="bg-white p-1 rounded-full">
        <img src="/images/icons/new_order.png" alt=""  />
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
