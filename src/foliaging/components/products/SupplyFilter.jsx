import React, { Fragment } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useSiteStateContext } from "../../states";
import { optionDisplay } from "../../utils";

export default function PlanterFilter({ handleFilterChange }) {
  const state = useSiteStateContext();

  return (
    <Fragment>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="supply-type-label">
            Type
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Type"
            arial-label="type"
            labelId="supply-type-label"
            name="supplyType"
            value={state.query.filter.supplyType}
            onChange={handleFilterChange}>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.single(state.options.supplies.types)}
          </Select>
        </FormControl>
      </Grid>
    </Fragment>
  );
}
