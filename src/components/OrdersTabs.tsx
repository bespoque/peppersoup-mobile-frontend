import Tabs from "./Tabs";
import { useOrders } from "@/src/context/OrdersContext";
import OrderCard from "./OrderCard";
import CompletedOrdersTable from "./CompletedOrdersTable";
import { formatDateWithTimeAndDay, timeAgo } from "../utils/dateUtils";
import { formatNumberWithCommas } from "../utils/numberUtils";

const OrdersTabs = () => {
  const { orders, refreshOrders } = useOrders();

  const tabLabels = ["Incoming", "Ongoing", "Completed"] as string[];
  const tabContent = {
    Incoming: (
      <div className="flex space-x-2 overflow-x-auto">
        {orders?.incoming_orders?.data.map((order, index) => (
          <OrderCard
            key={index}
            time={formatDateWithTimeAndDay(order.created_at)}
            amount={formatNumberWithCommas(parseFloat(order.amount))}
            timeEllapsed={timeAgo(order.created_at)}
            paymentMethod={order.state}
            customerName={order.users.firstname}
            address={order.city}
            orderId={order.order_id}
            id={order.id}  
            distance={order.lat + order.long}
            // orderItems={order.orderItems}
            orderItems={order.menu_item.name}
            refreshOrders={refreshOrders}
            isOngoingOrder={false}
          />
        ))}
      </div>
    ),
    Ongoing: (
      <div className="flex space-x-2 overflow-x-auto">
        {orders?.ongoing_orders?.data.map((order, index) => (
          <OrderCard
            key={index}
            time={formatDateWithTimeAndDay(order.created_at)}
            amount={formatNumberWithCommas(parseFloat(order.amount))}
            paymentMethod={order.state}
            timeEllapsed={timeAgo(order.created_at)}
            customerName={order.users.firstname}
            address={order.city}
            id={order.id}  
            orderId={order.order_id}
            distance={order.lat + order.long}
            // orderItems={order.orderItems}
            orderItems={order.menu_item.name}
            refreshOrders={refreshOrders}
            isOngoingOrder={true}
          />
        ))}
      </div>
    ),
    Completed: (
      <div>
        <CompletedOrdersTable
          completedOrders={orders?.completed_orders?.data || []}
        />
      </div>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default OrdersTabs;
