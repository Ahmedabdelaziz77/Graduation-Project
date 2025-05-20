import { Button, Box, Stack } from "@mui/material";
import { useState } from "react";
import DealTable from "./DealTable";
import DealCategory from "./DealCategory";
import CreateDeal from "./CreateDeal";

const tabs = ["Deals", "Category", "Create Deal"];

function Deal() {
  const [selectedTab, setSelectedTab] = useState("Deals");

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2}>
        {tabs.map((item) => (
          <Button
            key={item}
            onClick={() => setSelectedTab(item)}
            variant={selectedTab === item ? "contained" : "outlined"}
          >
            {item}
          </Button>
        ))}
      </Stack>

      <Box sx={{ mt: 4 }}>
        {selectedTab === "Deals" ? (
          <DealTable />
        ) : selectedTab === "Category" ? (
          <DealCategory />
        ) : (
          <Box
            sx={{
              mt: 4,
              height: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CreateDeal />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Deal;
