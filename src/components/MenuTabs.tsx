import { useState } from "react";
import MenuData from "@/src/data/MenuData";
import MenuItemCard from "@/src/components/MenuItemCard";

const MenuTabs = () => {
  const [activeTab, setActiveTab] = useState<"PepperSoup" | "SideDishes" | "Drinks">("PepperSoup");

  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  const handleTabChange = (tab: "PepperSoup" | "SideDishes" | "Drinks") => {
    setActiveTab(tab);
    setDropdownIndex(null); 
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index); 
  };

  return (
    <div className="p-4">
      <div className="flex space-x-6 mb-6 border-b border-gray-300">
        <button
          onClick={() => handleTabChange("PepperSoup")}
          className={`pb-2 ${activeTab === "PepperSoup" ? "border-b-2 border-black" : "text-gray-500"}`}
        >
          Pepper Soup
        </button>
        <button
          onClick={() => handleTabChange("SideDishes")}
          className={`pb-2 ${activeTab === "SideDishes" ? "border-b-2 border-black" : "text-gray-500"}`}
        >
          Side Dishes
        </button>
        <button
          onClick={() => handleTabChange("Drinks")}
          className={`pb-2 ${activeTab === "Drinks" ? "border-b-2 border-black" : "text-gray-500"}`}
        >
          Drinks
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MenuData[activeTab].map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            tags={item.tags}
            onDropdownToggle={() => handleDropdownToggle(index)}
            isDropdownActive={dropdownIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuTabs;
