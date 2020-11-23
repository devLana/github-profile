import React, { useContext } from "react";
import ShowRepos from "./ShowRepos";
import NoRepo from "./NoRepo";
import Loader from "./Loader";
import { StateContext } from "../utils/context";

const Repos = () => {
  const { userData, reposData, reposLoading } = useContext(StateContext);

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
        <NoRepo user={userData.login} />
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
          .map(item => {
            return (
              <ShowRepos
                key={item.id}
                name={item.name}
                description={item.description}
                stars={item.stargazers_count}
                forks={item.forks_count}
                language={item.language}
                created={item.created_at}
              />
            );
          })
          .slice(0, 6)}
      </div>
    </section>
  );
};

export default Repos;
