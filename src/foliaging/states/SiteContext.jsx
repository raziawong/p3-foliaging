import React, { createContext, useContext, useEffect, useReducer } from "react";
import siteReducer, { getProducts, initialState } from "./siteReducer";

const SiteContext = createContext();
SiteContext.displayName = "SiteContext";

export const useSiteContext = () => useContext(SiteContext);

export const SiteContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(siteReducer, initialState);

  // component did mount
  useEffect(() => {
    const loadProducts = async () => getProducts({ dispatch });
    loadProducts();
  }, []);

  return (
    <SiteContext.Provider value={[globalState, dispatch]}>
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
