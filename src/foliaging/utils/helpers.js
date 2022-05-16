import { Checkbox, ListItemText, MenuItem } from "@mui/material";

export const messages = {
  productsFetchError:
    "Something went wrong retrieving products. Please try again",
  verificationError:
    "Something went wrong with user verification. Please try again",
  registerSuccess: (name) => `Registration of ${name} completed`,
  registerDenied: "Registration failed. Please try again",
  registerFailed: "Something went wrong with registration. Please try again",
  sessionExpired: "Your session may have expired. Please login again",
  userFetchError:
    "Something went wrong retrieving customer details. Please try again",
  userUpdateSuccess: "Profile updated successfully",
  passswordUpdateSuccess: "Password updated successfully",
  userUpdateError: "Issue encountered during update. Please try again",
  cartAddSuccess: "Item added to cart",
  cartFetchError: "Something went wrong retrieving cart. Please try again",
  cartUpdateError: "Something went wrong updating cart item. Please try again",
  cartDeleteError: "Something went wrong deleting cart item. Please try again",
  checkoutError: "Something went wrong with checking out. Please try again",
};

export const sortOptions = {
  latest: { label: "What's New", sortField: "created_date", sortOrder: "DESC" },
  oldest: { label: "Oldest", sortField: "created_date", sortOrder: "ASC" },
  cheapest: {
    label: "Price: Low to High",
    sortField: "price",
    sortOrder: "ASC",
  },
  pricest: {
    label: "Price: High to Low",
    sortField: "price",
    sortOrder: "DESC",
  },
  alphabetical: {
    label: "Title: A to Z",
    sortField: "title",
    sortOrder: "ASC",
  },
  alphaReverse: {
    label: "Title: Z to A ",
    sortField: "title",
    sortOrder: "DESC",
  },
};

export const comparePriceAsc = (a, b) => a.price - b.price;

export const optionDisplay = {
  single: (values) =>
    values && values.length
      ? values.map(([id, name]) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))
      : [],
  multiple: (values, selected) =>
    values && values.length
      ? values.map(([id, name]) => (
          <MenuItem key={id} value={id}>
            <Checkbox checked={selected?.indexOf(id) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))
      : [],
};

export default messages;
