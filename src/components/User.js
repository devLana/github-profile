import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import "../styles/User.scss";

const User = () => {
  const { user } = useParams();
  document.title = `${user} | Github Profile`;

  return (
    <Layout>
      <h1>{user}</h1>
    </Layout>
  );
}

export default User;
