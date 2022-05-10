import { fetchData } from "../utils/data";
import { messages } from "../utils/helpers";
import jwt from "jwt-decode";
import {
  getRefreshedToken,
  setLocalTokens,
  triggerRefreshInterval,
} from "../utils/auth";

export const stateConst = {
  SET_SUCCESS: "SET_SUCCESS",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_USER: "SET_USER",
  RESET_USER: "RESET_USER",
};

export const initialState = {
  isAuthenticated: false,
  isLoading: false,
  products: [],
  user: {},
  tokenIntervalId: "",
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

    case stateConst.SET_USER: {
      const { email, username, id, intervalId } = payload;

      return {
        ...state,
        isAuthenticated: true,
        tokenIntervalId: state.tokenIntervalId || intervalId,
        user: {
          id,
          email,
          username,
        },
      };
    }

    case stateConst.RESET_USER: {
      const { tokenIntervalId } = state;
      if (tokenIntervalId) clearInterval(tokenIntervalId);

      return {
        ...state,
        isAuthenticated: false,
        tokenIntervalId: "",
        user: {},
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

export const fetchAuthTokens = async ({ dispatch, body }) => {
  try {
    const resp = await fetchData.authentication(body);
    if (resp?.data?.tokens) {
      const { accessToken, refreshToken } = resp.data.tokens;
      let decoded = jwt(accessToken);
      decoded.intervalId = triggerRefreshInterval(refreshToken);

      setLocalTokens(resp.data.tokens);
      dispatch(setUser(decoded));
    }
  } catch (err) {
    console.log(err);
    if (err.response?.status === 401 || err.response?.status === 402) {
      dispatch(setError(err.response.data.error));
    } else {
      dispatch(setError(messages.verificationError));
    }
  }
};

export const processExistTokens = async ({ dispatch, refreshToken }) => {
  const newToken = await getRefreshedToken(refreshToken);
  if (newToken) {
    let decoded = jwt(newToken.accessToken);
    decoded.intervalId = triggerRefreshInterval(refreshToken, dispatch);
    dispatch(setUser(decoded));
  } else {
    dispatch(resetUser());
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

export const setUser = (payload) => {
  return { type: stateConst.SET_USER, payload };
};

export const resetUser = () => {
  return { type: stateConst.RESET_USER };
};

export default siteReducer;
