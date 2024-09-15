import { MenuItem } from "@/src/components/MenuItemCard"

const MenuData: {
  [key in "PepperSoup" | "SideDishes" | "Drinks"]: MenuItem[];
} = {
    PepperSoup: [
        {
          name: "Goat Meat Pepper Soup",
          price: "₦12,500",
          description:
            "Spicy and savory, made with tender goat meat and fresh herbs.",
          image: "/images/loginplate.png",
          tags: ["Popular Dish", "Featured"],
        },
        {
          name: "Goat Meat Pepper Soup",
          price: "₦12,500",
          description:
            "Spicy and savory, made with tender goat meat and fresh herbs.",
          image: "/images/loginplate.png",
          tags: ["Popular Dish", "Featured"],
        },
        {
          name: "Goat Meat Pepper Soup",
          price: "₦12,500",
          description:
            "Spicy and savory, made with tender goat meat and fresh herbs.",
          image: "/images/loginplate.png",
          tags: ["Popular Dish", "Featured"],
        },
        {
          name: "Chicken Pepper Soup",
          price: "₦12,500",
          description:
            "Spicy and savory, made with tender chicken and fresh herbs.",
          image: "/images/loginplate.png",
          tags: ["Popular Dish", "Featured"],
        },
        {
          name: "Chicken Pepper Soup",
          price: "₦12,500",
          description:
            "Spicy and savory, made with tender chicken and fresh herbs.",
          image: "/images/loginplate.png",
          tags: ["Popular Dish", "Featured"],
        },
        {
          name: "Chicken Pepper Soup",
          price: "₦12,500",
          description:
            "Spicy and savory, made with tender chicken and fresh herbs.",
          image: "/images/loginplate.png",
          tags: ["Popular Dish", "Featured"],
        },
      ],
      SideDishes: [
        {
          name: "Fried Rice",
          price: "₦5,000",
          description: "Delicious fried rice with vegetables and spices.",
          image: "/images/menu/rice.png",
          tags: ["Popular Dish"],
        },
        {
          name: "Fried Rice",
          price: "₦5,000",
          description: "Delicious fried rice with vegetables and spices.",
          image: "/images/menu/rice.png",
          tags: ["Popular Dish"],
        },
        {
          name: "Bread",
          price: "₦5,000",
          description: "Delicious fried rice with vegetables and spices.",
          image: "/images/menu/bread.png",
          tags: ["Popular Dish"],
        },
        {
          name: "Bread",
          price: "₦5,000",
          description: "Delicious fried rice with vegetables and spices.",
          image: "/images/menu/bread.png",
          tags: ["Popular Dish"],
        },
        {
          name: "Yam",
          price: "₦5,000",
          description: "Delicious fried rice with vegetables and spices.",
          image: "/images/menu/yam.png",
          tags: ["Popular Dish"],
        },
        {
          name: "Yam",
          price: "₦5,000",
          description: "Delicious fried rice with vegetables and spices.",
          image: "/images/menu/yam.png",
          tags: ["Popular Dish"],
        },
      ],
      Drinks: [
        {
          name: "Palm wine",
          price: "₦12,500",
          description: "Refreshing and flavorful drink made from hibiscus leaves.",
          image: "/images/menu/palmwine.png",
          tags: ["Popular Dishes", "Featured"],
        },
        {
          name: "Chapman",
          price: "₦12,500",
          description: "A Nigerian favorite, made with a mix of soda and bitters.",
          image: "/images/menu/chapman.png",
          tags: ["Popular Dishes", "Featured"],
        },
        {
          name: "Palm wine",
          price: "₦12,500",
          description: "Refreshing and flavorful drink made from hibiscus leaves.",
          image: "/images/menu/palmwine.png",
          tags: ["Popular Dishes", "Featured"],
        },
        {
          name: "Chapman",
          price: "₦12,500",
          description: "A Nigerian favorite, made with a mix of soda and bitters.",
          image: "/images/menu/chapman.png",
          tags: ["Popular Dishes", "Featured"],
        },
        {
          name: "Magarita",
          price: "₦12,500",
          description: "Refreshing and flavorful drink made from hibiscus leaves.",
          image: "/images/menu/wine.png",
          tags: ["Popular Dishes", "Featured"],
        },
        {
          name: "Magarita",
          price: "₦12,500",
          description: "A Nigerian favorite, made with a mix of soda and bitters.",
          image: "/images/menu/wine.png",
          tags: ["Popular Dishes", "Featured"],
        },
      ],
};

export default MenuData;
