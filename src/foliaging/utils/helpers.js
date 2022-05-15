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
  latest: { sortField: "created_date", sortOrder: "DESC" },
  oldest: { sortField: "created_date", sortOrder: "ASC" },
  pricest: { sortField: "price", sortOrder: "DESC" },
  cheapest: { sortField: "price", sortOrder: "ASC" },
  alphaReverse: { sortField: "title", sortOrder: "DESC" },
  alphabetical: { sortField: "title", sortOrder: "ASC" },
};

export default messages;
