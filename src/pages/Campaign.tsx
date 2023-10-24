import { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import CampaignInformation from "../component/CampaignInfomation";
import SubCampaign from "../component/SubCampaign";
import TabPanel from "../component/TabPanel";
import DataDisplayDialog from "../component/DataDisplayDialog";
import ValidateWarnSnackBar from "../component/ValidateWarnSnackBar";
import { useValidateCampaign } from "../hook";

const Campaign = () => {
  const [tab, setTab] = useState(0);
  const validateCampaign = useValidateCampaign();
  const handleTabChange = (_: unknown, i: number) => setTab(i);

  console.log("Campaing render");
  return (
    <>
      <ValidateWarnSnackBar />
      <DataDisplayDialog />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
          <Button sx={{ m: 1 }} variant="outlined" onClick={validateCampaign}>
            Thêm
          </Button>
        </Box>
        <TabPanel index={0} value={tab}>
          <CampaignInformation />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <SubCampaign />
        </TabPanel>
      </Box>
    </>
  );
};

export default Campaign;
