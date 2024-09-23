"use client";
import { useState, useRef } from "react";
import MenuData from "@/src/data/MenuData";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";

const MenusFoodMenu = () => {
  const tabLabels = ["on-the-menu", "all-saved-items"] as string[];
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const tabContent = {
    "on-the-menu": (
      <>
        <h5 className="font-bold">Menus Items for today</h5>
        <h4>Peppersoup</h4>
        <div className="overflow-x-auto mt-4">
          <div className="flex gap-6">
            {MenuData.PepperSoup.map((item, index) => (
              <div key={index}>
                <MenuItemCard
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  tags={item.tags}
                  isDropdownActive={activeDropdown === index}
                  onDropdownToggle={() => handleDropdownToggle(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    ),
    "all-saved-items": (
      <>
        <div className="flex justify-between items-center">
          <h5 className="font-bold">Side menu</h5>
        </div>
        <div className="overflow-x-auto mt-4">
          <div className="flex gap-6">
            {MenuData.SideDishes.map((item, index) => (
              <div key={index}>
                <MenuItemCard
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  tags={item.tags}
                  isDropdownActive={activeDropdown === index}
                  onDropdownToggle={() => handleDropdownToggle(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default MenusFoodMenu;
