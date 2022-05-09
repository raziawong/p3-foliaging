import { fetchData } from "../utils/data";
import stateConst from "./const";

export const initialState = {
  isAuthenticated: false,
  isLoading: false,
  products: [],
  user: {},
};

const siteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case stateConst.SET_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }

    case stateConst.SET_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    default:
      return { ...state };
  }
};

export const fetchProducts = async ({ dispatch }) => {
  try {
    const products = await fetchData.products({});
    if (products) {
      dispatch(setProducts(products.data));
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setProducts = (payload) => {
  return { type: stateConst.SET_PRODUCTS, payload };
};

export const setLoading = (payload) => {
  return { type: stateConst.SET_LOADING, payload };
};

export default siteReducer;
