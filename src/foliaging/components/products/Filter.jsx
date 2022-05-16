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
  setQuery,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";

export default function Filter() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();

  const handleReset = (evt) => {
    dispatch(setQuery(initialState.query));
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

  const handleSubmit = (evt) => {};

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
        {/* <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel shrink id="country-label">
              Country
            </InputLabel>
            <Select
              fullWidth
              displayEmpty
              notched
              label="Country"
              arial-label="Country"
              labelId="categories-label"
              name="countryId"
              value={filterOpts.countryId}
              onChange={(evt) => setFilterOpts(evt.target)}>
              <MenuItem disabled value="">
                <em>Please select</em>
              </MenuItem>
              {helper.countryOptDisplay(countries)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel shrink id="city-label">
              City
            </InputLabel>
            <Select
              fullWidth
              displayEmpty
              notched
              label="City"
              arial-label="City"
              labelId="city-label"
              name="cityId"
              value={sitate.cityId}
              onChange={(evt) => setFilterOpts(evt.target)}>
              <MenuItem disabled value="">
                <em>Please select</em>
              </MenuItem>
              {helper.cityOptDisplay(countries, filterOpts.countryId)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel shrink id="categories-label">
              Categories
            </InputLabel>
            <Select
              multiple
              fullWidth
              displayEmpty
              notched
              label="Categories"
              arial-label="Categories"
              labelId="categories-label"
              name="catIds"
              value={filterOpts.catIds}
              onChange={(evt) => setFilterOpts(evt.target)}
              renderValue={(vals) =>
                vals.length ? (
                  categories
                    .filter((c) => vals.includes(c._id))
                    .map((f) => f.name)
                    .join(", ")
                ) : (
                  <em>Please select</em>
                )
              }>
              <MenuItem disabled value="">
                <em>Please select</em>
              </MenuItem>
              {helper.categoriesOptDispay(
                categories?.length > 0 ? categories : [],
                filterOpts.catIds
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel shrink id="subcats-label">
              Sub-Categories
            </InputLabel>
            <Select
              multiple
              fullWidth
              displayEmpty
              notched
              labelId="subcats-label"
              label="Sub-Categories"
              arial-label="Sub-Categories"
              name="subcatIds"
              value={filterOpts.subcatIds}
              onChange={(evt) => setFilterOpts(evt.target)}
              renderValue={(vals) =>
                vals.length ? (
                  categories
                    .reduce((pv, cv) => {
                      return pv.concat(
                        cv.subcats.filter((sc) => vals.includes(sc._id))
                      );
                    }, [])
                    .map((f) => f.name)
                    .join(", ")
                ) : (
                  <em>Please select</em>
                )
              }>
              <MenuItem disabled value="">
                <em>Please select</em>
              </MenuItem>
              {helper.subcategoriesOptDispay(
                categories?.length > 0 ? categories : [],
                filterOpts.catIds,
                filterOpts.subcatIds
              )}
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ p: 2 }}>
          <InputLabel>Price</InputLabel>
          <FormControl sx={{ width: "98%", pl: 1 }}>
            <Slider
              getAriaLabel={() => "Price range"}
              valueLabelDisplay="auto"
              name="price"
              size="small"
              value={state.query.filter.price}
              onChange={handleFilterChange}
            />
          </FormControl>
        </Box>
      </Grid>
    </Fragment>
  );
}
