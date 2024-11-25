import Tabs from "./Tabs";
import OpenTickets from "./OpenTicketssTable";
import ClosedTickets from "./ClossedTicketsTable";

const SupportTabs: React.FC<{ openTickets: any[], resolvedTickets: any[] }> = ({ openTickets, resolvedTickets }) => {
  const tabLabels = ["Open Tickets", "Closed Tickets"] as string[];
  const tabContent = {
    "Open Tickets": (
      <div className="flex space-x-2 overflow-x-auto">
          <OpenTickets openTickets={openTickets} />
      </div>
    ),
    "Closed Tickets": (
      <div className="flex space-x-2 overflow-x-auto">
        <ClosedTickets resolvedTickets={resolvedTickets} />
      </div>
    ),
  };

  return <Tabs tabLabels={tabLabels} tabContent={tabContent} />;
};

export default SupportTabs;
