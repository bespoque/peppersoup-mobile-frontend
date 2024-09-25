"use client";
import { useState } from "react";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";
import { useMenu } from "../context/MenuContext";

const MenusFoodMenu = () => {
  const tabLabels = ["on-the-menu", "all-saved-items"] as string[];
  const { menuData, loading, error } = useMenu(); 
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
            {menuData.PepperSoup.map((item, index) => (
              <div key={index}>
                <MenuItemCard
                  name={item.name}
                  price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
                  description={item.desc}
                  image={'/images/loginplate.png'}
                  tags={item.menu_item_tags.map((tag) => tag.tag.name)}
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
            {menuData.SideDishes.map((item, index) => (
              <div key={index}>
                <MenuItemCard
                  name={item.name}
                  price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
                  description={item.desc}
                  image={"/images/menu/bread.png"}
                  tags={item.menu_item_tags.map((tag) => tag.tag.name)}
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
