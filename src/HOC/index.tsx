import React, { useReducer, useEffect } from "react";
import { match } from "react-router-dom";
import initialState from "../state";
import reducer from "../state/reducer";
import * as actions from "../state/actions";
import searchService from "../services";
import objectIsEmpty from "../utils/objectIsEmpty";
import { StateContext } from "../utils/context";
import Layout from "../components/Layout";
import ShowError from "../components/ShowError";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";

interface HOCProps {
  handleRefresh: () => void;
  match: match<{ user: string }>;
}

interface ResponseObj {
  [index: string]: any;
}

let responseObj: ResponseObj = {};
const responseCache = new Map<string, typeof responseObj>();

const withUser = (Component: React.ComponentType) => {
  const FetchUser = ({ handleRefresh, match }: HOCProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user } = match.params;

    useEffect(() => {
      const query = user.toLowerCase();
      const { getUser, getRepos } = searchService;
      let isMounted = true;

      document.title = `${query} | Github Profile`;

      if (responseCache.has(query)) {
        const cachedUser = responseCache.get(query);

        if (isMounted && cachedUser) {
          dispatch(actions.setUser(cachedUser[query][query]));

          if ("repos" in cachedUser[query]) {
            dispatch(actions.setRepo(cachedUser[query].repos));
          }
        }
      } else if (!navigator.onLine) {
        if (isMounted) dispatch(actions.isOffline());
      } else {
        getUser<{}>(query).then(
          userRes => {
            if (isMounted) {
              dispatch(actions.setUser(userRes));

              responseObj[query] = {
                [query]: userRes,
              };
            }

            getRepos<Array<{}>>(query).then(repoData => {
              if (isMounted) {
                dispatch(actions.setRepo(repoData));

                responseObj[query] = {
                  ...responseObj[query],
                  repos: repoData,
                };

                responseCache.set(query, responseObj);
                responseObj = {};
              }
            });
          },
          err => {
            if (err.response) {
              if (err.response.status === 404) {
                dispatch(actions.setUser({}));

                responseObj[query] = {
                  [query]: {},
                };

                responseCache.set(query, responseObj);
                responseObj = {};
              } else if (err.response.status === 403) {
                dispatch(actions.setError("rate limit error"));
              }
            } else {
              dispatch(actions.setError("network error"));
            }
          }
        );
      }

      return () => {
        isMounted = false;
      };
    }, [user]);

    const objIsEmpty = objectIsEmpty(state.userData);

    const reset = () => dispatch(actions.resetState());

    const searchBox = <SearchBox reset={reset} />;

    if (state.isOffline) {
      return (
        <Layout searchBox={searchBox}>
          <ShowError refresh={handleRefresh} />
        </Layout>
      );
    }

    if (state.errorType === "rate limit error") {
      return (
        <Layout searchBox={searchBox}>
          <ShowError error="limit" />
        </Layout>
      );
    }

    if (state.errorType === "network error") {
      return (
        <Layout searchBox={searchBox}>
          <ShowError error="network" refresh={handleRefresh} />
        </Layout>
      );
    }

    if (state.loading) {
      return (
        <Layout>
          <Loader />
        </Layout>
      );
    }

    if (objIsEmpty) {
      return (
        <Layout searchBox={searchBox}>
          <ShowError error="not found" query={user} />
        </Layout>
      );
    }

    return (
      <Layout searchBox={searchBox}>
        <StateContext.Provider value={state}>
          <Component />
        </StateContext.Provider>
      </Layout>
    );
  };

  return FetchUser;
};

export default withUser;