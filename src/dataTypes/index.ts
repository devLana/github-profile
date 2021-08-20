export type AppState = {
  isOffline: boolean;
  loading: boolean;
  reposLoading: boolean;
  userData: any;
  // userData: T;
  reposData: Array<any>;
  // reposData: Array<T>;
  errorType: string;
};
