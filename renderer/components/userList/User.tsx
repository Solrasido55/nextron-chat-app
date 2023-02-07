import styled from "@emotion/styled";
import React from "react";
import { useSetRecoilState } from "recoil";
import { chatModalTypeState } from "../../states/chatModalType";
import { selectedUserState } from "../../states/selectedUserState";

const User = ({ user }) => {
  const setSelectedUser = useSetRecoilState(selectedUserState);
  const setChatModalType = useSetRecoilState(chatModalTypeState);

  const selectUser = () => {
    setSelectedUser(user);
  };

  const clickUser = () => {
    selectUser();
    setChatModalType("private");
  };

  return <StUser onClick={clickUser}>{user.email}</StUser>;
};

const StUser = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

export default User;
