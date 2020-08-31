import React from "react";
import ShowRepos from "./ShowRepos";
import NoRepo from "./NoRepo";
import Loader from "./Loader";

const Repos = props => {
  const { user, reposData, reposLoading } = props;

  if (reposLoading) {
    return (
      <section id="user__repositories">
        <h2>Repositories</h2>
        <Loader />
      </section>
    );
  }

  if (reposData.length === 0) {
    return (
      <section id="user__repositories">
        <h2>Repositories</h2>
        <NoRepo user={user} />
      </section>
    );
  }

  return (
    <section id="user__repositories">
      <h2>Repositories</h2>
      <div id="repos__container">
        {reposData
          .sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
          })
          .map(elem => {
            return (
              <ShowRepos
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
          .slice(0, 6)}
      </div>
    </section>
  );
};

export default Repos;
