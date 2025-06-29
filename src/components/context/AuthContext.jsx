import { createContext, useState, useContext } from "react";

const AuthViewContext = createContext();

export function AuthViewProvider({ children }) {
  const [isLoginView, setIsLoginView] = useState(true);
  return (
    <AuthViewContext.Provider value={{ isLoginView, setIsLoginView }}>
      {children}
    </AuthViewContext.Provider>
  );
}

export function useAuthView() {
  return useContext(AuthViewContext);
}
