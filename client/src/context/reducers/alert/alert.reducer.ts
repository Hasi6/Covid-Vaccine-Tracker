import { ALERT_TYPES, PROFILE_TYPES } from '../../types';

export const alertReducer = (state: any, action: any) => {
  switch (action?.type) {
    case ALERT_TYPES.SET_ALERT: {
      return {
        ...state,
        alert: action?.payload?.alert,
      };
    }
    case ALERT_TYPES.REMOVE_ALERT: {
      return {
        ...state,
        alert: null,
      };
    }
    default:
      return state;
  }
};
