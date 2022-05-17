import axios from "axios";
import { sortOptions } from "./helpers";

export const apiBase = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const apiPaths = {
  products: "/products",
  productPlants: "/products/plants",
  plantSpecies: "/products/plants/species",
  plantCare: "/products/plants/care-levels",
  plantLight: "/products/plants/light-requirements",
  plantWater: "/products/plants/water-frequencies",
  plantTraits: "/products/plants/traits",
  productPlanters: "/products/planters",
  planterTypes: "/products/planters/types",
  planterMaterials: "/products/planters/materials",
  productSupplies: "/products/supplies",
  supplyTypes: "/products/supplies/types",
  register: "/accounts/register",
  login: "/accounts/login",
  logout: "/accounts/logout",
  refresh: "/accounts/refresh",
  userProfile: "/user/profile",
  profileUpdate: "/user/profile/update",
  passwordUpdate: "/user/password/update",
  userAddresses: "/user/addresses",
  addressAdd: "/user/address/add",
  addressUpdate: "/user/address/update",
  userCart: "/user/cart",
  cartItemCheck: "/user/cart/quantity/check",
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

const getProducts = async (
  params,
  { sortField, sortOrder } = sortOptions.latest
) => {
  const apiPath = `${apiPaths.products}/${sortField}/${sortOrder}`;
  return await apiBase.get(apiPath, { params });
};

const getPlants = async (
  params,
  { sortField, sortOrder } = sortOptions.latest
) => {
  const apiPath = `${apiPaths.productPlants}/${sortField}/${sortOrder}`;
  return await apiBase.get(apiPath, { params });
};

const getPlantSpecies = async () => {
  return await apiBase.get(apiPaths.plantSpecies);
};

const getPlantCare = async () => {
  return await apiBase.get(apiPaths.plantCare);
};

const getPlantLight = async () => {
  return await apiBase.get(apiPaths.plantLight);
};

const getPlantWater = async () => {
  return await apiBase.get(apiPaths.plantWater);
};

const getPlantTraits = async () => {
  return await apiBase.get(apiPaths.plantTraits);
};

const getPlanters = async (
  params,
  { sortField, sortOrder } = sortOptions.latest
) => {
  const apiPath = `${apiPaths.productPlanters}/${sortField}/${sortOrder}`;
  return await apiBase.get(apiPath, { params });
};

const getPlanterTypes = async () => {
  return await apiBase.get(apiPaths.planterTypes);
};

const getPlanterMaterials = async () => {
  return await apiBase.get(apiPaths.planterMaterials);
};

const getSupplies = async (
  params,
  { sortField, sortOrder } = sortOptions.latest
) => {
  const apiPath = `${apiPaths.productSupplies}/${sortField}/${sortOrder}`;
  return await apiBase.get(apiPath, { params });
};

const getSupplyTypes = async () => {
  return await apiBase.get(apiPaths.supplyTypes);
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

const getCartItemQuantityCheck = async (params, token) => {
  return await apiBase.get(apiPaths.cartItemCheck, {
    params,
    ...getHeaderConfig(token),
  });
};

const processRegister = async (body) => {
  return await apiBase.post(apiPaths.register, { ...body });
};

const processPasswordUpdate = async (body, token) => {
  return await apiBase.post(
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
  products: async (params, sortOpts) => await getProducts(params, sortOpts),
  plants: async (params, sortOpts) => await getPlants(params, sortOpts),
  species: async () => await getPlantSpecies(),
  care: async () => await getPlantCare(),
  light: async () => await getPlantLight(),
  water: async () => await getPlantWater(),
  traits: async () => await getPlantTraits(),
  planters: async (params, sortOpts) => await getPlanters(params, sortOpts),
  planterTypes: async () => await getPlanterTypes(),
  materials: async () => await getPlanterMaterials(),
  supplies: async (params, sortOpts) => await getSupplies(params, sortOpts),
  supplyTypes: async () => await getSupplyTypes(),
  authentication: async (body) => await getAccountAuth(body),
  profile: async (token) => await getUserProfile(token),
  addresses: async (params, token) => await getUserCart(params, token),
  cart: async (params, token) => await getUserCart(params, token),
  cartItemCheck: async (params, token) =>
    await getCartItemQuantityCheck(params, token),
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
  blacklistToken: async (body) => await processBlacklistToken(body),
};

export default fetchData;
