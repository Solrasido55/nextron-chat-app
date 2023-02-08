import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import User from "public/images/icons/user.png";
import Chat from "public/images/icons/chat.png";
import Logout from "public/images/icons/logout.png";
import { useRouter } from "next/router";
import { auth } from "../API/firebase";
import { useResetRecoilState } from "recoil";
import { currentChatRoomState } from "../states/currentChatRoom";

const Nav = ({ setTab }) => {
  const router = useRouter();
  const closeChat = useResetRecoilState(currentChatRoomState);

  const logout = () => {
    closeChat();
    auth.signOut();
    router.push("/login");
  };

  const openUserTab = () => {
    setTab("user");
    closeChat();
  };

  const openChatTab = () => {
    setTab("chat");
    closeChat();
  };

  return (
    <StNav>
      <div>
        <StLink onClick={openUserTab}>
          <Image src={User} alt="user" width={40} height={40} />
        </StLink>
        <StLink onClick={openChatTab}>
          <Image src={Chat} alt="chat" width={40} height={40} />
        </StLink>
      </div>
      <StLink onClick={logout}>
        <Image src={Logout} alt="logout" width={40} height={40} />
      </StLink>
    </StNav>
  );
};

const StNav = styled.ul`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  float: left;
  width: 100px;
  height: 100vh;
  padding: 20px 0;
  background-color: lightgray;
  z-index: 10;
`;

const StLink = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border-radius: 100%;
  margin: 20px 0;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #e2e2e2;
    transition: all 0.3s;
  }
`;

export default Nav;
