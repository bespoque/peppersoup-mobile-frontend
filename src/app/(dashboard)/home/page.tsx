"use client"
import MenuTabs from "@/src/components/MenuTabs";
import Summary from "@/src/components/SummaryCard";

const cardData = [
  {
    iconSrc: "/images/icons/bag.png",
    title: "Incoming Orders",
    value: "10",
    subtitle: "Last 2 Minutes",
    buttonText: "View Orders",
  },
  {
    iconSrc: "/images/icons/basket.png",
    title: "Completed Orders",
    value: "12,002",
    subtitle: "120 Orders Today",
    buttonText: "View Orders",
  },
  {
    iconSrc: "/images/icons/people.png",
    title: "Active Users",
    value: "33",
    subtitle: "10 in the last 7 Days",
    buttonText: "View Users",
  },
  {
    iconSrc: "/images/icons/money.png",
    title: "Annual Revenue",
    value: "₦120,334",
    subtitle: "Today: ₦50,000",
    buttonText: "View Revenue",
  },
];

const HomePage = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Operations Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {cardData.map((card, index) => (
          <Summary
            key={index}
            iconSrc={card.iconSrc}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            buttonText={card.buttonText}
          />
        ))}
      </div>
      <MenuTabs />
    </div>
  );
};

export default HomePage;
