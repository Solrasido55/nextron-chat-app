import styled from "@emotion/styled";
import React from "react";

const User = ({ email }) => {
  return <StUser>{email}</StUser>;
};

const StUser = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
`;

export default User;
