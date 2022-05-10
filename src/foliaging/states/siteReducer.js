import { fetchData } from "../utils/data";
import { messages } from "../utils/helpers";

export const stateConst = {
  SET_SUCCESS: "SET_SUCCESS",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
  SET_PRODUCTS: "SET_PRODUCTS",
};

export const initialState = {
  isAuthenticated: false,
  isLoading: false,
  products: [],
  user: {},
  error: "",
  success: "",
};

export const siteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case stateConst.SET_SUCCESS: {
      return {
        ...state,
        success: payload,
      };
    }

    case stateConst.SET_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }

    case stateConst.SET_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case stateConst.SET_PRODUCTS: {
      return {
        ...state,
        products: payload,
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
    dispatch(setError(messages.productsFetchError));
  } finally {
    dispatch(setLoading(false));
  }
};

export const setSuccess = (payload) => {
  return { type: stateConst.SET_SUCCESS, payload };
};

export const setError = (payload) => {
  return { type: stateConst.SET_ERROR, payload };
};

export const setLoading = (payload) => {
  return { type: stateConst.SET_LOADING, payload };
};

export const setProducts = (payload) => {
  return { type: stateConst.SET_PRODUCTS, payload };
};

export default siteReducer;
