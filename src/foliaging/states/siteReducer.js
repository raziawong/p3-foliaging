import {
  messages,
  fetchData,
  getRefreshedToken,
  removeLocalTokens,
  setLocalTokens,
  triggerRefreshInterval,
  processData,
  getLocalTokens,
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
  CHECKING_OUT: "CHECKING_OUT",
};

export const stateKey = {
  USER_LOADING: "isUserLoading",
  DATA_LOADING: "isDataLoading",
  CART_LOADING: "isCartLoading",
};

export const initialState = {
  isAuthenticated: false,
  isCheckingOut: false,
  [stateKey.USER_LOADING]: false,
  [stateKey.DATA_LOADING]: false,
  [stateKey.CART_LOADING]: false,
  products: [],
  plants: [],
  planters: [],
  supplies: [],
  options: { plants: null, planters: null, supplies: null },
  search: { text: "", filter: null },
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
        [payload.type]: payload.value,
      };
    }

    case stateConst.SET_PRODUCTS: {
      return {
        ...state,
        ...payload,
      };
    }

    case stateConst.SET_USER: {
      const { intervalId, ...details } = payload;

      return {
        ...state,
        isAuthenticated: true,
        tokenIntervalId: intervalId || state.tokenIntervalId,
        user: { ...state.user, ...details },
      };
    }

    case stateConst.RESET_USER: {
      const { tokenIntervalId } = state;
      if (tokenIntervalId) {
        clearInterval(tokenIntervalId);
      }

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

    case stateConst.ADD_CART_ITEM: {
      let hasItem = false;
      let newCart = state.cart?.map((item) => {
        let newItem = item;
        if (item.id === payload.id) {
          hasItem = true;
          newItem = payload;
        }
        return newItem;
      });

      if (!hasItem) {
        newCart = [...state.cart, payload];
      }

      return {
        ...state,
        cart: newCart,
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

    case stateConst.CHECKING_OUT: {
      return {
        ...state,
        isCheckingOut: payload,
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
      const intervalId = triggerRefreshInterval();

      setLocalTokens({ accessToken, refreshToken });

      fetchCartItems({
        dispatch,
        userId: decoded.id,
        token: accessToken,
      });

      fetchUserDetails({ dispatch, intervalId, token: accessToken });
    }
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 402) {
      dispatch(setError(err.response.data.error));
    } else {
      dispatch(setError(messages.verificationError));
    }
  }
};

export const fetchInitialProducts = async ({ dispatch }) => {
  try {
    const promises = [
      await fetchData.products({}),
      await fetchData.plants({}),
      await fetchData.planters({}),
      await fetchData.supplies({}),
    ];
    Promise.allSettled(promises).then((resps) => {
      if (resps.length === promises.length) {
        const payload = {
          products: resps[0].value.data,
          plants: resps[1].value.data,
          planters: resps[2].value.data,
          supplies: resps[3].value.data,
        };

        dispatch(setProducts(payload));
      }
    });
  } catch (err) {
    dispatch(setError(messages.productsFetchError));
  } finally {
    dispatch(setLoading({ type: stateKey.DATA_LOADING, value: false }));
  }
};

export const fetchUserDetails = async ({ dispatch, intervalId, token }) => {
  try {
    dispatch(setLoading({ type: stateKey.USER_LOADING, value: true }));

    const resp = await fetchData.profile(token);

    if (resp.data?.user) {
      dispatch(setUser({ ...resp.data.user, intervalId }));
    }
  } catch (err) {
    dispatch(setError(messages.userId));
  } finally {
    dispatch(setLoading({ type: stateKey.USER_LOADING, value: false }));
  }
};

export const fetchCartItems = async ({ dispatch, userId, token }) => {
  try {
    dispatch(setLoading({ type: stateKey.CART_LOADING, value: true }));

    const resp = await fetchData.cart({ cid: userId }, token);

    if (resp.data?.items) {
      dispatch(setCart(resp.data.items));
    }
  } catch (err) {
    dispatch(setError(messages.cartFetchError));
  } finally {
    dispatch(setLoading({ type: stateKey.CART_LOADING, value: false }));
  }
};

export const processExistTokens = async ({
  dispatch,
  accessToken,
  refreshToken,
}) => {
  const newToken = await getRefreshedToken({ refreshToken, accessToken });
  if (newToken) {
    const decoded = jwt(newToken.accessToken);
    const intervalId = triggerRefreshInterval(dispatch);

    fetchCartItems({
      dispatch,
      userId: decoded.id,
      token: newToken.accessToken,
    });

    fetchUserDetails({ dispatch, intervalId, token: newToken.accessToken });
  } else {
    processLogout({ dispatch });
  }
};

export const processCartAdd = async ({ dispatch, token, cartItem }) => {
  try {
    if (token) {
      const resp = await processData.cartAdd({ ...cartItem }, token);

      if (resp.data?.item) {
        dispatch(addCartItem(resp.data.item));
        dispatch(setSuccess(messages.cartAddSuccess));
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

export const processCheckout = async ({ dispatch, token, details }) => {
  try {
    dispatch(checkingOut(true));
    const resp = await fetchData.checkout(details, token);
    if (resp.data.url) {
      window.location.replace(resp.data.url);
    }
  } catch (err) {
    dispatch(checkingOut(false));
    dispatch(setError(messages.checkoutError));
  }
};

export const processLogout = ({ dispatch }) => {
  try {
    const { accessToken, refreshToken } = getLocalTokens();

    if (accessToken && refreshToken) {
      processData.blacklistToken({ refreshToken }, accessToken);
      removeLocalTokens();
    }

    dispatch(resetUser());
    dispatch(setError(messages.sessionExpired));
  } catch (err) {
    console.log(err);
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

export const checkingOut = (payload) => {
  return { type: stateConst.CHECKING_OUT, payload };
};

export default siteReducer;
