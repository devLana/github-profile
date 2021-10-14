export type ErrorType = "" | "rate limit error" | "network error";

export type ObjectType = {
  [index: string]: any;
};

export type AppState = {
  isOffline: boolean;
  loading: boolean;
  reposLoading: boolean;
  userData: ObjectType;
  reposData: Array<ObjectType>;
  errorType: ErrorType;
};

export type SearchBoxType = React.ReactElement | JSX.Element;
