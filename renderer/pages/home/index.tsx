import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { auth } from "../../API/firebase";
import { useRecoilValue } from "recoil";
import { isChatModalOpenState } from "../../states/chatModalType";
import { isChatOpenState } from "../../states/currentChatRoom";
import Nav from "../../components/Nav";
import UserList from "../../components/userList/UserList";
import AddChatModal from "../../components/chat/AddChatModal";
import ChatList from "../../components/chat/ChatList";
import ChatRoom from "../../components/chat/ChatRoom";

const Home = () => {
  const [tab, setTab] = useState<string>("user");

  const isChatOpen = useRecoilValue(isChatOpenState);
  const isChatModalOpen = useRecoilValue(isChatModalOpenState);

  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) router.push("/login");
  }, []);

  return (
    <>
      <Nav setTab={setTab} />
      {isChatModalOpen && <AddChatModal />}
      <StBody>
        {isChatOpen && <ChatRoom />}
        {tab === "user" ? <UserList /> : <ChatList />}
      </StBody>
    </>
  );
};

const StBody = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Home;
