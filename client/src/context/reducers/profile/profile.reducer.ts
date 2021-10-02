import { PROFILE_TYPES } from '../../types';

export const profileReducer = (state: any, action: any) => {
  switch (action?.type) {
    case PROFILE_TYPES.SET_PROFILE: {
      return {
        ...state,
        profile: action?.payload?.profile,
      };
    }

    default:
      return state;
  }
};
