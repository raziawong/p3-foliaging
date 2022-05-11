import jwt from "jwt-decode";
import { resetUser, setUser } from "../states/siteReducer";
import fetchData from "./data";

const setLocalTokens = (tokens) => {
  const localTokens = getLocalTokens();
  return localStorage.setItem(
    "tokens",
    JSON.stringify({ ...localTokens, ...tokens })
  );
};

const getLocalTokens = () => {
  const tokens = localStorage.getItem("tokens");
  if (tokens) {
    return JSON.parse(tokens);
  }
  return false;
};

const removeLocalTokens = () => {
  return localStorage.removeItem("tokens");
};

const isTokenValid = ({ exp }) => {
  const now = Date.now().valueOf() / 1000;
  if (typeof exp !== "undefined" && exp < now) {
    return false;
  }
  return true;
};

const getRefreshedToken = async (refreshToken) => {
  const decodedRefresh = jwt(refreshToken);
  let resp = false;
  if (isTokenValid(decodedRefresh)) {
    resp = await fetchData.authRefresh({ refreshToken });
    if (resp?.data) {
      setLocalTokens({ accessToken: resp.data.accessToken });
      return resp.data;
    }
  }
  return resp;
};

const triggerRefreshInterval = (refreshToken, dispatch, intervalId = "") => {
  const id = setInterval(() => {
    const isValid = isTokenValid(refreshToken);
    if (!isValid) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      removeLocalTokens();
      dispatch(resetUser());
    } else {
      const doRefresh = async () => {
        const tokens = await getRefreshedToken(refreshToken);
        const decoded = jwt(tokens.accessToken);
        setLocalTokens(tokens);
        dispatch(setUser(decoded));
      };
      doRefresh();
    }
  }, 720000);

  return id;
};

export {
  setLocalTokens,
  getLocalTokens,
  removeLocalTokens,
  isTokenValid,
  triggerRefreshInterval,
  getRefreshedToken,
};
