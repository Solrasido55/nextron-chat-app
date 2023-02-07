import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import UserList from "../../components/userList/UserList";
import { auth } from "../../API/firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../states/currentUser";
import Nav from "../../components/Nav";
import AddChatModal from "../../components/chat/AddChatModal";
import { isChatModalOpenState } from "../../states/chatModalType";
import ChatList from "../../components/chat/ChatList";

const Home = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [tab, setTab] = useState<string>("user");

  const isChatModalOpen = useRecoilValue(isChatModalOpenState);

  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) router.push("/login");
    if (!currentUser && auth.currentUser) setCurrentUser(auth.currentUser.uid);
  }, []);

  return (
    <>
      <Nav setTab={setTab} />
      {isChatModalOpen && <AddChatModal />}
      <StBody>{tab === "user" ? <UserList /> : <ChatList />}</StBody>
    </>
  );
};

const StBody = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Home;
