import {
  messages,
  fetchData,
  getRefreshedToken,
  removeLocalTokens,
  setLocalTokens,
  triggerRefreshInterval,
  processData,
} from "../utils";
import jwt from "jwt-decode";

export const stateConst = {
  SET_SUCCESS: "SET_SUCCESS",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_USER: "SET_USER",
  RESET_USER: "RESET_USER",
  SET_CART: "SET_CART",
  ADD_CART_ITEM: "ADD_CART_ITEM",
  UPDATE_CART_ITEM: "UPDATE_CART_ITEM",
  DELETE_CART_ITEM: "DELETE_CART_ITEM",
};

export const initialState = {
  isAuthenticated: false,
  isLoading: false,
  products: [],
  user: {},
  cart: [],
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
      const { intervalId, ...details } = payload;

      return {
        ...state,
        isAuthenticated: true,
        tokenIntervalId: state.tokenIntervalId || intervalId,
        user: { ...state.user, ...details },
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
        cart: {},
      };
    }

    case stateConst.SET_CART: {
      return {
        ...state,
        cart: payload,
      };
    }

    case stateConst.UPDATE_CART_ITEM: {
      const newCart = state.cart?.map((item) => {
        let newItem = item;
        if (item.id === payload.id) {
          newItem = payload;
        }
        return newItem;
      });

      return {
        ...state,
        cart: newCart,
      };
    }

    case stateConst.DELETE_CART_ITEM: {
      const newCart = state.cart?.filter(
        (item) => item.product_id !== payload.pid
      );

      return {
        ...state,
        cart: newCart,
      };
    }

    default:
      return { ...state };
  }
};

export const fetchAuthTokens = async ({ dispatch, body }) => {
  try {
    const resp = await fetchData.authentication(body);
    if (resp?.data?.tokens) {
      const { accessToken, refreshToken } = resp.data.tokens;
      const decoded = jwt(accessToken);
      const intervalId = triggerRefreshInterval(refreshToken);

      dispatch(setLoading(true));

      setLocalTokens({ accessToken, refreshToken });

      fetchCartItems({
        dispatch,
        userId: decoded.id,
        token: accessToken,
      });

      fetchUserDetails({ dispatch, intervalId, token: accessToken });
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

export const fetchProducts = async ({ dispatch }) => {
  try {
    const resp = await fetchData.products({});
    if (resp.data) {
      dispatch(setProducts(resp.data));
    }
  } catch (err) {
    dispatch(setError(messages.productsFetchError));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUserDetails = async ({ dispatch, token }) => {
  try {
    const resp = await fetchData.profile(token);
    if (resp.data?.user) {
      dispatch(setUser(resp.data.user));
    }
  } catch (err) {
    dispatch(setError(messages.userId));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCartItems = async ({ dispatch, userId, token }) => {
  try {
    const resp = await fetchData.cart({ cid: userId }, token);
    if (resp.data?.items) {
      dispatch(setCart(resp.data.items));
    }
  } catch (err) {
    dispatch(setError(messages.cartFetchError));
  } finally {
    dispatch(setLoading(false));
  }
};

export const processExistTokens = async ({ dispatch, refreshToken }) => {
  const newToken = await getRefreshedToken(refreshToken);
  if (newToken) {
    const decoded = jwt(newToken.accessToken);
    const intervalId = triggerRefreshInterval(refreshToken, dispatch);

    dispatch(setLoading(true));

    setLocalTokens({ accessToken: newToken.accessToken });

    fetchCartItems({
      dispatch,
      userId: decoded.id,
      token: newToken.accessToken,
    });

    fetchUserDetails({ dispatch, intervalId, token: newToken.accessToken });
  } else {
    removeLocalTokens();
    dispatch(resetUser());
  }
};

export const processCartAdd = async ({ dispatch, token, cartItem }) => {
  try {
    if (token) {
      const resp = await processData.cartAdd({ ...cartItem }, token);

      if (resp.data?.item) {
        dispatch(updateCartItem(resp.data.item));
      }
    }
  } catch (err) {
    dispatch(setError(messages.cartUpdateError));
  }
};

export const processCartUpdate = async ({ dispatch, token, cartItem }) => {
  try {
    if (token) {
      const resp = await processData.cartUpdate({ ...cartItem }, token);

      if (resp.data?.item) {
        dispatch(updateCartItem(resp.data.item));
      }
    }
  } catch (err) {
    dispatch(setError(messages.cartUpdateError));
  }
};

export const processCartDelete = async ({ dispatch, token, cid, pid }) => {
  try {
    if (token) {
      const resp = await processData.cartRemove({ cid, pid }, token);

      if (resp.data?.success) {
        dispatch(deleteCartItem({ pid }));
      }
    }
  } catch (err) {
    dispatch(setError(messages.cartDeleteError));
  }
};

export const processPasswordUpdate = async ({ dispatch, token, passwords }) => {
  try {
    const results = await processData.passwordUpdate(passwords, token);
    if (results.data?.user) {
      dispatch(setSuccess(messages.passswordUpdateSuccess));
    }
  } catch (err) {
    dispatch(setError(messages.userUpdateError));
  }
};

export const processLogout = async ({ dispatch }) => {
  removeLocalTokens();
  dispatch(resetUser());

  // TODO blacklisted token
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

export const setCart = (payload) => {
  return { type: stateConst.SET_CART, payload };
};

export const addCartItem = (payload) => {
  return { type: stateConst.ADD_CART_ITEM, payload };
};

export const updateCartItem = (payload) => {
  return { type: stateConst.UPDATE_CART_ITEM, payload };
};

export const deleteCartItem = (payload) => {
  return { type: stateConst.DELETE_CART_ITEM, payload };
};

export default siteReducer;
