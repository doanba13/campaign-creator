import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useResetValidateStatus } from "../hook";
import { Campaign, CampaignInfo, SubCampaign } from "../model";
import { useCampaign } from "../context/campaign-context";

const DataDisplayDialog = () => {
  console.log("render dialog :) ");

  const {
    validated,
    information: info,
    subCampaigns: subCamps,
  } = useCampaign();
  const resetValidateStatus = useResetValidateStatus();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (validated) setOpen(true);
  }, [validated]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => resetValidateStatus(), 500);
  };

  const getCampaignData = (): Campaign | null => {
    if (!validated) return null;
    const { name, describe } = info;
    const information: CampaignInfo = { name, describe };
    const subCampaigns: SubCampaign[] = subCamps.map((s) => {
      const { ads: adsCtx, name, status } = s;
      const ads = adsCtx.map(({ name, quantity }) => ({ name, quantity }));
      return { name, status, ads };
    });
    return { information, subCampaigns };
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Thành công 😍
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div>
            <pre>{JSON.stringify(getCampaignData(), null, 2)}</pre>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataDisplayDialog;
