import React, { useReducer, useEffect } from "react";
import initialState from "../state";
import reducer from "../state/reducer"
import * as actions from "../state/actions";
import searchService from "../services";
import checkObject from "../utils/checkObject";
import Layout from "../layouts/Layout";
import ShowError from "../components/ShowError";
import Loader from "../components/Loader";
import SearchBox from "../layouts/SearchBox";

const responseCache = new Map();
let responseObj = {};

const withUser = Component => {
  const FetchUser = props => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { user } = props.match.params;

    useEffect(() => {
      const query = user.toLowerCase();
      const { getUser, getRepos } = searchService;
      let isMounted = true;

      document.title = `${query} | Github Profile`;

      if (responseCache.has(query)) {
        const cachedUser = responseCache.get(query);

        if (isMounted) {
          dispatch(actions.setUser(cachedUser[query][query]));

          if ("repos" in cachedUser[query]) {
            dispatch(actions.setRepo(cachedUser[query].repos));
          }
        }
      } else if (!navigator.onLine) {
        if (isMounted) dispatch(actions.isOffline());
      } else {
        getUser(query).then(
          userRes => {
            if (isMounted) {
              dispatch(actions.setUser(userRes));

              responseObj[query] = {
                [query]: userRes,
              };
            }

            getRepos(query).then(repoData => {
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

    const isEmpty = checkObject(state.userData);

    const reset = () => dispatch(actions.resetState());

    const searchBox = <SearchBox reset={reset} />;

    if (state.isOffline) {
      return (
        <Layout searchBox={searchBox}>
          <ShowError refresh={props.handleRefresh} />
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
          <ShowError error="network" refresh={props.handleRefresh} />
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

    if (isEmpty) {
      return (
        <Layout searchBox={searchBox}>
          <ShowError error="not found" query={user} />
        </Layout>
      );
    }

    return (
      <Component
        userData={state.userData}
        reposData={state.reposData}
        reposLoading={state.reposLoading}
        searchBox={searchBox}
      />
    );
  };

  return FetchUser;
};

export default withUser;
