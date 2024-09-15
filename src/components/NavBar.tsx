"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      { label: "Home", href: "/home" },
      { label: "Orders", href: "/orders" },
      { label: "Menus", href: "/menus" },
      { label: "Support", href: "/help" },
      { label: "Discount & Promotions", href: "/discount" },
      { label: "Customer Feedbacks", href: "/feedback" },
    ],
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile modal

  const handleProfileClick = () => {
    setIsProfileOpen((prevState) => !prevState); // Toggle modal
  };

  const closeModal = () => {
    setIsProfileOpen(false); // Close modal when clicking outside
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border">
        {/* Menu Links */}
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
          {/* Notification Bell */}
          <div className="flex self-end items-center justify-center w-10 h-10 bg-gray-300 rounded-lg mb-4">
            <Image
              src="/images/icons/bell.png"
              alt="notifications"
              width={20}
              height={20}
              className="invert"
            />
          </div>

          {/* Profile Icon */}
          <div
            className="flex self-end items-center justify-center w-10 h-10 bg-black rounded-lg mb-4 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src="/images/icons/profile.png"
              alt="profile"
              width={20}
              height={20}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>

          {/* Profile Modal Content */}
          <div className="fixed top-0 right-0 h-full w-50 bg-black text-white shadow-lg z-50 flex flex-col p-6">
            {/* Profile Information */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/icons/avatar.png"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h4 className="text-lg font-semibold">Odion Ighalo</h4>
                <p className="text-sm text-gray-400">Operations Manager</p>
              </div>
            </div>
            <hr className="mb-2" />

            {/* Settings and Logout Links */}
            <div className="flex flex-col space-y-4">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Image
                  src="/images/icons/settings.png"
                  alt="Settings"
                  width={20}
                  height={20}
                  className="invert"
                />
                <span>Settings</span>
              </button>

              <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Image
                  src="/images/icons/logout.png"
                  alt="Logout"
                  width={20}
                  height={20}
                  className="invert"
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
