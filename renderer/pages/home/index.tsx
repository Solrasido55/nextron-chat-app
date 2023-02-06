import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { store } from "../../utils/electronStore";
import UserList from "../../components/userList/UserList";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!store.get("accessToken")) router.push("/login");
  }, []);
  return (
    <StBody>
      <UserList />
    </StBody>
  );
};

const StBody = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Home;
