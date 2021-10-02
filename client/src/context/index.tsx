import React, { createContext, useReducer } from 'react';
import { authReducer } from './reducers/auth/auth.reducer';
import { INITIAL_AUTH_STATE } from './initialState/auth';
import { profileReducer } from './reducers/profile/profile.reducer';
import { INITIAL_PROFILE_STATE } from './initialState/profile';

export const GlobalContext = createContext(null);
export const GlobalProvider = ({ children }: any) => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);
  const [profileState, profileDispatch] = useReducer(profileReducer, INITIAL_PROFILE_STATE);

  return (
    <GlobalContext.Provider
      // @ts-ignore
      value={{
        authState,
        authDispatch,
        profileState,
        profileDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
