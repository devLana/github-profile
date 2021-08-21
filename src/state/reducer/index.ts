import { Constants } from "../actions/constants";
import initialState from "../index";

type ActionType = {
  type: string;
  payload?: any | Array<any> | string;
};

const reducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case Constants.IS_OFFLINE:
      return {
        ...state,
        isOffline: true,
      };

    case Constants.SET_USER:
      return {
        ...state,
        userData: payload,
        loading: false,
      };

    case Constants.SET_REPO:
      return {
        ...state,
        reposData: payload,
        reposLoading: false,
      };

    case Constants.SET_ERROR:
      return {
        ...state,
        errorType: payload,
        loading: false,
      };

    case Constants.RESET:
    default:
      return state;
  }
};

export default reducer;
