import { Box, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useGetActiveSubCamp, useUpdateSubCampaign } from "../hook";
import { ChangeEvent } from "react";
import { SubCampaignContext } from "../model";

const SubCampaignInfo = () => {
  console.log("Thông tin chiến dịch render");
  const selectedSubCamp = useGetActiveSubCamp();
  const updateSubCampaign = useUpdateSubCampaign();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedSubCamp: SubCampaignContext = {
      ...selectedSubCamp,
      name: e.target.value,
    };
    updateSubCampaign(updatedSubCamp);
  };

  const campStatusHandler = (_: unknown, v: boolean) => {
    const updatedSubCamp: SubCampaignContext = {
      ...selectedSubCamp,
      status: v,
    };
    console.log(updatedSubCamp);
    updateSubCampaign(updatedSubCamp);
  };

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
      }}
    >
      <TextField
        sx={{ flex: "0 0 70%" }}
        required
        label="Tên quảng cáo"
        id="subcampaign-name"
        variant="outlined"
        value={selectedSubCamp.name}
        onChange={handleChange}
        error={!!selectedSubCamp.error}
        helperText={selectedSubCamp.error}
      />
      <FormControlLabel
        sx={{ flex: "0 0 30%", marginBottom: 2, paddingLeft: 2 }}
        control={
          <Checkbox
            id={`camp-status-${selectedSubCamp.id}`}
            checked={selectedSubCamp.status}
            onChange={campStatusHandler}
          />
        }
        label="Đang hoạt động"
      />
    </Box>
  );
};

export default SubCampaignInfo;
