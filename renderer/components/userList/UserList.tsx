import styled from "@emotion/styled";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireStore } from "../../utils/firebase";
import AddChat from "../AddChat";
import User from "./User";

interface User {
  uid: string;
  email: string;
}

const UserList = () => {
  const [userList, setUserList] = useState<User[]>();
  const getUserList = async () => {
    const querySnapShot = await getDocs(collection(fireStore, "userList"));
    const list = querySnapShot.docs.map(userList => {
      return { ...userList.data() };
    });
    setUserList(list as User[]);
  };

  console.log(userList);
  useEffect(() => {
    if (!userList) getUserList();
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
            return <User key={user.uid} email={user.email} />;
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
