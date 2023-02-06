import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { store } from "../../utils/electronStore";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!store.get("accessToken")) router.push("/login");
  }, []);
  return <StBody onClick={() => router.push("/login")}>Chat App</StBody>;
};

const StBody = styled.div`
  width: 100vw;
  height: 100vh;
  padding-left: 100px;
`;

export default Home;
