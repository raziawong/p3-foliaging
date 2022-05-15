import jwt from "jwt-decode";
import { processLogout } from "../states/siteReducer";
import { processData } from "./api";

export const setLocalTokens = (tokens) => {
  const localTokens = getLocalTokens();
  return localStorage.setItem(
    "tokens",
    JSON.stringify({ ...localTokens, ...tokens })
  );
};

export const getLocalTokens = () => {
  const tokens = localStorage.getItem("tokens");
  if (tokens) {
    return JSON.parse(tokens);
  }
  return false;
};

export const removeLocalTokens = () => {
  return localStorage.removeItem("tokens");
};

export const allowToProtectedRoute = (callback) => {
  const { accessToken } = getLocalTokens();

  if (accessToken && isTokenValid(accessToken)) {
    callback(accessToken);
  } else {
    callback(false);
  }
};

export const isTokenValid = ({ exp }) => {
  const now = Date.now().valueOf() / 1000;
  if (typeof exp !== "undefined" && exp < now) {
    return false;
  }
  return true;
};

export const getRefreshedToken = async ({ refreshToken, accessToken }) => {
  const decodedRefresh = jwt(refreshToken);
  let resp = false;
  if (isTokenValid(decodedRefresh)) {
    resp = await processData.refreshToken({ refreshToken }, accessToken);
    if (resp?.data) {
      setLocalTokens({ accessToken: resp.data.accessToken });
      return resp.data;
    }
  }
  return resp;
};

export const triggerRefreshInterval = (dispatch) => {
  const id = setInterval(() => {
    const { refreshToken, accessToken } = getLocalTokens();
    const isValid = isTokenValid(refreshToken);

    if (!isValid) {
      processLogout();
    } else {
      getRefreshedToken({ refreshToken, accessToken });
    }
  }, 720000);

  return id;
};

export default triggerRefreshInterval;
