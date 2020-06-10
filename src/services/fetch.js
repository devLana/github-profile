import axios from "axios";

const baseURL = "https://api.github.com/users/";

const getUser = async user => {
  const userAPI = `${baseURL}${user}`;
  const response = await axios.get(userAPI);

  return response.data;
};

const getRepos = async user => {
  const repoAPI = `${baseURL}${user}/repos`;
  const response = await axios.get(repoAPI);

  return response.data;
};

export default { getUser, getRepos };
