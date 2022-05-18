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
  addressUpdateSuccess: "Address Book updated successfully",
  addressUpdateError:
    "Issue encountered during update of Address Book. Please try again",
  userUpdateError: "Issue encountered during update. Please try again",
  cartAddSuccess: "Item added to cart",
  cartFetchError: "Something went wrong retrieving cart. Please try again",
  cartUpdateError: "Something went wrong updating cart item. Please try again",
  cartDeleteError: "Something went wrong deleting cart item. Please try again",
  checkoutError: "Something went wrong with checking out. Please try again",
};

export const sortOptions = {
  latest: {
    index: 0,
    label: "What's New",
    sortField: "created_date",
    sortOrder: "DESC",
  },
  oldest: {
    index: 1,
    label: "Oldest",
    sortField: "created_date",
    sortOrder: "ASC",
  },
  cheapest: {
    index: 2,
    label: "Price: Low to High",
    sortField: "price",
    sortOrder: "ASC",
  },
  pricest: {
    index: 3,
    label: "Price: High to Low",
    sortField: "price",
    sortOrder: "DESC",
  },
  alphabetical: {
    index: 4,
    label: "Title: A to Z",
    sortField: "title",
    sortOrder: "ASC",
  },
  alphaReverse: {
    index: 5,
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
  address: (values) =>
    values && values.length
      ? values.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        ))
      : [],
};

export const formatAddress = ({
  line_1,
  line_2,
  floor_number,
  unit_number,
  postal_code,
}) => {
  let address = line_1;

  if (line_2) {
    address += ", " + line_2;
  }

  if (floor_number && unit_number) {
    address += ", #" + floor_number + "-" + unit_number;
  }

  if (postal_code) {
    address += ", Singapore " + postal_code;
  }

  return address;
};

export default messages;
