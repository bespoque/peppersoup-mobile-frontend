import Tabs from "./Tabs";
import TagsTable from "./TagsTable";
import CategoriesTable from "./CategoriesTable";

const SupportTabs = () => {
  const tabLabels = ["Open Tickets", "CLosed Tickets"] as string[];
  const tabContent = {
    "Open Tickets": (
      <div className="flex space-x-2 overflow-x-auto">
        <CategoriesTable />
      </div>
    ),
    "CLosed Tickets": (
      <div className="flex space-x-2 overflow-x-auto">
        <TagsTable />
      </div>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default SupportTabs;
