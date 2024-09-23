"use client";
import { useState, useRef } from "react";
import MenuData from "@/src/data/MenuData";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";

const MenusFoodMenu = () => {
  const tabLabels = ["on-the-menu", "all-saved-items"] as string[];
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const tabContent = {
    "on-the-menu": (
      <>
      <h5 className="font-bold">Menus Items for today</h5>
        <div className="flex justify-between items-center">
          <h5 >Peppersoup menu</h5>
          <button
            ref={buttonRef}
            onClick={togglePopup}
            className="bg-paleGreen text-black py-2 px-4 rounded shadow"
          >
            Add New Menu Item
          </button>
        </div>
        {showPopup && buttonRef.current && (
          <div
            className="mt-1 p-4 bg-white border rounded shadow absolute z-10"
            style={{
              top:
                buttonRef.current.getBoundingClientRect().bottom +
                window.scrollY,
              left: buttonRef.current.getBoundingClientRect().left,
            }}
          >
            <ul className="space-y-2">
              <li>
                <button onClick={() => console.log("Add to Peppersoup Menu")}>
                  To Peppersoup Menu
                </button>
              </li>
              <li>
                <button onClick={() => console.log("Add to Sides Menu")}>
                  To Sides Menu
                </button>
              </li>
              <li>
                <button onClick={() => console.log("Add to Drinks Menu")}>
                  To Drinks Menu
                </button>
              </li>
            </ul>
          </div>
        )}
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
