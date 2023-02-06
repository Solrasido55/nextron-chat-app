import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import User from "public/images/icons/user.png";
import Chat from "public/images/icons/chat.png";
import Logout from "public/images/icons/logout.png";
import { useRouter } from "next/router";
import { store } from "../utils/electronStore";

const Nav = () => {
  const router = useRouter();

  const logout = () => {
    store.delete("accessToken");
    router.push("/login");
  };

  return (
    <StNav>
      <div>
        <StLink>
          <Image src={User} alt="user" width={40} height={40} />
        </StLink>
        <StLink>
          <Image src={Chat} alt="user" width={40} height={40} />
        </StLink>
      </div>
      <StLink onClick={logout}>
        <Image src={Logout} alt="user" width={40} height={40} />
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
