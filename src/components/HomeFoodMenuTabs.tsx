import { useMenu } from "@/src/context/MenuContext";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";
import Loader from "./Loader";
import { useState } from "react";
import UpdateMenuItemForm from "./UpdateMenuItemForm";

const HomeFoodMenu = () => {
  const tabLabels = ["PepperSoup", "SideDishes", "Drinks"] as string[];
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const { menuData, loading, error } = useMenu(); 
  const [selectedMenuItem, setSelectedMenuItem] = useState<any | null>(null);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const handleEditMenuItem = (menuItem: any) => {
    setSelectedMenuItem(menuItem); // Set the selected menu item for editing
  };

  const handleCloseModal = () => {
    setSelectedMenuItem(null); // Close the update form
  };

console.log("selectedMenuItem", selectedMenuItem);


  const tabContent = {
    PepperSoup: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {menuData.PepperSoup.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
            description={item.desc}
            image={item.menu_item_images[0]?.image_link}
            tags={item.menu_item_tags.map((tag) => tag.tag.name)}
            isDropdownActive={activeDropdown === index} 
            onDropdownToggle={() => handleDropdownToggle(index)} 
            onEdit={() => handleEditMenuItem(item)}
          />
        ))}
      </div>
    ),
    SideDishes: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuData.SideDishes.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
            description={item.desc}
            image={item.menu_item_images[0]?.image_link}
            tags={item.menu_item_tags.map((tag) => tag.tag.name)}
            isDropdownActive={activeDropdown === index}
            onDropdownToggle={() => handleDropdownToggle(index)} 
            onEdit={() => handleEditMenuItem(item)}
          />
        ))}
      </div>
    ),
    Drinks: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuData.Drinks.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
            description={item.desc}
            image={item.menu_item_images[0]?.image_link}
            tags={item.menu_item_tags.map((tag) => tag.tag.name)}
            isDropdownActive={activeDropdown === index}
            onDropdownToggle={() => handleDropdownToggle(index)}
            onEdit={() => handleEditMenuItem(item)}
          />
        ))}
      </div>
    ),
  };

  return (
    <>
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <Tabs tabLabels={tabLabels} tabContent={tabContent} />

      {selectedMenuItem && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <UpdateMenuItemForm
              menuItem={selectedMenuItem}
              onUpdate={(updatedItem) => {
                console.log('Updated item:', updatedItem);
                setSelectedMenuItem(null); // Close the form after update
              }}
              onClose={handleCloseModal} // Pass close function
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeFoodMenu;
