import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import searchService from "../services/fetch";
import Layout from "../layouts/Layout";
import SearchBox from "../layouts/SearchBox";
import Repos from "../components/Repos";
import Loader from "../components/Loader";
import Avatar from "../components/Avatar";
import Bio from "../components/Bio";

const User = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [repoIsLoading, setRepoIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [userData, setUserData] = useState({});
  const [reposData, setReposData] = useState([]);

  const { user } = useParams();

  useEffect(() => {
    document.title = `${user} | Github Profile`;

    searchService.getUser(user)
      .then(userRes => {
        setIsLoading(false);
        setUserData(userRes);
        setErr(false);

        searchService.getRepos(user)
          .then(repoData => {
            setRepoIsLoading(false);
            setReposData(repoData);
          });
      }, err => {
        (err && !navigator.onLine) ? setErr(true) : setUserData({});
        setIsLoading(false);
      });
  }, [user]);

  const setLoading = () => {
    setIsLoading(true);
    setRepoIsLoading(true);
    setErr(false);
  }

  const searchBox = <SearchBox setLoading={setLoading} />;

  const reposArr = reposData.sort((a, b) => {
    return b.stargazers_count - a.stargazers_count;
  }).map(elem => {
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
  }).slice(0, 6);

  const ShowReposData = () => {
    if (reposData.length === 0) {
      return (
        <div className="no--repo">
          <p><strong>{user}</strong> has not created any Github repositories yet.</p>
        </div>
      );
    }

    return (
      <div id="repos__container">
        {reposArr}
      </div>
    );
  };

  if (err) {
    return (
      <Layout searchBox={searchBox}>
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>An error has occurred and we can't complete that action right now.</p>
          <p>
            Please try again later, or <strong>check your network connection and refresh the browser</strong>.
          </p>
        </div>
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

  if (Object.keys(userData).length === 0) {
    return (
      <Layout searchBox={searchBox}>
        <div className="not-found">
          <h2>{`"${user}"`} not found</h2>
          <p>It seems the user you have searched for doesn't exist.</p>
          <p>Please check the spelling and try again.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout searchBox={searchBox}>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />
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
            {
              repoIsLoading
                ? <Loader />
                : ShowReposData()
            }
        </section>
      </div>
    </Layout>
  );
}

export default User;
