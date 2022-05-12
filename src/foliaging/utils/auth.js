import jwt from "jwt-decode";
import { resetUser } from "../states/siteReducer";
import fetchData from "./data";

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

export const isTokenValid = ({ exp }) => {
  const now = Date.now().valueOf() / 1000;
  if (typeof exp !== "undefined" && exp < now) {
    return false;
  }
  return true;
};

export const getRefreshedToken = async (refreshToken) => {
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

export const triggerRefreshInterval = (
  refreshToken,
  dispatch,
  intervalId = ""
) => {
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
        setLocalTokens(tokens);
      };
      doRefresh();
    }
  }, 720000);

  return id;
};

export default triggerRefreshInterval;
