export type AppState = {
  isOffline: boolean;
  loading: boolean;
  reposLoading: boolean;
  userData: any;
  reposData: Array<any>;
  errorType: string;
};

export type SearchBoxType = React.ReactElement | JSX.Element;
