import React, { useState } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../API/firebase";
import Modal from "../../components/auth/AuthModal";
import AuthForm from "../../components/auth/AuthForm";
import AlertToast from "../../components/AlertToast";
import { isAuthModalOpenState } from "../../states/isAuthModalOpen";
import {
  errorCodeState,
  isAlertToastPopState,
} from "../../states/alertMessageState";

interface UserWithAccessToken extends User {
  accessToken?: string;
}

const Login = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const isAuthModalOpen = useRecoilValue(isAuthModalOpenState);
  const isAlertToastPop = useRecoilValue(isAlertToastPopState);
  const setErrorCode = useSetRecoilState(errorCodeState);

  const router = useRouter();

  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(userInfo => {
      return { ...userInfo, [name]: value };
    });
  };

  const signIn = () => {
    const { email, password } = userInfo;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/home");
      })
      .catch(error => {
        const errorCode = error.code;
        setErrorCode(errorCode);
        setUserInfo({
          email: "",
          password: "",
        });
      });
  };

  return (
    <>
      <Head>
        <title>LOG IN</title>
      </Head>
      {isAuthModalOpen && (
        <Modal text="로그인 하시겠습니까?" confirm={signIn} />
      )}
      {isAlertToastPop && <AlertToast />}
      <StBody>
        <StHeader>Chat App</StHeader>
        <AuthForm
          handleUserInfo={handleUserInfo}
          currentPage="Login"
          userInfo={userInfo}
        />
      </StBody>
    </>
  );
};

const StHeader = styled.h1`
  font-size: 50px;
`;

const StBody = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
`;

export default Login;
