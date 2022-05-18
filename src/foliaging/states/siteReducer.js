import {
  messages,
  fetchData,
  getRefreshedToken,
  removeLocalTokens,
  setLocalTokens,
  triggerRefreshInterval,
  processData,
  getLocalTokens,
  sortOptions,
  comparePriceAsc,
} from "../utils";
import jwt from "jwt-decode";

export const stateConst = {
  SET_MULTI: "SET_MULTI",
  SET_SUCCESS: "SET_SUCCESS",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
  SET_OPTIONS: "SET_OPTIONS",
  SET_QUERY: "SET_QUERY",
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
  PRODUCTS: "products",
  PLANTS: "plants",
  PLANTERS: "planters",
  SUPPLIES: "supplies",
};

export const initialState = {
  isAuthenticated: false,
  isCheckingOut: false,
  [stateKey.USER_LOADING]: false,
  [stateKey.DATA_LOADING]: false,
  [stateKey.CART_LOADING]: false,
  [stateKey.PRODUCTS]: [],
  [stateKey.PLANTS]: [],
  [stateKey.PLANTERS]: [],
  [stateKey.SUPPLIES]: [],
  options: {
    [stateKey.PLANTS]: {
      species: [],
      care: [],
      light: [],
      water: [],
      traits: [],
    },
    [stateKey.PLANTERS]: {
      types: [],
      materials: [],
    },
    [stateKey.SUPPLIES]: {
      types: [],
    },
    address: {
      types: [],
    },
  },
  query: {
    text: "",
    filter: {
      species: "",
      care: "",
      light: "",
      water: "",
      traits: [],
      planterType: "",
      material: "",
      supplyType: "",
      price: [],
    },
    sort: {
      index: 0,
      label: "What's New",
      sortField: "created_date",
      sortOrder: "DESC",
    },
  },
  priceRange: [],
  user: {},
  cart: [],
  tokenIntervalId: "",
  error: "",
  success: "",
};

export const siteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case stateConst.SET_MULTI: {
      return {
        ...state,
        ...payload,
      };
    }

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

    case stateConst.SET_OPTIONS: {
      return {
        ...state,
        options: { ...state.options, ...payload },
      };
    }

    case stateConst.SET_QUERY: {
      return {
        ...state,
        query: { ...state.query, ...payload },
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

export const fetchInitialData = async ({ dispatch }) => {
  try {
    dispatch(setLoading({ type: stateKey.DATA_LOADING, value: true }));

    const promises = [
      await fetchData.products({}),
      await fetchData.plants({}),
      await fetchData.planters({}),
      await fetchData.supplies({}),
      await fetchData.species(),
      await fetchData.care(),
      await fetchData.light(),
      await fetchData.water(),
      await fetchData.traits(),
      await fetchData.planterTypes(),
      await fetchData.materials(),
      await fetchData.supplyTypes(),
    ];

    Promise.allSettled(promises).then((resps) => {
      if (resps.length === promises.length) {
        const products = resps[0].value.data.products;

        let range = [];
        if (products && products.length) {
          const minToMax = [...products].sort(comparePriceAsc);
          range = [minToMax[0].price, minToMax[minToMax.length - 1].price];
        }

        const payload = {
          [stateKey.PRODUCTS]: products,
          [stateKey.PLANTS]: resps[1].value.data.plants,
          [stateKey.PLANTERS]: resps[2].value.data.planters,
          [stateKey.SUPPLIES]: resps[3].value.data.supplies,
          options: {
            [stateKey.PLANTS]: {
              species: resps[4].value.data.species,
              care: resps[5].value.data.care,
              light: resps[6].value.data.light,
              water: resps[7].value.data.water,
              traits: resps[8].value.data.traits,
            },
            [stateKey.PLANTERS]: {
              types: resps[9].value.data.types,
              materials: resps[10].value.data.materials,
            },
            [stateKey.SUPPLIES]: {
              types: resps[11].value.data.types,
            },
            address: initialState.options.address,
          },
          priceRange: range,
          [stateKey.DATA_LOADING]: false,
        };

        dispatch(setMulti(payload));
      }
    });
  } catch (err) {
    dispatch(
      setMulti({
        error: messages.productsFetchError,
        [stateKey.DATA_LOADING]: false,
      })
    );
  }
};

export const fetchUserDetails = async ({ dispatch, intervalId, token }) => {
  try {
    dispatch(setLoading({ type: stateKey.USER_LOADING, value: true }));

    const resp = await fetchData.profile(token);
    if (resp.data?.user) {
      dispatch(setUser({ ...resp.data.user, intervalId }));
    }
    dispatch(setLoading({ type: stateKey.USER_LOADING, value: false }));

    const resp2 = await fetchData.addressTypes(token);
    if (resp2.data?.types) {
      console.log(resp2.data);
      dispatch(setOptions({ address: { types: resp2.data.types } }));
    }
  } catch (err) {
    dispatch(
      setMulti({ error: messages.userId, [stateKey.USER_LOADING]: false })
    );
  }
};

export const fetchCartItems = async ({ dispatch, userId, token }) => {
  try {
    dispatch(setLoading({ type: stateKey.CART_LOADING, value: true }));

    const resp = await fetchData.cart({ cid: userId }, token);

    if (resp.data?.items) {
      dispatch(setCart(resp.data.items));
    }
    dispatch(setLoading({ type: stateKey.CART_LOADING, value: false }));
  } catch (err) {
    dispatch(
      setMulti({
        error: messages.cartFetchError,
        [stateKey.CART_LOADING]: false,
      })
    );
  }
};

export const processExistTokens = async ({
  dispatch,
  accessToken,
  refreshToken,
}) => {
  if (accessToken && refreshToken) {
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
  } else if (refreshToken) {
    processLogout({ dispatch });
  }
};

export const processProductQueries = async ({ query, dispatch }, callback) => {
  try {
    dispatch(setLoading({ type: stateKey.DATA_LOADING, value: true }));

    let { text, sort, filter } = query;
    let params = {};

    if (text) {
      params = { text };
    }

    if (filter && Object.keys(filter)) {
      params = { ...params, ...filter };

      if (filter.price.length && filter.price.length === 2) {
        const min_price = filter.price[0];
        const max_price = filter.price[1];
        params = { ...params, min_price, max_price };
      }

      delete params["price"];

      Object.entries(filter).map(([k, v]) =>
        !v || !v.length ? delete params[k] : ""
      );
    }

    if (!sort || !Object.keys(sort)) {
      sort = sortOptions.latest;
    }

    const promises = [
      await fetchData.products(params, sort),
      await fetchData.plants(params, sort),
      await fetchData.planters(params, sort),
      await fetchData.supplies(params, sort),
    ];

    Promise.allSettled(promises).then((resps) => {
      if (resps.length === promises.length) {
        const payload = {
          [stateKey.PRODUCTS]: resps[0].value.data.products,
          [stateKey.PLANTS]: resps[1].value.data.plants,
          [stateKey.PLANTERS]: resps[2].value.data.planters,
          [stateKey.SUPPLIES]: resps[3].value.data.supplies,
          [stateKey.DATA_LOADING]: false,
        };

        dispatch(setMulti(payload));

        if (typeof callback === "function") {
          callback();
        }
      }
    });
  } catch (err) {
    dispatch(
      setMulti({
        error: messages.productsFetchError,
        [stateKey.DATA_LOADING]: false,
      })
    );
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
    const resp = await processData.passwordUpdate(passwords, token);

    if (resp.data?.user) {
      dispatch(setSuccess(messages.passswordUpdateSuccess));
    }
  } catch (err) {
    dispatch(setError(messages.userUpdateError));
  }
};

export const processProfileUpdate = async ({ dispatch, token, profile }) => {
  try {
    const resp = await processData.profileUpdate(profile, token);

    if (resp.data?.user) {
      dispatch(setUser(resp.data.user));
      dispatch(setSuccess(messages.userUpdateSuccess));
    }
  } catch (err) {
    dispatch(setError(messages.userUpdateError));
  }
};

export const processAddressAdd = async ({ dispatch, token, address }) => {
  try {
    const resp = await processData.addressAdd(address, token);

    if (resp.data?.user) {
      dispatch(setUser(resp.data.user));
      dispatch(setSuccess(messages.addressUpdateSuccess));
    }
  } catch (err) {
    dispatch(setError(messages.addressUpdateError));
  }
};

export const processAddressUpdate = async ({
  dispatch,
  token,
  aid,
  address,
}) => {
  try {
    const resp = await processData.addressUpdate(aid, address, token);

    if (resp.data?.user) {
      dispatch(setUser(resp.data.user));
      dispatch(setSuccess(messages.addressUpdateSuccess));
    }
  } catch (err) {
    dispatch(setError(messages.addressUpdateError));
  }
};

export const processAddressDelete = async ({ dispatch, token, aid }) => {
  try {
    const resp = await processData.addressRemove({ aid }, token);

    if (resp.data?.user) {
      dispatch(setUser(resp.data.user));
      dispatch(setSuccess(messages.addressUpdateSuccess));
    }
  } catch (err) {
    dispatch(setError(messages.addressUpdateError));
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
    const { refreshToken } = getLocalTokens();

    if (refreshToken) {
      processData.blacklistToken({ refreshToken });
      removeLocalTokens();
    }

    dispatch(resetUser());
    dispatch(setError(messages.sessionExpired));
  } catch (err) {
    console.log(err);
  }
};

export const setMulti = (payload) => {
  return { type: stateConst.SET_MULTI, payload };
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

export const setOptions = (payload) => {
  return { type: stateConst.SET_OPTIONS, payload };
};

export const setQuery = (payload) => {
  return { type: stateConst.SET_QUERY, payload };
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
