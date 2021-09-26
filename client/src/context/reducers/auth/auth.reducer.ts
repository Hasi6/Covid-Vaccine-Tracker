import { AUTH_TYPES } from '../../types';

export const authReducer = (state: any, action: any) => {
  switch (action?.type) {
    case AUTH_TYPES.SET_USER: {
      return {
        ...state,
        auth: action?.payload?.auth,
        user: action?.payload?.user,
      };
    }

    default:
      return state;
  }
};
