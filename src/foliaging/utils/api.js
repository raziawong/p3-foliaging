import axios from "axios";

export const apiBase = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const apiPaths = {
  products: "/products",
  productPlants: "/products/plants",
  productPlanters: "/products/planters",
  productSupplies: "/products/supplies",
  register: "/accounts/register",
  login: "/accounts/login",
  logout: "/accounts/logout",
  refresh: "/accounts/refresh",
  userProfile: "/user/profile",
  profileUpdate: "/user/profile/update",
  passwordUpdate: "/user/profile/password/update",
  userAddresses: "/user/addresses",
  addressAdd: "/user/address/add",
  addressUpdate: "/user/address/update",
  userCart: "/user/cart",
  cartItemAdd: "/user/cart/add",
  cartItemRemove: "/user/cart/remove",
  cartItemQuantity: "/user/cart/quantity/update",
  userCheckout: "/user/checkout",
  userLogout: "/user/logout",
};

const getHeaderConfig = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getProducts = async (params) => {
  return await apiBase.get(apiPaths.products, { params });
};

const getPlants = async (params) => {
  return await apiBase.get(apiPaths.productPlants, { params });
};

const getPlanters = async (params) => {
  return await apiBase.get(apiPaths.productPlanters, { params });
};

const getSupplies = async (params) => {
  return await apiBase.get(apiPaths.productSupplies, { params });
};

const getAccountAuth = async (body) => {
  return await apiBase.post(apiPaths.login, { ...body });
};

const getUserProfile = async (token) => {
  return await apiBase.get(apiPaths.userProfile, getHeaderConfig(token));
};

const getUserCart = async (params, token) => {
  return await apiBase.get(apiPaths.userCart, {
    params,
    ...getHeaderConfig(token),
  });
};

const getUserCheckout = async (params, token) => {
  return await apiBase.get(apiPaths.userCheckout, {
    params,
    ...getHeaderConfig(token),
  });
};

const processRegister = async (body) => {
  return await apiBase.post(apiPaths.register, { ...body });
};

const processPasswordUpdate = async (body, token) => {
  return await apiBase.patch(
    apiPaths.passwordUpdate,
    { ...body },
    getHeaderConfig(token)
  );
};

const processProfileUpdate = async (body, token) => {
  return await apiBase.patch(
    apiPaths.profileUpdate,
    { ...body },
    getHeaderConfig(token)
  );
};

const processAddressAdd = async (body, token) => {
  return await apiBase.post(
    apiPaths.addressAdd,
    { ...body },
    getHeaderConfig(token)
  );
};

const processAddressUpdate = async (body, token) => {
  return await apiBase.patch(
    apiPaths.addressUpdate,
    { ...body },
    getHeaderConfig(token)
  );
};

const processCartAdd = async (body, token) => {
  return await apiBase.post(
    apiPaths.cartItemAdd,
    { ...body },
    getHeaderConfig(token)
  );
};

const processCartUpdate = async (body, token) => {
  return await apiBase.patch(
    apiPaths.cartItemQuantity,
    { ...body },
    getHeaderConfig(token)
  );
};

const processCartDelete = async (params, token) => {
  return await apiBase.delete(apiPaths.cartItemRemove, {
    params,
    ...getHeaderConfig(token),
  });
};

const processRefresh = async (body, token) => {
  return await apiBase.post(
    apiPaths.refresh,
    { ...body },
    getHeaderConfig(token)
  );
};

const processBlacklistToken = async (body) => {
  return await apiBase.post(apiPaths.userLogout, { ...body });
};

export const fetchData = {
  products: async (params) => await getProducts(params),
  plants: async (params) => await getPlants(params),
  planters: async (params) => await getPlanters(params),
  supplies: async (params) => await getSupplies(params),
  authentication: async (body) => await getAccountAuth(body),
  profile: async (token) => await getUserProfile(token),
  addresses: async (params, token) => await getUserCart(params, token),
  cart: async (params, token) => await getUserCart(params, token),
  checkout: async (params, token) => await getUserCheckout(params, token),
};

export const processData = {
  register: async (body) => await processRegister(body),
  profileUpdate: async (body, token) => await processProfileUpdate(body, token),
  passwordUpdate: async (body, token) =>
    await processPasswordUpdate(body, token),
  addressAdd: async (body, token) => await processAddressAdd(body, token),
  addressUpdate: async (body, token) => await processAddressUpdate(body, token),
  cartAdd: async (body, token) => await processCartAdd(body, token),
  cartUpdate: async (body, token) => await processCartUpdate(body, token),
  cartRemove: async (params, token) => await processCartDelete(params, token),
  refreshToken: async (body, token) => await processRefresh(body, token),
  blacklistToken: async (body, token) =>
    await processBlacklistToken(body, token),
};

export default fetchData;
