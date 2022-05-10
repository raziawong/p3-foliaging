import axios from "axios";

const apiBase = axios.create({
  baseURL: "https://tgc16-foliaging-express.herokuapp.com/api",
});

const apiPaths = {
  products: "/products",
  login: "/accounts/login",
  logout: "/accounts/logout",
};

const getProducts = async (params) => {
  return await apiBase.get(apiPaths.products, { params });
};

const getAccountAuth = async (body) => {
  return await apiBase.post(apiPaths.login, { ...body });
};

const fetchData = {
  products: async (params) => await getProducts(params),
  authentication: async (body) => await getAccountAuth(body),
};

export { apiBase, apiPaths, fetchData };
