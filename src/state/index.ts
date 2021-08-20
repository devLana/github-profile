import type { AppState } from "../dataTypes";

const initialState: AppState = {
  isOffline: false,
  loading: true,
  reposLoading: true,
  userData: {},
  reposData: [],
  errorType: "",
};

export default initialState;
