import React, { createContext, useReducer } from 'react';
import { authReducer } from './reducers/auth/auth.reducer';
import { INITIAL_AUTH_STATE } from './initialState/auth';

export const GlobalContext = createContext(null);
export const GlobalProvider = ({ children }: any) => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);

  return (
    <GlobalContext.Provider
      // @ts-ignore
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
