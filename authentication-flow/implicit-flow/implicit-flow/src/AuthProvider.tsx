import React, { useContext } from 'react'
import { PropsWithChildren, createContext, useCallback, useState } from "react";
import * as utils from "./utils";
import { JWTPayload } from "jose";

type AuthContextProps = {
  auth: JWTPayload | null;
  makeLoginUrl: () => string;
  makeLogoutUrl: () => string;
  login: (accessToken: string, idToken: string, state: string) => JWTPayload;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = (props: PropsWithChildren) => {
  const [authData, setAuthData] = useState(utils.getAuth());

  const makeLogin = useCallback(
    (accessToken: string, idToken: string, state: string) => {
      const authData = utils.login(accessToken, idToken, state);
      setAuthData(authData)
      return authData;
    },
    []
  );

  const value: AuthContextProps = {
    auth: authData,
    login: makeLogin,
    makeLoginUrl: utils.makeLoginUrl,
    makeLogoutUrl: utils.makeLogoutUrl
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if(!context){
    throw new Error("useAuthContext must be used withing a AuthProvider");
  }

  return context
}
