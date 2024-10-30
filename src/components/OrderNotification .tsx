import { useOrders } from "../context/OrdersContext";

const OrderNotification = () => {
  const { orders } = useOrders();

  return (
    orders?.incoming_orders?.data && orders.incoming_orders.data.length > 0 (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-lg">
        New Orders Have Arrived
      </div>
    )
  );
};

export default OrderNotification;
