import axios from "axios";

const apiBase = axios.create({
  baseURL: "https://tgc16-foliaging-express.herokuapp.com/api",
});

const apiPaths = {
  products: "/products",
};

const getProducts = async (params) => {
  try {
    return await apiBase.get(apiPaths.products, { params });
  } catch (err) {
    console.log(err.message);
  }
};

const fetchData = {
  products: (params) => getProducts(params),
};

export { apiBase, apiPaths, fetchData };
