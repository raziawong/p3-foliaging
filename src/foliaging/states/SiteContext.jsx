import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
} from "react";
import { getLocalTokens } from "../utils";
import siteReducer, {
  fetchProducts,
  initialState,
  processExistTokens,
  setLoading,
} from "./siteReducer";

export const SiteStateContext = createContext();
SiteStateContext.displayName = "SiteStateContext";

export const SiteDispatchContext = createContext();
SiteDispatchContext.displayName = "SiteDispatchContext";

export const useSiteStateContext = () => useContext(SiteStateContext);
export const useSiteDispatchContext = () => useContext(SiteDispatchContext);

export const SiteContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(siteReducer, initialState);

  // component did mount
  useLayoutEffect(() => {
    const { accessToken, refreshToken } = getLocalTokens();
    if (accessToken && refreshToken) {
      processExistTokens({ dispatch, refreshToken });
    }

    dispatch(setLoading(true));
    fetchProducts({ dispatch });
  }, []);

  return (
    <SiteDispatchContext.Provider value={dispatch}>
      <SiteStateContext.Provider value={globalState}>
        {console.log(globalState)}
        {children}
      </SiteStateContext.Provider>
    </SiteDispatchContext.Provider>
  );
};

export default SiteContextProvider;
