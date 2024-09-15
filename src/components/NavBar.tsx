"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        label: "Home",
        href: "/home",
      },
      {
        label: "Orders",
        href: "/orders",
      },
      {
        label: "Menus",
        href: "/menus",
      },
      {
        label: "Support",
        href: "/help",
      },
      {
        label: "Discount & Promotions",
        href: "/discount",
      },
      {
        label: "Customer Feedbacks",
        href: "/feedback",
      },
    ],
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between p-4 border">
        {menuItems.map((i) => (
          <div className="flex gap-2" key={i.title}>
            <div className="border-r-2 p-3">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            </div>
            {i.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center justify-center py-2 md:px-2 ${
                    isActive ? "font-bold border-b-2 border-black" : ""
                  }`}
                >
                  <span className={`${isActive ? "pb-1" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full cursor-pointer ">
            <Image
              src="/images/notifications.png"
              alt="notifications"
              width={30}
              height={30}
              className="invert"
            />
          </div>
          <Image
            src="/images/avatar.png"
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-xs leading-3 font-bold">Elnino Sire</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
