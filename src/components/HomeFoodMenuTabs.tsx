"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/src/hooks/useApi";
import MenuItemCard from "@/src/components/MenuItemCard";
import Tabs from "./Tabs";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";

interface MenuItem {
  id: number;
  name: string;
  desc: string;
  menu_item_images: { image_link: string }[];
  menu_item_portion_size: { portion: { amount: number } }[];
  menu_item_tags: { tag: { name: string } }[];
}

interface MenuData {
  PepperSoup: MenuItem[];
  SideDishes: MenuItem[];
  Drinks: MenuItem[];
}

const HomeFoodMenu = () => {
  const tabLabels = ["PepperSoup", "SideDishes", "Drinks"] as string[];
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const { request, loading, error } = useApi();
  const [menuData, setMenuData] = useState<MenuData>({
    PepperSoup: [],
    SideDishes: [],
    Drinks: [],
  });

  const { user } = useUser();

  console.log("user", user);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  // Categorize menu items based on the title from the JSON response
  const categorizeMenuItems = (data: any) => {
    const categorizedData: MenuData = {
      PepperSoup: [],
      SideDishes: [],
      Drinks: [],
    };

    // Loop through the categories and assign items to each
    data.forEach((category: any) => {
      if (category.title === "PepperSoup") {
        categorizedData.PepperSoup = category.items.data;
      } else if (category.title === "Side Dishes") {
        categorizedData.SideDishes = category.items.data;
      } else if (category.title === "Drinks") {
        categorizedData.Drinks = category.items.data;
      }
    });

    setMenuData(categorizedData);
  };

  // Fetch all menu items and categorize them
  const fetchMenuItems = async () => {
    try {
      const response = await request("/api/core/kitchen-operations/menu-items/all", "GET");

      if (response?.resp_code === "00") {
        // Pass the full data response to the categorization function
        categorizeMenuItems(response.data);
        console.log("response.data", response.data);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const tabContent = {
    PepperSoup: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuData.PepperSoup.map((item, index) => (
          <MenuItemCard
            key={index}
            name={item.name}
            price={`₦${item.menu_item_portion_size[0]?.portion.amount}`}
            description={item.desc}
            image={ '/images/loginplate.png'} // Use image link if available
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
            image={ '/images/menu/rice.png'} // Use image link if available
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
            image={ '/images/menu/wine.png'} // Use image link if available
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
