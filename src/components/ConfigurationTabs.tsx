import Tabs from "./Tabs";
import TagsTable from "./TagsTable";
import SideTable from "./SideTable";
import PortionSizeTable from "./PortionSizeTable";
import AddonsTable from "./AddonsTable";
import CategoriesTable from "./CategoriesTable";

const ConfigurationTabs = () => {
  const tabLabels = ["Categories", "Tags", "Sides", "portion size", "Add-ons"] as string[];
  const tabContent = {
    Categories: (
      <div className="flex space-x-2 overflow-x-auto">
        <CategoriesTable />
      </div>
    ),
    Tags: (
      <div className="flex space-x-2 overflow-x-auto">
        <TagsTable />
      </div>
    ),
    Sides: (
      <div className="flex space-x-2 overflow-x-auto">
       <SideTable />
      </div>
    ),
    "portion size": (
      <div className="flex space-x-2 overflow-x-auto">
        <PortionSizeTable />
      </div>
    ),
    "Add-ons": (
      <div className="flex space-x-2 overflow-x-auto">
        <AddonsTable />
      </div>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default ConfigurationTabs;
