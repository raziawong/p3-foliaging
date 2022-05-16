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
          <InputLabel shrink id="planter-type-label">
            Type
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Type"
            arial-label="type"
            labelId="planter-type-label"
            name="planterType"
            value={state.query.filter.planterType}
            onChange={handleFilterChange}>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.single(state.options.planters.types)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="material-label">
            Material
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Material"
            arial-label="material"
            labelId="material-label"
            name="material"
            value={state.query.filter.material}
            onChange={handleFilterChange}>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.single(state.options.planters.materials)}
          </Select>
        </FormControl>
      </Grid>
    </Fragment>
  );
}
