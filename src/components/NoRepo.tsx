import React from "react";

interface NoRepoProps {
  user: string;
}

const NoRepo = ({ user }: NoRepoProps) => {
  return (
    <div className="no--repo">
      <p>
        <strong>{user}</strong> has not created any Github repositories yet.
      </p>
    </div>
  );
};

export default NoRepo;
