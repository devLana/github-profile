import React, { useReducer, useEffect } from "react";
import { match } from "react-router-dom";
import initialState from "../state";
import reducer from "../state/reducer";
import searchService from "../services";
import objectIsEmpty from "../utils/objectIsEmpty";
import { StateContext } from "../utils/context";
import Layout from "../components/Layout";
import ShowError from "../components/ShowError";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import type { SearchBoxType } from "../dataTypes";
import { Constants } from "../state/constants";

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
          dispatch({
            type: Constants.SET_USER,
            payload: cachedUser[query][query],
          });

          if ("repos" in cachedUser[query]) {
            dispatch({
              type: Constants.SET_REPO,
              payload: cachedUser[query].repos,
            });
          }
        }
      } else if (!navigator.onLine) {
        if (isMounted) dispatch({ type: Constants.IS_OFFLINE });
      } else {
        getUser(query).then(
          userRes => {
            if (isMounted) {
              dispatch({ type: Constants.SET_USER, payload: userRes });

              responseObj[query] = {
                [query]: userRes,
              };
            }

            getRepos(query).then(repoData => {
              if (isMounted) {
                dispatch({ type: Constants.SET_REPO, payload: repoData });

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
            if (err && err.response) {
              if (err.response.status === 404) {
                dispatch({ type: Constants.SET_USER, payload: {} });

                responseObj[query] = {
                  [query]: {},
                };

                responseCache.set(query, responseObj);
                responseObj = {};
              } else if (err.response.status === 403) {
                dispatch({
                  type: Constants.SET_ERROR,
                  payload: "rate limit error",
                });
              }
            } else {
              dispatch({ type: Constants.SET_ERROR, payload: "network error" });
            }
          }
        );
      }

      return () => {
        isMounted = false;
      };
    }, [user]);

    const objIsEmpty = objectIsEmpty(state.userData);

    const reset = () => dispatch({ type: Constants.RESET });

    const searchBox: SearchBoxType = <SearchBox reset={reset} />;

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
