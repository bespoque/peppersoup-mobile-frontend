import { useState } from "react";

interface TabsProps<T extends string> {
  tabLabels: T[];
  tabContent: { [key in T]: React.ReactNode };
}

const Tabs = <T extends string>({ tabLabels, tabContent }: TabsProps<T>) => {
  const [activeTab, setActiveTab] = useState<T>(tabLabels[0]);

  const handleTabChange = (tab: T) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4">
      <div className="flex space-x-6 mb-6 border-b border-gray-300">
        {tabLabels.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-2 ${
              activeTab === tab ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{tabContent[activeTab]}</div>
    </div>
  );
};

export default Tabs;
