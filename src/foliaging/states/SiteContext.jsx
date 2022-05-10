import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getLocalTokens } from "../utils/auth";
import siteReducer, {
  fetchProducts,
  initialState,
  processExistTokens,
  setLoading,
} from "./siteReducer";

export const SiteContext = createContext();
SiteContext.displayName = "SiteContext";

export const useSiteContext = () => useContext(SiteContext);

export const SiteContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(siteReducer, initialState);

  // component did mount
  useEffect(() => {
    const { accessToken, refreshToken } = getLocalTokens();
    if (accessToken && refreshToken) {
      processExistTokens({ dispatch, refreshToken });
    }

    dispatch(setLoading(true));
    fetchProducts({ dispatch });
  }, []);

  return (
    <SiteContext.Provider value={[globalState, dispatch]}>
      {console.log(globalState)}
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
