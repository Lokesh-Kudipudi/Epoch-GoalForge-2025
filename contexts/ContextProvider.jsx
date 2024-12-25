import { createContext, useContext, useState } from "react";

const Context = createContext();
export const useCustomContext = () => useContext(Context);

function ContextProvider({ children }) {
  const [user, setUser] = useState(false);
  const [initialLoadingAnimation, setInitialLoadingAnimation] =
    useState(true);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("IDLE");

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        processing,
        setProcessing,
        status,
        setStatus,
        initialLoadingAnimation,
        setInitialLoadingAnimation,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
