import React, { useEffect, useState } from "react";
import { Alert, Icon, Snackbar } from "@mui/material";
import { setError, useSiteContext } from "../../states";
import siteColors from "../../styles/colors";

export default function SnackbarAlert() {
  const [state, dispatch] = useSiteContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (evt) => {
    setIsOpen(false);
    dispatch(setError(""));
  };

  useEffect(() => {
    if (state.error || state.success) {
      setIsOpen(true);
    }
  }, [state.error, state.success]);

  return (
    <Snackbar open={isOpen} onClose={handleClose}>
      <Alert
        sx={{ alignItems: "center", bgcolor: siteColors.charcoal }}
        onClose={handleClose}
        icon={
          <Icon
            className={
              state.error ? "ri-error-warning-line" : "ri-checkbox-circle-line"
            }
          />
        }
        severity={state.error ? "error" : "success"}>
        {state.error ? state.error : state.success}
      </Alert>
    </Snackbar>
  );
}
