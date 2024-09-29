"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
      { label: "Menu Configuration", href: "/configuration" },
    ],
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleProfileClick = () => {
    setIsProfileOpen((prevState) => !prevState);
  };
  const router = useRouter();
  const closeModal = () => {
    setIsProfileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const logoutUser = () => {
    Cookies.remove("token");
    Cookies.remove("token_expiry");

    router.push("/");
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border">
        <div className="flex gap-2">
          <div className="p-3 border-r-2">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          </div>
          <button
            className="block md:hidden w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Image
              src="/images/icons/profile.png"
              alt="Menu"
              width={24}
              height={24}
            />
          </button>

          <div className="hidden md:flex gap-6 items-center">
            {menuItems[0].items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`py-2 md:px-2 hover:bg-cyan-900 hover:rounded-lg hover:text-white ${
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
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center cursor-pointer">
            <Image
              src="/images/icons/bell.png"
              alt="notifications"
              width={20}
              height={20}
              className="invert"
            />
          </div>

          <div
            className="w-10 h-10 bg-black rounded-lg flex items-center justify-center  cursor-pointer"
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col p-4 space-y-2">
            {menuItems[0].items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`py-2 md:px-2 ${
                    isActive ? "font-bold border-b-2 border-black" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {isProfileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>
          <div className="fixed top-0 right-0 h-full w-50 bg-black text-white shadow-lg z-50 flex flex-col p-6">
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

            <div className="flex flex-col space-y-4">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Image
                  src="/images/icons/settings.png"
                  alt="Settings"
                  width={20}
                  height={20}
                  className="invert"
                />
                <span>Profile</span>
              </button>

              <button
                onClick={logoutUser}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
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
