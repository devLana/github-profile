import React, { useState, useEffect } from "react";
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
    const [isOffline, setIsOffline] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reposLoading, setReposLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [reposData, setReposData] = useState([]);

    const { user } = props.match.params;

    useEffect(() => {
      const query = user.toLowerCase();
      const { getUser, getRepos } = searchService;
      let isMounted = true;

      document.title = `${query} | Github Profile`;

      if (responseCache.has(query)) {
        const cachedUser = responseCache.get(query);

        if (isMounted) {
          setLoading(false);
          setUserData(cachedUser[query][query]);

          if ("repos" in cachedUser[query]) {
            setReposLoading(false);
            setReposData(cachedUser[query].repos);
          }
        }
      } else if (!navigator.onLine) {
        if (isMounted) setIsOffline(true);
      } else {
        getUser(query).then(
          userRes => {
            if (isMounted) {
              setLoading(false);
              setUserData(userRes);

              responseObj[query] = {
                [query]: userRes,
              };
            }

            getRepos(query).then(repoData => {
              if (isMounted) {
                setReposLoading(false);
                setReposData(repoData);

                responseObj[query] = {
                  ...responseObj[query],
                  repos: repoData,
                };

                responseCache.set(query, responseObj);
                responseObj = {};
              }
            });
          },
          () => {
            setLoading(false);
            setUserData({});

            responseObj[query] = {
              [query]: {},
            };

            responseCache.set(query, responseObj);
            responseObj = {};
          }
        );
      }

      return () => {
        isMounted = false;
      };
    }, [user]);

    const isEmpty = checkObject(userData);

    const reset = () => {
      setLoading(true);
      setReposLoading(true);
      setUserData({});
      setReposData([]);
    };

    const searchBox = <SearchBox reset={reset} />;

    if (isOffline) {
      return (
        <Layout searchBox={searchBox}>
          <ShowError refresh={props.handleRefresh} />
        </Layout>
      );
    }

    if (loading) {
      return (
        <Layout>
          <Loader />
        </Layout>
      );
    }

    if (isEmpty) {
      return (
        <Layout searchBox={searchBox}>
          <ShowError empty query={user} />
        </Layout>
      );
    }

    return (
      <Component
        userData={userData}
        reposData={reposData}
        reposLoading={reposLoading}
        searchBox={searchBox}
      />
    );
  };

  return FetchUser;
};

export default withUser;
