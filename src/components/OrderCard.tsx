import { FC } from "react";
import { HiPhone, HiUserCircle } from "react-icons/hi";
import { FaMapMarkerAlt, FaClipboard } from "react-icons/fa";

interface OrderCardProps {
  time: string;
  amount: string;
  paymentMethod: string;
  customerName: string;
  uid: string;
  address: string;
  orderId: string;
  distance: string;
  orderItems: {
    name: string;
    size: string;
    price: string;
    selections: { name: string; extra: string }[];
  };
  discount: string;
  onAcceptOrder: () => void;
  onDeclineOrder: () => void;
}

const OrderCard: FC<OrderCardProps> = ({
  time,
  amount,
  paymentMethod,
  customerName,
  uid,
  address,
  orderId,
  distance,
  orderItems,
  discount,
  onAcceptOrder,
  onDeclineOrder,
}) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 text-xs w-72 h-100 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <div className="w-24 h-24 bg-honeyDew rounded-lg p-2 flex flex-col justify-center items-center">
          <p className="font-semibold text-lg truncate">{time}</p>
          <p className="text-gray-400">Now</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">₦{amount}</p>
          <p className="text-gray-400 truncate">{paymentMethod}</p>
          <a href="#" className="underline">
            View Receipt
          </a>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiUserCircle size={38} className="text-gray-500" />
            <div>
              <p className="font-semibold truncate">{customerName}</p>
              <p className="text-gray-400">UID: #{uid}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-honeyDew rounded-full">
              <HiPhone size={18} />
            </button>
            <button className="p-2 bg-honeyDew rounded-full">
              <HiUserCircle size={18} />
            </button>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex items-center gap-2 mt-3">
          <FaMapMarkerAlt size={26} className="text-gray-500" />
          <p className="text-gray-600 truncate">
            {address}
            <span className="text-gray-400 ml-2">Within {distance}</span>
          </p>
        </div>
      </div>

      <hr className="my-2" />

      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold">Order ID</p>
        <div className="flex items-center gap-2">
          <p className="font-bold">{orderId}</p>
          <button className="p-1 bg-gray-100 rounded">
            <FaClipboard size={12} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold truncate">{`1x ${orderItems.name} (${orderItems.size})`}</p>
        <p className="text-gray-600 font-bold mb-2 truncate">
          ₦{orderItems.price}
        </p>
        <div className="overflow-y-auto max-h-16">
          {orderItems.selections.map((selection, index) => (
            <div key={index} className="flex justify-between">
              <p className="text-gray-600 truncate">{selection.name}</p>
              <p className="text-gray-600 font-semibold truncate">
                +₦{selection.extra}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <p className="text-gray-600 truncate">Discount Applied</p>
        <p className="text-red-600 font-semibold truncate">-₦{discount}</p>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={onAcceptOrder}
          className="flex-1 p-2 bg-paleGreen rounded-md shadow-lg"
        >
          Accept Order
        </button>
        <button
          onClick={onDeclineOrder}
          className="flex-1 p-2 border-2 border-black text-black rounded-md"
        >
          Decline Order
        </button>
      </div>
    </div>
  );
};

export default OrderCard;