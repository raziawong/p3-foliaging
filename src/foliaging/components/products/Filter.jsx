import React, { Fragment } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import {
  initialState,
  processProductQueries,
  setQuery,
  stateKey,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";
import { PlantFilter, PlanterFilter, SupplyFilter } from "../../components";

export default function Filter({ type }) {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const getPriceRangeValue = () => {
    const selectedRange = state.query.filter.price;

    return selectedRange.length ? selectedRange : state.priceRange;
  };

  const handleReset = (evt) => {
    dispatch(setQuery({ ...initialState.query, sort: state.query.sort }));
  };

  const handleSearchChange = ({ target }) => {
    dispatch(setQuery({ text: target.value }));
  };

  const handleFilterChange = ({ target }) => {
    dispatch(
      setQuery({
        filter: { ...state.query.filter, [target.name]: target.value },
      })
    );
  };

  const handleSubmit = (evt) => {
    dispatch(processProductQueries({ dispatch, query: state.query }));
  };

  return (
    <Fragment>
      <Grid container spacing={2} sx={{ alignItems: "center", mb: 2 }}>
        <Grid item xs={6}>
          <Typography>Options</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              size="small"
              variant="outlined"
              sx={{ mr: "2px" }}
              onClick={handleSubmit}>
              Filter
            </Button>
            <Button
              type="reset"
              size="small"
              variant="outlined"
              color="secondary"
              onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search"
            arial-label="Search"
            name="text"
            value={state.query.text}
            onChange={handleSearchChange}
          />
        </Grid>
        {type === stateKey.PLANTS ? (
          <PlantFilter handleFilterChange={handleFilterChange} />
        ) : type === stateKey.PLANTERS ? (
          <PlanterFilter handleFilterChange={handleFilterChange} />
        ) : type === stateKey.SUPPLIES ? (
          <SupplyFilter handleFilterChange={handleFilterChange} />
        ) : (
          <Fragment />
        )}
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ p: 2 }}>
          <InputLabel>Price Range</InputLabel>
          <FormControl sx={{ width: "98%", pl: 1 }}>
            <Slider
              getAriaLabel={() => "Price range"}
              min={state.priceRange[0]}
              max={state.priceRange[1]}
              valueLabelDisplay="auto"
              name="price"
              size="small"
              value={getPriceRangeValue()}
              onChange={handleFilterChange}
            />
          </FormControl>
        </Box>
      </Grid>
    </Fragment>
  );
}
