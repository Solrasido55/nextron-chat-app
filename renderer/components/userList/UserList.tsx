import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AddChat from "../AddChat";
import User from "./User";
import { getUserList } from "../../API/userList";
import { useRecoilState } from "recoil";
import { userListState } from "../../states/userListState";

const UserList = () => {
  // const [userList, setUserList] = useState<IUser[]>(null);
  const [userList, setUserList] = useRecoilState(userListState);

  useEffect(() => {
    getUserList(setUserList);
  }, []);

  return (
    <>
      <StHeader>
        <StTitle>유저 목록</StTitle>
        <AddChat />
      </StHeader>
      <StBody>
        <StUserList>
          {userList?.map(user => {
            return <User key={user.uid} user={user} />;
          })}
        </StUserList>
      </StBody>
    </>
  );
};

const StHeader = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px 0 110px;
  border-bottom: 1px solid #e2e2e2;
`;

const StTitle = styled.h4``;

const StBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0 0 100px;
  overflow: scroll;
`;

const StUserList = styled.ul`
  width: 100%;
`;

export default UserList;
