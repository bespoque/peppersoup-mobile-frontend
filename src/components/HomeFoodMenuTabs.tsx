"use client"
import { useState } from "react";
import MenuData from "@/src/data/MenuData";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const HomeFoodMenu = () => {
  const tabLabels = ["PepperSoup", "SideDishes", "Drinks"] as string[];
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const router = useRouter()
  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };
  
  const tabContent = {
    PepperSoup: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MenuData.PepperSoup.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            tags={item.tags}
            isDropdownActive={activeDropdown === index}
            onDropdownToggle={() => handleDropdownToggle(index)}
          />
        ))}
      </div>
    ),
    SideDishes: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MenuData.SideDishes.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            tags={item.tags}
            isDropdownActive={activeDropdown === index}
            onDropdownToggle={() => handleDropdownToggle(index)}
          />
        ))}
      </div>
    ),
    Drinks: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MenuData.Drinks.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            tags={item.tags}
            isDropdownActive={activeDropdown === index}
            onDropdownToggle={() => handleDropdownToggle(index)}
          />
        ))}
      </div>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default HomeFoodMenu;
