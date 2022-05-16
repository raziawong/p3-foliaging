import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
} from "react";
import { getLocalTokens } from "../utils";
import siteReducer, {
  fetchInitialData,
  initialState,
  processExistTokens,
  processProductQueries,
} from "./siteReducer";

export const SiteStateContext = createContext({});
SiteStateContext.displayName = "SiteStateContext";

export const SiteDispatchContext = createContext({});
SiteDispatchContext.displayName = "SiteDispatchContext";

export const useSiteStateContext = () => useContext(SiteStateContext);
export const useSiteDispatchContext = () => useContext(SiteDispatchContext);

export const SiteContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(siteReducer, initialState);

  // component did mount
  useLayoutEffect(() => {
    const { accessToken, refreshToken } = getLocalTokens();
    if (accessToken && refreshToken) {
      processExistTokens({ dispatch, accessToken, refreshToken });
    }

    fetchInitialData({ dispatch });
  }, []);

  // component did update
  useLayoutEffect(() => {
    processProductQueries({ dispatch, query: globalState.query });
  }, [globalState.query]);

  return (
    <SiteStateContext.Provider value={globalState}>
      <SiteDispatchContext.Provider value={dispatch}>
        {console.log(globalState)}
        {children}
      </SiteDispatchContext.Provider>
    </SiteStateContext.Provider>
  );
};

export default SiteContextProvider;
