import React, { Fragment, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { ArrowDropUpSharp, ArrowDropDownSharp } from "@mui/icons-material";
import { sortOptions } from "../../utils";
import {
  setQuery,
  useSiteDispatchContext,
  useSiteStateContext,
} from "../../states";

export default function Sort() {
  const state = useSiteStateContext();
  const dispatch = useSiteDispatchContext();
  const [anchor, setAnchor] = useState(null);

  const index = state.query.sort.index;
  const open = Boolean(anchor);
  const sortMenu = Object.values(sortOptions);

  const handleClickListItem = ({ currentTarget }) => {
    setAnchor(currentTarget);
  };

  const handleMenuItemClick = (evt, i) => {
    dispatch(setQuery({ sort: { ...sortMenu[i], index: i } }));
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Fragment>
      <Box sx={{ mb: 3 }}>
        <List aria-label="Sort Options" sx={{ p: 0 }}>
          <ListItem
            button
            aria-label="sort"
            sx={{ px: 0 }}
            secondaryAction={
              open ? <ArrowDropUpSharp /> : <ArrowDropDownSharp />
            }
            onClick={handleClickListItem}>
            <ListItemText primary="Sort By" secondary={sortMenu[index].label} />
          </ListItem>
        </List>
        <Menu
          anchorEl={anchor}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            role: "listbox",
            sx: {
              minWidth: { xs: "93vw", md: "29vw" },
            },
          }}>
          {sortMenu.map((opt, i) => (
            <MenuItem
              key={opt.sortField + "-" + opt.sortOrder}
              selected={i === index}
              onClick={(evt) => handleMenuItemClick(evt, i)}>
              {opt.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Fragment>
  );
}
