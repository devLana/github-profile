import { Constants } from "./constants";

export const isOffline = () => ({
  type: Constants.IS_OFFLINE,
});

export const setUser = (user: any) => ({
  type: Constants.SET_USER,
  payload: user,
});

export const setRepo = (repo: Array<any>) => ({
  type: Constants.SET_REPO,
  payload: repo,
});

export const setError = (err: string) => ({
  type: Constants.SET_ERROR,
  payload: err,
});

export const resetState = () => ({
  type: Constants.RESET,
});
