import React, { useContext, useState } from "react";
import ShowRepos from "./ShowRepos";
import NoRepo from "./NoRepo";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { StateContext } from "../utils/context";

const Repos = () => {
  const { userData, reposData, reposLoading } = useContext(StateContext);
  const [page, setPage] = useState(1);

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

  const reposPerPage = 6;
  const totalPages = Math.ceil(reposData.length / reposPerPage);
  const lastIndex = reposPerPage * page;
  const firstIndex = lastIndex - reposPerPage;

  return (
    <section id="user__repositories">
      <div id="repos__container">
        {reposData
          .sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
          })
          .slice(firstIndex, lastIndex)
          .map(item => (
            <ShowRepos
              key={item.id}
              name={item.name}
              description={item.description}
              stars={item.stargazers_count}
              forks={item.forks_count}
              language={item.language}
              created={item.created_at}
            />
          ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
};

export default Repos;
