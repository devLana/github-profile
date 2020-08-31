import React, { useState, useEffect } from "react";
import searchService from "../services/fetch";
import checkObject from "../utils/checkObject";
import Layout from "../layouts/Layout";
import ShowError from "../components/ShowError";
import Loader from "../components/Loader";
import SearchBox from "../layouts/SearchBox";

const withUser = Component => {
  const FetchUser = props => {
    const [loading, setLoading] = useState(true);
    const [reposLoading, setReposLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [reposData, setReposData] = useState([]);

    const { user } = props.match.params;

    useEffect(() => {
      const { getUser, getRepos } = searchService;
      let isMounted = true;

      document.title = `${user} | Github Profile`;

      getUser(user).then(
        userRes => {
          if (isMounted) {
            setLoading(false);
            setUserData(userRes);
          }

          getRepos(user).then(repoData => {
            if (isMounted) {
              setReposLoading(false);
              setReposData(repoData);
            }
          });
        },
        () => {
          setUserData({});
          setLoading(false);
        }
      );

      return () => {
        isMounted = false;
      };
    }, [user]);

    const isEmpty = checkObject(userData);

    const reset = () => {
      setLoading(true);
      setReposLoading(true);
    };

    const searchBox = <SearchBox reset={reset} />;

    if (!navigator.onLine) {
      return (
        <Layout searchBox={searchBox}>
          <ShowError />
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
          <ShowError empty user={user} />
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
