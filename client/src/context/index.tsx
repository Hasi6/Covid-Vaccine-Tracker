import React, { createContext, useReducer } from 'react';
import { authReducer } from './reducers/auth/auth.reducer';
import { INITIAL_AUTH_STATE } from './initialState/auth';
import { profileReducer } from './reducers/profile/profile.reducer';
import { INITIAL_PROFILE_STATE } from './initialState/profile';
import { INITIAL_ALERT_STATE } from './initialState/alert';
import { alertReducer } from './reducers/alert/alert.reducer';

export const GlobalContext = createContext(null);
export const GlobalProvider = ({ children }: any) => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_AUTH_STATE);
  const [profileState, profileDispatch] = useReducer(profileReducer, INITIAL_PROFILE_STATE);
  const [alertState, alertDispatch] = useReducer(alertReducer, INITIAL_ALERT_STATE);

  return (
    <GlobalContext.Provider
      // @ts-ignore
      value={{
        authState,
        authDispatch,
        profileState,
        profileDispatch,
        alertState,
        alertDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
