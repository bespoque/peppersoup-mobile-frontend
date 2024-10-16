"use client";
import { useState } from "react";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";
import { useMenu } from "../context/MenuContext";
import UpdateMenuItemForm from "./UpdateMenuItemForm";

const MenusFoodMenu = () => {
  const tabLabels = ["on-the-menu", "all-saved-items"] as string[];
  const { menuData, loading, error } = useMenu(); 
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any | null>(null);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const handleEditMenuItem = (menuItem: any) => {
    setSelectedMenuItem(menuItem);
  };

  const handleCloseModal = () => {
    setSelectedMenuItem(null);
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
                  availability={item.availability}
                  name={item.name}
                  price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
                  description={item.desc}
                  image={item.menu_item_images[item.menu_item_images.length - 1]?.image_link}
                  tags={item.menu_item_tags.map((tag) => tag.tag.name)}
                  isDropdownActive={activeDropdown === index}
                  onDropdownToggle={() => handleDropdownToggle(index)}
                  onEdit={() => handleEditMenuItem(item)}
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
                  availability={item.availability}
                  name={item.name}
                  price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
                  description={item.desc}
                  image={item.menu_item_images[item.menu_item_images.length - 1]?.image_link}
                  tags={item.menu_item_tags.map((tag) => tag.tag.name)}
                  isDropdownActive={activeDropdown === index}
                  onDropdownToggle={() => handleDropdownToggle(index)}
                  onEdit={() => handleEditMenuItem(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  };

  return(
    <>
    <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
    {selectedMenuItem && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <UpdateMenuItemForm
              menuItem={selectedMenuItem}
              onUpdate={(updatedItem) => {
                console.log("Updated item:", updatedItem);
                setSelectedMenuItem(null); // Close the form after update
              }}
              onClose={handleCloseModal} // Pass close function
            />
          </div>
        </div>
      )}
    </>

  )
};

export default MenusFoodMenu;
