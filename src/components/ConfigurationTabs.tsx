import Tabs from "./Tabs";
import TagsTable from "./TagsTable";
import SideTable from "./SideTable";
import PortionSizeTable from "./PortionSizeTable";
import AddonsTable from "./AddonsTable";

const ConfigurationTabs = () => {
  const tabLabels = ["Tags", "Sides", "portion size", "Add-ons"] as string[];
  const tabContent = {
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
      <div>
        <PortionSizeTable />
      </div>
    ),
    "Add-ons": (
      <div>
        <AddonsTable />
      </div>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default ConfigurationTabs;
