import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Layout from "./Layout";
import "../styles/User.scss";

const User = () => {
  const { user } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [userData, setUserData] = useState({});
  const [reposData, setReposData] = useState([]);

  useEffect(() => {
    document.title = `${user} | Github Profile`;

    axios.get(`https://api.github.com/users/${user}`)
      .then(res => {
        setUserData(res.data);
        setIsLoading(false);
      }, err => {
        (!navigator.onLine) ? setErr(err) : setUserData({});
        setIsLoading(false);
      });

    axios.get(`https://api.github.com/users/${user}/repos`)
      .then(res => {
        setReposData(res.data);
      }, err => {
        (!navigator.onLine) ? setErr(err) : setReposData([]);
      });
  }, [user]);

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
  });

  if (err) {
    return (
      <Layout>
        <div className="error-container">
          <p>It appears you are offline.</p>
          <p>Please check your network and try again</p>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="loading">
          <div className="loader">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {
        Object.keys(userData).length === 0 ? (
          <div className="not-found">
            <h2>{`"${user}"`} not found</h2>
            <p>It seems the user you have searched for doesn't exist.</p>
            <p>Please check the spelling and try again.</p>
          </div>
        ) : (
          <div id="user__container">
            <Helmet>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />
            </Helmet>
            <section id="user__details">
              <div className="user__pic">
                <img src={userData.avatar_url} alt={userData.login} className="profile-pic" />
              </div>
              <div className="user__info">
                <h1>{userData.login}</h1>
                <div>{userData.name}</div>
                <div className="location">
                  <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
                  {userData.location}
                </div>
              </div>
            </section>
            <section id="user__bio">
              <p className="bio">{userData.bio}</p>
              <div className="blog__link">
                <span className="icon"><i className="fas fa-link"></i></span>
                <a href={userData.blog}>{userData.blog}</a>
              </div>
              <div className="repos">
                <span className="icon"><i className="fas fa-book"></i></span>
                {`${userData.public_repos} repositories`}
              </div>
              <div className="followers__following">
                <span className="icon"><i className="fas fa-users"></i></span>
                <span className="following">{`${userData.following} following`}</span>
                <span className="followers">{`${userData.followers} followers`}</span>
              </div>
              <div className="join__date">
                <span className="icon"><i className="fas fa-calendar-alt"></i></span>
                Joined Github, {extractDate(userData.created_at)}
              </div>
              <p>
                Check out <a href={userData.html_url}>{userData.login} on Github</a> for more details.
              </p>
            </section>
            <section id="user__repositories">
              <h2>Repositories</h2>
              <div id="repos__container">
                {
                  reposData.length === 0 ? (
                    <div className="no--repo">
                      <p>This user hasn't created any Github repositories yet.</p>
                    </div>
                  ) : (
                    reposArr
                  )
                }
              </div>
            </section>
          </div>
        )
      }
    </Layout>
  );
}

const Repos = props => {
  return (
    <div className="repo">
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <div className="repo__stats">
        <span className="repo__stars">
          <span className="icon"><i className="fas fa-star"></i></span>
          {props.stars}
        </span>
        <span className="repo__forks">
          <span className="icon"><i className="fas fa-code-branch"></i></span>
          {props.forks}
        </span>
      </div>
      <div>
        <span>{props.language}</span>
        <span>Created On: {extractDate(props.created)}</span>
      </div>
    </div>
  );
};

const extractDate = (str) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const d = new Date(str);
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${month} ${year}`;
};

export default User;
