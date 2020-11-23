export const IS_OFFLINE = "IS_OFFLINE";
export const SET_USER = "SET_USER";
export const SET_REPO = "SET_REPO";
export const SET_ERROR = "SET_ERROR";
export const RESET = "RESET";

export const isOffline = () => ({
  type: IS_OFFLINE,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const setRepo = repo => ({
  type: SET_REPO,
  payload: repo,
});

export const setError = err => ({
  type: SET_ERROR,
  payload: err,
});

export const resetState = () => ({
  type: RESET,
});
