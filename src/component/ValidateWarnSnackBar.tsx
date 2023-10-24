import { useState, useEffect, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useResetValidateStatus } from "../hook";
import { useCampaign } from "../context/campaign-context";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ValidateWarnSnackBar = () => {
  const [open, setOpen] = useState(false);
  const { hasError } = useCampaign();
  const resetValidateStatus = useResetValidateStatus();

  useEffect(() => {
    if (hasError) setOpen(true);
  }, [hasError]);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    resetValidateStatus();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        Opssss! Vui lòng điền các trường bắt buộc 😔
      </Alert>
    </Snackbar>
  );
};

export default ValidateWarnSnackBar;
