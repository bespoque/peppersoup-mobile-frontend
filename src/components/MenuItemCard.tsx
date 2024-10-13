import { useEffect, useRef } from "react";
import Image from "next/image";

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
  tags: string[];
}

interface MenuItemCardProps extends MenuItem {
  onDropdownToggle: () => void;
  isDropdownActive: boolean;
  onEdit: () => void;
}

const MenuItemCard = ({
  name,
  price,
  description,
  image,
  tags,
  onDropdownToggle,
  isDropdownActive,
  onEdit,
}: MenuItemCardProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onDropdownToggle(); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onDropdownToggle]);


const uniqueTags = Array.from(new Set(tags));

  return (
    <div className="p-4 bg-white w-96 shadow rounded-lg flex items-start gap-4 relative">
      <Image
        src={image}
        alt={name}
        width={"155"}
        height={"150"}
        className="object-cover rounded-lg"
      />

      <div className="flex-1">
        <div className="relative">
          <button
            className="absolute top-0 right-0 text-gray-600 font-bold hover:text-gray-800 focus:outline-none"
            onClick={onDropdownToggle}
          >
            &#x22EE;
          </button>

          {isDropdownActive && (
            <div ref={dropdownRef} className="absolute top-8 right-0 mt-2 w-52 bg-white border rounded shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={onEdit}
                >
                  Edit this Item
                </li>
                {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Set as Out of Stock
                </li>
                <li className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                  Delete this Item
                </li> */}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-gray-500 mb-2 text-sm">{description}</p>
          <p className="text-black font-bold mb-4">{price}</p>
          <div className="text-sm text-gray-400">{uniqueTags.join(", ")}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
