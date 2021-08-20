import * as actions from "../actions";
import initialState from "../index";
import { AppState } from "../../dataTypes";

interface ActionType {
  type: string;
  payload?: any;
}

const reducer = (state: AppState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case actions.IS_OFFLINE:
      return {
        ...state,
        isOffline: true,
      };

    case actions.SET_USER:
      return {
        ...state,
        userData: payload,
        loading: false,
      };

    case actions.SET_REPO:
      return {
        ...state,
        reposData: payload,
        reposLoading: false,
      };

    case actions.SET_ERROR:
      return {
        ...state,
        errorType: payload,
        loading: false,
      };

    case actions.RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
