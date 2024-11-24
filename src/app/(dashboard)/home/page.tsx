"use client";

import HomeFoodMenu from "@/src/components/HomeFoodMenuTabs";
import Summary from "@/src/components/SummaryCard";
import { cardData } from "@/src/data/CardsData";
// import { useUser } from "@/src/context/UserContext";



// console.log("useUser", useUser);


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
            // buttonText={card.buttonText}
          />
        ))}
      </div>
      <HomeFoodMenu />
    </div>
  );
};

export default HomePage;
