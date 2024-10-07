import { useMenu } from "@/src/context/MenuContext";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";
import Loader from "./Loader";
import { useState } from "react";

const HomeFoodMenu = () => {
  const tabLabels = ["PepperSoup", "SideDishes", "Drinks"] as string[];
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const { menuData, loading, error } = useMenu(); 
  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  console.log("menuData.SideDishes", menuData.SideDishes);
  

  const tabContent = {
    PepperSoup: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {menuData.PepperSoup.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
            description={item.desc}
            // image={"/images/loginplate.png"} 
            image={item.menu_item_images[0]?.image_link}
            tags={item.menu_item_tags.map((tag) => tag.tag.name)}
            isDropdownActive={activeDropdown === index} 
            onDropdownToggle={() => handleDropdownToggle(index)} 
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
            // image={"/images/menu/rice.png"} 
            tags={item.menu_item_tags.map((tag) => tag.tag.name)}
            isDropdownActive={activeDropdown === index}
            onDropdownToggle={() => handleDropdownToggle(index)} 
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
            // image={"/images/menu/wine.png"}
            image={item.menu_item_images[0]?.image_link}
            tags={item.menu_item_tags.map((tag) => tag.tag.name)}
            isDropdownActive={activeDropdown === index}
            onDropdownToggle={() => handleDropdownToggle(index)}
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
    </>
  );
};

export default HomeFoodMenu;
