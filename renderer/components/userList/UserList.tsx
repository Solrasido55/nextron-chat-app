import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredUserListState, userListState } from "../../states/userList";
import { fireStore, database } from "../../API/firebase";
import AddChat from "../AddChat";
import User from "./User";
import { onValue, ref } from "firebase/database";

const UserList = () => {
  const setUserList = useSetRecoilState(userListState);
  const filteredUserList = useRecoilValue(filteredUserListState);

  const getUserList = async () => {
    const userRef = ref(database, "/users");
    onValue(userRef, snapshot => {
      const data = snapshot.val();
      setUserList(Object.values(data));
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <StHeader>
        <StTitle>유저 목록</StTitle>
        <AddChat />
      </StHeader>
      <StBody>
        <StUserList>
          {filteredUserList.map(user => {
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
  overflow: hidden;
`;

const StUserList = styled.ul`
  width: 100%;
`;

export default UserList;
