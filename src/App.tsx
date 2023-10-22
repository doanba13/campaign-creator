import { useCallback, useState } from "react";
import "./App.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TabPanel from "./component/TabPanel";
import SubCampaignList from "./component/AdvertisementList";
import EnhancedTable from "./component/Advertisements";

function App() {
  const [tab, setTab] = useState(0);
  const handleTabChange = useCallback((_: unknown, i: number) => setTab(i), []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label="Advertisement tab"
          >
            <Tab
              label="Thông tin"
              id="adv-information"
              aria-controls={"Advertisement information tab"}
            />
            <Tab
              label="Chiến dịch con"
              id="sub-adv-information"
              aria-controls={"Sub advertisement tab"}
            />
          </Tabs>
        </Box>
        <TabPanel index={0} value={tab}>
          <TextField
            required
            id="outlined-basic"
            label="Tên chiến dịch"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Mô tả" variant="outlined" />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <SubCampaignList
            data={[{ name: "Quảng cáo 1", quantity: 100, active: true, id: 1 }]}
          />
          <Box
            sx={{
              p: 1,
              display: "flex",
            }}
          >
            <TextField
              sx={{ flex: "0 0 70%" }}
              required
              id="outlined-basic"
              label="Tên quảng cáo"
              variant="outlined"
            />
            <FormControlLabel
              sx={{ flex: "0 0 30%", marginBottom: 2, paddingLeft: 2 }}
              control={<Checkbox defaultChecked />}
              label="Đang hoạt động"
            />
          </Box>
          <EnhancedTable />
        </TabPanel>
      </Box>
    </>
  );
}

export default App;
