import axios from "axios";

const getUser = async <T>(user: string) => {
  const userAPI = "https://api.github.com/users/" + user;
  const response = await axios.get<T>(userAPI);

  return response.data;
};

const getRepos = async <T>(user: string) => {
  const repoAPI = "https://api.github.com/users/" + user + "/repos";
  const response = await axios.get<T>(repoAPI);

  return response.data;
};

export default { getUser, getRepos };
