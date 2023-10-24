import { Box, Button, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import { Advertisement, SubCampaignContext } from "../model";
import { Add, CheckBoxRounded } from "@mui/icons-material";
import {
  useAddNewSubCampaign,
  useSelectSubCampaign,
  useGetActiveSubCamp,
} from "../hook";
import { FC, useCallback } from "react";
import { useCampaign } from "../context/campaign-context";

interface Props {}

const SubCampaignList: FC<Props> = () => {
  console.log("Chiến dịch con render");
  const { subCampaigns } = useCampaign();
  const selectedSubCamp = useGetActiveSubCamp();
  const addNewSubCampaign = useAddNewSubCampaign();
  const selectSubCampaign = useSelectSubCampaign();

  const countAds = (adsList: Advertisement[]): number => {
    let count = 0;
    for (const ads of adsList) count += ads.quantity;
    return count;
  };

  const checkError = useCallback((camp: SubCampaignContext) => {
    let error = false;
    if (camp.error !== "") error = true;
    camp.ads.forEach((ads) => {
      if (ads.nameError !== "" || ads.quantityError !== "") error = true;
    });

    return error;
  }, []);

  return (
    <Box
      sx={{
        overflowX: "scroll",
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          m: 1,
        }}
      >
        <Tooltip title={"Thêm chiến dịch con"}>
          <Button
            sx={{ width: 150, height: "100%" }}
            onClick={addNewSubCampaign}
            variant="outlined"
          >
            <Add sx={{ fontSize: 50 }} />
          </Button>
        </Tooltip>
      </Box>
      {subCampaigns.map((camp) => {
        const { name, ads, status, id } = camp;
        const isSelectedCampaign = selectedSubCamp.id === id;
        const hasError = checkError(camp);
        return (
          <Container
            onClick={() => selectSubCampaign(camp)}
            key={id}
            sx={{
              m: 1,
              border: isSelectedCampaign ? 3 : 1,
              width: 300,
              borderColor: hasError
                ? "red"
                : isSelectedCampaign
                ? "green"
                : "divider",
              flexShrink: 0,
            }}
          >
            <h2>
              {name}
              <CheckBoxRounded
                sx={{
                  color: status ? "green" : "gray",
                  verticalAlign: "middle",
                  mb: 0.5,
                }}
              />
            </h2>
            <Tooltip title="Số lượng quảng cáo">
              <p style={{ textAlign: "center", fontSize: 22 }}>
                {countAds(ads)}
              </p>
            </Tooltip>
          </Container>
        );
      })}
    </Box>
  );
};

export default SubCampaignList;
