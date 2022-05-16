import React, { Fragment } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useSiteStateContext } from "../../states";
import { optionDisplay } from "../../utils";

export default function PlantFilter({ handleFilterChange }) {
  const state = useSiteStateContext();

  return (
    <Fragment>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="species-label">
            Species Type
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Species"
            arial-label="species"
            labelId="species-label"
            name="species"
            value={state.query.filter.species}
            onChange={handleFilterChange}>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.single(state.options.plants.species)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="care-label">
            Care Level
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Care Level"
            arial-label="care level"
            labelId="care-label"
            name="care"
            value={state.query.filter.care}
            onChange={handleFilterChange}>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.single(state.options.plants.care)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="light-label">
            Light Requirement
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Light Requirement"
            arial-label="light requirement"
            labelId="light-label"
            name="light"
            value={state.query.filter.light}
            onChange={handleFilterChange}>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.single(state.options.plants.light)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="water-label">
            Watering Frequency
          </InputLabel>
          <Select
            fullWidth
            displayEmpty
            notched
            label="Watering Frequency"
            arial-label="watering frequency"
            labelId="water-label"
            name="water"
            value={state.query.filter.water}
            onChange={handleFilterChange}>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.single(state.options.plants.water)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel shrink id="traits-label">
            Traits
          </InputLabel>
          <Select
            multiple
            fullWidth
            displayEmpty
            notched
            label="Traits"
            arial-label="traits"
            labelId="traits-label"
            name="traits"
            value={state.query.filter.traits}
            onChange={handleFilterChange}
            renderValue={(vals) =>
              vals.length ? (
                state.options.traits
                  .filter(([id, name]) => vals.includes(id))
                  .map(([id, name]) => name)
                  .join(", ")
              ) : (
                <em>Please select</em>
              )
            }>
            <MenuItem disabled value="">
              <em>Please select</em>
            </MenuItem>
            {optionDisplay.multiple(
              state.options.traits?.length > 0 ? state.options.traits : [],
              state.query.filter.traits
            )}
          </Select>
        </FormControl>
      </Grid>
    </Fragment>
  );
}
