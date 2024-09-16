import Tabs from "./Tabs";
import { ordersData } from "../data/OrderData";
import OrderCard from "./OrderCard";
import CompletedOrdersTable from "./CompletedOrdersTable";

const OrdersTabs = () => {
  const tabLabels = ["Incoming", "Ongoing", "Completed"] as string[];
  const tabContent = {
    Incoming: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersData.map((order, index) => (
          <OrderCard
            key={index}
            time={order.time}
            amount={order.amount}
            paymentMethod={order.paymentMethod}
            customerName={order.customerName}
            uid={order.uid}
            address={order.address}
            orderId={order.orderId}
            distance={order.distance}
            orderItems={order.orderItems}
            discount={order.discount}
            onAcceptOrder={() => console.log("Accepted order", order.orderId)}
            onDeclineOrder={() => console.log("Declined order", order.orderId)}
          />
        ))}
      </div>
    ),
    Ongoing: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersData.map((order, index) => (
          <OrderCard
            key={index}
            time={order.time}
            amount={order.amount}
            paymentMethod={order.paymentMethod}
            customerName={order.customerName}
            uid={order.uid}
            address={order.address}
            orderId={order.orderId}
            distance={order.distance}
            orderItems={order.orderItems}
            discount={order.discount}
            onAcceptOrder={() => console.log("Accepted order", order.orderId)}
            onDeclineOrder={() => console.log("Declined order", order.orderId)}
          />
        ))}
      </div>
    ),
    Completed: (
      <div>
        <CompletedOrdersTable />
      </div>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default OrdersTabs;
