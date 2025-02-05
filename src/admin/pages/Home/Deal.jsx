import { Button } from "@mui/material";
import { useState } from "react";
import DealTable from "./DealTable";
import DealCategory from "./DealCategory";
import CreateDeal from "./CreateDeal";

const tabs = ["Deals", "Category", "Create Deal"];
function Deal() {
  const [selectedTab, setSelectedTab] = useState("Deals");
  return (
    <div>
      <div className="flex gap-4">
        {tabs.map((item) => (
          <Button
            onClick={() => setSelectedTab(item)}
            variant={selectedTab === item ? "contained" : "outlined"}
            key={item}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="mt-5">
        {selectedTab === "Deals" ? (
          <DealTable />
        ) : selectedTab === "Category" ? (
          <DealCategory />
        ) : (
          <div className="mt-5 flex flex-col justify-center items-center h-[70vh]">
            <CreateDeal />
          </div>
        )}
      </div>
    </div>
  );
}

export default Deal;
