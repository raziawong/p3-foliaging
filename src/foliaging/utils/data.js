import axios from "axios";

const apiBase = axios.create({
  baseURL: "https://tgc16-foliaging-express.herokuapp.com/api",
});

const apiPaths = {
  products: "/products",
  register: "/accounts/register",
  login: "/accounts/login",
  logout: "/accounts/logout",
  refresh: "/accounts/refresh",
  userProfile: "/user/profile",
  profileUpdate: "/user/profile/update",
  userAddresses: "/user/addresses",
  addressAdd: "/user/address/add",
  addressUpdate: "/user/address/update",
  userCart: "/user/cart",
  cartItemAdd: "/user/cart/add",
  cartItemRemove: "/user/cart/remove",
  cartItemQuantity: "/user/cart/quantity/update",
  userCheckout: "/user/checkout",
};

const getHeaderConfig = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getProducts = async (params) => {
  return await apiBase.get(apiPaths.products, { params });
};

const getAccountAuth = async (body) => {
  return await apiBase.post(apiPaths.login, { ...body });
};

const refreshAccountAuth = async (body) => {
  return await apiBase.post(apiPaths.refresh, { ...body });
};

const getUserProfile = async (token) => {
  return await apiBase.get(apiPaths.userProfile, getHeaderConfig(token));
};

const getUserCart = async (params, token) => {
  console.log(getHeaderConfig(token));
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

const processLogout = async (body) => {
  return await apiBase.post(apiPaths.logout, { ...body });
};

const processRegister = async (body) => {
  return await apiBase.post(apiPaths.register, { ...body });
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
  return await apiBase.delete(
    apiPaths.cartItemRemove,
    { params },
    getHeaderConfig(token)
  );
};

const fetchData = {
  products: async (params) => await getProducts(params),
  authentication: async (body) => await getAccountAuth(body),
  authRefresh: async (body) => await refreshAccountAuth(body),
  profile: async (token) => await getUserProfile(token),
  addresses: async (params, token) => await getUserCart(params, token),
  cart: async (params, token) => await getUserCart(params, token),
  checkout: async (params, token) => await getUserCheckout(params, token),
};

const processData = {
  logout: async (body) => await processLogout(body),
  register: async (body) => await processRegister(body),
  profileUpdate: async (body, token) => await processProfileUpdate(body, token),
  addressAdd: async (body, token) => await processAddressAdd(body, token),
  addressUpdate: async (body, token) => await processAddressUpdate(body, token),
  cartAdd: async (body, token) => await processCartAdd(body, token),
  cartUpdate: async (body, token) => await processCartUpdate(body, token),
  cartRemove: async (params, token) => await processCartDelete(params, token),
};

export { apiBase, apiPaths, fetchData, processData };
export default fetchData;
