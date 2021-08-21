import axios from "axios";

const getUser = async (user: string) => {
  const userAPI = "https://api.github.com/users/" + user;
  const response = await axios.get<any>(userAPI);

  return response.data;
};

const getRepos = async (user: string) => {
  const repoAPI = "https://api.github.com/users/" + user + "/repos";
  const response = await axios.get<any>(repoAPI);

  return response.data;
};

export default { getUser, getRepos };
