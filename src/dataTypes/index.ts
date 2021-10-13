export type ErrorType = "" | "rate limit error" | "network error";

export type AppState = {
  isOffline: boolean;
  loading: boolean;
  reposLoading: boolean;
  userData: any;
  reposData: Array<any>;
  errorType: ErrorType;
};

export type SearchBoxType = React.ReactElement | JSX.Element;
