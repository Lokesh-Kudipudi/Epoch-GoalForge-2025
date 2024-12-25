import { createContext, useContext, useState } from "react";

const Context = createContext();
export const useCustomContext = () => useContext(Context);

function ContextProvider({ children }) {
  const [user, setUser] = useState(false);
  const [initialLoadingAnimation, setInitialLoadingAnimation] =
    useState(true);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        initialLoadingAnimation,
        setInitialLoadingAnimation,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
