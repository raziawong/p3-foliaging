import { fetchData } from "../utils/data";
import stateConst from "./const";

export const initialState = {
  loading: true,
  products: [],
  user: {},
};

const siteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case stateConst.GET_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }

    default:
      return { ...state };
  }
};

export const getProducts = async ({ dispatch }) => {
  try {
    const products = await fetchData.products({});
    if (products) {
      dispatch(setProducts(products.data));
    }
  } catch (err) {
    console.log(err);
  }
};

export const setProducts = (payload) => {
  return { type: stateConst.GET_PRODUCTS, payload };
};

export default siteReducer;
