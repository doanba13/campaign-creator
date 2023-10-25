import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, useMemo } from "react";
import { useUpdateCampaignInfo } from "../hook";
import { debounce } from "lodash";
import { useCampaign } from "../context/campaign-context";

interface Props {}

const CampaignInformation: FC<Props> = () => {
  console.log("render campaign info");

  const {
    information: { name, describe, error },
  } = useCampaign();
  const updateCampaignInfo = useUpdateCampaignInfo();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateCampaignInfo(e.target.name, e.target.value);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeDebounced = useMemo(() => debounce(handleChange, 100), []);

  return (
    <>
      <TextField
        required
        onChange={handleChangeDebounced}
        name="name"
        error={!!error}
        helperText={error}
        defaultValue={name}
        label="Tên chiến dịch"
        variant="outlined"
      />
      <TextField
        name="describe"
        onChange={handleChangeDebounced}
        label="Mô tả"
        defaultValue={describe}
        variant="outlined"
      />
    </>
  );
};

export default CampaignInformation;
