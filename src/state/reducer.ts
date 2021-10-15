import initialState from ".";
import type { AppState, ErrorType, ObjectType } from "../dataTypes";
import { Constants } from "./constants";

type ActionType =
  | { type: Constants.IS_OFFLINE }
  | { type: Constants.SET_USER; payload: ObjectType }
  | { type: Constants.SET_REPO; payload: Array<ObjectType> }
  | { type: Constants.SET_ERROR; payload: ErrorType }
  | { type: Constants.RESET };

const reducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case Constants.IS_OFFLINE:
      return {
        ...state,
        isOffline: true,
      };

    case Constants.SET_USER:
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };

    case Constants.SET_REPO:
      return {
        ...state,
        reposData: action.payload,
        reposLoading: false,
      };

    case Constants.SET_ERROR:
      return {
        ...state,
        errorType: action.payload,
        loading: false,
      };

    case Constants.RESET:
      return initialState;

    default:
      throw new Error("unknown action dispatched");
  }
};

export default reducer;
