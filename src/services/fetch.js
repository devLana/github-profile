import axios from "axios";

const getUser = async user => {
  const userAPI = "https://api.github.com/users/" + user;
  const response = await axios.get(userAPI);

  return response.data;
};

const getRepos = async user => {
  const repoAPI = "https://api.github.com/users/" + user + "/repos";
  const response = await axios.get(repoAPI);

  return response.data;
};

export default { getUser, getRepos };
