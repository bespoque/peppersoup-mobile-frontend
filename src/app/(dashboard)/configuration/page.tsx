"use client";
import ConfigurationTabs from "@/src/components/ConfigurationTabs";
import ConfigModal from "@/src/components/ConfigModal";
import React, { useRef, useState } from "react";

export default function Configuration() {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    title: "",
    desc: "",
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleMenuSelection = (menuType: string) => {
    setSelectedMenu(menuType);
    setShowPopup(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", amount: "", title: "", desc: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Menu Configuration</h2>
      <div>
        <div className="flex justify-end items-center m-4">
          <button
            ref={buttonRef}
            onClick={togglePopup}
            className="bg-paleGreen font-semibold text-black py-2 px-4 rounded shadow"
          >
            Add New
          </button>
        </div>
        {showPopup && buttonRef.current && (
          <div
            className="mt-1 p-1 bg-white border rounded shadow absolute z-10"
            style={{
              top:
                buttonRef.current.getBoundingClientRect().bottom +
                window.scrollY,
              left: buttonRef.current.getBoundingClientRect().left,
            }}
          >
            <ul className="space-y-2">
              {/* <li
                className="hover:bg-cyan-900 hover:text-white rounded-md cursor-pointer"
                onClick={() => handleMenuSelection("category")}
              >
                <button className="p-1">Category</button>
              </li> */}
              <li
                className="hover:bg-cyan-900 hover:text-white rounded-md cursor-pointer"
                onClick={() => handleMenuSelection("tag")}
              >
                <button className="p-1">Tag</button>
              </li>
              <li
                className="hover:bg-cyan-900 hover:text-white rounded-md cursor-pointer"
                onClick={() => handleMenuSelection("side")}
              >
                <button className="p-1">Side</button>
              </li>
              <li
                className="hover:bg-cyan-900 hover:text-white rounded-md cursor-pointer"
                onClick={() => handleMenuSelection("portion")}
              >
                <button className="p-1">Portion Size</button>
              </li>
              <li
                className="hover:bg-cyan-900 hover:text-white rounded-md cursor-pointer"
                onClick={() => handleMenuSelection("addon")}
              >
                <button className="p-1">Add on</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <ConfigurationTabs />
      {showModal && (
        <ConfigModal
          selectedMenu={selectedMenu}
          formData={formData}
          handleInputChange={handleInputChange}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

