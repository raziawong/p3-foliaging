import React, { useEffect, useState } from "react";
import { Alert, alpha, Icon, Snackbar } from "@mui/material";
import {
  useSiteStateContext,
  useSiteDispatchContext,
  setMulti,
} from "../../states";
import siteColors from "../../styles/colors";

export default function SnackbarAlert() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (evt) => {
    setIsOpen(false);
    dispatch(setMulti({ error: "", success: "" }));
  };

  useEffect(() => {
    if (state.error || state.success) {
      setIsOpen(true);
    }
  }, [state.error, state.success]);

  return (
    <Snackbar open={isOpen} onClose={handleClose}>
      <Alert
        sx={{
          alignItems: "center",
          bgcolor: alpha(siteColors.charcoal, 0.9),
          textTransform: "uppercase",
        }}
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
