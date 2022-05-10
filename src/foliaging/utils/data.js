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

const processLogout = async (body) => {
  return await apiBase.post(apiPaths.logout, { ...body });
};

const processRegister = async (body) => {
  return await apiBase.post(apiPaths.register, { ...body });
};

const fetchData = {
  products: async (params) => await getProducts(params),
  authentication: async (body) => await getAccountAuth(body),
  authRefresh: async (body) => await refreshAccountAuth(body),
};

const processData = {
  logout: async (body) => await processLogout(body),
  register: async (body) => await processRegister(body),
};

export { apiBase, apiPaths, fetchData, processData };
export default fetchData;
