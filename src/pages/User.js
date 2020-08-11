import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../layouts/Layout";
import SearchBox from "../layouts/SearchBox";
import Repos from "../components/Repos";
import ShowReposData from "../components/ShowReposData";
import Loader from "../components/Loader";
import Avatar from "../components/Avatar";
import Bio from "../components/Bio";
import ShowError from "../components/ShowError";
import searchService from "../services/fetch";
import checkObject from "../utils/checkObject";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repoIsLoading, setRepoIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [userData, setUserData] = useState({});
  const [reposData, setReposData] = useState([]);

  const { user } = useParams();

  useEffect(() => {
    const { getUser, getRepos } = searchService;
    let isMounted = true;

    document.title = `${user} | Github Profile`;

    getUser(user).then(
      userRes => {
        if (isMounted) {
          setIsLoading(false);
          setUserData(userRes);
          setErr(false);
        }

        getRepos(user).then(repoData => {
          if (isMounted) {
            setRepoIsLoading(false);
            setReposData(repoData);
          }
        });
      },
      err => {
        err && !navigator.onLine ? setErr(true) : setUserData({});
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [user]);

  const isEmpty = checkObject(userData);

  const setLoading = () => {
    setIsLoading(true);
    setRepoIsLoading(true);
    setErr(false);
  };

  const searchBox = <SearchBox setLoading={setLoading} />;

  const reposArr = reposData
    .sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    })
    .map(elem => {
      return (
        <Repos
          key={elem.id}
          name={elem.name}
          description={elem.description}
          stars={elem.stargazers_count}
          forks={elem.forks_count}
          language={elem.language}
          created={elem.created_at}
        />
      );
    })
    .slice(0, 6);

  if (err) {
    return (
      <Layout searchBox={searchBox}>
        <ShowError />
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (isEmpty) {
    return (
      <Layout searchBox={searchBox}>
        <ShowError empty={true} user={user} />
      </Layout>
    );
  }

  return (
    <Layout searchBox={searchBox}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
          crossorigin="anonymous"
        />
      </Helmet>
      <div id="user__container">
        <div className="grid">
          <section id="user__details">
            <Avatar
              img={userData.avatar_url}
              user={userData.login}
              name={userData.name}
              location={userData.location}
            />
          </section>
          <section id="user__bio">
            <Bio
              bio={userData.bio}
              repos={userData.public_repos}
              following={userData.following}
              followers={userData.followers}
              created={userData.created_at}
              url={userData.html_url}
              user={userData.login}
            />
          </section>
        </div>
        <section id="user__repositories">
          <h2>Repositories</h2>
          {repoIsLoading ? (
            <Loader />
          ) : (
            <ShowReposData reposData={reposData} user={user} reposArr={reposArr} />
          )}
        </section>
      </div>
    </Layout>
  );
};

export default User;
